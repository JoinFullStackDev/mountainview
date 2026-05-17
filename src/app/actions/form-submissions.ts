"use server";

import { z } from "zod";
import { headers } from "next/headers";
import {
  getResendClient,
  getFromAddress,
  getPharmacyContactEmail,
} from "@/lib/email/resend";
import {
  renderContactEmail,
  renderTransferEmail,
  renderMedicalKitEmail,
} from "@/lib/email/templates";

// =====================================================
// Rate Limiting (in-memory)
// TODO: replace with Vercel KV / Upstash Redis before going to production.
// In-memory state is per-instance and resets on cold starts, which makes
// rate limiting unreliable on serverless platforms.
// =====================================================

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 5; // 5 submissions per window

function getRateLimitKey(ip: string, formType: string): string {
  return `${formType}:${ip}`;
}

function isRateLimited(ip: string, formType: string): boolean {
  const key = getRateLimitKey(ip, formType);
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  entry.count++;
  return false;
}

// Periodic cleanup so the map doesn't grow unbounded.
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
      if (now > entry.resetAt) {
        rateLimitStore.delete(key);
      }
    }
  }, 60 * 1000);
}

// =====================================================
// Turnstile Verification
// =====================================================

// IPv4 / IPv6 sanity check. Cloudflare rejects `remoteip` values that aren't
// well-formed IPs (e.g. the literal "unknown" we fall back to in dev), and
// the field is optional, so we omit it unless we have a real IP.
function isValidIp(value: string): boolean {
  if (!value || value === "unknown") return false;
  // Crude but correct enough for this purpose: at least one dot or colon.
  return /^[0-9a-f:.]+$/i.test(value) && /[.:]/.test(value);
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  // If Turnstile is not configured, skip verification in development.
  if (!secretKey) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "Turnstile not configured, skipping verification in development"
      );
      return true;
    }
    return false;
  }

  // Don't verify obviously empty/dev tokens against Cloudflare.
  if (!token || token === "dev-bypass") {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "Turnstile dev-bypass token received; skipping verification in development"
      );
      return true;
    }
    return false;
  }

  try {
    const params = new URLSearchParams({
      secret: secretKey,
      response: token,
    });

    // `remoteip` is optional. Pass it only when it's a real IP, otherwise
    // Cloudflare returns `invalid-remoteip` and the verification fails.
    if (isValidIp(ip)) {
      params.set("remoteip", ip);
    }

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
      }
    );

    const data = (await response.json()) as {
      success: boolean;
      "error-codes"?: string[];
      action?: string;
      hostname?: string;
    };

    if (data.success !== true) {
      // Surface Cloudflare's error codes so misconfigurations are debuggable.
      // Common codes: invalid-input-secret, invalid-input-response,
      // timeout-or-duplicate, invalid-remoteip, hostname-not-allowed.
      console.error(
        "Turnstile verification rejected:",
        JSON.stringify(data["error-codes"] ?? []),
        "hostname:",
        data.hostname ?? "n/a"
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return false;
  }
}

// =====================================================
// Validation Schemas
// =====================================================

const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(20).optional(),
  subject: z.string().trim().max(200).optional(),
  message: z.string().trim().min(10, "Message is too short").max(2000),
});

const transferFormSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  phone: z.string().trim().min(10, "Phone is required").max(20),
  email: z.string().trim().email("Invalid email").max(255),
  currentPharmacy: z.string().trim().min(2, "Pharmacy name is required").max(200),
  rxNumbers: z.string().trim().max(500).optional(),
  notes: z.string().trim().max(1000).optional(),
});

const medicalKitFormSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(20).optional(),
  kitType: z.string().trim().max(100).optional(),
  needs: z.string().trim().min(10, "Please describe your needs").max(2000),
});

// =====================================================
// Helpers
// =====================================================

export interface FormSubmissionResult {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
}

async function getClientIp(): Promise<string> {
  const headersList = await headers();
  return (
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    "unknown"
  );
}

function fieldErrorsFromZod(error: z.ZodError): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.errors) {
    if (issue.path[0]) {
      fieldErrors[issue.path[0] as string] = issue.message;
    }
  }
  return fieldErrors;
}

interface SendArgs {
  subject: string;
  html: string;
  text: string;
  replyTo: string;
}

async function sendPharmacyEmail(args: SendArgs): Promise<boolean> {
  try {
    const resend = getResendClient();
    const from = getFromAddress();
    const to = getPharmacyContactEmail();

    const { error } = await resend.emails.send({
      from,
      to,
      subject: args.subject,
      html: args.html,
      text: args.text,
      replyTo: args.replyTo,
    });

    if (error) {
      console.error("Resend send error:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Resend send threw:", error);
    return false;
  }
}

// =====================================================
// Public server actions
// =====================================================

export async function submitContactForm(
  formData: z.infer<typeof contactFormSchema>,
  turnstileToken: string
): Promise<FormSubmissionResult> {
  const ip = await getClientIp();

  if (isRateLimited(ip, "contact")) {
    return {
      success: false,
      error: "Too many submissions. Please try again later.",
    };
  }

  const turnstileVerified = await verifyTurnstile(turnstileToken, ip);
  if (!turnstileVerified) {
    return {
      success: false,
      error: "Bot verification failed. Please try again.",
    };
  }

  const validation = contactFormSchema.safeParse(formData);
  if (!validation.success) {
    return { success: false, fieldErrors: fieldErrorsFromZod(validation.error) };
  }

  const email = renderContactEmail(validation.data);
  const sent = await sendPharmacyEmail(email);
  if (!sent) {
    return {
      success: false,
      error: "Failed to submit form. Please try again or call us directly.",
    };
  }

  return { success: true };
}

export async function submitTransferForm(
  formData: z.infer<typeof transferFormSchema>,
  turnstileToken: string
): Promise<FormSubmissionResult> {
  const ip = await getClientIp();

  if (isRateLimited(ip, "transfer")) {
    return {
      success: false,
      error: "Too many submissions. Please try again later.",
    };
  }

  const turnstileVerified = await verifyTurnstile(turnstileToken, ip);
  if (!turnstileVerified) {
    return {
      success: false,
      error: "Bot verification failed. Please try again.",
    };
  }

  const validation = transferFormSchema.safeParse(formData);
  if (!validation.success) {
    return { success: false, fieldErrors: fieldErrorsFromZod(validation.error) };
  }

  const email = renderTransferEmail(validation.data);
  const sent = await sendPharmacyEmail(email);
  if (!sent) {
    return {
      success: false,
      error: "Failed to submit form. Please try again or call us directly.",
    };
  }

  return { success: true };
}

export async function submitMedicalKitForm(
  formData: z.infer<typeof medicalKitFormSchema>,
  turnstileToken: string
): Promise<FormSubmissionResult> {
  const ip = await getClientIp();

  if (isRateLimited(ip, "medical-kit")) {
    return {
      success: false,
      error: "Too many submissions. Please try again later.",
    };
  }

  const turnstileVerified = await verifyTurnstile(turnstileToken, ip);
  if (!turnstileVerified) {
    return {
      success: false,
      error: "Bot verification failed. Please try again.",
    };
  }

  const validation = medicalKitFormSchema.safeParse(formData);
  if (!validation.success) {
    return { success: false, fieldErrors: fieldErrorsFromZod(validation.error) };
  }

  const email = renderMedicalKitEmail(validation.data);
  const sent = await sendPharmacyEmail(email);
  if (!sent) {
    return {
      success: false,
      error: "Failed to submit form. Please try again or call us directly.",
    };
  }

  return { success: true };
}

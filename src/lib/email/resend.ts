import { Resend } from "resend";

let cachedClient: Resend | null = null;

/**
 * Returns a singleton Resend client.
 *
 * In production we throw if RESEND_API_KEY is missing so misconfiguration is
 * obvious. In development we throw the same error so server actions can
 * surface a meaningful error to the developer rather than silently failing.
 */
export function getResendClient(): Resend {
  if (cachedClient) return cachedClient;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error(
      "RESEND_API_KEY is not set. Add it to your .env.local (see .env.local.example) or to your hosting provider's environment variables."
    );
  }

  cachedClient = new Resend(apiKey);
  return cachedClient;
}

/**
 * The validated `from` address used on every email we send.
 * Must reference a domain you have verified in the Resend dashboard.
 */
export function getFromAddress(): string {
  const from = process.env.RESEND_FROM_EMAIL;
  if (!from) {
    throw new Error(
      "RESEND_FROM_EMAIL is not set. Add it to your .env.local (see .env.local.example)."
    );
  }
  return from;
}

/**
 * The address that receives form submissions from the public site.
 */
export function getPharmacyContactEmail(): string {
  const to = process.env.PHARMACY_CONTACT_EMAIL;
  if (!to) {
    throw new Error(
      "PHARMACY_CONTACT_EMAIL is not set. Add it to your .env.local (see .env.local.example)."
    );
  }
  return to;
}

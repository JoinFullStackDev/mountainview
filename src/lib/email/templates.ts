/**
 * Email templates for public-form submissions.
 *
 * Each builder returns the data needed to call resend.emails.send():
 *   { subject, html, text, replyTo }
 *
 * The `replyTo` is set to the submitter's email so the pharmacy can reply
 * directly from their inbox.
 */

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
  replyTo: string;
}

export interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface TransferEmailData {
  name: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  currentPharmacy: string;
  rxNumbers?: string;
  notes?: string;
}

export interface MedicalKitEmailData {
  name: string;
  email: string;
  phone?: string;
  kitType?: string;
  needs: string;
}

// ---------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderHtmlShell(title: string, rows: Array<[string, string | undefined]>): string {
  const rowsHtml = rows
    .filter(([, value]) => value && value.trim().length > 0)
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:8px 12px;background:#f7f7f8;font-weight:600;width:180px;vertical-align:top;border-bottom:1px solid #eaeaea;">${escapeHtml(label)}</td>
        <td style="padding:8px 12px;vertical-align:top;border-bottom:1px solid #eaeaea;white-space:pre-wrap;">${escapeHtml(value as string)}</td>
      </tr>`
    )
    .join("");

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:24px;background:#f4f4f5;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#111;">
    <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #eaeaea;border-radius:8px;overflow:hidden;">
      <tr>
        <td style="padding:16px 20px;background:#0f172a;color:#fff;font-size:14px;letter-spacing:0.04em;text-transform:uppercase;">Mountain View Pharmacy</td>
      </tr>
      <tr>
        <td style="padding:20px;">
          <h1 style="margin:0 0 12px 0;font-size:18px;">${escapeHtml(title)}</h1>
          <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:14px;">
            ${rowsHtml}
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function renderTextShell(title: string, rows: Array<[string, string | undefined]>): string {
  const lines = [title, "=".repeat(title.length), ""];
  for (const [label, value] of rows) {
    if (!value || value.trim().length === 0) continue;
    lines.push(`${label}:`);
    for (const line of value.split("\n")) lines.push(`  ${line}`);
    lines.push("");
  }
  return lines.join("\n");
}

// ---------------------------------------------------------------
// Builders
// ---------------------------------------------------------------

export function renderContactEmail(data: ContactEmailData): RenderedEmail {
  const subject = data.subject?.trim()
    ? `Contact Form: ${data.subject}`
    : `Contact Form: New message from ${data.name}`;

  const rows: Array<[string, string | undefined]> = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Subject", data.subject],
    ["Message", data.message],
  ];

  return {
    subject,
    html: renderHtmlShell("New Contact Form Submission", rows),
    text: renderTextShell("New Contact Form Submission", rows),
    replyTo: data.email,
  };
}

export function renderTransferEmail(data: TransferEmailData): RenderedEmail {
  const subject = `Prescription Transfer Request: ${data.name}`;

  const rows: Array<[string, string | undefined]> = [
    ["Name", data.name],
    ["Date of Birth", data.dateOfBirth],
    ["Phone", data.phone],
    ["Email", data.email],
    ["Current Pharmacy", data.currentPharmacy],
    ["Prescription Numbers", data.rxNumbers],
    ["Additional Notes", data.notes],
  ];

  return {
    subject,
    html: renderHtmlShell("New Prescription Transfer Request", rows),
    text: renderTextShell("New Prescription Transfer Request", rows),
    replyTo: data.email,
  };
}

export function renderMedicalKitEmail(data: MedicalKitEmailData): RenderedEmail {
  const subject = `Medical Kit Inquiry: ${data.name}`;

  const rows: Array<[string, string | undefined]> = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Kit Type", data.kitType],
    ["Description of Needs", data.needs],
  ];

  return {
    subject,
    html: renderHtmlShell("New Medical Kit Inquiry", rows),
    text: renderTextShell("New Medical Kit Inquiry", rows),
    replyTo: data.email,
  };
}

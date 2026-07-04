import { SITE } from "./site";

// Sends notification emails via the Resend HTTP API (no SDK dependency).
// Configured entirely through environment variables so the app degrades
// gracefully: if RESEND_API_KEY is not set, email sending is skipped and
// submissions still succeed (and remain visible in the admin dashboard).

const RESEND_ENDPOINT = "https://api.resend.com/emails";

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Build a simple, readable HTML table from label/value pairs. */
export function detailsTable(rows: Array<[string, string]>): string {
  const body = rows
    .filter(([, v]) => v && v.trim().length > 0)
    .map(
      ([label, value]) =>
        `<tr>
           <td style="padding:6px 12px;color:#5b6b7a;font:600 13px sans-serif;vertical-align:top;white-space:nowrap;">${escapeHtml(
             label
           )}</td>
           <td style="padding:6px 12px;color:#0f2a43;font:14px sans-serif;">${escapeHtml(
             value
           ).replace(/\n/g, "<br/>")}</td>
         </tr>`
    )
    .join("");
  return `<table style="border-collapse:collapse;width:100%;max-width:560px;">${body}</table>`;
}

interface SendArgs {
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendNotificationEmail({
  subject,
  html,
  replyTo,
}: SendArgs): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // No provider configured — skip silently so submissions still succeed.
    return false;
  }

  const to = process.env.NOTIFY_EMAIL || SITE.email;
  // The "from" must be a Resend-verified sender. Until the domain is verified,
  // Resend's shared sandbox address works for delivering to your own inbox.
  const from =
    process.env.EMAIL_FROM || "The Management Capital Lab <onboarding@resend.dev>";

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        html,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });
    if (!res.ok) {
      console.error("Resend email failed:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("Resend email error:", err);
    return false;
  }
}

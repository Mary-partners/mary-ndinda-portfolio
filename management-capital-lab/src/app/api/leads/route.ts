import { NextResponse } from "next/server";
import { addLead } from "@/lib/store";
import { sendNotificationEmail, detailsTable } from "@/lib/email";
import type { CollaborationLead } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  const collaborationType = String(body.collaborationType ?? "").trim();
  const consentToContact = Boolean(body.consentToContact);

  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "A valid email is required." },
      { status: 400 }
    );
  }
  if (!consentToContact) {
    return NextResponse.json(
      { error: "Consent to contact is required." },
      { status: 400 }
    );
  }

  const lead: CollaborationLead = {
    id: `l_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    name,
    email,
    organisation: String(body.organisation ?? "").trim(),
    role: String(body.role ?? "").trim(),
    country: String(body.country ?? "").trim(),
    collaborationType,
    message,
    consentToContact,
    createdAt: new Date().toISOString(),
  };

  // Persist (Notion or JSON). Non-fatal: the email below is the safety net.
  try {
    await addLead(lead);
  } catch (err) {
    console.error("Failed to persist lead:", err);
  }

  // Notify Mary by email (non-blocking: never fail the submission on email error).
  const html = `
    <h2 style="font:600 18px sans-serif;color:#0f2a43;">New collaboration interest</h2>
    <p style="font:14px sans-serif;color:#5b6b7a;">Someone has expressed interest in collaborating on The Management Capital Lab.</p>
    ${detailsTable([
      ["Name", lead.name],
      ["Email", lead.email],
      ["Organisation", lead.organisation],
      ["Role", lead.role],
      ["Country", lead.country],
      ["Collaboration type", lead.collaborationType],
      ["Message", lead.message],
    ])}
  `;
  await sendNotificationEmail({
    subject: `New collaboration interest — ${lead.name}`,
    html,
    replyTo: lead.email,
  });

  return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
}

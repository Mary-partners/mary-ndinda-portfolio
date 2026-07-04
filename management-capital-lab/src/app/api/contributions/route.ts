import { NextResponse } from "next/server";
import { addContribution, getApprovedContributions } from "@/lib/store";
import { inferThemes } from "@/lib/utils";
import { sendNotificationEmail, detailsTable } from "@/lib/email";
import type { Contribution, NoteColor } from "@/lib/types";

export const dynamic = "force-dynamic";

const COLORS: NoteColor[] = ["yellow", "blue", "green", "pink", "cream", "lavender"];

function pickColor(seed: string): NoteColor {
  let sum = 0;
  for (let i = 0; i < seed.length; i++) sum += seed.charCodeAt(i);
  // Use lavender sparingly (index 5) — only ~1 in 12.
  const idx = sum % 12;
  return idx < 10 ? COLORS[idx % 5] : "lavender";
}

export async function GET() {
  const notes = await getApprovedContributions();
  return NextResponse.json({ contributions: notes });
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const content = String(body.content ?? "").trim();
  const prompt = String(body.prompt ?? "").trim();
  const isAnonymous = Boolean(body.isAnonymous);
  const name = String(body.name ?? "").trim();
  const consentToPublish = Boolean(body.consentToPublish);

  if (!content || content.length < 10) {
    return NextResponse.json(
      { error: "Contribution content is required (10+ characters)." },
      { status: 400 }
    );
  }
  if (!prompt) {
    return NextResponse.json({ error: "A prompt is required." }, { status: 400 });
  }
  if (!consentToPublish) {
    return NextResponse.json(
      { error: "Consent to publish is required." },
      { status: 400 }
    );
  }

  const now = new Date().toISOString();
  const id = `c_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2, 8)}`;

  const contribution: Contribution = {
    id,
    prompt,
    content,
    name: isAnonymous ? "Anonymous" : name || "Anonymous",
    isAnonymous,
    email: String(body.email ?? "").trim(),
    role: String(body.role ?? "").trim() || "Other",
    country: String(body.country ?? "").trim(),
    sector: String(body.sector ?? "").trim(),
    organisation: String(body.organisation ?? "").trim(),
    consentToContact: Boolean(body.consentToContact),
    consentToPublish,
    status: "pending",
    color: pickColor(id + content),
    themes: inferThemes(`${prompt} ${content}`),
    createdAt: now,
    updatedAt: now,
    approvedAt: null,
  };

  // Persist (Notion or JSON). Non-fatal: the email below is the safety net.
  try {
    await addContribution(contribution);
  } catch (err) {
    console.error("Failed to persist contribution:", err);
  }

  // Notify Mary that a new post-it is awaiting moderation (non-blocking).
  const html = `
    <h2 style="font:600 18px sans-serif;color:#0f2a43;">New post-it awaiting review</h2>
    <p style="font:14px sans-serif;color:#5b6b7a;">A new contribution was submitted to the research wall and is pending approval.</p>
    ${detailsTable([
      ["Prompt", contribution.prompt],
      ["Contribution", contribution.content],
      ["Name", contribution.isAnonymous ? "Anonymous" : contribution.name],
      ["Role", String(contribution.role)],
      ["Country", contribution.country],
      ["Sector", contribution.sector],
      ["Organisation", contribution.organisation],
      ["Email", contribution.email],
    ])}
    <p style="font:13px sans-serif;color:#5b6b7a;">Review it in the admin dashboard: <strong>/admin</strong></p>
  `;
  await sendNotificationEmail({
    subject: `New post-it to review — ${contribution.isAnonymous ? "Anonymous" : contribution.name}`,
    html,
    replyTo: contribution.email || undefined,
  });

  return NextResponse.json({ ok: true, id }, { status: 201 });
}

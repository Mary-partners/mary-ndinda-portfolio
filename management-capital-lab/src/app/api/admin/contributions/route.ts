import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import {
  getContributions,
  updateContribution,
  deleteContribution,
} from "@/lib/store";
import type { ContributionStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

async function guard() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function GET() {
  const denied = await guard();
  if (denied) return denied;
  const contributions = await getContributions();
  return NextResponse.json({ contributions });
}

export async function PATCH(request: Request) {
  const denied = await guard();
  if (denied) return denied;

  let body: { id?: string; status?: ContributionStatus; content?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  if (!body.id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const patch: Record<string, unknown> = {};
  if (body.status) patch.status = body.status;
  if (typeof body.content === "string") patch.content = body.content.trim();

  const updated = await updateContribution(body.id, patch);
  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true, contribution: updated });
}

export async function DELETE(request: Request) {
  const denied = await guard();
  if (denied) return denied;

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  const ok = await deleteContribution(id);
  if (!ok) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}

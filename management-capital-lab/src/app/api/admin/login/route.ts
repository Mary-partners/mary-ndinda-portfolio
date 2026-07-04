import { NextResponse } from "next/server";
import { verifyPassword, createSession, destroySession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  if (!verifyPassword(body.password ?? "")) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }
  await createSession();
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  await destroySession();
  return NextResponse.json({ ok: true });
}

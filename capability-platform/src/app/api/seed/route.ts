import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { seedDatabase } from "../../../../prisma/seed";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// One-time demo seeding for the hosted database.
// Protected by SEED_TOKEN. Safe to call again (it resets the demo data first).
async function run(token: string | null) {
  if (!process.env.SEED_TOKEN || token !== process.env.SEED_TOKEN) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const existing = await prisma.company.count();
    await seedDatabase(prisma);
    const after = await prisma.company.count();
    return NextResponse.json({ ok: true, companiesBefore: existing, companiesAfter: after });
  } catch (e) {
    console.error("Seed failed:", e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token");
  return run(token);
}
export async function POST(req: Request) {
  const token = new URL(req.url).searchParams.get("token");
  return run(token);
}

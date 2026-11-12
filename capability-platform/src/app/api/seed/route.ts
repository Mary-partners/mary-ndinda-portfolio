import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ensureFramework } from "@/lib/install";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// One-time installation of the default capability framework into the hosted
// database. Protected by SEED_TOKEN. Idempotent — safe to call again.
// It does NOT create any sample enterprises: real data is entered through the app.
async function run(token: string | null) {
  if (!process.env.SEED_TOKEN || token !== process.env.SEED_TOKEN) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const framework = await ensureFramework(prisma);
    const [dimensions, questions, users] = await Promise.all([
      prisma.dimension.count(),
      prisma.question.count(),
      prisma.user.count(),
    ]);
    return NextResponse.json({
      ok: true,
      framework: { name: framework.name, version: framework.version },
      dimensions,
      questions,
      users,
      setupRequired: users === 0,
    });
  } catch (e) {
    console.error("Framework install failed:", e);
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

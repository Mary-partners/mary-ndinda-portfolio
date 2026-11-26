import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ensureFramework } from "@/lib/install";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Install or refresh the default framework (the revised v2 rubric). This adds
// the v2 framework if missing and makes it the single default; legacy
// frameworks and their historical assessments are preserved.
async function run(token: string | null) {
  if (!process.env.SEED_TOKEN || token !== process.env.SEED_TOKEN) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const framework = await ensureFramework(prisma);
    const [dimensions, questions, users, defaultQuestions] = await Promise.all([
      prisma.dimension.count(),
      prisma.question.count(),
      prisma.user.count(),
      prisma.question.count({ where: { dimension: { frameworkId: framework.id } } }),
    ]);
    return NextResponse.json({
      ok: true,
      framework: { name: framework.name, version: framework.version, isDefault: framework.isDefault },
      defaultQuestions,
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
  const url = new URL(req.url);
  return run(url.searchParams.get("token"));
}
export async function POST(req: Request) {
  const url = new URL(req.url);
  return run(url.searchParams.get("token"));
}

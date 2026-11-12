import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ensureFramework } from "@/lib/install";
import { DIMENSION_META } from "@/lib/constants";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// If the installed default framework's pillars differ from the current code
// (e.g. after realigning to the Management Capital Index), replace it — but only
// when no assessments depend on it, so live data is never silently discarded.
async function resyncFrameworkIfStale(): Promise<string | null> {
  const existing = await prisma.framework.findFirst({ where: { isDefault: true }, include: { dimensions: { select: { key: true } } } });
  if (!existing) return null;
  const have = existing.dimensions.map((d) => d.key).sort().join(",");
  const want = DIMENSION_META.map((d) => d.key).sort().join(",");
  if (have === want) return null;
  const assessments = await prisma.assessment.count();
  if (assessments > 0) return "stale-but-has-assessments";
  await prisma.framework.delete({ where: { id: existing.id } });
  return "replaced";
}

// One-time installation of the default capability framework into the hosted
// database. Protected by SEED_TOKEN. Idempotent — safe to call again.
// It does NOT create any sample enterprises: real data is entered through the app.
async function run(token: string | null) {
  if (!process.env.SEED_TOKEN || token !== process.env.SEED_TOKEN) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const resync = await resyncFrameworkIfStale();
    if (resync === "stale-but-has-assessments") {
      return NextResponse.json({ error: "Installed framework differs from the code but has assessments; not auto-migrating." }, { status: 409 });
    }
    const framework = await ensureFramework(prisma);
    const [dimensions, questions, users] = await Promise.all([
      prisma.dimension.count(),
      prisma.question.count(),
      prisma.user.count(),
    ]);
    return NextResponse.json({
      ok: true,
      resync: resync ?? "unchanged",
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

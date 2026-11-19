import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ensureFramework } from "@/lib/install";
import { DIMENSION_META, FRAMEWORK_VERSION } from "@/lib/constants";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Replace the installed default framework when its pillars or version differ
// from the current code. Normally refuses when assessments depend on it; with
// force=1 it removes those assessments first (token-guarded).
async function resyncFramework(force: boolean): Promise<string | null> {
  const existing = await prisma.framework.findFirst({ where: { isDefault: true }, include: { dimensions: { select: { key: true } } } });
  if (!existing) return null;
  const have = existing.dimensions.map((d) => d.key).sort().join(",");
  const want = DIMENSION_META.map((d) => d.key).sort().join(",");
  const stale = have !== want || existing.version !== FRAMEWORK_VERSION;
  if (!stale) return null;
  const assessments = await prisma.assessment.count({ where: { frameworkId: existing.id } });
  if (assessments > 0 && !force) return "stale-but-has-assessments";
  if (assessments > 0) await prisma.assessment.deleteMany({ where: { frameworkId: existing.id } });
  await prisma.framework.delete({ where: { id: existing.id } });
  return assessments > 0 ? "replaced-with-force" : "replaced";
}

async function run(token: string | null, force: boolean) {
  if (!process.env.SEED_TOKEN || token !== process.env.SEED_TOKEN) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const resync = await resyncFramework(force);
    if (resync === "stale-but-has-assessments") {
      return NextResponse.json({ error: "Installed framework differs from the code but has assessments; pass force=1 to replace (removes those assessments)." }, { status: 409 });
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
  const url = new URL(req.url);
  return run(url.searchParams.get("token"), url.searchParams.get("force") === "1");
}
export async function POST(req: Request) {
  const url = new URL(req.url);
  return run(url.searchParams.get("token"), url.searchParams.get("force") === "1");
}

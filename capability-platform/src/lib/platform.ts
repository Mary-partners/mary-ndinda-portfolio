import { prisma } from "./prisma";
import { indexScore, maturityBand } from "./utils";
import { READINESS_BANDS } from "./constants";

// Friendly label for how a company entered the platform.
function sourceLabel(scenarioTag: string | null): string {
  if (scenarioTag === "Founder self-signup") return "Founder account";
  if (scenarioTag === "Public self-assessment") return "Public link";
  return scenarioTag || "Other";
}

export interface PlatformRow {
  companyId: string;
  companyName: string;
  orgName: string;
  source: string;
  sector: string | null;
  country: string | null;
  founderName: string | null;
  founderEmail: string | null;
  index: number | null;
  band: string;
  finalizedAt: Date | null;
}

// Platform-wide view for the platform administrator: every diagnostic completed
// across every workspace, not just the active organisation.
export async function getPlatformOverview() {
  const [businesses, assessments] = await Promise.all([
    prisma.company.count(),
    prisma.assessment.findMany({
      where: { status: "finalized" },
      orderBy: { finalizedAt: "desc" },
      select: {
        overallScore: true,
        finalizedAt: true,
        company: {
          select: {
            id: true, legalName: true, tradingName: true, sector: true, country: true,
            founderName: true, founderEmail: true, scenarioTag: true, org: { select: { name: true } },
          },
        },
      },
    }),
  ]);

  // Latest finalized assessment per company (list already sorted desc).
  const latestByCompany = new Map<string, (typeof assessments)[number]>();
  for (const a of assessments) {
    if (!latestByCompany.has(a.company.id)) latestByCompany.set(a.company.id, a);
  }

  const rows: PlatformRow[] = [...latestByCompany.values()].map((a) => ({
    companyId: a.company.id,
    companyName: a.company.tradingName || a.company.legalName,
    orgName: a.company.org.name,
    source: sourceLabel(a.company.scenarioTag),
    sector: a.company.sector || null,
    country: a.company.country || null,
    founderName: a.company.founderName || null,
    founderEmail: a.company.founderEmail || null,
    index: indexScore(a.overallScore),
    band: maturityBand(a.overallScore).label,
    finalizedAt: a.finalizedAt,
  }));

  const indices = rows.map((r) => r.index).filter((n): n is number => n !== null);
  const avgIndex = indices.length ? Math.round(indices.reduce((a, b) => a + b, 0) / indices.length) : null;
  const distribution = READINESS_BANDS.map((b) => ({ band: b.label, count: rows.filter((r) => r.band === b.label).length }));

  return {
    businesses,
    completed: rows.length,
    totalFinalized: assessments.length,
    avgIndex,
    distribution,
    rows,
  };
}

import { requireUser } from "@/lib/auth";
import { getPortfolioStats, latestAssessments } from "@/lib/portfolio";
import { prisma } from "@/lib/prisma";
import { PageHeader, Panel, StatCard } from "@/components/ui/Page";
import { DistributionBars, DimensionBars, AdoptionFunnel } from "@/components/charts";
import { fmtIndex, maturityBand } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function IntelligencePage() {
  const user = await requireUser();
  const s = await getPortfolioStats(user.activeOrgId);
  const rows = await latestAssessments(user.activeOrgId);

  // Capability improvement by sector
  const bySector: Record<string, { sum: number; n: number }> = {};
  for (const r of rows) {
    if (!r.latest?.overallScore) continue;
    const sec = r.company.sector;
    (bySector[sec] ??= { sum: 0, n: 0 });
    bySector[sec].sum += r.latest.overallScore;
    bySector[sec].n += 1;
  }
  const sectorData = Object.entries(bySector).map(([name, v]) => ({ name, score: v.sum / v.n }));

  // By business size
  const bySize: Record<string, { sum: number; n: number }> = {};
  for (const r of rows) {
    if (!r.latest?.overallScore) continue;
    const size = r.company.stage ?? "Unknown";
    (bySize[size] ??= { sum: 0, n: 0 });
    bySize[size].sum += r.latest.overallScore;
    bySize[size].n += 1;
  }
  const sizeData = ["Micro", "Small", "Medium"].filter((k) => bySize[k]).map((name) => ({ name, score: bySize[name].sum / bySize[name].n }));

  // By advisor
  const advisors = await prisma.user.findMany({ where: { memberships: { some: { orgId: user.activeOrgId, role: "ADVISOR" } } }, include: { advisedCompanies: { where: { orgId: user.activeOrgId }, include: { assessments: { where: { status: "finalized" }, orderBy: { finalizedAt: "desc" } } } } } });
  const advisorData = advisors.map((a) => {
    const scores = a.advisedCompanies.map((c) => c.assessments[0]?.overallScore).filter((n): n is number => typeof n === "number");
    return { name: a.name, score: scores.length ? scores.reduce((x, y) => x + y, 0) / scores.length : null };
  });

  return (
    <>
      <PageHeader title="Portfolio Intelligence" subtitle="Executive analytics across the active organisation. Click a KPI on the Overview to trace its underlying enterprises." />
      <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Avg. Management Capital Index" value={s.avgMaturity !== null ? `${fmtIndex(s.avgMaturity)}/100` : "—"} sub={maturityBand(s.avgMaturity).label} tone="gold" />
        <StatCard label="Verified adoption" value={`${s.pctVerifiedAdoption.toFixed(0)}%`} tone="ok" />
        <StatCard label="Evidence coverage" value={`${s.evidenceCoverage.toFixed(0)}%`} />
        <StatCard label="Overdue milestones" value={s.overdueMilestones} tone={s.overdueMilestones ? "warn" : "ok"} />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Capability distribution"><DistributionBars data={s.distribution} /></Panel>
        <Panel title="Average scores by pillar"><DimensionBars data={s.dimensionAverages.map((d) => ({ name: d.name, score: d.score }))} /></Panel>
        <Panel title="Capability by sector"><DimensionBars data={sectorData} /></Panel>
        <Panel title="Capability by business size"><DimensionBars data={sizeData} /></Panel>
        <Panel title="Average score by advisor"><DimensionBars data={advisorData} /></Panel>
        <Panel title="Adoption funnel"><AdoptionFunnel steps={s.funnel} /></Panel>
      </div>
    </>
  );
}

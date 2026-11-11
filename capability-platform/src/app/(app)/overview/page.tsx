import { requireUser } from "@/lib/auth";
import { getPortfolioStats } from "@/lib/portfolio";
import { PageHeader, StatCard, Panel } from "@/components/ui/Page";
import { CapabilityRadar, DimensionBars, DistributionBars, AdoptionFunnel } from "@/components/charts";
import { fmtScore } from "@/lib/utils";
import { DIMENSION_META } from "@/lib/constants";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function OverviewPage() {
  const user = await requireUser();
  const s = await getPortfolioStats(user.activeOrgId);

  const radar = DIMENSION_META.map((d) => ({
    dimension: d.name.split(" ")[0],
    current: s.dimensionAverages.find((x) => x.key === d.key)?.score ?? null,
  }));

  return (
    <>
      <PageHeader
        title="Portfolio Overview"
        subtitle="Management capability, implementation and business performance across the active organisation. Every figure is computed from stored records."
        actions={<Link href="/reports" className="btn-outline">Reports</Link>}
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Enterprises enrolled" value={s.totalEnterprises} href="/portfolio" />
        <StatCard label="Assessments completed" value={s.assessed} sub={`${s.totalEnterprises - s.assessed} outstanding`} href="/diagnostics" />
        <StatCard
          label="Avg management maturity"
          value={fmtScore(s.avgMaturity)}
          sub={s.maturityChange !== null ? `${s.maturityChange >= 0 ? "+" : ""}${s.maturityChange.toFixed(2)} vs baseline` : "0–4 scale"}
          tone="gold"
        />
        <StatCard label="Verified practice adoption" value={`${s.pctVerifiedAdoption.toFixed(0)}%`} sub={`${s.companiesWithVerified} of ${s.totalEnterprises} enterprises`} tone="ok" href="/evidence" />
        <StatCard label="Open interventions" value={s.openInterventions} href="/implementation" />
        <StatCard label="Overdue milestones" value={s.overdueMilestones} tone={s.overdueMilestones > 0 ? "warn" : "ok"} href="/implementation" />
        <StatCard label="Evidence verification coverage" value={`${s.evidenceCoverage.toFixed(0)}%`} sub={`${s.verifiedEvidence} of ${s.evidence} items verified`} href="/evidence" />
        <StatCard label="Advisors engaged" value={s.advisorWorkload.length} sub={`${s.advisorWorkload.reduce((a, b) => a + b.companies, 0)} assignments`} href="/sessions" />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <Panel title="Capability by dimension (portfolio average)" className="lg:col-span-1">
          <CapabilityRadar data={radar} />
        </Panel>
        <Panel title="Average scores by dimension" className="lg:col-span-2">
          <DimensionBars data={s.dimensionAverages.map((d) => ({ name: d.name, score: d.score }))} />
        </Panel>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Panel title="Management capability distribution">
          <DistributionBars data={s.distribution} />
        </Panel>
        <Panel title="Adoption funnel" actions={<span className="text-xs text-ink-muted">company-level</span>}>
          <AdoptionFunnel steps={s.funnel} />
          <p className="mt-3 text-xs text-ink-muted">
            Counts are enterprises reaching each stage (not practices). Evidence submitted ≠ verified; verified ≠ sustained.
          </p>
        </Panel>
      </div>

      <div className="mt-5">
        <Panel title="Enterprises requiring attention" actions={<Link href="/portfolio" className="text-xs font-medium text-navy-600 hover:underline">View all</Link>}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-navy/10">
                  <th className="th">Enterprise</th>
                  <th className="th">Sector</th>
                  <th className="th">Maturity</th>
                  <th className="th">Scenario</th>
                  <th className="th"></th>
                </tr>
              </thead>
              <tbody>
                {[...s.rows]
                  .sort((a, b) => (a.latest?.overallScore ?? 9) - (b.latest?.overallScore ?? 9))
                  .slice(0, 6)
                  .map(({ company, latest }) => (
                    <tr key={company.id} className="border-b border-navy/5 last:border-0">
                      <td className="td font-medium text-navy-700">{company.tradingName ?? company.legalName}</td>
                      <td className="td text-ink-muted">{company.sector}</td>
                      <td className="td">{fmtScore(latest?.overallScore)}</td>
                      <td className="td text-ink-muted">{company.scenarioTag}</td>
                      <td className="td text-right">
                        <Link href={`/portfolio/${company.id}`} className="inline-flex items-center gap-1 text-xs font-medium text-navy-600 hover:underline">
                          Open <ArrowUpRight className="h-3 w-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </>
  );
}

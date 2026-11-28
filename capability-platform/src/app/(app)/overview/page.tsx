import { requireUser } from "@/lib/auth";
import { getPortfolioStats } from "@/lib/portfolio";
import { getPlatformOverview } from "@/lib/platform";
import { PageHeader, StatCard, Panel } from "@/components/ui/Page";
import { CapabilityRadar, DimensionBars, DistributionBars, AdoptionFunnel } from "@/components/charts";
import { fmtIndex, fmtDate, maturityBand } from "@/lib/utils";
import { DIMENSION_META, READINESS_BANDS } from "@/lib/constants";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function OverviewPage() {
  const user = await requireUser();

  // Platform administrator: show every diagnostic completed across all workspaces,
  // not just the active organisation (which is where the "zero" came from).
  if (user.isPlatformAdmin) {
    const p = await getPlatformOverview();
    const avgBand = p.avgIndex !== null ? (READINESS_BANDS.find((b) => p.avgIndex! >= b.min && p.avgIndex! <= b.max)?.label ?? "") : "";
    const maxBand = Math.max(1, ...p.distribution.map((d) => d.count));
    return (
      <>
        <PageHeader
          title="Platform Overview"
          subtitle="Every diagnostic completed across all workspaces. This is the admin view of how the platform is being used."
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Businesses registered" value={p.businesses} />
          <StatCard label="Diagnostics completed" value={p.completed} sub={`${p.totalFinalized} submissions in total`} tone="gold" />
          <StatCard label="Average Index" value={p.avgIndex !== null ? `${p.avgIndex}/100` : "n/a"} sub={avgBand} />
          <StatCard label="Awaiting diagnostic" value={Math.max(0, p.businesses - p.completed)} sub="registered, not yet completed" />
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          <Panel title="Readiness band distribution" className="lg:col-span-1">
            <div className="space-y-2.5">
              {p.distribution.map((d) => (
                <div key={d.band} className="flex items-center gap-3">
                  <div className="w-24 shrink-0 text-sm text-navy-700">{d.band}</div>
                  <div className="h-2 flex-1 rounded-full bg-navy/10"><div className="h-2 rounded-full bg-gold" style={{ width: `${(d.count / maxBand) * 100}%` }} /></div>
                  <div className="w-6 text-right text-sm font-medium text-navy-700">{d.count}</div>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Completed diagnostics" className="lg:col-span-2" actions={<span className="text-xs text-ink-muted">{p.completed} businesses</span>}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-navy/10">
                    <th className="th">Business</th>
                    <th className="th">Contact</th>
                    <th className="th">Source</th>
                    <th className="th">Sector</th>
                    <th className="th">Index</th>
                    <th className="th">Band</th>
                    <th className="th">Completed</th>
                  </tr>
                </thead>
                <tbody>
                  {p.rows.length === 0 && (
                    <tr><td className="td text-ink-muted" colSpan={7}>No diagnostics completed yet.</td></tr>
                  )}
                  {p.rows.map((r) => (
                    <tr key={r.companyId} className="border-b border-navy/5 last:border-0">
                      <td className="td font-medium text-navy-700">{r.companyName}</td>
                      <td className="td">
                        {r.founderName || r.founderEmail ? (
                          <div className="leading-tight">
                            {r.founderName && <div className="text-navy-700">{r.founderName}</div>}
                            {r.founderEmail && <a href={`mailto:${r.founderEmail}`} className="text-xs text-gold-700 hover:underline">{r.founderEmail}</a>}
                          </div>
                        ) : <span className="text-ink-muted">—</span>}
                      </td>
                      <td className="td text-ink-muted">{r.source}</td>
                      <td className="td text-ink-muted">{r.sector ?? "—"}</td>
                      <td className="td font-medium">{r.index ?? "—"}</td>
                      <td className="td text-ink-muted">{r.band}</td>
                      <td className="td text-ink-muted">{r.finalizedAt ? fmtDate(r.finalizedAt) : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>
        <p className="mt-4 text-xs text-ink-muted">Figures are computed from stored records. Scores are self-reported management maturity, not validated WMS scores or a credit decision.</p>
      </>
    );
  }

  // A brand-new administrator has no organisation yet, so send them to create one.
  if (!user.activeOrgId) redirect("/organisations");
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
          label="Avg. Management Capital Index"
          value={s.avgMaturity !== null ? `${fmtIndex(s.avgMaturity)}/100` : "n/a"}
          sub={maturityBand(s.avgMaturity).label}
          tone="gold"
        />
        <StatCard label="Verified practice adoption" value={`${s.pctVerifiedAdoption.toFixed(0)}%`} sub={`${s.companiesWithVerified} of ${s.totalEnterprises} enterprises`} tone="ok" href="/evidence" />
        <StatCard label="Open interventions" value={s.openInterventions} href="/implementation" />
        <StatCard label="Overdue milestones" value={s.overdueMilestones} tone={s.overdueMilestones > 0 ? "warn" : "ok"} href="/implementation" />
        <StatCard label="Evidence verification coverage" value={`${s.evidenceCoverage.toFixed(0)}%`} sub={`${s.verifiedEvidence} of ${s.evidence} items verified`} href="/evidence" />
        <StatCard label="Advisors engaged" value={s.advisorWorkload.length} sub={`${s.advisorWorkload.reduce((a, b) => a + b.companies, 0)} assignments`} href="/sessions" />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <Panel title="Capability by pillar (portfolio average)" className="lg:col-span-1">
          <CapabilityRadar data={radar} />
        </Panel>
        <Panel title="Average scores by pillar" className="lg:col-span-2">
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
                  <th className="th">Index</th>
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
                      <td className="td">{fmtIndex(latest?.overallScore)}</td>
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

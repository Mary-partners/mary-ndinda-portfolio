import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUser, assertCompanyAccess } from "@/lib/auth";
import { getCompanyDetail } from "@/lib/company";
import { PageHeader, Panel, StatCard } from "@/components/ui/Page";
import { Badge } from "@/components/ui/Badge";
import { CapabilityRadar, DimensionBars } from "@/components/charts";
import { interventionPriority } from "@/lib/scoring";
import { fmtScore, maturityBand } from "@/lib/utils";
import { CONSTRAINT_LABELS } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireUser();
  await assertCompanyAccess(id, user).catch(() => notFound());
  const data = await getCompanyDetail(id);
  if (!data || !data.latest) notFound();
  const { company, latest, dimRows } = data;

  const radar = dimRows.map((d) => ({ dimension: d.name.split(" ")[0], current: d.current, baseline: d.baseline }));
  const ranked = [...dimRows].filter((d) => d.current !== null).sort((a, b) => (a.current ?? 0) - (b.current ?? 0));
  const weakest = ranked.slice(0, 3);
  const strongest = [...ranked].reverse().slice(0, 3);

  // Transparent priority recommendations
  const recs = weakest.map((d, i) => {
    const gap = d.current !== null ? 4 - d.current : 0;
    const importance = 3 - i * 0.5; // top gap weighted slightly higher
    const riskSeverity = d.current !== null && d.current < 2 ? 3 : 2;
    const feasibility = 2;
    const evidenceConfidence = 2;
    const priority = interventionPriority({ gap, importance, riskSeverity, feasibility, evidenceConfidence });
    return { ...d, gap, priority };
  }).sort((a, b) => b.priority - a.priority);

  return (
    <>
      <PageHeader
        title={`Diagnostic results — ${company.tradingName ?? company.legalName}`}
        subtitle={`${latest.label ?? latest.type} · finalised`}
        actions={
          <div className="flex gap-2">
            <Link href={`/portfolio/${id}/diagnostic?assessment=${latest.id}`} className="btn-outline">View responses</Link>
            <Link href={`/portfolio/${id}`} className="btn-primary">Company profile</Link>
          </div>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Overall maturity" value={fmtScore(latest.overallScore)} sub={<Badge tone={maturityBand(latest.overallScore).tone as "ok" | "warn" | "bad" | "neutral"}>{maturityBand(latest.overallScore).label}</Badge>} tone="gold" />
        <StatCard label="Completeness" value={`${Math.round((latest.completeness ?? 0) * 100)}%`} sub="applicable questions answered" />
        <StatCard label="Evidence coverage" value={`${Math.round((latest.evidenceCoverage ?? 0) * 100)}%`} sub="answered items verified" />
        <StatCard label="Strongest / weakest" value={<span className="text-base">{strongest[0]?.name.split(" ")[0]} / {weakest[0]?.name.split(" ")[0]}</span>} />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <Panel title="Capability radar (baseline vs current)"><CapabilityRadar data={radar} /></Panel>
        <Panel title="Dimension comparison" className="lg:col-span-2"><DimensionBars data={dimRows.map((d) => ({ name: d.name, score: d.current }))} /></Panel>
      </div>

      <div className="mt-5">
        <Panel title="Priority recommendations" actions={<span className="text-xs text-ink-muted">transparent priority formula</span>}>
          <div className="grid gap-3 md:grid-cols-3">
            {recs.map((r, i) => (
              <div key={r.key} className="rounded-lg border border-navy/10 bg-white p-4">
                <div className="flex items-center justify-between">
                  <Badge tone="navy">#{i + 1}</Badge>
                  <span className="text-xs text-ink-muted">priority {r.priority.toFixed(1)}</span>
                </div>
                <h3 className="mt-2 text-sm font-semibold text-navy-700">Strengthen {r.name.toLowerCase()}</h3>
                <p className="mt-1 text-xs text-ink-muted">Current {fmtScore(r.current)} · gap to 4.0 = {r.gap.toFixed(2)}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-ink-muted">
            Priority = gap×2 + importance×1.5 + risk×1.5 + feasibility×1 + evidence-confidence×0.5. Advisors may override with a recorded reason.
          </p>
        </Panel>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Panel title="Constraints beyond management capability">
          {company.constraints.length === 0 ? (
            <p className="text-sm text-ink-muted">None flagged — management capability is the primary lever.</p>
          ) : (
            <ul className="space-y-2">
              {company.constraints.map((c) => (
                <li key={c.id} className="flex items-center justify-between rounded-lg border border-navy/10 bg-surface-muted p-3 text-sm">
                  <span>{CONSTRAINT_LABELS[c.type] ?? c.type}</span>
                  <Badge tone={c.severity === "high" ? "bad" : c.severity === "medium" ? "warn" : "neutral"}>{c.severity}</Badge>
                </li>
              ))}
            </ul>
          )}
        </Panel>
        <Panel title="Assessment limitations">
          <ul className="list-disc space-y-1 pl-5 text-sm text-ink-muted">
            <li>Scores are a custom SME maturity assessment, not validated WMS scores.</li>
            <li>Evidence marked by a founder is not independently verified until a reviewer confirms it.</li>
            <li>Associations between management quality and financial outcomes are not treated as causal.</li>
            <li>Completeness ({Math.round((latest.completeness ?? 0) * 100)}%) is reported separately from maturity.</li>
          </ul>
        </Panel>
      </div>
    </>
  );
}

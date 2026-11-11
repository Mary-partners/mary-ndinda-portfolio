import { notFound } from "next/navigation";
import { requireUser, assertCompanyAccess } from "@/lib/auth";
import { getCompanyDetail } from "@/lib/company";
import { fmtScore, fmtDate, maturityBand, fmtNumber, pctChange } from "@/lib/utils";
import { CONSTRAINT_LABELS } from "@/lib/constants";
import { PrintButton } from "@/components/PrintButton";

export const dynamic = "force-dynamic";

export default async function CompanyReport({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireUser();
  await assertCompanyAccess(id, user).catch(() => notFound());
  const data = await getCompanyDetail(id);
  if (!data) notFound();
  const { company, latest, dimRows } = data;
  const ranked = [...dimRows].filter((d) => d.current !== null).sort((a, b) => (a.current ?? 0) - (b.current ?? 0));

  return (
    <div className="mx-auto max-w-3xl bg-white p-2 print:max-w-none">
      <div className="no-print mb-4 flex justify-end"><PrintButton /></div>

      <header className="border-b-2 border-navy-700 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gold-700">Enterprise Management Diagnostic Report</p>
            <h1 className="mt-1 text-2xl font-bold text-navy-700">{company.tradingName ?? company.legalName}</h1>
          </div>
          <div className="text-right text-xs text-ink-muted">
            <div>Management Capital Lab</div>
            <div>Generated {fmtDate(new Date())}</div>
            <div className="mt-1 inline-block rounded bg-gold/15 px-1.5 py-0.5 font-semibold text-gold-700">DEMO DATA</div>
          </div>
        </div>
      </header>

      <section className="mt-5 grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
        <div><span className="text-ink-muted">Sector:</span> {company.sector}</div>
        <div><span className="text-ink-muted">Country:</span> {company.country}</div>
        <div><span className="text-ink-muted">Stage:</span> {company.stage}</div>
        <div><span className="text-ink-muted">Employees:</span> {company.employees ?? "—"}</div>
        <div><span className="text-ink-muted">Advisor:</span> {company.advisor?.name ?? "—"}</div>
        <div><span className="text-ink-muted">Programme:</span> {company.programme?.name ?? "—"}</div>
      </section>

      <section className="mt-5">
        <h2 className="text-sm font-bold uppercase text-navy-700">Executive summary</h2>
        <div className="mt-2 flex gap-6">
          <div><div className="text-xs text-ink-muted">Overall maturity</div><div className="text-2xl font-bold text-gold-700">{fmtScore(latest?.overallScore)}</div><div className="text-xs">{maturityBand(latest?.overallScore).label}</div></div>
          <div><div className="text-xs text-ink-muted">Completeness</div><div className="text-2xl font-bold text-navy-700">{Math.round((latest?.completeness ?? 0) * 100)}%</div></div>
          <div><div className="text-xs text-ink-muted">Evidence coverage</div><div className="text-2xl font-bold text-navy-700">{Math.round((latest?.evidenceCoverage ?? 0) * 100)}%</div></div>
        </div>
        <p className="mt-2 text-sm text-ink">
          Strongest capabilities: {ranked.slice(-2).map((d) => d.name).join(", ") || "—"}. Most material gaps: {ranked.slice(0, 2).map((d) => d.name).join(", ") || "—"}.
        </p>
      </section>

      <section className="mt-5">
        <h2 className="text-sm font-bold uppercase text-navy-700">Capability breakdown</h2>
        <table className="mt-2 w-full text-sm">
          <thead><tr className="border-b border-navy/20"><th className="py-1 text-left">Dimension</th><th className="py-1 text-right">Baseline</th><th className="py-1 text-right">Current</th><th className="py-1 text-right">Band</th></tr></thead>
          <tbody>
            {dimRows.map((d) => (
              <tr key={d.key} className="border-b border-navy/5"><td className="py-1">{d.name}</td><td className="py-1 text-right text-ink-muted">{fmtScore(d.baseline)}</td><td className="py-1 text-right font-medium">{fmtScore(d.current)}</td><td className="py-1 text-right">{maturityBand(d.current).label}</td></tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mt-5">
        <h2 className="text-sm font-bold uppercase text-navy-700">Priority recommendations</h2>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
          {ranked.slice(0, 3).map((d) => <li key={d.key}>Strengthen {d.name.toLowerCase()} (current {fmtScore(d.current)}, gap to 4.0 = {(4 - (d.current ?? 0)).toFixed(2)}).</li>)}
        </ol>
      </section>

      <section className="mt-5">
        <h2 className="text-sm font-bold uppercase text-navy-700">Underlying constraints</h2>
        {company.constraints.length === 0 ? <p className="mt-1 text-sm text-ink-muted">No non-management constraints flagged.</p> : (
          <ul className="mt-1 text-sm">{company.constraints.map((c) => <li key={c.id}>• {CONSTRAINT_LABELS[c.type] ?? c.type} — {c.severity} ({c.note})</li>)}</ul>
        )}
      </section>

      <section className="mt-5">
        <h2 className="text-sm font-bold uppercase text-navy-700">Business performance</h2>
        <table className="mt-2 w-full text-sm">
          <thead><tr className="border-b border-navy/20"><th className="py-1 text-left">KPI</th><th className="py-1 text-right">Baseline</th><th className="py-1 text-right">Current</th><th className="py-1 text-right">Change</th></tr></thead>
          <tbody>
            {company.kpis.map((k) => { const ch = pctChange(k.baseline, k.actual); return (
              <tr key={k.id} className="border-b border-navy/5"><td className="py-1">{k.definition.name}</td><td className="py-1 text-right text-ink-muted">{k.baseline === null ? "—" : fmtNumber(k.baseline)}</td><td className="py-1 text-right">{k.actual === null ? "—" : fmtNumber(k.actual)}</td><td className="py-1 text-right">{ch.value === null ? ch.note : `${ch.value >= 0 ? "+" : ""}${ch.value.toFixed(1)}%`}</td></tr>
            ); })}
          </tbody>
        </table>
      </section>

      <section className="mt-5 rounded border border-navy/15 bg-surface-muted p-3 text-xs text-ink-muted">
        <strong className="text-navy-700">Evidence & assessment limitations.</strong> Scores reflect a custom SME maturity assessment, not validated WMS scores. Founder-provided evidence is independently verified only when confirmed by a reviewer. Associations between management quality and financial outcomes are not treated as causal. All data is fictional (demo).
      </section>
    </div>
  );
}

import { PageHeader, Panel } from "@/components/ui/Page";
import { MATURITY_ANCHORS, DIMENSION_META } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default function ResearchPage() {
  return (
    <>
      <PageHeader title="Research & Methodology" subtitle="Evidence base, adaptations, limitations and measurement definitions." />
      <div className="mx-auto max-w-3xl space-y-5">
        <Panel title="Evidence base">
          <div className="space-y-3 text-sm text-ink">
            <p>This platform's framework is informed by the publicly described constructs of the <strong>World Management Survey (WMS)</strong> and the <em>Management Matters: Manufacturing</em> work, which assess actual management practices through structured interviews across lean operations, performance monitoring, target management and talent management.</p>
            <p className="rounded-lg border border-amber-200 bg-amber-50/70 p-3 text-amber-900">
              <strong>Research-integrity notice.</strong> This is an original SME assessment instrument. It is <strong>not</strong> an official WMS instrument, and its scores are <strong>not</strong> validated WMS scores. We do not reproduce proprietary WMS questionnaire wording or anchors. Associations between management quality and financial outcomes are not treated as causal, and international research findings are not applied as automatic expected improvements for enterprises in this portfolio.
            </p>
            <p>The WMS manufacturing sample covers firms with roughly 50–5,000 employees. Its findings and scoring approach are <strong>not</strong> assumed to transfer unchanged to microenterprises or early-stage startups, so this instrument uses proportionate, size-aware expectations and allows questions to be marked not-applicable.</p>
            <ul className="list-disc space-y-1 pl-5 text-ink-muted">
              <li>World Management Survey — worldmanagementsurvey.org</li>
              <li>Development WMS methodology — worldmanagementsurvey.org/data/dwms-public-sector/methodology</li>
              <li>Benchmarking — worldmanagementsurvey.org/policy-business-reports/benchmark-your-organization</li>
            </ul>
          </div>
        </Panel>

        <Panel title="Custom SME maturity scale (0–4)">
          <p className="mb-3 text-sm text-ink-muted">These are custom maturity anchors for this instrument — not the official WMS scale.</p>
          <ul className="space-y-2">
            {MATURITY_ANCHORS.map((a) => (
              <li key={a.score} className="flex gap-3 rounded-lg bg-surface-muted p-3 text-sm">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-navy-700 font-semibold text-white">{a.score}</span>
                <div><div className="font-medium text-navy-700">{a.label}</div><div className="text-xs text-ink-muted">{a.desc}</div></div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="The eight capability dimensions (custom SME extension)">
          <ul className="grid gap-2 sm:grid-cols-2">
            {DIMENSION_META.map((d) => (
              <li key={d.key} className="rounded-lg border border-navy/10 p-3 text-sm"><div className="font-medium text-navy-700">{d.name}</div><div className="text-xs text-ink-muted">{d.description}</div></li>
            ))}
          </ul>
        </Panel>

        <Panel title="Measurement definitions & calculations">
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-ink-muted">
            <li><strong>Dimension score</strong> = weighted average of applicable, answered question scores. Unanswered questions are never scored as zero.</li>
            <li><strong>Overall maturity</strong> = weighted average across dimensions that have a score (equal dimension weights by default; configurable by authorised admins).</li>
            <li><strong>Completeness</strong> = applicable questions answered ÷ total applicable. Reported separately from maturity.</li>
            <li><strong>Evidence coverage</strong> = answered items with verified evidence ÷ answered items. Founder-provided evidence is not independently verified until a reviewer confirms it.</li>
            <li><strong>Three distinct measures</strong>: management capability maturity, implementation progress, and business performance — each has its own metrics. Capability maturity changes only through a documented reassessment, never because a task was marked complete.</li>
            <li><strong>Intervention priority</strong> = gap×2 + importance×1.5 + risk×1.5 + feasibility×1 + evidence-confidence×0.5 (transparent; advisor-overridable with a recorded reason).</li>
          </ul>
        </Panel>

        <Panel title="Version history">
          <ul className="text-sm text-ink-muted"><li><strong>Framework v1.0</strong> — initial eight-dimension SME instrument, ~40 questions, equal weights.</li></ul>
        </Panel>
      </div>
    </>
  );
}

import { PageHeader, Panel } from "@/components/ui/Page";
import { MATURITY_ANCHORS, DIMENSION_META, READINESS_BANDS } from "@/lib/constants";
import { ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

export default function ResearchPage() {
  return (
    <>
      <PageHeader title="Research & Methodology" subtitle="The framework, the scale, the measurement definitions and the limitations." />
      <div className="mx-auto max-w-3xl space-y-5">
        <Panel title="The framework — the Management Capital Index">
          <div className="space-y-3 text-sm text-ink">
            <p>This platform operationalises the <strong>Management Capital Index</strong>, the framework from Mary Ndinda&apos;s DBA research into management capital and SME finance-readiness. It assesses a business across <strong>six pillars</strong> and expresses overall readiness as a single index from 0 to 100.</p>
            <a href="https://www.managementcapitallab.com/framework" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-medium text-gold-700 hover:underline">
              Read the published framework <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <p className="rounded-lg border border-amber-200 bg-amber-50/70 p-3 text-amber-900">
              <strong>Research-integrity notice.</strong> This is an original SME instrument — it is <strong>not</strong> the World Management Survey (WMS) and its scores are <strong>not</strong> validated WMS scores. Associations between management quality and financial outcomes are not treated as causal, and size-aware expectations apply (questions can be marked not-applicable). Self-assessments are self-reported until an independent reviewer verifies the evidence.
            </p>
          </div>
        </Panel>

        <Panel title="The six pillars">
          <ul className="grid gap-2 sm:grid-cols-2">
            {DIMENSION_META.map((d, i) => (
              <li key={d.key} className="rounded-lg border border-navy/10 p-3 text-sm">
                <div className="font-medium text-navy-700"><span className="text-gold-700">{String(i + 1).padStart(2, "0")}</span> &nbsp;{d.name}</div>
                <div className="mt-0.5 text-xs text-ink-muted">{d.description}</div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Readiness bands (Index 0–100)">
          <ul className="space-y-2">
            {READINESS_BANDS.map((b) => (
              <li key={b.label} className="flex gap-3 rounded-lg bg-surface-muted p-3 text-sm">
                <span className="grid h-7 shrink-0 place-items-center rounded-md bg-navy-700 px-2 text-xs font-semibold text-white">{b.min}–{b.max}</span>
                <div><div className="font-medium text-navy-700">{b.label}</div><div className="text-xs text-ink-muted">{b.description}</div></div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="The answer scale (0–4 per question)">
          <p className="mb-3 text-sm text-ink-muted">Each diagnostic question is answered on this 0–4 maturity scale; pillar and overall scores roll up and are expressed as the Index out of 100.</p>
          <ul className="space-y-2">
            {MATURITY_ANCHORS.map((a) => (
              <li key={a.score} className="flex gap-3 rounded-lg bg-surface-muted p-3 text-sm">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-navy-700 font-semibold text-white">{a.score}</span>
                <div><div className="font-medium text-navy-700">{a.label}</div><div className="text-xs text-ink-muted">{a.desc}</div></div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Measurement definitions & calculations">
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-ink-muted">
            <li><strong>Pillar score</strong> = weighted average of applicable, answered question scores (0–4). Unanswered questions are never scored as zero.</li>
            <li><strong>Management Capital Index</strong> = the overall score across pillars, rescaled to 0–100 (equal pillar weights by default; configurable by authorised admins).</li>
            <li><strong>Completeness</strong> = applicable questions answered ÷ total applicable. Reported separately from the Index.</li>
            <li><strong>Evidence coverage</strong> = answered items with verified evidence ÷ answered items. Founder-provided evidence is not counted as verified until a reviewer confirms it.</li>
            <li><strong>Three distinct measures</strong>: management capability, implementation progress, and business performance — each has its own metrics. Capability changes only through a documented reassessment, never because a task was marked complete.</li>
            <li><strong>Intervention priority</strong> = gap×2 + importance×1.5 + risk×1.5 + feasibility×1 + evidence-confidence×0.5 (transparent; advisor-overridable with a recorded reason).</li>
          </ul>
        </Panel>

        <Panel title="Version history">
          <ul className="text-sm text-ink-muted"><li><strong>Management Capital Index v1.0</strong> — six pillars, their published diagnostic questions, equal weights, scored 0–100.</li></ul>
        </Panel>
      </div>
    </>
  );
}

import type { ReactNode } from "react";
import type { ExtraSection, SectionId, Workstream } from "@/content/types";
import { sectionOrder, sectionTitles } from "@/content/workstreams";
import { Blocks } from "./blocks";
import { EvidenceBadge } from "./evidence-badge";
import { ResponsiveTable } from "./responsive-table";

function Disclosure({ id, title, number, badge, defaultOpen, children }: { id: string; title: string; number?: string; badge?: ReactNode; defaultOpen?: boolean; children: ReactNode }) {
  return (
    <details id={id} open={defaultOpen} className="group scroll-mt-24 border-b border-rule">
      <summary className="flex items-start gap-4 py-5 hover:bg-paper-2/60 sm:gap-6 sm:px-2">
        <span aria-hidden="true" className="num-tab w-7 shrink-0 pt-1 font-serif text-sm text-gold">
          {number ?? "·"}
        </span>
        <span className="flex flex-1 flex-wrap items-center gap-x-3 gap-y-1.5">
          <h2 className="text-[1.45rem] leading-tight text-ink sm:text-2xl">{title}</h2>
          {badge}
        </span>
        <span aria-hidden="true" className="chev mt-2 shrink-0 text-ink-3 transition-transform">
          ▸
        </span>
      </summary>
      <div className="pb-8 pl-11 pr-1 sm:pl-[3.75rem] sm:pr-2">{children}</div>
    </details>
  );
}

function ColumnList({ heading, items }: { heading: string; items: string[] }) {
  return (
    <div>
      <h3 className="eyebrow">{heading}</h3>
      <ul className="mt-3 space-y-2.5 text-[0.95rem] leading-relaxed text-ink-2">
        {items.map((it, i) => (
          <li key={i} className="border-l-2 border-rule pl-3">
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function standardBody(w: Workstream, id: SectionId): ReactNode {
  switch (id) {
    case "outcome":
      return (
        <div className="grid max-w-5xl gap-6 md:grid-cols-2">
          <div>
            <h3 className="eyebrow">Outcome</h3>
            <p className="mt-2 text-lg leading-relaxed text-ink">{w.outcome.intended}</p>
          </div>
          <div>
            <h3 className="eyebrow">Why it matters</h3>
            <p className="mt-2 leading-relaxed text-ink-2">{w.outcome.why}</p>
          </div>
        </div>
      );
    case "before-acting":
      return (
        <div className="grid gap-8 lg:grid-cols-3">
          <ColumnList heading="Data" items={w.establishFirst.data} />
          <ColumnList heading="Conversations" items={w.establishFirst.conversations} />
          <ColumnList heading="Mandate and constraints" items={w.establishFirst.constraints} />
        </div>
      );
    case "method":
      return (
        <ol className="max-w-4xl space-y-5">
          {w.method.map((m, i) => (
            <li key={i} className="grid grid-cols-[2.25rem_1fr] gap-3">
              <span aria-hidden="true" className="num-tab grid h-8 w-8 place-items-center rounded-full border border-ink/20 font-serif text-sm text-ink">
                {i + 1}
              </span>
              <div>
                <h3 className="font-serif text-lg leading-snug text-ink">
                  <span className="sr-only">Step {i + 1}: </span>
                  {m.title}
                </h3>
                <p className="mt-1 leading-relaxed text-ink-2">{m.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      );
    case "deliverables":
      return (
        <>
          <dl className="grid max-w-5xl gap-x-8 gap-y-4 md:grid-cols-2">
            {w.deliverables.map((d, i) => (
              <div key={i} className="border-t border-rule pt-3">
                <dt className="font-medium text-ink">{d.name}</dt>
                <dd className="mt-1 text-[0.95rem] leading-relaxed text-ink-2">{d.description}</dd>
              </div>
            ))}
          </dl>
          {w.templates.map((t, i) => (
            <ResponsiveTable key={i} caption={t.caption} columns={t.columns} rows={t.rows} evidence={t.evidence} note={t.note} />
          ))}
        </>
      );
    case "ownership":
      return (
        <>
          <p className="mb-5 max-w-3xl text-sm text-ink-3">Actual authorities would be confirmed during onboarding. Recommending is not approving.</p>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            <ColumnList heading="I would lead" items={w.ownership.lead} />
            <ColumnList heading="I would delegate" items={w.ownership.delegate} />
            <ColumnList heading="I would recommend" items={w.ownership.recommend} />
            <ColumnList heading="I would escalate" items={w.ownership.escalate} />
          </div>
          <ResponsiveTable caption="Dependencies" columns={["Function", "What I would need from them"]} rows={w.ownership.dependencies.map((d) => [d.party, d.need])} evidence="proposed" />
        </>
      );
    case "gates":
      return (
        <ResponsiveTable
          caption="Decision gates"
          evidence="proposed"
          columns={["Gate", "Proceed if", "Defer or decline if"]}
          rows={w.gates.map((g) => [g.gate, g.proceedIf, g.deferOrDeclineIf])}
        />
      );
    case "kpis":
      return (
        <>
          <h3 className="eyebrow">Cadence</h3>
          <ul className="mt-3 max-w-4xl space-y-1.5 pl-5 text-ink-2 marker:text-gold list-disc">
            {w.cadence.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
          <ResponsiveTable
            caption="Key performance indicators"
            evidence="proposed"
            columns={["KPI", "Definition", "Source", "Owner", "Frequency", "Proposed threshold"]}
            rows={w.kpis.map((k) => [k.name, k.definition, k.source, k.owner, k.frequency, k.threshold ?? "None set; monitored"])}
            note="Thresholds are proposals for discussion, to be calibrated against actual baselines and the firm's existing policies."
          />
        </>
      );
    case "risks":
      return <ResponsiveTable caption="Risks, trade-offs and mitigations" evidence="proposed" columns={["Risk", "Trade-off", "Mitigation"]} rows={w.risks.map((r) => [r.risk, r.tradeoff, r.mitigation])} />;
    case "timeline":
      return (
        <div className="grid max-w-5xl gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-rule bg-white/60 p-5">
            <h3 className="eyebrow">First 90 days: output</h3>
            <p className="mt-2 leading-relaxed text-ink-2">{w.timeline.first90}</p>
          </div>
          <div className="rounded-lg border border-rule bg-white/60 p-5">
            <h3 className="eyebrow">Months 4–12: outcome</h3>
            <p className="mt-2 leading-relaxed text-ink-2">{w.timeline.months4to12}</p>
          </div>
        </div>
      );
    case "success":
      return (
        <div className="grid max-w-5xl gap-8 md:grid-cols-[1.3fr_1fr]">
          <div>
            <h3 className="eyebrow">What success looks like</h3>
            <p className="mt-2 text-lg leading-relaxed text-ink">{w.success.looksLike}</p>
          </div>
          <ColumnList heading="Assumptions to validate" items={w.success.assumptions} />
        </div>
      );
  }
}

export function WorkstreamSections({ w }: { w: Workstream }) {
  const extrasAfter = (id: SectionId): ExtraSection[] => w.extras?.filter((e) => e.after === id) ?? [];
  return (
    <div className="border-t border-rule">
      {sectionOrder.map((id, i) => (
        <div key={id}>
          <Disclosure id={id} title={sectionTitles[id]} number={String(i + 1).padStart(2, "0")} defaultOpen={id === "outcome"} badge={<EvidenceBadge kind="proposed" />}>
            {standardBody(w, id)}
          </Disclosure>
          {extrasAfter(id).map((x) => (
            <Disclosure key={x.id} id={x.id} title={x.title} badge={<EvidenceBadge kind={x.evidence} />}>
              <Blocks blocks={x.blocks} />
            </Disclosure>
          ))}
        </div>
      ))}
    </div>
  );
}

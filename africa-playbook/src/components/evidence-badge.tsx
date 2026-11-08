import type { EvidenceClass } from "@/content/types";

export const evidenceMeta: Record<EvidenceClass, { label: string; long: string; cls: string; glyph: string }> = {
  public: {
    label: "Public source",
    long: "Public source fact, with source and date.",
    cls: "bg-slate-2 text-ink border-ink/25",
    glyph: "§",
  },
  candidate: {
    label: "Candidate-supplied",
    long: "Candidate-supplied experience, awaiting verification for external circulation.",
    cls: "bg-gold-2 text-[#5d4210] border-gold/40",
    glyph: "◐",
  },
  proposed: {
    label: "Proposed approach",
    long: "Proposed approach. Not an existing Abler Nordic policy.",
    cls: "bg-emerald-2 text-emerald border-emerald/30",
    glyph: "→",
  },
  illustrative: {
    label: "Illustrative",
    long: "Illustrative data. Fictional and not investment guidance.",
    cls: "bg-paper-3 text-ink-2 border-ink/25 border-dashed",
    glyph: "◇",
  },
};

/** Text + glyph label. Never relies on colour alone. */
export function EvidenceBadge({ kind, className = "" }: { kind: EvidenceClass; className?: string }) {
  const m = evidenceMeta[kind];
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.08em] ${m.cls} ${className}`}
      title={m.long}
    >
      <span aria-hidden="true">{m.glyph}</span>
      {m.label}
      <span className="sr-only">: {m.long}</span>
    </span>
  );
}

export function EvidenceLegend() {
  return (
    <dl className="grid gap-2.5 text-sm">
      {(Object.keys(evidenceMeta) as EvidenceClass[]).map((k) => (
        <div key={k} className="flex flex-wrap items-start gap-x-3 gap-y-1">
          <dt><EvidenceBadge kind={k} /></dt>
          <dd className="text-ink-2">{evidenceMeta[k].long}</dd>
        </div>
      ))}
    </dl>
  );
}

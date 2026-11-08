import type { Block, FlowBlock } from "@/content/types";
import { EvidenceBadge } from "./evidence-badge";
import { ResponsiveTable } from "./responsive-table";

const calloutTone: Record<string, { cls: string; label: string }> = {
  gate: { cls: "border-l-emerald bg-emerald-2/60", label: "Decision gate" },
  note: { cls: "border-l-ink-3 bg-paper-2", label: "Note" },
  risk: { cls: "border-l-risk bg-risk-2/60", label: "Risk" },
  example: { cls: "border-l-gold bg-gold-2/50", label: "Worked example" },
};

export function Flow({ block }: { block: FlowBlock }) {
  return (
    <figure className="my-6">
      <figcaption className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <span className="font-serif text-[1.05rem] text-ink">{block.caption}</span>
        <EvidenceBadge kind={block.evidence} />
      </figcaption>
      <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(10rem,1fr))]">
        {block.steps.map((s, i) => (
          <li key={i} className="avoid-break relative rounded-lg border border-rule bg-white/70 p-3.5">
            <span className="num-tab font-serif text-sm text-gold" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-1 font-medium leading-snug text-ink">
              <span className="sr-only">Step {i + 1}: </span>
              {s.label}
            </p>
            {s.detail ? <p className="mt-1.5 text-[0.84rem] leading-relaxed text-ink-2">{s.detail}</p> : null}
          </li>
        ))}
      </ol>
    </figure>
  );
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.kind) {
          case "p":
            return (
              <p key={i} className="my-3 max-w-[70ch] leading-relaxed text-ink-2">
                {b.text}
              </p>
            );
          case "list": {
            const Tag = b.ordered ? "ol" : "ul";
            return (
              <Tag key={i} className={`my-3 max-w-[70ch] space-y-1.5 pl-5 text-ink-2 ${b.ordered ? "list-decimal" : "list-disc"} marker:text-gold`}>
                {b.items.map((it, j) => (
                  <li key={j} className="pl-1 leading-relaxed">
                    {it}
                  </li>
                ))}
              </Tag>
            );
          }
          case "table":
            return <ResponsiveTable key={i} caption={b.caption} columns={b.columns} rows={b.rows} evidence={b.evidence} note={b.note} />;
          case "callout": {
            const t = calloutTone[b.tone];
            return (
              <aside key={i} className={`avoid-break my-5 max-w-[75ch] rounded-r-lg border-l-4 p-4 ${t.cls}`} aria-label={`${t.label}: ${b.title}`}>
                <p className="flex flex-wrap items-center gap-2">
                  <span className="eyebrow">{t.label}</span>
                  {b.evidence ? <EvidenceBadge kind={b.evidence} /> : null}
                </p>
                <p className="mt-1.5 font-serif text-lg text-ink">{b.title}</p>
                <p className="mt-1.5 leading-relaxed text-ink-2">{b.text}</p>
              </aside>
            );
          }
          case "flow":
            return <Flow key={i} block={b} />;
        }
      })}
    </>
  );
}

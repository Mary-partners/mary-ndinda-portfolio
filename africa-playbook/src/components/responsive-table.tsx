import type { EvidenceClass } from "@/content/types";
import { EvidenceBadge } from "./evidence-badge";

/**
 * Accessible responsive table.
 *  - ≥ md: a real <table> with a scrollable container and sticky first column.
 *  - < md: each row becomes a stacked panel that repeats the column headings,
 *    so comparability is preserved without horizontal scrolling.
 * Only one presentation is displayed at a time (CSS), so assistive tech reads
 * the content once. Print always uses the real table.
 */
export function ResponsiveTable({
  caption,
  columns,
  rows,
  evidence,
  note,
  rowHeader = true,
  dense = false,
}: {
  caption: string;
  columns: string[];
  rows: string[][];
  evidence?: EvidenceClass;
  note?: string;
  rowHeader?: boolean;
  dense?: boolean;
}) {
  const pad = dense ? "px-3 py-2" : "px-3.5 py-2.5";
  return (
    <figure className="my-6">
      <figcaption className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <span className="font-serif text-[1.05rem] text-ink">{caption}</span>
        {evidence ? <EvidenceBadge kind={evidence} /> : null}
      </figcaption>

      <div className="rt-table hidden overflow-x-auto rounded-lg border border-rule bg-white/60 md:block" role="region" aria-label={caption} tabIndex={0}>
        <table className="w-full border-collapse text-left text-[0.86rem] leading-snug">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-rule bg-paper-2">
              {columns.map((c, i) => (
                <th
                  key={i}
                  scope="col"
                  className={`${pad} align-bottom text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-ink-2 ${i === 0 ? "sticky left-0 z-10 min-w-[11rem] bg-paper-2" : "min-w-[8rem]"}`}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, ri) => (
              <tr key={ri} className="border-b border-rule/70 last:border-0 even:bg-paper/60">
                {r.map((cell, ci) =>
                  ci === 0 && rowHeader ? (
                    <th key={ci} scope="row" className={`${pad} sticky left-0 z-10 bg-[#fdfbf7] align-top font-medium text-ink`}>
                      {cell}
                    </th>
                  ) : (
                    <td key={ci} className={`${pad} num-tab align-top text-ink-2`}>
                      {cell}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="rt-stack space-y-3 md:hidden" aria-label={caption}>
        {rows.map((r, ri) => (
          <li key={ri} className="avoid-break rounded-lg border border-rule bg-white/60">
            <p className="border-b border-rule bg-paper-2 px-3.5 py-2 font-medium text-ink">
              <span className="sr-only">{columns[0]}: </span>
              {r[0]}
            </p>
            <dl className="divide-y divide-rule/70">
              {r.slice(1).map((cell, ci) => (
                <div key={ci} className="grid grid-cols-[minmax(0,38%)_1fr] gap-3 px-3.5 py-2 text-[0.88rem]">
                  <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.05em] text-ink-3">{columns[ci + 1]}</dt>
                  <dd className="num-tab text-ink-2">{cell}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>

      {note ? <p className="mt-2 text-[0.8rem] leading-relaxed text-ink-3">{note}</p> : null}
    </figure>
  );
}

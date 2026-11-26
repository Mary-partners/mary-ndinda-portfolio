import type { PillarResult, ActionCandidate } from "@/lib/scoring-v2";

// v2 maturity bands mapped onto the 0-100 display scale (0.5/1.5/2.5/3.5 * 25).
const BANDS = [
  { label: "Starting out", from: 0, to: 12.5 },
  { label: "Used occasionally", from: 12.5, to: 37.5 },
  { label: "Developing", from: 37.5, to: 62.5 },
  { label: "Strong", from: 62.5, to: 87.5 },
  { label: "Embedded", from: 87.5, to: 100 },
];

function bandTone(label: string): string {
  if (label === "Embedded" || label === "Strong") return "bg-emerald-50 text-emerald-700";
  if (label === "Developing") return "bg-amber-50 text-amber-700";
  if (label === "Starting out" || label === "Used occasionally") return "bg-rose-50 text-rose-700";
  return "bg-navy-700/10 text-navy-700";
}

export function BandChip({ label }: { label: string }) {
  return <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${bandTone(label)}`}>{label}</span>;
}

export function BandScale({ mci }: { mci: number }) {
  const pos = Math.max(0, Math.min(100, mci));
  return (
    <div className="mt-4">
      <div className="relative pt-6">
        <div className="absolute top-0 -translate-x-1/2" style={{ left: `${pos}%` }}>
          <div className="whitespace-nowrap rounded-md bg-navy-800 px-1.5 py-0.5 text-[11px] font-semibold text-white">You: {mci}</div>
          <div className="mx-auto h-2 w-0.5 bg-navy-800" />
        </div>
        <div className="flex h-3 overflow-hidden rounded-full">
          {BANDS.map((b, i) => {
            const here = pos >= b.from && pos <= b.to;
            const shade = ["bg-navy/10", "bg-navy/20", "bg-navy/30", "bg-navy/45", "bg-navy/60"][i];
            return <div key={b.label} className={`${here ? "bg-gold" : shade} ${i > 0 ? "border-l-2 border-white" : ""}`} style={{ width: `${b.to - b.from}%` }} />;
          })}
        </div>
        <div className="relative mt-1.5 h-4 text-[10px] text-ink-muted">
          {BANDS.map((b) => {
            const here = pos >= b.from && pos <= b.to;
            return <span key={b.label} className={`absolute -translate-x-1/2 ${here ? "font-semibold text-navy-700" : ""}`} style={{ left: `${(b.from + b.to) / 2}%` }}>{b.label}</span>;
          })}
        </div>
      </div>
    </div>
  );
}

export function PillarCard({ p, label, description }: { p: PillarResult; label?: string; description?: string }) {
  const gap = p.raw !== null ? (4 - p.raw).toFixed(2) : null;
  return (
    <div className="rounded-lg border border-navy/10 p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-sm font-semibold text-navy-700">{label ?? p.name}</div>
          <div className="text-[11px] text-ink-muted">{p.name}</div>
        </div>
        <div className="text-right">
          <span className="text-lg font-semibold text-navy-800">{p.display ?? "n/a"}</span>
          <div><BandChip label={p.qualifies ? p.band.label : "Insufficient information"} /></div>
        </div>
      </div>
      {p.qualifies ? (
        <>
          <div className="mt-2.5 h-2 rounded-full bg-navy/10"><div className="h-2 rounded-full bg-gold" style={{ width: `${p.display ?? 0}%` }} /></div>
          <div className="mt-1.5 flex items-center justify-between text-[11px] text-ink-muted">
            <span>{description}</span>
            <span className="shrink-0">Gap to embedded: {gap}</span>
          </div>
        </>
      ) : (
        <p className="mt-2 text-[11px] text-ink-muted">Not enough questions were answered in this area to show a score ({p.numericCount} of {p.applicableCount} answered).</p>
      )}
    </div>
  );
}

export function ActionItem({ c, index }: { c: ActionCandidate & { horizon?: string }; index?: number }) {
  const selected =
    c.status === "numeric" && c.selectedAnchor
      ? `You reported: "${c.selectedAnchor}"`
      : c.status === "dontknow"
      ? "You answered: Don't know"
      : "Not answered";
  return (
    <li className="rounded-xl border border-navy/10 bg-surface-muted p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-2">
          {typeof index === "number" && <span className="grid h-6 w-6 place-items-center rounded-full bg-navy-700 text-xs font-semibold text-white">{index}</span>}
          {c.horizon && <span className="text-[11px] font-medium uppercase tracking-wide text-gold-700">{c.horizon}</span>}
          {c.startNow && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">Start now</span>}
        </span>
        <span className="text-[11px] text-ink-muted">{c.pillarName} · {c.code}{c.score !== null ? ` · ${c.score}/4` : ""}</span>
      </div>
      <p className="mt-2 text-sm font-medium text-navy-800">{c.item.action}</p>
      <div className="mt-1.5 space-y-0.5 text-xs text-ink-muted">
        <p><span className="font-medium text-navy-700">Question:</span> {c.item.question}</p>
        <p><span className="font-medium text-navy-700">{selected.split(":")[0]}:</span>{selected.slice(selected.indexOf(":") + 1)}</p>
        <p><span className="font-medium text-navy-700">Why it matters:</span> {c.item.why}</p>
      </div>
    </li>
  );
}

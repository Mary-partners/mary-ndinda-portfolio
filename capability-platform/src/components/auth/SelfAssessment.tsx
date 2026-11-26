"use client";

import * as React from "react";
import { submitSelfAssessment, type SelfResponse } from "@/app/actions/self-assess";
import { Gauge, Loader2, Check, HelpCircle, Ban } from "lucide-react";

type Q = { id: string; text: string; anchors: string[]; eligibility: string | null; evidence: string | null };
type Dim = { key: string; name: string; description: string | null; questions: Q[] };
type Status = "numeric" | "dontknow" | "na";
type Answer = { status: Status | null; score: number | null; hasEvidence: boolean };

const LEVEL_LABELS = ["Not yet in place", "Used occasionally", "In use, still inconsistent", "Part of the routine", "Routinely reviewed and improved"];

export function SelfAssessment({ token, companyName, orgName, defaultFounder, dimensions, embedded = false, returnTo }: {
  token: string; companyName: string; orgName: string; defaultFounder: string; dimensions: Dim[];
  embedded?: boolean; returnTo?: string;
}) {
  const allQ = React.useMemo(() => dimensions.flatMap((d) => d.questions), [dimensions]);
  const [founder, setFounder] = React.useState(defaultFounder);
  const [ans, setAns] = React.useState<Record<string, Answer>>({});
  const [pending, setPending] = React.useState(false);

  const answered = Object.values(ans).filter((a) => a.status !== null).length;
  const total = allQ.length;
  const pct = total ? Math.round((answered / total) * 100) : 0;

  function set(qid: string, patch: Partial<Answer>) {
    setAns((prev) => {
      const base: Answer = prev[qid] ?? { status: null, score: null, hasEvidence: false };
      return { ...prev, [qid]: { ...base, ...patch } };
    });
  }

  async function submit() {
    if (pending) return;
    setPending(true);
    const byId = new Map(allQ.map((q) => [q.id, q]));
    const responses: SelfResponse[] = allQ
      .filter((q) => ans[q.id]?.status)
      .map((q) => {
        const a = ans[q.id];
        return {
          questionId: q.id,
          status: a.status as Status,
          score: a.status === "numeric" ? a.score : null,
          reason: a.status === "na" ? byId.get(q.id)?.eligibility ?? "Not applicable" : null,
          hasEvidence: a.hasEvidence,
        };
      });
    try {
      await submitSelfAssessment(token, founder, responses, returnTo);
    } catch (e) {
      if (e && typeof e === "object" && "digest" in e && String((e as { digest?: string }).digest).startsWith("NEXT_REDIRECT")) return;
      setPending(false);
      alert("Something went wrong submitting your assessment. Please try again.");
    }
  }

  return (
    <div className={embedded ? "pb-28" : "min-h-screen bg-surface-muted pb-28"}>
      {!embedded && (
        <header className="bg-navy-800 text-white">
          <div className="mx-auto w-full max-w-3xl px-5 py-7" style={{ paddingLeft: "max(20px, env(safe-area-inset-left,0px))", paddingRight: "max(20px, env(safe-area-inset-right,0px))" }}>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold text-navy-900"><Gauge className="h-5 w-5" /></span>
              <div className="leading-tight"><div className="text-sm font-semibold">Management Capital Lab</div><div className="text-[11px] text-white/55">Self-assessment · invited by {orgName}</div></div>
            </div>
            <h1 className="mt-5 text-2xl font-semibold">Management capability check for {companyName}</h1>
            <p className="mt-2 max-w-xl text-sm text-white/70">About {total} short questions, roughly 15 minutes. For each one, pick the statement that best describes how your business works today. Answer as honestly as you can, there are no right or wrong answers.</p>
          </div>
        </header>
      )}

      <div className="mx-auto w-full max-w-3xl px-5" style={{ paddingLeft: "max(20px, env(safe-area-inset-left,0px))", paddingRight: "max(20px, env(safe-area-inset-right,0px))" }}>
        {embedded && (
          <div className="pt-1">
            <h1 className="text-xl font-semibold text-navy-700">Your diagnostic</h1>
            <p className="mt-1.5 text-sm text-ink-muted">About {total} short questions, roughly 15 minutes. For each one, pick the statement that best describes how your business works today. There are no right or wrong answers. Your answers save when you submit at the bottom.</p>
          </div>
        )}

        <div className="mt-4 rounded-xl border border-navy/10 bg-white p-4">
          <label className="block text-sm font-medium text-navy-700" htmlFor="founder">Your name <span className="font-normal text-ink-muted">(optional)</span></label>
          <input id="founder" value={founder} onChange={(e) => setFounder(e.target.value)} className="input mt-2" placeholder="Who is completing this?" />
        </div>

        {dimensions.map((d, di) => (
          <section key={d.key} className="mt-5">
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-semibold text-gold-700">{String(di + 1).padStart(2, "0")}</span>
              <h2 className="text-base font-semibold text-navy-700">{d.name}</h2>
            </div>
            <div className="mt-3 space-y-3">
              {d.questions.map((q) => {
                const a = ans[q.id];
                return (
                  <div key={q.id} className="rounded-xl border border-navy/10 bg-white p-4">
                    <p className="text-sm font-medium text-navy-800">{q.text}</p>
                    <div className="mt-3 space-y-1.5">
                      {q.anchors.map((text, n) => {
                        const active = a?.status === "numeric" && a?.score === n;
                        return (
                          <button key={n} type="button" onClick={() => set(q.id, { status: "numeric", score: n })}
                            className={`flex w-full items-start gap-2.5 rounded-lg border p-2.5 text-left transition-colors ${active ? "border-navy-700 bg-navy-700/5" : "border-navy/12 hover:bg-surface-muted"}`}>
                            <span className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border ${active ? "border-navy-700" : "border-navy/30"}`}>{active && <span className="h-2 w-2 rounded-full bg-navy-700" />}</span>
                            <span className="min-w-0">
                              <span className="text-sm text-navy-800">{text}</span>
                              <span className="ml-1.5 text-[11px] text-ink-muted">({LEVEL_LABELS[n]})</span>
                            </span>
                          </button>
                        );
                      })}
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        <button type="button" onClick={() => set(q.id, { status: "dontknow", score: null })}
                          className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${a?.status === "dontknow" ? "border-ink-muted bg-ink-muted text-white" : "border-navy/15 text-ink-muted hover:bg-surface-muted"}`}>
                          <HelpCircle className="h-3.5 w-3.5" /> Don&apos;t know
                        </button>
                        {q.eligibility && (
                          <button type="button" onClick={() => set(q.id, { status: "na", score: null })}
                            className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${a?.status === "na" ? "border-ink-muted bg-ink-muted text-white" : "border-navy/15 text-ink-muted hover:bg-surface-muted"}`}>
                            <Ban className="h-3.5 w-3.5" /> Not applicable
                          </button>
                        )}
                      </div>
                      {q.eligibility && a?.status === "na" && (
                        <p className="text-[11px] text-ink-muted">Marked not applicable: {q.eligibility.toLowerCase()}.</p>
                      )}
                    </div>
                    {q.evidence && a?.status === "numeric" && (
                      <label className="mt-2.5 inline-flex cursor-pointer items-center gap-2 text-xs text-ink-muted">
                        <input type="checkbox" checked={a.hasEvidence} onChange={(e) => set(q.id, { hasEvidence: e.target.checked })} className="h-3.5 w-3.5 rounded border-navy/30" />
                        I can show evidence for this ({q.evidence.replace(/\.$/, "").toLowerCase()})
                      </label>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        <p className="mt-6 text-xs text-ink-muted">Your answers are self-reported. They describe the practices you report. Any evidence you note is only treated as verified once an independent reviewer confirms it.</p>
      </div>

      <div className={`fixed inset-x-0 bottom-0 z-20 border-t border-navy/10 bg-white/95 backdrop-blur ${embedded ? "lg:left-60" : ""}`} style={{ paddingBottom: "env(safe-area-inset-bottom,0px)" }}>
        <div className="mx-auto flex w-full max-w-3xl items-center gap-4 px-5 py-3" style={{ paddingLeft: "max(20px, env(safe-area-inset-left,0px))", paddingRight: "max(20px, env(safe-area-inset-right,0px))" }}>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between text-xs text-ink-muted"><span>{answered} of {total} answered</span><span>{pct}%</span></div>
            <div className="mt-1 h-1.5 w-full rounded-full bg-navy/10"><div className="h-1.5 rounded-full bg-gold transition-all" style={{ width: `${pct}%` }} /></div>
          </div>
          <button onClick={submit} disabled={pending || answered === 0}
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-gold px-5 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50">
            {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Submit &amp; get my report <Check className="h-4 w-4" /></>}
          </button>
        </div>
      </div>
    </div>
  );
}

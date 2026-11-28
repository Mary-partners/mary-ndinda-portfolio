"use client";

import * as React from "react";
import { submitSelfAssessment, type SelfResponse } from "@/app/actions/self-assess";
import { Gauge, Loader2, Check, HelpCircle, Ban } from "lucide-react";

type Q = { id: string; text: string; anchors: string[]; eligibility: string | null; evidence: string | null };
type Dim = { key: string; name: string; description: string | null; questions: Q[] };
type Status = "numeric" | "dontknow" | "na";
type Answer = { status: Status | null; score: number | null };

const EVIDENCE_OPTIONS = [
  { v: "yes", l: "Yes, for most of them" },
  { v: "some", l: "For some of them" },
  { v: "no", l: "Not yet" },
];

const LEVEL_LABELS = ["Not yet in place", "Used occasionally", "In use, still inconsistent", "Part of the routine", "Routinely reviewed and improved"];

export function SelfAssessment({ token, companyName, orgName, defaultFounder, dimensions, embedded = false, returnTo }: {
  token: string; companyName: string; orgName: string; defaultFounder: string; dimensions: Dim[];
  embedded?: boolean; returnTo?: string;
}) {
  const allQ = React.useMemo(() => dimensions.flatMap((d) => d.questions), [dimensions]);
  const [founder] = React.useState(defaultFounder);
  const [ans, setAns] = React.useState<Record<string, Answer>>({});
  const [evidence, setEvidence] = React.useState<string | null>(null);
  const [pending, setPending] = React.useState(false);
  const [showGaps, setShowGaps] = React.useState(false);

  const answered = Object.values(ans).filter((a) => a.status !== null).length;
  const total = allQ.length;
  const pct = total ? Math.round((answered / total) * 100) : 0;
  const allAnswered = answered === total && evidence !== null;

  function set(qid: string, patch: Partial<Answer>) {
    setAns((prev) => {
      const base: Answer = prev[qid] ?? { status: null, score: null };
      return { ...prev, [qid]: { ...base, ...patch } };
    });
  }

  async function submit() {
    if (pending) return;
    if (!allAnswered) {
      setShowGaps(true);
      const firstGap = allQ.find((q) => !ans[q.id]?.status);
      const el = firstGap ? document.getElementById(`q-${firstGap.id}`) : document.getElementById("evidence-q");
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
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
        };
      });
    try {
      await submitSelfAssessment(token, founder, responses, returnTo, evidence ?? undefined);
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

        {dimensions.map((d, di) => (
          <section key={d.key} className="mt-5">
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-semibold text-gold-700">{String(di + 1).padStart(2, "0")}</span>
              <h2 className="text-base font-semibold text-navy-700">{d.name}</h2>
            </div>
            <div className="mt-3 space-y-3">
              {d.questions.map((q) => {
                const a = ans[q.id];
                const missing = showGaps && !a?.status;
                return (
                  <div key={q.id} id={`q-${q.id}`} className={`rounded-xl border bg-white p-4 ${missing ? "border-rose-300 ring-1 ring-rose-200" : "border-navy/10"}`}>
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
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        {/* One overall evidence question at the end */}
        <section className="mt-6" id="evidence-q">
          <div className={`rounded-xl border bg-white p-4 ${showGaps && evidence === null ? "border-rose-300 ring-1 ring-rose-200" : "border-navy/10"}`}>
            <p className="text-sm font-medium text-navy-800">If an advisor reviewed your business, could you show supporting evidence for the answers you gave?</p>
            <p className="mt-1 text-xs text-ink-muted">This does not change your score. It helps an advisor know what to expect.</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {EVIDENCE_OPTIONS.map((o) => (
                <button key={o.v} type="button" onClick={() => setEvidence(o.v)}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${evidence === o.v ? "border-navy-700 bg-navy-700 text-white" : "border-navy/15 text-navy-700 hover:bg-surface-muted"}`}>{o.l}</button>
              ))}
            </div>
          </div>
        </section>

        <p className="mt-5 text-xs text-ink-muted">Every question must be answered. Your answers are self-reported and describe the practices you report. Evidence is only treated as verified once an independent reviewer confirms it.</p>
      </div>

      <div className={`fixed inset-x-0 bottom-0 z-20 border-t border-navy/10 bg-white/95 backdrop-blur ${embedded ? "lg:left-60" : ""}`} style={{ paddingBottom: "env(safe-area-inset-bottom,0px)" }}>
        <div className="mx-auto flex w-full max-w-3xl items-center gap-4 px-5 py-3" style={{ paddingLeft: "max(20px, env(safe-area-inset-left,0px))", paddingRight: "max(20px, env(safe-area-inset-right,0px))" }}>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between text-xs text-ink-muted">
              <span>{answered} of {total} answered{answered === total && evidence === null ? " · 1 question left below" : ""}</span>
              <span>{pct}%</span>
            </div>
            <div className="mt-1 h-1.5 w-full rounded-full bg-navy/10"><div className="h-1.5 rounded-full bg-gold transition-all" style={{ width: `${pct}%` }} /></div>
          </div>
          <button onClick={submit} disabled={pending}
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-gold px-5 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50">
            {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Submit &amp; get my report <Check className="h-4 w-4" /></>}
          </button>
        </div>
      </div>
    </div>
  );
}

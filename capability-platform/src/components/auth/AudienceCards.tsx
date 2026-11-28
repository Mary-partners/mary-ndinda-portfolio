"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

function ExampleTag() {
  return (
    <span className="absolute right-2.5 top-2.5 rounded-full bg-navy-700/8 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-ink-muted">
      Example
    </span>
  );
}

// Shape + text so status reads without relying on colour.
function Status({ level }: { level: "in" | "started" | "needs" }) {
  const map = {
    in: { glyph: "●", label: "In place", tone: "text-emerald-700" },
    started: { glyph: "◑", label: "Started", tone: "text-amber-700" },
    needs: { glyph: "○", label: "Needs work", tone: "text-rose-700" },
  }[level];
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-medium ${map.tone}`}>
      <span aria-hidden className="text-[10px]">{map.glyph}</span> {map.label}
    </span>
  );
}

function Bar({ filled }: { filled: number }) {
  return (
    <span aria-hidden className="inline-flex gap-0.5">
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className={`h-2 w-4 rounded-sm ${i < filled ? "bg-gold" : "bg-navy/12"}`} />
      ))}
    </span>
  );
}

// The "moving" part: the founder card cycles through real plan actions.
const PLAN_EXAMPLES = [
  { window: "Days 1-30", tag: "Start this week", title: "Build an eight-week cash plan", done: "Four weekly updates are recorded." },
  { window: "Days 31-60", tag: "Next", title: "Write down who signs off on spending", done: "A one-page approvals list is shared." },
  { window: "Days 61-90", tag: "Then", title: "Review last month's numbers with your team", done: "One monthly review is held." },
];

function RotatingPlan() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % PLAN_EXAMPLES.length), 3600);
    return () => clearInterval(id);
  }, []);
  const ex = PLAN_EXAMPLES[i];
  return (
    <figure role="img" aria-label="Example action from a 90-day plan, cycling through the first steps a founder would take." className="relative mt-4 rounded-xl border border-navy/10 bg-surface-muted p-3.5">
      <ExampleTag />
      {/* key forces the cross-fade each time the example changes */}
      <div key={i} className="animate-swap-in rounded-lg border border-navy/10 bg-white p-3 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-gold-700">{ex.window}</span>
          <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-semibold text-amber-700">{ex.tag}</span>
        </div>
        <div className="mt-1.5 text-sm font-semibold text-navy-800">{ex.title}</div>
        <div className="mt-1 text-[11px] text-ink-muted"><span className="font-medium text-navy-700">Done when:</span> {ex.done}</div>
      </div>
      {/* progress dots */}
      <div className="mt-2 flex items-center gap-1.5">
        {PLAN_EXAMPLES.map((_, n) => (
          <span key={n} className={`h-1 rounded-full transition-all duration-500 ${n === i ? "w-5 bg-gold" : "w-1.5 bg-navy/15"}`} />
        ))}
      </div>
    </figure>
  );
}

export function AudienceCards() {
  return (
    <section className="mt-12 lg:mt-16">
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 animate-soft-pulse rounded-full bg-gold" />
        <h2 className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Who the Management Capital Index is for</h2>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {/* FOR FOUNDERS */}
        <article className="rise lift flex flex-col rounded-2xl border border-navy/10 bg-white p-5 shadow-card hover:shadow-lg" style={{ animationDelay: "60ms" }}>
          <div className="text-[11px] font-semibold uppercase tracking-wide text-gold-700">For founders</div>
          <h3 className="mt-1 text-base font-semibold text-navy-700">Know what to work on next</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">See which routines are helping your business run well. Get a 90-day plan that turns your answers into practical next steps.</p>

          <RotatingPlan />

          <div className="mt-4 flex-1" />
          <Link href="/start" className="group mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700 hover:underline">
            Take the diagnostic <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </article>

        {/* FOR ENTERPRISE SUPPORT TEAMS */}
        <article className="rise lift flex flex-col rounded-2xl border border-navy/10 bg-white p-5 shadow-card hover:shadow-lg" style={{ animationDelay: "150ms" }}>
          <div className="text-[11px] font-semibold uppercase tracking-wide text-gold-700">For enterprise support teams</div>
          <h3 className="mt-1 text-base font-semibold text-navy-700">See where ventures need support</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">Assess management capabilities across your ventures, identify common gaps, and decide where coaching or technical assistance would help.</p>

          <figure role="img" aria-label="Example cohort view: three ventures scored on cash planning and decision roles, with status labels in place, started, and needs work." className="relative mt-4 animate-float rounded-xl border border-navy/10 bg-surface-muted p-3.5" style={{ animationDelay: "0.8s" }}>
            <ExampleTag />
            <div className="overflow-hidden rounded-lg border border-navy/10 bg-white">
              <div className="grid grid-cols-[1.2fr_1fr_1fr] gap-2 border-b border-navy/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wide text-ink-muted">
                <span>Venture</span><span>Cash planning</span><span>Decision roles</span>
              </div>
              {[
                { v: "Acacia Foods", a: "started", b: "needs" },
                { v: "Riverbed Co.", a: "in", b: "started" },
                { v: "Zuri Textiles", a: "needs", b: "in" },
              ].map((r) => (
                <div key={r.v} className="grid grid-cols-[1.2fr_1fr_1fr] items-center gap-2 border-b border-navy/5 px-3 py-1.5 last:border-0">
                  <span className="text-[11px] font-medium text-navy-700">{r.v}</span>
                  <Status level={r.a as "in" | "started" | "needs"} />
                  <Status level={r.b as "in" | "started" | "needs"} />
                </div>
              ))}
            </div>
          </figure>

          <div className="mt-4 flex-1" />
          <a href="#signin" className="group mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700 hover:underline">
            Sign in <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </article>

        {/* FOR CAPITAL PROVIDERS */}
        <article className="rise lift flex flex-col rounded-2xl border border-navy/10 bg-white p-5 shadow-card hover:shadow-lg" style={{ animationDelay: "240ms" }}>
          <div className="text-[11px] font-semibold uppercase tracking-wide text-gold-700">For capital providers</div>
          <h3 className="mt-1 text-base font-semibold text-navy-700">Understand how a business is managed</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">See how a company plans, makes decisions, and manages resources. Ask better questions before deploying capital, and spot where support may be needed afterward.</p>

          <figure role="img" aria-label="Example capability snapshot: financial management developing, governance strong, capital absorption developing, with a follow-up question about tracking what funding delivers." className="relative mt-4 animate-float rounded-xl border border-navy/10 bg-surface-muted p-3.5" style={{ animationDelay: "1.6s" }}>
            <ExampleTag />
            <div className="rounded-lg border border-navy/10 bg-white p-3">
              {[
                { k: "Financial management", f: 2, b: "Developing" },
                { k: "Governance", f: 3, b: "Strong" },
                { k: "Capital absorption", f: 2, b: "Developing" },
              ].map((r) => (
                <div key={r.k} className="flex items-center justify-between gap-2 py-1">
                  <span className="text-[11px] text-navy-700">{r.k}</span>
                  <span className="flex items-center gap-2"><Bar filled={r.f} /><span className="w-16 text-right text-[10px] text-ink-muted">{r.b}</span></span>
                </div>
              ))}
              <div className="mt-2 border-t border-navy/10 pt-2 text-[11px] text-navy-700">
                <span className="font-medium">Follow up:</span> How will the team track what the funding delivers?
              </div>
            </div>
          </figure>

          <div className="mt-4 flex-1" />
          <p className="mt-2 text-[11px] leading-relaxed text-ink-muted">An input to your due diligence. Lending and investment decisions stay in your own process.</p>
        </article>
      </div>
    </section>
  );
}

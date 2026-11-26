"use client";

import * as React from "react";
import { Sprout, TrendingUp, Building2, Check } from "lucide-react";
import { PillarDetail } from "@/components/PillarCard";
import { cn } from "@/lib/utils";
import type { Pillar } from "@/lib/data/pillars";
import { STAGES, STAGE_PRINCIPLE, type StageKey } from "@/lib/data/stages";

const STAGE_ICONS: Record<StageKey, React.ComponentType<{ className?: string }>> = {
  early: Sprout,
  growing: TrendingUp,
  scaling: Building2,
};

const DEFAULT_STAGE: StageKey = "growing";

function isStage(v: string | null): v is StageKey {
  return v === "early" || v === "growing" || v === "scaling";
}

export function StagedPillars({ pillars }: { pillars: Pillar[] }) {
  const [stage, setStage] = React.useState<StageKey>(DEFAULT_STAGE);

  // Deep links: /framework?stage=scaling (optionally with #pillar-slug).
  React.useEffect(() => {
    const s = new URLSearchParams(window.location.search).get("stage");
    if (isStage(s)) setStage(s);
  }, []);

  const choose = (s: StageKey, scroll = false) => {
    setStage(s);
    const url = new URL(window.location.href);
    url.searchParams.set("stage", s);
    window.history.replaceState(null, "", url.toString());
    if (scroll) {
      document.getElementById("pillars")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* One index, three stages */}
      <section aria-labelledby="stages-heading" className="container-lab pt-14 sm:pt-16">
        <div className="max-w-3xl">
          <p className="eyebrow">For every stage of growth</p>
          <h2 id="stages-heading" className="mt-2 font-serif text-3xl leading-tight text-navy-900 sm:text-[2rem]">
            One index, three stages
          </h2>
          <p className="mt-3 text-[1.05rem] leading-relaxed text-navy-600">{STAGE_PRINCIPLE}</p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3" role="group" aria-label="Choose a growth stage">
          {STAGES.map((s) => {
            const Icon = STAGE_ICONS[s.key];
            const active = stage === s.key;
            return (
              <button
                key={s.key}
                type="button"
                onClick={() => choose(s.key, true)}
                aria-pressed={active}
                className={cn(
                  "flex h-full flex-col rounded-2xl border p-5 text-left transition-all",
                  active
                    ? "border-navy bg-navy text-cream shadow-note"
                    : "border-navy/10 bg-white text-navy-800 shadow-soft hover:border-navy/30"
                )}
              >
                <div className="flex w-full items-center justify-between gap-2">
                  <span
                    className={cn(
                      "grid h-10 w-10 place-items-center rounded-xl",
                      active ? "bg-gold/25 text-gold-200" : "bg-forest/10 text-forest"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  {active && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-gold/25 px-2 py-0.5 text-xs font-medium text-gold-100">
                      <Check className="h-3 w-3" /> Showing
                    </span>
                  )}
                </div>
                <p className={cn("mt-4 font-serif text-xl", active ? "text-cream" : "text-navy-900")}>{s.name}</p>
                <p className={cn("text-sm", active ? "text-cream/75" : "text-navy-500")}>
                  {s.tagline} · {s.sizeCue}
                </p>
                <ul className="mt-4 space-y-1.5">
                  {s.signs.map((sign) => (
                    <li key={sign} className={cn("flex gap-2 text-sm leading-snug", active ? "text-cream/90" : "text-navy-700")}>
                      <span className={cn("mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full", active ? "bg-gold-300" : "bg-gold")} />
                      {sign}
                    </li>
                  ))}
                </ul>
                <p className={cn("mt-4 text-xs font-semibold uppercase tracking-wide", active ? "text-gold-200" : "text-forest-700")}>
                  Typical finance
                </p>
                <p className={cn("mt-1 text-sm leading-snug", active ? "text-cream/85" : "text-navy-600")}>
                  {s.typicalFinance.join(" · ")}
                </p>
                <div className="mt-auto w-full pt-4">
                  <p
                    className={cn(
                      "border-t pt-4 text-sm italic leading-snug",
                      active ? "border-cream/15 text-cream/90" : "border-navy/10 text-navy-700"
                    )}
                  >
                    {s.centralQuestion}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-navy-500">
          Stages describe complexity, not just headcount, and the size cues are
          indicative. Formal employment and turnover bands for Kenya and South
          Africa will be set in the Chapter Three research design and tested in
          the fieldwork.
        </p>
      </section>

      {/* Sticky stage switcher + pillars */}
      <div id="pillars" className="scroll-mt-16">
        <div className="sticky top-16 z-30 mt-12 border-y border-navy/10 bg-cream/90 backdrop-blur-md">
          <div className="container-lab flex flex-wrap items-center gap-x-4 gap-y-2 py-3">
            <span className="text-sm font-medium text-navy-700">Show what good looks like for:</span>
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Growth stage">
              {STAGES.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => choose(s.key)}
                  aria-pressed={stage === s.key}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                    stage === s.key
                      ? "border-navy bg-navy text-cream"
                      : "border-navy/15 bg-white text-navy-700 hover:border-navy/35"
                  )}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="container-lab space-y-8 py-12 sm:py-16">
          {pillars.map((p) => (
            <PillarDetail key={p.id} pillar={p} stage={stage} />
          ))}
        </div>
      </div>
    </>
  );
}

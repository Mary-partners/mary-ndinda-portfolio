"use client";

import * as React from "react";
import { BarChart3, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const OPTIONS = [
  "Lack of money",
  "Weak financial management",
  "Weak governance",
  "Poor market access",
  "Poor operations",
  "Unsure",
];

// Seed baseline so the bars look alive before anyone votes locally.
const BASELINE: Record<string, number> = {
  "Lack of money": 34,
  "Weak financial management": 61,
  "Weak governance": 22,
  "Poor market access": 18,
  "Poor operations": 27,
  Unsure: 9,
};

const STORAGE_KEY = "mcl_poll_choice";

export function MiniPoll() {
  const [choice, setChoice] = React.useState<string | null>(null);

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setChoice(saved);
    } catch {
      /* ignore */
    }
  }, []);

  function vote(option: string) {
    setChoice(option);
    try {
      localStorage.setItem(STORAGE_KEY, option);
    } catch {
      /* ignore */
    }
  }

  const tallies = OPTIONS.map((o) => ({
    option: o,
    count: BASELINE[o] + (choice === o ? 1 : 0),
  }));
  const total = tallies.reduce((sum, t) => sum + t.count, 0);

  return (
    <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-soft">
      <div className="flex items-center gap-2 text-forest">
        <BarChart3 className="h-5 w-5" />
        <span className="text-xs font-semibold uppercase tracking-wide">
          Quick poll
        </span>
      </div>
      <h3 className="mt-3 font-serif text-xl text-navy-900">
        What is the bigger constraint for African SMEs?
      </h3>

      <div className="mt-5 space-y-2.5">
        {tallies.map(({ option, count }) => {
          const pct = Math.round((count / total) * 100);
          const selected = choice === option;
          return (
            <button
              key={option}
              onClick={() => vote(option)}
              className={cn(
                "group relative w-full overflow-hidden rounded-lg border px-4 py-2.5 text-left text-sm transition-colors",
                selected
                  ? "border-forest bg-forest/5"
                  : "border-navy/15 hover:border-navy/30"
              )}
              aria-pressed={selected}
            >
              {choice && (
                <span
                  className={cn(
                    "absolute inset-y-0 left-0 -z-0 rounded-lg transition-all",
                    selected ? "bg-forest/15" : "bg-navy/5"
                  )}
                  style={{ width: `${pct}%` }}
                  aria-hidden
                />
              )}
              <span className="relative flex items-center justify-between">
                <span className="flex items-center gap-2 font-medium text-navy-800">
                  {selected && <Check className="h-4 w-4 text-forest" />}
                  {option}
                </span>
                {choice && (
                  <span className="tabular-nums text-navy-500">{pct}%</span>
                )}
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-navy-500">
        {choice
          ? "Thanks for voting. This is an indicative prototype poll stored on your device."
          : "Tap an option to cast your vote and reveal the results."}
      </p>
    </div>
  );
}

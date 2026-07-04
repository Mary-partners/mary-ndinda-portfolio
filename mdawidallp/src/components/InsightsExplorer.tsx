"use client";

import { useMemo, useState } from "react";
import { categories, insights, type Category } from "@/lib/insights";
import { InsightCard } from "./InsightCard";
import { cn } from "@/lib/utils";

type Filter = "All" | Category;

const filters: Filter[] = ["All", ...categories];

export function InsightsExplorer() {
  const [active, setActive] = useState<Filter>("All");

  const shown = useMemo(() => {
    if (active === "All") return insights;
    return insights.filter((i) => i.category === active);
  }, [active]);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setActive(f)}
            className={cn(
              "rounded-full border px-5 py-2 text-sm font-medium transition-all",
              active === f
                ? "border-ink-900 bg-ink-900 text-sand-50"
                : "border-ink-200 bg-white text-ink-600 hover:border-ink-400 hover:text-ink-900",
            )}
          >
            {f}
            <span
              className={cn(
                "ml-2 text-xs",
                active === f ? "text-sand-300" : "text-ink-400",
              )}
            >
              {f === "All"
                ? insights.length
                : insights.filter((i) => i.category === f).length}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((insight) => (
          <InsightCard key={insight.slug} insight={insight} />
        ))}
      </div>
    </div>
  );
}

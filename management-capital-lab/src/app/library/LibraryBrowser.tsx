"use client";

import * as React from "react";
import { BookOpen } from "lucide-react";
import { LibrarySourceCard } from "@/components/LibrarySourceCard";
import { EmptyState } from "@/components/EmptyState";
import { cn } from "@/lib/utils";
import { RESEARCH_SOURCES, LIBRARY_THEMES } from "@/lib/data/library";

export function LibraryBrowser() {
  const [theme, setTheme] = React.useState("All");

  const sources = React.useMemo(
    () =>
      theme === "All"
        ? RESEARCH_SOURCES
        : RESEARCH_SOURCES.filter((s) => s.theme === theme),
    [theme]
  );

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter by theme"
      >
        {LIBRARY_THEMES.map((t) => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            aria-pressed={theme === t}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
              theme === t
                ? "border-navy bg-navy text-cream"
                : "border-navy/15 bg-white text-navy-600 hover:border-navy/30"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {sources.length === 0 ? (
          <EmptyState
            icon={<BookOpen className="h-6 w-6" />}
            title="No sources under this theme yet"
            description="The library is growing as the literature review continues."
          />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sources.map((s) => (
              <LibrarySourceCard key={s.id} source={s} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

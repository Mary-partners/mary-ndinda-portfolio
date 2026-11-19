"use client";

import * as React from "react";
import { BookOpen, Search, X } from "lucide-react";
import { LibrarySourceCard } from "@/components/LibrarySourceCard";
import { EmptyState } from "@/components/EmptyState";
import { cn } from "@/lib/utils";
import {
  LITERATURE,
  CONTEXT_SOURCES,
  LITERATURE_THEMES,
  LITERATURE_STATS,
  THEME_DESCRIPTIONS,
  REGIONS,
  METHODS,
} from "@/lib/data/library";

type Sort = "theme" | "newest" | "oldest" | "cited" | "az";

const SORTS: { value: Sort; label: string }[] = [
  { value: "theme", label: "Database order (by theme)" },
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "cited", label: "Most cited" },
  { value: "az", label: "Title A–Z" },
];

const selectClass =
  "h-10 rounded-full border border-navy/15 bg-white px-3.5 text-sm text-navy-700 focus:border-navy/40 focus:outline-none focus:ring-2 focus:ring-gold-300";

function yearOf(y: string) {
  const n = parseInt(y, 10);
  return Number.isNaN(n) ? 0 : n;
}

export function LibraryBrowser() {
  const [theme, setTheme] = React.useState<string>("All");
  const [region, setRegion] = React.useState<string>("All");
  const [method, setMethod] = React.useState<string>("All");
  const [status, setStatus] = React.useState<string>("All");
  const [sort, setSort] = React.useState<Sort>("theme");
  const [query, setQuery] = React.useState("");

  // Allow deep links such as /library?theme=Capital%20use or ?region=Kenya.
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("theme");
    const r = params.get("region");
    if (t && (LITERATURE_THEMES as readonly string[]).includes(t)) setTheme(t);
    if (r && (REGIONS as readonly string[]).includes(r)) setRegion(r);
  }, []);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = LITERATURE.filter((s) => {
      if (theme !== "All" && s.theme !== theme) return false;
      if (region === "Africa (all)" && (!s.region || s.region === "Global")) return false;
      if (region !== "All" && region !== "Africa (all)" && s.region !== region) return false;
      if (method !== "All" && s.method !== method) return false;
      if (status !== "All" && s.reviewStatus !== status) return false;
      if (!q) return true;
      return [s.title, s.authorsFull, s.author, s.journal, s.summary, s.whyItMatters, s.geography, s.year]
        .filter(Boolean)
        .some((f) => String(f).toLowerCase().includes(q));
    });
    const sorted = [...list];
    switch (sort) {
      case "newest":
        sorted.sort((a, b) => yearOf(b.year) - yearOf(a.year));
        break;
      case "oldest":
        sorted.sort((a, b) => yearOf(a.year) - yearOf(b.year));
        break;
      case "cited":
        sorted.sort((a, b) => (b.citations ?? 0) - (a.citations ?? 0));
        break;
      case "az":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        sorted.sort(
          (a, b) =>
            LITERATURE_THEMES.indexOf(a.theme as (typeof LITERATURE_THEMES)[number]) -
              LITERATURE_THEMES.indexOf(b.theme as (typeof LITERATURE_THEMES)[number]) ||
            (a.dbId ?? 0) - (b.dbId ?? 0)
        );
    }
    return sorted;
  }, [theme, region, method, status, sort, query]);

  const isFiltered =
    theme !== "All" || region !== "All" || method !== "All" || status !== "All" || query !== "";

  const reset = () => {
    setTheme("All");
    setRegion("All");
    setMethod("All");
    setStatus("All");
    setQuery("");
  };

  const maxCount = Math.max(...LITERATURE_STATS.byTheme.map((t) => t.count));
  const s = LITERATURE_STATS;

  return (
    <div>
      {/* ------------------------------------------------------------------ */}
      {/* Evidence map                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section aria-labelledby="evidence-map" className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 id="evidence-map" className="font-serif text-2xl text-navy-900">
            The evidence map
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-navy-600">
            The Chapter Two literature review is built on a structured database
            of {s.total} verified journal articles and research papers. Each
            record captures the method, geography, variables, key finding,
            limitation and relevance to the Management Capital Index.
          </p>
          <dl className="mt-5 grid grid-cols-2 gap-3">
            {[
              { k: "Verified articles", v: s.total, d: `Target ${s.target.min}–${s.target.max}` },
              { k: "Abstract reviewed", v: s.abstractReviewed, d: `${s.fullTextPending} awaiting full text` },
              { k: "Priority full texts appraised", v: s.fullTextAppraised, d: "For the Chapter Two revision" },
              { k: "Field or randomised experiments", v: s.experiments, d: "Strongest causal evidence" },
              { k: "Africa-based studies", v: s.africa, d: `${s.kenya} Kenya · ${s.southAfrica} South Africa` },
              { k: "Themes", v: s.themes, d: "Theory to Africa context" },
            ].map((t) => (
              <div key={t.k} className="rounded-xl border border-navy/10 bg-white p-4 shadow-soft">
                <dt className="text-xs text-navy-500">{t.k}</dt>
                <dd className="mt-1 font-serif text-2xl text-navy-900">{t.v}</dd>
                <dd className="text-xs text-navy-500">{t.d}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-2xl border border-navy/10 bg-white p-5 shadow-soft sm:p-6">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-sm font-semibold text-navy-900">Articles by theme</h3>
            <span className="text-xs text-navy-500">Select a theme to filter</span>
          </div>
          <ul className="mt-4 space-y-1">
            {s.byTheme.map(({ theme: t, count }) => {
              const active = theme === t;
              return (
                <li key={t}>
                  <button
                    type="button"
                    onClick={() => setTheme(active ? "All" : t)}
                    aria-pressed={active}
                    title={`${t}: ${count} articles. ${THEME_DESCRIPTIONS[t] ?? ""}`}
                    className={cn(
                      "group grid w-full grid-cols-[8.5rem_1fr_2rem] items-center gap-3 rounded-lg px-2 py-1.5 text-left transition-colors sm:grid-cols-[10rem_1fr_2rem]",
                      active ? "bg-forest/10" : "hover:bg-navy/5"
                    )}
                  >
                    <span className={cn("truncate text-sm", active ? "font-semibold text-navy-900" : "text-navy-700")}>
                      {t}
                    </span>
                    <span className="h-3 w-full">
                      <span
                        className={cn(
                          "block h-3 rounded-r-[4px] transition-colors",
                          active ? "bg-forest" : "bg-forest-400 group-hover:bg-forest-500"
                        )}
                        style={{ width: `${(count / maxCount) * 100}%` }}
                      />
                    </span>
                    <span className="text-right text-sm tabular-nums text-navy-600">{count}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-navy-500">
            Only {s.kenya} Kenya-specific and {s.southAfrica} South Africa-specific
            studies are in the current base. Chapter Two treats that imbalance as
            a finding in itself, and it is the main priority as the corpus grows
            to {s.target.min}–{s.target.max} articles.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Controls                                                            */}
      {/* ------------------------------------------------------------------ */}
      <section aria-label="Browse the literature" className="mt-14">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <label className="relative block flex-1">
            <span className="sr-only">Search the library</span>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search titles, authors, findings, countries…"
              className="h-10 w-full rounded-full border border-navy/15 bg-white pl-10 pr-4 text-sm text-navy-800 placeholder:text-navy-400 focus:border-navy/40 focus:outline-none focus:ring-2 focus:ring-gold-300"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            <label>
              <span className="sr-only">Geography</span>
              <select className={selectClass} value={region} onChange={(e) => setRegion(e.target.value)}>
                <option value="All">All geographies</option>
                <option value="Africa (all)">Africa (all)</option>
                {REGIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className="sr-only">Method</span>
              <select className={selectClass} value={method} onChange={(e) => setMethod(e.target.value)}>
                <option value="All">All methods</option>
                {METHODS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className="sr-only">Review status</span>
              <select className={selectClass} value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="All">Any review status</option>
                <option value="Abstract reviewed">Abstract reviewed</option>
                <option value="Full text pending">Full text pending</option>
              </select>
            </label>
            <label>
              <span className="sr-only">Sort</span>
              <select className={selectClass} value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
                {SORTS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by theme">
          {["All", ...LITERATURE_THEMES].map((t) => (
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
              <span className={cn("ml-1.5 tabular-nums", theme === t ? "text-cream/70" : "text-navy-400")}>
                {t === "All" ? s.total : s.byTheme.find((x) => x.theme === t)?.count}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-navy-600" aria-live="polite">
            Showing <strong className="text-navy-900">{filtered.length}</strong> of {s.total} articles
            {theme !== "All" && THEME_DESCRIPTIONS[theme] && (
              <span className="text-navy-500"> · {THEME_DESCRIPTIONS[theme]}</span>
            )}
          </p>
          {isFiltered && (
            <button
              onClick={reset}
              className="inline-flex items-center gap-1 text-sm font-medium text-forest hover:text-forest-700"
            >
              <X className="h-4 w-4" /> Clear filters
            </button>
          )}
        </div>

        <div className="mt-6">
          {filtered.length === 0 ? (
            <EmptyState
              icon={<BookOpen className="h-6 w-6" />}
              title="No articles match these filters"
              description="Try a broader search, or clear the filters. The library keeps growing as the review continues."
            />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((src) => (
                <LibrarySourceCard key={src.id} source={src} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Context sources                                                     */}
      {/* ------------------------------------------------------------------ */}
      <section aria-labelledby="context-sources" className="mt-20 border-t border-navy/10 pt-14">
        <h2 id="context-sources" className="font-serif text-2xl text-navy-900">
          Policy and market context
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-navy-600">
          Institutional reports used for market context in Chapter One. They sit
          alongside, not inside, the peer-reviewed review database.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CONTEXT_SOURCES.map((src) => (
            <LibrarySourceCard key={src.id} source={src} />
          ))}
        </div>
      </section>
    </div>
  );
}

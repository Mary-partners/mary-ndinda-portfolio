"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Category } from "@/content/types";
import type { SearchDoc } from "@/lib/search-index";

const CATS: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "investment", label: "Investment" },
  { id: "portfolio", label: "Portfolio" },
  { id: "capital", label: "Capital" },
  { id: "leadership", label: "Leadership" },
];

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

function snippet(text: string, terms: string[]): string {
  const t = norm(text);
  let pos = -1;
  for (const term of terms) {
    pos = t.indexOf(term);
    if (pos >= 0) break;
  }
  if (pos < 0) return text.slice(0, 160) + (text.length > 160 ? "…" : "");
  const start = Math.max(0, pos - 70);
  const end = Math.min(text.length, pos + 120);
  return (start > 0 ? "…" : "") + text.slice(start, end).trim() + (end < text.length ? "…" : "");
}

function Highlight({ text, terms }: { text: string; terms: string[] }) {
  if (!terms.length) return <>{text}</>;
  const n = norm(text);
  const marks: [number, number][] = [];
  for (const term of terms) {
    let i = n.indexOf(term);
    while (i >= 0 && term) {
      marks.push([i, i + term.length]);
      i = n.indexOf(term, i + term.length);
    }
  }
  marks.sort((a, b) => a[0] - b[0]);
  const out: React.ReactNode[] = [];
  let cur = 0;
  for (const [s, e] of marks) {
    if (s < cur) continue;
    out.push(text.slice(cur, s));
    out.push(
      <mark key={s} className="rounded-sm bg-gold-2 px-0.5 text-ink">
        {text.slice(s, e)}
      </mark>,
    );
    cur = e;
  }
  out.push(text.slice(cur));
  return <>{out}</>;
}

export function PlaybookSearch({ docs }: { docs: SearchDoc[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Category | "all">("all");

  // Read initial state from the URL (?q=…&c=…) so searches are shareable.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const iq = p.get("q") ?? "";
    const ic = p.get("c") as Category | null;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from the URL
    if (iq) setQ(iq);
    if (ic && CATS.some((c) => c.id === ic)) setCat(ic);
  }, []);

  useEffect(() => {
    const p = new URLSearchParams();
    if (q.trim()) p.set("q", q.trim());
    if (cat !== "all") p.set("c", cat);
    const s = p.toString();
    window.history.replaceState(null, "", s ? `?${s}` : window.location.pathname);
  }, [q, cat]);

  const terms = useMemo(() => norm(q).split(/\s+/).filter((t) => t.length > 1), [q]);

  const results = useMemo(() => {
    return docs
      .filter((d) => cat === "all" || d.categories.includes(cat))
      .map((d) => {
        if (!terms.length) return { doc: d, hits: [] as { id: string; title: string; text: string }[], score: 0 };
        const head = norm(`${d.title} ${d.tagline} ${d.keywords}`);
        const hits = d.sections.filter((s) => {
          const body = norm(`${s.title} ${s.text}`);
          return terms.every((t) => body.includes(t) || head.includes(t));
        });
        const allInDoc = terms.every((t) => head.includes(t) || d.sections.some((s) => norm(s.text + " " + s.title).includes(t)));
        const headScore = terms.filter((t) => head.includes(t)).length * 5;
        return { doc: d, hits: allInDoc ? hits : [], score: allInDoc ? headScore + hits.length : -1 };
      })
      .filter((r) => !terms.length || r.score >= 0)
      .sort((a, b) => (terms.length ? b.score - a.score : 0));
  }, [docs, terms, cat]);

  return (
    <div>
      <div className="no-print sticky top-16 z-20 -mx-4 border-b border-rule bg-paper/95 px-4 py-4 backdrop-blur sm:mx-0 sm:px-0">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <label htmlFor="playbook-q" className="sr-only">
            Search the playbook
          </label>
          <input
            id="playbook-q"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search e.g. PAR30, covenant, hedging, TA, exit"
            className="h-11 w-full rounded-full border border-ink/25 bg-white px-5 text-[0.95rem] text-ink placeholder:text-ink-3 md:max-w-md"
            autoComplete="off"
          />
          <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
            {CATS.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={cat === c.id}
                onClick={() => setCat(c.id)}
                className={`h-9 rounded-full border px-3.5 text-sm transition-colors ${cat === c.id ? "border-ink bg-ink text-paper" : "border-ink/20 text-ink-2 hover:border-ink"}`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-2 text-sm text-ink-3" role="status" aria-live="polite">
          {results.length} of {docs.length} workstreams
          {terms.length ? ` match “${q.trim()}”` : ""}
          {cat !== "all" ? ` in ${CATS.find((c) => c.id === cat)?.label}` : ""}.
        </p>
      </div>

      {results.length === 0 ? (
        <div className="py-16 text-center">
          <p className="font-serif text-2xl text-ink">No workstreams match.</p>
          <button type="button" onClick={() => { setQ(""); setCat("all"); }} className="link mt-3 text-sm">
            Clear search and filters
          </button>
        </div>
      ) : (
        <ol className="divide-y divide-rule">
          {results.map(({ doc, hits }) => (
            <li key={doc.slug} className="grid gap-3 py-7 md:grid-cols-[4rem_1fr_14rem] md:gap-6">
              <span aria-hidden="true" className="num-tab font-serif text-3xl text-gold">
                {doc.number}
              </span>
              <div className="min-w-0">
                <h2 className="text-2xl leading-tight">
                  <Link href={`/playbook/${doc.slug}`} className="text-ink hover:underline decoration-gold decoration-2">
                    <span className="sr-only">Workstream {doc.number}: </span>
                    <Highlight text={doc.title} terms={terms} />
                  </Link>
                </h2>
                <p className="mt-2 max-w-2xl leading-relaxed text-ink-2">{doc.tagline}</p>
                {hits.length ? (
                  <ul className="mt-4 space-y-2.5" aria-label={`Matching sections in ${doc.title}`}>
                    {hits.slice(0, 4).map((h) => (
                      <li key={h.id} className="border-l-2 border-gold/50 pl-3 text-sm">
                        <Link href={`/playbook/${doc.slug}#${h.id}`} className="font-medium text-emerald hover:underline">
                          {h.title}
                        </Link>
                        <p className="mt-0.5 text-ink-3">
                          <Highlight text={snippet(h.text, terms)} terms={terms} />
                        </p>
                      </li>
                    ))}
                    {hits.length > 4 ? <li className="pl-3 text-xs text-ink-3">and {hits.length - 4} more sections</li> : null}
                  </ul>
                ) : null}
              </div>
              <p className="text-xs uppercase tracking-[0.1em] text-ink-3 md:text-right">{doc.categories.join(" · ")}</p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

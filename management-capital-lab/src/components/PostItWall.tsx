"use client";

import * as React from "react";
import Link from "next/link";
import { StickyNote } from "lucide-react";
import type { Contribution } from "@/lib/types";
import { PostItCard } from "@/components/PostItCard";
import { EmptyState } from "@/components/EmptyState";
import { cn } from "@/lib/utils";

type RoleFilter =
  | "All"
  | "Founders"
  | "Banks/Lenders"
  | "Investors"
  | "Advisors"
  | "Researchers"
  | "ESOs"
  | "Policymakers"
  | "Kenya"
  | "Africa-wide";

const FILTERS: RoleFilter[] = [
  "All",
  "Founders",
  "Banks/Lenders",
  "Investors",
  "Advisors",
  "Researchers",
  "ESOs",
  "Policymakers",
  "Kenya",
  "Africa-wide",
];

type Sort = "Newest" | "Most discussed" | "By theme";
const SORTS: Sort[] = ["Newest", "Most discussed", "By theme"];

function matchesFilter(note: Contribution, filter: RoleFilter): boolean {
  switch (filter) {
    case "All":
      return true;
    case "Founders":
      return note.role === "Founder";
    case "Banks/Lenders":
      return note.role === "Bank / Lender";
    case "Investors":
      return note.role === "Investor";
    case "Advisors":
      return note.role === "Advisor";
    case "Researchers":
      return note.role === "Researcher";
    case "ESOs":
      return note.role === "ESO";
    case "Policymakers":
      return note.role === "Policymaker";
    case "Kenya":
      return note.country === "Kenya";
    case "Africa-wide":
      return note.country !== "Kenya";
    default:
      return true;
  }
}

export function PostItWall({
  notes,
  limit,
  showControls = true,
}: {
  notes: Contribution[];
  limit?: number;
  showControls?: boolean;
}) {
  const [filter, setFilter] = React.useState<RoleFilter>("All");
  const [sort, setSort] = React.useState<Sort>("Newest");

  const visible = React.useMemo(() => {
    let list = notes.filter((n) => matchesFilter(n, filter));
    if (sort === "Newest") {
      list = [...list].sort(
        (a, b) =>
          new Date(b.approvedAt ?? b.createdAt).getTime() -
          new Date(a.approvedAt ?? a.createdAt).getTime()
      );
    } else if (sort === "Most discussed") {
      // Proxy for "discussed": richness of themes then length.
      list = [...list].sort(
        (a, b) =>
          b.themes.length - a.themes.length ||
          b.content.length - a.content.length
      );
    } else if (sort === "By theme") {
      list = [...list].sort((a, b) =>
        (a.themes[0] ?? "zzz").localeCompare(b.themes[0] ?? "zzz")
      );
    }
    return typeof limit === "number" ? list.slice(0, limit) : list;
  }, [notes, filter, sort, limit]);

  return (
    <div>
      {showControls && (
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter contributions">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                  filter === f
                    ? "border-navy bg-navy text-cream"
                    : "border-navy/15 bg-white text-navy-600 hover:border-navy/30"
                )}
              >
                {f}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-xs text-navy-600">
            <span className="whitespace-nowrap font-medium">Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="rounded-lg border border-navy/15 bg-white px-3 py-1.5 text-xs font-medium text-navy-800 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/25"
            >
              {SORTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      {visible.length === 0 ? (
        <EmptyState
          icon={<StickyNote className="h-6 w-6" />}
          title="No contributions here yet"
          description="Be the first voice on this part of the wall. Your post-it will appear once it has been reviewed."
          action={
            <Link
              href="/contribute"
              className="text-sm font-semibold text-forest hover:underline"
            >
              Leave a Post-It →
            </Link>
          }
        />
      ) : (
        <div className="[column-fill:_balance] gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {visible.map((note) => (
            <PostItCard key={note.id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
}

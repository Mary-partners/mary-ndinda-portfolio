import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CoverArt } from "./CoverArt";
import { formatDate, type Insight } from "@/lib/insights";

export function InsightCard({ insight }: { insight: Insight }) {
  return (
    <Link
      href={`/insights/${insight.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-ink-200 hover:shadow-lift"
    >
      <div className="relative h-44 w-full">
        <CoverArt variant={insight.cover} rounded={false} className="h-full" />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-ink-800 shadow-soft">
          {insight.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-xs text-ink-400">
          <span>{formatDate(insight.date)}</span>
          <span className="h-1 w-1 rounded-full bg-ink-300" />
          <span>{insight.readTime}</span>
        </div>
        <h3 className="mt-3 text-lg font-semibold leading-snug text-ink-900">
          {insight.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-500">
          {insight.excerpt}
        </p>
        <span className="link-underline mt-5 text-sm text-teal-700">
          Read insight
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}

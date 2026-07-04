import { ExternalLink } from "lucide-react";
import type { ResearchSource } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

export function LibrarySourceCard({ source }: { source: ResearchSource }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-navy/10 bg-white p-6 shadow-soft">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="gold">{source.theme}</Badge>
        <span className="text-xs text-navy-500">{source.year}</span>
      </div>
      <h3 className="mt-3 font-serif text-lg leading-snug text-navy-900">
        {source.title}
      </h3>
      <p className="mt-1 text-sm font-medium text-navy-600">{source.author}</p>

      <div className="mt-4 space-y-3 text-sm leading-relaxed">
        <p className="text-navy-700">{source.summary}</p>
        <div className="rounded-xl bg-cream-100 p-3.5 ring-1 ring-inset ring-navy/10">
          <p className="text-xs font-semibold uppercase tracking-wide text-forest-700">
            Why it matters to this study
          </p>
          <p className="mt-1 text-navy-700">{source.whyItMatters}</p>
        </div>
      </div>

      {source.url && (
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-forest hover:text-forest-700"
        >
          View source
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      )}
    </article>
  );
}

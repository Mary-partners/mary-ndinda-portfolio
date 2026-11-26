import { ExternalLink, FileCheck2, FileClock, Unlock } from "lucide-react";
import type { ResearchSource } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

const compact = new Intl.NumberFormat("en-GB", { notation: "compact" });

export function LibrarySourceCard({ source }: { source: ResearchSource }) {
  const isAfrican = source.region && source.region !== "Global";
  return (
    <article className="flex h-full flex-col rounded-2xl border border-navy/10 bg-white p-6 shadow-soft">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="gold">{source.theme}</Badge>
        {isAfrican && <Badge tone="forest">{source.region}</Badge>}
        <span className="text-xs text-navy-500">{source.year}</span>
      </div>

      <h3 className="mt-3 font-serif text-lg leading-snug text-navy-900">
        {source.title}
      </h3>
      <p
        className="mt-1 text-sm font-medium text-navy-600"
        title={source.authorsFull}
      >
        {source.author}
        {source.journal && (
          <span className="font-normal italic text-navy-500">
            {" "}
            · {source.journal}
          </span>
        )}
      </p>

      {(source.method || source.geography) && (
        <p className="mt-2 text-xs text-navy-500">
          {[source.method, source.geography].filter(Boolean).join(" · ")}
        </p>
      )}

      <div className="mt-4 space-y-3 text-sm leading-relaxed">
        <div>
          {source.dbId !== undefined && (
            <p className="text-xs font-semibold uppercase tracking-wide text-navy-500">
              Key finding
            </p>
          )}
          <p className="mt-1 text-navy-700">{source.summary}</p>
        </div>
        <div className="rounded-xl bg-cream-100 p-3.5 ring-1 ring-inset ring-navy/10">
          <p className="text-xs font-semibold uppercase tracking-wide text-forest-700">
            Why it matters to this study
          </p>
          <p className="mt-1 text-navy-700">{source.whyItMatters}</p>
        </div>
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-4">
        {source.url && (
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest hover:text-forest-700"
          >
            View source
            <ExternalLink className="h-3.5 w-3.5" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
        {source.reviewStatus && (
          <span className="inline-flex items-center gap-1 text-xs text-navy-500">
            {source.reviewStatus === "Abstract reviewed" ? (
              <FileCheck2 className="h-3.5 w-3.5" />
            ) : (
              <FileClock className="h-3.5 w-3.5" />
            )}
            {source.reviewStatus}
          </span>
        )}
        {source.openAccess && (
          <span className="inline-flex items-center gap-1 text-xs text-navy-500">
            <Unlock className="h-3.5 w-3.5" /> Open access
          </span>
        )}
        {typeof source.citations === "number" && (
          <span
            className="text-xs text-navy-500"
            title={`${source.citations.toLocaleString("en-GB")} citations (OpenAlex/Crossref)`}
          >
            Cited {compact.format(source.citations)}×
          </span>
        )}
      </div>
    </article>
  );
}

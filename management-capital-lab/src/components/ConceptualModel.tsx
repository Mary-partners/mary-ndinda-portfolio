import * as React from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  MODEL_PATHWAY,
  MODEL_LINKS,
  MODEL_EXTRA_PATHS,
  MODEL_CONTROLS,
  DIMENSIONS,
} from "@/lib/data/findings";

function Link({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center py-1 lg:px-0 lg:py-0" aria-hidden>
      <div className="flex flex-col items-center gap-0.5 text-gold-600">
        <span className="rounded-full bg-gold/15 px-1.5 text-[10px] font-semibold leading-4 text-gold-700">
          {label}
        </span>
        <ArrowDown className="h-4 w-4 lg:hidden" />
        <ArrowRight className="hidden h-4 w-4 lg:block" />
      </div>
    </div>
  );
}

/**
 * Proposed management-capital pathway (Chapter Two, Figure 2.1), with the
 * additional hypothesised paths and contextual controls.
 */
export function ConceptualModel({ className }: { className?: string }) {
  return (
    <figure className={cn("rounded-3xl border border-navy/10 bg-white p-5 shadow-soft sm:p-8", className)}>
      <figcaption className="sr-only">
        Proposed pathway: management capital leads to investment readiness
        (H1), which leads to access to finance (H4), which leads through
        realised capital absorption to sustainable growth (H5, mediation).
        Management capital is also expected to affect realised absorption
        (H2), to affect growth directly (H3), and to strengthen the link from
        finance to growth (H6, moderation).
      </figcaption>

      <p className="text-xs font-semibold uppercase tracking-wide text-navy-500">
        Main pathway
      </p>
      <ol className="mt-3 grid gap-0 lg:grid-cols-[1.25fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-stretch lg:gap-2">
        {MODEL_PATHWAY.map((node, i) => (
          <React.Fragment key={node.key}>
            <li
              className={cn(
                "rounded-2xl border p-4",
                i === 0
                  ? "border-navy bg-navy text-cream"
                  : i === MODEL_PATHWAY.length - 1
                    ? "border-forest/30 bg-forest/10"
                    : "border-navy/10 bg-cream-50"
              )}
            >
              <p className={cn("font-serif text-base leading-snug", i === 0 ? "text-cream" : "text-navy-900")}>
                {node.label}
              </p>
              <p className={cn("mt-1 text-xs leading-relaxed", i === 0 ? "text-cream/70" : "text-navy-500")}>
                {node.note}
              </p>
              {i === 0 && (
                <ul className="mt-3 space-y-1 border-t border-cream/15 pt-3">
                  {DIMENSIONS.map((d, k) => (
                    <li key={d} className="flex gap-1.5 text-[11px] leading-snug text-cream/85">
                      <span className="font-semibold text-gold-300">{k + 1}</span>
                      {d}
                    </li>
                  ))}
                </ul>
              )}
            </li>
            {i < MODEL_LINKS.length && <Link label={MODEL_LINKS[i]} />}
          </React.Fragment>
        ))}
      </ol>

      <p className="mt-8 text-xs font-semibold uppercase tracking-wide text-navy-500">
        Also tested
      </p>
      <ul className="mt-3 grid gap-3 md:grid-cols-3">
        {MODEL_EXTRA_PATHS.map((p) => (
          <li key={p.label} className="rounded-2xl border border-navy/10 p-4">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-gold/15 px-2 py-0.5 text-xs font-semibold text-gold-700">
                {p.label}
              </span>
              <span className="text-xs font-medium text-navy-700">
                {p.from} <span className="text-gold-600">→</span> {p.to}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">{p.note}</p>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-navy/10 pt-5">
        <span className="text-xs font-semibold uppercase tracking-wide text-navy-500">
          Context &amp; controls
        </span>
        {MODEL_CONTROLS.map((c) => (
          <span
            key={c}
            className="rounded-full bg-cream-100 px-2.5 py-1 text-xs text-navy-700 ring-1 ring-inset ring-navy/10"
          >
            {c}
          </span>
        ))}
      </div>
    </figure>
  );
}

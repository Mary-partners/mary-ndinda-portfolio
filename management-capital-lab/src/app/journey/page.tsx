import type { Metadata } from "next";
import { Compass, ArrowRight } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { ResearchPhaseTimeline } from "@/components/ResearchPhaseTimeline";
import { formatDate } from "@/lib/utils";
import {
  RESEARCH_PHASES,
  RESEARCH_PROGRESS,
  RESEARCH_PROGRESS_NOTE,
  CURRENT_FOCUS,
} from "@/lib/data/phases";

export const metadata: Metadata = {
  title: "Research Journey",
  description:
    "Follow the DBA research journey behind the Management Capital Lab, phase by phase — from topic approval to findings and publications.",
};

export default function JourneyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Research Journey"
        title="A living DBA project, in the open"
        intro="This lab publishes its progress as it goes. Here is the path from topic approval to findings, and where the work stands today."
      />

      <div className="container-lab grid gap-12 py-16 sm:py-20 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          {/* Progress */}
          <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-navy-900">
                Research progress
              </h2>
              <span className="font-serif text-2xl text-forest">
                {RESEARCH_PROGRESS}%
              </span>
            </div>
            <div
              className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-navy/10"
              role="progressbar"
              aria-valuenow={RESEARCH_PROGRESS}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-forest to-forest-400"
                style={{ width: `${RESEARCH_PROGRESS}%` }}
              />
            </div>
            <p className="mt-3 text-xs text-navy-500">
              {RESEARCH_PROGRESS_NOTE}
            </p>
          </div>

          {/* What I'm working on now */}
          <div className="mt-5 rounded-2xl border border-gold/30 bg-gold-50 p-6">
            <div className="flex items-center gap-2 text-gold-700">
              <Compass className="h-4 w-4" />
              <h2 className="text-xs font-semibold uppercase tracking-wide">
                {CURRENT_FOCUS.title}
              </h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-navy-700">
              {CURRENT_FOCUS.body}
            </p>
            <p className="mt-4 text-xs text-navy-500">
              Updated {formatDate(CURRENT_FOCUS.updated)}
            </p>
          </div>

          {/* Findings so far */}
          <Link
            href="/findings"
            className="group mt-5 block rounded-2xl border border-forest/20 bg-forest/5 p-6 transition-colors hover:bg-forest/10"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-forest-700">
              Findings so far
            </p>
            <p className="mt-2 font-serif text-lg leading-snug text-navy-900">
              What Chapters One and Two found
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-navy-600">
              The argument, the refined model, the hypotheses and the eight
              research gaps, drawn from the 64-article evidence base.
            </p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-forest group-hover:text-forest-700">
              Read the findings <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </aside>

        <div>
          <ResearchPhaseTimeline phases={RESEARCH_PHASES} />
        </div>
      </div>
    </>
  );
}

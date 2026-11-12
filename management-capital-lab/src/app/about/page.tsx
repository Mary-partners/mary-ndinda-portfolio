import type { Metadata } from "next";
import {
  Building2,
  Landmark,
  TrendingUp,
  HandHeart,
  Scale,
  Globe2,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { ButtonLink } from "@/components/ui/button";
import {
  OBJECTIVES,
  SUPPORTING_QUESTIONS,
  THESIS_IN_BRIEF,
  HYPOTHESES,
} from "@/lib/data/findings";

export const metadata: Metadata = {
  title: "About the Research",
  description:
    "The DBA research behind the Management Capital Lab: developing a Management Capital Index for African SMEs as a predictive framework for investment readiness, capital absorption, and sustainable growth.",
};

const EXAMPLES = [
  "Some have revenue but poor records",
  "Some have demand but weak systems",
  "Some have potential but fragile cash flow",
  "Some need governance before investment",
  "Some need advisory support before debt",
  "Some need climate or shock resilience before capital",
  "Some are capable but simply underfinanced",
];

const IMPACT = [
  { icon: Building2, who: "Founders", how: "A clear mirror of what to strengthen before, and after, taking on capital." },
  { icon: Landmark, who: "Banks", how: "Evidence-based signals of bankability that go beyond collateral." },
  { icon: TrendingUp, who: "Investors", how: "A sharper read on absorption capacity and readiness for finance." },
  { icon: HandHeart, who: "ESOs", how: "A map for directing advisory effort where it changes outcomes." },
  { icon: Scale, who: "Policymakers", how: "Better design of SME support and finance programmes." },
  { icon: Globe2, who: "Development partners", how: "Ecosystem-level insight into where capital compounds." },
  { icon: Briefcase, who: "Advisory firms", how: "A shared, structured diagnostic language with clients." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About the Research"
        title="Developing a Management Capital Index for African SMEs"
        intro="A predictive framework for investment readiness, capital absorption, and sustainable growth."
      >
        <p className="mt-6 text-sm font-medium text-navy-600">
          Prepared by <span className="text-navy-900">Mary Ndinda</span>
        </p>
      </PageHeader>

      <div className="container-lab space-y-20 py-16 sm:py-20">
        {/* Introduction */}
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading eyebrow="Introduction" title="Why this research exists" />
          <div className="prose-lab">
            <p>
              SMEs are central to African economies — to employment, to
              livelihoods, and to the future of the continent&apos;s growth. For
              decades, the dominant narrative around them has been{" "}
              <strong>access to finance</strong>.
            </p>
            <p>
              But finance alone may not solve growth. Some SMEs receive capital
              and still struggle. The missing issue may be{" "}
              <strong>management capital</strong>: the capability to plan,
              govern, absorb, and deploy capital for sustainable growth.
            </p>
          </div>
        </section>

        {/* Core problem */}
        <section className="rounded-3xl border border-navy/10 bg-white p-8 shadow-soft sm:p-10">
          <SectionHeading
            eyebrow="Core Research Problem"
            title="A diagnosis gap, not only a finance gap"
          />
          <blockquote className="mt-6 border-l-4 border-gold pl-5 font-serif text-xl leading-relaxed text-navy-900">
            &ldquo;Many African SMEs are described as not ready for finance, but
            the market does not have a sufficiently practical, data-driven,
            founder-centred way to diagnose why they are not ready.&rdquo;
          </blockquote>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {EXAMPLES.map((ex) => (
              <div
                key={ex}
                className="flex items-start gap-3 rounded-xl bg-cream-100 p-4 text-sm text-navy-700 ring-1 ring-inset ring-navy/10"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                {ex}
              </div>
            ))}
          </div>
        </section>

        {/* Aim */}
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading eyebrow="Research Aim" title="What this study sets out to do" />
          <div className="prose-lab">
            <p>{THESIS_IN_BRIEF.aim}</p>
            <p>
              The empirical study focuses on <strong>Kenya and South Africa</strong>:
              two markets with active SME and financial ecosystems that differ in
              market depth, informality, institutions and access to growth
              capital. They are compared as distinct cases, and findings will be
              reported as evidence from those two markets rather than claimed
              for the whole continent.
            </p>
          </div>
        </section>

        {/* Research questions */}
        <section>
          <SectionHeading
            eyebrow="Research Questions"
            title="The questions guiding the work"
          />
          <div className="mt-8 rounded-2xl border border-forest/20 bg-forest/5 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-forest-700">
              Main question
            </p>
            <p className="mt-2 font-serif text-xl leading-snug text-navy-900">
              {THESIS_IN_BRIEF.mainQuestion}
            </p>
          </div>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2">
            {SUPPORTING_QUESTIONS.map((q, i) => (
              <li
                key={q}
                className="flex gap-4 rounded-2xl border border-navy/10 bg-white p-5 shadow-soft"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-navy text-sm font-semibold text-cream">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed text-navy-700">{q}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Objectives */}
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading eyebrow="Research Objectives" title="How the aim breaks down" />
          <ol className="space-y-3">
            {OBJECTIVES.map((o, i) => (
              <li
                key={o}
                className="flex items-start gap-3 rounded-xl border border-navy/10 bg-white p-4 text-sm leading-relaxed text-navy-700 shadow-soft"
              >
                <span className="text-xs font-semibold text-forest-700">{i + 1}</span>
                {o}
              </li>
            ))}
          </ol>
        </section>

        {/* Hypotheses */}
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Provisional Hypotheses"
            title="What the study expects to find"
            description="Provisional until qualitative construct development and measurement validation confirm the dimensions. Refined in the Chapter Two literature review."
          />
          <div>
            <ul className="space-y-2">
              {HYPOTHESES.filter((h) => h.id.startsWith("H")).map((h) => (
                <li
                  key={h.id}
                  className="flex items-start gap-3 rounded-xl border border-navy/10 bg-white p-4 text-sm leading-relaxed text-navy-700 shadow-soft"
                >
                  <span className="shrink-0 rounded-full bg-navy px-2 py-0.5 text-xs font-semibold text-cream">
                    {h.id}
                  </span>
                  {h.text}
                </li>
              ))}
            </ul>
            <ButtonLink href="/findings#hypotheses" variant="ghost" size="sm" className="mt-3">
              See the model and how each hypothesis was refined
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </section>

        {/* Why it matters */}
        <section>
          <SectionHeading
            eyebrow="Why This Matters"
            title="Who this research is for"
            description="A better diagnostic language between founder potential and financing decisions serves the whole ecosystem."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {IMPACT.map(({ icon: Icon, who, how }) => (
              <div
                key={who}
                className="rounded-2xl border border-navy/10 bg-white p-6 shadow-soft"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy/5 text-navy-700">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-serif text-lg text-navy-900">{who}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-navy-600">
                  {how}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-wrap gap-3">
          <ButtonLink href="/findings" variant="primary" size="lg">
            Read the findings so far
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink href="/framework" variant="outline" size="lg">
            Explore the Management Capital Index
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink href="/collaborate" variant="outline" size="lg">
            Collaborate with the Research
          </ButtonLink>
        </section>
      </div>
    </>
  );
}

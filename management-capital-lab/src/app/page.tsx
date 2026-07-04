import Link from "next/link";
import {
  HelpCircle,
  Layers,
  Users,
  Database,
  ArrowRight,
  Download,
  Mail,
} from "lucide-react";
import { SITE } from "@/lib/site";
import { getApprovedContributions } from "@/lib/store";
import { HeroSection } from "@/components/HeroSection";
import { PostItWall } from "@/components/PostItWall";
import { PromptCard } from "@/components/PromptCard";
import { PillarPreviewCard } from "@/components/PillarCard";
import { FieldNoteCard } from "@/components/FieldNoteCard";
import { ResearchPhaseTimeline } from "@/components/ResearchPhaseTimeline";
import { SectionHeading } from "@/components/SectionHeading";
import { MiniPoll } from "@/components/MiniPoll";
import { ButtonLink } from "@/components/ui/button";
import { HOME_PROMPT_CARDS } from "@/lib/data/prompts";
import { PILLARS } from "@/lib/data/pillars";
import { FIELD_NOTES } from "@/lib/data/field-notes";
import { RESEARCH_PHASES } from "@/lib/data/phases";

export const dynamic = "force-dynamic";

const SNAPSHOT = [
  { icon: HelpCircle, stat: "1", label: "Core Question" },
  { icon: Layers, stat: "6", label: "Index Pillars" },
  { icon: Users, stat: "Multiple", label: "Stakeholder Voices" },
  { icon: Database, stat: "Living", label: "Evidence Base" },
];

export default async function HomePage() {
  const notes = await getApprovedContributions();
  const latestNotes = FIELD_NOTES.slice(0, 3);

  return (
    <>
      <HeroSection preview={notes} />

      {/* A. Digital Post-It Wall */}
      <section className="wall-backdrop py-16 sm:py-20" id="wall">
        <div className="container-lab">
          <SectionHeading
            eyebrow="The Research Wall"
            title="A living wall of contributions"
            description="Real perspectives from founders, banks, investors, advisors, researchers, ESOs, and policymakers on what helps SMEs absorb capital and grow. Only reviewed contributions appear here."
          />
          <div className="mt-10">
            <PostItWall notes={notes} />
          </div>
        </div>
      </section>

      {/* B. Prompt cards */}
      <section className="border-y border-navy/10 bg-white py-16 sm:py-20">
        <div className="container-lab">
          <SectionHeading
            eyebrow="Add your voice"
            title="Respond to a research prompt"
            description="Pick a question and leave a post-it. Every contribution sharpens the framework."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HOME_PROMPT_CARDS.map((p) => (
              <PromptCard key={p} prompt={p} />
            ))}
          </div>
        </div>
      </section>

      {/* C. Research snapshot */}
      <section className="py-16 sm:py-20">
        <div className="container-lab">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SNAPSHOT.map(({ icon: Icon, stat, label }) => (
              <div
                key={label}
                className="rounded-2xl border border-navy/10 bg-white p-6 text-center shadow-soft"
              >
                <span className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-gold/15 text-gold-600">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-4 font-serif text-2xl text-navy-900">{stat}</p>
                <p className="text-sm text-navy-600">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* D. What is management capital */}
      <section className="bg-navy-900 py-16 text-cream sm:py-20">
        <div className="container-lab grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-300">
              The core idea
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-cream sm:text-[2.1rem]">
              What is management capital?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-cream/85">
              Management capital is the internal capability of a business to
              make, manage, deploy, and account for growth decisions.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-cream/70">
              For many African SMEs, the binding constraint to growth may not be
              financial capital alone, but insufficient management capital: the
              capability required to absorb capital and convert it into
              sustainable growth.
            </p>
            <ButtonLink href="/framework" variant="gold" className="mt-7">
              Explore the six pillars
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {PILLARS.map((p) => (
              <li
                key={p.id}
                className="rounded-xl border border-cream/15 bg-cream/5 p-4"
              >
                <span className="text-xs font-semibold text-gold-300">
                  Pillar {p.id}
                </span>
                <p className="mt-1 font-serif text-[15px] leading-snug text-cream">
                  {p.name}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* E. Six pillars preview */}
      <section className="py-16 sm:py-20">
        <div className="container-lab">
          <SectionHeading
            eyebrow="The Management Capital Index"
            title="Six pillars of readiness"
            description="A proposed diagnostic framework for assessing whether SMEs are ready to access, absorb, and deploy capital for sustainable growth."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p) => (
              <Link key={p.id} href={`/framework#${p.slug}`} className="block">
                <PillarPreviewCard pillar={p} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Research journey preview + poll */}
      <section className="border-y border-navy/10 bg-white py-16 sm:py-20">
        <div className="container-lab grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading
              eyebrow="Research Journey"
              title="Follow the work as it unfolds"
              description="This is a living DBA project. Here is where it stands today."
            />
            <div className="mt-8">
              <ResearchPhaseTimeline phases={RESEARCH_PHASES.slice(0, 4)} />
            </div>
            <ButtonLink href="/journey" variant="outline" className="mt-2">
              View the full journey
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
          <div className="lg:pt-16">
            <MiniPoll />
          </div>
        </div>
      </section>

      {/* Latest field notes */}
      <section className="py-16 sm:py-20">
        <div className="container-lab">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Field Notes"
              title="Latest research reflections"
            />
            <ButtonLink href="/field-notes" variant="ghost" size="sm">
              All field notes
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {latestNotes.map((note) => (
              <FieldNoteCard key={note.id} note={note} />
            ))}
          </div>
        </div>
      </section>

      {/* F. Collaboration CTA */}
      <section className="pb-20">
        <div className="container-lab">
          <div className="overflow-hidden rounded-3xl border border-forest/20 bg-gradient-to-br from-forest-600 to-forest-800 p-8 text-cream sm:p-12">
            <div className="max-w-2xl">
              <h2 className="font-serif text-3xl text-cream sm:text-4xl">
                Help shape the research.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-cream/85">
                This project welcomes insight from founders, banks, investors,
                advisors, researchers, ESOs, policymakers, and development
                partners working with African SMEs.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/collaborate" variant="gold" size="lg">
                  Collaborate with the Research
                </ButtonLink>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-cream/40 px-7 text-base font-medium text-cream transition-colors hover:bg-cream/10"
                >
                  <Mail className="h-4 w-4" />
                  Talk to Mary
                </a>
                <ButtonLink
                  href="/contribute"
                  variant="outline"
                  size="lg"
                  className="border-cream/40 text-cream hover:bg-cream/10"
                >
                  Leave a Post-It
                </ButtonLink>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full border border-cream/40 px-6 text-sm font-medium text-cream hover:bg-cream/10"
                  aria-disabled
                >
                  <Download className="h-4 w-4" />
                  Download Research Concept Note
                </a>
              </div>
              <p className="mt-5 text-sm text-cream/70">
                Prefer email? Reach Mary directly at{" "}
                <a
                  href={`mailto:${SITE.email}`}
                  className="font-medium text-gold-200 underline underline-offset-2 hover:text-gold-100"
                >
                  {SITE.email}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

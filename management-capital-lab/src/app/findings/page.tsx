import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Info,
  Split,
  Telescope,
  Send,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { ConceptualModel } from "@/components/ConceptualModel";
import { ButtonLink } from "@/components/ui/button";
import {
  CHAPTERS,
  THESIS_IN_BRIEF,
  CONTEXT_FIGURES,
  KEY_FINDINGS,
  CONVERGENCE,
  DISAGREEMENT,
  MISSING_LAYER,
  HYPOTHESES,
  THEORIES,
  CONSTRUCT_BOUNDARIES,
  MARKETS,
  COMPARISON_LOGIC,
  RESEARCH_GAPS,
  DESIGN_PRINCIPLES,
  METHOD_SEQUENCE,
} from "@/lib/data/findings";
import { LITERATURE_STATS } from "@/lib/data/library";

export const metadata: Metadata = {
  title: "Findings so far",
  description:
    "What Chapters One and Two of the Management Capital Lab DBA found: why finance alone does not explain African SME growth, what a 64-article literature review says, the refined conceptual model, hypotheses and research gaps for Kenya and South Africa.",
};

const CH1_GAPS = [
  { name: "Conceptual", body: "Related terms (managerial capital, business practices, financial capability, investment readiness, absorptive capacity) are not consistently defined, and capital absorption is barely developed as a firm-level capability." },
  { name: "Measurement", body: "Management-practice tools were not designed to diagnose readiness for finance and productive absorption; readiness tools in practice are proprietary or document-centred." },
  { name: "Contextual", body: "The strongest causal evidence comes from outside Africa or narrow samples; cross-country African evidence linking capability to financing and post-financing outcomes is limited." },
  { name: "Outcome", body: "Many studies stop at access to finance or short-term practice change. Few follow whether capital is deployed as intended and turned into resilient growth." },
  { name: "Practical translation", body: "Founders, banks, investors and ESOs lack a shared, founder-centred language for acting on the evidence that management matters." },
];

const ON_THIS_PAGE = [
  { href: "#chapter-one", label: "Chapter One" },
  { href: "#chapter-two", label: "Chapter Two: key findings" },
  { href: "#evidence", label: "Where evidence agrees" },
  { href: "#model", label: "Conceptual model" },
  { href: "#hypotheses", label: "Hypotheses" },
  { href: "#theory", label: "Theory" },
  { href: "#markets", label: "Kenya & South Africa" },
  { href: "#gaps", label: "Research gaps" },
  { href: "#next", label: "How it will be tested" },
];

export default function FindingsPage() {
  const ch1 = CHAPTERS[0];
  const ch2 = CHAPTERS[1];
  return (
    <>
      <PageHeader
        eyebrow="Findings so far"
        title="What Chapters One and Two found"
        intro="The first two chapters of the DBA set out the problem and test it against the literature. Here is the argument, the evidence behind it, and the model the empirical study will now put to the test."
      >
        <div className="mt-7 flex flex-wrap gap-3">
          {CHAPTERS.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-4 py-2 text-sm text-navy-700 shadow-soft transition-colors hover:border-navy/30"
            >
              {c.status === "Completed" ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              ) : (
                <Send className="h-4 w-4 text-navy-500" />
              )}
              <span className="font-medium text-navy-900">Chapter {c.number}</span>
              <span className="text-navy-500">
                {c.title} · {c.status} · {c.date}
              </span>
            </a>
          ))}
        </div>
      </PageHeader>

      <div className="container-lab py-14 sm:py-16">
        {/* Integrity note */}
        <aside className="flex gap-3 rounded-2xl border border-gold/30 bg-gold-50 p-5 text-sm leading-relaxed text-navy-700">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
          <p>
            <strong className="text-navy-900">How to read this page.</strong>{" "}
            These are findings from the literature and the conceptual work, not
            results from new data. The hypotheses and the six dimensions are
            provisional until the Kenya–South Africa fieldwork tests them
            (Chapters Four and Five). Post-its on this site help surface
            language and ideas, but they are not treated as research findings.
          </p>
        </aside>

        {/* On this page */}
        <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-2">
          {ON_THIS_PAGE.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full border border-navy/15 bg-white px-3.5 py-1.5 text-xs font-medium text-navy-700 transition-colors hover:border-navy/35"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Chapter One                                                          */}
      {/* ------------------------------------------------------------------ */}
      <section id="chapter-one" className="scroll-mt-24 border-y border-navy/10 bg-white py-16 sm:py-20">
        <div className="container-lab">
          <SectionHeading
            eyebrow={`Chapter ${ch1.number} · ${ch1.title} · ${ch1.status} ${ch1.date}`}
            title="A diagnosis gap, not only a finance gap"
            description={ch1.summary}
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CONTEXT_FIGURES.map((f) => (
              <div key={f.label} className="rounded-2xl border border-navy/10 bg-cream-50 p-5">
                <p className="font-serif text-3xl text-navy-900">{f.value}</p>
                <p className="mt-1 text-sm leading-snug text-navy-700">{f.label}</p>
                <p className="mt-2 text-xs text-navy-500">{f.source}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-navy-600">
            These figures are strong grounds for improving the supply of
            finance. But a gap in aggregate demand does not show that finance is
            the binding constraint for every firm. That distinction is where the
            study begins.
          </p>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-navy/10 p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-forest-700">
                Problem statement
              </p>
              <p className="mt-2 font-serif text-lg leading-relaxed text-navy-900">
                {THESIS_IN_BRIEF.problem}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-navy-600">
                The consequence: capital and advisory support may be poorly
                sequenced, readiness is judged on incomplete proxies, and firms
                with different constraints receive the same intervention.
              </p>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl border border-forest/20 bg-forest/5 p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-forest-700">
                  Main research question
                </p>
                <p className="mt-2 font-serif text-lg leading-snug text-navy-900">
                  {THESIS_IN_BRIEF.mainQuestion}
                </p>
              </div>
              <div className="rounded-2xl border border-navy/10 p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-navy-500">
                  Aim
                </p>
                <p className="mt-2 text-sm leading-relaxed text-navy-700">{THESIS_IN_BRIEF.aim}</p>
                <Link
                  href="/about"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-forest hover:text-forest-700"
                >
                  All seven objectives and questions <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

          <h3 className="mt-14 font-serif text-xl text-navy-900">
            The five gaps Chapter One identified
          </h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {CH1_GAPS.map((g) => (
              <div key={g.name} className="rounded-2xl border border-navy/10 bg-cream-50 p-5">
                <p className="font-serif text-base text-navy-900">{g.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">{g.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Chapter Two: key findings                                            */}
      {/* ------------------------------------------------------------------ */}
      <section id="chapter-two" className="scroll-mt-24 py-16 sm:py-20">
        <div className="container-lab">
          <SectionHeading
            eyebrow={`Chapter ${ch2.number} · ${ch2.title} · ${ch2.status}, ${ch2.date}`}
            title="Nine things the literature says"
            description={ch2.summary}
          />
          <blockquote className="mt-8 max-w-3xl border-l-4 border-gold pl-5 font-serif text-xl leading-relaxed text-navy-900">
            &ldquo;{THESIS_IN_BRIEF.claim}&rdquo;
          </blockquote>

          <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {KEY_FINDINGS.map((f) => (
              <li
                key={f.n}
                className="flex flex-col rounded-2xl border border-navy/10 bg-white p-6 shadow-soft"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-navy text-sm font-semibold text-cream">
                    {f.n}
                  </span>
                  <span className="text-xs text-navy-500">{f.source}</span>
                </div>
                <h3 className="mt-4 font-serif text-lg leading-snug text-navy-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-700">{f.body}</p>
                <div className="mt-auto pt-4">
                  <p className="rounded-xl bg-cream-100 p-3.5 text-xs leading-relaxed text-navy-600 ring-1 ring-inset ring-navy/10">
                    <span className="font-semibold uppercase tracking-wide text-forest-700">Evidence · </span>
                    {f.evidence}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Convergence & disagreement                                          */}
      {/* ------------------------------------------------------------------ */}
      <section id="evidence" className="scroll-mt-24 bg-navy-900 py-16 text-cream sm:py-20">
        <div className="container-lab">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-300">
            Reading across the evidence
          </p>
          <h2 className="mt-3 max-w-2xl font-serif text-3xl leading-tight text-cream sm:text-[2rem]">
            Where the studies agree, where they split, and what is missing
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-cream/15 bg-cream/5 p-6">
              <h3 className="flex items-center gap-2 font-serif text-lg text-cream">
                <CheckCircle2 className="h-5 w-5 text-emerald-300" /> The evidence converges
              </h3>
              <ul className="mt-4 space-y-3">
                {CONVERGENCE.map((c) => (
                  <li key={c} className="flex gap-2.5 text-sm leading-relaxed text-cream/85">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-cream/15 bg-cream/5 p-6">
              <h3 className="flex items-center gap-2 font-serif text-lg text-cream">
                <Split className="h-5 w-5 text-gold-300" /> The evidence disagrees
              </h3>
              <ul className="mt-4 space-y-3">
                {DISAGREEMENT.map((c) => (
                  <li key={c} className="flex gap-2.5 text-sm leading-relaxed text-cream/85">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-300" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-8 flex max-w-3xl gap-3 text-lg leading-relaxed text-cream/90">
            <Telescope className="mt-1 h-5 w-5 shrink-0 text-gold-300" />
            {MISSING_LAYER}
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Conceptual model                                                    */}
      {/* ------------------------------------------------------------------ */}
      <section id="model" className="scroll-mt-24 py-16 sm:py-20">
        <div className="container-lab">
          <SectionHeading
            eyebrow="The refined model"
            title="From management capital to sustainable growth"
            description="The proposed pathway the study will test (Chapter Two, Figure 2.1). Management capital is the explanatory construct; investment readiness and capital absorption are the routes through which it is expected to work."
          />
          <ConceptualModel className="mt-10" />

          <h3 className="mt-14 font-serif text-xl text-navy-900">
            Keeping the concepts apart
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-navy-600">
            Chapter Two sets boundaries in time and cause, so that no indicator
            appears as both predictor and outcome. The most important change is
            splitting capital absorption in two: readiness to deploy capital
            (before funding) and realised absorption (after funding).
          </p>
          <dl className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {CONSTRUCT_BOUNDARIES.map((b, i) => (
              <div key={b.term} className="rounded-2xl border border-navy/10 bg-white p-5 shadow-soft">
                <dt className="flex items-center gap-2 font-serif text-base text-navy-900">
                  <span className="text-xs font-semibold text-gold-600">{i + 1}</span>
                  {b.term}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-navy-600">{b.def}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Hypotheses                                                          */}
      {/* ------------------------------------------------------------------ */}
      <section id="hypotheses" className="scroll-mt-24 border-y border-navy/10 bg-white py-16 sm:py-20">
        <div className="container-lab">
          <SectionHeading
            eyebrow="Provisional hypotheses"
            title="What the study will test"
            description="Carried from Chapter One and sharpened in Chapter Two. They stay provisional until qualitative construct development and measurement validation confirm the dimensional structure."
          />
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {HYPOTHESES.map((h) => (
              <li
                key={h.id}
                className={
                  h.id === "MP1"
                    ? "rounded-2xl border border-gold/40 bg-gold-50 p-5 md:col-span-2"
                    : "rounded-2xl border border-navy/10 bg-cream-50 p-5"
                }
              >
                <div className="flex items-start gap-3">
                  <span className="grid h-9 min-w-9 shrink-0 place-items-center rounded-full bg-navy px-2 text-sm font-semibold text-cream">
                    {h.id}
                  </span>
                  <div>
                    <p className="text-sm leading-relaxed text-navy-800">{h.text}</p>
                    {h.change && (
                      <p className="mt-2 text-xs leading-relaxed text-navy-500">
                        <span className="font-semibold text-gold-700">Refined: </span>
                        {h.change}
                      </p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Theory                                                              */}
      {/* ------------------------------------------------------------------ */}
      <section id="theory" className="scroll-mt-24 py-16 sm:py-20">
        <div className="container-lab">
          <SectionHeading
            eyebrow="Theoretical foundations"
            title="No single theory explains the whole model"
            description="Together, these lenses support a sequence in which management capital strengthens readiness, influences access to finance, improves deployment and contributes to growth, with learning feeding back into capability."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {THEORIES.map((t) => (
              <article key={t.name} className="rounded-2xl border border-navy/10 bg-white p-6 shadow-soft">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-serif text-lg text-navy-900">{t.name}</h3>
                  <span className="rounded-full bg-forest/10 px-2.5 py-0.5 text-xs font-medium text-forest-700">
                    {t.role}
                  </span>
                </div>
                <p className="mt-1 text-xs text-navy-500">{t.cite}</p>
                <p className="mt-3 text-sm leading-relaxed text-navy-700">{t.explains}</p>
                <p className="mt-3 text-xs leading-relaxed text-navy-500">
                  <span className="font-semibold text-navy-600">Guarded against: </span>
                  {t.caution}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Kenya & South Africa                                                */}
      {/* ------------------------------------------------------------------ */}
      <section id="markets" className="scroll-mt-24 border-y border-navy/10 bg-white py-16 sm:py-20">
        <div className="container-lab">
          <SectionHeading
            eyebrow="Empirical setting"
            title="Kenya and South Africa, compared"
            description={COMPARISON_LOGIC}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {MARKETS.map((m) => (
              <div key={m.country} className="rounded-2xl border border-navy/10 bg-cream-50 p-6">
                <h3 className="font-serif text-xl text-navy-900">{m.country}</h3>
                <ul className="mt-4 space-y-3">
                  {m.points.map((pt) => (
                    <li key={pt} className="flex gap-2.5 text-sm leading-relaxed text-navy-700">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Gaps                                                                */}
      {/* ------------------------------------------------------------------ */}
      <section id="gaps" className="scroll-mt-24 py-16 sm:py-20">
        <div className="container-lab">
          <SectionHeading
            eyebrow="Synthesis"
            title="Eight research gaps, each traced to an objective"
            description="The contribution doesn't rest on one generic claim that African evidence is limited. It rests on the combination: a construct not yet integrated, a financing sequence not observed over time, founder and funder views rarely compared, and measures not tested for equivalence across markets."
          />
          <div className="mt-10 overflow-x-auto rounded-2xl border border-navy/10 bg-white shadow-soft">
            <table className="w-full min-w-[46rem] text-left text-sm">
              <thead className="bg-cream-100 text-xs uppercase tracking-wide text-navy-600">
                <tr>
                  <th scope="col" className="px-5 py-3 font-semibold">Gap</th>
                  <th scope="col" className="px-5 py-3 font-semibold">What the literature hasn&apos;t done</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Objective</th>
                  <th scope="col" className="px-5 py-3 font-semibold">How the study responds</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/10">
                {RESEARCH_GAPS.map((g) => (
                  <tr key={g.gap} className="align-top">
                    <th scope="row" className="px-5 py-4 font-serif text-base font-normal text-navy-900">
                      {g.gap}
                    </th>
                    <td className="px-5 py-4 leading-relaxed text-navy-700">{g.what}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-xs font-semibold text-forest-700">{g.objective}</td>
                    <td className="px-5 py-4 leading-relaxed text-navy-700">{g.response}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* How it will be tested                                               */}
      {/* ------------------------------------------------------------------ */}
      <section id="next" className="scroll-mt-24 border-y border-navy/10 bg-white py-16 sm:py-20">
        <div className="container-lab grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Design implications"
              title="Five principles for the index"
              description="What the literature implies for how management capital should be measured."
            />
            <ol className="mt-8 space-y-3">
              {DESIGN_PRINCIPLES.map((p, i) => (
                <li key={p.title} className="flex gap-4 rounded-2xl border border-navy/10 bg-cream-50 p-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-forest text-sm font-semibold text-cream">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-serif text-base text-navy-900">{p.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-navy-600">{p.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <SectionHeading
              eyebrow="What comes next"
              title="An exploratory sequential design"
              description="No single existing method can answer the question, so qualitative work defines the construct before the survey tests it. Chapter Three sets out the full design."
            />
            <ol className="relative mt-8 space-y-0">
              <span className="absolute bottom-3 left-[15px] top-3 w-px bg-navy/15" aria-hidden />
              {METHOD_SEQUENCE.map((m, i) => (
                <li key={m.step} className="relative flex gap-4 pb-5 last:pb-0">
                  <span className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-gold bg-white text-xs font-semibold text-gold-700">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-serif text-base text-navy-900">{m.step}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-navy-600">{m.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Evidence base CTA                                                   */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 sm:py-20">
        <div className="container-lab">
          <div className="overflow-hidden rounded-3xl border border-navy/15 bg-gradient-to-br from-navy-800 to-navy-900 p-8 text-cream sm:p-12">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold/20 text-gold-200">
                  <BookOpen className="h-5 w-5" />
                </span>
                <h2 className="mt-5 font-serif text-3xl text-cream sm:text-4xl">
                  Explore the {LITERATURE_STATS.total} articles behind these findings
                </h2>
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-cream/85">
                  Every study in the review database, with its key finding,
                  method, geography and why it matters to the index. Filter by
                  theme, country or method.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href="/library" variant="gold" size="lg">
                    Open the research library <ArrowRight className="h-4 w-4" />
                  </ButtonLink>
                  <ButtonLink
                    href="/framework"
                    variant="outline"
                    size="lg"
                    className="border-cream/40 text-cream hover:bg-cream/10"
                  >
                    See the refined six pillars
                  </ButtonLink>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { k: "Verified articles", v: LITERATURE_STATS.total },
                  { k: "Field or randomised experiments", v: LITERATURE_STATS.experiments },
                  { k: "Africa-based studies", v: LITERATURE_STATS.africa },
                  { k: "Target corpus", v: `${LITERATURE_STATS.target.min}–${LITERATURE_STATS.target.max}` },
                ].map((t) => (
                  <div key={t.k} className="rounded-2xl border border-cream/15 bg-cream/5 p-4">
                    <p className="font-serif text-3xl text-cream">{t.v}</p>
                    <p className="mt-1 text-xs text-cream/70">{t.k}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="mt-6 text-sm text-navy-500">
            Have a view on these findings, or evidence from Kenya or South Africa
            the review should include?{" "}
            <Link href="/contribute" className="font-medium text-forest underline underline-offset-2 hover:text-forest-700">
              Leave a post-it
            </Link>{" "}
            or{" "}
            <Link href="/collaborate" className="font-medium text-forest underline underline-offset-2 hover:text-forest-700">
              get in touch to collaborate
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}

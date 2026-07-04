import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Info } from "lucide-react";
import {
  insights,
  getInsight,
  relatedInsights,
  formatDate,
} from "@/lib/insights";
import { CoverArt } from "@/components/CoverArt";
import { InsightCard } from "@/components/InsightCard";
import { Reveal } from "@/components/Reveal";
import { CTASection } from "@/components/CTASection";

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return { title: "Insight not found" };
  return {
    title: insight.title,
    description: insight.excerpt,
    openGraph: {
      title: insight.title,
      description: insight.excerpt,
      type: "article",
    },
  };
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();
  const related = relatedInsights(insight);

  return (
    <>
      <article>
        {/* Header */}
        <header className="border-b border-ink-100 bg-ink-950">
          <div className="container-page py-16 sm:py-20">
            <Reveal className="max-w-3xl">
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 text-sm font-medium text-ink-300 transition-colors hover:text-gold-400"
              >
                <ArrowLeft className="h-4 w-4" />
                All insights
              </Link>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-ink-300">
                <span className="rounded-full bg-gold-500/15 px-3 py-1 text-xs font-semibold text-gold-400">
                  {insight.category}
                </span>
                <span>{formatDate(insight.date)}</span>
                <span className="h-1 w-1 rounded-full bg-ink-500" />
                <span>{insight.readTime}</span>
              </div>
              <h1 className="mt-5 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl">
                {insight.title}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-ink-200">
                {insight.excerpt}
              </p>
              <p className="mt-6 text-sm text-ink-400">
                By {insight.author}
              </p>
            </Reveal>
          </div>
        </header>

        <div className="container-page py-16">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <CoverArt
                variant={insight.cover}
                label={`${insight.title} cover`}
                className="aspect-[16/7] w-full shadow-lift"
              />
            </Reveal>

            {/* Takeaways */}
            <Reveal delay={80}>
              <div className="mt-10 rounded-2xl border border-teal-200 bg-teal-50/70 p-7">
                <h2 className="text-xs font-semibold uppercase tracking-widest2 text-teal-700">
                  Key takeaways
                </h2>
                <ul className="mt-4 space-y-3">
                  {insight.takeaways.map((t) => (
                    <li
                      key={t}
                      className="flex items-start gap-3 text-sm text-ink-800"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Body */}
            <div className="mt-12 space-y-10">
              {insight.body.map((block, i) => (
                <Reveal key={i} delay={20}>
                  {block.heading && (
                    <h2 className="mb-4 font-serif text-2xl font-semibold text-ink-900">
                      {block.heading}
                    </h2>
                  )}
                  <div className="space-y-4">
                    {block.paragraphs.map((p, j) => (
                      <p
                        key={j}
                        className="text-lg leading-relaxed text-ink-600"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Disclaimer */}
            <div className="mt-14 flex items-start gap-3 rounded-2xl border border-ink-100 bg-sand-100 p-6 text-sm text-ink-500">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
              <p>
                This article is general guidance, not specific professional
                advice. Tax law and reporting standards change, and your
                situation is unique. Speak with us before acting on anything
                here.
              </p>
            </div>

            <div className="mt-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-sand-50 shadow-soft transition-all hover:bg-ink-800 hover:shadow-lift"
              >
                Talk to us about this
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Related */}
      <section className="border-t border-ink-100 bg-sand-100 py-20">
        <div className="container-page">
          <h2 className="font-serif text-2xl font-semibold text-ink-900">
            Related insights
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <InsightCard key={r.slug} insight={r} />
            ))}
          </div>
        </div>
      </section>

      <div className="py-24">
        <CTASection />
      </div>
    </>
  );
}

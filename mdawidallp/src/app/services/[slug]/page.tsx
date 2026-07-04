import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ArrowRight, Check, Package, Target } from "lucide-react";
import { services, getService, site } from "@/lib/site";
import { getInsight } from "@/lib/insights";
import { img } from "@/lib/images";
import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/Photo";
import { InsightCard } from "@/components/InsightCard";
import { CTASection } from "@/components/CTASection";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service not found" };
  return {
    title: service.name,
    description: service.tagline,
    openGraph: {
      title: `${service.name} | ${site.name}`,
      description: service.tagline,
      type: "website",
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const Icon = service.icon;
  const others = services.filter((s) => s.slug !== service.slug);
  const related = service.relatedInsights
    .map((s) => getInsight(s))
    .filter((i): i is NonNullable<typeof i> => Boolean(i))
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink-950">
        <div className="absolute inset-0">
          <Photo
            image={img[service.image]}
            rounded={false}
            overlay="navy"
            priority
            className="h-full"
            sizes="100vw"
          />
        </div>
        <div className="container-page relative py-20 sm:py-28">
          <Reveal className="max-w-3xl">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink-200 transition-colors hover:text-teal-300"
            >
              <ArrowLeft className="h-4 w-4" />
              All services
            </Link>
            <div className="mt-6 flex items-center gap-4">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 text-teal-300 ring-1 ring-white/20 backdrop-blur-sm">
                <Icon className="h-6 w-6" />
              </span>
              <span className="eyebrow text-teal-300">
                <span className="h-px w-6 bg-teal-400" />
                Service line
              </span>
            </div>
            <h1 className="mt-5 font-serif text-4xl font-semibold leading-[1.08] text-white sm:text-5xl">
              {service.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-100 sm:text-xl">
              {service.tagline}
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lift transition-all hover:bg-teal-700"
              >
                Discuss {service.name.split(" ")[0].toLowerCase()} needs
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Overview */}
      <section className="container-page py-24">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal>
            <span className="eyebrow">
              <span className="h-px w-6 bg-teal-500" />
              Overview
            </span>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-ink-900 sm:text-4xl">
              {service.short}
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-500">
              {service.overview.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Photo
              image={img[service.image]}
              className="aspect-[4/3] w-full shadow-lift"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </Reveal>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-sand-100 py-24">
        <div className="container-page">
          <div className="max-w-2xl">
            <span className="eyebrow">
              <span className="h-px w-6 bg-teal-500" />
              What we do
            </span>
            <h2 className="mt-4 text-3xl font-semibold text-ink-900 sm:text-4xl">
              A complete {service.name.split(" ")[0].toLowerCase()} capability.
            </h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {service.capabilities.map((cap, i) => (
              <Reveal
                key={cap.title}
                delay={i * 80}
                className="rounded-2xl border border-ink-100 bg-white p-8 shadow-soft"
              >
                <span className="font-serif text-2xl font-semibold text-teal-600">
                  0{i + 1}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-ink-900">
                  {cap.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {cap.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-relaxed text-ink-600"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="container-page py-24">
        <div className="max-w-2xl">
          <span className="eyebrow">
            <span className="h-px w-6 bg-teal-500" />
            How we work
          </span>
          <h2 className="mt-4 text-3xl font-semibold text-ink-900 sm:text-4xl">
            A clear path from first meeting to real value.
          </h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {service.process.map((step, i) => (
            <Reveal
              key={step.title}
              delay={i * 80}
              className="relative rounded-2xl border border-ink-100 bg-white p-7 shadow-soft"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-950 font-serif text-sm font-semibold text-teal-300">
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                {step.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Deliverables + Outcomes */}
      <section className="bg-ink-950 py-24">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <Reveal className="rounded-3xl border border-ink-800 bg-ink-900/60 p-8 sm:p-10">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-teal-300">
              <Package className="h-6 w-6" />
            </span>
            <h2 className="mt-5 text-2xl font-semibold text-white">
              What you receive
            </h2>
            <ul className="mt-6 space-y-4">
              {service.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-3 text-ink-100">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-teal-400" />
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120} className="rounded-3xl border border-ink-800 bg-ink-900/60 p-8 sm:p-10">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-teal-300">
              <Target className="h-6 w-6" />
            </span>
            <h2 className="mt-5 text-2xl font-semibold text-white">
              What changes for you
            </h2>
            <ul className="mt-6 space-y-4">
              {service.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-3 text-ink-100">
                  <ArrowRight className="mt-0.5 h-5 w-5 shrink-0 text-teal-400" />
                  {o}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* FAQs */}
      <section className="container-page py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="eyebrow">
              <span className="h-px w-6 bg-teal-500" />
              Questions
            </span>
            <h2 className="mt-4 text-3xl font-semibold text-ink-900 sm:text-4xl">
              The things clients ask first.
            </h2>
            <p className="mt-4 text-ink-500">
              Still not sure? A short conversation will answer it faster than any
              page can.
            </p>
            <Link
              href="/contact"
              className="link-underline mt-6 text-teal-700"
            >
              Ask us directly
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="divide-y divide-ink-100 border-y border-ink-100">
            {service.faqs.map((faq) => (
              <Reveal key={faq.q} className="py-6">
                <h3 className="text-lg font-semibold text-ink-900">{faq.q}</h3>
                <p className="mt-3 leading-relaxed text-ink-500">{faq.a}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Related insights */}
      {related.length > 0 && (
        <section className="bg-sand-100 py-24">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="font-serif text-2xl font-semibold text-ink-900">
                Related insights
              </h2>
              <Link href="/insights" className="link-underline text-teal-700">
                All insights
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <InsightCard key={r.slug} insight={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other services */}
      <section className="container-page py-24">
        <h2 className="font-serif text-2xl font-semibold text-ink-900">
          Explore the other service lines
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {others.map((s) => {
            const OtherIcon = s.icon;
            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex items-start gap-5 rounded-2xl border border-ink-100 bg-white p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ink-950 text-teal-300">
                  <OtherIcon className="h-5 w-5" />
                </span>
                <span>
                  <span className="flex items-center gap-1 text-lg font-semibold text-ink-900">
                    {s.name}
                    <ArrowUpRight className="h-4 w-4 text-teal-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                  <span className="mt-1 block text-sm text-ink-500">
                    {s.short}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="pb-24">
        <CTASection />
      </div>
    </>
  );
}

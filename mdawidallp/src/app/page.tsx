import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import {
  services,
  industries,
  values,
  stats,
  leadership,
  site,
} from "@/lib/site";
import { insights } from "@/lib/insights";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { CoverArt } from "@/components/CoverArt";
import { Monogram } from "@/components/Monogram";
import { InsightCard } from "@/components/InsightCard";
import { CTASection } from "@/components/CTASection";

export default function HomePage() {
  const featured = insights.filter((i) => i.featured).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-950">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-teal-600/30 blur-3xl" />
          <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-gold-500/20 blur-3xl" />
        </div>
        <div className="container-page relative grid items-center gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
          <div>
            <Reveal>
              <span className="eyebrow text-gold-400">
                <span className="h-px w-6 bg-gold-500" />
                Audit · Tax · Advisory · East Africa
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 font-serif text-4xl font-semibold leading-[1.06] text-white sm:text-5xl lg:text-6xl">
                Stronger financial foundations for scalable growth.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-200">
                {site.name} is a premium, partner led audit, tax, and advisory
                firm. We give boards and founders across {site.region} numbers
                they can trust, and the financial capability to grow.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-sm font-semibold text-ink-900 shadow-soft transition-all hover:bg-gold-400 hover:shadow-lift"
                >
                  Talk to us
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-full border border-ink-700 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-ink-500"
                >
                  Our services
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} className="relative">
            <div className="relative">
              <CoverArt
                variant={0}
                label="Financial growth artwork"
                className="aspect-[4/3] w-full shadow-lift ring-1 ring-white/10"
              />
              <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-ink-100 bg-white p-5 shadow-lift sm:block">
                <p className="font-serif text-3xl font-semibold text-ink-900">
                  IFRS
                </p>
                <p className="mt-1 text-xs uppercase tracking-widest2 text-gold-600">
                  Standards led assurance
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Stats band */}
        <div className="relative border-t border-ink-800">
          <div className="container-page grid grid-cols-2 divide-x divide-ink-800 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 80}
                className="px-2 py-8 text-center sm:py-10"
              >
                <p className="font-serif text-2xl font-semibold text-white sm:text-3xl">
                  {s.value}
                </p>
                <p className="mt-2 text-xs uppercase tracking-wide text-ink-400">
                  {s.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="container-page py-24">
        <SectionHeading
          eyebrow="What we do"
          title="Three service lines, one standard of rigour."
          lead="From the audit that satisfies your board to the advisory that gets you funded, we work as one team across the full financial picture."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal
                key={service.slug}
                delay={i * 90}
                as="article"
                className="group flex flex-col rounded-2xl border border-ink-100 bg-white p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-ink-950 text-gold-400">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-xl font-semibold text-ink-900">
                  {service.name}
                </h3>
                <p className="mt-2 text-sm font-medium text-teal-700">
                  {service.short}
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-500">
                  {service.summary}
                </p>
                <Link
                  href={`/services#${service.slug}`}
                  className="link-underline mt-6 text-sm text-ink-900"
                >
                  Explore {service.name.split(" ")[0]}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Values / why us */}
      <section className="bg-sand-100 py-24">
        <div className="container-page grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Why Mdawida LLP"
            title="A firm built around judgement, not volume."
            lead="We keep our partners close to the work. That means senior attention on every file and advice you can actually act on."
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {values.map((value, i) => (
              <Reveal
                key={value.title}
                delay={i * 80}
                className="rounded-2xl border border-ink-100 bg-white p-7 shadow-soft"
              >
                <span className="font-serif text-2xl font-semibold text-gold-500">
                  0{i + 1}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-ink-900">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">
                  {value.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="container-page py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Industries"
            title="Depth where your business lives."
            lead="We bring sector fluency to the numbers, from SACCOs and agribusiness to donor funded programmes and scaling technology ventures."
          />
          <Reveal>
            <Link href="/industries" className="link-underline text-teal-700">
              All industries
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.slice(0, 8).map((industry, i) => (
            <Reveal
              key={industry.slug}
              delay={(i % 4) * 70}
              className="group overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <CoverArt variant={i} rounded={false} className="h-28" />
              <div className="p-5">
                <h3 className="text-sm font-semibold text-ink-900">
                  {industry.name}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-ink-500">
                  {industry.blurb}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Leadership teaser */}
      <section className="bg-ink-950 py-24">
        <div className="container-page grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="mx-auto w-full max-w-xs">
            <Monogram initials={leadership.initials} className="shadow-lift" />
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Led by"
              title="CPA Kennedy Mdawida, Founder and Managing Partner."
              tone="light"
              lead="A Certified Public Accountant and strategic finance leader, Kennedy founded the firm to bring partner led rigour and genuine growth advice to businesses across the region."
            />
            <Reveal delay={120}>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {leadership.credentials.map((c) => (
                  <li
                    key={c}
                    className="flex items-start gap-3 text-sm text-ink-200"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={180}>
              <Link
                href="/about"
                className="link-underline mt-8 text-gold-400 hover:text-gold-300"
              >
                More about the firm
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Insights */}
      <section className="container-page py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Insights"
            title="Notes from the East African market."
            lead="Practical thinking on the tax, assurance, and advisory questions facing businesses in the region right now."
          />
          <Reveal>
            <Link href="/insights" className="link-underline text-teal-700">
              All insights
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((insight) => (
            <InsightCard key={insight.slug} insight={insight} />
          ))}
        </div>
      </section>

      <CTASection />
      <div className="h-24" />
    </>
  );
}

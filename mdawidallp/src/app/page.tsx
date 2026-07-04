import Link from "next/link";
import { ArrowUpRight, ArrowRight, Check } from "lucide-react";
import {
  services,
  industries,
  values,
  stats,
  standards,
  leadership,
  site,
} from "@/lib/site";
import { insights } from "@/lib/insights";
import { img } from "@/lib/images";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Photo } from "@/components/Photo";
import { Monogram } from "@/components/Monogram";
import { InsightCard } from "@/components/InsightCard";
import { CTASection } from "@/components/CTASection";

export default function HomePage() {
  const featured = insights.filter((i) => i.featured).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink-950">
        <div className="absolute inset-0">
          <Photo
            image={img.boardroom}
            rounded={false}
            overlay="navy"
            priority
            className="h-full"
            sizes="100vw"
          />
        </div>
        <div className="container-page relative py-24 sm:py-32 lg:py-40">
          <div className="max-w-2xl">
            <Reveal>
              <span className="eyebrow text-teal-300">
                <span className="h-px w-6 bg-teal-400" />
                Nairobi. Serving East Africa.
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 font-serif text-4xl font-semibold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
                Stronger financial foundations for scalable growth.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-100">
                {site.name} is a partner-led audit, tax, and advisory firm. We
                give boards and founders across {site.region} numbers they can
                trust, and the financial capability to grow.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lift transition-all hover:bg-teal-700"
                >
                  Talk to us
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/60"
                >
                  Our services
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Standards + stats band */}
        <div className="relative border-t border-white/10 bg-ink-950/80 backdrop-blur-sm">
          <div className="container-page grid grid-cols-2 divide-x divide-white/10 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 80}
                className="px-3 py-8 text-center sm:py-9"
              >
                <p className="font-serif text-xl font-semibold text-white sm:text-2xl">
                  {s.value}
                </p>
                <p className="mt-2 text-xs uppercase tracking-wide text-ink-300">
                  {s.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Standards strip */}
      <section className="border-b border-ink-100 bg-white">
        <div className="container-page flex flex-col items-center gap-6 py-8 sm:flex-row sm:justify-between">
          <p className="text-xs font-semibold uppercase tracking-widest2 text-ink-400">
            Reporting to international standards
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            {standards.map((s) => (
              <span
                key={s}
                className="text-sm font-semibold text-ink-500"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Positioning / the sell */}
      <section className="container-page py-24">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal>
            <span className="eyebrow">
              <span className="h-px w-6 bg-teal-500" />
              Why Mdawida LLP
            </span>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-ink-900 sm:text-4xl">
              Rigour and growth, from one partner-led team.
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-500">
              <p>
                Too many businesses in the region experience professional
                services as a once-a-year compliance exercise, disconnected from
                the decisions that actually move the business. We close that gap.
              </p>
              <p>
                On one side, assurance and tax work to international standards,
                the kind that satisfies regulators, lenders, and boards. On the
                other, the strategic finance thinking that helps a business
                absorb capital and grow. The two belong together.
              </p>
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Senior people on every engagement",
                "IFRS, IPSAS, and tax done properly",
                "Advice you can actually act on",
                "Built for how the region grows",
              ].map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-sm font-medium text-ink-700"
                >
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                  {point}
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="link-underline mt-8 text-teal-700"
            >
              More about the firm
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <Reveal delay={120} className="relative">
            <Photo
              image={img.atWork}
              className="aspect-[4/5] w-full shadow-lift"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
            <div className="absolute -bottom-6 -left-6 hidden max-w-[15rem] rounded-2xl border border-ink-100 bg-white p-5 shadow-lift sm:block">
              <p className="font-serif text-lg font-semibold text-ink-900">
                Partner-led, every file
              </p>
              <p className="mt-1 text-sm text-ink-500">
                You work directly with the people accountable for the work.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="bg-sand-100 py-24">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="What we do"
              title="Three service lines, one standard of rigour."
              lead="From the audit that satisfies your board to the advisory that gets you funded, we work as one team across the full financial picture."
            />
            <Reveal>
              <Link href="/services" className="link-underline text-teal-700">
                All services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <Reveal
                  key={service.slug}
                  delay={i * 90}
                  as="article"
                  className="group flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <Link href={`/services/${service.slug}`} className="flex flex-1 flex-col">
                    <div className="relative h-44">
                      <Photo
                        image={img[service.image]}
                        rounded={false}
                        overlay="soft"
                        className="h-full"
                        sizes="(min-width: 1024px) 33vw, 100vw"
                      />
                      <span className="absolute left-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/95 text-ink-900 shadow-soft">
                        <Icon className="h-5 w-5" />
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-7">
                      <h3 className="text-xl font-semibold text-ink-900">
                        {service.name}
                      </h3>
                      <p className="mt-2 text-sm font-medium text-teal-700">
                        {service.short}
                      </p>
                      <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-500">
                        {service.summary}
                      </p>
                      <span className="link-underline mt-6 text-sm text-ink-900">
                        Explore {service.name.split(" ")[0]}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values / why us */}
      <section className="container-page py-24">
        <SectionHeading
          align="center"
          eyebrow="What we stand for"
          title="A firm built around judgement, not volume."
          lead="We keep our partners close to the work. That means senior attention on every file and advice you can actually act on."
        />
        <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => (
            <Reveal
              key={value.title}
              delay={i * 80}
              className="rounded-2xl border border-ink-100 bg-white p-7 shadow-soft"
            >
              <span className="font-serif text-2xl font-semibold text-teal-600">
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
      </section>

      {/* Industries */}
      <section className="bg-sand-100 py-24">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Industries"
              title="Depth where your business lives."
              lead="We bring sector fluency to the numbers, from SACCOs and agribusiness to donor-funded programmes and scaling technology ventures."
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
                <div className="relative h-28">
                  <Photo
                    image={img[industry.image]}
                    rounded={false}
                    overlay="soft"
                    className="h-full"
                    sizes="(min-width: 1024px) 25vw, 50vw"
                  />
                </div>
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
              lead="A Certified Public Accountant and strategic finance leader, Kennedy founded the firm to bring partner-led rigour and genuine growth advice to businesses across the region."
            />
            <Reveal delay={120}>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {leadership.credentials.map((c) => (
                  <li
                    key={c}
                    className="flex items-start gap-3 text-sm text-ink-100"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400" />
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={180}>
              <Link
                href="/about"
                className="link-underline mt-8 text-teal-300 hover:text-teal-200"
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

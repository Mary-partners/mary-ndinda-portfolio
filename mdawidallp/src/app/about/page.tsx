import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { values, leadership, site, countries } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Monogram } from "@/components/Monogram";
import { Photo } from "@/components/Photo";
import { img } from "@/lib/images";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Mdawida LLP is a partner led audit, tax, and advisory firm serving East Africa, founded by CPA Kennedy Mdawida.",
};

const approach = [
  {
    step: "Understand",
    body: "We start with your business, your board, and your ambitions, not a template. Good advice begins with listening.",
  },
  {
    step: "Assure",
    body: "We report on the numbers with independence and technical rigour, so every stakeholder can rely on what they read.",
  },
  {
    step: "Advise",
    body: "We turn findings into a plan, helping you strengthen controls, manage tax, and become ready for capital.",
  },
  {
    step: "Grow with you",
    body: "We stay close as you scale, adjusting the support you need at each stage of the journey.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="A premium firm with its feet in the East African market."
        lead={`${site.name} brings partner-led audit, tax, and advisory services to founders, boards, and institutions who want more than a signature on a set of accounts.`}
        image={img.professional}
      />

      {/* Story */}
      <section className="container-page py-24">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Who we are"
              title="Rigour and growth, under one roof."
            />
            <Reveal delay={80}>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-500">
                <p>
                  Too many businesses in the region experience professional
                  services as a once a year compliance exercise, disconnected
                  from the decisions that actually move the business. We built
                  {" "}
                  {site.name} to close that gap.
                </p>
                <p>
                  On one side, we deliver assurance and tax work to
                  international standards, the kind that satisfies regulators,
                  lenders, and boards. On the other, we bring the strategic
                  finance thinking that helps a business absorb capital and
                  grow. The two belong together, and our clients feel the
                  difference when they are.
                </p>
                <p>
                  We work across {site.region}, with our home in {site.city}.
                  Wherever we work, the promise is the same: senior people,
                  honest numbers, and advice you can act on.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <Photo
              image={img.nairobi}
              className="aspect-square w-full shadow-lift"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
            <p className="mt-3 text-xs text-ink-400">
              Our home: the Nairobi central business district.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-sand-100 py-24">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="What we stand for"
            title="Four commitments behind every engagement."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <Reveal
                key={value.title}
                delay={i * 80}
                className="rounded-2xl border border-ink-100 bg-white p-7 shadow-soft"
              >
                <span className="font-serif text-3xl font-semibold text-teal-600">
                  0{i + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink-900">
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

      {/* Leadership */}
      <section className="container-page py-24">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal className="mx-auto w-full max-w-sm lg:sticky lg:top-28">
            <Monogram initials={leadership.initials} className="shadow-lift" />
            <div className="mt-6 rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
              <p className="font-serif text-xl font-semibold text-ink-900">
                {leadership.name}
              </p>
              <p className="mt-1 text-sm font-medium text-teal-700">
                {leadership.role}
              </p>
              <p className="mt-1 text-sm text-ink-500">
                {leadership.headline}
              </p>
              <p className="mt-3 text-xs uppercase tracking-widest2 text-teal-700">
                {leadership.location}
              </p>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Leadership"
              title="Guided by a strategic finance leader."
            />
            <Reveal delay={80}>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-500">
                {leadership.bio.map((para) => (
                  <p key={para.slice(0, 24)}>{para}</p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={140}>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {leadership.credentials.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-sm text-ink-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-ink-950 py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="How we work"
            title="A clear path from the numbers to the next move."
            tone="light"
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {approach.map((item, i) => (
              <Reveal
                key={item.step}
                delay={i * 80}
                className="rounded-2xl border border-ink-800 bg-ink-900 p-7"
              >
                <span className="font-serif text-2xl font-semibold text-teal-300">
                  0{i + 1}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-white">
                  {item.step}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-300">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="container-page py-24">
        <div className="rounded-3xl border border-ink-100 bg-sand-100 p-10 sm:p-14">
          <SectionHeading
            align="center"
            eyebrow="Regional reach"
            title="One firm, across East Africa."
            lead="We serve businesses operating across the East African Community, bringing consistent standards to a region that trades as one market."
          />
          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
            {countries.map((c, i) => (
              <Reveal
                key={c}
                delay={i * 50}
                className="rounded-full border border-ink-200 bg-white px-5 py-2.5 text-sm font-medium text-ink-800 shadow-soft"
              >
                {c}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <div className="h-24" />
    </>
  );
}

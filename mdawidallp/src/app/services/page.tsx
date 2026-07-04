import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { services } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CoverArt } from "@/components/CoverArt";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Audit and assurance, tax and regulatory services, and advisory, delivered to international standards across East Africa.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Audit, tax, and advisory, delivered as one."
        lead="Three connected service lines that cover the full financial life of your business, from the statutory audit to the capital raise."
      />

      {/* Quick nav */}
      <section className="border-b border-ink-100 bg-sand-100">
        <div className="container-page flex flex-wrap gap-3 py-6">
          {services.map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="rounded-full border border-ink-200 bg-white px-5 py-2 text-sm font-medium text-ink-700 transition-colors hover:border-ink-400 hover:text-ink-900"
            >
              {s.name}
            </a>
          ))}
        </div>
      </section>

      <div className="container-page py-24">
        <div className="space-y-24">
          {services.map((service, i) => {
            const Icon = service.icon;
            const flip = i % 2 === 1;
            return (
              <section
                key={service.slug}
                id={service.slug}
                className="scroll-mt-28"
              >
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                  <Reveal className={flip ? "lg:order-2" : ""}>
                    <span className="eyebrow">
                      <span className="h-px w-6 bg-gold-500" />
                      0{i + 1} · Service line
                    </span>
                    <div className="mt-5 flex items-center gap-4">
                      <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-ink-950 text-gold-400">
                        <Icon className="h-6 w-6" />
                      </span>
                      <h2 className="text-3xl font-semibold text-ink-900">
                        {service.name}
                      </h2>
                    </div>
                    <p className="mt-5 text-lg leading-relaxed text-ink-500">
                      {service.summary}
                    </p>
                    <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                      {service.offerings.map((o) => (
                        <li
                          key={o}
                          className="flex items-start gap-3 text-sm text-ink-700"
                        >
                          <Check className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                          {o}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contact"
                      className="mt-9 inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-sand-50 shadow-soft transition-all hover:bg-ink-800 hover:shadow-lift"
                    >
                      Discuss {service.name.split(" ")[0].toLowerCase()} needs
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Reveal>

                  <Reveal
                    delay={120}
                    className={flip ? "lg:order-1" : ""}
                  >
                    <CoverArt
                      variant={i + 1}
                      label={`${service.name} artwork`}
                      className="aspect-[4/3] w-full shadow-lift"
                    />
                  </Reveal>
                </div>
              </section>
            );
          })}
        </div>
      </div>

      <CTASection
        title="Not sure which service you need?"
        body="Tell us where your business is, and we will point you to the right starting engagement. There is no charge for the first conversation."
      />
      <div className="h-24" />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Check } from "lucide-react";
import { services } from "@/lib/site";
import { img } from "@/lib/images";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/Photo";
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
        image={img.meeting}
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
                      <span className="h-px w-6 bg-teal-500" />
                      0{i + 1} · Service line
                    </span>
                    <div className="mt-5 flex items-center gap-4">
                      <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-ink-950 text-teal-300">
                        <Icon className="h-6 w-6" />
                      </span>
                      <h2 className="text-3xl font-semibold text-ink-900">
                        {service.name}
                      </h2>
                    </div>
                    <p className="mt-5 text-lg leading-relaxed text-ink-500">
                      {service.summary}
                    </p>

                    <div className="mt-8 grid gap-6 sm:grid-cols-3">
                      {service.capabilities.map((cap) => (
                        <div key={cap.title}>
                          <h3 className="text-sm font-semibold text-ink-900">
                            {cap.title}
                          </h3>
                          <ul className="mt-3 space-y-2">
                            {cap.items.map((o) => (
                              <li
                                key={o}
                                className="flex items-start gap-2 text-xs leading-relaxed text-ink-600"
                              >
                                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-600" />
                                {o}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <Link
                      href={`/services/${service.slug}`}
                      className="mt-9 inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-white shadow-soft transition-all hover:bg-ink-800 hover:shadow-lift"
                    >
                      Explore {service.name.split(" ")[0]}
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Reveal>

                  <Reveal delay={120} className={flip ? "lg:order-1" : ""}>
                    <Link href={`/services/${service.slug}`} className="group block">
                      <Photo
                        image={img[service.image]}
                        overlay="soft"
                        className="aspect-[4/3] w-full shadow-lift transition-transform duration-500 group-hover:scale-[1.01]"
                        sizes="(min-width: 1024px) 45vw, 100vw"
                      />
                    </Link>
                  </Reveal>
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* How the three connect */}
      <section className="bg-ink-950 py-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow justify-center text-teal-300">
              <span className="h-px w-6 bg-teal-400" />
              One integrated team
            </span>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
              The three lines work better together.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-100">
              The audit surfaces where control is thin. Tax keeps you compliant
              and efficient. Advisory turns it all into a plan for growth. You
              get one team that sees the whole picture, not three that do not
              talk to each other.
            </p>
          </div>
          <div className="mx-auto mt-10 flex max-w-md items-center justify-center gap-3 text-sm font-semibold text-teal-300">
            {services.map((s, i) => (
              <span key={s.slug} className="flex items-center gap-3">
                {s.name.split(" ")[0]}
                {i < services.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-ink-400" />
                )}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="py-24">
        <CTASection
          title="Not sure which service you need?"
          body="Tell us where your business is, and we will point you to the right starting engagement. There is no charge for the first conversation."
        />
      </div>
    </>
  );
}

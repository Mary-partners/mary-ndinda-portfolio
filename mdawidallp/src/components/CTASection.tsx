import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";

export function CTASection({
  title = "Let us build stronger financial foundations together.",
  body = "Every engagement starts with a short, no obligation conversation about where your business is and where it is going.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="container-page">
      <Reveal className="relative overflow-hidden rounded-3xl bg-ink-950 px-8 py-16 sm:px-16 sm:py-20">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-teal-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-10 h-64 w-64 rounded-full bg-teal-400/10 blur-3xl" />
        <div className="relative max-w-2xl">
          <span className="eyebrow text-teal-300">
            <span className="h-px w-6 bg-teal-400" />
            Start a conversation
          </span>
          <h2 className="mt-5 text-3xl font-semibold leading-tight text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-200">{body}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-7 py-3.5 text-sm font-semibold text-white shadow-soft transition-all hover:bg-teal-700 hover:shadow-lift"
            >
              Talk to us
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-ink-700 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-ink-500"
            >
              Explore services
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

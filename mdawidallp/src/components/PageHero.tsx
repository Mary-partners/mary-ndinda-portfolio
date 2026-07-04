import { Reveal } from "./Reveal";

export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-ink-100 bg-ink-950">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-teal-600/30 blur-3xl" />
        <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-gold-500/20 blur-3xl" />
      </div>
      <div className="container-page relative py-20 sm:py-24">
        <Reveal className="max-w-3xl">
          <span className="eyebrow text-gold-400">
            <span className="h-px w-6 bg-gold-500" />
            {eyebrow}
          </span>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.08] text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-200 sm:text-xl">
            {lead}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

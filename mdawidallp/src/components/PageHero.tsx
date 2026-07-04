import { Reveal } from "./Reveal";
import { Photo } from "./Photo";
import type { ImageAsset } from "@/lib/images";

export function PageHero({
  eyebrow,
  title,
  lead,
  image,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  image?: ImageAsset;
}) {
  return (
    <section className="relative overflow-hidden border-b border-ink-100 bg-ink-950">
      {image ? (
        <div className="absolute inset-0">
          <Photo
            image={image}
            rounded={false}
            overlay="navy"
            priority
            className="h-full"
            imgClassName="object-cover"
            sizes="100vw"
          />
        </div>
      ) : (
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-teal-600/30 blur-3xl" />
          <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl" />
        </div>
      )}
      <div className="container-page relative py-20 sm:py-24">
        <Reveal className="max-w-3xl">
          <span className="eyebrow text-teal-300">
            <span className="h-px w-6 bg-teal-400" />
            {eyebrow}
          </span>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.08] text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-100 sm:text-xl">
            {lead}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

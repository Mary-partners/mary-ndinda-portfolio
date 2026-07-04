import { StickyNote, ArrowRight, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Contribution } from "@/lib/types";
import { cn } from "@/lib/utils";

const FLOAT_COLORS = [
  "bg-note-yellow border-noteBorder-yellow",
  "bg-note-blue border-noteBorder-blue",
  "bg-note-green border-noteBorder-green",
  "bg-note-pink border-noteBorder-pink",
];

export function HeroSection({ preview }: { preview: Contribution[] }) {
  return (
    <section className="wall-backdrop relative overflow-hidden border-b border-navy/10 bg-gradient-to-b from-cream-50 to-cream">
      <div className="container-lab grid gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div className="animate-fade-up">
          <Badge tone="gold" className="mb-5">
            <Sparkles className="h-3.5 w-3.5" />
            DBA Research Project · Topic Approved · Framework in Development
          </Badge>
          <h1 className="font-serif text-4xl leading-[1.1] text-navy-900 sm:text-5xl">
            Is money really the biggest constraint to African SME growth?
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-700">
            This living research lab explores{" "}
            <strong className="font-semibold text-navy-900">
              management capital
            </strong>
            : the financial, strategic, operational, governance, and leadership
            capability that helps SMEs absorb capital and turn it into
            sustainable growth.
          </p>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-navy-600">
            For decades, the African SME conversation has focused on access to
            finance. This project asks a sharper question: what if many SMEs do
            not only need capital, but the management capability to use capital
            well?
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contribute" variant="primary" size="lg">
              <StickyNote className="h-4 w-4" /> Leave a Post-It
            </ButtonLink>
            <ButtonLink href="/about" variant="outline" size="lg">
              Explore the Research
            </ButtonLink>
            <ButtonLink href="/framework" variant="ghost" size="lg">
              View the Management Capital Index
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>

        {/* Floating preview of the research wall */}
        <div className="relative min-h-[360px]">
          <div className="grid gap-4 sm:grid-cols-2">
            {preview.slice(0, 4).map((note, i) => (
              <div
                key={note.id}
                className={cn(
                  "rounded-md border p-4 shadow-note",
                  FLOAT_COLORS[i % FLOAT_COLORS.length],
                  i % 2 === 0 ? "-rotate-1" : "rotate-1",
                  i === 1 && "sm:mt-8",
                  i === 3 && "sm:mt-8",
                  "animate-float"
                )}
                style={{ animationDelay: `${i * 0.8}s` }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-wide text-navy-500">
                  {note.prompt.length > 42
                    ? note.prompt.slice(0, 42) + "…"
                    : note.prompt}
                </p>
                <p className="mt-2 font-serif text-sm leading-snug text-navy-900">
                  {note.content.length > 120
                    ? note.content.slice(0, 120) + "…"
                    : note.content}
                </p>
                <p className="mt-3 text-[11px] font-medium text-navy-600">
                  {note.role} · {note.country}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

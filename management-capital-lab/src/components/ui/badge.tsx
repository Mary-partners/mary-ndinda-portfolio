import * as React from "react";
import { cn } from "@/lib/utils";

type Tone = "navy" | "forest" | "gold" | "neutral" | "amber" | "green" | "red";

const tones: Record<Tone, string> = {
  navy: "bg-navy/10 text-navy-800 ring-navy/15",
  forest: "bg-forest/10 text-forest-700 ring-forest/15",
  gold: "bg-gold/15 text-gold-700 ring-gold/20",
  neutral: "bg-navy-50 text-navy-600 ring-navy/10",
  amber: "bg-amber-100 text-amber-800 ring-amber-200",
  green: "bg-emerald-100 text-emerald-800 ring-emerald-200",
  red: "bg-red-100 text-red-700 ring-red-200",
};

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

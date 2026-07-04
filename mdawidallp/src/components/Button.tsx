import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "gold" | "accent" | "outline" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:opacity-60";

const sizes = "px-6 py-3";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink-900 text-white hover:bg-ink-800 shadow-soft hover:shadow-lift",
  // "gold" kept as an alias for the emerald accent so existing callers work.
  gold: "bg-teal-600 text-white hover:bg-teal-700 shadow-soft hover:shadow-lift",
  accent: "bg-teal-600 text-white hover:bg-teal-700 shadow-soft hover:shadow-lift",
  outline:
    "border border-ink-200 text-ink-800 hover:border-ink-400 hover:bg-white",
  ghost: "text-ink-700 hover:text-teal-600",
};

export function Button({
  href,
  variant = "primary",
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={cn(base, sizes, variants[variant], className)}>
      {children}
    </Link>
  );
}

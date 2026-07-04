import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "gold" | "outline" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 disabled:opacity-60";

const sizes = "px-6 py-3";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink-900 text-sand-50 hover:bg-ink-800 shadow-soft hover:shadow-lift",
  gold: "bg-gold-500 text-ink-900 hover:bg-gold-400 shadow-soft hover:shadow-lift",
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

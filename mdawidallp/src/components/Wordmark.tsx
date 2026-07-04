import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The firm wordmark: a quiet, lowercase logotype. "mdawida" carries the
 * name; "llp" is set in gold as a restrained partnership mark.
 */
export function Wordmark({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <Link
      href="/"
      aria-label="Mdawida LLP, home"
      className={cn(
        "group inline-flex items-baseline font-serif text-2xl font-semibold tracking-tight",
        tone === "light" ? "text-white" : "text-ink-900",
        className,
      )}
    >
      <span>mdawida</span>
      <span className="text-gold-500 transition-colors group-hover:text-gold-400">
        llp
      </span>
    </Link>
  );
}

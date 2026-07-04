import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The firm wordmark. The full name is always shown in full and legibly,
 * never truncated to a fragment. A small emerald mark carries the initial,
 * with the complete "mdawidallp" logotype set beside it.
 */
export function Wordmark({
  className,
  tone = "dark",
  showMark = true,
}: {
  className?: string;
  tone?: "dark" | "light";
  showMark?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="mdawidallp, home"
      className={cn(
        "group inline-flex items-center gap-2.5",
        className,
      )}
    >
      {showMark && (
        <span
          aria-hidden
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-600 font-serif text-lg font-semibold text-white shadow-sm transition-colors group-hover:bg-teal-700"
        >
          M
        </span>
      )}
      <span
        className={cn(
          "font-serif text-[1.6rem] font-semibold leading-none tracking-tight",
          tone === "light" ? "text-white" : "text-ink-900",
        )}
      >
        mdawida
        <span className={tone === "light" ? "text-ink-200" : "text-ink-400"}>
          llp
        </span>
      </span>
    </Link>
  );
}

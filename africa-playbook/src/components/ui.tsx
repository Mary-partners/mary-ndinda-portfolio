import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function Breadcrumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="no-print pt-6 text-sm text-ink-3">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 ? <span aria-hidden="true" className="text-rule">/</span> : null}
            {it.href ? (
              <Link href={it.href} className="hover:text-ink hover:underline">
                {it.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink-2">
                {it.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHeader({ eyebrow, title, lede, children }: { eyebrow?: string; title: string; lede?: string; children?: ReactNode }) {
  return (
    <div className="border-b border-rule pb-10 pt-6">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1 className="mt-3 max-w-4xl text-4xl leading-[1.08] text-ink sm:text-5xl">{title}</h1>
      {lede ? <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-2">{lede}</p> : null}
      {children}
    </div>
  );
}

export function SectionHeading({ id, eyebrow, title, children }: { id?: string; eyebrow?: string; title: string; children?: ReactNode }) {
  return (
    <div className="mb-6">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 id={id} className="mt-2 text-3xl leading-tight text-ink sm:text-[2.1rem]">
        {title}
      </h2>
      {children}
    </div>
  );
}

export function ButtonLink({ href, children, variant = "primary" }: { href: string; children: ReactNode; variant?: "primary" | "secondary" }) {
  const cls =
    variant === "primary"
      ? "bg-ink text-paper hover:bg-ink-2"
      : "border border-ink/25 text-ink hover:border-ink bg-transparent";
  return (
    <Link href={href} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-[0.95rem] font-medium transition-colors ${cls}`}>
      {children}
      <span aria-hidden="true">→</span>
    </Link>
  );
}

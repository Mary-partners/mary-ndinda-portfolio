import Link from "next/link";
import { MobileMenu } from "./mobile-menu";
import { NavLinks } from "./nav-links";

export const NAV = [
  { href: "/", label: "Overview" },
  { href: "/playbook", label: "Playbook" },
  { href: "/first-year", label: "First year" },
  { href: "/decision-lab", label: "Decision lab" },
  { href: "/evidence", label: "Evidence" },
  { href: "/sources", label: "Sources" },
];

export function SiteHeader() {
  return (
    <header role="banner" className="sticky top-0 z-40 border-b border-rule bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/85">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-baseline gap-3 rounded-sm">
          <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink font-serif text-[0.78rem] tracking-tight text-paper">
            MN
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-lg text-ink">Mary Ndinda</span>
            <span className="hidden text-[0.7rem] uppercase tracking-[0.14em] text-ink-3 sm:block">Africa Investment &amp; Leadership Playbook</span>
          </span>
        </Link>
        <nav aria-label="Primary" className="hidden lg:block">
          <NavLinks items={NAV} />
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/brief"
            className="no-print hidden rounded-full border border-ink/20 px-3.5 py-1.5 text-sm text-ink hover:border-ink sm:inline-block"
          >
            Executive brief
          </Link>
          <MobileMenu items={[...NAV, { href: "/brief", label: "Executive brief (print)" }]} />
        </div>
      </div>
    </header>
  );
}

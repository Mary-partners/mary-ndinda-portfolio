import Link from "next/link";
import { StickyNote, Mail } from "lucide-react";
import { SITE } from "@/lib/site";

const FOOTER_LINKS = [
  { href: "/about", label: "About the Research" },
  { href: "/framework", label: "Management Capital Index" },
  { href: "/journey", label: "Research Journey" },
  { href: "/field-notes", label: "Field Notes" },
  { href: "/collaborate", label: "Collaborate" },
  { href: "/contribute", label: "Leave a Post-It" },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-navy/10 bg-navy-900 text-cream/90">
      <div className="container-lab grid gap-10 py-14 md:grid-cols-[1.4fr_1fr]">
        <div className="max-w-md">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-cream text-navy-900">
              <StickyNote className="h-5 w-5" strokeWidth={2} />
            </span>
            <div className="leading-tight">
              <span className="block font-serif text-lg font-semibold text-cream">
                The Management Capital Lab
              </span>
              <span className="block text-sm text-cream/60">By Mary Ndinda</span>
            </div>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-cream/70">
            This is a living DBA research platform exploring African SME growth,
            investment readiness, and management capital.
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-cream/90 transition-colors hover:text-gold-300"
          >
            <Mail className="h-4 w-4" />
            {SITE.email}
          </a>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-300">
            Explore
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {FOOTER_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-cream/75 transition-colors hover:text-cream"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-cream/10">
        <div className="container-lab flex flex-col items-center justify-between gap-2 py-5 text-xs text-cream/55 sm:flex-row">
          <p>
            © {new Date().getFullYear()} The Management Capital Lab · Mary Ndinda
          </p>
          <p>Beyond access to finance.</p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, StickyNote, Gauge } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonLink, buttonClasses } from "@/components/ui/button";
import { SITE } from "@/lib/site";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "The Research" },
  { href: "/framework", label: "Index" },
  { href: "/journey", label: "Journey" },
  { href: "/findings", label: "Findings" },
  { href: "/field-notes", label: "Field Notes" },
  { href: "/library", label: "Library" },
  { href: "/collaborate", label: "Collaborate" },
  { href: "/contribute", label: "Contribute" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl 2xl:max-w-[88rem] items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-navy text-cream">
            <StickyNote className="h-5 w-5" strokeWidth={2} />
          </span>
          <span className="leading-tight">
            <span className="block whitespace-nowrap font-serif text-[15px] font-semibold text-navy-900">
              The Management Capital Lab
            </span>
            <span className="block text-[11px] tracking-wide text-navy-500">
              By Mary Ndinda
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "bg-navy/10 text-navy-900"
                  : "text-navy-600 hover:bg-navy/5 hover:text-navy-900"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <a
            href={SITE.platformUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses({ variant: "gold", size: "sm", className: "whitespace-nowrap" })}
          >
            <Gauge className="h-4 w-4" /> Capability Platform
          </a>
          {/* "Contribute" in the nav covers the same page; show this CTA only where it fits. */}
          <ButtonLink href="/contribute" variant="primary" size="sm" className="hidden whitespace-nowrap 2xl:inline-flex">
            Leave a Post-It
          </ButtonLink>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-lg text-navy-800 hover:bg-navy/5 xl:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-navy/10 bg-cream xl:hidden">
          <nav className="container-lab flex flex-col py-3" aria-label="Mobile">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium",
                  isActive(item.href)
                    ? "bg-navy/10 text-navy-900"
                    : "text-navy-700 hover:bg-navy/5"
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 px-1 pb-2">
              <a
                href={SITE.platformUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses({ variant: "gold", size: "md" })}
              >
                <Gauge className="h-4 w-4" /> Capability Platform
              </a>
              <ButtonLink href="/contribute" variant="primary" size="md">
                Leave a Post-It
              </ButtonLink>
              <ButtonLink href="/collaborate" variant="outline" size="md">
                Collaborate
              </ButtonLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

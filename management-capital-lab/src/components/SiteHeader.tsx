"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, StickyNote } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "The Research" },
  { href: "/framework", label: "Index" },
  { href: "/journey", label: "Journey" },
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
      <div className="container-lab flex h-16 items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-navy text-cream">
            <StickyNote className="h-5 w-5" strokeWidth={2} />
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-[15px] font-semibold text-navy-900">
              The Management Capital Lab
            </span>
            <span className="block text-[11px] tracking-wide text-navy-500">
              By Mary Ndinda
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "bg-navy/10 text-navy-900"
                  : "text-navy-600 hover:bg-navy/5 hover:text-navy-900"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ButtonLink href="/collaborate" variant="outline" size="sm">
            Collaborate
          </ButtonLink>
          <ButtonLink href="/contribute" variant="primary" size="sm">
            Leave a Post-It
          </ButtonLink>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-lg text-navy-800 hover:bg-navy/5 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-navy/10 bg-cream lg:hidden">
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

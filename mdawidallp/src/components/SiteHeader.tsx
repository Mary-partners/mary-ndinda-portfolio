"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { primaryNav } from "@/lib/site";
import { Wordmark } from "./Wordmark";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-ink-100 bg-sand-50/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-page flex h-20 items-center justify-between">
        <Wordmark tone={scrolled ? "dark" : "light"} />

        <nav className="hidden items-center gap-9 lg:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative text-sm font-medium tracking-tight transition-colors",
                scrolled
                  ? isActive(item.href)
                    ? "text-ink-900"
                    : "text-ink-500 hover:text-ink-900"
                  : isActive(item.href)
                    ? "text-white"
                    : "text-ink-200 hover:text-white",
              )}
            >
              {item.label}
              {isActive(item.href) && (
                <span className="absolute -bottom-1.5 left-0 h-px w-full bg-gold-500" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/contact"
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold shadow-soft transition-all hover:shadow-lift",
              scrolled
                ? "bg-ink-900 text-sand-50 hover:bg-ink-800"
                : "bg-gold-500 text-ink-900 hover:bg-gold-400",
            )}
          >
            Talk to us
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors lg:hidden",
            open || scrolled
              ? "border-ink-200 text-ink-900"
              : "border-white/30 text-white",
          )}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="fixed inset-x-0 top-20 bottom-0 z-40 bg-sand-50 lg:hidden">
          <nav className="container-page flex flex-col gap-1 py-6">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between border-b border-ink-100 py-4 text-xl font-serif font-medium",
                  isActive(item.href) ? "text-ink-900" : "text-ink-600",
                )}
              >
                {item.label}
                <ArrowUpRight className="h-5 w-5 text-gold-500" />
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-4 text-base font-semibold text-sand-50"
            >
              Talk to us
              <ArrowUpRight className="h-5 w-5" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

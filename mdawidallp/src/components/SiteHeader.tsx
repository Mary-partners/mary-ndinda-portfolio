"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, ChevronDown, Plus } from "lucide-react";
import { primaryNav, services } from "@/lib/site";
import { Wordmark } from "./Wordmark";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
    setMobileServices(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setServicesOpen(false), 120);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-white transition-shadow duration-300",
        scrolled ? "border-ink-100 shadow-soft" : "border-ink-100/70",
      )}
    >
      <div className="container-page flex h-20 items-center justify-between">
        <Wordmark />

        <nav className="hidden items-center gap-8 lg:flex">
          {primaryNav.map((item) =>
            item.href === "/services" ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={openMenu}
                onMouseLeave={scheduleClose}
              >
                <Link
                  href="/services"
                  aria-haspopup="true"
                  aria-expanded={servicesOpen}
                  onFocus={openMenu}
                  className={cn(
                    "inline-flex items-center gap-1 text-sm font-medium tracking-tight transition-colors",
                    isActive(item.href)
                      ? "text-ink-900"
                      : "text-ink-500 hover:text-ink-900",
                  )}
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform",
                      servicesOpen && "rotate-180",
                    )}
                  />
                </Link>

                {servicesOpen && (
                  <div
                    className="absolute left-1/2 top-full z-50 w-[38rem] -translate-x-1/2 pt-4"
                    onMouseEnter={openMenu}
                    onMouseLeave={scheduleClose}
                  >
                    <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white p-2 shadow-lift">
                      <div className="grid gap-1">
                        {services.map((s) => {
                          const Icon = s.icon;
                          return (
                            <Link
                              key={s.slug}
                              href={`/services/${s.slug}`}
                              className="group/item flex items-start gap-4 rounded-xl p-4 transition-colors hover:bg-sand-100"
                            >
                              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-ink-950 text-teal-300">
                                <Icon className="h-5 w-5" />
                              </span>
                              <span>
                                <span className="flex items-center gap-1 font-semibold text-ink-900">
                                  {s.name}
                                  <ArrowUpRight className="h-4 w-4 text-teal-600 opacity-0 transition-opacity group-hover/item:opacity-100" />
                                </span>
                                <span className="mt-0.5 block text-sm text-ink-500">
                                  {s.short}
                                </span>
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                      <Link
                        href="/services"
                        className="mt-1 flex items-center justify-between rounded-xl bg-sand-100 px-4 py-3 text-sm font-semibold text-ink-900 transition-colors hover:bg-sand-200"
                      >
                        View all services and how they connect
                        <ArrowUpRight className="h-4 w-4 text-teal-600" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-sm font-medium tracking-tight transition-colors",
                  isActive(item.href)
                    ? "text-ink-900"
                    : "text-ink-500 hover:text-ink-900",
                )}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute -bottom-1.5 left-0 h-px w-full bg-teal-500" />
                )}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-all hover:bg-teal-700 hover:shadow-lift"
          >
            Talk to us
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-200 text-ink-900 transition-colors hover:bg-sand-100 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="fixed inset-x-0 top-20 bottom-0 z-40 overflow-y-auto bg-white lg:hidden">
          <nav className="container-page flex flex-col gap-1 py-6">
            {primaryNav.map((item) =>
              item.href === "/services" ? (
                <div key={item.href} className="border-b border-ink-100">
                  <button
                    type="button"
                    onClick={() => setMobileServices((v) => !v)}
                    className="flex w-full items-center justify-between py-4 text-left font-serif text-xl font-medium text-ink-800"
                  >
                    Services
                    <Plus
                      className={cn(
                        "h-5 w-5 text-teal-600 transition-transform",
                        mobileServices && "rotate-45",
                      )}
                    />
                  </button>
                  {mobileServices && (
                    <div className="pb-4">
                      <Link
                        href="/services"
                        className="block rounded-lg px-3 py-2 text-sm font-semibold text-ink-900"
                      >
                        All services
                      </Link>
                      {services.map((s) => (
                        <Link
                          key={s.slug}
                          href={`/services/${s.slug}`}
                          className="block rounded-lg px-3 py-2 text-sm text-ink-600"
                        >
                          {s.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between border-b border-ink-100 py-4 font-serif text-xl font-medium",
                    isActive(item.href) ? "text-ink-900" : "text-ink-600",
                  )}
                >
                  {item.label}
                  <ArrowUpRight className="h-5 w-5 text-teal-600" />
                </Link>
              ),
            )}
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-teal-600 px-6 py-4 text-base font-semibold text-white"
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

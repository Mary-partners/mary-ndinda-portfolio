"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { NavLinks } from "./nav-links";

export function MobileMenu({ items }: { items: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);

  // Close when the route changes.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="site-mobile-menu lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 items-center gap-2 rounded-full border border-ink/20 px-3.5 text-sm text-ink"
      >
        <span aria-hidden="true" className="relative block h-3 w-4">
          <span className={"absolute left-0 top-0 h-0.5 w-4 bg-ink transition " + (open ? "translate-y-[5px] rotate-45" : "")} />
          <span className={"absolute left-0 top-[5px] h-0.5 w-4 bg-ink transition " + (open ? "opacity-0" : "")} />
          <span className={"absolute left-0 top-[10px] h-0.5 w-4 bg-ink transition " + (open ? "-translate-y-[5px] -rotate-45" : "")} />
        </span>
        {open ? "Close" : "Menu"}
      </button>
      <div
        id="mobile-nav"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 top-16 z-40 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-rule bg-paper px-4 pb-6 pt-2 shadow-lg"
      >
        <nav aria-label="Mobile">
          <NavLinks items={items} vertical onNavigate={() => setOpen(false)} />
        </nav>
      </div>
    </div>
  );
}

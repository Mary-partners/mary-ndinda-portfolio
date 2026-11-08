"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLinks({ items, vertical = false, onNavigate }: { items: { href: string; label: string }[]; vertical?: boolean; onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <ul className={vertical ? "flex flex-col gap-1" : "flex items-center gap-1"}>
      {items.map((item) => {
        const active = item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={
                (vertical ? "block px-3 py-3 text-lg " : "px-3 py-2 text-[0.92rem] ") +
                "rounded-md transition-colors " +
                (active ? "font-semibold text-ink underline decoration-gold decoration-2 underline-offset-[6px]" : "text-ink-2 hover:text-ink hover:bg-paper-2")
              }
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

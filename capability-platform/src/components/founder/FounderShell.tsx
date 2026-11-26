"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BASE_PATH } from "@/lib/constants";
import { Gauge, LayoutDashboard, ClipboardCheck, BarChart3, Download, LogOut, Menu, X, Building2 } from "lucide-react";

export function FounderShell({ userName, businessName, companyId, assessed, signOutAction, children }: {
  userName: string;
  businessName: string;
  companyId: string | null;
  assessed: boolean;
  signOutAction: () => void;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const nav = [
    { href: "/me", label: "Dashboard", icon: LayoutDashboard },
    { href: "/me/diagnostic", label: assessed ? "Retake diagnostic" : "Take diagnostic", icon: ClipboardCheck },
    { href: "/me/results", label: "My results", icon: BarChart3 },
  ];
  const active = (href: string) => (href === "/me" ? pathname === "/me" : pathname.startsWith(href));

  const NavLinks = () => (
    <nav className="space-y-1">
      {nav.map((n) => (
        <Link
          key={n.href}
          href={n.href}
          onClick={() => setOpen(false)}
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
            active(n.href) ? "bg-gold text-navy-900" : "text-white/75 hover:bg-white/10 hover:text-white"
          }`}
        >
          <n.icon className="h-[18px] w-[18px]" /> {n.label}
        </Link>
      ))}
      {assessed && companyId && (
        <a
          href={`${BASE_PATH}/api/report/company/${companyId}`}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white"
        >
          <Download className="h-[18px] w-[18px]" /> Download report
        </a>
      )}
    </nav>
  );

  const SidebarInner = () => (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 px-4 pt-5">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold text-navy-900"><Gauge className="h-5 w-5" /></span>
        <div className="leading-tight">
          <div className="text-sm font-semibold text-white">Management Capital Lab</div>
          <div className="text-[11px] text-white/50">Founder workspace</div>
        </div>
      </div>
      <div className="mx-4 mt-5 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-white/10 text-white/80"><Building2 className="h-4 w-4" /></span>
          <div className="min-w-0">
            <div className="truncate text-xs font-semibold text-white">{businessName}</div>
            <div className="truncate text-[11px] text-white/50">{userName}</div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex-1 px-3">
        <NavLinks />
      </div>
      <form action={signOutAction} className="border-t border-white/10 p-3">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white">
          <LogOut className="h-[18px] w-[18px]" /> Sign out
        </button>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface-muted">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 bg-navy-800 lg:block">
        <SidebarInner />
      </aside>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between bg-navy-800 px-4 py-3 lg:hidden" style={{ paddingTop: "max(12px, env(safe-area-inset-top,0px))" }}>
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gold text-navy-900"><Gauge className="h-[18px] w-[18px]" /></span>
          <span className="text-sm font-semibold text-white">Management Capital Lab</span>
        </div>
        <button onClick={() => setOpen(true)} className="grid h-9 w-9 place-items-center rounded-lg text-white/80 hover:bg-white/10" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-navy-900/60" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-64 bg-navy-800 shadow-xl">
            <button onClick={() => setOpen(false)} className="absolute right-3 top-4 grid h-8 w-8 place-items-center rounded-lg text-white/70 hover:bg-white/10" aria-label="Close menu">
              <X className="h-5 w-5" />
            </button>
            <SidebarInner />
          </aside>
        </div>
      )}

      {/* Main content */}
      <main className="lg:pl-60">{children}</main>
    </div>
  );
}

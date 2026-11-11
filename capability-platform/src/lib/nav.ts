import {
  LayoutDashboard, Building2, Briefcase, ClipboardCheck, Gauge, ListChecks,
  KanbanSquare, CalendarClock, ShieldCheck, LineChart, PieChart, FileText,
  BookOpen, Settings,
} from "lucide-react";

export const NAV = [
  { href: "/overview", label: "Overview", icon: LayoutDashboard },
  { href: "/organisations", label: "Organisations & Programmes", icon: Building2 },
  { href: "/portfolio", label: "Enterprise Portfolio", icon: Briefcase },
  { href: "/diagnostics", label: "Management Diagnostics", icon: ClipboardCheck },
  { href: "/scores", label: "Capability Scores", icon: Gauge },
  { href: "/plans", label: "Improvement Plans", icon: ListChecks },
  { href: "/implementation", label: "Implementation Tracker", icon: KanbanSquare },
  { href: "/sessions", label: "Advisory Sessions", icon: CalendarClock },
  { href: "/evidence", label: "Evidence & Verification", icon: ShieldCheck },
  { href: "/performance", label: "Business Performance", icon: LineChart },
  { href: "/intelligence", label: "Portfolio Intelligence", icon: PieChart },
  { href: "/reports", label: "Reports & Exports", icon: FileText },
  { href: "/research", label: "Research & Methodology", icon: BookOpen },
  { href: "/settings", label: "Settings", icon: Settings },
] as const;

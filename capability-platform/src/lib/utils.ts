import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fmtDate(d: Date | string | null | undefined): string {
  if (!d) return "—";
  try {
    return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return "—";
  }
}

export function fmtNumber(n: number | null | undefined, opts: Intl.NumberFormatOptions = {}): string {
  if (n === null || n === undefined || Number.isNaN(n)) return "—";
  return new Intl.NumberFormat("en-GB", opts).format(n);
}

export function fmtScore(n: number | null | undefined): string {
  if (n === null || n === undefined || Number.isNaN(n)) return "—";
  return n.toFixed(2);
}

// Percentage change with explicit guards for missing / zero / negative baselines.
export function pctChange(
  baseline: number | null | undefined,
  current: number | null | undefined
): { value: number | null; note?: string } {
  if (baseline === null || baseline === undefined || current === null || current === undefined) {
    return { value: null, note: "missing data" };
  }
  if (baseline === 0) return { value: null, note: "baseline is zero" };
  if (baseline < 0) return { value: null, note: "baseline is negative" };
  return { value: ((current - baseline) / Math.abs(baseline)) * 100 };
}

export function maturityBand(score: number | null | undefined): { label: string; tone: string } {
  if (score === null || score === undefined) return { label: "Not assessed", tone: "neutral" };
  if (score < 1) return { label: "Absent", tone: "bad" };
  if (score < 2) return { label: "Informal", tone: "bad" };
  if (score < 2.75) return { label: "Introduced", tone: "warn" };
  if (score < 3.5) return { label: "Consistent", tone: "ok" };
  return { label: "Embedded", tone: "ok" };
}

export function toCsv(rows: Record<string, unknown>[], headers: string[]): string {
  const esc = (v: unknown) => {
    const s = v === null || v === undefined ? "" : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [headers.join(","), ...rows.map((r) => headers.map((h) => esc(r[h])).join(","))].join("\n");
}

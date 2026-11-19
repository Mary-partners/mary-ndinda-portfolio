import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { READINESS_BANDS } from "./constants";

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

// Convert a 0-4 score into the Management Capital Index (0-100).
export function indexScore(score: number | null | undefined): number | null {
  if (score === null || score === undefined || Number.isNaN(score)) return null;
  return Math.round((score / 4) * 100);
}

// Format the Index for display (e.g. "68").
export function fmtIndex(score: number | null | undefined): string {
  const i = indexScore(score);
  return i === null ? "—" : String(i);
}

// Management Capital Index readiness band for a 0-4 score.
export function maturityBand(score: number | null | undefined): { label: string; tone: string } {
  const idx = indexScore(score);
  if (idx === null) return { label: "Not assessed", tone: "neutral" };
  const b = READINESS_BANDS.find((x) => idx >= x.min && idx <= x.max) ?? READINESS_BANDS[READINESS_BANDS.length - 1];
  return { label: b.label, tone: b.tone };
}

export function toCsv(rows: Record<string, unknown>[], headers: string[]): string {
  const esc = (v: unknown) => {
    const s = v === null || v === undefined ? "" : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [headers.join(","), ...rows.map((r) => headers.map((h) => esc(r[h])).join(","))].join("\n");
}

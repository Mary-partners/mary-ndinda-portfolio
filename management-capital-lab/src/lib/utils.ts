import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

const THEME_KEYWORDS: Record<string, string[]> = {
  "Cash flow": ["cash flow", "cash-flow", "cashflow", "liquidity", "runway"],
  Governance: ["governance", "board", "accountab", "control", "compliance"],
  Funding: ["fund", "capital", "invest", "loan", "debt", "financ"],
  Records: ["record", "bookkeep", "accounts", "reporting", "data"],
  Strategy: ["strateg", "market", "positioning", "business model", "unit econ"],
  Operations: ["operation", "system", "inventory", "process", "sop"],
  "Founder capability": ["founder", "leadership", "discipline", "decision", "literacy"],
  "Capital absorption": ["absorb", "deploy", "use of funds", "productive"],
};

export function inferThemes(text: string): string[] {
  const lower = text.toLowerCase();
  const themes: string[] = [];
  for (const [theme, keywords] of Object.entries(THEME_KEYWORDS)) {
    if (keywords.some((k) => lower.includes(k))) themes.push(theme);
  }
  return themes;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function toCsv(rows: Record<string, unknown>[], headers: string[]): string {
  const escape = (value: unknown) => {
    const s = value === null || value === undefined ? "" : String(value);
    if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };
  const head = headers.join(",");
  const body = rows
    .map((row) => headers.map((h) => escape(row[h])).join(","))
    .join("\n");
  return `${head}\n${body}`;
}

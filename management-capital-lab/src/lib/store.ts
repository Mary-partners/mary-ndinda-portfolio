import { promises as fs } from "fs";
import path from "path";
import type { Contribution, CollaborationLead } from "./types";
import { seedContributions } from "./data/seed-contributions";
import * as notion from "./notion";

// Lightweight JSON file store for the prototype. In a production build this
// would be swapped for a database, but a flat file keeps the prototype
// dependency-free and easy to inspect.

// On a serverless host (e.g. Vercel) the project filesystem is read-only, so
// writes must target the OS temp dir. This keeps the prototype from crashing on
// submit; note that /tmp is ephemeral, so submissions are not durable there —
// use a real database (Postgres, Vercel KV, etc.) for production persistence.
const DATA_DIR =
  process.env.VERCEL || process.env.MCL_DATA_DIR
    ? process.env.MCL_DATA_DIR || path.join("/tmp", "mcl-data")
    : path.join(process.cwd(), "data");
const CONTRIBUTIONS_FILE = path.join(DATA_DIR, "contributions.json");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

async function ensureFile<T>(file: string, seed: T): Promise<void> {
  try {
    await fs.access(file);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(file, JSON.stringify(seed, null, 2), "utf-8");
  }
}

async function readJson<T>(file: string, seed: T): Promise<T> {
  await ensureFile(file, seed);
  const raw = await fs.readFile(file, "utf-8");
  try {
    return JSON.parse(raw) as T;
  } catch {
    return seed;
  }
}

async function writeJson<T>(file: string, data: T): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf-8");
}

/* -------------------------------- Contributions ------------------------------- */

export async function getContributions(): Promise<Contribution[]> {
  if (notion.notionEnabled()) return notion.getContributions();
  return readJson<Contribution[]>(CONTRIBUTIONS_FILE, seedContributions);
}

export async function getApprovedContributions(): Promise<Contribution[]> {
  if (notion.notionEnabled()) return notion.getApprovedContributions();
  const all = await getContributions();
  return all
    .filter((c) => c.status === "approved")
    .sort(
      (a, b) =>
        new Date(b.approvedAt ?? b.createdAt).getTime() -
        new Date(a.approvedAt ?? a.createdAt).getTime()
    );
}

export async function addContribution(
  contribution: Contribution
): Promise<Contribution> {
  if (notion.notionEnabled()) return notion.addContribution(contribution);
  const all = await getContributions();
  all.unshift(contribution);
  await writeJson(CONTRIBUTIONS_FILE, all);
  return contribution;
}

export async function updateContribution(
  id: string,
  patch: Partial<Contribution>
): Promise<Contribution | null> {
  if (notion.notionEnabled()) return notion.updateContribution(id, patch);
  const all = await getContributions();
  const idx = all.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  const now = new Date().toISOString();
  const updated: Contribution = { ...all[idx], ...patch, updatedAt: now };
  if (patch.status === "approved" && !all[idx].approvedAt) {
    updated.approvedAt = now;
  }
  all[idx] = updated;
  await writeJson(CONTRIBUTIONS_FILE, all);
  return updated;
}

export async function deleteContribution(id: string): Promise<boolean> {
  if (notion.notionEnabled()) return notion.deleteContribution(id);
  const all = await getContributions();
  const next = all.filter((c) => c.id !== id);
  if (next.length === all.length) return false;
  await writeJson(CONTRIBUTIONS_FILE, next);
  return true;
}

/* ------------------------------------ Leads ----------------------------------- */

export async function getLeads(): Promise<CollaborationLead[]> {
  if (notion.notionEnabled()) return notion.getLeads();
  return readJson<CollaborationLead[]>(LEADS_FILE, []);
}

export async function addLead(lead: CollaborationLead): Promise<CollaborationLead> {
  if (notion.notionEnabled()) return notion.addLead(lead);
  const all = await getLeads();
  all.unshift(lead);
  await writeJson(LEADS_FILE, all);
  return lead;
}

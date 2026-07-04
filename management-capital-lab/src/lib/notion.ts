import type { Contribution, CollaborationLead, NoteColor } from "./types";

// Notion-backed persistence for contributions and collaboration leads.
// Enabled when NOTION_TOKEN and the database IDs are configured; otherwise the
// app falls back to the local JSON store (see store.ts).

const NOTION_API = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";

export function notionEnabled(): boolean {
  return Boolean(
    process.env.NOTION_TOKEN &&
      process.env.NOTION_CONTRIBUTIONS_DB &&
      process.env.NOTION_LEADS_DB
  );
}

function headers() {
  return {
    Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
    "Notion-Version": NOTION_VERSION,
    "Content-Type": "application/json",
  };
}

const CONTRIB_DB = () => process.env.NOTION_CONTRIBUTIONS_DB as string;
const LEADS_DB = () => process.env.NOTION_LEADS_DB as string;

/* ----------------------------- property helpers ---------------------------- */

const title = (v: string) => ({ title: [{ text: { content: v.slice(0, 2000) } }] });
const text = (v: string) =>
  v ? { rich_text: [{ text: { content: v.slice(0, 2000) } }] } : { rich_text: [] };
const select = (v: string) => (v ? { select: { name: v } } : { select: null });
const multi = (vs: string[]) => ({ multi_select: vs.map((name) => ({ name })) });
const email = (v: string) => ({ email: v || null });
const checkbox = (v: boolean) => ({ checkbox: Boolean(v) });
const date = (v: string | null) => ({ date: v ? { start: v } : null });

function readText(prop: any): string {
  if (!prop) return "";
  if (prop.title) return prop.title.map((t: any) => t.plain_text).join("");
  if (prop.rich_text) return prop.rich_text.map((t: any) => t.plain_text).join("");
  return "";
}
const readSelect = (p: any): string => p?.select?.name ?? "";
const readMulti = (p: any): string[] => (p?.multi_select ?? []).map((o: any) => o.name);
const readCheckbox = (p: any): boolean => Boolean(p?.checkbox);
const readEmail = (p: any): string => p?.email ?? "";
const readDate = (p: any): string | null => p?.date?.start ?? null;

/* ------------------------------- HTTP helper ------------------------------- */

async function notionFetch(path: string, init: RequestInit): Promise<any> {
  const res = await fetch(`${NOTION_API}${path}`, { ...init, headers: headers() });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Notion API ${res.status}: ${body}`);
  }
  return res.json();
}

/* ------------------------------ Contributions ------------------------------ */

function pageToContribution(page: any): Contribution {
  const p = page.properties;
  return {
    id: page.id,
    prompt: readText(p["Prompt"]),
    content: readText(p["Content"]),
    name: readText(p["Name"]) || "Anonymous",
    isAnonymous: readCheckbox(p["Anonymous"]),
    email: readEmail(p["Email"]),
    role: readSelect(p["Role"]) || "Other",
    country: readSelect(p["Country"]),
    sector: readText(p["Sector"]),
    organisation: readText(p["Organisation"]),
    consentToContact: readCheckbox(p["Consent to contact"]),
    consentToPublish: readCheckbox(p["Consent to publish"]),
    status: (readSelect(p["Status"]) || "pending") as Contribution["status"],
    color: (readSelect(p["Color"]) || "yellow") as NoteColor,
    themes: readMulti(p["Themes"]),
    createdAt: readDate(p["Submitted"]) ?? page.created_time,
    updatedAt: page.last_edited_time,
    approvedAt: readDate(p["Approved at"]),
  };
}

export async function getContributions(): Promise<Contribution[]> {
  const results: Contribution[] = [];
  let cursor: string | undefined;
  do {
    const data = await notionFetch(`/databases/${CONTRIB_DB()}/query`, {
      method: "POST",
      body: JSON.stringify({
        page_size: 100,
        start_cursor: cursor,
        sorts: [{ property: "Submitted", direction: "descending" }],
      }),
    });
    results.push(...data.results.map(pageToContribution));
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);
  return results;
}

export async function getApprovedContributions(): Promise<Contribution[]> {
  const data = await notionFetch(`/databases/${CONTRIB_DB()}/query`, {
    method: "POST",
    body: JSON.stringify({
      page_size: 100,
      filter: { property: "Status", select: { equals: "approved" } },
      sorts: [{ property: "Approved at", direction: "descending" }],
    }),
  });
  return data.results.map(pageToContribution);
}

export async function addContribution(c: Contribution): Promise<Contribution> {
  const data = await notionFetch(`/pages`, {
    method: "POST",
    body: JSON.stringify({
      parent: { database_id: CONTRIB_DB() },
      properties: {
        Name: title(c.isAnonymous ? "Anonymous" : c.name || "Anonymous"),
        Content: text(c.content),
        Prompt: text(c.prompt),
        Role: select(String(c.role)),
        Country: select(c.country),
        Sector: text(c.sector),
        Organisation: text(c.organisation),
        Email: email(c.email),
        Anonymous: checkbox(c.isAnonymous),
        "Consent to contact": checkbox(c.consentToContact),
        "Consent to publish": checkbox(c.consentToPublish),
        Status: select(c.status),
        Color: select(c.color),
        Themes: multi(c.themes),
        Submitted: date(c.createdAt),
      },
    }),
  });
  return pageToContribution(data);
}

export async function updateContribution(
  id: string,
  patch: Partial<Contribution>
): Promise<Contribution | null> {
  const properties: Record<string, any> = {};
  if (patch.status) {
    properties.Status = select(patch.status);
    if (patch.status === "approved") {
      properties["Approved at"] = date(new Date().toISOString());
    }
  }
  if (typeof patch.content === "string") properties.Content = text(patch.content);
  const data = await notionFetch(`/pages/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ properties }),
  });
  return pageToContribution(data);
}

export async function deleteContribution(id: string): Promise<boolean> {
  await notionFetch(`/pages/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ archived: true }),
  });
  return true;
}

/* ---------------------------------- Leads ---------------------------------- */

function pageToLead(page: any): CollaborationLead {
  const p = page.properties;
  return {
    id: page.id,
    name: readText(p["Name"]),
    email: readEmail(p["Email"]),
    organisation: readText(p["Organisation"]),
    role: readSelect(p["Role"]),
    country: readSelect(p["Country"]),
    collaborationType: readSelect(p["Collaboration type"]),
    message: readText(p["Message"]),
    consentToContact: readCheckbox(p["Consent to contact"]),
    createdAt: readDate(p["Submitted"]) ?? page.created_time,
  };
}

export async function getLeads(): Promise<CollaborationLead[]> {
  const data = await notionFetch(`/databases/${LEADS_DB()}/query`, {
    method: "POST",
    body: JSON.stringify({
      page_size: 100,
      sorts: [{ property: "Submitted", direction: "descending" }],
    }),
  });
  return data.results.map(pageToLead);
}

export async function addLead(lead: CollaborationLead): Promise<CollaborationLead> {
  const data = await notionFetch(`/pages`, {
    method: "POST",
    body: JSON.stringify({
      parent: { database_id: LEADS_DB() },
      properties: {
        Name: title(lead.name || "Anonymous"),
        Email: email(lead.email),
        Organisation: text(lead.organisation),
        Role: select(lead.role),
        Country: select(lead.country),
        "Collaboration type": select(lead.collaborationType),
        Message: text(lead.message),
        "Consent to contact": checkbox(lead.consentToContact),
        Submitted: date(lead.createdAt),
      },
    }),
  });
  return pageToLead(data);
}

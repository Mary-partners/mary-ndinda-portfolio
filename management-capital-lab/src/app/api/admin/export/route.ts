import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getContributions, getLeads } from "@/lib/store";
import { toCsv } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") ?? "contributions";

  if (type === "leads") {
    const leads = await getLeads();
    const headers = [
      "id",
      "name",
      "email",
      "organisation",
      "role",
      "country",
      "collaborationType",
      "message",
      "consentToContact",
      "createdAt",
    ];
    const csv = toCsv(leads as unknown as Record<string, unknown>[], headers);
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="collaboration-leads.csv"`,
      },
    });
  }

  const contributions = await getContributions();
  const headers = [
    "id",
    "prompt",
    "content",
    "name",
    "isAnonymous",
    "email",
    "role",
    "country",
    "sector",
    "organisation",
    "consentToContact",
    "consentToPublish",
    "status",
    "themes",
    "createdAt",
    "approvedAt",
  ];
  const rows = contributions.map((c) => ({
    ...c,
    themes: c.themes.join(" | "),
  }));
  const csv = toCsv(rows as unknown as Record<string, unknown>[], headers);
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="contributions.csv"`,
    },
  });
}

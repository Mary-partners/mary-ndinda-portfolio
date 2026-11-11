import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { latestAssessments } from "@/lib/portfolio";
import { prisma } from "@/lib/prisma";
import { toCsv } from "@/lib/utils";
import { DIMENSION_META } from "@/lib/constants";

export const dynamic = "force-dynamic";

function csvResponse(csv: string, filename: string) {
  return new NextResponse(csv, {
    headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="${filename}"` },
  });
}

export async function GET(_req: Request, { params }: { params: Promise<{ type: string }> }) {
  const user = await requireUser().catch(() => null);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { type } = await params;

  if (type === "companies") {
    const rows = await latestAssessments(user.activeOrgId);
    const data = rows.map((r) => ({
      enterprise: r.company.tradingName ?? r.company.legalName,
      country: r.company.country,
      sector: r.company.sector,
      stage: r.company.stage ?? "",
      advisor: r.company.advisor?.name ?? "",
      overall_maturity: r.latest?.overallScore?.toFixed(2) ?? "",
      completeness_pct: Math.round((r.latest?.completeness ?? 0) * 100),
      scenario: r.company.scenarioTag ?? "",
    }));
    return csvResponse(toCsv(data, ["enterprise", "country", "sector", "stage", "advisor", "overall_maturity", "completeness_pct", "scenario"]), "portfolio.csv");
  }

  if (type === "scores") {
    const rows = await latestAssessments(user.activeOrgId);
    const headers = ["enterprise", ...DIMENSION_META.map((d) => d.key), "overall"];
    const data = rows.map((r) => {
      const rec: Record<string, unknown> = { enterprise: r.company.tradingName ?? r.company.legalName };
      for (const d of DIMENSION_META) rec[d.key] = r.latest?.dimensionScores.find((s) => s.dimension.key === d.key)?.score.toFixed(2) ?? "";
      rec.overall = r.latest?.overallScore?.toFixed(2) ?? "";
      return rec;
    });
    return csvResponse(toCsv(data, headers), "dimension-scores.csv");
  }

  if (type === "kpis") {
    const kpis = await prisma.companyKpi.findMany({ where: { company: { orgId: user.activeOrgId } }, include: { company: true, definition: true } });
    const data = kpis.map((k) => ({
      enterprise: k.company.tradingName ?? k.company.legalName,
      kpi: k.definition.name,
      unit: k.definition.unit,
      baseline: k.baseline ?? "",
      current: k.actual ?? "",
      target: k.target ?? "",
      data_status: k.dataStatus,
    }));
    return csvResponse(toCsv(data, ["enterprise", "kpi", "unit", "baseline", "current", "target", "data_status"]), "kpis.csv");
  }

  return NextResponse.json({ error: "Unknown export" }, { status: 404 });
}

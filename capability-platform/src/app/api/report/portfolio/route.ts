import { requireUser } from "@/lib/auth";
import { getPortfolioStats } from "@/lib/portfolio";
import { buildPortfolioReportPdf } from "@/lib/pdf-report";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  let user;
  try {
    user = await requireUser();
  } catch {
    return new Response("Unauthorized", { status: 401 });
  }
  if (!user.activeOrgId) return new Response("No organisation", { status: 400 });

  const stats = await getPortfolioStats(user.activeOrgId);
  const orgName = user.memberships.find((m) => m.orgId === user.activeOrgId)?.orgName ?? "Management Capital Lab";
  const bytes = await buildPortfolioReportPdf(stats, orgName);

  return new Response(new Uint8Array(bytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="portfolio-intelligence-summary.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}

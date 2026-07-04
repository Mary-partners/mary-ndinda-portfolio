import type { Metadata } from "next";
import { isAuthenticated } from "@/lib/auth";
import { getContributions, getLeads } from "@/lib/store";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  description: "Moderation dashboard for the Management Capital Lab.",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const authed = await isAuthenticated();
  if (!authed) return <AdminLogin />;

  const [contributions, leads] = await Promise.all([
    getContributions(),
    getLeads(),
  ]);

  return (
    <AdminDashboard initialContributions={contributions} initialLeads={leads} />
  );
}

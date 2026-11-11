import { getCurrentUser, type SessionUser } from "@/lib/auth";
import { signOut, switchOrg } from "@/app/actions/session";
import { ROLE_LABELS } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { LogOut } from "lucide-react";

export async function Topbar({ user }: { user: SessionUser }) {
  return (
    <header className="no-print sticky top-0 z-20 border-b border-navy/10 bg-white/90 backdrop-blur">
      <div className="flex h-14 items-center justify-between gap-4 px-5">
        <div className="flex items-center gap-3">
          <Badge tone="gold">DEMO DATA</Badge>
          <span className="hidden text-sm text-ink-muted sm:inline">All enterprises & metrics are fictional</span>
        </div>
        <div className="flex items-center gap-3">
          {user.memberships.length > 1 && (
            <form action={switchOrgForm}>
              <select
                name="orgId"
                defaultValue={user.activeOrgId}
                className="rounded-lg border border-navy/15 bg-white px-2 py-1.5 text-xs text-navy-700"
              >
                {dedupeOrgs(user).map((m) => (
                  <option key={m.orgId} value={m.orgId}>{m.orgName}</option>
                ))}
              </select>
            </form>
          )}
          <div className="text-right leading-tight">
            <div className="text-sm font-medium text-navy-700">{user.name}</div>
            <div className="text-[11px] text-ink-muted">{ROLE_LABELS[user.activeRole] ?? user.activeRole}</div>
          </div>
          <form action={signOut}>
            <button className="btn-ghost px-2" title="Sign out" aria-label="Sign out">
              <LogOut className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}

function dedupeOrgs(user: SessionUser) {
  const seen = new Set<string>();
  return user.memberships.filter((m) => (seen.has(m.orgId) ? false : (seen.add(m.orgId), true)));
}

async function switchOrgForm(formData: FormData) {
  "use server";
  const orgId = String(formData.get("orgId") ?? "");
  const user = await getCurrentUser();
  if (user && orgId) await switchOrg(orgId);
}

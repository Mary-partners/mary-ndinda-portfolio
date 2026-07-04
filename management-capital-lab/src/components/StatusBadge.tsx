import { Badge } from "@/components/ui/badge";
import type { ContributionStatus, ResearchPhase } from "@/lib/types";

export function StatusBadge({ status }: { status: ContributionStatus }) {
  const map = {
    pending: { tone: "amber" as const, label: "Pending" },
    approved: { tone: "green" as const, label: "Approved" },
    rejected: { tone: "red" as const, label: "Rejected" },
  };
  const { tone, label } = map[status];
  return <Badge tone={tone}>{label}</Badge>;
}

export function PhaseStatusBadge({
  status,
}: {
  status: ResearchPhase["status"];
}) {
  const map = {
    Completed: "green" as const,
    "In Progress": "gold" as const,
    Open: "forest" as const,
    Upcoming: "neutral" as const,
  };
  return <Badge tone={map[status]}>{status}</Badge>;
}

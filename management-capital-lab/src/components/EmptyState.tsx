import * as React from "react";
import { Inbox } from "lucide-react";

export function EmptyState({
  title,
  description,
  icon,
  action,
}: {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-navy/20 bg-white/60 px-6 py-14 text-center">
      <div className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-navy/5 text-navy-500">
        {icon ?? <Inbox className="h-6 w-6" />}
      </div>
      <h3 className="font-serif text-lg text-navy-900">{title}</h3>
      {description && (
        <p className="mt-1.5 max-w-sm text-sm text-navy-600">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PromptCard({ prompt }: { prompt: string }) {
  const href = `/contribute?prompt=${encodeURIComponent(prompt)}`;
  return (
    <div className="group flex h-full flex-col justify-between rounded-2xl border border-navy/10 bg-white p-5 shadow-soft transition-shadow hover:shadow-note">
      <p className="font-serif text-[1.05rem] leading-snug text-navy-900">
        {prompt}
      </p>
      <Link
        href={href}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-forest transition-colors hover:text-forest-700"
      >
        Respond
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}

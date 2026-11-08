import Link from "next/link";
import { profile } from "@/content/profile";
import { EvidenceLegend } from "./evidence-badge";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-rule bg-paper-2">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_1fr] lg:px-8">
        <div>
          <p className="font-serif text-xl text-ink">{profile.name}</p>
          <p className="mt-1 text-sm text-ink-3">{profile.location}</p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-2">{profile.positioning}</p>
          <p className="mt-6 max-w-xl text-xs leading-relaxed text-ink-3">
            {profile.disclaimer} {profile.notOfficial} Prepared in support of an application for the role of {profile.role.title} ({profile.role.firm}, reference {profile.role.reference}), advertised by {profile.role.recruiter}. Research reference date: {profile.researchDate}. Abler Nordic&rsquo;s name is used only to identify the role; no logo or branding is used.
          </p>
        </div>
        <div>
          <p className="eyebrow">How to read labels on this site</p>
          <div className="mt-3">
            <EvidenceLegend />
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <li><Link className="link" href="/sources">Sources and methodology</Link></li>
            <li><Link className="link" href="/evidence">Experience and evidence</Link></li>
            <li><Link className="link" href="/brief">Printable executive brief</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

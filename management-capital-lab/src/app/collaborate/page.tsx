import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import {
  Building2,
  Landmark,
  TrendingUp,
  HandHeart,
  GraduationCap,
  Scale,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { CollaborationForm } from "@/components/CollaborationForm";

export const metadata: Metadata = {
  title: "Collaborate",
  description:
    "Collaborate with the Management Capital Lab. Founders, banks, investors, ESOs, researchers, and policymakers are invited to help build the research.",
};

const PATHWAYS = [
  {
    icon: Building2,
    title: "Founders",
    cta: "Share your business growth experience",
    description:
      "Contribute insights on finance, systems, growth, advisory support, and capital use.",
    type: "Share a founder / business experience",
  },
  {
    icon: Landmark,
    title: "Banks and Lenders",
    cta: "Share SME financing insights",
    description:
      "Help identify what makes SMEs bankable or risky beyond collateral.",
    type: "Share SME financing insights (bank / lender)",
  },
  {
    icon: TrendingUp,
    title: "Investors and Funders",
    cta: "Contribute investment-readiness perspectives",
    description: "Share what you look for before funding SMEs.",
    type: "Contribute investment-readiness perspectives",
  },
  {
    icon: HandHeart,
    title: "Enterprise Support Organisations",
    cta: "Partner on diagnostics or pilots",
    description:
      "Test the Management Capital Index with cohorts or portfolio SMEs.",
    type: "Partner on diagnostics or pilots (ESO)",
  },
  {
    icon: GraduationCap,
    title: "Researchers and Academics",
    cta: "Suggest literature or methodology",
    description: "Strengthen the academic foundation of the work.",
    type: "Suggest literature or methodology",
  },
  {
    icon: Scale,
    title: "Policymakers and Development Partners",
    cta: "Explore ecosystem-level applications",
    description:
      "Use findings to design better SME support and finance programmes.",
    type: "Explore ecosystem-level applications (policy)",
  },
];

export default function CollaboratePage() {
  return (
    <>
      <PageHeader
        eyebrow="Collaborate"
        title="Collaborate with the Research"
        intro="This research is being built with the ecosystem, not only for the ecosystem."
      />

      <div className="container-lab py-16 sm:py-20">
        <SectionHeading
          eyebrow="Pathways"
          title="Six ways to get involved"
          description="Choose the pathway that fits you. Selecting one pre-fills the form below."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PATHWAYS.map(({ icon: Icon, title, cta, description, type }) => (
            <Link
              key={title}
              href={`/collaborate?type=${encodeURIComponent(type)}#collaborate-form`}
              scroll
              className="group flex flex-col rounded-2xl border border-navy/10 bg-white p-6 shadow-soft transition-shadow hover:shadow-note"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-forest/10 text-forest">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-serif text-lg text-navy-900">{title}</h3>
              <p className="mt-1 text-sm font-medium text-forest-700">{cta}</p>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-600">
                {description}
              </p>
            </Link>
          ))}
        </div>

        <div
          id="collaborate-form"
          className="mt-16 scroll-mt-24 rounded-3xl border border-navy/10 bg-cream-50 p-6 shadow-soft sm:p-10"
        >
          <SectionHeading
            eyebrow="Express interest"
            title="Tell us how you'd like to collaborate"
            description="Your details are kept private and used only to follow up on this research."
          />
          <div className="mt-8 max-w-3xl">
            <Suspense fallback={<div className="text-sm text-navy-500">Loading form…</div>}>
              <CollaborationForm />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}

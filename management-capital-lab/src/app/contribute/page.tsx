import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/PageHeader";
import { ContributionForm } from "@/components/ContributionForm";

export const metadata: Metadata = {
  title: "Leave a Post-It",
  description:
    "Contribute your perspective to the Management Capital Lab research wall. Reviewed contributions appear publicly; your email is never shown.",
};

export default function ContributePage() {
  return (
    <>
      <PageHeader
        eyebrow="Add your voice"
        title="Leave a Post-It on the research wall"
        intro="Founders, banks, investors, advisors, researchers, ESOs, and policymakers — your experience sharpens the framework. Pick a prompt and share what you've seen."
      />
      <div className="container-lab py-16 sm:py-20">
        <div className="mx-auto max-w-2xl rounded-3xl border border-navy/10 bg-cream-50 p-6 shadow-soft sm:p-9">
          <Suspense
            fallback={<div className="text-sm text-navy-500">Loading form…</div>}
          >
            <ContributionForm />
          </Suspense>
        </div>
      </div>
    </>
  );
}

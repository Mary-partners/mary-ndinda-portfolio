import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { LibraryBrowser } from "./LibraryBrowser";

export const metadata: Metadata = {
  title: "Research Library",
  description:
    "The 64-article literature review database behind Chapter Two of the Management Capital Lab DBA: SME finance, management practices, capital use, human capital, strategy, governance, absorptive capacity and African SME evidence.",
};

export default function LibraryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Research Library"
        title="The evidence base"
        intro="The 64 verified articles behind the Chapter Two literature review, from credit-rationing theory to field experiments with African SMEs. Each entry records its key finding and why it matters to the Management Capital Index."
      />
      <div className="container-lab py-16 sm:py-20">
        <LibraryBrowser />
      </div>
    </>
  );
}

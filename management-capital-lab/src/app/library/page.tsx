import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { LibraryBrowser } from "./LibraryBrowser";

export const metadata: Metadata = {
  title: "Research Library",
  description:
    "A structured library of the SME finance, management practices, investment readiness, and capital absorption literature grounding the Management Capital Lab.",
};

export default function LibraryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Research Library"
        title="The evidence base"
        intro="A structured, growing library of the literature this research builds on — from the SME finance gap to management practices and capital absorption. Each entry notes why it matters to the study."
      />
      <div className="container-lab py-16 sm:py-20">
        <LibraryBrowser />
      </div>
    </>
  );
}

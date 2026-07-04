import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckCircle2 } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { ThankYouMessage } from "./ThankYouMessage";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Thank you for contributing to the Management Capital Lab.",
  robots: { index: false },
};

export default function ThankYouPage() {
  return (
    <div className="container-lab flex min-h-[60vh] items-center justify-center py-20">
      <div className="max-w-lg text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-forest/10 text-forest">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <Suspense
          fallback={
            <h1 className="mt-6 font-serif text-3xl text-navy-900">Thank you</h1>
          }
        >
          <ThankYouMessage />
        </Suspense>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" variant="primary">
            Back to the research wall
          </ButtonLink>
          <ButtonLink href="/field-notes" variant="outline">
            Read the field notes
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

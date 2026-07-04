"use client";

import { useSearchParams } from "next/navigation";

export function ThankYouMessage() {
  const type = useSearchParams().get("type");

  if (type === "collaboration") {
    return (
      <>
        <h1 className="mt-6 font-serif text-3xl text-navy-900 sm:text-4xl">
          Thank you for your interest
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-navy-600">
          Your collaboration interest has been received. Mary will be in touch
          about how your perspective can help shape the Management Capital Index.
        </p>
      </>
    );
  }

  return (
    <>
      <h1 className="mt-6 font-serif text-3xl text-navy-900 sm:text-4xl">
        Thank you for your contribution
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-navy-600">
        Your post-it has been received and will appear on the public research
        wall once it has been reviewed. Every contribution sharpens the
        framework.
      </p>
    </>
  );
}

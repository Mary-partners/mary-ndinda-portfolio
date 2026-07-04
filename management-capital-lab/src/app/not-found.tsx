import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-lab flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-serif text-6xl text-navy-200">404</p>
      <h1 className="mt-4 font-serif text-3xl text-navy-900">
        This page isn&apos;t on the wall
      </h1>
      <p className="mt-3 max-w-md text-navy-600">
        The page you&apos;re looking for may have moved. Head back to the
        research wall to keep exploring.
      </p>
      <ButtonLink href="/" variant="primary" className="mt-7">
        Back to the research wall
      </ButtonLink>
    </div>
  );
}

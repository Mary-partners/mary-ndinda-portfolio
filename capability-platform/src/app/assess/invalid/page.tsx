import { Gauge } from "lucide-react";

export const dynamic = "force-dynamic";

export default function AssessInvalidPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-800 px-5 py-10">
      <div className="w-full max-w-md text-center">
        <span className="mx-auto mb-4 grid h-11 w-11 place-items-center rounded-xl bg-gold text-navy-900"><Gauge className="h-6 w-6" /></span>
        <h1 className="text-xl font-semibold text-white">This link isn&apos;t valid</h1>
        <p className="mt-2 text-sm text-white/70">This self-assessment link has expired or is incorrect. Please ask the organisation that invited you for a new link.</p>
      </div>
    </div>
  );
}

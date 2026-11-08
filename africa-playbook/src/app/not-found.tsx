import Link from "next/link";
import { Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-24">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-4xl text-ink">This page is not part of the playbook</h1>
      <p className="mt-4 max-w-xl leading-relaxed text-ink-2">The link may be mistyped, or a workstream may have been renamed.</p>
      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
        <li><Link className="link" href="/">Overview</Link></li>
        <li><Link className="link" href="/playbook">All twelve workstreams</Link></li>
        <li><Link className="link" href="/first-year">First-year roadmap</Link></li>
      </ul>
    </Container>
  );
}

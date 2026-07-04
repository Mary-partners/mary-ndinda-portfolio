import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { primaryNav, services, site } from "@/lib/site";
import { Wordmark } from "./Wordmark";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-ink-950 text-ink-200">
      <div className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <Wordmark tone="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-300">
              {site.descriptor}
            </p>
            <p className="mt-6 text-xs uppercase tracking-widest2 text-teal-300">
              {site.tagline}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest2 text-ink-400">
              Explore
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-ink-200 transition-colors hover:text-teal-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="text-ink-200 transition-colors hover:text-teal-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest2 text-ink-400">
              Services
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-ink-200 transition-colors hover:text-teal-300"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest2 text-ink-400">
              Get in touch
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                <span>{site.city}, serving {site.region}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors hover:text-teal-300"
                >
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                <a
                  href={`tel:${site.phone.replace(/\s+/g, "")}`}
                  className="transition-colors hover:text-teal-300"
                >
                  {site.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ink-800 pt-8 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {site.year} {site.name}. All rights reserved.
          </p>
          <p>
            Registered audit, tax, and advisory practice. {site.domain}
          </p>
        </div>
        <p className="mt-6 text-[11px] leading-relaxed text-ink-500">
          Nairobi skyline photograph by afromusing, licensed under CC BY 2.0.
        </p>
      </div>
    </footer>
  );
}

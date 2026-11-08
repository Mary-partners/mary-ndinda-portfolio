import type { Metadata, Viewport } from "next";
import "@fontsource-variable/newsreader";
import "@fontsource-variable/inter";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { DetailsController } from "@/components/details-controller";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: {
    default: "Africa Investment & Leadership Playbook | Mary Ndinda",
    template: "%s | Mary Ndinda",
  },
  description:
    "An independent application proposal by Mary Ndinda setting out how she would approach the Director of Africa role. Proposed approach, subject to mandate, portfolio review and internal approval.",
  // No metadataBase, Open Graph image or production domain is set on purpose.
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  referrer: "strict-origin-when-cross-origin",
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#fbf8f2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body className="min-h-screen antialiased">
        <a
          href="#main"
          className="skip-link sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <div className="border-b border-rule bg-paper-2" role="note" aria-label="Status of this document">
          <p className="mx-auto max-w-7xl px-4 py-2 text-[0.8rem] leading-snug text-ink-2 sm:px-6 lg:px-8">
            <strong className="font-semibold">{profile.disclaimer}</strong>{" "}
            <span className="text-ink-3">{profile.notOfficial}</span>
          </p>
        </div>
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <DetailsController />
      </body>
    </html>
  );
}

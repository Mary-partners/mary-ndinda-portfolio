import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ToastProvider } from "@/components/ui/toast";

// Canonical production domain. Use the env override only when it points at the
// real domain, so previews never leak a vercel.app or localhost URL.
const CANONICAL = "https://www.managementcapitallab.com";
const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
const siteUrl = envUrl && envUrl.includes("managementcapitallab.com") ? envUrl : CANONICAL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "The Management Capital Lab | Mary Ndinda",
    template: "%s | The Management Capital Lab",
  },
  description:
    "A living DBA research platform exploring management capital, investment readiness, capital absorption, and sustainable growth among African SMEs.",
  keywords: [
    "African SMEs",
    "management capital",
    "SME finance",
    "investment readiness",
    "capital absorption",
    "SME growth",
    "Mary Ndinda",
    "DBA research",
    "financial management capability",
  ],
  authors: [{ name: "Mary Ndinda" }],
  openGraph: {
    title: "The Management Capital Lab | Mary Ndinda",
    description:
      "A living DBA research platform exploring management capital, investment readiness, capital absorption, and sustainable growth among African SMEs.",
    type: "website",
    url: siteUrl,
    siteName: "The Management Capital Lab",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Management Capital Lab | Mary Ndinda",
    description:
      "Exploring whether African SMEs need money first, or the management capability to use money well.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <ToastProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </ToastProvider>
      </body>
    </html>
  );
}

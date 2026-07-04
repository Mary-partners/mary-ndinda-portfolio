import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { site } from "@/lib/site";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mdawidallp.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | Audit, Tax & Advisory in East Africa`,
    template: `%s | ${site.name}`,
  },
  description: site.descriptor,
  keywords: [
    "audit firm Kenya",
    "tax advisory Nairobi",
    "CPA firm East Africa",
    "assurance services",
    "IFRS audit",
    "transfer pricing Kenya",
    "investment readiness",
    "virtual CFO",
    "Mdawida LLP",
    "Kennedy Mdawida",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    title: `${site.name} | Audit, Tax & Advisory`,
    description: site.descriptor,
    type: "website",
    url: siteUrl,
    siteName: site.name,
    locale: "en_KE",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Audit, Tax & Advisory`,
    description: site.descriptor,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

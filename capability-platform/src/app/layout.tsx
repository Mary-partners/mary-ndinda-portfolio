import type { Metadata } from "next";
import "./globals.css";

const DESCRIPTION =
  "Measure your management capability and get a clear 90-day plan. A free, confidential diagnostic for founders, from the Management Capital Lab.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.managementcapitallab.com"),
  title: {
    default: "Management Capital Lab",
    template: "%s | Management Capital Lab",
  },
  description: DESCRIPTION,
  applicationName: "Management Capital Lab",
  openGraph: {
    title: "Management Capital Lab",
    description: DESCRIPTION,
    url: "https://www.managementcapitallab.com/platform",
    siteName: "Management Capital Lab",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Management Capital Lab",
    description: DESCRIPTION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

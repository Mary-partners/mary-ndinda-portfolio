import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Management Capital Lab | Enterprise Capability Intelligence",
    template: "%s | Management Capital Lab",
  },
  description:
    "Measure management. Strengthen execution. Track enterprise performance. A management-capability diagnostic, implementation and portfolio-intelligence platform for African SME support programmes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

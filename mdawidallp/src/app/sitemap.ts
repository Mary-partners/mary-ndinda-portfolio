import type { MetadataRoute } from "next";
import { insights } from "@/lib/insights";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mdawidallp.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/services", "/industries", "/insights", "/contact"].map(
    (path) => ({
      url: `${base}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    }),
  );

  const posts = insights.map((i) => ({
    url: `${base}/insights/${i.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...routes, ...posts];
}

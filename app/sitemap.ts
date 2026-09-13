import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteConfig.url}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.url}/book/`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteConfig.url}/about/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/privacy/`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteConfig.url}/legal/`, changeFrequency: "yearly", priority: 0.2 },
  ];
}

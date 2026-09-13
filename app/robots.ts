import type { MetadataRoute } from "next";
import { isProduction, siteConfig } from "@/content/site";
import { basePath } from "@/lib/paths";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Previews (and the github.io sub-path) are never indexed.
  if (!isProduction || basePath) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}

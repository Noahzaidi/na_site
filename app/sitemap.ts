import type { MetadataRoute } from "next";
import { PAGE_PATHS, type PageKey, siteConfig } from "@/content/site";
import { LOCALES, localePath } from "@/lib/i18n";

export const dynamic = "force-static";

const pages: [PageKey, MetadataRoute.Sitemap[number]["changeFrequency"], number][] = [
  ["home", "monthly", 1],
  ["book", "monthly", 0.9],
  ["about", "monthly", 0.8],
  ["privacy", "yearly", 0.3],
  ["legal", "yearly", 0.2],
];

// Every page in every language, each listing its equivalents (hreflang).
export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(([page, changeFrequency, priority]) => {
    const url = (locale: (typeof LOCALES)[number]) =>
      `${siteConfig.url}${localePath(locale, PAGE_PATHS[page])}`;
    const languages = {
      ...Object.fromEntries(LOCALES.map((locale) => [locale, url(locale)])),
      "x-default": url("en"),
    };
    return LOCALES.map((locale) => ({
      url: url(locale),
      changeFrequency,
      priority,
      alternates: { languages },
    }));
  });
}

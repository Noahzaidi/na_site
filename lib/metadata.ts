import type { Metadata } from "next";
import { getDictionary } from "@/content/i18n";
import { isProduction, PAGE_PATHS, type PageKey, siteConfig } from "@/content/site";
import { format, LOCALES, type Locale, localePath, OG_LOCALES } from "@/lib/i18n";
import { asset, basePath } from "@/lib/paths";

// Only the production build on the site's own domain is indexed; the
// github.io preview (served under a base path) stays out of search results.
const allowIndexing = isProduction && !basePath;

export const siteIcons: Metadata["icons"] = {
  icon: asset("/favicon.svg"),
  apple: asset("/apple-touch-icon.png"),
};

/** Shared by every page of one language (set in its root layout). */
export function siteMetadata(locale: Locale): Metadata {
  const { meta } = getDictionary(locale);
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: meta.siteTitle, template: "%s | NoahArk" },
    description: meta.siteDescription,
    applicationName: siteConfig.name,
    icons: siteIcons,
    robots: allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
  };
}

/** Title, description, canonical, language alternatives and social cards for one page. */
export function pageMetadata(locale: Locale, page: PageKey): Metadata {
  const { meta, home } = getDictionary(locale);
  const isHome = page === "home";
  const title = isHome ? meta.siteTitle : meta.pages[page].title;
  const description = isHome ? meta.siteDescription : meta.pages[page].description;
  const socialTitle = isHome ? title : `${title} | ${siteConfig.name}`;
  const url = localePath(locale, PAGE_PATHS[page]);
  const image = {
    url: siteConfig.socialImages[locale],
    width: 1200,
    height: 630,
    alt: format(meta.socialAlt, { headline: home.hero.headline }),
  };

  return {
    title: isHome ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(LOCALES.map((other) => [other, localePath(other, PAGE_PATHS[page])])),
        "x-default": PAGE_PATHS[page],
      },
    },
    openGraph: {
      type: "website",
      url,
      siteName: siteConfig.name,
      title: socialTitle,
      description,
      locale: OG_LOCALES[locale],
      alternateLocale: LOCALES.filter((other) => other !== locale).map((other) => OG_LOCALES[other]),
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image],
    },
  };
}

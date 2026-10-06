import { toLocale } from "@/content/i18n";
import { DEFAULT_LOCALE, LOCALES } from "@/lib/i18n";
import { siteMetadata } from "@/lib/metadata";
import { SiteDocument, siteViewport } from "../document";
import "../globals.css";
import "../visuals.css";

// Root layout for the translated sites (/es/…, /fr/…). English keeps the
// unprefixed URLs in app/(en). Every language is prerendered for the static
// export; any other first segment is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.filter((locale) => locale !== DEFAULT_LOCALE).map((lang) => ({ lang }));
}

export const viewport = siteViewport;

export async function generateMetadata({ params }: LayoutProps<"/[lang]">) {
  return siteMetadata(toLocale((await params).lang));
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[lang]">) {
  return <SiteDocument locale={toLocale((await params).lang)}>{children}</SiteDocument>;
}

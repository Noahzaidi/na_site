import type { Metadata } from "next";
import { NotFoundShell, type NotFoundText } from "@/components/NotFoundShell";
import { getDictionary } from "@/content/i18n";
import { LOCALES, type Locale } from "@/lib/i18n";
import { siteIcons } from "@/lib/metadata";
import { DocumentHead, siteViewport } from "./document";
import { inter } from "./fonts";
import "./globals.css";
import "./visuals.css";

// The site has two root layouts (English and /[lang]), so the 404 page is a
// complete document of its own. It is exported as out/404.html, which GitHub
// Pages serves for every missing URL: English in the HTML, switched to Spanish
// or French in the browser for /es/… and /fr/… addresses (see NotFoundShell).
// Next adds <meta name="robots" content="noindex"> to the 404 page itself.
export const metadata: Metadata = {
  title: `${getDictionary("en").meta.notFoundTitle} | NoahArk`,
  icons: siteIcons,
};

export const viewport = siteViewport;

const notFoundText = (locale: Locale): NotFoundText => {
  const t = getDictionary(locale);
  const { brandLine, bookDiscoveryCall, mailSubject, newTab, newTabOfficial } = t.common;
  return {
    title: t.meta.notFoundTitle,
    header: t.header,
    nav: t.common.nav,
    footer: t.footer,
    common: { brandLine, bookDiscoveryCall, mailSubject, newTab, newTabOfficial },
    cookies: t.cookies,
    notFound: t.notFound,
  };
};

export default function GlobalNotFound() {
  const text = Object.fromEntries(LOCALES.map((locale) => [locale, notFoundText(locale)])) as Record<
    Locale,
    NotFoundText
  >;

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <DocumentHead />
      <body suppressHydrationWarning>
        <NotFoundShell text={text} year={new Date().getFullYear()} />
      </body>
    </html>
  );
}

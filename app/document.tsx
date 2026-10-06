import type { Viewport } from "next";
import type { ReactNode } from "react";
import { inter } from "./fonts";
import { CookieConsent } from "@/components/CookieConsent";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getDictionary } from "@/content/i18n";
import { isProduction } from "@/content/site";
import type { Locale } from "@/lib/i18n";

export const siteViewport: Viewport = {
  themeColor: "#0b0f1a",
  colorScheme: "dark",
};

// GitHub Pages cannot send security headers, so production builds carry a
// Content-Security-Policy meta tag. Next's static export needs inline scripts and
// styles; everything else is limited to this site plus the Calendly frame.
// (Not applied in development, where Next needs eval for hot reloading.)
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "media-src 'self'",
  "connect-src 'self'",
  "frame-src https://calendly.com https://*.calendly.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

/** The <head> tags every page carries, the 404 page included. */
export function DocumentHead() {
  return (
    <head>
      {isProduction && <meta httpEquiv="Content-Security-Policy" content={contentSecurityPolicy} />}
      <meta name="referrer" content="strict-origin-when-cross-origin" />
    </head>
  );
}

/**
 * The whole document for one language: both root layouts (English at /, the
 * others under /es/ and /fr/) render this, so every page is built with the
 * right <html lang> and the shared header, footer and cookie controls.
 */
export function SiteDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  const t = getDictionary(locale);

  return (
    // Browser extensions (Grammarly, password managers, dark-mode tools) add
    // attributes to <html>/<body> before React loads; ignore only those two.
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <DocumentHead />
      <body suppressHydrationWarning>
        <a href="#main" className="skip-link">
          {t.header.skipLink}
        </a>
        <SiteHeader locale={locale} t={{ header: t.header, nav: t.common.nav }} />
        {children}
        <SiteFooter
          locale={locale}
          t={{ footer: t.footer, common: t.common }}
          year={new Date().getFullYear()}
        />
        <CookieConsent locale={locale} t={t.cookies} />
      </body>
    </html>
  );
}

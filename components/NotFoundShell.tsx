"use client";

import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";
import { BookingLink } from "@/components/BookingLink";
import { CookieConsent } from "@/components/CookieConsent";
import { SiteFooter, type SiteFooterText } from "@/components/SiteFooter";
import { SiteHeader, type SiteHeaderText } from "@/components/SiteHeader";
import type { Dictionary } from "@/content/i18n/types";
import { DEFAULT_LOCALE, type Locale, localePath, splitLocale } from "@/lib/i18n";
import { basePath } from "@/lib/paths";

export type NotFoundText = SiteHeaderText &
  SiteFooterText & {
    title: string;
    cookies: Dictionary["cookies"];
    notFound: Dictionary["notFound"];
  };

// The URL never changes while this page is open.
const subscribe = () => () => {};
const localeFromUrl = () => {
  const { pathname } = window.location;
  const path = basePath && pathname.startsWith(basePath) ? pathname.slice(basePath.length) : pathname;
  return splitLocale(path || "/").locale;
};

/**
 * GitHub Pages serves one 404.html for every missing URL. It is built in
 * English (the fallback without JavaScript); in the browser, a /es/ or /fr/
 * address switches the whole page, document language included, to that language.
 */
export function NotFoundShell({ text, year }: { text: Record<Locale, NotFoundText>; year: number }) {
  const locale = useSyncExternalStore(subscribe, localeFromUrl, () => DEFAULT_LOCALE);
  const t = text[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = `${t.title} | NoahArk`;
  }, [locale, t.title]);

  return (
    <>
      <a href="#main" className="skip-link">
        {t.header.skipLink}
      </a>
      <SiteHeader locale={locale} t={t} notFound />
      <main id="main" className="hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-haze" aria-hidden="true" />
        <div className="hero-horizon" aria-hidden="true" />
        <div className="wrap">
          <p className="eyebrow">{t.notFound.eyebrow}</p>
          <h1 className="display mt-6 max-w-3xl">{t.notFound.heading}</h1>
          <p className="lede mt-6 max-w-xl">{t.notFound.body}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link href={localePath(locale, "/")} className="btn btn-primary">
              {t.notFound.home}
            </Link>
            <BookingLink locale={locale} mailSubject={t.common.mailSubject} className="btn btn-ghost">
              {t.common.bookDiscoveryCall}
            </BookingLink>
          </div>
        </div>
      </main>
      <SiteFooter locale={locale} t={t} year={year} />
      <CookieConsent locale={locale} t={t.cookies} />
    </>
  );
}

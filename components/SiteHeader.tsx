"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { Dictionary } from "@/content/i18n/types";
import { bookNav, primaryNav } from "@/content/site";
import { type Locale, localePath } from "@/lib/i18n";
import { asset } from "@/lib/paths";
import { useDisclosure } from "@/lib/useDisclosure";

export type SiteHeaderText = {
  header: Dictionary["header"];
  nav: Dictionary["common"]["nav"];
};

type SiteHeaderProps = {
  locale: Locale;
  t: SiteHeaderText;
  /** The 404 page: the language menu offers each language's homepage. */
  notFound?: boolean;
};

export function SiteHeader({ locale, t, notFound = false }: SiteHeaderProps) {
  const menuRef = useRef<HTMLDetailsElement>(null);
  useDisclosure(menuRef);

  const items = primaryNav.map((item) => ({
    label: t.nav[item.key],
    href: localePath(locale, item.href),
  }));
  const cta = { label: t.nav[bookNav.key], href: localePath(locale, bookNav.href) };

  return (
    <header className="site-header">
      <div className="wrap flex h-[72px] items-center justify-between gap-3">
        <Link
          href={localePath(locale, "/")}
          className="inline-flex min-h-11 shrink-0 items-center"
          aria-label={t.header.homeLabel}
        >
          <Image
            src={asset("/assets/noahark-lockup-horizontal.svg")}
            alt="NoahArk"
            width={1450}
            height={300}
            priority
            className="h-7 w-auto min-[400px]:h-8 sm:h-9"
          />
        </Link>

        <div className="flex items-center gap-2 lg:gap-6">
          {/* next/link adds the base path when the site runs under a sub-path. */}
          <nav aria-label={t.header.primaryNav} className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="nav-link">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={cta.href} className="btn-route">
                  {cta.label}
                </Link>
              </li>
            </ul>
          </nav>

          {/* One switcher for every width: beside the CTA on desktop, beside Menu on mobile. */}
          <LanguageSwitcher locale={locale} t={t.header} notFound={notFound} />

          <details ref={menuRef} className="menu lg:hidden">
            <summary>
              <span className="menu-icon" aria-hidden="true" />
              {/* Narrow phones show only the icon; the label stays in the accessible name. */}
              <span className="max-[439px]:sr-only">{t.header.menu}</span>
            </summary>
            <nav aria-label={t.header.primaryNav} className="menu-panel">
              <ul>
                {[...items, cta].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}

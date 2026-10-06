"use client";

import { usePathname } from "next/navigation";
import { type MouseEvent, useRef } from "react";
import { Flag } from "@/components/flags";
import { CheckIcon, ChevronDownIcon } from "@/components/icons";
import type { Dictionary } from "@/content/i18n/types";
import {
  LOCALE_CODES,
  LOCALE_NAMES,
  LOCALES,
  type Locale,
  localePath,
  splitLocale,
} from "@/lib/i18n";
import { basePath } from "@/lib/paths";
import { useDisclosure } from "@/lib/useDisclosure";

type LanguageSwitcherProps = {
  locale: Locale;
  t: Pick<Dictionary["header"], "changeLanguage" | "language" | "languageNames">;
  /** On the 404 page there is no equivalent page, so each language links to its homepage. */
  notFound?: boolean;
};

/** "#caf%C3%A9" → "café"; a malformed escape matches no element. */
const decodeHash = (hash: string) => {
  try {
    return decodeURIComponent(hash.slice(1));
  } catch {
    return "";
  }
};

/**
 * Header language menu: a native disclosure with ordinary links to the same
 * page in each language, so it works without JavaScript. Switching language
 * crosses root layouts, which is a full page load anyway, so these are plain
 * <a> elements carrying the base path themselves.
 */
export function LanguageSwitcher({ locale, t, notFound = false }: LanguageSwitcherProps) {
  const menuRef = useRef<HTMLDetailsElement>(null);
  useDisclosure(menuRef);
  const pathname = usePathname();
  const path = notFound ? "/" : splitLocale(pathname ?? "/").path;

  const onSelect = (event: MouseEvent<HTMLAnchorElement>, target: Locale) => {
    if (target === locale) {
      // Already on this language: leave the page as it is.
      event.preventDefault();
      const menu = menuRef.current;
      if (menu) menu.open = false;
      menu?.querySelector("summary")?.focus();
      return;
    }
    if (notFound) return;
    // Carry the query string and a section anchor over; section IDs are the
    // same in every language, so an anchor on this page exists on the other.
    const { search, hash } = window.location;
    const keepHash = hash && document.getElementById(decodeHash(hash)) ? hash : "";
    event.currentTarget.href = `${basePath}${localePath(target, path)}${search}${keepHash}`;
  };

  return (
    <details ref={menuRef} className="lang">
      {/* Phones show the flag and EN/ES/FR (just the flag below 360px), desktop the
          full name; the full name is always in the accessible name. */}
      <summary className="lang-trigger">
        <Flag locale={locale} size={18} className="lang-flag" />
        <span className="max-[359px]:hidden lg:hidden">{LOCALE_CODES[locale]}</span>
        <span className="sr-only lg:hidden"> {LOCALE_NAMES[locale]}</span>
        <span className="hidden lg:inline">{LOCALE_NAMES[locale]}</span>
        <span className="sr-only">, {t.changeLanguage}</span>
        <ChevronDownIcon className="lang-chevron" />
      </summary>
      <div className="lang-panel">
        <p className="lang-panel-title">{t.language}</p>
        <ul className="lang-list">
          {LOCALES.map((option) => {
            const current = option === locale;
            // "Español" with "Spanish" underneath, in the page language.
            const hint = t.languageNames[option];
            return (
              <li key={option}>
                <a
                  href={`${basePath}${localePath(option, path)}`}
                  hrefLang={option}
                  lang={option}
                  aria-current={current ? "true" : undefined}
                  className="lang-option"
                  onClick={(event) => onSelect(event, option)}
                >
                  <Flag locale={option} size={22} className="lang-flag" />
                  <span className="lang-option-text">
                    <span className="lang-option-name">{LOCALE_NAMES[option]}</span>
                    {hint !== LOCALE_NAMES[option] && (
                      <span className="lang-option-hint" lang={locale}>
                        {hint}
                      </span>
                    )}
                  </span>
                  {current && <CheckIcon className="lang-check" />}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </details>
  );
}

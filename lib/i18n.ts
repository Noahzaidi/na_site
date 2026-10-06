// Supported languages and locale-aware paths. The URL is the only source of the
// language: English keeps the unprefixed routes, the others live under /es/ and /fr/.
export const LOCALES = ["en", "es", "fr"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const isLocale = (value: string): value is Locale =>
  (LOCALES as readonly string[]).includes(value);

/** Each language named in itself, whatever the page language. */
export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
};

export const LOCALE_CODES: Record<Locale, string> = { en: "EN", es: "ES", fr: "FR" };

/** BCP 47 tags for dates, and Open Graph locale values. */
const DATE_LOCALES: Record<Locale, string> = { en: "en-GB", es: "es-ES", fr: "fr-FR" };
export const OG_LOCALES: Record<Locale, string> = { en: "en_GB", es: "es_ES", fr: "fr_FR" };

/** Add the locale prefix to a site path: "/about/" → "/es/about/", "/#approach" → "/es/#approach". */
export const localePath = (locale: Locale, path: string) =>
  locale === DEFAULT_LOCALE ? path : `/${locale}${path}`;

/**
 * Split a pathname (without the base path) into its locale and the page path
 * shared by every language: "/fr/about" → { locale: "fr", path: "/about/" }.
 */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  // Collapse repeated slashes (and backslashes, which browsers read as
  // slashes): a path starting with "//" would turn the links built from it
  // into protocol-relative URLs pointing at another host.
  const collapsed = `/${pathname}`.replace(/[/\\]+/g, "/");
  const normalized = collapsed.endsWith("/") ? collapsed : `${collapsed}/`;
  const [, first] = normalized.split("/");
  if (first && first !== DEFAULT_LOCALE && isLocale(first)) {
    return { locale: first, path: normalized.slice(first.length + 1) };
  }
  return { locale: DEFAULT_LOCALE, path: normalized };
}

/** Fill `{name}` placeholders. Unknown placeholders are left as they are. */
export const format = (text: string, values: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );

/** "2026-09-13" → "13 September 2026" / "13 de septiembre de 2026" / "13 septembre 2026". */
export const formatDate = (isoDate: string, locale: Locale) =>
  new Intl.DateTimeFormat(DATE_LOCALES[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));

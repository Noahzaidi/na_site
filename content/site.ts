// Facts and configuration shared by every language. Translatable copy lives in
// content/i18n/{en,es,fr}.ts.
import type { Locale } from "@/lib/i18n";

const cleanHttpsUrl = (value: string | undefined) => {
  if (!value) return null;

  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
};

const cleanEmail = (value: string | undefined) => {
  const email = value?.trim().toLowerCase();
  return email && /^[^\s@]+@noahark\.org$/.test(email) ? email : null;
};

const DEFAULT_BOOKING_URL = "https://calendly.com/noahzaidi/noahark-discovery-call";

const bookingUrl = cleanHttpsUrl(
  process.env.NEXT_PUBLIC_BOOKING_URL || DEFAULT_BOOKING_URL,
);
const contactEmail = cleanEmail(process.env.NEXT_PUBLIC_CONTACT_EMAIL);

// Only production builds are indexed; every other build is a noindex preview.
export const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";

/** Page paths shared by every language (localePath() adds the /es/ or /fr/ prefix). */
export const PAGE_PATHS = {
  home: "/",
  about: "/about/",
  // The Calendly calendar has its own page; every CTA leads here.
  book: "/book/",
  privacy: "/privacy/",
  legal: "/legal/",
} as const;

export type PageKey = keyof typeof PAGE_PATHS;

export const siteConfig = {
  name: "NoahArk",
  url: "https://noahark.org",
  domain: "noahark.org",
  founder: "Noah Zaidi",
  bookingUrl,
  contactEmail,
  // Social previews carry the headline, so each language has its own image (npm run og).
  socialImages: { en: "/og.jpg", es: "/og-es.jpg", fr: "/og-fr.jpg" } satisfies Record<Locale, string>,
  linkedinUrl: "https://www.linkedin.com/in/noahzaidi/",
  location: "Station F, Paris",
  address: {
    name: "Station F",
    street: "5 Parvis Alan Turing",
    postalCode: "75013",
    city: "Paris",
    country: { en: "France", es: "Francia", fr: "France" } satisfies Record<Locale, string>,
    countryCode: "FR",
  },
} as const;

/** Calendly inline-embed URL for the booking iframe on /book/. */
export const calendlyEmbedUrl = (() => {
  if (!bookingUrl) return null;
  const url = new URL(bookingUrl);
  url.searchParams.set("embed_domain", siteConfig.domain);
  url.searchParams.set("embed_type", "Inline");
  url.searchParams.set("hide_event_type_details", "1");
  url.searchParams.set("background_color", "0b0f1a");
  url.searchParams.set("text_color", "f8fafc");
  url.searchParams.set("primary_color", "2563eb");
  return url.toString();
})();

export const formatAddress = (locale: Locale) => {
  const { address } = siteConfig;
  return `${address.name}, ${address.street}, ${address.postalCode} ${address.city}, ${address.country[locale]}`;
};

// Labels come from the dictionary (common.nav); section anchors are the same in every language.
export const primaryNav = [
  { key: "workflows", href: "/#workflows" },
  { key: "approach", href: "/#approach" },
  { key: "about", href: PAGE_PATHS.about },
] as const;

export const bookNav = { key: "book", href: PAGE_PATHS.book } as const;

// Optional ambient hero video. Set to null to show only the CSS horizon.
// Desktop only; the poster shows first and playback starts only when motion is
// allowed and the connection is not constrained.
export const heroVideo: {
  sources: readonly { src: string; type: string }[];
  poster: string;
} | null = {
  sources: [{ src: "/video/earth-hero.mp4", type: "video/mp4" }],
  poster: "/video/earth-hero.jpg",
};

// Order and illustration of the example workflows; copy is in home.workflows.items.
export const workflows = [
  { index: "01", scene: "invoice" },
  { index: "02", scene: "purchase-order" },
  { index: "03", scene: "inbox" },
] as const;

/** Text that must exist in every language. */
export type Localized = Record<Locale, string>;

export type ProofEntry = {
  title: Localized;
  kind: "previous" | "independent" | "prototype" | "client";
  problem: Localized;
  built: Localized;
  limitation: Localized;
  media:
    | { type: "video"; src: string; poster: string; width: number; height: number }
    | { type: "image"; src: string; alt: Localized; width: number; height: number };
};

// Add verified builds here, written in every language. The section stays hidden while this list is empty.
export const proofEntries: ProofEntry[] = [];

// Official credential names: not translated.
export const certifications = [
  "Project Management Professional (PMP)®",
  "Oracle Financials Cloud: General Ledger 2022 Certified Implementation Professional",
] as const;

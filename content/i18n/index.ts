import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import type { Dictionary } from "./types";

export type { Dictionary } from "./types";

// Server-side only: client components receive the slices they need as props,
// so the full dictionaries never ship in the client bundle.
const dictionaries: Record<Locale, Dictionary> = { en, es, fr };

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];

/** The locale from a `[lang]` route segment; anything unsupported is a 404. */
export function toLocale(lang: string): Locale {
  if (!isLocale(lang)) notFound();
  return lang;
}

import { useSyncExternalStore } from "react";
import { legal } from "@/content/legal";

// The visitor's cookie choice lives in localStorage. Storing it is strictly
// necessary (it is how the choice is respected), so it needs no consent itself.
export const CONSENT_KEY = "noahark-consent";
const CONSENT_VERSION = 1;
const MAX_AGE_MS = legal.consentMonths * 30.5 * 24 * 60 * 60 * 1000;
const CONSENT_EVENT = "noahark:consent";
export const OPEN_SETTINGS_EVENT = "noahark:cookie-settings";

export type Consent = {
  version: number;
  /** Third-party content that sets its own cookies: the Calendly booking calendar. */
  external: boolean;
  date: string;
};

// If storage is blocked, the choice still holds for the current page view.
let memoryFallback = "";

function readRaw() {
  try {
    return window.localStorage.getItem(CONSENT_KEY) ?? memoryFallback;
  } catch {
    return memoryFallback;
  }
}

function parseConsent(raw: string): Consent | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as Partial<Consent>;
    if (value.version !== CONSENT_VERSION || typeof value.external !== "boolean" || !value.date) {
      return null;
    }
    if (Date.now() - Date.parse(value.date) > MAX_AGE_MS) return null;
    return value as Consent;
  } catch {
    return null;
  }
}

export const readConsent = () => parseConsent(readRaw());

export function saveConsent(external: boolean) {
  const value: Consent = { version: CONSENT_VERSION, external, date: new Date().toISOString() };
  memoryFallback = JSON.stringify(value);
  try {
    window.localStorage.setItem(CONSENT_KEY, memoryFallback);
  } catch {
    // Storage blocked: memoryFallback keeps the choice for this page view.
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/**
 * The current choice: `undefined` while server-rendered HTML hydrates (the
 * server cannot know it), `null` when no valid choice exists yet.
 */
export function useConsent(): Consent | null | undefined {
  const raw = useSyncExternalStore(subscribe, readRaw, () => null);
  return raw === null ? undefined : parseConsent(raw);
}

export const openCookieSettings = () => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));

"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/content/i18n/types";
import { legal } from "@/content/legal";
import { PAGE_PATHS } from "@/content/site";
import { OPEN_SETTINGS_EVENT, readConsent, saveConsent, useConsent } from "@/lib/consent";
import { format, type Locale, localePath } from "@/lib/i18n";
import { rich } from "@/lib/rich";

/**
 * First-visit cookie banner and the settings dialog (reopened from the footer).
 * Accept and reject carry equal weight, as the CNIL requires. The only optional
 * category is the Calendly booking calendar; the site sets no cookies itself.
 */
export function CookieConsent({ locale, t }: { locale: Locale; t: Dictionary["cookies"] }) {
  const consent = useConsent();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [allowExternal, setAllowExternal] = useState(false);

  const openSettings = useCallback(() => {
    setAllowExternal(readConsent()?.external ?? false);
    dialogRef.current?.showModal();
  }, []);

  useEffect(() => {
    window.addEventListener(OPEN_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, openSettings);
  }, [openSettings]);

  const choose = (external: boolean) => {
    saveConsent(external);
    dialogRef.current?.close();
  };

  return (
    <>
      {consent === null && (
        <section className="consent" aria-labelledby="consent-title">
          <h2 id="consent-title" className="consent-title">
            {t.title}
          </h2>
          <p className="consent-text">
            {rich(t.text, {
              link: (label) => (
                <Link href={localePath(locale, `${PAGE_PATHS.privacy}#cookies`)}>{label}</Link>
              ),
            })}
          </p>
          <div className="consent-actions">
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => choose(true)}>
              {t.acceptAll}
            </button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => choose(false)}>
              {t.rejectNonEssential}
            </button>
            <button type="button" className="consent-link" onClick={openSettings}>
              {t.settings}
            </button>
          </div>
        </section>
      )}

      <dialog ref={dialogRef} className="consent-dialog" aria-labelledby="consent-dialog-title">
        <div className="consent-dialog-body">
          <h2 id="consent-dialog-title" className="text-xl font-semibold tracking-tight">
            {t.dialogTitle}
          </h2>
          <p className="mt-2 pr-10 text-[0.9375rem] text-ink-2">
            {format(t.dialogIntro, { months: legal.consentMonths })}
          </p>

          <div className="consent-options">
            <div className="consent-option">
              <div>
                <h3>{t.essentialTitle}</h3>
                <p>{t.essentialBody}</p>
              </div>
              <span className="consent-always">{t.alwaysOn}</span>
            </div>
            <div className="consent-option">
              <div>
                <h3 id="consent-external-label">{t.externalTitle}</h3>
                <p id="consent-external-desc">{t.externalBody}</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  role="switch"
                  checked={allowExternal}
                  onChange={(event) => setAllowExternal(event.target.checked)}
                  aria-labelledby="consent-external-label"
                  aria-describedby="consent-external-desc"
                />
                <span className="switch-track" aria-hidden="true" />
              </label>
            </div>
          </div>

          <div className="consent-actions mt-6">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => choose(allowExternal)}
            >
              {t.save}
            </button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => choose(true)}>
              {t.acceptAll}
            </button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => choose(false)}>
              {t.rejectNonEssential}
            </button>
          </div>
        </div>

        <form method="dialog">
          <button type="submit" className="consent-close" aria-label={t.close}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </form>
      </dialog>
    </>
  );
}

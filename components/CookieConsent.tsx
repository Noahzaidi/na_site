"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { legal } from "@/content/legal";
import { OPEN_SETTINGS_EVENT, readConsent, saveConsent, useConsent } from "@/lib/consent";

/**
 * First-visit cookie banner and the settings dialog (reopened from the footer).
 * Accept and reject carry equal weight, as the CNIL requires. The only optional
 * category is the Calendly booking calendar; the site sets no cookies itself.
 */
export function CookieConsent() {
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
            Your privacy
          </h2>
          <p className="consent-text">
            This site uses no analytics or advertising cookies. With your permission, the
            booking page loads Calendly’s calendar, which sets its own cookies. See the{" "}
            <Link href="/privacy/#cookies">privacy policy</Link>.
          </p>
          <div className="consent-actions">
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => choose(true)}>
              Accept all
            </button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => choose(false)}>
              Reject non-essential
            </button>
            <button type="button" className="consent-link" onClick={openSettings}>
              Settings
            </button>
          </div>
        </section>
      )}

      <dialog ref={dialogRef} className="consent-dialog" aria-labelledby="consent-dialog-title">
        <div className="consent-dialog-body">
          <h2 id="consent-dialog-title" className="text-xl font-semibold tracking-tight">
            Cookie settings
          </h2>
          <p className="mt-2 pr-10 text-[0.9375rem] text-ink-2">
            Choose which optional content may load. Your choice is kept for{" "}
            {legal.consentMonths} months and can be changed at any time from the footer.
          </p>

          <div className="consent-options">
            <div className="consent-option">
              <div>
                <h3>Essential</h3>
                <p>Remembers your cookie choice in your browser so the site can respect it.</p>
              </div>
              <span className="consent-always">Always on</span>
            </div>
            <div className="consent-option">
              <div>
                <h3 id="consent-external-label">Booking calendar (Calendly)</h3>
                <p id="consent-external-desc">
                  Loads the calendar on the booking page. Calendly sets its own cookies.
                </p>
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
              Save choices
            </button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => choose(true)}>
              Accept all
            </button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => choose(false)}>
              Reject non-essential
            </button>
          </div>
        </div>

        <form method="dialog">
          <button type="submit" className="consent-close" aria-label="Close cookie settings">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </form>
      </dialog>
    </>
  );
}

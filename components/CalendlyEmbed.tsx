"use client";

import { ExternalIcon } from "@/components/icons";
import type { Dictionary } from "@/content/i18n/types";
import { saveConsent, useConsent } from "@/lib/consent";
import { rich } from "@/lib/rich";

type CalendlyEmbedProps = {
  src: string;
  bookingUrl: string;
  t: Dictionary["calendly"];
};

/**
 * The Calendly calendar sets third-party cookies, so it only loads once the
 * visitor has allowed it (banner, settings, or the button below).
 */
export function CalendlyEmbed({ src, bookingUrl, t }: CalendlyEmbedProps) {
  const consent = useConsent();

  // Hydrating: the choice isn't known yet, so hold the space without content.
  if (consent === undefined) {
    return <div className="booking-frame booking-gate" aria-hidden="true" />;
  }

  if (consent?.external) {
    return (
      <>
        <div className="booking-frame">
          {/* Sandboxed: Calendly can run and open its own pop-ups, but cannot
              navigate or redirect this page. */}
          <iframe
            src={src}
            title={t.iframeTitle}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-storage-access-by-user-activation"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <p className="mt-4 text-sm text-ink-3">
          {rich(t.notLoading, {
            link: (label) => (
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener"
                className="text-cloud underline decoration-cyan/60 underline-offset-4 hover:decoration-cyan"
              >
                {label}
              </a>
            ),
          })}
        </p>
      </>
    );
  }

  return (
    <div className="booking-frame booking-gate">
      <div className="max-w-md">
        <p className="eyebrow">{t.eyebrow}</p>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight">{t.heading}</h2>
        <p className="mt-3 text-ink-2">{t.body}</p>
        <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
          <button type="button" className="btn btn-primary" onClick={() => saveConsent(true)}>
            {t.load}
          </button>
          <a href={bookingUrl} target="_blank" rel="noopener" className="link-quiet">
            <span className="link-quiet-text">{t.openNewTab}</span>
            <ExternalIcon />
          </a>
        </div>
      </div>
    </div>
  );
}

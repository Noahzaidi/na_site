"use client";

import { ExternalIcon } from "@/components/icons";
import { saveConsent, useConsent } from "@/lib/consent";

type CalendlyEmbedProps = {
  src: string;
  bookingUrl: string;
};

/**
 * The Calendly calendar sets third-party cookies, so it only loads once the
 * visitor has allowed it (banner, settings, or the button below).
 */
export function CalendlyEmbed({ src, bookingUrl }: CalendlyEmbedProps) {
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
            title="Choose a time for a 30-minute discovery call with Noah Zaidi"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-storage-access-by-user-activation"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <p className="mt-4 text-sm text-ink-3">
          Calendar not loading?{" "}
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener"
            className="text-cloud underline decoration-cyan/60 underline-offset-4 hover:decoration-cyan"
          >
            Open the booking page in a new tab
          </a>
          .
        </p>
      </>
    );
  }

  return (
    <div className="booking-frame booking-gate">
      <div className="max-w-md">
        <p className="eyebrow">Booking calendar</p>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight">
          Load the calendar to pick a time.
        </h2>
        <p className="mt-3 text-ink-2">
          The calendar is provided by Calendly, which sets its own cookies. Loading it saves
          your consent for this content. You can change it at any time in Cookie settings.
        </p>
        <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
          <button type="button" className="btn btn-primary" onClick={() => saveConsent(true)}>
            Load the calendar
          </button>
          <a href={bookingUrl} target="_blank" rel="noopener" className="link-quiet">
            <span className="link-quiet-text">Open Calendly in a new tab</span>
            <ExternalIcon />
          </a>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { BookingLink } from "@/components/BookingLink";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import type { Dictionary } from "@/content/i18n/types";
import { regulations } from "@/content/legal";
import { formatAddress, PAGE_PATHS, siteConfig } from "@/content/site";
import { type Locale, localePath } from "@/lib/i18n";
import { asset } from "@/lib/paths";
import { rich } from "@/lib/rich";

export type SiteFooterText = {
  footer: Dictionary["footer"];
  common: Pick<
    Dictionary["common"],
    "brandLine" | "bookDiscoveryCall" | "mailSubject" | "newTab" | "newTabOfficial"
  >;
};

type SiteFooterProps = {
  locale: Locale;
  t: SiteFooterText;
  /** Passed in so a client-rendered footer (404 page) shows the build year, as the HTML does. */
  year: number;
};

export function SiteFooter({ locale, t, year }: SiteFooterProps) {
  const regulationLink = (url: string, label: string) => (
    <a className="footer-reg-link" href={url} target="_blank" rel="noopener">
      {label}
      <span className="sr-only"> {t.common.newTabOfficial}</span>
    </a>
  );

  return (
    <footer className="border-t border-line">
      <div className="wrap grid gap-10 py-14 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <Image
            src={asset("/assets/noahark-lockup-horizontal.svg")}
            alt="NoahArk"
            width={1450}
            height={300}
            className="h-10 w-auto"
          />
          <p className="mt-4 text-sm uppercase tracking-[0.2em] text-ink-3">
            {t.common.brandLine}
          </p>
        </div>

        <nav aria-label={t.footer.nav}>
          <ul className="flex flex-wrap gap-x-8 gap-y-1 text-[0.9375rem]">
            {siteConfig.bookingUrl && (
              <li>
                <BookingLink
                  locale={locale}
                  mailSubject={t.common.mailSubject}
                  className="footer-link"
                >
                  {t.common.bookDiscoveryCall}
                </BookingLink>
              </li>
            )}
            <li>
              <Link className="footer-link" href={localePath(locale, PAGE_PATHS.about)}>
                {t.footer.about}
              </Link>
            </li>
            {siteConfig.contactEmail && (
              <li>
                <a className="footer-link" href={`mailto:${siteConfig.contactEmail}`}>
                  {siteConfig.contactEmail}
                </a>
              </li>
            )}
            <li>
              <a
                className="footer-link"
                href={siteConfig.linkedinUrl}
                target="_blank"
                rel="noopener"
              >
                LinkedIn<span className="sr-only"> {t.common.newTab}</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="wrap flex flex-col gap-2 border-t border-line py-5 text-sm md:flex-row md:items-center md:justify-between md:gap-8">
        <p className="text-ink-2">
          {rich(t.footer.regulation, {
            aiAct: (label) => regulationLink(regulations.aiAct.url, label),
            gdpr: (label) => regulationLink(regulations.gdpr.url, label),
          })}
        </p>
        <ul className="flex flex-wrap gap-x-6">
          <li>
            <Link className="footer-link" href={localePath(locale, PAGE_PATHS.privacy)}>
              {t.footer.privacy}
            </Link>
          </li>
          <li>
            <Link className="footer-link" href={localePath(locale, PAGE_PATHS.legal)}>
              {t.footer.legal}
            </Link>
          </li>
          <li>
            <CookieSettingsButton className="footer-link cursor-pointer">
              {t.footer.cookieSettings}
            </CookieSettingsButton>
          </li>
        </ul>
      </div>

      <div className="wrap flex flex-col gap-1 border-t border-line py-6 text-sm text-ink-3 md:flex-row md:justify-between md:gap-8">
        <p>© {year} NoahArk</p>
        <p>{formatAddress(locale)}</p>
        <p>{siteConfig.domain}</p>
      </div>
    </footer>
  );
}

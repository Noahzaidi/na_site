import Image from "next/image";
import Link from "next/link";
import { BookingLink } from "@/components/BookingLink";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import { regulations } from "@/content/legal";
import { formattedAddress, siteConfig } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="wrap grid gap-10 py-14 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <Image
            src="/assets/noahark-lockup-horizontal.svg"
            alt="NoahArk"
            width={1450}
            height={300}
            className="h-10 w-auto"
          />
          <p className="mt-4 text-sm uppercase tracking-[0.2em] text-ink-3">
            {siteConfig.brandLine}
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-8 gap-y-1 text-[0.9375rem]">
            {siteConfig.bookingUrl && (
              <li>
                <BookingLink className="footer-link">Book a discovery call</BookingLink>
              </li>
            )}
            <li>
              <Link className="footer-link" href="/about/">
                About
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
                LinkedIn<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="wrap flex flex-col gap-2 border-t border-line py-5 text-sm md:flex-row md:items-center md:justify-between md:gap-8">
        <p className="text-ink-2">
          Workflows designed with the{" "}
          <a className="footer-reg-link" href={regulations.aiAct.url} target="_blank" rel="noopener">
            {regulations.aiAct.label}
            <span className="sr-only"> (opens the official text in a new tab)</span>
          </a>{" "}
          and{" "}
          <a className="footer-reg-link" href={regulations.gdpr.url} target="_blank" rel="noopener">
            {regulations.gdpr.label}
            <span className="sr-only"> (opens the official text in a new tab)</span>
          </a>{" "}
          in mind.
        </p>
        <ul className="flex flex-wrap gap-x-6">
          <li>
            <Link className="footer-link" href="/privacy/">
              Privacy policy
            </Link>
          </li>
          <li>
            <Link className="footer-link" href="/legal/">
              Legal notice
            </Link>
          </li>
          <li>
            <CookieSettingsButton className="footer-link cursor-pointer">
              Cookie settings
            </CookieSettingsButton>
          </li>
        </ul>
      </div>

      <div className="wrap flex flex-col gap-1 border-t border-line py-6 text-sm text-ink-3 md:flex-row md:justify-between md:gap-8">
        <p>© {year} NoahArk</p>
        <p>{formattedAddress}</p>
        <p>{siteConfig.domain}</p>
      </div>
    </footer>
  );
}

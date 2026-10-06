import Link from "next/link";
import type { ReactNode } from "react";
import { PAGE_PATHS, siteConfig } from "@/content/site";
import { type Locale, localePath } from "@/lib/i18n";

type BookingLinkProps = {
  locale: Locale;
  /** Email subject, used only when no booking page is configured. */
  mailSubject: string;
  className?: string;
  children: ReactNode;
};

/** Every primary CTA leads to the one booking destination: the embedded calendar on /book/ in the page language. */
export function BookingLink({ locale, mailSubject, className, children }: BookingLinkProps) {
  if (!siteConfig.bookingUrl && siteConfig.contactEmail) {
    const href = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(mailSubject)}`;
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  const href = localePath(locale, siteConfig.bookingUrl ? PAGE_PATHS.book : "/#book");
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

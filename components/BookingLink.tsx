import Link from "next/link";
import type { ReactNode } from "react";
import { siteConfig } from "@/content/site";

type BookingLinkProps = {
  className?: string;
  children: ReactNode;
};

/** Every primary CTA leads to the one booking destination: the embedded calendar on /about/. */
export function BookingLink({ className, children }: BookingLinkProps) {
  const href = siteConfig.contactHref ?? "/#book";

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

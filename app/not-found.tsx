import type { Metadata } from "next";
import Link from "next/link";
import { BookingLink } from "@/components/BookingLink";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="main" className="hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-haze" aria-hidden="true" />
      <div className="hero-horizon" aria-hidden="true" />
      <div className="wrap">
        <p className="eyebrow">404</p>
        <h1 className="display mt-6 max-w-3xl">This page is not part of the workflow.</h1>
        <p className="lede mt-6 max-w-xl">
          The link may be out of date or mistyped. Head back to the homepage, or bring your
          workflow straight to a call.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Link href="/" className="btn btn-primary">
            Back to the homepage
          </Link>
          <BookingLink className="btn btn-ghost">Book a discovery call</BookingLink>
        </div>
      </div>
    </main>
  );
}

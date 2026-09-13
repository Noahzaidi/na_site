import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { ArrowRight, ExternalIcon } from "@/components/icons";
import { about, bookingSection, calendlyEmbedUrl, siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Book a discovery call",
  description:
    "Book a free 30-minute discovery call with Noah Zaidi at NoahArk. Bring one repetitive workflow to discuss.",
  alternates: { canonical: "/book/" },
};

export default function BookPage() {
  return (
    <main id="main">
      <section className="hero hero--page" aria-labelledby="book-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-haze" aria-hidden="true" />
        <div className="hero-horizon" aria-hidden="true" />

        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow">Book a call</p>
            <h1 id="book-title" className="heading mt-6">
              {bookingSection.heading}
            </h1>
            <p className="lede mt-6">{bookingSection.intro}</p>
            <ul className="booking-points mt-8">
              {bookingSection.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>

            <div className="host mt-10">
              <div className="host-mark" aria-hidden="true">
                <Image src="/assets/noahark-mark-primary.svg" alt="" width={943} height={506} />
              </div>
              <div>
                <p className="font-semibold">You’ll meet Noah Zaidi</p>
                <p className="text-sm text-ink-3">Leads NoahArk · {about.location}</p>
                <div className="flex flex-wrap gap-x-6">
                  <Link href="/about/" className="link-quiet min-h-11 text-[0.9375rem]">
                    <span className="link-quiet-text">Background</span>
                    <ArrowRight />
                  </Link>
                  <a
                    href={siteConfig.linkedinUrl}
                    target="_blank"
                    rel="noopener"
                    className="link-quiet min-h-11 text-[0.9375rem]"
                  >
                    <span className="link-quiet-text">LinkedIn</span>
                    <ExternalIcon />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            {calendlyEmbedUrl && siteConfig.bookingUrl ? (
              <CalendlyEmbed src={calendlyEmbedUrl} bookingUrl={siteConfig.bookingUrl} />
            ) : (
              siteConfig.contactEmail && (
                <p className="text-ink-2">
                  Email{" "}
                  <a className="text-cloud underline" href={`mailto:${siteConfig.contactEmail}`}>
                    {siteConfig.contactEmail}
                  </a>{" "}
                  with the workflow you want to discuss.
                </p>
              )
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

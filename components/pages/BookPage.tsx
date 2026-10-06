import Image from "next/image";
import Link from "next/link";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { ArrowRight, ExternalIcon } from "@/components/icons";
import { getDictionary } from "@/content/i18n";
import { calendlyEmbedUrl, PAGE_PATHS, siteConfig } from "@/content/site";
import { format, type Locale, localePath } from "@/lib/i18n";
import { asset } from "@/lib/paths";
import { rich } from "@/lib/rich";

export function BookPage({ locale }: { locale: Locale }) {
  const { book, calendly, common } = getDictionary(locale);

  return (
    <main id="main">
      <section className="hero hero--page" aria-labelledby="book-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-haze" aria-hidden="true" />
        <div className="hero-horizon" aria-hidden="true" />

        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow">{common.bookCall}</p>
            <h1 id="book-title" className="heading mt-6">
              {book.heading}
            </h1>
            <p className="lede mt-6">{book.intro}</p>
            <ul className="booking-points mt-8">
              {book.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>

            <div className="host mt-10">
              <div className="host-mark" aria-hidden="true">
                <Image
                  src={asset("/assets/noahark-mark-primary.svg")}
                  alt=""
                  width={943}
                  height={506}
                />
              </div>
              <div>
                <p className="font-semibold">{book.host}</p>
                <p className="text-sm text-ink-3">
                  {format(book.hostRole, { location: siteConfig.location })}
                </p>
                <div className="flex flex-wrap gap-x-6">
                  <Link
                    href={localePath(locale, PAGE_PATHS.about)}
                    className="link-quiet min-h-11 text-[0.9375rem]"
                  >
                    <span className="link-quiet-text">{book.background}</span>
                    <ArrowRight />
                  </Link>
                  <a
                    href={siteConfig.linkedinUrl}
                    target="_blank"
                    rel="noopener"
                    className="link-quiet min-h-11 text-[0.9375rem]"
                  >
                    <span className="link-quiet-text">{book.linkedin}</span>
                    <ExternalIcon />
                    <span className="sr-only"> {common.newTab}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            {calendlyEmbedUrl && siteConfig.bookingUrl ? (
              <CalendlyEmbed src={calendlyEmbedUrl} bookingUrl={siteConfig.bookingUrl} t={calendly} />
            ) : (
              siteConfig.contactEmail && (
                <p className="text-ink-2">
                  {rich(book.emailFallback, {
                    email: () => (
                      <a className="text-cloud underline" href={`mailto:${siteConfig.contactEmail}`}>
                        {siteConfig.contactEmail}
                      </a>
                    ),
                  })}
                </p>
              )
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

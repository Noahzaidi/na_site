import Image from "next/image";
import { BookingLink } from "@/components/BookingLink";
import { ArrowRight, ExternalIcon } from "@/components/icons";
import { FinalCta } from "@/components/pages/HomePage";
import { getDictionary } from "@/content/i18n";
import { certifications, siteConfig } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import { asset } from "@/lib/paths";

export function AboutPage({ locale }: { locale: Locale }) {
  const { about, common } = getDictionary(locale);

  return (
    <main id="main">
      {/* Intro */}
      <section className="hero hero--page" aria-labelledby="about-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-haze" aria-hidden="true" />
        <div className="hero-horizon" aria-hidden="true" />
        <div className="wrap">
          <p className="eyebrow">{about.eyebrow}</p>
          <h1 id="about-title" className="display mt-6 max-w-4xl">
            {about.heading}
          </h1>
          <p className="lede mt-6 max-w-[42rem]">{about.intro}</p>
          <p className="mt-4 max-w-[42rem] text-ink-2">{about.context}</p>
          <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-8">
            <BookingLink locale={locale} mailSubject={common.mailSubject} className="btn btn-primary">
              {common.bookDiscoveryCall}
              <ArrowRight />
            </BookingLink>
            <a
              href={siteConfig.linkedinUrl}
              target="_blank"
              rel="noopener"
              className="link-quiet self-start sm:self-auto"
            >
              <span className="link-quiet-text">{about.linkedinCta}</span>
              <ExternalIcon />
              <span className="sr-only"> {common.newTabLinkedIn}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Background */}
      <section className="section rule-top" aria-labelledby="experience-title">
        <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="reveal lg:col-span-7 lg:col-start-6 lg:row-start-1">
            <h2 id="experience-title" className="label text-cloud">
              {about.experienceTitle}
            </h2>
            <p className="mt-2 text-[0.9375rem] text-ink-3">{about.experienceNote}</p>
            <ul className="exp mt-6">
              {about.experience.map((item) => (
                <li key={item.org}>
                  <div>
                    <p className="font-semibold">{item.org}</p>
                    <p className="mt-0.5 text-sm text-ink-3">{item.role}</p>
                  </div>
                  <p className="text-ink-2">{item.body}</p>
                </li>
              ))}
            </ul>

            <div className="mt-10 grid gap-10 md:grid-cols-2">
              <div>
                <h3 className="label">{about.certificationsTitle}</h3>
                <ul className="mt-4 space-y-3 text-[0.9375rem] text-ink-2">
                  {certifications.map((certification) => (
                    <li key={certification}>{certification}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="label">{about.toolsTitle}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {about.tools.map((tool) => (
                    <li key={tool} className="chip">
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="reveal lg:col-span-5 lg:col-start-1 lg:row-start-1">
            <div className="lg:sticky lg:top-28">
              <div className="plate">
                <Image
                  src={asset("/assets/noahark-mark-primary.svg")}
                  alt={about.monogramAlt}
                  width={943}
                  height={506}
                  className="plate-mark"
                />
                <span className="plate-caption" aria-hidden="true">
                  {common.brandLine}
                </span>
              </div>
              <dl className="mt-8 max-w-[460px] text-[0.9375rem]">
                <div className="flex justify-between gap-6 border-b border-line py-4">
                  <dt className="text-ink-3">{about.ledBy}</dt>
                  <dd className="text-right">{siteConfig.founder}</dd>
                </div>
                <div className="flex justify-between gap-6 border-b border-line py-4">
                  <dt className="text-ink-3">{about.basedAt}</dt>
                  <dd className="text-right">{siteConfig.location}</dd>
                </div>
                <div className="flex justify-between gap-6 border-b border-line py-4">
                  <dt className="text-ink-3">{about.worksIn}</dt>
                  <dd className="text-right">{about.languages}</dd>
                </div>
                <div className="flex items-center justify-between gap-6 border-b border-line py-2">
                  <dt className="text-ink-3">{about.linkedin}</dt>
                  <dd>
                    <a
                      href={siteConfig.linkedinUrl}
                      target="_blank"
                      rel="noopener"
                      className="link-quiet min-h-11"
                    >
                      <span className="link-quiet-text">{about.connect}</span>
                      <ExternalIcon />
                      <span className="sr-only"> {common.newTabLinkedIn}</span>
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Call to book */}
      <section className="pb-24 lg:pb-32" aria-labelledby="about-cta-title">
        <div className="wrap">
          <FinalCta locale={locale} titleId="about-cta-title" />
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { BookingLink } from "@/components/BookingLink";
import { ArrowRight, ExternalIcon } from "@/components/icons";
import { about, finalCta, siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "About Noah Zaidi",
  description:
    "NoahArk is led by Noah Zaidi from Station F, Paris, with a background in finance operations, ERP implementation and AI delivery for banks.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <main id="main">
      {/* Intro */}
      <section className="hero hero--page" aria-labelledby="about-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-haze" aria-hidden="true" />
        <div className="hero-horizon" aria-hidden="true" />
        <div className="wrap">
          <p className="eyebrow">About</p>
          <h1 id="about-title" className="display mt-6 max-w-4xl">
            {about.heading}
          </h1>
          <p className="lede mt-6 max-w-[42rem]">{about.intro}</p>
          <p className="mt-4 max-w-[42rem] text-ink-2">{about.context}</p>
          <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-8">
            <BookingLink className="btn btn-primary">
              Book a discovery call
              <ArrowRight />
            </BookingLink>
            <a
              href={siteConfig.linkedinUrl}
              target="_blank"
              rel="noopener"
              className="link-quiet self-start sm:self-auto"
            >
              <span className="link-quiet-text">Connect on LinkedIn</span>
              <ExternalIcon />
              <span className="sr-only"> (opens LinkedIn in a new tab)</span>
            </a>
          </div>
        </div>
      </section>

      {/* Background */}
      <section className="section rule-top" aria-labelledby="experience-title">
        <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="reveal lg:col-span-7 lg:col-start-6 lg:row-start-1">
            <h2 id="experience-title" className="label text-cloud">
              Previous experience
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
                <h3 className="label">Certifications</h3>
                <ul className="mt-4 space-y-3 text-[0.9375rem] text-ink-2">
                  {about.certifications.map((certification) => (
                    <li key={certification}>{certification}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="label">Works with</h3>
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
                  src="/assets/noahark-mark-primary.svg"
                  alt="NoahArk monogram"
                  width={943}
                  height={506}
                  className="plate-mark"
                />
                <span className="plate-caption" aria-hidden="true">
                  {siteConfig.brandLine}
                </span>
              </div>
              <dl className="mt-8 max-w-[460px] text-[0.9375rem]">
                <div className="flex justify-between gap-6 border-b border-line py-4">
                  <dt className="text-ink-3">Led by</dt>
                  <dd className="text-right">Noah Zaidi</dd>
                </div>
                <div className="flex justify-between gap-6 border-b border-line py-4">
                  <dt className="text-ink-3">Based at</dt>
                  <dd className="text-right">{about.location}</dd>
                </div>
                <div className="flex justify-between gap-6 border-b border-line py-4">
                  <dt className="text-ink-3">Works in</dt>
                  <dd className="text-right">{about.languages}</dd>
                </div>
                <div className="flex items-center justify-between gap-6 border-b border-line py-2">
                  <dt className="text-ink-3">LinkedIn</dt>
                  <dd>
                    <a
                      href={siteConfig.linkedinUrl}
                      target="_blank"
                      rel="noopener"
                      className="link-quiet min-h-11"
                    >
                      <span className="link-quiet-text">Connect with Noah</span>
                      <ExternalIcon />
                      <span className="sr-only"> (opens LinkedIn in a new tab)</span>
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
          <div className="signal reveal">
            <div className="max-w-3xl">
              <p className="eyebrow eyebrow--light">Book a call</p>
              <h2 id="about-cta-title" className="heading mt-5">
                {finalCta.heading}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-cloud">{finalCta.body}</p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                <BookingLink className="btn btn-cloud">
                  {siteConfig.primaryCta}
                  <ArrowRight />
                </BookingLink>
                <p className="text-[0.9375rem] text-cloud">{siteConfig.bookingMicrocopy}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

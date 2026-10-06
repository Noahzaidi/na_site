import { BookingLink } from "@/components/BookingLink";
import { HeroVideo } from "@/components/HeroVideo";
import { ArrowDown, ArrowRight } from "@/components/icons";
import { ProofSection } from "@/components/ProofSection";
import { WorkflowIllustration } from "@/components/WorkflowIllustration";
import { WorkflowScene } from "@/components/WorkflowScenes";
import { getDictionary } from "@/content/i18n";
import { heroVideo, siteConfig, workflows } from "@/content/site";
import type { Locale } from "@/lib/i18n";

const organizationJsonLd = (slogan: string) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/apple-touch-icon.png`,
  slogan,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${siteConfig.address.name}, ${siteConfig.address.street}`,
    postalCode: siteConfig.address.postalCode,
    addressLocality: siteConfig.address.city,
    addressCountry: siteConfig.address.countryCode,
  },
  founder: { "@type": "Person", name: siteConfig.founder, sameAs: [siteConfig.linkedinUrl] },
});

export function HomePage({ locale }: { locale: Locale }) {
  const { home, common, media } = getDictionary(locale);
  const { hero, workflows: workflowsText, approach, faq } = home;

  return (
    <main id="main">
      <script
        type="application/ld+json"
        // Escape "<" so the JSON can never close the script tag early.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd(hero.headline)).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero */}
      <section className="hero" aria-labelledby="hero-title">
        {heroVideo && (
          <HeroVideo
            sources={heroVideo.sources}
            poster={heroVideo.poster}
            t={{ playVideo: media.playVideo, pauseVideo: media.pauseVideo }}
          />
        )}
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-haze" aria-hidden="true" />
        <div className="hero-horizon" aria-hidden="true" />

        <div className="wrap grid items-center gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <div>
            <p className="eyebrow">{common.brandLine}</p>
            <h1 id="hero-title" className="display mt-6">
              {hero.headline}
            </h1>
            <p className="lede enter mt-6 max-w-[34rem]">{hero.supporting}</p>
            <div className="enter enter-2 mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-8">
              <BookingLink locale={locale} mailSubject={common.mailSubject} className="btn btn-primary">
                {common.primaryCta}
                <ArrowRight />
              </BookingLink>
              <a href="#workflows" className="link-quiet self-start sm:self-auto">
                <span className="link-quiet-text">{hero.secondaryCta}</span>
                <ArrowDown />
              </a>
            </div>
            <p className="microcopy enter enter-2 mt-4">{common.bookingMicrocopy}</p>
          </div>

          <div className="enter enter-3">
            <WorkflowIllustration t={home.illustration} media={media} />
          </div>
        </div>
      </section>

      {/* Example workflows */}
      <section id="workflows" className="section" aria-labelledby="workflows-title">
        <div className="wrap">
          <div className="reveal grid gap-6 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <p className="eyebrow">{workflowsText.eyebrow}</p>
              <h2 id="workflows-title" className="heading mt-5">
                {workflowsText.heading}
              </h2>
            </div>
            <p className="lede lg:col-span-5 lg:col-start-8 lg:self-end">{workflowsText.intro}</p>
          </div>

          <ol className="mt-14 border-t border-line lg:mt-20">
            {workflows.map((workflow) => {
              const item = workflowsText.items[workflow.scene];
              return (
                <li key={workflow.index} className="wf-row reveal">
                  <div className="wf-row-copy">
                    <div className="flex items-center gap-4">
                      <span className="row-index">{workflow.index}</span>
                      <span className="tag">{workflowsText.tag}</span>
                    </div>
                    <h3 className="mt-5 text-2xl font-semibold tracking-tight">{item.title}</h3>
                    <p className="mt-3 max-w-[40rem] text-ink-2">{item.description}</p>
                  </div>

                  <div className="wf-row-art">
                    <WorkflowScene
                      kind={workflow.scene}
                      t={home.scenes}
                      chip={home.illustration.chip}
                      media={media}
                    />
                  </div>

                  <dl className="flow wf-row-flow">
                    <div className="flow-step">
                      <dt className="flow-label">{workflowsText.inputLabel}</dt>
                      <dd className="flow-value">{item.input}</dd>
                    </div>
                    <div className="flow-step">
                      <dt className="flow-label">{workflowsText.actionLabel}</dt>
                      <dd className="flow-value">{item.action}</dd>
                    </div>
                    <div className="flow-step flow-step--gate">
                      <dt className="flow-label">{workflowsText.checkpointLabel}</dt>
                      <dd className="flow-value">{item.checkpoint}</dd>
                    </div>
                  </dl>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <ProofSection locale={locale} t={home.proof} />

      {/* How engagement works */}
      <section id="approach" className="section rule-top" aria-labelledby="approach-title">
        <div className="wrap">
          <div className="reveal max-w-3xl">
            <p className="eyebrow">{approach.eyebrow}</p>
            <h2 id="approach-title" className="heading mt-5">
              {approach.heading}
            </h2>
            <p className="lede mt-6">{approach.intro}</p>
          </div>

          <ol className="track mt-16 lg:mt-20">
            {approach.steps.map((step, i) => (
              <li key={step.title} className="track-step reveal">
                <span className="track-node" aria-hidden="true" />
                <span className="row-index">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-xl font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-3 text-ink-2">{step.body}</p>
                {"note" in step && (
                  <p className="mt-4 border-l border-cyan/50 pl-4 text-[0.9375rem] text-ink-2">
                    {step.note}
                  </p>
                )}
              </li>
            ))}
          </ol>

          <div className="reveal mt-14">
            <p className="supporting">{approach.supporting}</p>
            <p className="supporting">{approach.regulation}</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section rule-top" aria-labelledby="faq-title">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow">{faq.eyebrow}</p>
              <h2 id="faq-title" className="heading mt-5">
                {faq.heading}
              </h2>
              <p className="mt-5 text-ink-2">{faq.intro}</p>
            </div>
          </div>
          <div className="lg:col-span-8">
            {faq.items.map((item) => (
              <details key={item.question} className="faq-item">
                <summary>
                  <span>{item.question}</span>
                  <span className="faq-icon" aria-hidden="true" />
                </summary>
                <p className="faq-answer">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final call */}
      <section id="book" className="pb-24 lg:pb-32" aria-labelledby="book-title">
        <div className="wrap">
          <FinalCta locale={locale} titleId="book-title" />
        </div>
      </section>
    </main>
  );
}

/** Closing booking panel, shared by the home and about pages. */
export function FinalCta({ locale, titleId }: { locale: Locale; titleId: string }) {
  const { home, common } = getDictionary(locale);

  return (
    <div className="signal reveal">
      <div className="max-w-3xl">
        <p className="eyebrow eyebrow--light">{common.bookCall}</p>
        <h2 id={titleId} className="heading mt-5">
          {home.finalCta.heading}
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-cloud">{home.finalCta.body}</p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <BookingLink locale={locale} mailSubject={common.mailSubject} className="btn btn-cloud">
            {common.primaryCta}
            <ArrowRight />
          </BookingLink>
          <p className="text-[0.9375rem] text-cloud">{common.bookingMicrocopy}</p>
        </div>
      </div>
    </div>
  );
}

import { BookingLink } from "@/components/BookingLink";
import { HeroVideo } from "@/components/HeroVideo";
import { ArrowDown, ArrowRight } from "@/components/icons";
import { ProofSection } from "@/components/ProofSection";
import { WorkflowIllustration } from "@/components/WorkflowIllustration";
import { WorkflowScene } from "@/components/WorkflowScenes";
import {
  approach,
  engagementSteps,
  faqs,
  faqSection,
  finalCta,
  hero,
  heroVideo,
  siteConfig,
  workflows,
  workflowsSection,
} from "@/content/site";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/apple-touch-icon.png`,
  slogan: hero.headline,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${siteConfig.address.name}, ${siteConfig.address.street}`,
    postalCode: siteConfig.address.postalCode,
    addressLocality: siteConfig.address.city,
    addressCountry: siteConfig.address.countryCode,
  },
  founder: { "@type": "Person", name: "Noah Zaidi", sameAs: [siteConfig.linkedinUrl] },
};

export default function Home() {
  return (
    <main id="main">
      <script
        type="application/ld+json"
        // Escape "<" so the JSON can never close the script tag early.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero */}
      <section className="hero" aria-labelledby="hero-title">
        {heroVideo && <HeroVideo sources={heroVideo.sources} poster={heroVideo.poster} />}
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-haze" aria-hidden="true" />
        <div className="hero-horizon" aria-hidden="true" />

        <div className="wrap grid items-center gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <div>
            <p className="eyebrow">{siteConfig.brandLine}</p>
            <h1 id="hero-title" className="display mt-6">
              {hero.headline}
            </h1>
            <p className="lede enter mt-6 max-w-[34rem]">{hero.supporting}</p>
            <div className="enter enter-2 mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-8">
              <BookingLink className="btn btn-primary">
                {siteConfig.primaryCta}
                <ArrowRight />
              </BookingLink>
              <a href="#workflows" className="link-quiet self-start sm:self-auto">
                <span className="link-quiet-text">{hero.secondaryCta}</span>
                <ArrowDown />
              </a>
            </div>
            <p className="microcopy enter enter-2 mt-4">{siteConfig.bookingMicrocopy}</p>
          </div>

          <div className="enter enter-3">
            <WorkflowIllustration />
          </div>
        </div>
      </section>

      {/* Example workflows */}
      <section id="workflows" className="section" aria-labelledby="workflows-title">
        <div className="wrap">
          <div className="reveal grid gap-6 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <p className="eyebrow">Example workflows</p>
              <h2 id="workflows-title" className="heading mt-5">
                {workflowsSection.heading}
              </h2>
            </div>
            <p className="lede lg:col-span-5 lg:col-start-8 lg:self-end">
              {workflowsSection.intro}
            </p>
          </div>

          <ol className="mt-14 border-t border-line lg:mt-20">
            {workflows.map((workflow) => (
              <li key={workflow.index} className="wf-row reveal">
                <div className="wf-row-copy">
                  <div className="flex items-center gap-4">
                    <span className="row-index">{workflow.index}</span>
                    <span className="tag">Possible workflow</span>
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold tracking-tight">
                    {workflow.title}
                  </h3>
                  <p className="mt-3 max-w-[40rem] text-ink-2">{workflow.description}</p>
                </div>

                <div className="wf-row-art">
                  <WorkflowScene kind={workflow.scene} />
                </div>

                <dl className="flow wf-row-flow">
                  <div className="flow-step">
                    <dt className="flow-label">Input</dt>
                    <dd className="flow-value">{workflow.input}</dd>
                  </div>
                  <div className="flow-step">
                    <dt className="flow-label">Proposed action</dt>
                    <dd className="flow-value">{workflow.action}</dd>
                  </div>
                  <div className="flow-step flow-step--gate">
                    <dt className="flow-label">Human checkpoint</dt>
                    <dd className="flow-value">{workflow.checkpoint}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ProofSection />

      {/* How engagement works */}
      <section id="approach" className="section rule-top" aria-labelledby="approach-title">
        <div className="wrap">
          <div className="reveal max-w-3xl">
            <p className="eyebrow">Our approach</p>
            <h2 id="approach-title" className="heading mt-5">
              {approach.heading}
            </h2>
            <p className="lede mt-6">{approach.intro}</p>
          </div>

          <ol className="track mt-16 lg:mt-20">
            {engagementSteps.map((step) => (
              <li key={step.index} className="track-step reveal">
                <span className="track-node" aria-hidden="true" />
                <span className="row-index">{step.index}</span>
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
              <p className="eyebrow">FAQ</p>
              <h2 id="faq-title" className="heading mt-5">
                {faqSection.heading}
              </h2>
              <p className="mt-5 text-ink-2">{faqSection.intro}</p>
            </div>
          </div>
          <div className="lg:col-span-8">
            {faqs.map((faq) => (
              <details key={faq.question} className="faq-item">
                <summary>
                  <span>{faq.question}</span>
                  <span className="faq-icon" aria-hidden="true" />
                </summary>
                <p className="faq-answer">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final call */}
      <section id="book" className="pb-24 lg:pb-32" aria-labelledby="book-title">
        <div className="wrap">
          <div className="signal reveal">
            <div className="max-w-3xl">
              <p className="eyebrow eyebrow--light">Book a call</p>
              <h2 id="book-title" className="heading mt-5">
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

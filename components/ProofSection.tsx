import Image from "next/image";
import type { Dictionary } from "@/content/i18n/types";
import { proofEntries } from "@/content/site";
import type { Locale } from "@/lib/i18n";

/** Renders only when a verified build has been added to `proofEntries`. */
export function ProofSection({ locale, t }: { locale: Locale; t: Dictionary["home"]["proof"] }) {
  if (proofEntries.length === 0) return null;

  return (
    <section id="proof" className="section rule-top" aria-labelledby="proof-title">
      <div className="wrap">
        <div className="reveal max-w-3xl">
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 id="proof-title" className="heading mt-5">
            {t.heading}
          </h2>
        </div>

        <div className="mt-14 grid gap-16">
          {proofEntries.map((entry) => (
            <article key={entry.title.en} className="reveal grid gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="overflow-hidden rounded-[14px] border border-line-strong lg:col-span-7">
                {entry.media.type === "video" ? (
                  <video
                    controls
                    muted
                    playsInline
                    preload="none"
                    poster={entry.media.poster}
                    width={entry.media.width}
                    height={entry.media.height}
                    className="h-auto w-full"
                  >
                    <source src={entry.media.src} />
                  </video>
                ) : (
                  <Image
                    src={entry.media.src}
                    alt={entry.media.alt[locale]}
                    width={entry.media.width}
                    height={entry.media.height}
                    loading="lazy"
                    className="h-auto w-full"
                  />
                )}
              </div>
              <div className="lg:col-span-5">
                <span className="tag">{t.kinds[entry.kind]}</span>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight">{entry.title[locale]}</h3>
                <dl className="mt-6 grid gap-5">
                  <div>
                    <dt className="label">{t.problem}</dt>
                    <dd className="mt-2 text-ink-2">{entry.problem[locale]}</dd>
                  </div>
                  <div>
                    <dt className="label">{t.built}</dt>
                    <dd className="mt-2 text-ink-2">{entry.built[locale]}</dd>
                  </div>
                  <div>
                    <dt className="label">{t.limitation}</dt>
                    <dd className="mt-2 text-ink-2">{entry.limitation[locale]}</dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

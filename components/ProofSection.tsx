import Image from "next/image";
import { proofEntries, proofSection } from "@/content/site";

/** Renders only when a verified build has been added to `proofEntries`. */
export function ProofSection() {
  if (proofEntries.length === 0) return null;

  return (
    <section id="proof" className="section rule-top" aria-labelledby="proof-title">
      <div className="wrap">
        <div className="reveal max-w-3xl">
          <p className="eyebrow">Real builds</p>
          <h2 id="proof-title" className="heading mt-5">
            {proofSection.heading}
          </h2>
        </div>

        <div className="mt-14 grid gap-16">
          {proofEntries.map((entry) => (
            <article key={entry.title} className="reveal grid gap-8 lg:grid-cols-12 lg:gap-12">
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
                    alt={entry.media.alt}
                    width={entry.media.width}
                    height={entry.media.height}
                    loading="lazy"
                    className="h-auto w-full"
                  />
                )}
              </div>
              <div className="lg:col-span-5">
                <span className="tag">{entry.kind}</span>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight">{entry.title}</h3>
                <dl className="mt-6 grid gap-5">
                  <div>
                    <dt className="label">The problem</dt>
                    <dd className="mt-2 text-ink-2">{entry.problem}</dd>
                  </div>
                  <div>
                    <dt className="label">What was built</dt>
                    <dd className="mt-2 text-ink-2">{entry.built}</dd>
                  </div>
                  <div>
                    <dt className="label">Known limitation</dt>
                    <dd className="mt-2 text-ink-2">{entry.limitation}</dd>
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

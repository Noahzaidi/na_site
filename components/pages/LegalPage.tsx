import Link from "next/link";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import { getDictionary } from "@/content/i18n";
import { legal, regulations } from "@/content/legal";
import { formatAddress, PAGE_PATHS, siteConfig } from "@/content/site";
import { format, type Locale, localePath } from "@/lib/i18n";
import { rich } from "@/lib/rich";

export function LegalPage({ locale }: { locale: Locale }) {
  const { legal: t } = getDictionary(locale);

  // Registration details appear only once they are provided in content/legal.ts.
  const publisher = [
    [
      t.rows.publisher,
      format(t.rows.publisherValue, { publisher: legal.publisher, director: legal.director }),
    ],
    [t.rows.address, formatAddress(locale)],
    [t.rows.legalForm, legal.legalForm],
    [t.rows.registrationNumber, legal.registrationNumber],
    [t.rows.vatNumber, legal.vatNumber],
    [t.rows.director, legal.director],
  ].filter((row): row is [string, string] => Boolean(row[1]));

  return (
    <main id="main" className="section">
      <article className="wrap legal">
        <div className="mx-auto max-w-[44rem]">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1 className="heading mt-5">{t.title}</h1>

          <h2>{t.publisherHeading}</h2>
          <dl className="legal-dl">
            {publisher.map(([term, value]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{value}</dd>
              </div>
            ))}
            {siteConfig.contactEmail && (
              <div>
                <dt>{t.rows.contact}</dt>
                <dd>
                  <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
                </dd>
              </div>
            )}
          </dl>

          <h2>{t.hostingHeading}</h2>
          <p>
            {legal.host.name}, {legal.host.address}. <a href={legal.host.url}>github.com</a>
          </p>

          <h2>{t.ipHeading}</h2>
          <p>{t.ipOwnership}</p>
          <p>{t.ipFootage}</p>

          <h2>{t.regulationHeading}</h2>
          <p>
            {rich(t.regulation, {
              aiAct: (text) => <a href={regulations.aiAct.url}>{text}</a>,
              gdpr: (text) => <a href={regulations.gdpr.url}>{text}</a>,
            })}
          </p>

          <h2>{t.dataHeading}</h2>
          <p>
            {rich(t.data, {
              privacy: (text) => <Link href={localePath(locale, PAGE_PATHS.privacy)}>{text}</Link>,
              settings: (text) => (
                <CookieSettingsButton className="inline-button">{text}</CookieSettingsButton>
              ),
            })}
          </p>
        </div>
      </article>
    </main>
  );
}

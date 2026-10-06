import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import { getDictionary } from "@/content/i18n";
import { legal, privacySources } from "@/content/legal";
import { formatAddress, siteConfig } from "@/content/site";
import { format, formatDate, type Locale } from "@/lib/i18n";
import { rich } from "@/lib/rich";

const strong = (text: string) => <strong>{text}</strong>;
const anchor = (href: string, text: string) => <a href={href}>{text}</a>;

export function PrivacyPage({ locale }: { locale: Locale }) {
  const { privacy: t } = getDictionary(locale);
  const { contactEmail } = siteConfig;
  const months = { months: legal.consentMonths };

  return (
    <main id="main" className="section">
      <article className="wrap legal">
        <div className="mx-auto max-w-[44rem]">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1 className="heading mt-5">{t.title}</h1>
          <p className="lede">{t.lede}</p>
          <p className="text-sm">
            {format(t.updated, { date: formatDate(legal.policyUpdated, locale) })}
          </p>

          <h2>{t.responsible.heading}</h2>
          <p>
            {format(t.responsible.body, {
              publisher: legal.publisher,
              director: legal.director,
              address: formatAddress(locale),
            })}
            {contactEmail && (
              <>
                {" "}
                {rich(t.responsible.contact, {
                  email: () => <a href={`mailto:${contactEmail}`}>{contactEmail}</a>,
                })}
              </>
            )}
          </p>

          <h2>{t.processing.heading}</h2>
          <p>{rich(t.processing.visiting, { strong })}</p>
          <p>{rich(t.processing.booking, { strong })}</p>
          <p>{rich(t.processing.contacting, { strong })}</p>
          <p>{t.processing.noConfidential}</p>

          {/* Stable ID in every language: the cookie banner links here. */}
          <h2 id="cookies">{t.cookies.heading}</h2>
          <p>
            {rich(format(t.cookies.storage, months), { code: (text) => <code>{text}</code> })}
          </p>
          <p>
            {rich(t.cookies.calendly, { link: (text) => anchor(privacySources.calendly, text) })}
          </p>
          <p>
            {rich(t.cookies.change, {
              settings: (text) => (
                <CookieSettingsButton className="inline-button">{text}</CookieSettingsButton>
              ),
            })}
          </p>

          <h2>{t.recipients.heading}</h2>
          <p>{t.recipients.intro}</p>
          <ul className="legal-list">
            <li>
              {rich(t.recipients.github, { link: (text) => anchor(privacySources.github, text) })}
            </li>
            <li>
              {rich(t.recipients.calendly, { link: (text) => anchor(privacySources.calendly, text) })}
            </li>
          </ul>

          <h2>{t.transfers.heading}</h2>
          <p>{t.transfers.body}</p>

          <h2>{t.retention.heading}</h2>
          <p>{format(t.retention.body, months)}</p>

          <h2>{t.rights.heading}</h2>
          <p>
            {t.rights.body}{" "}
            {contactEmail
              ? format(t.rights.exerciseEmail, { email: contactEmail })
              : t.rights.exerciseNoEmail}
          </p>
          <p>
            {rich(t.rights.complaint, { link: (text) => anchor(privacySources.cnil[locale], text) })}
          </p>

          <h2>{t.automated.heading}</h2>
          <p>{t.automated.body}</p>

          <h2>{t.changes.heading}</h2>
          <p>{t.changes.body}</p>
        </div>
      </article>
    </main>
  );
}

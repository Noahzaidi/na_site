import type { Metadata } from "next";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import { legal } from "@/content/legal";
import { formattedAddress, siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How NoahArk handles personal data on noahark.org and when you book a call, including cookies and your rights under the GDPR.",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  const { contactEmail } = siteConfig;

  return (
    <main id="main" className="section">
      <article className="wrap legal">
        <div className="mx-auto max-w-[44rem]">
          <p className="eyebrow">Privacy policy</p>
          <h1 className="heading mt-5">How NoahArk handles your personal data.</h1>
          <p className="lede">
            This policy explains what personal data is processed when you visit noahark.org or
            book a call, why it is processed, and the rights you have under the General Data
            Protection Regulation (GDPR).
          </p>
          <p className="text-sm">Last updated: {legal.policyUpdated}</p>

          <h2>1. Who is responsible</h2>
          <p>
            The controller of your personal data is {legal.publisher}, run by {legal.director},{" "}
            {formattedAddress}.
            {contactEmail && (
              <>
                {" "}
                You can reach us at <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
              </>
            )}
          </p>

          <h2>2. What is processed and why</h2>
          <p>
            <strong>Visiting the website.</strong> The site is hosted on GitHub Pages. To deliver
            pages and keep the service secure, GitHub processes technical data such as your IP
            address, browser type and the pages requested. Legal basis: legitimate interest in
            running a secure website (Article 6(1)(f) GDPR).
          </p>
          <p>
            <strong>Booking a call.</strong> When you book, Calendly collects the details you
            enter, such as your name, work email, company and the workflow you want to discuss,
            and shares them with NoahArk so the call can be scheduled and prepared. Legal basis:
            steps taken at your request before a possible contract (Article 6(1)(b) GDPR).
          </p>
          <p>
            <strong>Contacting NoahArk.</strong> If you get in touch by email or LinkedIn, what you
            send is used to reply. Legal basis: legitimate interest in answering enquiries
            (Article 6(1)(f) GDPR).
          </p>
          <p>
            Please do not include confidential documents or sensitive personal data when you book
            or write. If a workflow later needs sample documents, how they are shared is agreed
            separately and in writing.
          </p>

          <h2 id="cookies">3. Cookies and similar technologies</h2>
          <p>
            noahark.org sets no cookies of its own and uses no analytics or advertising tools. It
            stores one entry in your browser’s local storage, <code>noahark-consent</code>, to
            remember your cookie choice for {legal.consentMonths} months. This is strictly
            necessary and does not require consent.
          </p>
          <p>
            With your consent, the booking page loads Calendly’s calendar, and Calendly then sets
            its own cookies, as described in its{" "}
            <a href="https://calendly.com/legal/privacy-notice">privacy notice</a>. If you decline,
            the calendar does not load and you can open Calendly in a new tab instead.
          </p>
          <p>
            You can change or withdraw your choice at any time in the{" "}
            <CookieSettingsButton className="inline-button">cookie settings</CookieSettingsButton>.
          </p>

          <h2>4. Who receives your data</h2>
          <p>
            Data is shared only with the providers needed to run the website and bookings, and it
            is never sold.
          </p>
          <ul className="legal-list">
            <li>
              GitHub, Inc. hosts the website (
              <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">
                privacy statement
              </a>
              ).
            </li>
            <li>
              Calendly LLC provides the booking calendar (
              <a href="https://calendly.com/legal/privacy-notice">privacy notice</a>).
            </li>
          </ul>

          <h2>5. Transfers outside the EU</h2>
          <p>
            GitHub and Calendly are based in the United States, so your data may be processed
            there. Each provider describes the safeguards it uses for international transfers in
            its privacy notice.
          </p>

          <h2>6. How long data is kept</h2>
          <p>
            Booking details and correspondence are kept only as long as needed to handle your
            enquiry and any business relationship that follows, and for any period the law
            requires. Your cookie choice is kept for {legal.consentMonths} months, after which you
            are asked again.
          </p>

          <h2>7. Your rights</h2>
          <p>
            Under the GDPR you can ask to access, correct or delete your personal data, restrict
            or object to its processing, and receive it in a portable format. Where processing
            relies on your consent, you can withdraw it at any time without affecting processing
            that took place before.{" "}
            {contactEmail
              ? `To exercise these rights, email ${contactEmail}.`
              : "To exercise these rights, contact Noah directly, for example during or after your call."}
          </p>
          <p>
            You can also lodge a complaint with the French data protection authority, the{" "}
            <a href="https://www.cnil.fr/en">CNIL</a>, or with the authority in your own country.
          </p>

          <h2>8. Automated decisions</h2>
          <p>This website does not make automated decisions about visitors or build profiles.</p>

          <h2>9. Changes to this policy</h2>
          <p>
            This policy is updated when the website or its providers change. The date at the top
            shows the latest version.
          </p>
        </div>
      </article>
    </main>
  );
}

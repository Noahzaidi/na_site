import type { Metadata } from "next";
import Link from "next/link";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import { legal, regulations } from "@/content/legal";
import { formattedAddress, siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Legal notice",
  description: "Publisher, hosting and intellectual property information for noahark.org.",
  alternates: { canonical: "/legal/" },
};

export default function LegalNoticePage() {
  // Registration details appear only once they are provided in content/legal.ts.
  const publisher = [
    ["Publisher", `${legal.publisher}, operated by ${legal.director}`],
    ["Address", formattedAddress],
    ["Legal form", legal.legalForm],
    ["Registration number", legal.registrationNumber],
    ["VAT number", legal.vatNumber],
    ["Director of publication", legal.director],
  ].filter((row): row is [string, string] => Boolean(row[1]));

  return (
    <main id="main" className="section">
      <article className="wrap legal">
        <div className="mx-auto max-w-[44rem]">
          <p className="eyebrow">Legal</p>
          <h1 className="heading mt-5">Legal notice</h1>

          <h2>Publisher</h2>
          <dl className="legal-dl">
            {publisher.map(([term, value]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{value}</dd>
              </div>
            ))}
            {siteConfig.contactEmail && (
              <div>
                <dt>Contact</dt>
                <dd>
                  <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
                </dd>
              </div>
            )}
          </dl>

          <h2>Hosting</h2>
          <p>
            {legal.host.name}, {legal.host.address}. <a href={legal.host.url}>github.com</a>
          </p>

          <h2>Intellectual property</h2>
          <p>
            The NoahArk name, logo, text and illustrations on this website belong to NoahArk and
            may not be reused without permission.
          </p>
          <p>
            The background footage on the home page is NASA public-domain imagery (“ISS Airglow”,
            NASA Goddard Space Flight Center), used courtesy of NASA. Its use does not imply
            endorsement by NASA.
          </p>

          <h2>Regulation</h2>
          <p>
            Workflows are designed with the{" "}
            <a href={regulations.aiAct.url}>EU AI Act (Regulation (EU) 2024/1689)</a> and the{" "}
            <a href={regulations.gdpr.url}>GDPR (Regulation (EU) 2016/679)</a> in mind.
          </p>

          <h2>Personal data and cookies</h2>
          <p>
            See the <Link href="/privacy/">privacy policy</Link>. You can change your choice at
            any time in the{" "}
            <CookieSettingsButton className="inline-button">cookie settings</CookieSettingsButton>.
          </p>
        </div>
      </article>
    </main>
  );
}

// Facts used by the legal notice, privacy policy, cookie consent and footer.
// Registration fields stay null until Noah provides them; null lines are not
// shown on the site. Never fill them with guesses.
export const legal = {
  publisher: "NoahArk",
  director: "Noah Zaidi",
  legalForm: null as string | null, // e.g. "Entrepreneur individuel" or "SAS"
  registrationNumber: null as string | null, // SIREN / SIRET or RCS
  vatNumber: null as string | null,
  host: {
    name: "GitHub, Inc.",
    address: "88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, United States",
    url: "https://github.com",
  },
  policyUpdated: "13 September 2026",
  // How long a cookie choice is kept before visitors are asked again (CNIL recommends 6 months).
  consentMonths: 6,
};

export const regulations = {
  aiAct: {
    label: "EU AI Act",
    url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj",
  },
  gdpr: {
    label: "GDPR",
    url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj",
  },
} as const;

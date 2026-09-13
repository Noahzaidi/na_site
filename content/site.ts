const cleanHttpsUrl = (value: string | undefined) => {
  if (!value) return null;

  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
};

const cleanEmail = (value: string | undefined) => {
  const email = value?.trim().toLowerCase();
  return email && /^[^\s@]+@noahark\.org$/.test(email) ? email : null;
};

const DEFAULT_BOOKING_URL = "https://calendly.com/noahzaidi/30min";

// The Calendly calendar has its own page; every CTA leads here.
const BOOKING_PATH = "/book/";

const bookingUrl = cleanHttpsUrl(
  process.env.NEXT_PUBLIC_BOOKING_URL || DEFAULT_BOOKING_URL,
);
const contactEmail = cleanEmail(process.env.NEXT_PUBLIC_CONTACT_EMAIL);

// Only production builds are indexed; every other build is a noindex preview.
export const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";

export const siteConfig = {
  name: "NoahArk",
  url: "https://noahark.org",
  domain: "noahark.org",
  title: "NoahArk: specialised AI agents for business workflows",
  description:
    "NoahArk builds specialised AI agents and deploys them into the systems your team already uses, starting with one repetitive workflow such as invoices, purchase orders or a shared inbox.",
  brandLine: "Build. Deploy. Scale.",
  bookingUrl,
  bookingPath: BOOKING_PATH,
  contactEmail,
  contactHref: bookingUrl
    ? BOOKING_PATH
    : contactEmail
      ? `mailto:${contactEmail}?subject=${encodeURIComponent("A workflow I want to automate")}`
      : null,
  primaryCta: "Show me what you want to automate",
  bookingMicrocopy: "Free 30-minute discovery call. One workflow to discuss.",
  socialImage: "/og.jpg",
  linkedinUrl: "https://www.linkedin.com/in/noahzaidi/",
  address: {
    name: "Station F",
    street: "5 Parvis Alan Turing",
    postalCode: "75013",
    city: "Paris",
    country: "France",
    countryCode: "FR",
  },
} as const;

/** Calendly inline-embed URL for the booking iframe on /book/. */
export const calendlyEmbedUrl = (() => {
  if (!bookingUrl) return null;
  const url = new URL(bookingUrl);
  url.searchParams.set("embed_domain", siteConfig.domain);
  url.searchParams.set("embed_type", "Inline");
  url.searchParams.set("hide_event_type_details", "1");
  url.searchParams.set("background_color", "0b0f1a");
  url.searchParams.set("text_color", "f8fafc");
  url.searchParams.set("primary_color", "2563eb");
  return url.toString();
})();

export const formattedAddress = `${siteConfig.address.name}, ${siteConfig.address.street}, ${siteConfig.address.postalCode} ${siteConfig.address.city}, ${siteConfig.address.country}`;

export const primaryNav = [
  { label: "Workflows", href: "/#workflows" },
  { label: "Our approach", href: "/#approach" },
  { label: "About", href: "/about/" },
] as const;

export const bookNav = { label: "Book a call", href: BOOKING_PATH } as const;

export const hero = {
  headline:
    "We build specialised AI agents and put them to work in your business.",
  supporting:
    "From documents and invoices to CRM and ERP workflows, NoahArk deploys AI agents into the systems your team already uses.",
  secondaryCta: "Explore example workflows",
} as const;

// Optional ambient hero video. Set to null to show only the CSS horizon.
// Desktop only; the poster shows first and playback starts only when motion is
// allowed and the connection is not constrained.
export const heroVideo: {
  sources: readonly { src: string; type: string }[];
  poster: string;
} | null = {
  sources: [{ src: "/video/earth-hero.mp4", type: "video/mp4" }],
  poster: "/video/earth-hero.jpg",
};

export const workflowsSection = {
  heading: "Start with one repetitive workflow.",
  intro:
    "Invoices, purchase orders and shared inboxes can create repeated manual work. Start with a process your team can measure and review.",
} as const;

export const workflows = [
  {
    index: "01",
    scene: "invoice",
    title: "Invoice intake and ERP preparation.",
    description:
      "Extract invoice fields, check required information and prepare entries for review. Exceptions return to a person before any downstream action.",
    input: "Invoice or email attachment",
    action: "Extract, validate and prepare an ERP entry",
    checkpoint: "A person reviews exceptions and releases approved items",
  },
  {
    index: "02",
    scene: "purchase-order",
    title: "Purchase-order document checks.",
    description:
      "Compare incoming order documents with required fields and flag missing or inconsistent information for the operations team.",
    input: "Purchase order and supplier documents",
    action: "Compare required fields and surface inconsistencies",
    checkpoint: "Operations reviews every flagged document",
  },
  {
    index: "03",
    scene: "inbox",
    title: "Shared-inbox triage.",
    description:
      "Classify incoming operational requests and prepare routing or draft actions, with review where needed.",
    input: "Messages in a shared operations inbox",
    action: "Classify, route or prepare a draft response",
    checkpoint: "A person reviews uncertain or sensitive requests",
  },
] as const;

export type ProofEntry = {
  title: string;
  kind:
    | "Previous experience"
    | "Independent project"
    | "Prototype"
    | "Client deployment";
  problem: string;
  built: string;
  limitation: string;
  media:
    | { type: "video"; src: string; poster: string; width: number; height: number }
    | { type: "image"; src: string; alt: string; width: number; height: number };
};

export const proofSection = {
  heading: "See the work behind the promise.",
} as const;

// Add verified builds here. The section stays hidden while this list is empty.
export const proofEntries: ProofEntry[] = [];

// EU AI Act and GDPR are referenced lightly (here, the audit step and the FAQ).
// Only practices Noah confirmed: DPA on request, EU/on-prem hosting when
// required, AI Act check in the audit. NoahArk is not ISO certified.
export const approach = {
  heading: "A clear path from workflow to deployment.",
  intro:
    "Start with a free conversation about one workflow. Paid work begins only when the scope is clear.",
  supporting:
    "Deliverables, access requirements and success criteria are agreed in writing before work begins.",
  regulation:
    "Every workflow is designed with the EU AI Act and GDPR in mind: human oversight, logging and only the data the workflow needs.",
} as const;

export const engagementSteps = [
  {
    index: "01",
    title: "Discovery",
    body: "A free 30-minute conversation to understand one workflow and assess fit.",
  },
  {
    index: "02",
    title: "Paid workflow audit",
    body: "Map the process, establish a baseline, check EU AI Act and GDPR requirements, test the agreed approach and define a scoped deployment proposal.",
  },
  {
    index: "03",
    title: "Deployment sprint",
    body: "Build and pilot one agreed workflow, connect the agreed systems and add validation, logging and human review where required.",
    note: "A tightly scoped sprint targets 10 business days once scope, sample data, system access and a start date are agreed.",
  },
  {
    index: "04",
    title: "Ongoing improvement",
    body: "Maintain and improve the agreed deployment through a separately scoped engagement.",
  },
] as const;

// Verified against Noah's CV. Roles before NoahArk, not NoahArk client work.
export const about = {
  heading: "Work directly with the person building your workflow.",
  intro:
    "NoahArk is led by Noah Zaidi. You work directly with Noah from workflow scoping through implementation and handover.",
  context:
    "Noah's background runs through the same ground as the workflows on this site: accounting and banking operations, ERP implementation, and AI delivery for banks in regulated environments.",
  experienceNote: "Roles before NoahArk. These are not NoahArk client engagements.",
  experience: [
    {
      org: "FinoktAI",
      role: "Founder and AI delivery lead",
      body: "Built an on-premise document-intelligence platform for banking KYC/KYB: OCR, identity-document and MRZ extraction, LLM pipelines, validation rules, audit logging and an analyst review interface. The company has since wound down.",
    },
    {
      org: "ERP implementation",
      role: "ERP project manager and functional consultant",
      body: "Implemented Oracle Cloud, abas and Global Market ERP for retail and industry clients at Vivaliente, ABAS Iberica and Altera Software.",
    },
    {
      org: "Finance operations",
      role: "Accountant and banker",
      body: "Accounting on SAP (MM and FICO) at Smurfit Kappa and banking operations at Targobank. Invoice and ledger work, known from the desk rather than the diagram.",
    },
  ],
  certifications: [
    "Project Management Professional (PMP)®",
    "Oracle Financials Cloud: General Ledger 2022 Certified Implementation Professional",
  ],
  tools: [
    "Python",
    "SQL",
    "Docker",
    "LLM pipelines",
    "OCR and document extraction",
    "RAG",
    "Oracle Cloud / EBS",
    "SAP MM and FICO",
  ],
  location: "Station F, Paris",
  languages: "English, Spanish, French",
} as const;

export const bookingSection = {
  // Non-breaking hyphen keeps "30‑minute" on one line on phones.
  heading: "Book a free 30‑minute discovery call.",
  intro:
    "Pick a time that suits you. Bring one repetitive workflow and we will look at the process, the systems involved and whether a paid audit is the right next step.",
  points: [
    "Free, 30 minutes, one workflow",
    "Bring the process and the systems it touches",
    "No confidential documents needed",
  ],
} as const;

export const faqSection = {
  heading: "Questions teams ask first.",
  intro: "Anything not covered here is welcome on the call.",
} as const;

export const faqs = [
  {
    question: "Can you work with our existing systems?",
    answer:
      "Integration feasibility depends on available APIs, access and the agreed scope. We assess those constraints before a deployment sprint is sold.",
  },
  {
    question: "What happens when the AI is uncertain?",
    answer:
      "Validation rules and human review points are defined as part of the workflow design. Uncertain or failed items stay held until a person reviews them.",
  },
  {
    question: "Is the audit free?",
    answer:
      "No. The 30-minute discovery call is free. The workflow audit and implementation are paid engagements.",
  },
  {
    question: "How do we choose the first workflow?",
    answer:
      "Start with a narrow, measurable administrative process whose outputs your team can review. Repeated document or inbox work is often a useful place to begin.",
  },
  {
    question: "How is our data handled?",
    answer:
      "Access, hosting and providers are agreed for each deployment, including EU-hosted or on-premise options where required. Data handling is designed around the GDPR, and a Data Processing Agreement is available on request.",
  },
  {
    question: "How do you handle the EU AI Act?",
    answer:
      "The paid audit classifies the workflow under the EU AI Act and documents the human oversight, logging and transparency it needs. Which obligations apply depends on your use case and is confirmed with your legal or compliance team.",
  },
] as const;

export const finalCta = {
  heading: "What is your team still doing manually?",
  body: "Bring one repetitive workflow to a free 30-minute discovery call. We will discuss the process, the systems involved and whether a paid audit is the right next step.",
} as const;

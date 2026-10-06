// English copy: the source dictionary. es.ts and fr.ts must match its keys and
// list lengths (enforced by the Dictionary type). Placeholders such as
// {months} are filled with format(); paired tags such as <link>…</link> are
// rendered with rich(). Facts (URLs, addresses, emails) live in content/site.ts
// and content/legal.ts, not here.
export const en = {
  meta: {
    siteTitle: "NoahArk: specialised AI agents for business workflows",
    siteDescription:
      "NoahArk builds specialised AI agents and deploys them into the systems your team already uses, starting with one repetitive workflow such as invoices, purchase orders or a shared inbox.",
    socialAlt: "NoahArk: {headline}",
    notFoundTitle: "Page not found",
    pages: {
      about: {
        title: "About Noah Zaidi",
        description:
          "NoahArk is led by Noah Zaidi from Station F, Paris, with a background in finance operations, ERP implementation and AI delivery for banks.",
      },
      book: {
        title: "Book a discovery call",
        description:
          "Book a free 30-minute discovery call with Noah Zaidi at NoahArk. Bring one repetitive workflow to discuss.",
      },
      privacy: {
        title: "Privacy policy",
        description:
          "How NoahArk handles personal data on noahark.org and when you book a call, including cookies and your rights under the GDPR.",
      },
      legal: {
        title: "Legal notice",
        description: "Publisher, hosting and intellectual property information for noahark.org.",
      },
    },
  },

  common: {
    brandLine: "Build. Deploy. Scale.",
    primaryCta: "Show me what you want to automate",
    bookingMicrocopy: "Free 30-minute discovery call. One workflow to discuss.",
    bookCall: "Book a call",
    bookDiscoveryCall: "Book a discovery call",
    mailSubject: "A workflow I want to automate",
    newTab: "(opens in a new tab)",
    newTabLinkedIn: "(opens LinkedIn in a new tab)",
    newTabOfficial: "(opens the official text in a new tab)",
    nav: {
      workflows: "Workflows",
      approach: "Our approach",
      about: "About",
      book: "Book a call",
    },
  },

  header: {
    skipLink: "Skip to content",
    homeLabel: "NoahArk home",
    primaryNav: "Primary",
    menu: "Menu",
    changeLanguage: "Change language",
    language: "Language",
    // Each language named in the page language, under its own name in the menu.
    languageNames: { en: "English", es: "Spanish", fr: "French" },
  },

  footer: {
    nav: "Footer",
    about: "About",
    regulation:
      "Workflows designed with the <aiAct>EU AI Act</aiAct> and <gdpr>GDPR</gdpr> in mind.",
    privacy: "Privacy policy",
    legal: "Legal notice",
    cookieSettings: "Cookie settings",
  },

  media: {
    play: "Play",
    pause: "Pause",
    animation: "animation",
    playVideo: "Play background",
    pauseVideo: "Pause background",
  },

  home: {
    hero: {
      headline: "We build specialised AI agents and put them to work in your business.",
      supporting:
        "From documents and invoices to CRM and ERP workflows, NoahArk deploys AI agents into the systems your team already uses.",
      secondaryCta: "Explore example workflows",
    },

    illustration: {
      chip: "Illustrative workflow",
      summary:
        "An invoice moves through intake, extraction and validation. Items that pass validation become a proposed ERP entry that waits for approval. Items that fail validation are held for human review.",
      intake: {
        kicker: "Intake",
        title: "Supplier invoice received",
        meta: "PDF attached to an email in the accounts inbox",
      },
      extraction: {
        kicker: "Extraction",
        title: "Fields read from the document",
        fields: ["Supplier", "Invoice no.", "Total and VAT", "PO reference"],
      },
      validation: {
        kicker: "Validation",
        title: "Checked against business rules",
        required: "Required fields present",
        poMatched: "PO reference matched",
        poMissing: "PO reference not found",
        totals: "Totals and VAT consistent",
      },
      passed: {
        state: "Passed",
        title: "Proposed ERP entry",
        meta: "Waits for approval before posting",
      },
      failed: {
        state: "Failed",
        title: "Human review",
        meta: "Item held until a person resolves it",
      },
      caption: "Illustrative workflow design. Not a live system or a client deployment.",
    },

    workflows: {
      eyebrow: "Example workflows",
      heading: "Start with one repetitive workflow.",
      intro:
        "Invoices, purchase orders and shared inboxes can create repeated manual work. Start with a process your team can measure and review.",
      tag: "Possible workflow",
      inputLabel: "Input",
      actionLabel: "Proposed action",
      checkpointLabel: "Human checkpoint",
      items: {
        invoice: {
          title: "Invoice intake and ERP preparation.",
          description:
            "Extract invoice fields, check required information and prepare entries for review. Exceptions return to a person before any downstream action.",
          input: "Invoice or email attachment",
          action: "Extract, validate and prepare an ERP entry",
          checkpoint: "A person reviews exceptions and releases approved items",
        },
        "purchase-order": {
          title: "Purchase-order document checks.",
          description:
            "Compare incoming order documents with required fields and flag missing or inconsistent information for the operations team.",
          input: "Purchase order and supplier documents",
          action: "Compare required fields and surface inconsistencies",
          checkpoint: "Operations reviews every flagged document",
        },
        inbox: {
          title: "Shared-inbox triage.",
          description:
            "Classify incoming operational requests and prepare routing or draft actions, with review where needed.",
          input: "Messages in a shared operations inbox",
          action: "Classify, route or prepare a draft response",
          checkpoint: "A person reviews uncertain or sensitive requests",
        },
      },
    },

    // Labels inside the SVG workflow scenes. Keep them short: the drawings
    // have fixed proportions (pills and chips grow with the label).
    scenes: {
      invoice: {
        label:
          "Illustration: fields are read from an invoice and prepared as a draft ERP entry that waits for a person to approve it.",
        doc: "INVOICE",
        supplier: "Supplier",
        amount: "Amount",
        poRef: "PO ref.",
        erp: "ERP ENTRY",
        draft: "Draft",
        gate: "Approve to post",
      },
      purchaseOrder: {
        label:
          "Illustration: a supplier document is compared field by field with the purchase order, and a mismatched delivery date is flagged for the operations team.",
        po: "PURCHASE ORDER",
        supplierDoc: "SUPPLIER DOC",
        item: "Item",
        quantity: "Quantity",
        unitPrice: "Unit price",
        deliveryDate: "Delivery date",
        gate: "Flagged for operations",
      },
      inbox: {
        label:
          "Illustration: messages in a shared inbox are classified and routed to queues, and an uncertain request is held for a person to review.",
        inbox: "SHARED INBOX",
        orders: "ORDERS",
        deliveries: "DELIVERIES",
        review: "NEEDS REVIEW",
      },
    },

    proof: {
      eyebrow: "Real builds",
      heading: "See the work behind the promise.",
      problem: "The problem",
      built: "What was built",
      limitation: "Known limitation",
      kinds: {
        previous: "Previous experience",
        independent: "Independent project",
        prototype: "Prototype",
        client: "Client deployment",
      },
    },

    // EU AI Act and GDPR are referenced lightly (here, the audit step and the FAQ).
    // Only practices Noah confirmed: DPA on request, EU/on-prem hosting when
    // required, AI Act check in the audit. NoahArk is not ISO certified.
    approach: {
      eyebrow: "Our approach",
      heading: "A clear path from workflow to deployment.",
      intro:
        "Start with a free conversation about one workflow. Paid work begins only when the scope is clear.",
      supporting:
        "Deliverables, access requirements and success criteria are agreed in writing before work begins.",
      regulation:
        "Every workflow is designed with the EU AI Act and GDPR in mind: human oversight, logging and only the data the workflow needs.",
      steps: [
        {
          title: "Discovery",
          body: "A free 30-minute conversation to understand one workflow and assess fit.",
        },
        {
          title: "Paid workflow audit",
          body: "Map the process, establish a baseline, check EU AI Act and GDPR requirements, test the agreed approach and define a scoped deployment proposal.",
        },
        {
          title: "Deployment sprint",
          body: "Build and pilot one agreed workflow, connect the agreed systems and add validation, logging and human review where required.",
          note: "A tightly scoped sprint targets 10 business days once scope, sample data, system access and a start date are agreed.",
        },
        {
          title: "Ongoing improvement",
          body: "Maintain and improve the agreed deployment through a separately scoped engagement.",
        },
      ],
    },

    faq: {
      eyebrow: "FAQ",
      heading: "Questions teams ask first.",
      intro: "Anything not covered here is welcome on the call.",
      items: [
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
      ],
    },

    finalCta: {
      heading: "What is your team still doing manually?",
      body: "Bring one repetitive workflow to a free 30-minute discovery call. We will discuss the process, the systems involved and whether a paid audit is the right next step.",
    },
  },

  // Verified against Noah's CV. Roles before NoahArk, not NoahArk client work.
  about: {
    eyebrow: "About",
    heading: "Work directly with the person building your workflow.",
    intro:
      "NoahArk is led by Noah Zaidi. You work directly with Noah from workflow scoping through implementation and handover.",
    context:
      "Noah's background runs through the same ground as the workflows on this site: accounting and banking operations, ERP implementation, and AI delivery for banks in regulated environments.",
    linkedinCta: "Connect on LinkedIn",
    experienceTitle: "Previous experience",
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
    certificationsTitle: "Certifications",
    toolsTitle: "Works with",
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
    monogramAlt: "NoahArk monogram",
    ledBy: "Led by",
    basedAt: "Based at",
    worksIn: "Works in",
    languages: "English, Spanish, French",
    linkedin: "LinkedIn",
    connect: "Connect with Noah",
  },

  book: {
    // Non-breaking hyphen keeps "30‑minute" on one line on phones.
    heading: "Book a free 30‑minute discovery call.",
    intro:
      "Pick a time that suits you. Bring one repetitive workflow and we will look at the process, the systems involved and whether a paid audit is the right next step.",
    points: [
      "Free, 30 minutes, one workflow",
      "Bring the process and the systems it touches",
      "No confidential documents needed",
    ],
    host: "You’ll meet Noah Zaidi",
    hostRole: "Leads NoahArk · {location}",
    background: "Background",
    linkedin: "LinkedIn",
    emailFallback: "Email <email>{email}</email> with the workflow you want to discuss.",
  },

  calendly: {
    iframeTitle: "Choose a time for a 30-minute discovery call with Noah Zaidi",
    notLoading: "Calendar not loading? <link>Open the booking page in a new tab</link>.",
    eyebrow: "Booking calendar",
    heading: "Load the calendar to pick a time.",
    body: "The calendar is provided by Calendly, which sets its own cookies. Loading it saves your consent for this content. You can change it at any time in Cookie settings.",
    load: "Load the calendar",
    openNewTab: "Open Calendly in a new tab",
  },

  cookies: {
    title: "Your privacy",
    text: "This site uses no analytics or advertising cookies. With your permission, the booking page loads Calendly’s calendar, which sets its own cookies. See the <link>privacy policy</link>.",
    acceptAll: "Accept all",
    rejectNonEssential: "Reject non-essential",
    settings: "Settings",
    dialogTitle: "Cookie settings",
    dialogIntro:
      "Choose which optional content may load. Your choice is kept for {months} months and can be changed at any time from the footer.",
    essentialTitle: "Essential",
    essentialBody: "Remembers your cookie choice in your browser so the site can respect it.",
    alwaysOn: "Always on",
    externalTitle: "Booking calendar (Calendly)",
    externalBody: "Loads the calendar on the booking page. Calendly sets its own cookies.",
    save: "Save choices",
    close: "Close cookie settings",
  },

  privacy: {
    eyebrow: "Privacy policy",
    title: "How NoahArk handles your personal data.",
    lede: "This policy explains what personal data is processed when you visit noahark.org or book a call, why it is processed, and the rights you have under the General Data Protection Regulation (GDPR).",
    updated: "Last updated: {date}",
    responsible: {
      heading: "1. Who is responsible",
      body: "The controller of your personal data is {publisher}, run by {director}, {address}.",
      contact: "You can reach us at <email>{email}</email>.",
    },
    processing: {
      heading: "2. What is processed and why",
      visiting:
        "<strong>Visiting the website.</strong> The site is hosted on GitHub Pages. To deliver pages and keep the service secure, GitHub processes technical data such as your IP address, browser type and the pages requested. Legal basis: legitimate interest in running a secure website (Article 6(1)(f) GDPR).",
      booking:
        "<strong>Booking a call.</strong> When you book, Calendly collects the details you enter, such as your name, work email, company and the workflow you want to discuss, and shares them with NoahArk so the call can be scheduled and prepared. Legal basis: steps taken at your request before a possible contract (Article 6(1)(b) GDPR).",
      contacting:
        "<strong>Contacting NoahArk.</strong> If you get in touch by email or LinkedIn, what you send is used to reply. Legal basis: legitimate interest in answering enquiries (Article 6(1)(f) GDPR).",
      noConfidential:
        "Please do not include confidential documents or sensitive personal data when you book or write. If a workflow later needs sample documents, how they are shared is agreed separately and in writing.",
    },
    cookies: {
      heading: "3. Cookies and similar technologies",
      storage:
        "noahark.org sets no cookies of its own and uses no analytics or advertising tools. It stores one entry in your browser’s local storage, <code>noahark-consent</code>, to remember your cookie choice for {months} months. This is strictly necessary and does not require consent.",
      calendly:
        "With your consent, the booking page loads Calendly’s calendar, and Calendly then sets its own cookies, as described in its <link>privacy notice</link>. If you decline, the calendar does not load and you can open Calendly in a new tab instead.",
      change:
        "You can change or withdraw your choice at any time in the <settings>cookie settings</settings>.",
    },
    recipients: {
      heading: "4. Who receives your data",
      intro:
        "Data is shared only with the providers needed to run the website and bookings, and it is never sold.",
      github: "GitHub, Inc. hosts the website (<link>privacy statement</link>).",
      calendly: "Calendly LLC provides the booking calendar (<link>privacy notice</link>).",
    },
    transfers: {
      heading: "5. Transfers outside the EU",
      body: "GitHub and Calendly are based in the United States, so your data may be processed there. Each provider describes the safeguards it uses for international transfers in its privacy notice.",
    },
    retention: {
      heading: "6. How long data is kept",
      body: "Booking details and correspondence are kept only as long as needed to handle your enquiry and any business relationship that follows, and for any period the law requires. Your cookie choice is kept for {months} months, after which you are asked again.",
    },
    rights: {
      heading: "7. Your rights",
      body: "Under the GDPR you can ask to access, correct or delete your personal data, restrict or object to its processing, and receive it in a portable format. Where processing relies on your consent, you can withdraw it at any time without affecting processing that took place before.",
      exerciseEmail: "To exercise these rights, email {email}.",
      exerciseNoEmail:
        "To exercise these rights, contact Noah directly, for example during or after your call.",
      complaint:
        "You can also lodge a complaint with the French data protection authority, the <link>CNIL</link>, or with the authority in your own country.",
    },
    automated: {
      heading: "8. Automated decisions",
      body: "This website does not make automated decisions about visitors or build profiles.",
    },
    changes: {
      heading: "9. Changes to this policy",
      body: "This policy is updated when the website or its providers change. The date at the top shows the latest version.",
    },
  },

  legal: {
    eyebrow: "Legal",
    title: "Legal notice",
    publisherHeading: "Publisher",
    rows: {
      publisher: "Publisher",
      publisherValue: "{publisher}, operated by {director}",
      address: "Address",
      legalForm: "Legal form",
      registrationNumber: "Registration number",
      vatNumber: "VAT number",
      director: "Director of publication",
      contact: "Contact",
    },
    hostingHeading: "Hosting",
    ipHeading: "Intellectual property",
    ipOwnership:
      "The NoahArk name, logo, text and illustrations on this website belong to NoahArk and may not be reused without permission.",
    ipFootage:
      "The background footage on the home page is NASA public-domain imagery (“ISS Airglow”, NASA Goddard Space Flight Center), used courtesy of NASA. Its use does not imply endorsement by NASA.",
    regulationHeading: "Regulation",
    regulation:
      "Workflows are designed with the <aiAct>EU AI Act (Regulation (EU) 2024/1689)</aiAct> and the <gdpr>GDPR (Regulation (EU) 2016/679)</gdpr> in mind.",
    dataHeading: "Personal data and cookies",
    data: "See the <privacy>privacy policy</privacy>. You can change your choice at any time in the <settings>cookie settings</settings>.",
  },

  notFound: {
    eyebrow: "404",
    heading: "This page is not part of the workflow.",
    body: "The link may be out of date or mistyped. Head back to the homepage, or bring your workflow straight to a call.",
    home: "Back to the homepage",
  },
} as const;

import type { Dictionary } from "./types";

// French copy, addressing the reader as "vous". French typography: a
// no-break space ( ) before ":" and a narrow no-break space ( )
// before "?", "!" and ";".
export const fr: Dictionary = {
  meta: {
    siteTitle: "NoahArk : des agents d’IA spécialisés pour vos processus métier",
    siteDescription:
      "NoahArk conçoit des agents d’IA spécialisés et les déploie dans les systèmes que votre équipe utilise déjà, en commençant par un processus répétitif comme les factures, les bons de commande ou une boîte mail partagée.",
    socialAlt: "NoahArk : {headline}",
    notFoundTitle: "Page introuvable",
    pages: {
      about: {
        title: "À propos de Noah Zaidi",
        description:
          "NoahArk est dirigée par Noah Zaidi depuis Station F, à Paris, avec une expérience en opérations financières, en intégration d’ERP et en déploiement d’IA pour les banques.",
      },
      book: {
        title: "Réserver un appel découverte",
        description:
          "Réservez un appel découverte gratuit de 30 minutes avec Noah Zaidi, de NoahArk. Venez avec un processus répétitif à discuter.",
      },
      privacy: {
        title: "Politique de confidentialité",
        description:
          "Comment NoahArk traite les données personnelles sur noahark.org et lorsque vous réservez un appel, y compris les cookies et vos droits au titre du RGPD.",
      },
      legal: {
        title: "Mentions légales",
        description:
          "Informations sur l’éditeur, l’hébergement et la propriété intellectuelle de noahark.org.",
      },
    },
  },

  common: {
    brandLine: "Construire. Déployer. Étendre.",
    primaryCta: "Montrez-moi ce que vous voulez automatiser",
    bookingMicrocopy: "Appel découverte gratuit de 30 minutes. Un processus à discuter.",
    bookCall: "Réserver un appel",
    bookDiscoveryCall: "Réserver un appel découverte",
    mailSubject: "Un processus que je souhaite automatiser",
    newTab: "(s’ouvre dans un nouvel onglet)",
    newTabLinkedIn: "(ouvre LinkedIn dans un nouvel onglet)",
    newTabOfficial: "(ouvre le texte officiel dans un nouvel onglet)",
    nav: {
      workflows: "Processus",
      approach: "Notre approche",
      about: "À propos",
      book: "Réserver un appel",
    },
  },

  header: {
    skipLink: "Aller au contenu",
    homeLabel: "Accueil NoahArk",
    primaryNav: "Principale",
    menu: "Menu",
    changeLanguage: "Changer de langue",
    language: "Langue",
    languageNames: { en: "Anglais", es: "Espagnol", fr: "Français" },
  },

  footer: {
    nav: "Pied de page",
    about: "À propos",
    regulation:
      "Processus conçus en tenant compte du <aiAct>règlement européen sur l’IA</aiAct> et du <gdpr>RGPD</gdpr>.",
    privacy: "Politique de confidentialité",
    legal: "Mentions légales",
    cookieSettings: "Paramètres des cookies",
  },

  media: {
    play: "Lecture",
    pause: "Pause",
    animation: "de l’animation",
    playVideo: "Lire la vidéo",
    pauseVideo: "Mettre la vidéo en pause",
  },

  home: {
    hero: {
      headline:
        "Nous concevons des agents d’IA spécialisés et les mettons au travail dans votre entreprise.",
      supporting:
        "Des documents et factures aux processus CRM et ERP, NoahArk déploie des agents d’IA dans les systèmes que votre équipe utilise déjà.",
      secondaryCta: "Découvrir des exemples de processus",
    },

    illustration: {
      chip: "Processus illustratif",
      summary:
        "Une facture passe par la réception, l’extraction et la validation. Les éléments validés deviennent une proposition d’écriture ERP en attente d’approbation. Les éléments non validés sont mis en attente pour une vérification humaine.",
      intake: {
        kicker: "Réception",
        title: "Facture fournisseur reçue",
        meta: "PDF joint à un e-mail dans la boîte de la comptabilité",
      },
      extraction: {
        kicker: "Extraction",
        title: "Champs lus dans le document",
        fields: ["Fournisseur", "N° de facture", "Total et TVA", "Référence de commande"],
      },
      validation: {
        kicker: "Validation",
        title: "Contrôle selon les règles métier",
        required: "Champs obligatoires présents",
        poMatched: "Référence de commande trouvée",
        poMissing: "Référence de commande introuvable",
        totals: "Totaux et TVA cohérents",
      },
      passed: {
        state: "Validé",
        title: "Proposition d’écriture ERP",
        meta: "En attente d’approbation avant comptabilisation",
      },
      failed: {
        state: "Non validé",
        title: "Vérification humaine",
        meta: "Élément en attente jusqu’à ce qu’une personne le traite",
      },
      caption:
        "Conception illustrative d’un processus. Ni un système en production, ni un déploiement client.",
    },

    workflows: {
      eyebrow: "Exemples de processus",
      heading: "Commencez par un processus répétitif.",
      intro:
        "Les factures, les bons de commande et les boîtes mail partagées peuvent générer un travail manuel répété. Commencez par un processus que votre équipe peut mesurer et vérifier.",
      tag: "Processus possible",
      inputLabel: "Entrée",
      actionLabel: "Action proposée",
      checkpointLabel: "Contrôle humain",
      items: {
        invoice: {
          title: "Réception des factures et préparation dans l’ERP.",
          description:
            "Extraire les champs des factures, vérifier les informations obligatoires et préparer les écritures pour validation. Les exceptions reviennent à une personne avant toute action en aval.",
          input: "Facture ou pièce jointe d’e-mail",
          action: "Extraire, valider et préparer une écriture dans l’ERP",
          checkpoint: "Une personne examine les exceptions et libère les éléments approuvés",
        },
        "purchase-order": {
          title: "Contrôle des documents de bons de commande.",
          description:
            "Comparer les documents de commande entrants aux champs obligatoires et signaler les informations manquantes ou incohérentes à l’équipe des opérations.",
          input: "Bon de commande et documents fournisseur",
          action: "Comparer les champs obligatoires et faire ressortir les incohérences",
          checkpoint: "L’équipe des opérations examine chaque document signalé",
        },
        inbox: {
          title: "Tri de la boîte mail partagée.",
          description:
            "Classer les demandes opérationnelles entrantes et préparer leur acheminement ou des projets d’action, avec une vérification si nécessaire.",
          input: "Messages d’une boîte mail partagée des opérations",
          action: "Classer, acheminer ou préparer un projet de réponse",
          checkpoint: "Une personne examine les demandes incertaines ou sensibles",
        },
      },
    },

    scenes: {
      invoice: {
        label:
          "Illustration : les champs d’une facture sont lus et préparés sous forme de brouillon d’écriture ERP, en attente de validation par une personne.",
        doc: "FACTURE",
        supplier: "Fournisseur",
        amount: "Montant",
        poRef: "Réf. BC",
        erp: "ERP",
        draft: "Brouillon",
        gate: "Valider l’écriture",
      },
      purchaseOrder: {
        label:
          "Illustration : un document fournisseur est comparé champ par champ au bon de commande, et une date de livraison non conforme est signalée à l’équipe des opérations.",
        po: "COMMANDE",
        supplierDoc: "FOURNISSEUR",
        item: "Article",
        quantity: "Quantité",
        unitPrice: "Prix unitaire",
        deliveryDate: "Date de livraison",
        gate: "Signalé aux opérations",
      },
      inbox: {
        label:
          "Illustration : les messages d’une boîte mail partagée sont classés et acheminés vers des files, et une demande incertaine est mise en attente pour vérification humaine.",
        inbox: "BOÎTE PARTAGÉE",
        orders: "COMMANDES",
        deliveries: "LIVRAISONS",
        review: "À VÉRIFIER",
      },
    },

    proof: {
      eyebrow: "Réalisations",
      heading: "Le travail derrière la promesse.",
      problem: "Le problème",
      built: "Ce qui a été construit",
      limitation: "Limite connue",
      kinds: {
        previous: "Expérience antérieure",
        independent: "Projet indépendant",
        prototype: "Prototype",
        client: "Déploiement client",
      },
    },

    approach: {
      eyebrow: "Notre approche",
      heading: "Un chemin clair, du processus au déploiement.",
      intro:
        "Commencez par un échange gratuit autour d’un processus. Le travail payant ne commence qu’une fois le périmètre clairement défini.",
      supporting:
        "Les livrables, les accès nécessaires et les critères de réussite sont convenus par écrit avant le début des travaux.",
      regulation:
        "Chaque processus est conçu en tenant compte du règlement européen sur l’IA et du RGPD : supervision humaine, journalisation et uniquement les données dont le processus a besoin.",
      steps: [
        {
          title: "Découverte",
          body: "Un échange gratuit de 30 minutes pour comprendre un processus et évaluer l’adéquation.",
        },
        {
          title: "Audit payant du processus",
          body: "Cartographier le processus, établir une situation de référence, vérifier les exigences du règlement européen sur l’IA et du RGPD, tester l’approche convenue et définir une proposition de déploiement au périmètre précis.",
        },
        {
          title: "Sprint de déploiement",
          body: "Construire et piloter un processus convenu, connecter les systèmes convenus et ajouter validation, journalisation et vérification humaine si nécessaire.",
          note: "Un sprint au périmètre resserré vise 10 jours ouvrés une fois convenus le périmètre, les données d’exemple, les accès aux systèmes et la date de démarrage.",
        },
        {
          title: "Amélioration continue",
          body: "Maintenir et améliorer le déploiement convenu dans le cadre d’une mission au périmètre distinct.",
        },
      ],
    },

    faq: {
      eyebrow: "FAQ",
      heading: "Les questions que les équipes posent en premier.",
      intro: "Tout ce qui n’est pas abordé ici peut l’être pendant l’appel.",
      items: [
        {
          question: "Pouvez-vous travailler avec nos systèmes existants ?",
          answer:
            "La faisabilité de l’intégration dépend des API disponibles, des accès et du périmètre convenu. Nous évaluons ces contraintes avant de proposer un sprint de déploiement.",
        },
        {
          question: "Que se passe-t-il lorsque l’IA a un doute ?",
          answer:
            "Les règles de validation et les points de vérification humaine sont définis lors de la conception du processus. Les éléments incertains ou en échec restent en attente jusqu’à ce qu’une personne les examine.",
        },
        {
          question: "L’audit est-il gratuit ?",
          answer:
            "Non. L’appel découverte de 30 minutes est gratuit. L’audit du processus et la mise en œuvre sont des prestations payantes.",
        },
        {
          question: "Comment choisir le premier processus ?",
          answer:
            "Commencez par un processus administratif circonscrit et mesurable, dont votre équipe peut vérifier les résultats. Le traitement répétitif de documents ou d’e-mails est souvent un bon point de départ.",
        },
        {
          question: "Comment nos données sont-elles traitées ?",
          answer:
            "Les accès, l’hébergement et les prestataires sont convenus pour chaque déploiement, y compris des options hébergées dans l’UE ou sur site si nécessaire. Le traitement des données est conçu autour du RGPD, et un accord de traitement des données (DPA) est disponible sur demande.",
        },
        {
          question: "Comment prenez-vous en compte le règlement européen sur l’IA ?",
          answer:
            "L’audit payant classe le processus au regard du règlement européen sur l’IA et documente la supervision humaine, la journalisation et la transparence nécessaires. Les obligations applicables dépendent de votre cas d’usage et sont confirmées avec votre équipe juridique ou conformité.",
        },
      ],
    },

    finalCta: {
      heading: "Que fait encore votre équipe à la main ?",
      body: "Venez avec un processus répétitif à un appel découverte gratuit de 30 minutes. Nous parlerons du processus, des systèmes concernés et de l’intérêt d’un audit payant comme prochaine étape.",
    },
  },

  about: {
    eyebrow: "À propos",
    heading: "Travaillez directement avec la personne qui construit votre processus.",
    intro:
      "NoahArk est dirigée par Noah Zaidi. Vous travaillez directement avec Noah, du cadrage du processus jusqu’à la mise en œuvre et la passation.",
    context:
      "Le parcours de Noah couvre le même terrain que les processus présentés sur ce site : opérations comptables et bancaires, intégration d’ERP et déploiement d’IA pour des banques dans des environnements réglementés.",
    linkedinCta: "Échanger sur LinkedIn",
    experienceTitle: "Expérience antérieure",
    experienceNote:
      "Postes occupés avant NoahArk. Il ne s’agit pas de missions clients de NoahArk.",
    experience: [
      {
        org: "FinoktAI",
        role: "Fondateur et responsable du déploiement IA",
        body: "A conçu une plateforme d’intelligence documentaire sur site pour le KYC/KYB bancaire : OCR, extraction de pièces d’identité et de zones MRZ, pipelines LLM, règles de validation, journal d’audit et interface de vérification pour les analystes. L’entreprise a depuis cessé son activité.",
      },
      {
        org: "Intégration d’ERP",
        role: "Chef de projet ERP et consultant fonctionnel",
        body: "A mis en œuvre Oracle Cloud, abas et Global Market ERP pour des clients de la distribution et de l’industrie chez Vivaliente, ABAS Iberica et Altera Software.",
      },
      {
        org: "Opérations financières",
        role: "Comptable et banquier",
        body: "Comptabilité sur SAP (MM et FICO) chez Smurfit Kappa et opérations bancaires chez Targobank. Le travail sur les factures et le grand livre, connu depuis le poste de travail plutôt que depuis le schéma.",
      },
    ],
    certificationsTitle: "Certifications",
    toolsTitle: "Outils et méthodes",
    tools: [
      "Python",
      "SQL",
      "Docker",
      "Pipelines LLM",
      "OCR et extraction de documents",
      "RAG",
      "Oracle Cloud / EBS",
      "SAP MM et FICO",
    ],
    monogramAlt: "Monogramme NoahArk",
    ledBy: "Dirigée par",
    basedAt: "Basée à",
    worksIn: "Langues de travail",
    languages: "Anglais, espagnol, français",
    linkedin: "LinkedIn",
    connect: "Échanger avec Noah",
  },

  book: {
    heading: "Réservez un appel découverte gratuit de 30 minutes.",
    intro:
      "Choisissez le créneau qui vous convient. Venez avec un processus répétitif : nous examinerons le processus, les systèmes concernés et l’intérêt d’un audit payant comme prochaine étape.",
    points: [
      "Gratuit, 30 minutes, un processus",
      "Présentez le processus et les systèmes concernés",
      "Aucun document confidentiel nécessaire",
    ],
    host: "Vous rencontrerez Noah Zaidi",
    hostRole: "Dirige NoahArk · {location}",
    background: "Parcours",
    linkedin: "LinkedIn",
    emailFallback:
      "Écrivez à <email>{email}</email> en décrivant le processus dont vous souhaitez parler.",
  },

  calendly: {
    iframeTitle: "Choisissez un créneau pour un appel découverte de 30 minutes avec Noah Zaidi",
    notLoading:
      "Le calendrier ne se charge pas ? <link>Ouvrez la page de réservation dans un nouvel onglet</link>.",
    eyebrow: "Calendrier de réservation",
    heading: "Chargez le calendrier pour choisir un créneau.",
    body: "Le calendrier est fourni par Calendly, qui dépose ses propres cookies. Le charger enregistre votre consentement pour ce contenu. Vous pouvez le modifier à tout moment dans les paramètres des cookies.",
    load: "Charger le calendrier",
    openNewTab: "Ouvrir Calendly dans un nouvel onglet",
  },

  cookies: {
    title: "Votre vie privée",
    text: "Ce site n’utilise aucun cookie d’analyse ni de publicité. Avec votre accord, la page de réservation charge le calendrier de Calendly, qui dépose ses propres cookies. Consultez la <link>politique de confidentialité</link>.",
    acceptAll: "Tout accepter",
    rejectNonEssential: "Refuser les non essentiels",
    settings: "Paramètres",
    dialogTitle: "Paramètres des cookies",
    dialogIntro:
      "Choisissez les contenus facultatifs qui peuvent se charger. Votre choix est conservé {months} mois et peut être modifié à tout moment depuis le pied de page.",
    essentialTitle: "Essentiels",
    essentialBody:
      "Mémorisent votre choix concernant les cookies dans votre navigateur afin que le site puisse le respecter.",
    alwaysOn: "Toujours actifs",
    externalTitle: "Calendrier de réservation (Calendly)",
    externalBody:
      "Charge le calendrier sur la page de réservation. Calendly dépose ses propres cookies.",
    save: "Enregistrer mes choix",
    close: "Fermer les paramètres des cookies",
  },

  privacy: {
    eyebrow: "Politique de confidentialité",
    title: "Comment NoahArk traite vos données personnelles.",
    lede: "Cette politique explique quelles données personnelles sont traitées lorsque vous visitez noahark.org ou réservez un appel, pourquoi elles le sont, et les droits dont vous disposez en vertu du règlement général sur la protection des données (RGPD).",
    updated: "Dernière mise à jour : {date}",
    responsible: {
      heading: "1. Responsable du traitement",
      body: "Le responsable du traitement de vos données personnelles est {publisher}, dirigée par {director}, {address}.",
      contact: "Vous pouvez nous écrire à <email>{email}</email>.",
    },
    processing: {
      heading: "2. Données traitées et finalités",
      visiting:
        "<strong>Visite du site.</strong> Le site est hébergé sur GitHub Pages. Pour afficher les pages et assurer la sécurité du service, GitHub traite des données techniques telles que votre adresse IP, le type de navigateur et les pages demandées. Base légale : intérêt légitime à exploiter un site web sécurisé (article 6, paragraphe 1, point f), du RGPD).",
      booking:
        "<strong>Réservation d’un appel.</strong> Lorsque vous réservez, Calendly collecte les informations que vous saisissez, comme votre nom, votre adresse e-mail professionnelle, votre entreprise et le processus dont vous souhaitez parler, et les transmet à NoahArk afin que l’appel puisse être planifié et préparé. Base légale : mesures précontractuelles prises à votre demande (article 6, paragraphe 1, point b), du RGPD).",
      contacting:
        "<strong>Contact avec NoahArk.</strong> Si vous nous contactez par e-mail ou sur LinkedIn, ce que vous envoyez est utilisé pour vous répondre. Base légale : intérêt légitime à répondre aux demandes (article 6, paragraphe 1, point f), du RGPD).",
      noConfidential:
        "Merci de ne pas inclure de documents confidentiels ni de données personnelles sensibles lorsque vous réservez ou écrivez. Si un processus nécessite ensuite des documents d’exemple, leurs modalités de partage sont convenues séparément et par écrit.",
    },
    cookies: {
      heading: "3. Cookies et technologies similaires",
      storage:
        "noahark.org ne dépose aucun cookie propre et n’utilise aucun outil d’analyse ni de publicité. Le site enregistre une seule entrée dans le stockage local de votre navigateur, <code>noahark-consent</code>, pour mémoriser votre choix concernant les cookies pendant {months} mois. Cette entrée est strictement nécessaire et ne requiert pas de consentement.",
      calendly:
        "Avec votre consentement, la page de réservation charge le calendrier de Calendly, qui dépose alors ses propres cookies, comme décrit dans sa <link>politique de confidentialité</link>. Si vous refusez, le calendrier ne se charge pas et vous pouvez ouvrir Calendly dans un nouvel onglet à la place.",
      change:
        "Vous pouvez modifier ou retirer votre choix à tout moment dans les <settings>paramètres des cookies</settings>.",
    },
    recipients: {
      heading: "4. Destinataires des données",
      intro:
        "Les données ne sont partagées qu’avec les prestataires nécessaires au fonctionnement du site et des réservations, et ne sont jamais vendues.",
      github: "GitHub, Inc. héberge le site (<link>déclaration de confidentialité</link>).",
      calendly:
        "Calendly LLC fournit le calendrier de réservation (<link>politique de confidentialité</link>).",
    },
    transfers: {
      heading: "5. Transferts hors de l’UE",
      body: "GitHub et Calendly sont établis aux États-Unis ; vos données peuvent donc y être traitées. Chaque prestataire décrit dans sa politique de confidentialité les garanties qu’il applique aux transferts internationaux.",
    },
    retention: {
      heading: "6. Durée de conservation",
      body: "Les informations de réservation et la correspondance ne sont conservées que le temps nécessaire au traitement de votre demande et de toute relation commerciale qui en découle, ainsi que pendant toute durée imposée par la loi. Votre choix concernant les cookies est conservé {months} mois, après quoi il vous est de nouveau demandé.",
    },
    rights: {
      heading: "7. Vos droits",
      body: "En vertu du RGPD, vous pouvez demander l’accès à vos données personnelles, leur rectification ou leur effacement, la limitation de leur traitement ou vous y opposer, et les recevoir dans un format portable. Lorsque le traitement repose sur votre consentement, vous pouvez le retirer à tout moment, sans que cela remette en cause le traitement effectué auparavant.",
      exerciseEmail: "Pour exercer ces droits, écrivez à {email}.",
      exerciseNoEmail:
        "Pour exercer ces droits, contactez directement Noah, par exemple pendant ou après votre appel.",
      complaint:
        "Vous pouvez également introduire une réclamation auprès de l’autorité française de protection des données, la <link>CNIL</link>, ou auprès de l’autorité de votre propre pays.",
    },
    automated: {
      heading: "8. Décisions automatisées",
      body: "Ce site ne prend aucune décision automatisée concernant les visiteurs et ne crée pas de profils.",
    },
    changes: {
      heading: "9. Modifications de cette politique",
      body: "Cette politique est mise à jour lorsque le site ou ses prestataires changent. La date indiquée en haut correspond à la dernière version.",
    },
  },

  legal: {
    eyebrow: "Informations légales",
    title: "Mentions légales",
    publisherHeading: "Éditeur",
    rows: {
      publisher: "Éditeur",
      publisherValue: "{publisher}, exploité par {director}",
      address: "Adresse",
      legalForm: "Forme juridique",
      registrationNumber: "Numéro d’immatriculation",
      vatNumber: "Numéro de TVA",
      director: "Directeur de la publication",
      contact: "Contact",
    },
    hostingHeading: "Hébergement",
    ipHeading: "Propriété intellectuelle",
    ipOwnership:
      "Le nom, le logo, les textes et les illustrations de NoahArk présents sur ce site appartiennent à NoahArk et ne peuvent être réutilisés sans autorisation.",
    ipFootage:
      "Les images d’arrière-plan de la page d’accueil proviennent du domaine public de la NASA (« ISS Airglow », NASA Goddard Space Flight Center) et sont utilisées avec l’aimable autorisation de la NASA. Leur utilisation n’implique aucune approbation de la part de la NASA.",
    regulationHeading: "Réglementation",
    regulation:
      "Les processus sont conçus en tenant compte du <aiAct>règlement européen sur l’IA (règlement (UE) 2024/1689)</aiAct> et du <gdpr>RGPD (règlement (UE) 2016/679)</gdpr>.",
    dataHeading: "Données personnelles et cookies",
    data: "Consultez la <privacy>politique de confidentialité</privacy>. Vous pouvez modifier votre choix à tout moment dans les <settings>paramètres des cookies</settings>.",
  },

  notFound: {
    eyebrow: "404",
    heading: "Cette page ne fait pas partie du processus.",
    body: "Le lien est peut-être obsolète ou mal saisi. Revenez à la page d’accueil, ou présentez directement votre processus lors d’un appel.",
    home: "Retour à la page d’accueil",
  },
};

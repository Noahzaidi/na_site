import type { Dictionary } from "./types";

// Spanish copy. Informal "tú", broadly understandable (not regional) Spanish.
export const es: Dictionary = {
  meta: {
    siteTitle: "NoahArk: agentes de IA especializados para flujos de trabajo empresariales",
    siteDescription:
      "NoahArk crea agentes de IA especializados y los despliega en los sistemas que tu equipo ya utiliza, empezando por un flujo de trabajo repetitivo como facturas, órdenes de compra o un buzón compartido.",
    socialAlt: "NoahArk: {headline}",
    notFoundTitle: "Página no encontrada",
    pages: {
      about: {
        title: "Sobre Noah Zaidi",
        description:
          "NoahArk está dirigida por Noah Zaidi desde Station F, en París, con experiencia en operaciones financieras, implantación de ERP y entrega de proyectos de IA para bancos.",
      },
      book: {
        title: "Reserva una llamada de descubrimiento",
        description:
          "Reserva una llamada de descubrimiento gratuita de 30 minutos con Noah Zaidi, de NoahArk. Trae un flujo de trabajo repetitivo para comentarlo.",
      },
      privacy: {
        title: "Política de privacidad",
        description:
          "Cómo trata NoahArk los datos personales en noahark.org y cuando reservas una llamada, incluidas las cookies y tus derechos según el RGPD.",
      },
      legal: {
        title: "Aviso legal",
        description:
          "Información sobre el editor, el alojamiento y la propiedad intelectual de noahark.org.",
      },
    },
  },

  common: {
    brandLine: "Crear. Desplegar. Escalar.",
    primaryCta: "Muéstrame qué quieres automatizar",
    bookingMicrocopy:
      "Llamada de descubrimiento gratuita de 30 minutos. Un flujo de trabajo para comentar.",
    bookCall: "Reserva una llamada",
    bookDiscoveryCall: "Reserva una llamada de descubrimiento",
    mailSubject: "Un flujo de trabajo que quiero automatizar",
    newTab: "(se abre en una pestaña nueva)",
    newTabLinkedIn: "(abre LinkedIn en una pestaña nueva)",
    newTabOfficial: "(abre el texto oficial en una pestaña nueva)",
    nav: {
      workflows: "Flujos de trabajo",
      approach: "Nuestro enfoque",
      about: "Acerca de",
      book: "Reserva una llamada",
    },
  },

  header: {
    skipLink: "Saltar al contenido",
    homeLabel: "Inicio de NoahArk",
    primaryNav: "Principal",
    menu: "Menú",
    changeLanguage: "Cambiar idioma",
    language: "Idioma",
    languageNames: { en: "Inglés", es: "Español", fr: "Francés" },
  },

  footer: {
    nav: "Pie de página",
    about: "Acerca de",
    regulation:
      "Flujos de trabajo diseñados teniendo en cuenta el <aiAct>Reglamento de IA de la UE</aiAct> y el <gdpr>RGPD</gdpr>.",
    privacy: "Política de privacidad",
    legal: "Aviso legal",
    cookieSettings: "Configuración de cookies",
  },

  media: {
    play: "Reproducir",
    pause: "Pausar",
    animation: "la animación",
    playVideo: "Reproducir vídeo",
    pauseVideo: "Pausar vídeo",
  },

  home: {
    hero: {
      headline: "Creamos agentes de IA especializados y los ponemos a trabajar en tu empresa.",
      supporting:
        "Desde documentos y facturas hasta flujos de CRM y ERP, NoahArk despliega agentes de IA en los sistemas que tu equipo ya utiliza.",
      secondaryCta: "Ver ejemplos de flujos de trabajo",
    },

    illustration: {
      chip: "Flujo ilustrativo",
      summary:
        "Una factura pasa por recepción, extracción y validación. Los elementos que superan la validación se convierten en un asiento de ERP propuesto que espera aprobación. Los que no la superan quedan retenidos para revisión humana.",
      intake: {
        kicker: "Recepción",
        title: "Factura de proveedor recibida",
        meta: "PDF adjunto a un correo en el buzón de contabilidad",
      },
      extraction: {
        kicker: "Extracción",
        title: "Campos leídos del documento",
        fields: ["Proveedor", "N.º de factura", "Total e IVA", "Referencia de pedido"],
      },
      validation: {
        kicker: "Validación",
        title: "Comprobada con las reglas de negocio",
        required: "Campos obligatorios presentes",
        poMatched: "Referencia de pedido encontrada",
        poMissing: "Referencia de pedido no encontrada",
        totals: "Totales e IVA coherentes",
      },
      passed: {
        state: "Superada",
        title: "Asiento de ERP propuesto",
        meta: "Espera aprobación antes de contabilizarse",
      },
      failed: {
        state: "No superada",
        title: "Revisión humana",
        meta: "Elemento retenido hasta que una persona lo resuelva",
      },
      caption:
        "Diseño ilustrativo de un flujo de trabajo. No es un sistema en producción ni un despliegue para un cliente.",
    },

    workflows: {
      eyebrow: "Ejemplos de flujos de trabajo",
      heading: "Empieza con un flujo de trabajo repetitivo.",
      intro:
        "Las facturas, las órdenes de compra y los buzones compartidos pueden generar trabajo manual repetido. Empieza con un proceso que tu equipo pueda medir y revisar.",
      tag: "Flujo posible",
      inputLabel: "Entrada",
      actionLabel: "Acción propuesta",
      checkpointLabel: "Control humano",
      items: {
        invoice: {
          title: "Recepción de facturas y preparación para el ERP.",
          description:
            "Extraer los campos de la factura, comprobar la información obligatoria y preparar los asientos para su revisión. Las excepciones vuelven a una persona antes de cualquier acción posterior.",
          input: "Factura o adjunto de correo",
          action: "Extraer, validar y preparar un asiento en el ERP",
          checkpoint: "Una persona revisa las excepciones y libera los elementos aprobados",
        },
        "purchase-order": {
          title: "Comprobación de documentos de órdenes de compra.",
          description:
            "Comparar los documentos de pedido entrantes con los campos obligatorios y señalar la información que falta o no coincide para el equipo de operaciones.",
          input: "Orden de compra y documentos del proveedor",
          action: "Comparar los campos obligatorios y detectar incoherencias",
          checkpoint: "Operaciones revisa cada documento señalado",
        },
        inbox: {
          title: "Clasificación del buzón compartido.",
          description:
            "Clasificar las solicitudes operativas entrantes y preparar su enrutamiento o borradores de acciones, con revisión cuando sea necesario.",
          input: "Mensajes en un buzón compartido de operaciones",
          action: "Clasificar, enrutar o preparar un borrador de respuesta",
          checkpoint: "Una persona revisa las solicitudes dudosas o delicadas",
        },
      },
    },

    scenes: {
      invoice: {
        label:
          "Ilustración: se leen los campos de una factura y se preparan como borrador de asiento en el ERP, que espera a que una persona lo apruebe.",
        doc: "FACTURA",
        supplier: "Proveedor",
        amount: "Importe",
        poRef: "Ref. pedido",
        erp: "ASIENTO",
        draft: "Borrador",
        gate: "Aprobar asiento",
      },
      purchaseOrder: {
        label:
          "Ilustración: un documento del proveedor se compara campo por campo con la orden de compra, y una fecha de entrega que no coincide se señala al equipo de operaciones.",
        po: "PEDIDO",
        supplierDoc: "DOC. PROVEEDOR",
        item: "Artículo",
        quantity: "Cantidad",
        unitPrice: "Precio unitario",
        deliveryDate: "Fecha de entrega",
        gate: "Enviado a operaciones",
      },
      inbox: {
        label:
          "Ilustración: los mensajes de un buzón compartido se clasifican y se envían a colas, y una solicitud dudosa queda retenida para que una persona la revise.",
        inbox: "BUZÓN COMPARTIDO",
        orders: "PEDIDOS",
        deliveries: "ENTREGAS",
        review: "POR REVISAR",
      },
    },

    proof: {
      eyebrow: "Proyectos reales",
      heading: "Mira el trabajo que respalda la promesa.",
      problem: "El problema",
      built: "Qué se construyó",
      limitation: "Limitación conocida",
      kinds: {
        previous: "Experiencia previa",
        independent: "Proyecto independiente",
        prototype: "Prototipo",
        client: "Despliegue para un cliente",
      },
    },

    approach: {
      eyebrow: "Nuestro enfoque",
      heading: "Un camino claro desde el flujo de trabajo hasta el despliegue.",
      intro:
        "Empieza con una conversación gratuita sobre un flujo de trabajo. El trabajo de pago solo comienza cuando el alcance está claro.",
      supporting:
        "Los entregables, los requisitos de acceso y los criterios de éxito se acuerdan por escrito antes de empezar.",
      regulation:
        "Cada flujo de trabajo se diseña teniendo en cuenta el Reglamento de IA de la UE y el RGPD: supervisión humana, registro de actividad y solo los datos que el flujo necesita.",
      steps: [
        {
          title: "Descubrimiento",
          body: "Una conversación gratuita de 30 minutos para entender un flujo de trabajo y valorar si encaja.",
        },
        {
          title: "Auditoría de pago del flujo de trabajo",
          body: "Mapear el proceso, establecer una línea de base, revisar los requisitos del Reglamento de IA de la UE y del RGPD, probar el enfoque acordado y definir una propuesta de despliegue con un alcance concreto.",
        },
        {
          title: "Sprint de despliegue",
          body: "Construir y pilotar un flujo de trabajo acordado, conectar los sistemas acordados y añadir validación, registro de actividad y revisión humana donde sea necesario.",
          note: "Un sprint con un alcance bien delimitado tiene como objetivo 10 días hábiles una vez acordados el alcance, los datos de muestra, el acceso a los sistemas y la fecha de inicio.",
        },
        {
          title: "Mejora continua",
          body: "Mantener y mejorar el despliegue acordado mediante un encargo con su propio alcance.",
        },
      ],
    },

    faq: {
      eyebrow: "Preguntas frecuentes",
      heading: "Lo primero que preguntan los equipos.",
      intro: "Lo que no esté aquí, lo hablamos con gusto en la llamada.",
      items: [
        {
          question: "¿Es posible trabajar con nuestros sistemas actuales?",
          answer:
            "La viabilidad de la integración depende de las API disponibles, del acceso y del alcance acordado. Evaluamos esas limitaciones antes de vender un sprint de despliegue.",
        },
        {
          question: "¿Qué pasa cuando la IA no está segura?",
          answer:
            "Las reglas de validación y los puntos de revisión humana se definen como parte del diseño del flujo de trabajo. Los elementos dudosos o fallidos quedan retenidos hasta que una persona los revisa.",
        },
        {
          question: "¿La auditoría es gratuita?",
          answer:
            "No. La llamada de descubrimiento de 30 minutos es gratuita. La auditoría del flujo de trabajo y la implantación son servicios de pago.",
        },
        {
          question: "¿Cómo elegimos el primer flujo de trabajo?",
          answer:
            "Empieza con un proceso administrativo acotado y medible cuyos resultados tu equipo pueda revisar. El trabajo repetitivo con documentos o con un buzón suele ser un buen punto de partida.",
        },
        {
          question: "¿Cómo se tratan nuestros datos?",
          answer:
            "El acceso, el alojamiento y los proveedores se acuerdan para cada despliegue, incluidas opciones alojadas en la UE o en tus propias instalaciones cuando sea necesario. El tratamiento de datos se diseña en torno al RGPD, y hay un contrato de encargo del tratamiento disponible si lo solicitas.",
        },
        {
          question: "¿Cómo se aborda el Reglamento de IA de la UE?",
          answer:
            "La auditoría de pago clasifica el flujo de trabajo según el Reglamento de IA de la UE y documenta la supervisión humana, el registro de actividad y la transparencia que necesita. Qué obligaciones se aplican depende de tu caso de uso y se confirma con tu equipo jurídico o de cumplimiento normativo.",
        },
      ],
    },

    finalCta: {
      heading: "¿Qué sigue haciendo tu equipo a mano?",
      body: "Trae un flujo de trabajo repetitivo a una llamada de descubrimiento gratuita de 30 minutos. Hablaremos del proceso, de los sistemas implicados y de si una auditoría de pago es el siguiente paso adecuado.",
    },
  },

  about: {
    eyebrow: "Acerca de",
    heading: "Trabaja directamente con la persona que construye tu flujo de trabajo.",
    intro:
      "NoahArk está dirigida por Noah Zaidi. Trabajas directamente con Noah desde la definición del flujo de trabajo hasta la implantación y la entrega.",
    context:
      "La trayectoria de Noah recorre el mismo terreno que los flujos de trabajo de este sitio: operaciones contables y bancarias, implantación de ERP y entrega de proyectos de IA para bancos en entornos regulados.",
    linkedinCta: "Conecta en LinkedIn",
    experienceTitle: "Experiencia previa",
    experienceNote:
      "Puestos anteriores a NoahArk. No son proyectos realizados para clientes de NoahArk.",
    experience: [
      {
        org: "FinoktAI",
        role: "Fundador y responsable de entrega de IA",
        body: "Construyó una plataforma de inteligencia documental desplegada en las instalaciones del cliente para KYC/KYB bancario: OCR, extracción de documentos de identidad y de la zona MRZ, pipelines de LLM, reglas de validación, registro de auditoría y una interfaz de revisión para analistas. La empresa ya ha cerrado.",
      },
      {
        org: "Implantación de ERP",
        role: "Jefe de proyecto ERP y consultor funcional",
        body: "Implantó Oracle Cloud, abas y Global Market ERP para clientes del comercio minorista y de la industria en Vivaliente, ABAS Iberica y Altera Software.",
      },
      {
        org: "Operaciones financieras",
        role: "Contable y banquero",
        body: "Contabilidad en SAP (MM y FICO) en Smurfit Kappa y operaciones bancarias en Targobank. El trabajo con facturas y libros contables, conocido desde el puesto de trabajo y no desde el diagrama.",
      },
    ],
    certificationsTitle: "Certificaciones",
    toolsTitle: "Trabaja con",
    tools: [
      "Python",
      "SQL",
      "Docker",
      "Pipelines de LLM",
      "OCR y extracción de documentos",
      "RAG",
      "Oracle Cloud / EBS",
      "SAP MM y FICO",
    ],
    monogramAlt: "Monograma de NoahArk",
    ledBy: "Dirigida por",
    basedAt: "Ubicada en",
    worksIn: "Idiomas de trabajo",
    languages: "Inglés, español y francés",
    linkedin: "LinkedIn",
    connect: "Conecta con Noah",
  },

  book: {
    heading: "Reserva una llamada de descubrimiento gratuita de 30 minutos.",
    intro:
      "Elige el momento que mejor te venga. Trae un flujo de trabajo repetitivo y veremos el proceso, los sistemas implicados y si una auditoría de pago es el siguiente paso adecuado.",
    points: [
      "Gratis, 30 minutos, un flujo de trabajo",
      "Trae el proceso y los sistemas que intervienen",
      "No hace falta ningún documento confidencial",
    ],
    host: "Te reunirás con Noah Zaidi",
    hostRole: "Dirige NoahArk · {location}",
    background: "Trayectoria",
    linkedin: "LinkedIn",
    emailFallback:
      "Escribe a <email>{email}</email> contando el flujo de trabajo que quieres comentar.",
  },

  calendly: {
    iframeTitle:
      "Elige un horario para una llamada de descubrimiento de 30 minutos con Noah Zaidi",
    notLoading:
      "¿No se carga el calendario? <link>Abre la página de reservas en una pestaña nueva</link>.",
    eyebrow: "Calendario de reservas",
    heading: "Carga el calendario para elegir un horario.",
    body: "El calendario lo proporciona Calendly, que instala sus propias cookies. Al cargarlo se guarda tu consentimiento para este contenido. Puedes cambiarlo en cualquier momento en la configuración de cookies.",
    load: "Cargar el calendario",
    openNewTab: "Abrir Calendly en una pestaña nueva",
  },

  cookies: {
    title: "Tu privacidad",
    text: "Este sitio no usa cookies de analítica ni de publicidad. Con tu permiso, la página de reservas carga el calendario de Calendly, que instala sus propias cookies. Consulta la <link>política de privacidad</link>.",
    acceptAll: "Aceptar todo",
    rejectNonEssential: "Rechazar las no esenciales",
    settings: "Configuración",
    dialogTitle: "Configuración de cookies",
    dialogIntro:
      "Elige qué contenido opcional puede cargarse. Tu elección se guarda durante {months} meses y puedes cambiarla en cualquier momento desde el pie de página.",
    essentialTitle: "Esenciales",
    essentialBody:
      "Recuerdan tu elección sobre las cookies en tu navegador para que el sitio pueda respetarla.",
    alwaysOn: "Siempre activas",
    externalTitle: "Calendario de reservas (Calendly)",
    externalBody:
      "Carga el calendario en la página de reservas. Calendly instala sus propias cookies.",
    save: "Guardar mi elección",
    close: "Cerrar la configuración de cookies",
  },

  privacy: {
    eyebrow: "Política de privacidad",
    title: "Cómo trata NoahArk tus datos personales.",
    lede: "Esta política explica qué datos personales se tratan cuando visitas noahark.org o reservas una llamada, por qué se tratan y qué derechos tienes según el Reglamento General de Protección de Datos (RGPD).",
    updated: "Última actualización: {date}",
    responsible: {
      heading: "1. Responsable del tratamiento",
      body: "El responsable del tratamiento de tus datos personales es {publisher}, dirigida por {director}, {address}.",
      contact: "Puedes escribirnos a <email>{email}</email>.",
    },
    processing: {
      heading: "2. Qué datos se tratan y por qué",
      visiting:
        "<strong>Visita del sitio web.</strong> El sitio está alojado en GitHub Pages. Para servir las páginas y mantener la seguridad del servicio, GitHub trata datos técnicos como tu dirección IP, el tipo de navegador y las páginas solicitadas. Base jurídica: interés legítimo en gestionar un sitio web seguro (artículo 6, apartado 1, letra f), del RGPD).",
      booking:
        "<strong>Reserva de una llamada.</strong> Cuando reservas, Calendly recoge los datos que introduces, como tu nombre, tu correo electrónico profesional, tu empresa y el flujo de trabajo que quieres comentar, y los comparte con NoahArk para que la llamada pueda programarse y prepararse. Base jurídica: aplicación, a petición tuya, de medidas precontractuales (artículo 6, apartado 1, letra b), del RGPD).",
      contacting:
        "<strong>Contacto con NoahArk.</strong> Si te pones en contacto por correo electrónico o LinkedIn, lo que envías se utiliza para responderte. Base jurídica: interés legítimo en responder a las consultas (artículo 6, apartado 1, letra f), del RGPD).",
      noConfidential:
        "No incluyas documentos confidenciales ni datos personales sensibles cuando reserves o escribas. Si más adelante un flujo de trabajo necesita documentos de muestra, la forma de compartirlos se acuerda por separado y por escrito.",
    },
    cookies: {
      heading: "3. Cookies y tecnologías similares",
      storage:
        "noahark.org no instala cookies propias ni utiliza herramientas de analítica o de publicidad. Guarda una única entrada en el almacenamiento local de tu navegador, <code>noahark-consent</code>, para recordar tu elección sobre las cookies durante {months} meses. Esto es estrictamente necesario y no requiere consentimiento.",
      calendly:
        "Con tu consentimiento, la página de reservas carga el calendario de Calendly, que instala entonces sus propias cookies, tal como se describe en su <link>aviso de privacidad</link>. Si lo rechazas, el calendario no se carga y, en su lugar, puedes abrir Calendly en una pestaña nueva.",
      change:
        "Puedes cambiar o retirar tu elección en cualquier momento en la <settings>configuración de cookies</settings>.",
    },
    recipients: {
      heading: "4. Quién recibe tus datos",
      intro:
        "Los datos solo se comparten con los proveedores necesarios para gestionar el sitio web y las reservas, y nunca se venden.",
      github: "GitHub, Inc. aloja el sitio web (<link>declaración de privacidad</link>).",
      calendly: "Calendly LLC proporciona el calendario de reservas (<link>aviso de privacidad</link>).",
    },
    transfers: {
      heading: "5. Transferencias fuera de la UE",
      body: "GitHub y Calendly tienen su sede en Estados Unidos, por lo que tus datos pueden tratarse allí. Cada proveedor describe en su aviso de privacidad las garantías que aplica a las transferencias internacionales.",
    },
    retention: {
      heading: "6. Cuánto tiempo se conservan los datos",
      body: "Los datos de las reservas y la correspondencia se conservan solo el tiempo necesario para atender tu consulta y cualquier relación comercial posterior, y durante el plazo que exija la ley. Tu elección sobre las cookies se conserva durante {months} meses; después, se te vuelve a preguntar.",
    },
    rights: {
      heading: "7. Tus derechos",
      body: "Según el RGPD, puedes solicitar el acceso a tus datos personales, su rectificación o su supresión, limitar su tratamiento u oponerte a él, y recibirlos en un formato portable. Cuando el tratamiento se basa en tu consentimiento, puedes retirarlo en cualquier momento sin que ello afecte al tratamiento realizado con anterioridad.",
      exerciseEmail: "Para ejercer estos derechos, escribe a {email}.",
      exerciseNoEmail:
        "Para ejercer estos derechos, contacta directamente con Noah, por ejemplo durante la llamada o después de ella.",
      complaint:
        "También puedes presentar una reclamación ante la autoridad francesa de protección de datos, la <link>CNIL</link>, o ante la autoridad de tu propio país.",
    },
    automated: {
      heading: "8. Decisiones automatizadas",
      body: "Este sitio web no toma decisiones automatizadas sobre los visitantes ni elabora perfiles.",
    },
    changes: {
      heading: "9. Cambios en esta política",
      body: "Esta política se actualiza cuando cambian el sitio web o sus proveedores. La fecha que aparece al principio indica la versión más reciente.",
    },
  },

  legal: {
    eyebrow: "Información legal",
    title: "Aviso legal",
    publisherHeading: "Editor",
    rows: {
      publisher: "Editor",
      publisherValue: "{publisher}, gestionado por {director}",
      address: "Dirección",
      legalForm: "Forma jurídica",
      registrationNumber: "Número de registro",
      vatNumber: "Número de IVA",
      director: "Director de la publicación",
      contact: "Contacto",
    },
    hostingHeading: "Alojamiento",
    ipHeading: "Propiedad intelectual",
    ipOwnership:
      "El nombre, el logotipo, los textos y las ilustraciones de NoahArk que aparecen en este sitio web pertenecen a NoahArk y no pueden reutilizarse sin permiso.",
    ipFootage:
      "Las imágenes de fondo de la página de inicio son imágenes de dominio público de la NASA («ISS Airglow», NASA Goddard Space Flight Center), utilizadas por cortesía de la NASA. Su uso no implica ningún respaldo por parte de la NASA.",
    regulationHeading: "Normativa",
    regulation:
      "Los flujos de trabajo se diseñan teniendo en cuenta el <aiAct>Reglamento de IA de la UE (Reglamento (UE) 2024/1689)</aiAct> y el <gdpr>RGPD (Reglamento (UE) 2016/679)</gdpr>.",
    dataHeading: "Datos personales y cookies",
    data: "Consulta la <privacy>política de privacidad</privacy>. Puedes cambiar tu elección en cualquier momento en la <settings>configuración de cookies</settings>.",
  },

  notFound: {
    eyebrow: "404",
    heading: "Esta página no forma parte del flujo de trabajo.",
    body: "Puede que el enlace esté desactualizado o mal escrito. Vuelve a la página de inicio o trae tu flujo de trabajo directamente a una llamada.",
    home: "Volver a la página de inicio",
  },
};

export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeLabels: Record<Locale, string> = {
  en: 'EN',
  es: 'ES',
};

export function getLocaleFromUrl(url: URL): Locale {
  const [, maybeLocale] = url.pathname.split('/');
  if (maybeLocale === 'es') return 'es';
  return 'en';
}

export function localizedPath(path: string, locale: Locale): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (locale === defaultLocale) {
    return normalized;
  }
  if (normalized === '/') return `/${locale}/`;
  return `/${locale}${normalized}`;
}

export function switchLocalePath(pathname: string, target: Locale): string {
  const stripped = pathname.replace(/^\/(en|es)/, '') || '/';
  return localizedPath(stripped, target);
}

export const ui = {
  en: {
    meta: {
      title: 'HF Software — Software that keeps up with your business',
      description:
        'We build web platforms for companies outgrowing spreadsheets and legacy tools.',
    },
    nav: {
      getInTouch: 'Get in Touch',
    },
    hero: {
      headline: 'Software that keeps up with your business.',
      subline:
        'We build web platforms for companies outgrowing spreadsheets and legacy tools.',
      cta: 'Get in Touch',
    },
    work: {
      title: 'Selected work',
      viewCaseStudy: 'View case study',
    },
    contact: {
      title: 'Get in Touch',
      intro: 'Tell us what you are facing. We read every message.',
      name: 'Name',
      email: 'Email',
      referral: 'How did you hear about us?',
      companyStage: 'What best describes your situation?',
      message: 'Message',
      submit: 'Send message',
      sending: 'Sending…',
      success: 'Thank you. We will be in touch soon.',
      error: 'Something went wrong. Please try again.',
      referralOptions: {
        referral: 'Referral / someone recommended you',
        search: 'Google search',
        social: 'Social media',
        project: 'Saw one of your projects',
        other: 'Other',
      },
      referralOther: 'Please specify',
      stageOptions: {
        spreadsheets: 'Still running on spreadsheets or manual processes',
        legacy: 'Legacy software that is slow or unreliable',
        rebuild: 'Need to rebuild or replace current tools',
        growing: 'Growing — current systems cannot keep up',
        exploring: 'Not sure yet — just exploring',
      },
    },
    caseStudy: {
      problem: 'The problem',
      built: 'What we built',
      result: 'The result',
      cta: 'Facing something similar?',
      liveSite: 'Live site',
    },
    footer: {
      tagline: 'A small team building software for real businesses.',
      privacy: 'Privacy',
      work: 'Work',
    },
    privacy: {
      title: 'Privacy',
      body: 'When you submit the contact form, we collect your name, email, and the information you choose to share. We use this only to respond to your inquiry. We do not sell your data or add you to marketing lists without your consent. If you have questions, reach out through the contact form.',
    },
  },
  es: {
    meta: {
      title: 'HF Software — Software que avanza con tu negocio',
      description:
        'Construimos plataformas web para empresas que han superado las hojas de cálculo y las herramientas heredadas.',
    },
    nav: {
      getInTouch: 'Contáctanos',
    },
    hero: {
      headline: 'Software que avanza con tu negocio.',
      subline:
        'Construimos plataformas web para empresas que han superado las hojas de cálculo y las herramientas heredadas.',
      cta: 'Contáctanos',
    },
    work: {
      title: 'Trabajo seleccionado',
      viewCaseStudy: 'Ver caso de estudio',
    },
    contact: {
      title: 'Contáctanos',
      intro: 'Cuéntanos qué estás enfrentando. Leemos cada mensaje.',
      name: 'Nombre',
      email: 'Correo electrónico',
      referral: '¿Cómo supiste de nosotros?',
      companyStage: '¿Qué describe mejor tu situación?',
      message: 'Mensaje',
      submit: 'Enviar mensaje',
      sending: 'Enviando…',
      success: 'Gracias. Nos pondremos en contacto pronto.',
      error: 'Algo salió mal. Por favor, inténtalo de nuevo.',
      referralOptions: {
        referral: 'Referido / alguien nos recomendó',
        search: 'Búsqueda en Google',
        social: 'Redes sociales',
        project: 'Vi uno de sus proyectos',
        other: 'Otro',
      },
      referralOther: 'Por favor especifica',
      stageOptions: {
        spreadsheets: 'Aún uso hojas de cálculo o procesos manuales',
        legacy: 'Software heredado lento o poco confiable',
        rebuild: 'Necesito reconstruir o reemplazar herramientas actuales',
        growing: 'Creciendo — los sistemas actuales no dan abasto',
        exploring: 'No estoy seguro — solo estoy explorando',
      },
    },
    caseStudy: {
      problem: 'El problema',
      built: 'Lo que construimos',
      result: 'El resultado',
      cta: '¿Enfrentas algo similar?',
      liveSite: 'Sitio en vivo',
    },
    footer: {
      tagline: 'Un equipo pequeño que construye software para negocios reales.',
      privacy: 'Privacidad',
      work: 'Trabajo',
    },
    privacy: {
      title: 'Privacidad',
      body: 'Cuando envías el formulario de contacto, recopilamos tu nombre, correo electrónico y la información que decides compartir. Usamos estos datos únicamente para responder a tu consulta. No vendemos tu información ni te agregamos a listas de marketing sin tu consentimiento. Si tienes preguntas, escríbenos a través del formulario de contacto.',
    },
  },
} as const;

export type UIStrings = (typeof ui)[Locale];

export function useTranslations(locale: Locale): UIStrings {
  return ui[locale];
}

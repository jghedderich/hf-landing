import type { APIRoute } from 'astro';
import { Resend } from 'resend';

interface ContactPayload {
  name?: string;
  email?: string;
  referral?: string;
  referralOther?: string;
  companyStage?: string;
  message?: string;
  locale?: string;
}

const stageLabels: Record<string, Record<string, string>> = {
  en: {
    spreadsheets: 'Still running on spreadsheets or manual processes',
    legacy: 'Legacy software that is slow or unreliable',
    rebuild: 'Need to rebuild or replace current tools',
    growing: 'Growing — current systems cannot keep up',
    exploring: 'Not sure yet — just exploring',
  },
  es: {
    spreadsheets: 'Aún uso hojas de cálculo o procesos manuales',
    legacy: 'Software heredado lento o poco confiable',
    rebuild: 'Necesito reconstruir o reemplazar herramientas actuales',
    growing: 'Creciendo — los sistemas actuales no dan abasto',
    exploring: 'No estoy seguro — solo estoy explorando',
  },
};

const referralLabels: Record<string, Record<string, string>> = {
  en: {
    referral: 'Referral / someone recommended you',
    search: 'Google search',
    social: 'Social media',
    project: 'Saw one of your projects',
    other: 'Other',
  },
  es: {
    referral: 'Referido / alguien nos recomendó',
    search: 'Búsqueda en Google',
    social: 'Redes sociales',
    project: 'Vi uno de sus proyectos',
    other: 'Otro',
  },
};

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = (await request.json()) as ContactPayload;
    const { name, email, referral, referralOther, companyStage, message, locale = 'en' } =
      body;

    if (!name?.trim() || !email?.trim() || !referral || !companyStage || !message?.trim()) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const runtime = locals.runtime as
      | { env?: Record<string, string | undefined> }
      | undefined;
    const env = {
      ...import.meta.env,
      ...runtime?.env,
    };

    const resendKey = env.RESEND_API_KEY as string | undefined;
    const contactEmail = (env.CONTACT_EMAIL as string | undefined) ?? 'hello@example.com';
    const contactFrom =
      (env.CONTACT_FROM as string | undefined) ?? 'HF Software <onboarding@resend.dev>';

    const lang = locale === 'es' ? 'es' : 'en';
    const stageLabel = stageLabels[lang][companyStage] ?? companyStage;
    let referralLabel = referralLabels[lang][referral] ?? referral;
    if (referral === 'other' && referralOther?.trim()) {
      referralLabel = `${referralLabel}: ${referralOther.trim()}`;
    }

    const text = [
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      `Referral: ${referralLabel}`,
      `Company stage: ${stageLabel}`,
      `Locale: ${lang}`,
      '',
      message.trim(),
    ].join('\n');

    if (!resendKey) {
      console.log('Contact form submission (RESEND_API_KEY not set):\n', text);
      return new Response(JSON.stringify({ ok: true, dev: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const resend = new Resend(resendKey);
    const { error } = await resend.emails.send({
      from: contactFrom,
      to: contactEmail,
      replyTo: email.trim(),
      subject: `[HF Software] Message from ${name.trim()}`,
      text,
    });

    if (error) {
      console.error('Resend error:', error);
      return new Response(JSON.stringify({ error: 'Failed to send email' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const prerender = false;

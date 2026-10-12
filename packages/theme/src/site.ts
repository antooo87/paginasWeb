// Configuración común a todos los sitios. Lo que es dato personal o cambia entre
// entornos llega por variables de entorno (.env en local, panel del hosting en
// producción); lo propio de cada sitio (nombre, menú, temática) lo pasa el sitio.

export interface Link { href: string; label: string }

export type IconName =
  | 'calculator' | 'receipt' | 'percent' | 'calendar' | 'wallet' | 'book' | 'clipboard'
  | 'coins' | 'shield' | 'clock' | 'lock' | 'arrow' | 'check' | 'scale' | 'mail';

export interface Tool extends Link { icon: IconName; desc: string }

export interface SiteInput {
  name: string;
  tagline: string;
  description: string;
  nav: Link[];
  /** Herramientas destacadas: barra lateral, pie y tarjetas. */
  tools: Tool[];
  /** Botón destacado de la cabecera. */
  cta?: Link;
  /** Temática para los avisos legales: «fiscal y laboral», «técnico»… */
  adviceTopic: string;
  themeColor?: string;
  /** Carácter del logotipo (por defecto, la inicial del nombre). */
  mark?: string;
  lastLegalUpdate: string;
}

export interface SiteConfig extends SiteInput {
  url: string;
  lang: string;
  locale: string;
  owner: { name: string; nif: string; address: string; email: string };
  adsenseClient: string;
  adsEnabled: boolean;
  adSlots: { calc?: string; article?: string; sidebar?: string };
  noindex: boolean;
  footerLinks: Link[];
}

const env = import.meta.env;

// Cloudflare Pages define CF_PAGES_BRANCH en el build: las ramas que no son main son previews.
const branch = typeof process !== 'undefined' ? process.env.CF_PAGES_BRANCH : undefined;

export function defineSite(input: SiteInput): SiteConfig {
  const adsenseClient = (env.PUBLIC_ADSENSE_CLIENT || '').trim();
  return {
    themeColor: '#0b6e4f',
    ...input,
    name: env.PUBLIC_SITE_NAME || input.name,
    mark: input.mark || (env.PUBLIC_SITE_NAME || input.name).charAt(0),
    url: env.PUBLIC_SITE_URL || 'https://example.com',
    lang: 'es',
    locale: 'es_ES',
    owner: {
      name: env.PUBLIC_OWNER_NAME || '[Nombre del titular]',
      nif: env.PUBLIC_OWNER_NIF || '[NIF]',
      address: env.PUBLIC_OWNER_ADDRESS || '[Domicilio]',
      email: env.PUBLIC_CONTACT_EMAIL || 'contacto@example.com',
    },
    // El ID ca-pub no es secreto (va en el HTML y en ads.txt), pero no se escribe en el código.
    adsenseClient,
    adsEnabled: env.PUBLIC_ADS_ENABLED === 'true' && /^ca-pub-\d{16}$/.test(adsenseClient),
    adSlots: {
      calc: env.PUBLIC_AD_SLOT_CALC || undefined,
      article: env.PUBLIC_AD_SLOT_ARTICLE || undefined,
      sidebar: env.PUBLIC_AD_SLOT_SIDEBAR || undefined,
    },
    noindex: !!branch && branch !== 'main',
    footerLinks: [
      { href: '/sobre-nosotros/', label: 'Sobre nosotros' },
      { href: '/contacto/', label: 'Contacto' },
      { href: '/aviso-legal/', label: 'Aviso legal' },
      { href: '/privacidad/', label: 'Privacidad' },
      { href: '/cookies/', label: 'Cookies' },
      { href: '/terminos/', label: 'Términos de uso' },
    ],
  };
}

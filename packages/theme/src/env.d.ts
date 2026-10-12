/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_NAME?: string;
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_ADSENSE_CLIENT?: string;
  readonly PUBLIC_ADS_ENABLED?: string;
  readonly PUBLIC_AD_SLOT_CALC?: string;
  readonly PUBLIC_AD_SLOT_ARTICLE?: string;
  readonly PUBLIC_AD_SLOT_SIDEBAR?: string;
  readonly PUBLIC_OWNER_NAME?: string;
  readonly PUBLIC_OWNER_NIF?: string;
  readonly PUBLIC_OWNER_ADDRESS?: string;
  readonly PUBLIC_CONTACT_EMAIL?: string;
}

// Cada sitio define este alias en su astro.config.mjs apuntando a su site.config.ts.
declare module '@site-config' {
  export const SITE: import('./site.ts').SiteConfig;
}

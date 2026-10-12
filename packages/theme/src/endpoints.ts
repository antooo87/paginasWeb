import type { SiteConfig } from './site.ts';

const text = (body: string) => new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });

/** ads.txt generado en el build a partir de PUBLIC_ADSENSE_CLIENT. */
export const adsTxt = (site: SiteConfig) =>
  text(
    site.adsEnabled
      ? `google.com, ${site.adsenseClient.replace(/^ca-/, '')}, DIRECT, f08c47fec0942fa0\n`
      : '# Define PUBLIC_ADSENSE_CLIENT y PUBLIC_ADS_ENABLED=true en el hosting para generar este archivo.\n',
  );

/** robots.txt: bloquea todo en previews para no indexar contenido duplicado. */
export const robotsTxt = (site: SiteConfig) =>
  text(
    site.noindex
      ? 'User-agent: *\nDisallow: /\n'
      : `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap-index.xml', site.url).href}\n`,
  );

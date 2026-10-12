# Web 1: Autónomo Claro

Calculadoras y guías fiscales para autónomos en España.

```
01-autonomos/
├─ src/
│  ├─ pages/               cada archivo es una URL de la web
│  │  ├─ index.astro              → /
│  │  ├─ calculadoras/            → /calculadoras/… (4 calculadoras)
│  │  ├─ guias/                   → /guias/… (3 guías)
│  │  ├─ sobre-nosotros.astro, contacto.astro
│  │  ├─ aviso-legal, privacidad, cookies, terminos (usan las plantillas de packages/theme)
│  │  └─ ads.txt.ts, robots.txt.ts  (se generan en el build desde las variables)
│  ├─ data/content.ts       lista de calculadoras y guías (menús, tarjetas, pie)
│  └─ site.config.ts        nombre, menú, botón destacado y temática de la web
├─ public/
│  ├─ _headers              cabeceras de seguridad (HSTS, CSP) para Cloudflare
│  └─ favicon.svg
├─ .env.example             variables que necesita esta web (copiar a .env, que no se sube)
├─ astro.config.mjs
└─ package.json             name: "autonomos"
```

Local: `pnpm --filter autonomos dev` → http://localhost:4321

Cloudflare Pages: build `pnpm --filter autonomos build`, salida `sites/01-autonomos/dist`.

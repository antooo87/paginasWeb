# paginasWeb

Monorepo de sitios de nicho monetizados con Google AdSense. Sitios estáticos con
[Astro](https://astro.build), desplegados en Cloudflare Pages, sin ningún secreto en el código.

```
paginasWeb/
├─ packages/
│  ├─ theme/        # layouts, cabecera, pie, AdSlot, páginas legales, ads.txt/robots.txt
│  └─ calc-core/    # funciones de cálculo puras, con tests (node --test)
├─ sites/
│  └─ autonomos/    # sitio 1: calculadoras y guías para autónomos (Astro)
├─ .githooks/pre-commit        # bloquea .env, claves y secretos antes del commit
├─ .github/workflows/ci.yml    # gitleaks + tests + build en cada PR
├─ .gitleaks.toml
└─ pnpm-workspace.yaml
```

Los próximos sitios (`sites/reformas`, `sites/solar`) se crean copiando `sites/autonomos`,
cambiando `src/site.config.ts`, los contenidos de `src/pages` y el `name` del `package.json`.
La plantilla, las páginas legales y la seguridad se heredan de `packages/theme`.

## Empezar en local

Requisitos: Node 22 y pnpm (`corepack enable`), Git y [gitleaks](https://github.com/gitleaks/gitleaks)
(`winget install gitleaks`, `brew install gitleaks` o `scoop install gitleaks`).

```bash
pnpm install                         # activa también el githook (.githooks/pre-commit)
cp sites/autonomos/.env.example sites/autonomos/.env   # y rellénalo
pnpm dev:autonomos                   # http://localhost:4321
pnpm test                            # tests de calc-core
pnpm build                           # genera sites/*/dist
```

## Variables de entorno

Viven en `sites/<sitio>/.env` en local (ignorado por Git) y en el panel de Cloudflare Pages en
producción. Nunca en el código. Ver `sites/autonomos/.env.example`.

| Variable | Production | Preview | Para qué |
| --- | --- | --- | --- |
| `PUBLIC_SITE_URL` | `https://dominio.com` | vacía | canonical, sitemap, robots |
| `PUBLIC_ADSENSE_CLIENT` | `ca-pub-…` (igual en todos los sitios) | vacía | script de AdSense y `ads.txt` |
| `PUBLIC_ADS_ENABLED` | `true` | `false` | sin anuncios en previews ni en local |
| `PUBLIC_AD_SLOT_CALC`, `PUBLIC_AD_SLOT_ARTICLE` | IDs de bloque | vacías | bloques manuales (opcionales) |
| `PUBLIC_OWNER_NAME`, `PUBLIC_OWNER_NIF`, `PUBLIC_OWNER_ADDRESS`, `PUBLIC_CONTACT_EMAIL` | tus datos | tus datos | Aviso legal y Privacidad (LSSI) |
| `NODE_VERSION` | `22` | `22` | versión de Node en el build |

Todo lo que empieza por `PUBLIC_` acaba en el HTML: solo datos que pueden ser públicos. El
`ca-pub` no es secreto (aparece en el HTML y en `ads.txt`), pero tampoco se escribe en el repo.
Claves de API o tokens irían **sin** prefijo `PUBLIC_` y nunca en `.env.example`.

En las ramas de preview (`CF_PAGES_BRANCH` distinta de `main`) el sitio se genera con
`noindex` y un `robots.txt` que bloquea todo, para no indexar las URLs `*.pages.dev`.

## Seguridad: cuatro barreras

1. **`.gitignore`**: `.env*` (salvo `.env.example`), claves (`*.pem`, `*.key`…), credenciales
   JSON, instaladores (`*.exe`, como `OperaSetup.exe`) y carpetas del hosting.
2. **Githook `pre-commit`** (`.githooks/`, se activa con `pnpm install`): bloquea `.env`, claves e
   instaladores aunque se fuerce `git add -f`, y pasa `gitleaks` sobre lo que vas a commitear.
3. **GitHub**: activa *Settings → Code security → Secret scanning* y *Push protection*.
4. **CI** (`.github/workflows/ci.yml`): `gitleaks` sobre todo el historial, tests y build. Protege
   `main` en *Settings → Branches* exigiendo PR y los checks `secrets` y `build`.

Antes de cada commit: `git status`, `git diff --staged`, `git add <archivo>` concreto (nunca
`git add .` a ciegas). Antes de cada push: `git log -p origin/main..HEAD`.

Si se escapa un secreto: **primero revócalo en el servicio de origen**. Si no has hecho push,
`git rm --cached <archivo>` y `git commit --amend`. Si ya lo hiciste, limpia el historial con
`git filter-repo --path <archivo> --invert-paths` (o `--replace-text`), `git push --force --all`, y
comprueba con `pnpm check:secrets`.

Extensiones recomendadas de VS Code en `.vscode/extensions.json` (Astro, GitLens, DotENV).

## Despliegue en Cloudflare Pages (un proyecto por sitio)

*Workers & Pages → Create → Pages → Connect to Git → antooo87/paginasWeb*, y para cada sitio:

- Production branch: `main`
- Build command: `pnpm --filter autonomos build`
- Build output directory: `sites/autonomos/dist`
- Build watch paths (Include): `sites/autonomos/*`, `packages/*`
- Variables: las de la tabla de arriba, separadas por entorno (Production / Preview).

Después: dominio propio, *Always Use HTTPS*, redirigir `www` al dominio raíz y comprobar las
cabeceras en [securityheaders.com](https://securityheaders.com). Las cabeceras están en
`sites/autonomos/public/_headers`; la CSP empieza en `Report-Only` y se pasa a
`Content-Security-Policy` tras 1-2 semanas con anuncios sin errores en la consola.

## AdSense

- Páginas obligatorias ya incluidas: Sobre nosotros, Contacto, Aviso legal, Privacidad (menciona
  AdSense, DoubleClick y cómo desactivar la personalización), Cookies y Términos.
- `ads.txt` se genera solo en el build a partir de `PUBLIC_ADSENSE_CLIENT`.
- Consentimiento en la UE: activa *Privacidad y mensajes → Mensaje de RGPD* en AdSense.
- Huecos de anuncio con altura reservada (sin CLS) y nunca junto a los botones de las calculadoras.
- Solicita la revisión con 25-30 páginas útiles indexadas; el sitio de autónomos tiene ahora 4
  calculadoras y 3 guías.

## Datos fiscales

Las tablas están en `packages/calc-core/src/fiscal-es.ts`, con su fuente y año. Revísalas cada
enero; los tests (`pnpm test`) cubren los ejemplos que aparecen en las páginas.

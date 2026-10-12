# sites: una carpeta por web

Cada carpeta es una web independiente, con su dominio, su proyecto en Cloudflare Pages y su
`.env`. El número indica el orden de lanzamiento.

| Carpeta | Web | Estado |
| --- | --- | --- |
| `01-autonomos/` | Autónomo Claro: calculadoras y guías fiscales para autónomos | En desarrollo |
| `02-reformas/` | Calculadoras para reformas y construcción | Pendiente |
| `03-solar/` | Energía doméstica y autoconsumo solar | Pendiente |

Arrancar una web en local: `pnpm --filter <name del package.json> dev`
(por ejemplo `pnpm --filter autonomos dev`).

# El Arquitecto Moderno

Diseno de Plataformas SaaS Enterprise y Ecosistemas de IA Agentica.

Este repositorio contiene el libro tecnico en formato documentacion, construido con Next.js + Nextra + MDX.

## Stack

- Next.js 16 (App Router)
- Nextra 4 (`nextra-theme-docs`)
- MDX como fuente de contenido
- Tailwind CSS 4

## Estructura del proyecto

```text
app/
  layout.tsx                 # Layout global Nextra
  [[...mdxPath]]/page.tsx    # Gateway de rutas MDX
  robots.ts                  # Robots SEO
  sitemap.ts                 # Sitemap SEO

content/
  _meta.ts                   # Navegacion global/sidebar
  index.mdx                  # Home del libro
  introduccion.mdx
  guia-editorial.mdx         # Guia interna (oculta en sidebar)
  parte-*/                   # Capitulo por parte

theme.config.tsx             # Configuracion del tema Nextra
mdx-components.tsx           # Integracion MDX de docs theme
scripts/check-cap1-coherence.mjs
```

## Desarrollo local

Variables de entorno recomendadas (`.env.local`):

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_REPO_URL=https://github.com/tu-org/arquitecto-moderno
```

En produccion, `NEXT_PUBLIC_SITE_URL` debe apuntar al dominio final del sitio.

Instalar dependencias:

```bash
npm install
```

Levantar el entorno local:

```bash
npm run dev
```

Abrir:

```text
http://localhost:3000
```

## Calidad y validaciones

Lint:

```bash
npm run lint
```

Type checking:

```bash
npx tsc --noEmit
```

Coherencia editorial y tecnica del libro:

```bash
npm run test:book
```

## Convenciones editoriales

- Terminologia canonica: `tenant`, `tenant_id`, `tenant context`
- Estructura obligatoria por capitulo:
  - `## Contexto`
  - `## Que aprendera el lector`
  - `## Introduccion tecnica`
  - `## Estructura lista para expandir`
- Tono tecnico, profesional y orientado a arquitectura aplicada

Referencia completa: `content/guia-editorial.mdx`.

## SEO

- Metadata base en `app/layout.tsx`
- Robots en `app/robots.ts`
- Sitemap en `app/sitemap.ts`

Antes de produccion, actualizar URLs canónicas:

- `NEXT_PUBLIC_SITE_URL`

en variables de entorno de Vercel o tu plataforma de deploy.

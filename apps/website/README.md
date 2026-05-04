# Subaddressify — Marketing Website

A modern, dark, responsive marketing website built with Next.js, TypeScript, and Tailwind CSS.

## Tech Stack

- **Next.js 15** — React framework with App Router
- **TypeScript** — strict mode
- **Tailwind CSS** — utility-first styling
- **pnpm** — package manager

## Pages

| Page | Description |
|---|---|
| `/` | Main landing page |
| `/privacy` | Privacy policy |

## Sections (homepage)

- **Hero** — headline, example sub-address, CTA to install
- **How it works** — 4-step process
- **Why sub-addressing** — benefits explained
- **Privacy-first** — what we store vs. what we don't
- **Features** — feature grid
- **FAQ** — common questions
- **CTA** — install prompt

## Local Development

```bash
# From the monorepo root
pnpm install
pnpm dev:website

# Or from this directory
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
pnpm build:website
```

## Deployment

The website can be deployed to:
- **Vercel** (recommended for Next.js) — connect your GitHub repo
- **Netlify** — set build command to `pnpm build:website` and publish directory to `apps/website/.next`
- **Static export** — add `output: 'export'` to `next.config.mjs` and deploy the `out/` folder

## Chrome Web Store URL

Update the placeholder URL in these files when the extension is published:
- `src/components/Hero.tsx`
- `src/components/Nav.tsx`
- `src/components/CTA.tsx`

Replace `kdmppldldoejpcacjjbjjcffpiodejco` with your actual extension ID.

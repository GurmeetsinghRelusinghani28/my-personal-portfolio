# Gurmeetsingh Relusinghani — Portfolio

Production-ready creative developer portfolio built with **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS v4**.

## Quick start

```bash
npm install
cp .env.example .env.local   # optional: site URL, GitHub token, Resend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Development server |
| `npm run generate:resume` | Generate ATS PDF at `public/resume/gurmeetsingh-relusinghani-resume.pdf` |
| `npm run build` | Generates resume, then production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |

## Environment variables

See `.env.example`. Nothing is required for local development.

- **`NEXT_PUBLIC_SITE_URL`** — canonical URL for SEO (set on Vercel).
- **`GITHUB_TOKEN`** — optional; improves GitHub API rate limits.
- **`RESEND_API_KEY`** + verified **`CONTACT_FROM_EMAIL`** — enables server-side contact delivery. Without these, the form opens a **mailto** draft (no fake success state).

## Project structure

- `app/` — routes, metadata, API routes, OG image
- `components/` — UI, sections, layout
- `content/` — profile, projects, skills (edit here first)
- `lib/` — GitHub fetch, SEO helpers
- `public/resume/` — generated PDF
- `scripts/` — resume PDF generator

## Deploy on Vercel

1. Push this repository to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Set environment variables from `.env.example`.
4. Deploy — `prebuild` generates the resume PDF automatically.

## Manual QA checklist

- [ ] Hero headline readable with JS disabled
- [ ] Section nav + mobile menu keyboard accessible
- [ ] All project **View Source** links open correct GitHub repos
- [ ] Case study pages load for `/projects/chattermind`, `rozgarsetu`, `dermscan`
- [ ] Resume PDF downloads from hero/header
- [ ] Contact form: mailto fallback OR Resend success only when configured
- [ ] Layout at 320px, 375px, tablet, desktop — no horizontal scroll
- [ ] `prefers-reduced-motion`: no canvas animation, reduced text rotation

## Lighthouse (production)

```bash
npm run build
npm run start
```

In Chrome DevTools → Lighthouse → **Navigation** → test **Mobile** and **Desktop** against `http://localhost:3000`. Fix reported issues (contrast, labels, LCP element, unused JS).

Targets: Performance 95+, Accessibility 100, Best Practices 100, SEO 100 (environment-dependent).

## Updating content

1. Edit `content/profile.ts`, `content/projects.ts`, `content/skills.ts`.
2. Run `npm run generate:resume` if resume copy changed.
3. Rebuild and redeploy.

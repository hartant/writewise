# WriteWise

A free, privacy-first writing and study toolkit for students, writers, job seekers and professionals.
Eight browser-based tools, original guides and a technical-SEO foundation, all built as a fast, statically
generated Next.js site that runs on free hosting.

| Tools | Guides | Trust pages |
| --- | --- | --- |
| Word Counter · Character Counter · Reading Time Calculator · Essay Word Goal Tracker · Remove Duplicate Lines · Case Converter · Paragraph Counter · Text Compare | How to count words in an essay · How to improve essay writing · How long to read 1,000 words · Word count vs. character count | About · Contact · Privacy · Terms · Disclaimer |

**Privacy model:** every tool processes text with JavaScript in the visitor's browser. No tool sends text to a
server. With no environment variables set, the site loads no third-party scripts and sets no cookies.

---

## Tech stack

- **Next.js 16** (App Router), **React 19**, **TypeScript 5**
- **Tailwind CSS 4** (CSS-first config in `src/app/globals.css`)
- **lucide-react** icons
- Fonts self-hosted at build time with `next/font`: Literata (headings), Atkinson Hyperlegible Next (body), Courier Prime (manuscript text and numbers)
- No database, no paid APIs, no analytics or ad scripts by default

Every route is prerendered to static HTML (`○`/`●` in the build output). Tool pages render their explanatory
content on the server; only the interactive tool itself is a client component.

## Project structure

```
src/
  app/                        Routes (App Router)
    page.tsx                  Homepage
    tools/page.tsx            All tools, grouped by category
    tools/<slug>/page.tsx     One static route per tool (keeps each page's JS small)
    blog/page.tsx             Guides index
    blog/[slug]/page.tsx      Guide pages (generateStaticParams, dynamicParams = false → real 404s)
    about|contact|privacy|terms|disclaimer/
    layout.tsx                Root layout, fonts, metadata defaults, theme script
    not-found.tsx             Custom 404 (noindex)
    robots.ts, sitemap.ts, manifest.ts
    opengraph-image.tsx, apple-icon.tsx, icon.svg
    globals.css               Design tokens (light + dark), components, article typography
  components/                 Shared UI: header, footer, breadcrumbs, FAQ, search, JSON-LD, consent, AdSlot…
  tools/                      Interactive tool UIs (client components) + shared tool UI kit (ui.tsx)
  content/
    tools/<slug>.tsx          Guide + FAQs rendered under each tool
    blog/<slug>.tsx           Article body + FAQs
  lib/
    text/                     Pure, dependency-free text engines (stats, case, dedupe, diff)
    tools.ts, posts.ts        Registries: titles, descriptions, related links, categories
    seo.ts, jsonld.ts, site.ts
    ai/                       Provider-neutral interface for future AI/paid APIs (disabled)
    plans.ts                  Free/Pro entitlement layer (everything is free today)
tests/                        Unit tests for the text engines (node:test)
scripts/check-links.mjs       Crawler: links, status codes, metadata, sitemap
docs/                         Extending, AdSense readiness
public/_headers               Headers for Cloudflare Pages / Netlify static deploys
```

## Local development

Requirements: **Node.js 20.9+** (22 LTS recommended) and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

### Quality checks

```bash
npm run typecheck     # TypeScript, no emit
npm test              # Unit tests for word/sentence/character counting, case, dedupe, diff
npm run build         # Production build (also type-checks)
npm start             # Serve the production build on :3000
npm run check-links   # In a second terminal: crawl every page and verify links, metadata, sitemap, 404s
```

## Environment variables

All variables are optional. Copy `.env.example` to `.env.local` for local use, or set them in your host's dashboard.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public URL without a trailing slash, e.g. `https://writewise.vercel.app`. Used for canonical URLs, sitemap, robots.txt and Open Graph. Falls back to Vercel's production URL, then Cloudflare's `CF_PAGES_URL`, then `http://localhost:3000`. **Set it explicitly in production.** |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Address shown on Contact, Privacy, Terms and About. Until it's set, those pages show a "not yet configured" notice. |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Google Search Console HTML-tag token (the `content` value only). |
| `NEXT_PUBLIC_GA_ID` | GA4 measurement ID (`G-…`). Enables the consent banner. GA loads only after the visitor accepts. |
| `AI_PROVIDER` | Reserved for future AI features (see `docs/EXTENDING.md`). Leave empty. |

`NEXT_PUBLIC_*` values are baked in at build time, so **redeploy after changing them**.

## Free deployment

### Option A: Vercel (recommended)

1. Push this folder to a GitHub, GitLab or Bitbucket repository.
2. In Vercel, choose **Add New → Project**, import the repository, and keep the detected Next.js settings.
3. Under **Environment Variables**, add `NEXT_PUBLIC_SITE_URL` (e.g. `https://your-project.vercel.app`) and
   `NEXT_PUBLIC_CONTACT_EMAIL`.
4. Deploy. The site is served from `your-project.vercel.app` on the Hobby plan, subject to Vercel's current
   free-tier terms (which include restrictions on commercial use; check them before monetizing).

Security headers are applied from `next.config.ts`.

### Option B: Cloudflare Pages (static export)

The site has no server-side features, so it can be exported as plain static files:

```bash
npm run build:static   # writes the site to ./out
```

1. In Cloudflare, go to **Workers & Pages → Create → Pages → Connect to Git** and choose your repository.
2. Build command: `npm run build:static`. Build output directory: `out`.
3. Add environment variables, including `NEXT_PUBLIC_SITE_URL=https://your-project.pages.dev`.
4. Deploy. `public/_headers` supplies the security headers and correct content types for the OG image, and
   `out/404.html` is served with a real 404 status.

The same `out/` folder also works on Netlify (publish directory `out`).

## Google Search Console

1. Deploy the site and note its final URL.
2. Open [Google Search Console](https://search.google.com/search-console) → **Add property** → **URL prefix** →
   enter your full URL (e.g. `https://your-project.vercel.app/`). A free subdomain can't use the *Domain* property type,
   because that needs DNS access.
3. Choose **HTML tag** verification. Copy only the `content` value from the meta tag.
4. Set `NEXT_PUBLIC_GSC_VERIFICATION` to that value and redeploy. Then click **Verify**.
5. In **Sitemaps**, submit `sitemap.xml`.
6. Use **URL Inspection** on the homepage and a few tool pages and request indexing.

Indexing and rankings are decided by Google and take time; no setup guarantees placement. Keep improving content
and watch the **Pages** and **Core Web Vitals** reports.

## Google Analytics 4 (optional)

1. In [Google Analytics](https://analytics.google.com), create a GA4 property and a **Web** data stream for your URL.
2. Copy the measurement ID (`G-XXXXXXXXXX`) into `NEXT_PUBLIC_GA_ID` and redeploy.
3. A consent banner appears for new visitors. GA4 loads **only after "Allow analytics"** is clicked, and visitors can
   change their choice via **Cookie settings** in the footer. The Privacy Policy automatically adds the analytics
   section when the variable is set.
4. In GA4, leave **Enhanced measurement → Page changes based on browser history events** on so client-side
   navigation is counted.
5. Review GA4's data-retention setting and keep Google Signals off unless you update the Privacy Policy.

This banner is a simple opt-in that suits analytics. If you add advertising, you'll need a Google-certified consent
management platform; see `docs/ADSENSE-READINESS.md`.

## Pre-launch checklist

- [ ] `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_CONTACT_EMAIL` set in production
- [ ] Privacy Policy, Terms and Disclaimer reviewed by the site owner (they are a careful starting point, not legal advice)
- [ ] `npm test`, `npm run build` and `npm run check-links` all pass
- [ ] Search Console verified and sitemap submitted
- [ ] Spot-check pages with [PageSpeed Insights](https://pagespeed.web.dev/) on mobile
- [ ] Update `SITE_UPDATED` in `src/app/sitemap.ts` and each post's `modified` date when content meaningfully changes

## Adding content

- **A new tool:** add an entry to `src/lib/tools.ts`, create `src/tools/<slug>.tsx` (client UI), and
  `src/content/tools/<slug>.tsx` (guide + FAQs), then copy any `src/app/tools/<slug>/page.tsx`. The sitemap,
  search, footer, tools index and related links update automatically.
- **A new guide:** add metadata to `src/lib/posts.ts`, write `src/content/blog/<slug>.tsx`, and register it in
  `src/content/blog/index.ts`.

Write for people first: original explanations, worked examples and honest sourcing. Avoid mass-produced pages.

## Further docs

- [`docs/EXTENDING.md`](docs/EXTENDING.md): adding AI or paid-API features and premium plans later
- [`docs/ADSENSE-READINESS.md`](docs/ADSENSE-READINESS.md): checklist before enabling advertising

# WriteWise audit

**Audited:** November 9, 2026 · **Scope:** the repository (Next.js 16 App Router) and the live deployment at
https://writewise-henna.vercel.app/ · **Method:** code review of every route and shared component, the production build,
the automated crawler (`scripts/check-links.mjs`), unit tests, browser testing at 360 px and desktop widths in light and
dark mode, and HTTP checks against the live site.

The live site matched the repository at the time of the audit (same routes, titles, H1s, sitemap and security headers).

Status legend: **Fixed** = changed in this release and tested · **Owner action** = needs the site owner (configuration,
accounts, legal review) · **Open** = recommended for future work.

---

## Summary

| Priority | Found | Fixed in this release | Owner action | Open |
| --- | --- | --- | --- | --- |
| Critical | 2 | 0 | 2 | 0 |
| High | 9 | 9 | 0 | 0 |
| Medium | 12 | 10 | 0 | 2 |
| Low | 9 | 4 | 1 | 4 |

The two critical items are configuration and verification tasks only the owner can do. Everything that could be fixed in
code has been fixed.

---

## Critical

### C1. Contact page shows a configuration placeholder · Owner action
- **Affected:** `/contact`, and the email links on `/privacy`, `/terms` and `/about` (`src/components/contact-email.tsx`).
- **What's wrong:** the live site renders "(contact email not yet configured: set NEXT_PUBLIC_CONTACT_EMAIL)" because the
  environment variable isn't set in Vercel.
- **Why it matters:** a site with no working contact method looks abandoned or untrustworthy to users, and it's a basic
  requirement for advertising programs and data-protection requests (UK GDPR / GDPR / PIPEDA / CCPA rights requests are
  routed through it).
- **Fix:** in Vercel → Project → Settings → Environment Variables, add `NEXT_PUBLIC_CONTACT_EMAIL` with an address you
  monitor, then redeploy. No address is hard-coded, because inventing one would be wrong. The build prints a warning
  while it's missing.

### C2. Common App essay limit could not be verified from an official public page · Owner action
- **Affected:** `/tools/application-limit-checker` (Common App mode), and Common App mentions in guides.
- **What's wrong:** Common App's official prompts page (2026–2027 prompts confirmed unchanged) doesn't state the word
  limit, and the support article that does is rendered by JavaScript and couldn't be read during the audit.
- **Why it matters:** applicants rely on the number. Presenting an unverified limit as fact could mislead them.
- **Fix applied in code:** the 250–650 range is labeled "not verified" with the last-checked date, the applicant is told
  to confirm it in their Common App account, and the numbers are editable. Guide wording was softened to "has long had".
- **Owner action:** confirm the current limit in a Common App account or on
  `appsupport.commonapp.org`, then set `verified: true` and update `lastChecked` in `src/lib/text/app-limits.ts`.

---

## High

| # | Affected | Problem | Why it matters | Fix | Status |
| --- | --- | --- | --- | --- | --- |
| H1 | Homepage hero | The hero said what the tool is but not who it helps or why the privacy approach matters. | Visitors from search decide in seconds whether a site fits their task. | New copy names the audiences (students, applicants, people who write for work), the main jobs, and the "never leaves your device" benefit. | Fixed |
| H2 | Homepage | No section explaining *how* the privacy claim works. | "Private" is easy to claim and hard to believe without an explanation. | Added "Where your text goes": a three-step explanation plus a Network-tab check users can do themselves. | Fixed |
| H3 | Homepage | No clear starting points; all tools had equal weight. | New visitors don't know where to start. | "Start with these": six tools chosen for the most common tasks (explicitly not based on usage data, which doesn't exist yet). | Fixed |
| H4 | `/tools` | No search or filter; categories only. | With 13 tools, scanning gets slow, especially on mobile. | Client-side filter (name, summary, keywords), category filter with arrow-key navigation, and a "Common tasks" list. The full list is still server-rendered for crawlers. | Fixed |
| H5 | Remove Duplicate Lines | Only "keep first" mode; no frequency, no download, no sort, no explanation of the active rules. | The main use cases (email lists, finding repeats) needed more control. | Four modes, a case-sensitive toggle, trimming, blank-line removal, optional natural A–Z sort (off by default), a frequency table, a plain-English "What will happen" summary, copy and download. | Fixed |
| H6 | Missing tools | No way to clean pasted text, sort, find and replace, analyze frequency or check application limits. | These are common adjacent tasks for the same audience; without them users leave for another site. | Added Text Cleaner, Sort Lines, Find and Replace, Word Frequency Counter and Application Limit Checker. | Fixed |
| H7 | Find and Replace (new) | Regular expressions can hang the browser (catastrophic backtracking). | A frozen tab loses the user's work. | Matching runs in a Web Worker with a 2-second timeout. Tested: `(a+)+$` is stopped after about 2.1 s and the page stays responsive (largest main-thread gap 54 ms). | Fixed |
| H8 | Segmented controls (Case Converter, Paragraph Counter, Text Compare) | `role="radio"` buttons had no arrow-key support, and every option was a Tab stop. | Doesn't match the WAI-ARIA radio-group pattern keyboard users expect. | Shared `Segmented` component: one Tab stop, arrow keys move the selection. | Fixed |
| H9 | Guides | Application facts (Common App, UCAS) were stated without sources or dates. | YMYL-adjacent content for applicants needs to be accurate and dated. | UCAS facts verified on ucas.com, with source links and a "facts checked" date; Common App wording softened (see C2). | Fixed |

---

## Medium

| # | Affected | Problem | Why it matters | Fix | Status |
| --- | --- | --- | --- | --- | --- |
| M1 | `sitemap.xml` vs canonical | Sitemap listed `https://…app/` while the homepage canonical is `https://…app` (no slash). | Mixed signals about the preferred URL. | Sitemap homepage entry now matches the canonical exactly. | Fixed |
| M2 | Tool outputs | No download option. | Long results (cleaned lists, CSVs) are awkward to copy on mobile. | `DownloadButton` (local Blob, nothing uploaded) on dedupe, cleaner, sort, find and replace, case converter, and CSV for word frequency (with a BOM so Excel reads accents correctly). | Fixed |
| M3 | Copy buttons | A blocked clipboard said only "Copy failed". | Users don't know what to do next. | The message now says "Copy blocked: select the text and press Ctrl+C" and stays visible longer. | Fixed |
| M4 | Text Compare | The Ctrl+Enter listener was re-registered on every render. | Unnecessary work on every keystroke. | A single listener reads the latest state through a ref. | Fixed |
| M5 | Body font | Next.js has no fallback metrics for Atkinson Hyperlegible Next. | A font swap can shift layout slightly (CLS). | Explicit system fallback stack added. Measure CLS after deployment. | Fixed (verify in PSI) |
| M6 | Textarea placeholders | Placeholder at 75% opacity fell below comfortable contrast. | Low-vision users may miss guidance text. | Full-opacity muted color (5.8:1 on white). | Fixed |
| M7 | Guide author line | "Editorial Team" implied a team that may not exist. | Author information must be accurate. | Changed to "Written by the WriteWise team", with a recommendation for the owner to add a real name and bio (L9). | Fixed |
| M8 | Existing guides | The UCAS row described the pre-2026 single statement. | Outdated advice for UK applicants. | Updated to three answers, 4,000 characters including spaces, at least 350 per answer. | Fixed |
| M9 | Guides | No guide for the most practical list and PDF tasks. | Matching search intent exists for these tasks (see KEYWORD-RESEARCH.md). | Added three guides: UCAS character count, cleaning PDF text, removing duplicate lines and emails. | Fixed |
| M10 | Paper sheet headers | Input and output headers had different heights. | Visual misalignment in side-by-side tools. | Shared minimum height. | Fixed |
| M11 | Open Graph | One OG image for every page. | Shared links all look identical. | Per-tool OG images (generated at build time). | Open |
| M12 | Real-user metrics | Core Web Vitals not measured in the field. | Lab checks don't capture real phones and networks. | Use the PageSpeed Insights checklist in UPGRADE-REPORT.md after deploy, then the Search Console CWV report once there's traffic. | Open |

---

## Low

| # | Affected | Problem | Fix | Status |
| --- | --- | --- | --- | --- |
| L1 | Mobile menu | No focus trap; Tab can move behind the open menu. | Escape closes it and links work; a focus trap is a nice-to-have. | Open |
| L2 | Reading time "other speeds" table | No header row. | Screen readers announce it as plain rows. | Open |
| L3 | Dedupe description | The second sentence started lowercase. | Fixed during testing. | Fixed |
| L4 | Regex errors | The message repeated the full `/pattern/flags`. | Trimmed to the reason only. | Fixed |
| L5 | Word frequency | "1,200" was split into "1" and "200". | Thousands separators and decimals inside numbers now stay together. Regression test added. | Fixed |
| L6 | Find and Replace | `\n` in a regex replacement inserted a literal backslash-n. | Regex mode now understands `\n` and `\t`; plain mode stays literal. Test added. | Fixed |
| L7 | Vercel Hobby plan | The free plan restricts commercial use. | Check Vercel's terms before adding ads, or move to Cloudflare Pages (static export supported). | Owner action |
| L8 | Static export | Security headers for static hosts live in `public/_headers`, which Vercel ignores. | Documented in the README; no change needed. | Open (documented) |
| L9 | About page | No named owner or editor. | Adding a real name and short bio strengthens trust. Only add true information. | Open |

---

## Checked and fine

- Every page has one H1, a unique title and description, a canonical, Open Graph and Twitter tags, breadcrumbs (with
  BreadcrumbList JSON-LD), and `lang="en"`.
- `robots.txt` allows everything and points to the sitemap. The only `noindex` is the 404 page, which returns a real 404.
- Structured data: WebSite and Organization (home), WebApplication (tools, no ratings), BlogPosting (guides). No FAQPage
  markup (Google restricts FAQ rich results to authoritative government and health sites; the FAQs are kept as visible
  content only).
- No third-party scripts or cookies by default. GA4 loads only after opt-in (tested previously: no requests or cookies
  before consent).
- Text processing is local in every tool: no `fetch` or XHR in any tool component (Find and Replace uses a local Blob
  Web Worker, not a network request).
- Security headers on Vercel: `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`.
- All 29 public URLs render without horizontal scrolling at 360 px.
- WCAG AA contrast for all text color tokens in both themes (lowest: warning text on its tinted background, 4.64:1).

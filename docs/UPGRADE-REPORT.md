# WriteWise upgrade report

**Date:** November 9, 2026 · **Base:** the version deployed at https://writewise-henna.vercel.app/ ·
**Result:** 13 tools (5 new, 1 upgraded), 7 guides (3 new), 29 public URLs.

See also: [WRITEWISE-AUDIT.md](WRITEWISE-AUDIT.md) · [KEYWORD-RESEARCH.md](KEYWORD-RESEARCH.md) ·
[KEYWORD-MAPPING.md](KEYWORD-MAPPING.md)

---

## 1. UI changes

The "manuscript and blue pencil" identity is unchanged: the cool-grey desk, white sheets, navy ink, sparing indigo, and
Literata, Atkinson Hyperlegible Next and Courier Prime. No gradients, glow effects, fake badges or testimonials were added.

- **Homepage:** the hero now says what WriteWise does, who it's for and why local processing matters. The live word
  counter stays the hero. New **Start with these** (six tools chosen for the most common tasks, explicitly not based on
  usage data) and **Where your text goes** (a three-step privacy explanation with a self-check) sections.
- **Tools directory:** text filter, a keyboard-accessible category filter, and a **Common tasks** list mapping everyday
  jobs to tools. The full list is still server-rendered.
- **Tool pages:** download buttons where useful, clearer empty states, aligned sheet headers, a better clipboard-failure
  message, and accessible segmented controls (one Tab stop, arrow keys) everywhere.
- **Guides:** "facts checked" date where facts were verified; author line corrected to "Written by the WriteWise team".

## 2. New features

| Feature | What it does |
| --- | --- |
| **Remove Duplicate Lines (upgraded)** | Keep first / keep last / duplicates only / unique only; case-sensitive toggle; trim; remove blank lines; optional natural A–Z sort (off by default); frequency table; plain-English "What will happen"; copy and TXT download; counts for lines in and out, different values and repeats. |
| **Text Cleaner** `/tools/text-cleaner` | Ten independent rules (invisible characters, non-breaking spaces, tabs, repeated spaces, trimming, joining hard-wrapped lines, rejoining hyphenated words, collapsing or removing blank lines, removing duplicates) in a fixed documented order; per-rule change counts; preview; the original only replaced on request, with undo; copy and download. |
| **Sort Lines** `/tools/sort-lines` | Natural A–Z/Z–A (item2 before item10), strict A–Z/Z–A, shortest and longest first, reverse; case-sensitive option; blank-line handling; stable sort; copy and download. |
| **Find and Replace** `/tools/find-and-replace` | Case-sensitive, whole-word (Unicode-aware), replace all or first, optional regex with `$1` groups and `\n`/`\t`; match count; highlighted matches; preview; apply with 20-step undo; copy and download. Matching runs in a Web Worker with a 2-second timeout. |
| **Word Frequency Counter** `/tools/word-frequency-counter` | Total and unique words; sortable table with percentages; case-insensitive option; hide common words; include or exclude numbers; CSV export (UTF-8 with BOM) and copy as a table. |
| **Application Limit Checker** `/tools/application-limit-checker` | UCAS mode (three answers, per-answer 350 minimum, 4,000 total including spaces, characters remaining, official source link and last-verified date); Common App mode (250–650 words, clearly labeled **unverified**, editable); custom word and character limits (min and max, spaces on or off) for Canadian and other applications. |

## 3. Modified pages

`/`, `/tools`, `/tools/remove-duplicate-lines`, `/tools/case-converter`, `/tools/paragraph-counter`, `/tools/text-compare`,
`/tools/word-counter` (content), `/tools/character-counter` (content), every tool page (related links and shared UI),
`/blog/[slug]` template (dates, author line), `/blog/how-to-count-words-in-an-essay`,
`/blog/word-count-vs-character-count`, `/sitemap.xml`.

## 4. New pages

- `/tools/text-cleaner`
- `/tools/sort-lines`
- `/tools/find-and-replace`
- `/tools/word-frequency-counter`
- `/tools/application-limit-checker`
- `/blog/how-to-check-your-ucas-personal-statement-character-count`
- `/blog/how-to-clean-text-copied-from-a-pdf`
- `/blog/how-to-remove-duplicate-lines-from-a-list`

## 5. SEO changes

- Unique titles (all under about 65 characters including the brand), descriptions, H1s, canonicals, Open Graph and
  Twitter tags for all new pages. Verified by the crawler across all 29 URLs.
- Sitemap homepage URL now matches the canonical (no trailing slash).
- New pages are linked from the tools directory, homepage, footer, related-tool lists and guides, so there are no orphan
  pages.
- Structured data unchanged in kind: WebApplication for tools (no ratings or reviews), BlogPosting for guides,
  BreadcrumbList everywhere. No FAQPage markup.
- Application facts are sourced and dated; the unverified Common App limit is labeled as such.

## 6. Keyword research findings (summary)

Keyword Planner and Google Trends weren't available, and SERP observation was US-only, so there are **no volume
figures**. SERPs for every tool phrase are crowded with near-identical tool pages, many on free subdomains. WriteWise's
realistic differentiators are accuracy, documented methodology, privacy that users can verify, and a few distinctive
capabilities: UCAS per-answer checking, safe regex, and paragraph-preserving PDF cleanup. Details are in
KEYWORD-RESEARCH.md.

## 7. Country-specific opportunities

- **UK:** UCAS three-question statement (2026 entry onwards), now covered by the tool and a dated, sourced guide.
- **US:** Common App limits; a guide is deferred until the limit is verified officially.
- **Canada:** no national application, so custom limits are used instead of invented rules. No duplicate country pages.

## 8. Performance (local production build)

- About 470–500 KB of decoded JavaScript per page (about 150 KB gzipped), essentially unchanged from before the upgrade.
  New tools only load their code on their own page.
- Engines tested with large inputs: 100,000-line dedupe in about 430 ms in the browser (200,000 lines under 1.5 s in Node),
  30,000-word diff in about 140 ms, 160,000-word count well under 1 s.
- Find and Replace keeps the page responsive even with a catastrophic pattern (largest main-thread gap 54 ms).
- **Core Web Vitals were not measured in the field.** Use the checklist below after deploying.

### PageSpeed Insights checklist (after deploy)
1. Test `/`, `/tools`, `/tools/word-counter`, `/tools/application-limit-checker` and one guide on
   https://pagespeed.web.dev/, **Mobile** tab first.
2. Record LCP, INP (field data appears once there's traffic), CLS and the TBT lab metric.
3. If CLS > 0.1, check the font swap (audit M5): consider `display: "optional"` for the body font.
4. If LCP > 2.5 s on mobile, check server response time and whether the hero heading or textarea is the LCP element.
5. Repeat after any change that adds scripts (analytics, ads).

## 9. Accessibility results

- Automated checks on sample pages: no unlabeled inputs, no duplicate IDs, no unnamed buttons, no images without
  alt text, no skipped heading levels, one H1 per page, `lang="en"`.
- WCAG AA contrast passes for all text color tokens in light and dark themes (lowest 4.64:1).
- Radio groups follow the WAI-ARIA pattern (arrow keys); status messages use `aria-live`; focus outlines are visible;
  reduced motion is respected.
- Not tested with a real screen reader (NVDA, JAWS or VoiceOver). That's recommended before launch.

## 10. Tests

| Check | Result |
| --- | --- |
| TypeScript (`npm run typecheck`) | Pass |
| Unit tests (`npm test`) | **21 passed, 0 failed** (12 existing + 9 new suites covering dedupe modes, cleaner, sort, find/replace incl. worker serialization, frequency incl. formatted numbers, application limits, guide examples) |
| Production build | Pass, 36 static routes, no warnings after the font fallback fix |
| Crawler (`npm run check-links`) | Pass: 29 pages, all 200, unique titles and descriptions, canonicals, OG, one H1, sitemap complete, unknown URLs return 404 |
| Browser tests (production build) | All 13 tools exercised. New tools: every mode and option, empty input, Unicode, emoji, large input, downloads (Blob), copy, undo, regex errors and timeout |
| Mobile 360 px | All 29 URLs fit without horizontal scrolling |
| Console | No errors or hydration warnings (one expected 404 from testing a missing page) |
| Failed | None |

## 11. Remaining issues

**Implemented and tested:** everything in sections 1–5 above.

**Implemented but not fully tested:**
- Screen-reader behavior (only automated checks were run).
- Clipboard behavior on iOS Safari and older browsers (the fallback path exists but wasn't tested on a device).
- Downloads on iOS Safari (Blob download verified in Chromium only).

**Recommended for future work:**
- Verify the Common App limit officially (audit C2), then consider a Common App guide.
- Per-page Open Graph images (M11).
- A focus trap in the mobile menu (L1); a header row for the reading-time comparison table (L2).
- Add a real owner or editor name and bio to the About page (L9).
- After launch: review Search Console queries by country and expand content only where real queries justify it.

## 12. Deployment

1. Unzip the update over your repository, replacing files with the same paths. No files were deleted in this release,
   so copy-and-replace is safe.
2. `npm install` (no new dependencies), `npm test`, `npm run build`.
3. Commit and push. Vercel deploys automatically.
4. In Vercel, set the environment variables below and **redeploy** (they're baked in at build time).
5. In Search Console, resubmit `sitemap.xml` and request indexing for the new pages.

## 13. Environment variables the owner must configure

| Variable | Required? | Value |
| --- | --- | --- |
| `NEXT_PUBLIC_CONTACT_EMAIL` | **Yes (critical)** | An address you monitor. Fixes the Contact page placeholder. |
| `NEXT_PUBLIC_SITE_URL` | Recommended | `https://writewise-henna.vercel.app` (or your custom domain later). Without it, Vercel's production URL is used automatically. |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Optional | Search Console HTML-tag token. |
| `NEXT_PUBLIC_GA_ID` | Optional | GA4 measurement ID; enables the consent banner. Analytics never receives tool text. |
| `AI_PROVIDER` | No | Reserved for future features; leave empty. |

No promises are made about rankings, traffic or AdSense approval. Before adding ads: check the Vercel Hobby plan's
commercial-use terms and follow `docs/ADSENSE-READINESS.md`, including a Google-certified consent platform for UK and
EEA visitors.

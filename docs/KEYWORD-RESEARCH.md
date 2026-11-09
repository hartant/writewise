# Keyword research

**Date:** November 9, 2026 · **Markets:** United States, United Kingdom, Canada

## Read this first: what data was and wasn't available

| Source | Status | Notes |
| --- | --- | --- |
| Google Keyword Planner | **Not available** | Requires a signed-in Google Ads account. No search volumes, CPC or competition indexes were collected. |
| Google Trends | **Not available** | trends.google.com could not be loaded from the research environment. No relative-interest scores were collected. |
| Search result analysis | **Partly available** | A web search tool was used for SERP observation. It returns **US results only**, so UK and Canadian SERPs were **not** observed directly. |
| Official sources | **Available** | ucas.com (personal statement rules) and commonapp.org (2026–2027 prompts) were checked. |

Because of this, this document contains **no search volumes, keyword difficulty scores, CPC figures, traffic estimates or
ranking positions**. Every "Volume" cell says *Not available*. Statements about demand are limited to what search results
show: that a query has dedicated pages competing for it, which suggests real intent but not how much.

**Recommended next step for the owner:** after launch, use Google Search Console (Performance → Queries, filtered by
country) to see the queries WriteWise actually appears for in the US, UK and Canada. That data is first-party and exact.
Keyword Planner with a free Google Ads account adds rounded volume ranges.

## Method

For each seed phrase that was researched, the search results were reviewed for: the type of pages ranking (tool vs. guide
vs. official source), the number of near-identical tool pages, and signals of intent in titles and snippets. Country notes
for the UK and Canada are **inferences** from the topic (for example, UCAS is UK-only), not observations of local results.

---

## Findings by phrase

### Word counter

| Field | Finding |
| --- | --- |
| Phrases researched | "online word counter essay" (US SERP observed). "word counter", "count words in essay", "word count checker" were not separately searched. |
| Intent | Transactional/tool: paste text, get a count. Secondary informational intent about essay length. |
| Evidence | The SERP was dominated by tool pages, many on free hosting subdomains (`*.pages.dev`, `*.lovable.app`) plus established tools. Snippets emphasize "no sign-up" and "runs in your browser", the same promise WriteWise makes. |
| Volume | Not available |
| Competition | Very crowded and undifferentiated. Many results appear to be templated tool pages. Differentiation has to come from accuracy, transparency (documented rules) and genuinely useful supporting content, not from the tool alone. |
| Country notes | US, UK and CA intent is likely identical; spelling differences don't apply to the tool. |
| Target page | `/tools/word-counter` (tool), `/blog/how-to-count-words-in-an-essay` (informational) |
| New page justified? | **No.** "Essay word counter" is the same intent as the existing Word Counter; a separate page would be a near-duplicate. |

### Common App essay word counter

| Field | Finding |
| --- | --- |
| Phrase researched | "common app essay word counter" (US SERP) |
| Intent | Mixed: a tool to check an essay plus the answer to "what is the limit?". |
| Evidence | Results mixed general word counters, dedicated "college essay" counters and admissions-advice articles (Scribbr, College Essay Guy, Ivy Coach, wordlimit.ai). Several pages specifically compare Google Docs vs. Common App counting. |
| Volume | Not available |
| Competition | Strong informational competitors (established admissions sites). Tool-wise, similar to the generic word counter. |
| Country notes | US-focused (Common App is mainly used by US colleges, plus some international institutions). |
| Target page | `/tools/application-limit-checker` (Common App mode) |
| New page justified? | **No separate page.** A combined application checker is more useful and avoids a thin page. A Common App guide is **deferred** until the current limit is verified from an official source (see audit C2). |

### UCAS personal statement character counter

| Field | Finding |
| --- | --- |
| Phrases researched | "UCAS personal statement character counter" (US SERP; topic is UK-specific) |
| Intent | Tool plus rules: applicants want to check three answers against 4,000 characters and understand the 350-character minimum. |
| Evidence | Many dedicated UCAS counters (charactercounter.com/ucas, wordlimit.ai, statementory.com), UK tutoring and medical-admissions sites, and several 2026/2027-specific guides. Official rules confirmed on ucas.com: three questions, 4,000 characters including spaces, at least 350 per answer, for 2026 entry onwards. |
| Volume | Not available |
| Competition | Moderate and specialized. Many competitors explain the rules; fewer tools handle all three answers with per-answer minimums. That is where WriteWise's checker is differentiated. |
| Country notes | **UK.** British spelling is fine in UK-facing copy, but the site uses one shared page (no UK duplicate page). |
| Target page | `/tools/application-limit-checker` (UCAS mode) and `/blog/how-to-check-your-ucas-personal-statement-character-count` |
| New page justified? | **Yes, one guide.** The guide answers the rules question with sources; the tool does the checking. |

### Remove duplicate lines

| Field | Finding |
| --- | --- |
| Phrase researched | "remove duplicate lines online" (US SERP) |
| Intent | Tool. Snippets mention emails, URLs, keywords, SKUs and CSV columns as the content being deduplicated. |
| Evidence | Many near-identical tools (convertcase.net, textcompare.org, lddgo, many `*.pages.dev`). Common features: case sensitivity, trimming, keep first occurrence, sorting. |
| Volume | Not available |
| Competition | High for the generic phrase. The email use case ("remove duplicate email addresses") is mentioned in snippets but was not separately searched. |
| Target page | `/tools/remove-duplicate-lines`, `/blog/how-to-remove-duplicate-lines-from-a-list` (covers email lists) |
| New page justified? | **One guide, no extra tool page.** "Remove duplicate emails" uses the same tool; a separate email tool page would be a doorway-style duplicate. |

### Sort lines

| Field | Finding |
| --- | --- |
| Phrase researched | "sort lines alphabetically online tool" (US SERP) |
| Intent | Tool. |
| Evidence | Established tools (TextFixer, Quackit, CodeShack, textcompare.org) and many small sites. Features commonly offered: A–Z/Z–A, natural/numeric, by length, reverse, remove duplicates. |
| Volume | Not available |
| Competition | High for a simple utility. WriteWise's differentiation: correct natural sorting, stable sorts, Unicode-aware collation and clear explanations. |
| Target page | `/tools/sort-lines` |
| New page justified? | **Tool page only.** A "how to sort a list alphabetically" guide would mostly repeat the tool page, so it was not written. |

### Text cleaner / remove line breaks

| Field | Finding |
| --- | --- |
| Phrase researched | "clean up text copied from pdf remove line breaks online" (US SERP) |
| Intent | Problem-solving: fix PDF line breaks without losing paragraphs. |
| Evidence | Mostly single-purpose "remove line breaks" tools, plus forum threads (Obsidian) and a DEV Community article specifically about "without destroying paragraphs", which shows a real pain point that simple tools don't solve. |
| Volume | Not available |
| Competition | Many tools; few explain the paragraph-preserving approach or warn about hyphenation. |
| Target page | `/tools/text-cleaner`, `/blog/how-to-clean-text-copied-from-a-pdf` |
| New page justified? | **Yes**, one tool and one guide covering distinct intents (do it vs. understand it). |

### Find and replace

| Field | Finding |
| --- | --- |
| Phrase researched | "find and replace text online regex" (US SERP) |
| Intent | Tool, often with regex. |
| Evidence | Many tools; feature lists commonly include case sensitivity, whole word, regex and highlighting; a few offer undo. |
| Volume | Not available |
| Competition | High. Differentiation: safe regex (timeout in a worker), live preview with highlighting, undo. |
| Target page | `/tools/find-and-replace` |
| New page justified? | Tool page only. |

### Word frequency counter

| Field | Finding |
| --- | --- |
| Phrase researched | "word frequency counter online" (US SERP) |
| Intent | Tool, often framed around SEO "keyword density". |
| Evidence | Many tools; several frame results as SEO metrics. WriteWise deliberately doesn't, because search engines don't use a target keyword density. |
| Volume | Not available |
| Target page | `/tools/word-frequency-counter` |
| New page justified? | Tool page only. |

### Not researched in this pass

These seed phrases were **not** searched, and no claims are made about them: "word count checker", "count words in essay",
"character counter", "character count online", "character counter with spaces", "character limit checker", "duplicate
line remover", "remove duplicate words from list", "remove extra spaces", "remove blank lines", "alphabetical order tool",
"sort list online", "replace words in text", "bulk text replacement", "personal statement character count", "application
word limit checker", "reading time calculator", "how long to read 1000 words" and "words per minute calculator". Each has
a planned target page in KEYWORD-MAPPING.md so no new pages are needed to cover them; validate them in Search Console
after launch.

---

## Country-specific opportunities

- **United Kingdom:** the UCAS three-question format (2026 entry onwards) is a clear, time-sensitive need, and the
  official rules are verifiable. Keep the UCAS guide's "facts checked" date current each application cycle. UK-facing
  copy already explains British spelling where it matters (essay guide, case converter).
- **United States:** Common App and supplemental essay limits are the main application-specific need. Blocked on
  verifying the Common App limit from an official source (audit C2).
- **Canada:** there's no single national application, so a "Canada" landing page would have nothing true and specific to
  say. The custom limit modes serve Canadian supplementary applications and scholarships without inventing rules.
- **All markets:** avoid separate country pages that only change the country name. One page per intent, with
  country-specific facts inside it where they're true.

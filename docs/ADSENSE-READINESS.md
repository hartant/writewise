# AdSense readiness checklist

No advertising code is included. `src/components/ad-slot.tsx` marks reserved positions and renders nothing.
Work through this list before enabling ads. Approval is decided by Google and is never guaranteed.

## 1. Before applying

- [ ] The site has been live long enough to have real, useful content and some organic traffic
- [ ] Every tool works on mobile and desktop (`npm test` and `npm run check-links` pass)
- [ ] All content is original and genuinely helpful; no thin, duplicated or auto-generated pages
- [ ] About, Contact (with a working email), Privacy Policy, Terms and Disclaimer are complete and accurate
- [ ] Navigation is clear and every page is reachable from the header, footer or tools index
- [ ] The site is verified in Google Search Console, with no manual actions or security issues
- [ ] You've read the current [AdSense Program policies](https://support.google.com/adsense/answer/48182) and
      eligibility requirements, including how they apply to a free hosting subdomain. Many publishers move to their
      own domain before applying.

## 2. Consent (required before serving ads)

- [ ] For visitors in the UK, EEA and Switzerland, Google requires a **Google-certified consent management platform
      (CMP)** integrated with the IAB TCF. The simple analytics banner in `src/components/consent.tsx` is **not** a
      certified CMP. Use Google's own *Privacy & messaging* tool in AdSense or another certified CMP.
- [ ] Review US state privacy requirements (e.g. California) and add any required opt-out link.
- [ ] Google Consent Mode v2 defaults are set to `denied` until the visitor consents.

## 3. Implementation

- [ ] Add `public/ads.txt` with the line Google provides (`google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`).
- [ ] Load the AdSense script only after consent, with `next/script` and `strategy="afterInteractive"` or `lazyOnload`.
- [ ] Implement `AdSlot` so that it reserves a **fixed min-height** (e.g. 280 px for a responsive unit) to keep
      CLS below 0.1, and renders nothing when ads are disabled.
- [ ] Use only the reserved placements:
  - `below-tool`: after the tool, before the guide (`src/components/tool-page.tsx`)
  - `article-end`: after a guide's body (`src/app/blog/[slug]/page.tsx`)
  - Optionally one `in-content` unit inside long guides
- [ ] Never place ads inside a tool, between a tool's input and its results, next to buttons where they could be
      mis-clicked, or in pop-ups or sticky overlays that cover content.
- [ ] Don't use auto ads until you've checked where they appear on mobile tool pages.

## 4. Update policies

- [ ] Privacy Policy: add an Advertising section naming Google AdSense, describing personalized vs.
      non-personalized ads, cookies used and how to opt out, and linking to Google's partner-sites policy.
- [ ] Add a cookie and ad-choices link in the footer that reopens the CMP.

## 5. After launch

- [ ] Recheck Core Web Vitals in Search Console and PageSpeed Insights; ads often hurt LCP and CLS.
- [ ] Watch the AdSense Policy Center and fix any issues promptly.
- [ ] Never click your own ads or ask others to.

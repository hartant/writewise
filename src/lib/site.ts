function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  const cfPages = process.env.CF_PAGES_URL;
  if (cfPages) return cfPages.replace(/\/+$/, "");
  return "http://localhost:3000";
}

export const site = {
  name: "WriteWise",
  tagline: "Free, private writing and study tools",
  description:
    "Free writing and study tools that run entirely in your browser. Count words, track essay goals, compare drafts and clean up text with no sign-up and no uploads.",
  url: resolveSiteUrl(),
  locale: "en_US",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@example.com",
  contactConfigured: Boolean(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  gscVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined,
  gaId: process.env.NEXT_PUBLIC_GA_ID || undefined,
  legalUpdated: "November 9, 2026",
} as const;

export function absoluteUrl(path = "/"): string {
  if (path === "/") return site.url + "/";
  return site.url + (path.startsWith("/") ? path : `/${path}`);
}

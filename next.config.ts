import type { NextConfig } from "next";

// Set STATIC_EXPORT=true to emit a fully static site in /out
// (for Cloudflare Pages, Netlify, GitHub Pages or any static host).
const isStaticExport = process.env.STATIC_EXPORT === "true";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

if (process.env.NODE_ENV === "production") {
  const hasUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.CF_PAGES_URL;
  if (!hasUrl) console.warn("⚠ NEXT_PUBLIC_SITE_URL is not set: canonical URLs and the sitemap will use http://localhost:3000.");
  if (!process.env.NEXT_PUBLIC_CONTACT_EMAIL) console.warn("⚠ NEXT_PUBLIC_CONTACT_EMAIL is not set: the Contact page will show a placeholder notice.");
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  ...(isStaticExport
    ? { output: "export", images: { unoptimized: true } }
    : {
        async headers() {
          return [{ source: "/:path*", headers: securityHeaders }];
        },
      }),
};

export default nextConfig;

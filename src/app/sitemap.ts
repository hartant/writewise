import type { MetadataRoute } from "next";
import { absoluteUrl, site } from "@/lib/site";
import { tools, toolPath } from "@/lib/tools";
import { posts, postPath } from "@/lib/posts";

export const dynamic = "force-static";

// Update when page content meaningfully changes (not on every deploy).
const SITE_UPDATED = "2026-11-09";

export default function sitemap(): MetadataRoute.Sitemap {
  // The homepage URL has no trailing slash, matching the canonical tag Next.js renders.
  const page = (path: string, lastModified = SITE_UPDATED) => ({ url: path === "/" ? site.url : absoluteUrl(path), lastModified });
  return [
    page("/"),
    page("/tools"),
    ...tools.map((t) => page(toolPath(t.slug))),
    page("/blog"),
    ...posts.map((p) => page(postPath(p.slug), p.modified)),
    page("/about"),
    page("/contact"),
    page("/privacy"),
    page("/terms"),
    page("/disclaimer"),
  ];
}

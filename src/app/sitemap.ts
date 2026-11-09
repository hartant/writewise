import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { tools, toolPath } from "@/lib/tools";
import { posts, postPath } from "@/lib/posts";

export const dynamic = "force-static";

// Update when page content meaningfully changes (not on every deploy).
const SITE_UPDATED = "2026-11-09";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, lastModified = SITE_UPDATED) => ({ url: absoluteUrl(path), lastModified });
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

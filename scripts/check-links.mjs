#!/usr/bin/env node
/**
 * Crawls a running WriteWise server and verifies:
 * - every internal link returns HTTP 200 (and unknown URLs return 404)
 * - every page has exactly one <h1>, a unique <title> and meta description,
 *   a canonical URL, Open Graph tags and no accidental noindex
 * - every URL in sitemap.xml is reachable and every crawled page is in the sitemap
 *
 * Usage: npm run build && npm start   (in one terminal)
 *        npm run check-links [base-url] (in another; defaults to http://localhost:3000)
 */
const base = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const errors = [];
const warnings = [];
const pages = new Map();
const queue = ["/"];
const seen = new Set(queue);

const attr = (tag, name) => tag.match(new RegExp(`${name}="([^"]*)"`))?.[1];
const metaContent = (html, key, value) => {
  for (const tag of html.match(/<meta\b[^>]*>/g) ?? []) if (attr(tag, key) === value) return attr(tag, "content");
  return undefined;
};
const decode = (s) => s?.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');

while (queue.length) {
  const path = queue.shift();
  const res = await fetch(base + path, { redirect: "manual" });
  if (res.status !== 200) {
    errors.push(`${path} → HTTP ${res.status}`);
    continue;
  }
  const html = await res.text();
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1]);
  const description = decode(metaContent(html, "name", "description"));
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const robots = metaContent(html, "name", "robots") ?? "";
  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
  const ogTitle = metaContent(html, "property", "og:title");
  const ogImage = metaContent(html, "property", "og:image");
  const jsonLd = (html.match(/application\/ld\+json/g) ?? []).length;
  pages.set(path, { title, description, canonical, robots, h1s, jsonLd });

  if (!title) errors.push(`${path}: missing <title>`);
  if (!description) errors.push(`${path}: missing meta description`);
  else if (description.length > 170 || description.length < 70) warnings.push(`${path}: description is ${description.length} chars`);
  if (title && title.length > 65) warnings.push(`${path}: title is ${title.length} chars (“${title}”)`);
  if (!canonical) errors.push(`${path}: missing canonical`);
  else if (new URL(canonical).pathname !== path) errors.push(`${path}: canonical points to ${canonical}`);
  if (/noindex/.test(robots)) errors.push(`${path}: has noindex`);
  if (h1s !== 1) errors.push(`${path}: has ${h1s} <h1> elements`);
  if (!ogTitle || !ogImage) errors.push(`${path}: missing Open Graph title or image`);

  for (const m of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const href = m[1];
    if (/^(https?:|mailto:|tel:|#)/.test(href)) continue;
    const clean = href.split("#")[0].split("?")[0] || "/";
    if (!seen.has(clean)) {
      seen.add(clean);
      queue.push(clean);
    }
  }
}

// Duplicate titles / descriptions
for (const field of ["title", "description"]) {
  const byValue = new Map();
  for (const [path, p] of pages) byValue.set(p[field], [...(byValue.get(p[field]) ?? []), path]);
  for (const [value, paths] of byValue) if (paths.length > 1) errors.push(`Duplicate ${field} “${value}” on ${paths.join(", ")}`);
}

// Sitemap and robots
const sitemap = await (await fetch(base + "/sitemap.xml")).text();
const sitemapPaths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
for (const p of sitemapPaths) {
  const r = await fetch(base + p, { method: "HEAD" });
  if (r.status !== 200) errors.push(`Sitemap URL ${p} → HTTP ${r.status}`);
}
for (const p of pages.keys()) if (!sitemapPaths.includes(p)) errors.push(`Crawled page ${p} is missing from sitemap.xml`);
const robotsTxt = await (await fetch(base + "/robots.txt")).text();
if (!/Sitemap:/i.test(robotsTxt)) errors.push("robots.txt has no Sitemap line");
if (/Disallow:\s*\/\s*$/m.test(robotsTxt)) errors.push("robots.txt disallows the whole site");

// Unknown URLs must 404
for (const p of ["/this-page-does-not-exist", "/blog/not-a-real-post", "/tools/not-a-tool"]) {
  const r = await fetch(base + p);
  if (r.status !== 404) errors.push(`${p} should be 404 but returned ${r.status}`);
}

console.log(`Crawled ${pages.size} pages, ${sitemapPaths.length} sitemap URLs.\n`);
for (const [path, p] of pages) console.log(`${p.h1s === 1 ? "✓" : "✗"} ${path.padEnd(48)} ${p.title}  [ld+json: ${p.jsonLd}]`);
if (warnings.length) console.log(`\nWarnings:\n  ${warnings.join("\n  ")}`);
if (errors.length) {
  console.error(`\n✗ ${errors.length} error(s):\n  ${errors.join("\n  ")}`);
  process.exit(1);
}
console.log("\n✓ All links, metadata, sitemap and status codes look good.");

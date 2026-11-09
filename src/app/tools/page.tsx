import type { Metadata } from "next";
import { categories, tools } from "@/lib/tools";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ToolCard } from "@/components/tool-card";

export const metadata: Metadata = pageMetadata({
  title: "All Free Writing & Text Tools",
  description:
    "Browse every WriteWise tool: word and character counters, reading time, essay goal tracking, duplicate line removal, case conversion and text comparison.",
  path: "/tools",
});

export default function ToolsPage() {
  return (
    <div className="container-ww pt-8">
      <Breadcrumbs items={[{ name: "Tools", path: "/tools" }]} />
      <header className="mt-6 max-w-3xl">
        <h1 className="font-display text-[2.5rem] font-semibold leading-[1.1] tracking-tight text-ink sm:text-[3.25rem]">All writing tools</h1>
        <p className="mt-4 text-lg leading-8 text-ink-2">
          Eight focused tools for counting, cleaning up and reviewing text. Each one runs in your browser, works on any device
          and comes with a short guide explaining how it works.
        </p>
      </header>
      <div className="mt-12 space-y-14">
        {categories.map((c) => (
          <section key={c.id} id={c.id} aria-labelledby={`${c.id}-h`} className="scroll-mt-24">
            <h2 id={`${c.id}-h`} className="font-display text-[1.6rem] font-semibold text-ink">
              {c.name}
            </h2>
            <p className="mt-1.5 max-w-2xl text-muted">{c.description}</p>
            <div className="mt-4 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
              {tools
                .filter((t) => t.category === c.id)
                .map((t) => (
                  <ToolCard key={t.slug} tool={t} />
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

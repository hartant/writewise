import Link from "next/link";
import type { Metadata } from "next";
import { tasks, toolPath, tools } from "@/lib/tools";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ToolDirectory } from "@/components/tool-directory";

export const metadata: Metadata = pageMetadata({
  title: "All Free Writing & Text Tools",
  description:
    "Every WriteWise tool in one place: word and character counters, UCAS and Common App limit checks, text cleanup, duplicate removal, sorting, find and replace and more.",
  path: "/tools",
});

export default function ToolsPage() {
  return (
    <div className="container-ww pt-8">
      <Breadcrumbs items={[{ name: "Tools", path: "/tools" }]} />
      <header className="mt-6 max-w-3xl">
        <h1 className="font-display text-[2.5rem] font-semibold leading-[1.1] tracking-tight text-ink sm:text-[3.25rem]">All writing tools</h1>
        <p className="mt-4 text-lg leading-8 text-ink-2">
          {tools.length} focused tools for counting, checking limits, cleaning up and comparing text. Each runs in your browser and
          comes with a short guide to how it works.
        </p>
      </header>

      <section aria-labelledby="tasks-h" className="mt-10 border-y border-line py-6">
        <h2 id="tasks-h" className="font-display text-lg font-semibold text-ink">
          Common tasks
        </h2>
        <ul className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((t) => (
            <li key={t.label}>
              <Link href={toolPath(t.slug)} className="text-[0.95rem] text-ink-2 underline decoration-line-strong underline-offset-4 hover:text-ink hover:decoration-accent">
                {t.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-10">
        <ToolDirectory />
      </div>
    </div>
  );
}

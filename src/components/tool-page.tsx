import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { getTool, toolPath, type ToolMeta } from "@/lib/tools";
import { getPost, postPath } from "@/lib/posts";
import { webAppLd } from "@/lib/jsonld";
import { Breadcrumbs } from "./breadcrumbs";
import { Faq, type FaqItem } from "./faq";
import { JsonLd } from "./json-ld";
import { PrivacyBadge } from "./privacy-badge";
import { ToolCard } from "./tool-card";
import { AdSlot } from "./ad-slot";

type Props = {
  tool: ToolMeta;
  /** The interactive tool (a client component). */
  children: ReactNode;
  /** Server-rendered explanatory content. */
  guide: ReactNode;
  faqs: FaqItem[];
};

export function ToolPage({ tool, children, guide, faqs }: Props) {
  const related = tool.related.map(getTool);
  const guides = tool.guides.map(getPost).filter((p) => p !== undefined);

  return (
    <>
      <JsonLd data={webAppLd({ name: tool.name, description: tool.metaDescription, path: toolPath(tool.slug) })} />

      <section className="border-b border-line">
        <div className="container-ww pb-8 pt-6 sm:pt-8">
          <Breadcrumbs items={[{ name: "Tools", path: "/tools" }, { name: tool.name, path: toolPath(tool.slug) }]} />
          <h1 className="mt-6 font-display text-[2.5rem] font-semibold leading-[1.1] tracking-tight text-ink sm:text-[3.25rem]">{tool.name}</h1>
          <p className="mt-3 max-w-3xl text-lg leading-8 text-ink-2">{tool.lead}</p>
          <div className="mt-3">
            <PrivacyBadge mode={tool.processing} />
          </div>
        </div>
      </section>

      <div className="container-ww">
        <section aria-label={`${tool.name} tool`} className="-mt-px pt-8">
          {children}
        </section>

        <AdSlot placement="below-tool" />

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <article className="prose-ww max-w-3xl">{guide}</article>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start" aria-label="Related">
            <div>
              <h2 className="font-display text-base font-semibold text-ink">Related tools</h2>
              <ul className="mt-2 border-t border-line">
                {related.map((t) => (
                  <li key={t.slug} className="border-b border-line">
                    <Link href={toolPath(t.slug)} className="block py-2.5 text-[0.95rem] text-ink-2 hover:text-ink hover:underline hover:decoration-accent hover:decoration-2 hover:underline-offset-4">
                      {t.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {guides.length > 0 && (
              <div>
                <h2 className="font-display text-base font-semibold text-ink">Guides</h2>
                <ul className="mt-2 border-t border-line">
                  {guides.map((p) => (
                    <li key={p.slug} className="border-b border-line">
                      <Link href={postPath(p.slug)} className="block py-2.5 text-[0.95rem] leading-6 text-ink-2 hover:text-ink hover:underline hover:decoration-accent hover:decoration-2 hover:underline-offset-4">
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>

        <div className="mt-16 max-w-3xl">
          <Faq items={faqs} />
        </div>

        <section className="mt-20" aria-labelledby="more-tools">
          <div className="flex items-end justify-between gap-4">
            <h2 id="more-tools" className="font-display text-[2rem] font-semibold tracking-tight text-ink">
              Other tools
            </h2>
            <Link href="/tools" className="hidden items-center gap-1 text-sm font-semibold text-accent-text sm:inline-flex">
              All tools <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-6 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.slice(0, 3).map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, PenLine } from "lucide-react";
import { getPost, postPath, posts } from "@/lib/posts";
import { getTool, toolPath } from "@/lib/tools";
import { articleLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { articles } from "@/content/blog";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { PostCard } from "@/components/post-card";
import { AdSlot } from "@/components/ad-slot";

// Only the slugs below exist; anything else returns a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return pageMetadata({
    title: post.seoTitle,
    description: post.description,
    path: postPath(post.slug),
    type: "article",
    publishedTime: post.published,
    modifiedTime: post.modified,
  });
}

const dateFmt = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  const content = articles[slug];
  if (!post || !content) notFound();
  const { Article, faqs } = content;
  const tools = post.relatedTools.map(getTool);
  const more = posts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <JsonLd
        data={articleLd({
          title: post.title,
          description: post.description,
          path: postPath(post.slug),
          published: post.published,
          modified: post.modified,
        })}
      />
      <div className="container-ww pt-8">
        <Breadcrumbs items={[{ name: "Guides", path: "/blog" }, { name: post.title, path: postPath(post.slug) }]} />
        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="max-w-3xl">
            <header>
              <p className="text-sm text-muted">{post.tag}</p>
              <h1 className="mt-3 font-display text-[2.5rem] font-semibold leading-[1.12] tracking-tight text-ink sm:text-[3.25rem]">
                {post.title}
              </h1>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <PenLine className="h-4 w-4" aria-hidden="true" />
                  {site.name} Editorial Team
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  <time dateTime={post.modified}>
                    {post.modified === post.published ? "Published" : "Updated"} {dateFmt.format(new Date(post.modified))}
                  </time>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  {post.readingMinutes} min read
                </span>
              </div>
            </header>
            <article className="prose-ww mt-10">
              <Article />
            </article>
            <AdSlot placement="article-end" />
            <div className="mt-16">
              <Faq items={faqs} heading="Quick answers" />
            </div>
          </div>
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start" aria-label="Related tools">
            <div>
              <h2 className="font-display text-base font-semibold text-ink">Tools for this guide</h2>
              <ul className="mt-2 border-t border-line">
                {tools.map((t) => (
                  <li key={t.slug} className="border-b border-line">
                    <Link href={toolPath(t.slug)} className="group block py-3">
                      <span className="block text-[0.95rem] font-bold text-ink decoration-accent decoration-2 underline-offset-4 group-hover:underline">
                        {t.name}
                      </span>
                      <span className="mt-0.5 block text-sm leading-5 text-muted">{t.summary}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
        <section className="mt-20" aria-labelledby="more-guides">
          <h2 id="more-guides" className="font-display text-[2rem] font-semibold tracking-tight text-ink">
            Keep reading
          </h2>
          <div className="mt-6 grid gap-x-10 md:grid-cols-2">
            {more.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

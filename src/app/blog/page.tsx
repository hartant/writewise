import type { Metadata } from "next";
import { posts } from "@/lib/posts";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PostCard } from "@/components/post-card";

export const metadata: Metadata = pageMetadata({
  title: "Writing Guides for Students and Professionals",
  description:
    "Practical, research-backed guides on word counts, essay writing, reading time and character limits for students, writers and job seekers.",
  path: "/blog",
});

export default function BlogIndex() {
  return (
    <div className="container-ww pt-8">
      <Breadcrumbs items={[{ name: "Guides", path: "/blog" }]} />
      <header className="mt-6 max-w-3xl">
        <h1 className="font-display text-[2.5rem] font-semibold leading-[1.1] tracking-tight text-ink sm:text-[3.25rem]">Writing guides</h1>
        <p className="mt-4 text-lg leading-8 text-ink-2">
          Clear answers to the questions that come up while you write: what counts toward a word limit, how long something takes
          to read, and how to turn a first draft into a strong final one.
        </p>
      </header>
      <div className="mt-10 grid gap-x-10 md:grid-cols-2">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} headingLevel={2} />
        ))}
      </div>
    </div>
  );
}

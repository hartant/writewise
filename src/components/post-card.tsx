import Link from "next/link";
import { postPath, type PostMeta } from "@/lib/posts";

export function PostCard({ post, headingLevel = 3 }: { post: PostMeta; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <Link href={postPath(post.slug)} className="group block h-full border-t border-line py-5 transition-colors hover:border-accent">
      <p className="text-sm text-muted">
        {post.tag} · {post.readingMinutes} min read
      </p>
      <H className="mt-2 font-display text-[1.35rem] font-semibold leading-snug text-ink decoration-accent decoration-2 underline-offset-4 group-hover:underline">
        {post.title}
      </H>
      <p className="mt-2 text-[0.95rem] leading-6 text-muted">{post.excerpt}</p>
    </Link>
  );
}

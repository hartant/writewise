import Link from "next/link";
import type { Metadata } from "next";
import { tools } from "@/lib/tools";
import { ToolCard } from "@/components/tool-card";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for does not exist.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="container-ww py-16 sm:py-24">
      <p className="font-mono text-sm text-muted">Error 404</p>
      <h1 className="mt-3 max-w-2xl font-display text-[2.5rem] font-semibold leading-tight tracking-tight text-ink sm:text-[3.25rem]">
        There&apos;s no page at this address.
      </h1>
      <p className="mt-4 max-w-xl text-lg leading-8 text-ink-2">
        The link may be mistyped or the page may have moved. Go to the <Link href="/" className="pencil-link text-ink">homepage</Link>{" "}
        or pick a tool below.
      </p>
      <div className="mt-10 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <ToolCard key={t.slug} tool={t} headingLevel={2} />
        ))}
      </div>
    </div>
  );
}

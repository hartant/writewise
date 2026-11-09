import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { toolPath, type ToolMeta } from "@/lib/tools";

/** A tool as an entry in a contents list: name, one line of what it does. */
export function ToolCard({ tool, headingLevel = 3 }: { tool: ToolMeta; headingLevel?: 2 | 3 | 4 }) {
  const H = headingLevel === 2 ? "h2" : headingLevel === 4 ? "h4" : "h3";
  return (
    <Link href={toolPath(tool.slug)} className="group block h-full border-t border-line py-4 transition-colors hover:border-accent">
      <H className="flex items-baseline justify-between gap-3 font-display text-[1.2rem] font-semibold text-ink">
        <span className="decoration-accent decoration-2 underline-offset-4 group-hover:underline">{tool.name}</span>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-accent" aria-hidden="true" />
      </H>
      <p className="mt-1.5 text-[0.95rem] leading-6 text-muted">{tool.summary}</p>
    </Link>
  );
}

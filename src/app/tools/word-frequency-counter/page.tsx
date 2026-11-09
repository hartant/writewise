import type { Metadata } from "next";
import { getTool, toolPath } from "@/lib/tools";
import { pageMetadata } from "@/lib/seo";
import { ToolPage } from "@/components/tool-page";
import { WordFrequencyCounter } from "@/tools/word-frequency-counter";
import { Guide, faqs } from "@/content/tools/word-frequency-counter";

const tool = getTool("word-frequency-counter");

export const metadata: Metadata = pageMetadata({
  title: tool.seoTitle,
  description: tool.metaDescription,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage tool={tool} guide={<Guide />} faqs={faqs}>
      <WordFrequencyCounter />
    </ToolPage>
  );
}

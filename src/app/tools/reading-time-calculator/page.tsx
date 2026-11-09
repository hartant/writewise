import type { Metadata } from "next";
import { getTool, toolPath } from "@/lib/tools";
import { pageMetadata } from "@/lib/seo";
import { ToolPage } from "@/components/tool-page";
import { ReadingTimeCalculator } from "@/tools/reading-time-calculator";
import { Guide, faqs } from "@/content/tools/reading-time-calculator";

const tool = getTool("reading-time-calculator");

export const metadata: Metadata = pageMetadata({
  title: tool.seoTitle,
  description: tool.metaDescription,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage tool={tool} guide={<Guide />} faqs={faqs}>
      <ReadingTimeCalculator />
    </ToolPage>
  );
}

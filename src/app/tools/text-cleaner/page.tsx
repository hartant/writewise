import type { Metadata } from "next";
import { getTool, toolPath } from "@/lib/tools";
import { pageMetadata } from "@/lib/seo";
import { ToolPage } from "@/components/tool-page";
import { TextCleaner } from "@/tools/text-cleaner";
import { Guide, faqs } from "@/content/tools/text-cleaner";

const tool = getTool("text-cleaner");

export const metadata: Metadata = pageMetadata({
  title: tool.seoTitle,
  description: tool.metaDescription,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage tool={tool} guide={<Guide />} faqs={faqs}>
      <TextCleaner />
    </ToolPage>
  );
}

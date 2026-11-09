import type { Metadata } from "next";
import { getTool, toolPath } from "@/lib/tools";
import { pageMetadata } from "@/lib/seo";
import { ToolPage } from "@/components/tool-page";
import { RemoveDuplicateLines } from "@/tools/remove-duplicate-lines";
import { Guide, faqs } from "@/content/tools/remove-duplicate-lines";

const tool = getTool("remove-duplicate-lines");

export const metadata: Metadata = pageMetadata({
  title: tool.seoTitle,
  description: tool.metaDescription,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage tool={tool} guide={<Guide />} faqs={faqs}>
      <RemoveDuplicateLines />
    </ToolPage>
  );
}

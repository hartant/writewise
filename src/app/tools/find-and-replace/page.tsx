import type { Metadata } from "next";
import { getTool, toolPath } from "@/lib/tools";
import { pageMetadata } from "@/lib/seo";
import { ToolPage } from "@/components/tool-page";
import { FindAndReplace } from "@/tools/find-and-replace";
import { Guide, faqs } from "@/content/tools/find-and-replace";

const tool = getTool("find-and-replace");

export const metadata: Metadata = pageMetadata({
  title: tool.seoTitle,
  description: tool.metaDescription,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage tool={tool} guide={<Guide />} faqs={faqs}>
      <FindAndReplace />
    </ToolPage>
  );
}

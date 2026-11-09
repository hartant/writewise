import type { Metadata } from "next";
import { getTool, toolPath } from "@/lib/tools";
import { pageMetadata } from "@/lib/seo";
import { ToolPage } from "@/components/tool-page";
import { ApplicationLimitChecker } from "@/tools/application-limit-checker";
import { Guide, faqs } from "@/content/tools/application-limit-checker";

const tool = getTool("application-limit-checker");

export const metadata: Metadata = pageMetadata({
  title: tool.seoTitle,
  description: tool.metaDescription,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage tool={tool} guide={<Guide />} faqs={faqs}>
      <ApplicationLimitChecker />
    </ToolPage>
  );
}

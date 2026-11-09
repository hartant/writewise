import type { Metadata } from "next";
import { getTool, toolPath } from "@/lib/tools";
import { pageMetadata } from "@/lib/seo";
import { ToolPage } from "@/components/tool-page";
import { EssayWordGoalTracker } from "@/tools/essay-word-goal-tracker";
import { Guide, faqs } from "@/content/tools/essay-word-goal-tracker";

const tool = getTool("essay-word-goal-tracker");

export const metadata: Metadata = pageMetadata({
  title: tool.seoTitle,
  description: tool.metaDescription,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage tool={tool} guide={<Guide />} faqs={faqs}>
      <EssayWordGoalTracker />
    </ToolPage>
  );
}

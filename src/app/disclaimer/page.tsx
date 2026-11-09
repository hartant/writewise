import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { StaticPage } from "@/components/static-page";

export const metadata: Metadata = pageMetadata({
  title: "Disclaimer",
  description: "Important information about the accuracy of WriteWise tools and guides, and how to use them responsibly.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <StaticPage title="Disclaimer" path="/disclaimer" updated={site.legalUpdated}>
      <h2>Tool results are estimates</h2>
      <p>
        WriteWise tools follow the counting and formatting rules described on each tool page. Different programs, including
        Microsoft Word, Google Docs, Apple Pages and online application forms, make different decisions about hyphens, dashes,
        symbols, emoji and line breaks, so their results may differ slightly from ours. Reading and speaking times are based on
        published averages and will vary between individuals.
      </p>
      <p>
        <strong>When a limit really matters</strong>, such as an assignment, application or contract, confirm the count using the
        method specified by the organization that set the requirement, and leave yourself a small margin.
      </p>

      <h2>Guides are general information</h2>
      <p>
        Our articles provide general educational information about writing and studying. They are not academic, legal or
        professional advice. Rules on word limits, formatting, citation and academic integrity vary between schools, universities,
        employers and publishers. Your instructor, institution or the relevant official guidance always takes priority over our
        guides.
      </p>

      <h2>No affiliation</h2>
      <p>
        WriteWise is independent. We are not affiliated with or endorsed by Microsoft, Google, Apple, the Common Application, UCAS
        or any other organization mentioned on this site. Product and organization names are trademarks of their respective
        owners and are used only to describe their products and requirements.
      </p>

      <h2>External links</h2>
      <p>
        We link to external sources for reference. We don&apos;t control those sites and aren&apos;t responsible for their content,
        accuracy or availability.
      </p>

      <h2>Questions</h2>
      <p>
        If you think something on WriteWise is inaccurate, please <Link href="/contact">let us know</Link> so we can review it.
      </p>
    </StaticPage>
  );
}

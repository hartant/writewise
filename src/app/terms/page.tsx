import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { StaticPage } from "@/components/static-page";
import { ContactEmail } from "@/components/contact-email";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use",
  description: "The terms that apply when you use WriteWise's free writing tools and guides.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <StaticPage
      title="Terms of Use"
      path="/terms"
      updated={site.legalUpdated}
      intro="By using WriteWise, you agree to these terms. They're written to be readable, so please take a minute to go through them."
    >
      <h2>1. Using WriteWise</h2>
      <p>
        WriteWise provides free online tools and guides for writing and studying. You may use them for personal, educational and
        commercial purposes, as long as you follow these terms and the law.
      </p>

      <h2>2. Your content</h2>
      <p>
        Text you enter into our tools remains yours. Because the tools process text in your browser, we don&apos;t receive, store or
        claim any rights over it. You are responsible for the content you process and for having the right to use it.
      </p>

      <h2>3. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>attempt to disrupt, overload or gain unauthorized access to the site or its infrastructure;</li>
        <li>use automated systems to access the site in a way that places an unreasonable load on it;</li>
        <li>copy, republish or sell the site&apos;s guides, design or code as your own without permission;</li>
        <li>use the site in connection with any unlawful activity.</li>
      </ul>

      <h2>4. Academic integrity</h2>
      <p>
        Our tools help you measure, format and review your own writing. You are responsible for following your school&apos;s or
        employer&apos;s rules on academic integrity and original work.
      </p>

      <h2>5. Our content</h2>
      <p>
        The WriteWise name, logo, design, guides and software are owned by WriteWise and protected by intellectual property laws.
        You&apos;re welcome to link to any page and to quote short excerpts with attribution and a link back.
      </p>

      <h2>6. Accuracy and no warranty</h2>
      <p>
        We work hard to make our tools accurate and our guides reliable, but WriteWise is provided &quot;as is&quot; and &quot;as
        available&quot;, without warranties of any kind, express or implied. Counts and estimates follow the documented rules on
        each tool page and may differ from other software. Always confirm requirements, such as word limits, with the organization
        that sets them. See our <Link href="/disclaimer">Disclaimer</Link>.
      </p>

      <h2>7. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, WriteWise will not be liable for any indirect, incidental or consequential loss, or
        for any loss of data, grades, opportunities or profits, arising from your use of the site. Nothing in these terms limits
        liability that cannot be limited under applicable law, including consumer protection rights you have where you live.
      </p>

      <h2>8. Links to other websites</h2>
      <p>
        Our guides may link to other websites for reference. We aren&apos;t responsible for their content or privacy practices.
      </p>

      <h2>9. Changes</h2>
      <p>
        We may update these terms or change, add or remove features. We will post the updated terms on this page with a new
        &quot;Last updated&quot; date. Continuing to use WriteWise after changes means you accept the updated terms.
      </p>

      <h2>10. Contact</h2>
      <p>
        Questions about these terms? Email <ContactEmail />.
      </p>
    </StaticPage>
  );
}

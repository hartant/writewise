import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { StaticPage } from "@/components/static-page";
import { ContactEmail } from "@/components/contact-email";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description: "Get in touch with WriteWise to report a bug, suggest a new writing tool, flag an error in a guide or ask a question.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <StaticPage
      title="Contact us"
      path="/contact"
      intro="We read every message. The best way to reach us is by email."
    >
      <h2>Email</h2>
      <p>
        <strong>
          <ContactEmail />
        </strong>
      </p>
      <p>We aim to reply within a few business days.</p>

      <h2>Helpful details to include</h2>
      <ul>
        <li>
          <strong>Bug reports:</strong> the tool you were using, your browser and device, and what you expected to happen. Please{" "}
          <strong>don&apos;t</strong> send confidential text. A short sample that reproduces the issue is enough.
        </li>
        <li>
          <strong>Tool ideas:</strong> what you&apos;re trying to do and how you do it today.
        </li>
        <li>
          <strong>Corrections:</strong> the page address and, if possible, a source for the correct information.
        </li>
      </ul>

      <h2>Privacy</h2>
      <p>
        If you email us, we use your address and message only to reply and to improve WriteWise. We don&apos;t add you to a mailing
        list. See our <Link href="/privacy">Privacy Policy</Link> for more.
      </p>
    </StaticPage>
  );
}

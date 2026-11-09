import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { StaticPage } from "@/components/static-page";
import { ContactEmail } from "@/components/contact-email";

export const metadata: Metadata = pageMetadata({
  title: "About WriteWise",
  description:
    "WriteWise builds free, private writing and study tools that run in your browser. Learn about our principles, how we build our tools and our editorial standards.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <StaticPage
      title="About WriteWise"
      path="/about"
      intro="WriteWise is a free toolkit for anyone who writes to a deadline, a limit or a standard: students, job seekers, content creators and professionals."
    >
      <h2>Why we built it</h2>
      <p>
        Checking a word count or fixing a heading&apos;s capitalization should take seconds. Too often it means pasting a
        confidential cover letter or an unsubmitted essay into a site covered in pop-ups, with no idea where the text ends up. We
        wanted tools that are fast, calm and trustworthy, so we built them.
      </p>

      <h2>Our principles</h2>
      <ul>
        <li>
          <strong>Your text stays with you.</strong> Every tool processes text in your browser. We don&apos;t need your words to
          count them, so we don&apos;t collect them. If we ever offer a feature that needs a server, it will be clearly labeled before
          you use it.
        </li>
        <li>
          <strong>Free core tools, no account.</strong> You should never have to sign up to count words.
        </li>
        <li>
          <strong>Transparent results.</strong> Every tool page explains the rules behind its numbers, including where they may
          differ from Microsoft Word or Google Docs.
        </li>
        <li>
          <strong>Respect for your attention.</strong> No pop-ups, no autoplay and nothing that moves the page while you work.
        </li>
        <li>
          <strong>Fast everywhere.</strong> Pages are lightweight and work well on older phones and slow connections.
        </li>
      </ul>

      <h2>Editorial standards</h2>
      <p>
        Our guides are written for students and professionals in the United States, Canada and the United Kingdom. We write in
        American English by default and explain British and Canadian conventions where they differ. When we state a fact, such as
        an average reading speed, we name the research it comes from. When rules vary, such as what counts toward an essay word
        limit, we say so and point you to the authority that decides: your instructor, institution or the organization setting
        the requirement.
      </p>
      <p>
        We review guides when the underlying facts change, and each article shows the date it was last updated. If you spot an
        error, please tell us at <ContactEmail />.
      </p>

      <h2>What we&apos;re not</h2>
      <p>
        WriteWise isn&apos;t a plagiarism checker, an essay-writing service or a substitute for your instructor&apos;s guidance. Our
        tools help you measure, tidy and review your own work. See our <Link href="/disclaimer">Disclaimer</Link> for details.
      </p>

      <h2>Get in touch</h2>
      <p>
        Suggestions for new tools, bug reports and feedback are always welcome. Visit the <Link href="/contact">Contact page</Link>.
      </p>
    </StaticPage>
  );
}

import Link from "next/link";
import type { FaqItem } from "@/components/faq";
import { UCAS } from "@/lib/text/app-limits";

export function Guide() {
  return (
    <>
      <h2>How to use the checker</h2>
      <ol>
        <li>Choose what you&apos;re checking: UCAS, Common App, or a custom word or character limit.</li>
        <li>Paste your writing. For UCAS, paste each answer into its own box.</li>
        <li>Fix anything flagged in amber or red, then paste the final text into the official application and check its counter too.</li>
      </ol>

      <h2>UCAS personal statement (2026 entry onwards)</h2>
      <p>
        UCAS replaced the free-form personal statement with three questions for applications to start university in 2026 and later.
        According to UCAS:
      </p>
      <ul>
        <li>
          You answer three questions, and <strong>each answer needs at least {UCAS.minPerAnswer} characters</strong>.
        </li>
        <li>
          The three answers share an overall limit of <strong>{UCAS.maxTotal.toLocaleString("en-US")} characters, including spaces</strong>.
        </li>
        <li>You can divide the characters between the answers however you like.</li>
      </ul>
      <p>
        This checker counts each answer separately, adds them up and tells you how many characters you have left to share. It counts
        every character you see, including spaces, and counts each line break as one character. UCAS&apos;s own form is the final
        judge, so if you&apos;re within a handful of characters of a limit, check there too. Read the full walkthrough in{" "}
        <Link href="/blog/how-to-check-your-ucas-personal-statement-character-count">How to check your UCAS personal statement character count</Link>.
      </p>

      <h2>Common App personal essay</h2>
      <p>
        The Common App personal essay has long had a range of 250 to 650 words, and the checker loads those numbers. However, we
        couldn&apos;t confirm the current limit on a public Common App page when we last checked, so the checker labels it unverified.
        The limit displayed above the essay box in your Common App account is the one that applies. Supplemental essays for individual
        colleges have their own limits; edit the numbers to match.
      </p>

      <h2>Other applications, including Canada</h2>
      <p>
        There&apos;s no single national university application in Canada. Provinces and universities set their own requirements for
        supplementary applications, personal profiles and scholarship essays, and those vary by program. The same is true for most
        scholarship and job applications. Use <strong>Custom word limit</strong> or <strong>Custom character limit</strong> and type in
        the exact numbers from the instructions. For character limits, check whether spaces count; most online forms count them.
      </p>

      <h2>Why your count might not match the form</h2>
      <ul>
        <li>
          <strong>Line breaks:</strong> some forms count a line break as one character, some as two, and some strip blank lines when you
          paste.
        </li>
        <li>
          <strong>Smart quotes and dashes:</strong> word processors replace straight quotes and double hyphens with typographic
          characters. Some older forms convert them, which can change the count slightly.
        </li>
        <li>
          <strong>Emoji and symbols:</strong> some forms count an emoji as two characters. They&apos;re rarely a good idea in an
          application anyway.
        </li>
      </ul>
      <p>
        Leave a small margin rather than writing to the exact limit. For a general explanation of the two kinds of limit, read{" "}
        <Link href="/blog/word-count-vs-character-count">Word count vs. character count</Link>.
      </p>
    </>
  );
}

export const faqs: FaqItem[] = [
  {
    q: "How many characters is the UCAS personal statement?",
    a: `For 2026 entry onwards, up to ${UCAS.maxTotal.toLocaleString("en-US")} characters including spaces across three answers, with at least ${UCAS.minPerAnswer} characters per answer, according to UCAS.`,
  },
  {
    q: "Do spaces count in the UCAS character limit?",
    a: "Yes. UCAS states that the 4,000-character limit includes spaces. This checker counts spaces and line breaks too.",
  },
  {
    q: "Is the Common App essay limit 650 words?",
    a: "650 words has long been the maximum for the Common App personal essay, with 250 as the minimum. We couldn't verify the current limit on an official public page, so confirm it in the writing section of your Common App account.",
  },
  {
    q: "Is WriteWise connected to UCAS or Common App?",
    a: "No. WriteWise is independent. The checker helps you prepare, but the official application's counter is the final authority.",
  },
  {
    q: "Is my personal statement uploaded?",
    a: "No. Everything is counted in your browser. Nothing you paste is sent to WriteWise or anyone else.",
  },
];

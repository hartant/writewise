import Link from "next/link";
import type { FaqItem } from "@/components/faq";
import { UCAS } from "@/lib/text/app-limits";

export function Article() {
  return (
    <>
      <p className="text-xl leading-8 text-ink">
        For 2026 entry onwards, your UCAS personal statement is three answers rather than one essay. Together they can use up to{" "}
        <strong>4,000 characters including spaces</strong>, and <strong>each answer needs at least 350 characters</strong>. Here&apos;s
        how to check your count before you paste anything into UCAS, and why different programs sometimes disagree.
      </p>

      <div className="callout">
        <strong>The short answer:</strong> paste each answer into the{" "}
        <Link href="/tools/application-limit-checker">Application Limit Checker</Link>, which counts all three, adds them up and flags
        any answer under 350 characters. Then confirm the count in the UCAS form itself, which has the final say.
      </div>

      <h2 id="rules">The rules, according to UCAS</h2>
      <p>UCAS&apos;s guidance for 2026 entry onwards sets out the format:</p>
      <ol>
        {UCAS.questions.map((q) => (
          <li key={q}>{q}</li>
        ))}
      </ol>
      <ul>
        <li>All three questions must be answered.</li>
        <li>Each answer has a minimum of 350 characters.</li>
        <li>The overall limit is 4,000 characters, including spaces, shared across the three answers however you choose.</li>
      </ul>
      <p>
        Source:{" "}
        <a href={UCAS.sources[0].url} target="_blank" rel="noopener noreferrer">
          UCAS, How to write your personal statement (2026 entry onwards)
        </a>
        . Last checked by WriteWise on November 9, 2026. Requirements can change between application cycles, so check UCAS&apos;s
        current guidance for the year you&apos;re applying.
      </p>

      <h2 id="steps">How to check your character count, step by step</h2>
      <ol>
        <li>
          <strong>Draft in your usual editor.</strong> Write each answer as a separate section so you can see their lengths
          independently.
        </li>
        <li>
          <strong>Check each answer.</strong> Paste the answers into the three boxes of the{" "}
          <Link href="/tools/application-limit-checker">Application Limit Checker</Link>. Each box shows its own count and whether it
          meets the 350 minimum.
        </li>
        <li>
          <strong>Check the total.</strong> The bar at the top shows your total out of 4,000 and how many characters are left to share.
        </li>
        <li>
          <strong>Leave a margin.</strong> Aim to finish a little under 4,000, because counts can differ slightly between programs (see
          below).
        </li>
        <li>
          <strong>Confirm in UCAS.</strong> Paste your answers into the UCAS application and check its counter before you save.
        </li>
      </ol>

      <h2 id="word-processors">Checking in Word, Google Docs and Pages</h2>
      <p>You can also check each answer in the program you write in. Make sure you read the figure that includes spaces:</p>
      <table>
        <thead>
          <tr>
            <th>Program</th>
            <th>Where to look</th>
            <th>Figure to use</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Microsoft Word</td>
            <td>Review → Word Count (select one answer first)</td>
            <td>Characters (with spaces)</td>
          </tr>
          <tr>
            <td>Google Docs</td>
            <td>Tools → Word count (select one answer first)</td>
            <td>Characters</td>
          </tr>
          <tr>
            <td>Apple Pages</td>
            <td>View → Show Word Count, then choose the character option</td>
            <td>Characters (with spaces)</td>
          </tr>
        </tbody>
      </table>

      <h2 id="differences">Why counts can differ by a few characters</h2>
      <ul>
        <li>
          <strong>Line breaks.</strong> Programs differ on whether a paragraph break counts as one character, two or none. Blank lines
          between paragraphs can add several characters per answer.
        </li>
        <li>
          <strong>Typographic characters.</strong> Curly quotes, long dashes and ellipses are single characters, but online forms
          sometimes convert or strip them when you paste.
        </li>
        <li>
          <strong>Hidden characters.</strong> Text copied from web pages or PDFs can contain non-breaking or zero-width spaces. The{" "}
          <Link href="/tools/text-cleaner">Text Cleaner</Link> removes them.
        </li>
      </ul>
      <p>
        WriteWise counts every character you can see, counts spaces, and counts each line break as one character. That makes it a
        reliable guide, but the UCAS form decides.
      </p>

      <h2 id="budget">How to divide 4,000 characters</h2>
      <p>
        UCAS doesn&apos;t set a split beyond the 350-character minimum, and the right balance depends on your course and experience.
        One way to plan is to start roughly even, around 1,300 characters each, then shift characters toward the answer where you
        have the most relevant evidence. For example, an applicant with substantial work experience for a vocational course might give
        the third question more space; an applicant whose main preparation is academic might weight the second.
      </p>
      <p>
        Because the three answers are read together, avoid repeating the same point in more than one answer. Repetition is the
        easiest place to save characters.
      </p>

      <h2 id="cutting">Saving characters without losing substance</h2>
      <ul>
        <li>Cut openers that restate the question (&quot;I want to study this course because…&quot;).</li>
        <li>Replace phrases with single words: &quot;in order to&quot; → &quot;to&quot;, &quot;a large number of&quot; → &quot;many&quot;.</li>
        <li>Remove blank lines between paragraphs if your count is tight; a single line break still separates them.</li>
        <li>
          Check for repeated words with the <Link href="/tools/word-frequency-counter">Word Frequency Counter</Link>.
        </li>
      </ul>
      <p className="text-sm">
        WriteWise is independent and not affiliated with UCAS. For questions about your application, contact UCAS or your school&apos;s
        UCAS adviser.
      </p>
    </>
  );
}

export const faqs: FaqItem[] = [
  {
    q: "Does the UCAS 4,000-character limit include spaces?",
    a: "Yes. UCAS states the 4,000-character overall limit includes spaces.",
  },
  {
    q: "What is the minimum length of each UCAS answer?",
    a: "UCAS states that each of the three answers has a minimum of 350 characters.",
  },
  {
    q: "Do the UCAS question titles count toward the limit?",
    a: "No, only your answers count toward the 4,000 characters.",
  },
  {
    q: "Why is my Word count different from UCAS?",
    a: "Programs treat line breaks and some special characters differently. Leave a small margin and treat the count in the UCAS form as final.",
  },
];

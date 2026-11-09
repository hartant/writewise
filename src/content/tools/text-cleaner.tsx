import Link from "next/link";
import type { FaqItem } from "@/components/faq";

export function Guide() {
  return (
    <>
      <h2>How to clean up text</h2>
      <ol>
        <li>
          <strong>Paste your text</strong> into <em>Original text</em>, or load the example to see a typical PDF copy.
        </li>
        <li>
          <strong>Choose the fixes you want.</strong> The safe spacing fixes are on by default. Rules marked ⚠ change the structure of
          your text, so they start switched off.
        </li>
        <li>
          <strong>Check the preview</strong> and the list of changes, which shows how many places each rule changed.
        </li>
        <li>
          <strong>Copy or download the result.</strong> Your original isn&apos;t touched unless you click <em>Replace original with
          result</em>, and <em>Undo replace</em> brings it back.
        </li>
      </ol>

      <h2>What each rule does</h2>
      <p>Rules always run in the same order, top to bottom, so the result is predictable:</p>
      <table>
        <thead>
          <tr>
            <th>Rule</th>
            <th>Before</th>
            <th>After</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Remove invisible characters</td>
            <td>
              <code>co​operate</code> (contains a zero-width space)
            </td>
            <td>
              <code>cooperate</code>
            </td>
          </tr>
          <tr>
            <td>Collapse repeated spaces</td>
            <td>
              <code>the{"   "}result</code>
            </td>
            <td>
              <code>the result</code>
            </td>
          </tr>
          <tr>
            <td>Join hard-wrapped lines</td>
            <td>
              <code>a legally binding</code>
              <br />
              <code>target.</code>
            </td>
            <td>
              <code>a legally binding target.</code>
            </td>
          </tr>
          <tr>
            <td>Rejoin hyphenated words</td>
            <td>
              <code>signif-</code>
              <br />
              <code>icantly</code>
            </td>
            <td>
              <code>significantly</code>
            </td>
          </tr>
          <tr>
            <td>Collapse extra blank lines</td>
            <td>Four empty lines between paragraphs</td>
            <td>One empty line</td>
          </tr>
        </tbody>
      </table>

      <h3>Rules that need care</h3>
      <ul>
        <li>
          <strong>Join hard-wrapped lines</strong> treats a blank line as the end of a paragraph. Lists, addresses and poetry also use
          single line breaks, and those would be merged too, so only use it on prose.
        </li>
        <li>
          <strong>Rejoin words split by a hyphen</strong> only joins when the next line starts with a lowercase letter, but it can&apos;t
          tell a broken word from a real compound split across lines (&quot;well-&quot; + &quot;known&quot; would become
          &quot;wellknown&quot;). Read the preview before using it.
        </li>
        <li>
          <strong>Remove invisible characters</strong> deliberately keeps zero-width joiners, which emoji like 👨‍👩‍👧 and some writing
          systems depend on.
        </li>
      </ul>

      <h2>Why pasted text gets messy</h2>
      <p>
        PDFs store text as positioned lines on a page, not as paragraphs, so copying from a PDF usually gives you a line break at
        the end of every visual line, plus hyphens wherever a word was split. Web pages and word processors add non-breaking spaces
        and invisible formatting characters, and spreadsheets bring tabs. Our guide on{" "}
        <Link href="/blog/how-to-clean-text-copied-from-a-pdf">cleaning text copied from a PDF</Link> walks through a full example.
      </p>
      <p>
        Need more targeted edits? Use <Link href="/tools/find-and-replace">Find and Replace</Link> for specific words, or{" "}
        <Link href="/tools/remove-duplicate-lines">Remove Duplicate Lines</Link> for lists with more control over which copies stay.
      </p>
    </>
  );
}

export const faqs: FaqItem[] = [
  {
    q: "How do I remove line breaks from text copied from a PDF?",
    a: "Turn on “Join hard-wrapped lines”. Lines inside each paragraph are joined with a space, and blank lines between paragraphs are kept. If the PDF split words with hyphens at line ends, also turn on “Rejoin words split by a hyphen” and check the preview.",
  },
  {
    q: "Will the cleaner change my original text?",
    a: "No. The cleaned version appears in the preview, and your original stays as it is unless you click “Replace original with result”. You can undo that too.",
  },
  {
    q: "What are invisible characters?",
    a: "Characters such as zero-width spaces, byte-order marks and soft hyphens that take up no visible space. They often come along when you copy from web pages or documents and can break searches, word counts or form validation.",
  },
  {
    q: "Is my text uploaded?",
    a: "No. Every rule runs in your browser, and the download is created on your device.",
  },
];

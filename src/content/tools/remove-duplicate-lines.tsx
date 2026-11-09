import Link from "next/link";
import type { FaqItem } from "@/components/faq";

export function Guide() {
  return (
    <>
      <h2>How to remove duplicate lines</h2>
      <ol>
        <li>
          <strong>Paste your list</strong> into the <em>Original lines</em> box, one item per line. Columns copied from a
          spreadsheet work too.
        </li>
        <li>
          <strong>Pick your options.</strong> Decide whether capitalization matters, whether stray spaces should be ignored, and
          whether to delete blank lines.
        </li>
        <li>
          <strong>Copy the cleaned output.</strong> Unique lines appear instantly on the right, in their original order. Use{" "}
          <em>Replace original with output</em> if you want to keep editing the cleaned version.
        </li>
      </ol>

      <h2>What each option does</h2>
      <h3>Ignore case</h3>
      <p>
        When on, &quot;London&quot;, &quot;london&quot; and &quot;LONDON&quot; are treated as the same line, and only the first one you
        entered is kept, with its original capitalization. Turn it on for email addresses and tags, which are usually
        case-insensitive. Leave it off for passwords, codes or anything where capitalization changes the meaning.
      </p>
      <h3>Ignore extra spaces</h3>
      <p>
        Spaces at the start or end of a line are invisible but make two lines technically different. With this option on
        (the default), those spaces are ignored when comparing lines and trimmed from the output. Spaces inside a line are always
        kept.
      </p>
      <h3>Remove empty lines</h3>
      <p>
        When on, blank lines and lines containing only spaces are removed. When off, blank lines are left exactly where they are
        and are never treated as duplicates, so lists divided into groups by blank lines keep their structure.
      </p>

      <h2>How the first occurrence is preserved</h2>
      <p>
        The tool reads your text from top to bottom. The first time it sees a line, the line is kept. Every later copy of the
        same line is removed. The order of the remaining lines never changes, and nothing is sorted. That makes it safe for
        ordered data such as rankings, step-by-step instructions or chronological logs.
      </p>

      <h2>Example</h2>
      <p>With <em>Ignore case</em> on and <em>Remove empty lines</em> on, this input:</p>
      <pre className="overflow-x-auto rounded-xl border border-line bg-surface-2 p-4 font-mono text-sm leading-6">
        {`alex@example.com
jordan@example.com
Alex@example.com

  sam@example.com
jordan@example.com`}
      </pre>
      <p>becomes:</p>
      <pre className="overflow-x-auto rounded-xl border border-line bg-surface-2 p-4 font-mono text-sm leading-6">
        {`alex@example.com
jordan@example.com
sam@example.com`}
      </pre>
      <p>
        The statistics show 6 original lines, 3 final lines, 2 duplicates removed and 1 empty line removed.
      </p>

      <h2>Common uses</h2>
      <ul>
        <li>Cleaning a mailing or guest list before importing it into another tool.</li>
        <li>Merging reading lists, bibliographies or keyword lists from several sources.</li>
        <li>Removing repeated entries from log files or exported data.</li>
        <li>Building a list of unique tags, categories or product codes.</li>
      </ul>
      <p>
        Want to see what changed between the original and cleaned versions? Paste both into{" "}
        <Link href="/tools/text-compare">Text Compare</Link> and choose <em>Line by line</em>. To standardize capitalization
        first, run your list through the <Link href="/tools/case-converter">Case Converter</Link>.
      </p>
    </>
  );
}

export const faqs: FaqItem[] = [
  {
    q: "Does the tool change the order of my lines?",
    a: "No. The first occurrence of every line stays in its original position, and later duplicates are removed. Nothing is sorted.",
  },
  {
    q: "Can I remove duplicates from a spreadsheet column?",
    a: "Yes. Copy the column from Excel, Google Sheets or Numbers, paste it in, then paste the cleaned output back. Each cell becomes one line. If you copy several columns at once, each whole row is compared as one line.",
  },
  {
    q: "Is there a limit on how many lines I can paste?",
    a: "There is no fixed limit. Lists with hundreds of thousands of lines process in well under a second on a modern computer, because the tool uses an efficient lookup instead of comparing every pair of lines.",
  },
  {
    q: "Is my list uploaded anywhere?",
    a: "No. The tool runs in your browser, so lists of email addresses, names or other personal data are not sent to WriteWise servers.",
  },
];

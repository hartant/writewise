import Link from "next/link";
import type { FaqItem } from "@/components/faq";

export function Guide() {
  return (
    <>
      <h2>How to remove duplicate lines</h2>
      <ol>
        <li>
          <strong>Paste your list</strong> with one item per line. A column copied from a spreadsheet works too.
        </li>
        <li>
          <strong>Choose what to keep</strong> and set the matching rules. The <em>What will happen</em> line describes the result in
          plain English before you copy anything.
        </li>
        <li>
          <strong>Copy or download the result.</strong> Your original list is never changed.
        </li>
      </ol>

      <h2>The four modes</h2>
      <table>
        <thead>
          <tr>
            <th>Mode</th>
            <th>From a, b, a, c, b, a</th>
            <th>Use it to</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Keep first copy</td>
            <td>
              <code>a, b, c</code>
            </td>
            <td>Clean a list while keeping its original order</td>
          </tr>
          <tr>
            <td>Keep last copy</td>
            <td>
              <code>c, b, a</code>
            </td>
            <td>Keep the most recent entry in a log or export</td>
          </tr>
          <tr>
            <td>Duplicates only</td>
            <td>
              <code>a, b</code>
            </td>
            <td>Find out which entries were repeated</td>
          </tr>
          <tr>
            <td>Unique only</td>
            <td>
              <code>c</code>
            </td>
            <td>Find entries that appear exactly once</td>
          </tr>
        </tbody>
      </table>
      <p>
        The frequency table under the tool shows how many times each repeated line appears, most frequent first.
      </p>

      <h2>Matching options</h2>
      <h3>Case-sensitive</h3>
      <p>
        When on, &quot;London&quot; and &quot;london&quot; are different lines. Turn it off for email addresses and tags, which are
        usually case-insensitive; the first version you entered is the one that&apos;s kept.
      </p>
      <h3>Ignore extra spaces</h3>
      <p>
        Spaces at the start or end of a line are invisible but make two lines technically different. With this on (the default),
        they&apos;re ignored when comparing and trimmed from the result. Spaces inside a line always count.
      </p>
      <h3>Remove blank lines and Sort A–Z</h3>
      <p>
        Blank lines are never treated as duplicates. In the two &quot;keep&quot; modes they stay where they are unless you remove them;
        the other modes and sorting leave them out. Sorting is off by default because the tool never reorders your list unless you ask.
        When on, it uses natural order (item2 before item10).
      </p>

      <h2>How order is preserved</h2>
      <p>
        In <em>Keep first copy</em> mode, the tool reads your text from top to bottom. The first time it sees a line, the line is
        kept, and every later copy is removed. The remaining lines keep their original order, and nothing is sorted unless you turn
        on <em>Sort A–Z</em>. That makes it safe for ordered data such as rankings, step-by-step instructions or chronological logs.
      </p>

      <h2>Example</h2>
      <p>With <em>Case-sensitive</em> off and <em>Remove blank lines</em> on, this input:</p>
      <pre className="overflow-x-auto rounded border border-line bg-surface-2 p-4 font-mono text-sm leading-6">
        {`alex@example.com
jordan@example.com
Alex@example.com

  sam@example.com
jordan@example.com`}
      </pre>
      <p>becomes:</p>
      <pre className="overflow-x-auto rounded border border-line bg-surface-2 p-4 font-mono text-sm leading-6">
        {`alex@example.com
jordan@example.com
sam@example.com`}
      </pre>
      <p>
        The tool reports 6 lines in, 3 lines out, 3 different values and 2 repeats removed, plus 1 blank line removed.
      </p>

      <h2>Common uses</h2>
      <ul>
        <li>Cleaning a mailing or guest list before importing it into another tool.</li>
        <li>Merging reading lists, bibliographies or keyword lists from several sources.</li>
        <li>Removing repeated entries from log files or exported data.</li>
        <li>Building a list of unique tags, categories or product codes.</li>
      </ul>
      <p>
        For a step-by-step walkthrough, including cleaning email lists, read{" "}
        <Link href="/blog/how-to-remove-duplicate-lines-from-a-list">How to remove duplicate lines from a list</Link>. Lists copied from
        documents often carry stray spaces or tabs; the <Link href="/tools/text-cleaner">Text Cleaner</Link> fixes those, and{" "}
        <Link href="/tools/sort-lines">Sort Lines</Link> offers more sorting options.
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

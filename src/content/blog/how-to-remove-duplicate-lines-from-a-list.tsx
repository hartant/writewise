import Link from "next/link";
import type { FaqItem } from "@/components/faq";

export function Article() {
  return (
    <>
      <p className="text-xl leading-8 text-ink">
        To remove duplicates from a list, put one item per line, decide what counts as &quot;the same&quot; (does capitalization
        matter? stray spaces?), then keep one copy of each item. This guide covers that decision, a clean method for email lists, and
        how to do the same job in Excel and Google Sheets.
      </p>

      <div className="callout">
        <strong>The short answer:</strong> paste the list into{" "}
        <Link href="/tools/remove-duplicate-lines">Remove Duplicate Lines</Link>, keep <em>Keep first copy</em> selected, and copy the
        result. Your list keeps its original order.
      </div>

      <h2 id="same">First decide what &quot;duplicate&quot; means</h2>
      <p>Two lines that look the same to you may not be identical to a computer. The three usual culprits:</p>
      <table>
        <thead>
          <tr>
            <th>Difference</th>
            <th>Example</th>
            <th>Setting</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Capitalization</td>
            <td>
              <code>Sam@Example.com</code> vs <code>sam@example.com</code>
            </td>
            <td>Turn off <em>Case-sensitive</em></td>
          </tr>
          <tr>
            <td>Spaces at the ends</td>
            <td>
              <code>{" sam@example.com "}</code> vs <code>sam@example.com</code>
            </td>
            <td>Keep <em>Ignore extra spaces</em> on</td>
          </tr>
          <tr>
            <td>Invisible characters</td>
            <td>A zero-width space copied from a web page</td>
            <td>
              Run the list through the <Link href="/tools/text-cleaner">Text Cleaner</Link> first
            </td>
          </tr>
        </tbody>
      </table>

      <h2 id="emails">Removing duplicate email addresses</h2>
      <ol>
        <li>
          <strong>Get one address per line.</strong> If your addresses are separated by commas or semicolons, use{" "}
          <Link href="/tools/find-and-replace">Find and Replace</Link> to replace <code>, </code> or <code>;</code> with a line break
          (regular expression mode, find <code>[,;]\s*</code>, replace with <code>\n</code>).
        </li>
        <li>
          <strong>Paste into Remove Duplicate Lines</strong> with <em>Case-sensitive</em> off and <em>Ignore extra spaces</em> on. The
          domain part of an email address isn&apos;t case-sensitive, and in practice major email providers treat the whole address that
          way too.
        </li>
        <li>
          <strong>Check the frequency table</strong> to see which addresses were repeated and how often. It&apos;s a quick way to spot a
          contact who signed up several times.
        </li>
        <li>
          <strong>Copy or download the result</strong> and import it into your mailing tool.
        </li>
      </ol>
      <p>
        Deduplicating doesn&apos;t validate addresses. Typos such as <code>gmial.com</code> are still distinct lines. If you&apos;re
        handling other people&apos;s contact details, follow the data-protection rules that apply to you, such as the UK GDPR, the EU
        GDPR, Canada&apos;s PIPEDA or US state privacy laws.
      </p>

      <h2 id="which-copy">Which copy should you keep?</h2>
      <ul>
        <li>
          <strong>Keep first copy</strong> suits most lists: the earliest entry stays in its original position.
        </li>
        <li>
          <strong>Keep last copy</strong> suits logs and exports where the latest entry is the most up to date.
        </li>
        <li>
          <strong>Duplicates only</strong> lists the repeated items, which helps you investigate why they appeared twice.
        </li>
        <li>
          <strong>Unique only</strong> lists items that appear exactly once, for example to find people who registered for only one of
          several events after you&apos;ve combined the lists.
        </li>
      </ul>

      <h2 id="spreadsheets">Doing it in Excel or Google Sheets</h2>
      <p>If your data is already in a spreadsheet, both programs have built-in options:</p>
      <ul>
        <li>
          <strong>Excel:</strong> select the column, then <em>Data → Remove Duplicates</em>. This changes the data in place, so work on
          a copy. In Excel for Microsoft 365, the <code>=UNIQUE(A2:A500)</code> formula lists unique values without changing the
          original.
        </li>
        <li>
          <strong>Google Sheets:</strong> <em>Data → Data cleanup → Remove duplicates</em>, or the <code>=UNIQUE(A2:A500)</code>{" "}
          formula.
        </li>
      </ul>
      <p>
        Spreadsheet tools compare whole cells and don&apos;t trim spaces you can&apos;t see, so a cleanup pass first still helps. For a
        quick list that isn&apos;t in a spreadsheet, pasting into a browser tool is faster.
      </p>

      <h2 id="after">After deduplicating</h2>
      <p>
        Want the list in alphabetical order? Turn on <em>Sort A–Z</em> in the tool, or use <Link href="/tools/sort-lines">Sort Lines</Link>{" "}
        for more options such as Z–A or sorting by length. Both use natural order, so &quot;Room 2&quot; comes before &quot;Room 10&quot;.
      </p>
    </>
  );
}

export const faqs: FaqItem[] = [
  {
    q: "Does removing duplicates change the order of my list?",
    a: "Not in WriteWise's Remove Duplicate Lines tool, unless you turn on “Sort A–Z”. The first copy of each line stays where it was.",
  },
  {
    q: "Are email addresses case-sensitive?",
    a: "The domain part (after @) isn't. Technically the part before @ can be, but major email providers treat it as case-insensitive, so it's usually safe to deduplicate emails without matching capitalization.",
  },
  {
    q: "How can I see which lines were duplicates?",
    a: "Choose “Duplicates only”, or look at the frequency table, which lists every repeated line with the number of times it appears.",
  },
];

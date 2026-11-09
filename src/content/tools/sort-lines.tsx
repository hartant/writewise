import Link from "next/link";
import type { FaqItem } from "@/components/faq";

export function Guide() {
  return (
    <>
      <h2>How to sort a list</h2>
      <ol>
        <li>Paste your list with one item per line.</li>
        <li>
          Choose an order. <strong>A–Z (natural)</strong> is the right choice for most lists.
        </li>
        <li>Decide whether capitalization should matter and what to do with blank lines.</li>
        <li>Copy or download the sorted list. Your original stays unchanged on the left.</li>
      </ol>

      <h2>Natural vs. strict alphabetical order</h2>
      <p>
        Computers traditionally compare text character by character, which puts &quot;Chapter 10&quot; before &quot;Chapter 2&quot;
        because the character 1 comes before 2. Natural order reads runs of digits as whole numbers, which is what people expect:
      </p>
      <table>
        <thead>
          <tr>
            <th>Strict A–Z</th>
            <th>Natural A–Z</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>item1</code>
            </td>
            <td>
              <code>item1</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>item10</code>
            </td>
            <td>
              <code>item2</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>item2</code>
            </td>
            <td>
              <code>item10</code>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        Use strict order only when you need to match how another program sorts, for example when comparing with a spreadsheet that
        sorts text character by character.
      </p>

      <h2>How the sorting works</h2>
      <ul>
        <li>
          Sorting follows English alphabetical rules, so accented letters sort next to their base letter (&quot;éclair&quot; sits with
          the e&apos;s, not after z).
        </li>
        <li>
          <strong>Case-insensitive</strong> (the default) keeps &quot;apple&quot; and &quot;Apple&quot; together. <strong>Case-sensitive</strong>{" "}
          puts the uppercase version first.
        </li>
        <li>
          Sorting is <strong>stable</strong>: lines that compare as equal stay in their original order.
        </li>
        <li>
          <strong>By length</strong> counts characters as you see them, so an emoji counts as one.
        </li>
        <li>
          <strong>Reverse order</strong> flips the list without sorting it, which is handy for turning oldest-first into newest-first.
        </li>
      </ul>

      <h2>Common uses</h2>
      <ul>
        <li>Alphabetizing a bibliography or reading list before checking it against your citation style.</li>
        <li>Ordering names for a class list, sign-up sheet or seating plan.</li>
        <li>Sorting file names, product codes or tags that contain numbers.</li>
      </ul>
      <p>
        To remove repeats as well, run the list through <Link href="/tools/remove-duplicate-lines">Remove Duplicate Lines</Link>,
        which can also sort its result. Lists copied from documents often carry stray spaces; the{" "}
        <Link href="/tools/text-cleaner">Text Cleaner</Link> removes them first.
      </p>
    </>
  );
}

export const faqs: FaqItem[] = [
  {
    q: "How do I sort a list alphabetically?",
    a: "Paste the list with one item per line and choose “A–Z (natural)”. The sorted list appears instantly, ready to copy or download.",
  },
  {
    q: "Why does 10 come before 2 in some sorting tools?",
    a: "They compare text character by character, and the character “1” comes before “2”. Natural sorting reads numbers as whole values, so 2 comes before 10.",
  },
  {
    q: "Can I sort a bibliography with this tool?",
    a: "Yes, as long as each reference is on its own line. Citation styles have extra rules (for example, how to order works by the same author), so check the result against your style guide.",
  },
  {
    q: "Is my list uploaded?",
    a: "No. Sorting happens in your browser and the download is created on your device.",
  },
];

import Link from "next/link";
import type { FaqItem } from "@/components/faq";

export function Guide() {
  return (
    <>
      <h2>How to compare two texts</h2>
      <ol>
        <li>
          <strong>Paste the earlier version</strong> into <em>Original text</em> and the newer version into <em>Revised text</em>.
        </li>
        <li>
          <strong>Choose the level of detail.</strong> <em>Word by word</em> is best for prose such as essays, letters and
          articles. <em>Line by line</em> is best for lists, data, poetry and code.
        </li>
        <li>
          <strong>Click Compare texts</strong> (or press Ctrl + Enter, or Cmd + Enter on a Mac).
        </li>
        <li>
          <strong>Review the highlighted result.</strong> Added text is shown in green and underlined; removed text is shown in red
          with a line through it. Unchanged text appears normally so you can read changes in context.
        </li>
      </ol>

      <h2>Reading the statistics</h2>
      <ul>
        <li>
          <strong>Words added</strong> and <strong>words removed</strong> count the words inside highlighted changes. The number of
          insertions and deletions tells you how many separate places were edited.
        </li>
        <li>
          <strong>Unchanged</strong> counts words that appear in both versions in the same order.
        </li>
        <li>
          <strong>Similarity</strong> compares the unchanged words with the total words in both texts. Two identical texts score
          100%, and two completely different texts score 0%. It describes how much of the wording was kept, not whether the meaning
          changed.
        </li>
      </ul>

      <h2>How the comparison works</h2>
      <p>
        Text Compare uses the Myers difference algorithm, the same family of algorithm behind many version-control tools. It finds
        the smallest set of insertions and deletions that turns the original into the revision. In word mode, differences in
        spacing, such as a double space or a line re-wrapped at a different point, are ignored so the result focuses on real edits.
        In line mode, trailing spaces at the end of a line are ignored.
      </p>
      <p>
        When two long texts differ almost everywhere, a word-by-word view would be unreadable and slow, so the tool automatically
        switches to a line-by-line comparison and tells you it has done so.
      </p>

      <h2>Example</h2>
      <p>Comparing these two sentences word by word:</p>
      <blockquote>
        Most students check their phones many times a day, and this effects their ability to focus in class.
      </blockquote>
      <blockquote>
        Many students check their phones dozens of times a day, and this affects their ability to concentrate in class.
      </blockquote>
      <p>
        highlights four changes: &quot;Most&quot; → &quot;Many&quot;, &quot;many&quot; → &quot;dozens of&quot;, &quot;effects&quot; →
        &quot;affects&quot; (a common mix-up: <em>affect</em> is usually the verb) and &quot;focus&quot; → &quot;concentrate&quot;.
      </p>

      <h2>Ways to use Text Compare</h2>
      <ul>
        <li>
          <strong>Review feedback.</strong> See exactly what a tutor, editor or classmate changed in your draft when they didn&apos;t
          use tracked changes.
        </li>
        <li>
          <strong>Track your own revisions.</strong> Compare your first and final drafts to see how your writing improved, which is a
          useful habit described in our <Link href="/blog/how-to-improve-essay-writing">essay revision guide</Link>.
        </li>
        <li>
          <strong>Check contracts and policies.</strong> Spot changes between two versions of terms, a lease or an offer letter
          before you sign.
        </li>
        <li>
          <strong>Compare lists.</strong> Use line mode to see which entries were added or removed between two exports. Pair it with{" "}
          <Link href="/tools/remove-duplicate-lines">Remove Duplicate Lines</Link> to clean them first.
        </li>
      </ul>
      <div className="callout">
        <strong>Not a plagiarism checker.</strong> Text Compare only compares the two texts you paste. It does not search the web
        or any database, and nothing you paste is uploaded.
      </div>
    </>
  );
}

export const faqs: FaqItem[] = [
  {
    q: "Is it safe to compare confidential documents?",
    a: "Yes. The comparison runs entirely in your browser, and neither text is uploaded to WriteWise or anyone else. Closing the page discards both texts.",
  },
  {
    q: "Should I compare word by word or line by line?",
    a: "Use word by word for paragraphs of prose, where edits happen inside sentences. Use line by line for lists, spreadsheets, poetry or code, where each line is a separate item.",
  },
  {
    q: "Why are spacing changes not highlighted?",
    a: "In word mode, extra spaces and re-wrapped lines are treated as the same text so that real edits stand out. If whitespace matters, for example in code, use line mode, which still treats changes inside a line as a change to that line.",
  },
  {
    q: "How large can the texts be?",
    a: "Documents of tens of thousands of words compare in about a second on a modern device. If two long texts differ in a very large number of places, the tool switches to a line-by-line view to stay fast.",
  },
];

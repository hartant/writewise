import Link from "next/link";
import type { FaqItem } from "@/components/faq";

export function Guide() {
  return (
    <>
      <h2>How to count word frequency</h2>
      <ol>
        <li>Paste your text. The table builds as you type.</li>
        <li>
          Turn on <strong>Hide common words</strong> to focus on meaningful words instead of &quot;the&quot; and &quot;and&quot;.
        </li>
        <li>Sort by frequency to see what you repeat most, or A–Z to look up a specific word.</li>
        <li>Download the CSV to open the full table in Excel, Google Sheets or Numbers.</li>
      </ol>

      <h2>How words are counted</h2>
      <ul>
        <li>
          <strong>Capitalization:</strong> with <em>Ignore capitalization</em> on (the default), &quot;The&quot; and &quot;the&quot; are one
          entry, shown in lowercase. Turn it off to separate proper nouns from ordinary words, such as &quot;Bath&quot; and &quot;bath&quot;.
        </li>
        <li>
          <strong>Contractions and hyphens</strong> stay as one word: &quot;don&apos;t&quot;, &quot;it&apos;s&quot; and &quot;well-known&quot;
          each count once. Curly and straight apostrophes are treated the same.
        </li>
        <li>
          <strong>Punctuation</strong> separates words and is never counted. Abbreviations with periods split into letters, so
          &quot;e.g.&quot; is counted as &quot;e&quot; and &quot;g&quot;. This is why the total can differ slightly from the{" "}
          <Link href="/tools/word-counter">Word Counter</Link>.
        </li>
        <li>
          <strong>Numbers</strong> such as 2026, 1,200 or 3.5 are included, each as one word, unless you switch them off.
        </li>
        <li>
          <strong>Percent</strong> is each word&apos;s share of all counted words. Hidden common words still count toward the total, so
          percentages stay comparable when you switch that option.
        </li>
      </ul>

      <h2>What frequency can and can&apos;t tell you</h2>
      <p>
        A frequency table is good at one thing: showing which words appear most. That&apos;s useful for spotting a word you&apos;ve
        leaned on too heavily, checking that a key term from an assignment brief appears in your essay, or comparing vocabulary
        between drafts. It doesn&apos;t measure writing quality. A technical report <em>should</em> repeat its key terms, and search
        engines don&apos;t rank pages by how often a keyword appears, so treat the numbers as a prompt to reread, not a score.
      </p>

      <h2>Example</h2>
      <p>
        In a 1,200-word history essay, the table shows &quot;significant&quot; 14 times. Rereading those sentences, you replace some with
        more precise words (&quot;decisive&quot;, &quot;lasting&quot;, &quot;widespread&quot;) and cut others where the word added nothing.{" "}
        <Link href="/tools/find-and-replace">Find and Replace</Link> with whole-word matching helps you jump through each occurrence.
      </p>
    </>
  );
}

export const faqs: FaqItem[] = [
  {
    q: "How do I find the most repeated words in my essay?",
    a: "Paste the essay, turn on “Hide common words” and keep the table sorted by “Most frequent”. The top rows are the words you use most.",
  },
  {
    q: "Can I export the results?",
    a: "Yes. “Download CSV” saves every word with its count and percentage, ready for Excel or Google Sheets. “Copy table” copies it as tab-separated text that pastes neatly into a spreadsheet.",
  },
  {
    q: "Is keyword density important for SEO?",
    a: "Search engines don't use a target keyword density. Write naturally for your reader. This tool is better used to catch unintended repetition than to hit a percentage.",
  },
  {
    q: "Is my text uploaded?",
    a: "No. The table is built in your browser, and the CSV file is created on your device.",
  },
];

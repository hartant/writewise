import Link from "next/link";
import type { FaqItem } from "@/components/faq";

export function Guide() {
  return (
    <>
      <h2>How to find and replace text</h2>
      <ol>
        <li>Paste your text into <em>Your text</em>.</li>
        <li>
          Type what to look for in <em>Find</em> and what to put instead in <em>Replace with</em>. Leave <em>Replace with</em> empty to
          delete every match.
        </li>
        <li>
          Check the match count and the highlighted matches. Turn on <strong>Whole words only</strong> if the word also appears inside
          longer words.
        </li>
        <li>
          Copy the result, download it, or click <strong>Apply to my text</strong> to keep editing. <strong>Undo</strong> reverses the
          last apply.
        </li>
      </ol>

      <h2>Options explained</h2>
      <ul>
        <li>
          <strong>Case-sensitive:</strong> &quot;Northwind&quot; won&apos;t match &quot;northwind&quot;. Off by default.
        </li>
        <li>
          <strong>Whole words only:</strong> &quot;cat&quot; matches &quot;cat&quot; and &quot;Cat,&quot; but not &quot;catalog&quot; or
          &quot;bobcat&quot;. Works with accented letters too.
        </li>
        <li>
          <strong>First match only:</strong> replaces just the first occurrence, useful when only the opening mention should change.
        </li>
        <li>
          <strong>Regular expression:</strong> treats <em>Find</em> as a pattern. In plain mode, every character (including{" "}
          <code>$</code>, <code>.</code> and <code>*</code>) is matched literally.
        </li>
      </ul>

      <h2>Examples</h2>
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Find</th>
            <th>Replace with</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Reuse a cover letter for another company</td>
            <td>
              <code>Northwind</code>
            </td>
            <td>
              <code>Contoso</code>
            </td>
          </tr>
          <tr>
            <td>Switch British to American spelling of one word</td>
            <td>
              <code>organisation</code> (whole words)
            </td>
            <td>
              <code>organization</code>
            </td>
          </tr>
          <tr>
            <td>Reformat dates from 2026-11-09 to 09/11/2026 (regex)</td>
            <td>
              <code>(\d{"{4}"})-(\d{"{2}"})-(\d{"{2}"})</code>
            </td>
            <td>
              <code>$3/$2/$1</code>
            </td>
          </tr>
          <tr>
            <td>Remove double spaces after periods (regex)</td>
            <td>
              <code>\. {"{2,}"}</code>
            </td>
            <td>
              <code>. </code>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        Spelling changes need care: replacing &quot;colour&quot; with &quot;color&quot; is safe as a whole word, but some words differ in
        more than one form (&quot;colours&quot;, &quot;coloured&quot;). Run a separate replacement for each, or use a pattern.
      </p>

      <h2>Safe regular expressions</h2>
      <p>
        Patterns run in JavaScript&apos;s regular expression engine, in a background worker. An invalid pattern shows an error instead
        of a result. Some patterns, typically nested repeats like <code>(a+)+</code>, can take an extremely long time on certain text.
        If a search runs for more than two seconds it&apos;s stopped automatically, so the page never freezes. In the replacement,{" "}
        <code>$1</code>, <code>$2</code> insert captured groups and <code>$&amp;</code> inserts the whole match.
      </p>
      <p>
        After a big replacement, compare the before and after versions in <Link href="/tools/text-compare">Text Compare</Link> to make
        sure nothing unexpected changed.
      </p>
    </>
  );
}

export const faqs: FaqItem[] = [
  {
    q: "How do I replace a word everywhere in a text?",
    a: "Paste the text, type the word in “Find” and the new word in “Replace with”, keep “Replace all” selected, and turn on “Whole words only” so the word isn't replaced inside longer words. Then copy the result.",
  },
  {
    q: "Can I undo a replacement?",
    a: "Yes. The result preview never changes your text by itself. If you click “Apply to my text”, the Undo button restores the previous version, up to 20 steps back.",
  },
  {
    q: "Why does my regular expression show an error?",
    a: "The pattern isn't valid JavaScript regex syntax, often because of an unclosed bracket or parenthesis. Special characters like ( ) [ ] . * + ? need a backslash in front to be matched literally, or switch off regular expression mode.",
  },
  {
    q: "Is my text sent anywhere?",
    a: "No. Searching and replacing happen in your browser, in a background worker on your own device.",
  },
];

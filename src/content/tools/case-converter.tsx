import Link from "next/link";
import type { FaqItem } from "@/components/faq";

export function Guide() {
  return (
    <>
      <h2>How to use the case converter</h2>
      <ol>
        <li>
          <strong>Paste or type your text</strong> into the <em>Original text</em> box.
        </li>
        <li>
          <strong>Choose a case</strong> from the buttons above the text boxes. Hover over a button to see an example.
        </li>
        <li>
          <strong>Copy the result</strong> from the right-hand box, or click <em>Use result as new input</em> to keep working on
          it.
        </li>
      </ol>

      <h2>The five cases, explained</h2>
      <table>
        <thead>
          <tr>
            <th>Case</th>
            <th>Example</th>
            <th>Good for</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sentence case</td>
            <td>How to write a cover letter that gets read</td>
            <td>Body text, many web headings, APA reference titles</td>
          </tr>
          <tr>
            <td>Title Case</td>
            <td>How to Write a Cover Letter That Gets Read</td>
            <td>Essay, book and article titles; formal headings</td>
          </tr>
          <tr>
            <td>UPPERCASE</td>
            <td>HOW TO WRITE A COVER LETTER THAT GETS READ</td>
            <td>Short labels, acronyms, signage. Avoid for long text</td>
          </tr>
          <tr>
            <td>lowercase</td>
            <td>how to write a cover letter that gets read</td>
            <td>URLs, tags, usernames, cleaning up data</td>
          </tr>
          <tr>
            <td>Capitalized Case</td>
            <td>How To Write A Cover Letter That Gets Read</td>
            <td>Names lists, labels and some design styles</td>
          </tr>
        </tbody>
      </table>

      <h2>How Title Case works here</h2>
      <p>
        There is no single official rule for title case. Major style guides disagree, especially about prepositions. This tool
        follows a widely used convention that matches APA style:
      </p>
      <ul>
        <li>The first and last words are always capitalized.</li>
        <li>
          Articles (<em>a, an, the</em>), short conjunctions (<em>and, but, or, nor, for, so, yet</em>) and prepositions of three
          letters or fewer (<em>as, at, by, in, of, off, on, per, to, up, via</em>) stay lowercase.
        </li>
        <li>Words of four letters or more are capitalized, including longer prepositions such as &quot;With&quot; and &quot;From&quot;.</li>
        <li>The first word after a colon is capitalized.</li>
        <li>
          Each major part of a hyphenated word is capitalized: &quot;Well-Known&quot;, &quot;State-of-the-Art&quot;.
        </li>
      </ul>
      <p>
        If you follow <strong>Chicago</strong> or <strong>MLA</strong> style, which lowercase all prepositions regardless of
        length, change words such as &quot;With&quot;, &quot;From&quot; or &quot;About&quot; back to lowercase by hand. <strong>AP</strong>{" "}
        style capitalizes prepositions of four letters or more, which matches this tool.
      </p>

      <h2>Smart handling of acronyms and brand names</h2>
      <p>
        Sentence case, Title Case and Capitalized Case preserve words that are deliberately capitalized, such as{" "}
        <strong>NASA</strong>, <strong>UK</strong>, <strong>iPhone</strong> or <strong>McDonald</strong>, so converting a heading
        doesn&apos;t turn &quot;NASA&quot; into &quot;Nasa&quot;. Two exceptions keep this from backfiring:
      </p>
      <ul>
        <li>
          If most of your text is in capitals (for example, it was typed with caps lock on), everything is treated as ordinary
          words and converted normally.
        </li>
        <li>
          A run of two or more consecutive all-caps words, like &quot;THIS IS URGENT&quot;, is treated as shouting rather than a
          series of acronyms.
        </li>
      </ul>
      <p>
        The tool can&apos;t recognize proper nouns that aren&apos;t capitalized in your original text. After converting to sentence
        case, check names of people, places and organizations. &quot;i&quot; on its own, and in contractions such as &quot;i&apos;m&quot;, is
        always corrected to &quot;I&quot;.
      </p>

      <h2>British, Canadian and American conventions</h2>
      <p>
        UK publications, including many British newspapers and the GOV.UK style guide, generally prefer sentence case for
        headlines and headings, while title case is more common in American publishing. Canadian usage varies by publisher. If
        you&apos;re writing for a particular school or organization, its style guide takes priority.
      </p>
      <p>
        Writing an essay title? Our guide on <Link href="/blog/how-to-improve-essay-writing">improving essay writing</Link>{" "}
        covers titles, structure and revision. To check the length of a heading, use the{" "}
        <Link href="/tools/character-counter">Character Counter</Link>.
      </p>
    </>
  );
}

export const faqs: FaqItem[] = [
  {
    q: "What is the difference between Title Case and Capitalized Case?",
    a: "Capitalized Case capitalizes the first letter of every word. Title Case follows style-guide rules and keeps short words such as “a”, “of” and “the” in lowercase unless they start or end the title.",
  },
  {
    q: "Which title case style does this tool use?",
    a: "It lowercases articles, short conjunctions and prepositions of three letters or fewer, which matches APA style and is close to AP style. Chicago and MLA lowercase all prepositions, so you may need to adjust longer ones such as “with” or “between”.",
  },
  {
    q: "How do I fix text typed with caps lock on?",
    a: "Paste it in and choose Sentence case. Because most of the text is uppercase, the converter lowercases everything first and then capitalizes the start of each sentence and the word “I”. Check proper nouns afterward.",
  },
  {
    q: "Does the converter work with accented letters?",
    a: "Yes. Letters such as é, ñ, ü and ø are converted correctly, as are letters from other alphabets that have upper and lower case, such as Greek and Cyrillic.",
  },
];

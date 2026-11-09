import Link from "next/link";
import type { FaqItem } from "@/components/faq";

export function Guide() {
  return (
    <>
      <h2>How to use the word counter</h2>
      <ol>
        <li>
          <strong>Paste or type your text</strong> into the box above. You can also click <em>Try an example</em> to see how it
          works with a sample essay.
        </li>
        <li>
          <strong>Read the live results.</strong> Words, characters, sentences, paragraphs, reading time and speaking time update
          as you type.
        </li>
        <li>
          <strong>Check the extras.</strong> The average sentence length and the list of most repeated words help you spot long,
          tangled sentences and words you lean on too often.
        </li>
        <li>
          <strong>Copy the results</strong> if you need to record your word count on a cover sheet, submission form or invoice.
        </li>
      </ol>
      <p>
        Everything happens in your browser. You can paste a confidential report or an unpublished chapter without it being
        uploaded anywhere.
      </p>

      <h2>How words are counted</h2>
      <p>
        Every word-processing program makes slightly different decisions about what a &quot;word&quot; is, which is why two tools
        can disagree by a handful of words on the same document. Here are the rules this tool follows, so you always know where a
        number comes from:
      </p>
      <ul>
        <li>
          <strong>Words are separated by spaces, line breaks, em dashes (—) and en dashes (–).</strong> &quot;The result—surprisingly—held&quot;
          counts as three words.
        </li>
        <li>
          <strong>Hyphenated words count as one word.</strong> &quot;Well-known&quot;, &quot;mother-in-law&quot; and &quot;state-of-the-art&quot;
          are each one word, which matches Microsoft Word.
        </li>
        <li>
          <strong>Contractions count as one word.</strong> &quot;Don&apos;t&quot;, &quot;it&apos;s&quot; and &quot;they&apos;re&quot; are single words.
        </li>
        <li>
          <strong>Numbers count as words.</strong> &quot;1,200&quot;, &quot;3.5&quot; and &quot;2026&quot; are one word each.
        </li>
        <li>
          <strong>Stand-alone symbols do not count.</strong> A lone &quot;&amp;&quot;, &quot;—&quot; or bullet character is ignored because it
          contains no letters or digits.
        </li>
        <li>
          <strong>Chinese and Japanese characters count individually,</strong> because those languages are not written with spaces
          between words.
        </li>
      </ul>

      <h3>Characters, sentences and paragraphs</h3>
      <p>
        <strong>Characters</strong> are counted the way a reader sees them, so an emoji such as 👍🏽 or an accented letter like
        &quot;é&quot; counts as one character, even though computers sometimes store them as several. The{" "}
        <em>no spaces</em> figure removes spaces, tabs and line breaks.
      </p>
      <p>
        <strong>Sentences</strong> end with a period, question mark, exclamation point or ellipsis followed by a space or a line
        break. The counter recognizes common abbreviations, so &quot;Dr. Patel arrived.&quot; is one sentence, and decimals like
        &quot;3.14&quot; never end a sentence. A heading or list item on its own line counts as a sentence too.
      </p>
      <p>
        <strong>Paragraphs</strong> are counted the way Microsoft Word counts them: each non-empty line is a paragraph. If your
        text uses hard line wraps (common in emails and PDFs), the <Link href="/tools/paragraph-counter">Paragraph Counter</Link>{" "}
        has a mode that only splits on blank lines.
      </p>

      <h2>Reading and speaking time</h2>
      <p>
        Reading time assumes <strong>238 words per minute</strong>, the average silent reading speed for adults reading
        non-fiction reported in a 2019 meta-analysis of 190 studies by psychologist Marc Brysbaert. Speaking time assumes{" "}
        <strong>140 words per minute</strong>, a comfortable pace for presentations and speeches. If your audience reads faster or
        slower, use the <Link href="/tools/reading-time-calculator">Reading Time Calculator</Link> to set your own speed.
      </p>

      <h2>Example</h2>
      <p>Paste this short passage into the box:</p>
      <blockquote>
        Well-known authors don&apos;t always write long books. In 2019, one sold 1,200 copies in a week—an impressive start.
      </blockquote>
      <p>
        You will see <strong>19 words</strong> and <strong>2 sentences</strong>. &quot;Well-known&quot; and &quot;don&apos;t&quot; are one word
        each, &quot;2019&quot; and &quot;1,200&quot; count as words, and the em dash splits &quot;week&quot; from &quot;an&quot;.
      </p>

      <h2>Common word counts and what they look like</h2>
      <table>
        <thead>
          <tr>
            <th>Word count</th>
            <th>Typical use</th>
            <th>Reading time*</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>250 words</td>
            <td>Short answer, abstract, cover letter paragraph</td>
            <td>About 1 minute</td>
          </tr>
          <tr>
            <td>500 words</td>
            <td>Short essay or blog post; roughly one single-spaced page</td>
            <td>About 2 minutes</td>
          </tr>
          <tr>
            <td>650 words</td>
            <td>The long-standing Common App personal essay maximum (confirm in your application)</td>
            <td>About 3 minutes</td>
          </tr>
          <tr>
            <td>1,500 words</td>
            <td>University coursework essay, feature article</td>
            <td>About 6 minutes</td>
          </tr>
          <tr>
            <td>3,000 words</td>
            <td>Extended essay or report</td>
            <td>About 13 minutes</td>
          </tr>
        </tbody>
      </table>
      <p className="text-sm">*At 238 words per minute.</p>

      <h2>Tips for hitting a word limit</h2>
      <ul>
        <li>
          <strong>Over the limit?</strong> Look at the most repeated words list first. Phrases like &quot;in order to&quot;,
          &quot;it is important to note that&quot; and repeated hedges (&quot;very&quot;, &quot;really&quot;, &quot;quite&quot;) are the
          easiest words to cut without losing meaning.
        </li>
        <li>
          <strong>Under the limit?</strong> Don&apos;t pad. Add a concrete example, a counter-argument or a sentence explaining{" "}
          <em>why</em> your evidence matters. Those additions make an essay stronger, not just longer.
        </li>
        <li>
          <strong>Check what counts.</strong> Some courses exclude references, footnotes or headings from the limit. Our guide on{" "}
          <Link href="/blog/how-to-count-words-in-an-essay">how to count words in an essay</Link> covers the usual rules.
        </li>
        <li>
          <strong>Track a long assignment</strong> with the <Link href="/tools/essay-word-goal-tracker">Essay Word Goal Tracker</Link>,
          which shows progress, words remaining and a time-to-finish estimate.
        </li>
      </ul>
    </>
  );
}

export const faqs: FaqItem[] = [
  {
    q: "Is this word counter accurate?",
    a: "Yes, it follows clear, documented rules (listed above) and handles hyphens, contractions, numbers, emoji and accented letters correctly. Results can still differ by a few words from Microsoft Word, Google Docs or Pages, because each program treats dashes, symbols and some punctuation slightly differently. If you must meet an official limit, check with the tool your institution specifies.",
  },
  {
    q: "Does this tool save or upload my text?",
    a: "No. The counting runs in your browser using JavaScript, and your text is not sent to WriteWise servers. If you close or reload the page, the text is gone.",
  },
  {
    q: "Do hyphenated words count as one word or two?",
    a: "This counter treats a hyphenated word such as “long-term” as one word, the same as Microsoft Word. Words joined by an em dash or en dash are counted separately.",
  },
  {
    q: "Is there a maximum amount of text I can paste?",
    a: "There is no fixed limit. The counter comfortably handles book-length text of 100,000 words or more on a modern laptop. Very large inputs may feel slower on older phones.",
  },
  {
    q: "How long is a 1,000-word essay?",
    a: (
      <>
        Roughly two single-spaced or four double-spaced pages in a standard 12-point font, depending on formatting. It takes
        about four minutes to read silently and about seven minutes to read aloud. See{" "}
        <Link href="/blog/how-long-does-it-take-to-read-1000-words">how long it takes to read 1,000 words</Link> for details.
      </>
    ),
  },
];

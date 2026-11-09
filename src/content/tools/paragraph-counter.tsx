import Link from "next/link";
import type { FaqItem } from "@/components/faq";

export function Guide() {
  return (
    <>
      <h2>How to use the paragraph counter</h2>
      <ol>
        <li>
          <strong>Paste your text</strong> into the box.
        </li>
        <li>
          <strong>Choose how paragraphs are separated.</strong> <em>Every line break</em> treats each non-empty line as a paragraph,
          like Microsoft Word. <em>Blank lines only</em> treats a paragraph as a block separated by an empty line, which is better
          for text copied from emails or PDFs that wrap lines in the middle of paragraphs.
        </li>
        <li>
          <strong>Review the statistics and breakdown.</strong> Each paragraph gets a bar showing its length relative to the
          longest one, and paragraphs over 150 words are highlighted.
        </li>
      </ol>

      <h2>What the statistics tell you</h2>
      <ul>
        <li>
          <strong>Words per paragraph</strong> shows how dense your writing feels. In academic essays, body paragraphs often run
          from about 100 to 200 words. On the web, shorter paragraphs of two to four sentences are easier to read on a phone.
        </li>
        <li>
          <strong>Sentences per paragraph</strong> flags one-sentence paragraphs (which can feel underdeveloped in an essay) and very
          long blocks (which may be trying to make more than one point).
        </li>
        <li>
          <strong>Words per sentence</strong> is a quick readability signal. Plain-language guidance often recommends an average of
          around 15–20 words. Variety matters too: a mix of short and longer sentences reads more naturally than a uniform rhythm.
        </li>
        <li>
          <strong>Longest paragraph</strong> points you to the block most worth checking during revision.
        </li>
      </ul>

      <h2>Why paragraph length matters</h2>
      <p>
        A paragraph is a unit of thought. In a well-structured essay, each body paragraph usually makes one main point: a topic
        sentence that states it, evidence that supports it and analysis that connects it back to your thesis. When a paragraph
        grows past 200 words, it often contains two ideas that would be clearer apart. When it shrinks to a sentence or two, the
        point may not be developed enough to persuade your reader.
      </p>
      <p>
        The 150-word highlight in the breakdown is a prompt to take a look, not a rule. A long paragraph analyzing a complex source
        can be exactly right. Use the numbers to find candidates for revision, then judge each one by whether it makes a single,
        complete point.
      </p>

      <h2>Example</h2>
      <p>
        Suppose a 1,500-word essay has 6 paragraphs. That averages 250 words per paragraph, and the breakdown shows the third
        paragraph at 410 words. Reading it again, you find it covers both the causes and the effects of a policy. Splitting it into
        two paragraphs, each with its own topic sentence, gives you 7 paragraphs averaging about 215 words, and an argument that is
        easier to follow.
      </p>

      <h2>How paragraphs, words and sentences are counted</h2>
      <p>
        Lines that contain no letters or numbers, such as separators made of dashes, are not counted as paragraphs. Words and
        sentences follow the same rules as our <Link href="/tools/word-counter">Word Counter</Link>: hyphenated words count once,
        common abbreviations such as &quot;Dr.&quot; don&apos;t end a sentence, and headings on their own line count as a sentence.
      </p>
      <p>
        For more on structuring paragraphs, read{" "}
        <Link href="/blog/how-to-improve-essay-writing">How to improve your essay writing</Link>. Working toward a target length?
        Try the <Link href="/tools/essay-word-goal-tracker">Essay Word Goal Tracker</Link>.
      </p>
    </>
  );
}

export const faqs: FaqItem[] = [
  {
    q: "How many paragraphs is a 1,000-word essay?",
    a: "Usually around five to seven: an introduction, three to five body paragraphs and a conclusion. With body paragraphs of 150–200 words, a 1,000-word essay typically has about five paragraphs in total.",
  },
  {
    q: "How long should a paragraph be?",
    a: "There's no fixed rule. Academic body paragraphs commonly fall between about 100 and 200 words, while web writing favors shorter paragraphs of two to four sentences. What matters most is that each paragraph develops one clear idea.",
  },
  {
    q: "Why does my paragraph count differ from Google Docs?",
    a: "Programs disagree about whether a single line break starts a new paragraph. Switch between “Every line break” and “Blank lines only” to match the way your text is formatted.",
  },
  {
    q: "Is my text uploaded?",
    a: "No. All analysis happens in your browser and your text is not sent to any server.",
  },
];

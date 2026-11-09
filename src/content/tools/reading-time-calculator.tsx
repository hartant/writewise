import Link from "next/link";
import type { FaqItem } from "@/components/faq";

export function Guide() {
  return (
    <>
      <h2>How to use the reading time calculator</h2>
      <ol>
        <li>
          <strong>Paste your text</strong>, or if you only know the length, type a word count into the box below the text area.
        </li>
        <li>
          <strong>Choose a reading speed</strong> with the slider or a preset. The default of 238 words per minute suits most adult
          readers of non-fiction.
        </li>
        <li>
          <strong>Read the estimate</strong> at the top of the results panel, and compare it with the times at other speeds in the
          table underneath.
        </li>
      </ol>

      <h2>Where the default speeds come from</h2>
      <p>
        The most widely cited reading-rate figures come from a 2019 review by Marc Brysbaert, published in the{" "}
        <em>Journal of Memory and Language</em>, which pooled results from 190 studies involving more than 18,000 participants.
        It estimated average adult speeds of:
      </p>
      <ul>
        <li>
          <strong>238 words per minute</strong> for silent reading of non-fiction
        </li>
        <li>
          <strong>260 words per minute</strong> for silent reading of fiction
        </li>
        <li>
          <strong>183 words per minute</strong> for reading aloud
        </li>
      </ul>
      <p>
        Those are averages, and real readers vary a lot. A student working through a dense textbook chapter, taking notes as they
        go, might manage 100–150 words per minute. Someone skimming a news article for the main point can move much faster, but
        comprehension falls as speed rises. The presets cover these situations, and you can drag the slider anywhere from 80 to 700
        words per minute.
      </p>

      <h2>What changes how fast people read</h2>
      <ul>
        <li>
          <strong>Difficulty.</strong> Technical vocabulary, long sentences and unfamiliar topics slow everyone down.
        </li>
        <li>
          <strong>Purpose.</strong> Reading to remember for an exam is slower than reading for pleasure.
        </li>
        <li>
          <strong>Screen and layout.</strong> Small text, long line lengths and poor contrast make reading harder, particularly on
          phones.
        </li>
        <li>
          <strong>Language.</strong> People reading in a second language typically read more slowly than in their first.
        </li>
        <li>
          <strong>Images, tables and code.</strong> These take extra time that a word count can&apos;t capture. Add a little time for
          each figure in a report or tutorial.
        </li>
      </ul>

      <h2>Examples</h2>
      <table>
        <thead>
          <tr>
            <th>Text</th>
            <th>Words</th>
            <th>At 238 wpm</th>
            <th>Read aloud (183 wpm)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cover letter</td>
            <td>350</td>
            <td>About 1.5 minutes</td>
            <td>About 2 minutes</td>
          </tr>
          <tr>
            <td>Blog post</td>
            <td>1,200</td>
            <td>About 5 minutes</td>
            <td>About 6.5 minutes</td>
          </tr>
          <tr>
            <td>Dissertation chapter</td>
            <td>8,000</td>
            <td>About 34 minutes</td>
            <td>About 44 minutes</td>
          </tr>
          <tr>
            <td>Short novel</td>
            <td>50,000</td>
            <td>About 3.5 hours</td>
            <td>About 4.5 hours</td>
          </tr>
        </tbody>
      </table>

      <h2>Practical uses</h2>
      <ul>
        <li>
          <strong>Timing a speech or presentation.</strong> Use the <em>Read aloud</em> preset as a starting point, then time
          yourself once. Many speakers settle somewhere around 130–150 words per minute when they pause for emphasis and slides.
        </li>
        <li>
          <strong>Planning study time.</strong> Estimate how long a reading list will take at your note-taking speed, and plan
          study sessions around the result.
        </li>
        <li>
          <strong>Showing &quot;minutes to read&quot; on an article.</strong> Many publications display reading time to help readers
          decide when to read. Round to the nearest minute.
        </li>
      </ul>
      <p>
        For a broader look at the numbers, see our guide{" "}
        <Link href="/blog/how-long-does-it-take-to-read-1000-words">How long does it take to read 1,000 words?</Link> To count
        words, sentences and paragraphs at the same time, use the <Link href="/tools/word-counter">Word Counter</Link>.
      </p>
    </>
  );
}

export const faqs: FaqItem[] = [
  {
    q: "What is a good reading speed?",
    a: "For adults reading non-fiction silently, about 238 words per minute is average. Speeds between roughly 200 and 300 words per minute are typical. Being much faster usually means skimming, which works for some tasks but reduces how much you remember.",
  },
  {
    q: "How do I find my own reading speed?",
    a: "Paste a passage of around 500 words that you haven't read before, time yourself reading it at a normal pace, then divide the number of words by the minutes it took. Enter the result with the slider to personalize every estimate.",
  },
  {
    q: "How long does it take to read 1,000 words?",
    a: "About 4 minutes 12 seconds at the average silent reading speed of 238 words per minute, and about 5½ minutes when reading aloud at 183 words per minute.",
  },
  {
    q: "Does the calculator count images or tables?",
    a: "No. It estimates time from the words alone. If your text includes charts, tables, code or images, add some extra time for readers to study them.",
  },
];

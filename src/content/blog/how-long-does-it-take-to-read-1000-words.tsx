import Link from "next/link";
import type { FaqItem } from "@/components/faq";
import { formatDuration, minutesFor } from "@/lib/text/stats";

const ROWS = [250, 500, 750, 1000, 1500, 2000, 3000, 5000];
const SPEEDS = [
  { label: "Silent reading", wpm: 238 },
  { label: "Reading aloud", wpm: 183 },
  { label: "Presentation", wpm: 140 },
];

export function Article() {
  return (
    <>
      <p className="text-xl leading-8 text-ink">
        A typical adult takes about <strong>four minutes</strong> to read 1,000 words silently, around{" "}
        <strong>five and a half minutes</strong> to read them aloud, and about <strong>seven minutes</strong> to deliver them as a
        speech. Here&apos;s where those numbers come from, a table for other lengths, and what makes the real time faster or slower.
      </p>

      <h2 id="table">Reading and speaking times for common word counts</h2>
      <p>
        The table uses three speeds: 238 words per minute for silent reading, 183 for reading aloud (both from the research
        described below), and 140 for a presentation or speech with natural pauses.
      </p>
      <table>
        <thead>
          <tr>
            <th>Words</th>
            {SPEEDS.map((s) => (
              <th key={s.label}>
                {s.label} <span className="font-normal text-muted">({s.wpm} wpm)</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((words) => (
            <tr key={words}>
              <td>
                <strong>{words.toLocaleString("en-US")}</strong>
              </td>
              {SPEEDS.map((s) => (
                <td key={s.label}>{formatDuration(minutesFor(words, s.wpm))}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Want an estimate for your own text or speed? The <Link href="/tools/reading-time-calculator">Reading Time Calculator</Link>{" "}
        lets you paste text or enter a word count and adjust the speed.
      </p>

      <h2 id="research">Where the 238 words per minute figure comes from</h2>
      <p>
        For years, articles quoted reading speeds anywhere from 200 to 300 words per minute without a clear source. In 2019,
        psychologist Marc Brysbaert published a review in the <em>Journal of Memory and Language</em> that combined the results of
        190 studies with more than 18,000 participants. He estimated that adults reading English silently average about{" "}
        <strong>238 words per minute for non-fiction</strong> and <strong>260 for fiction</strong>, and read aloud at about{" "}
        <strong>183 words per minute</strong>.
      </p>
      <p>
        Those figures are averages for adults reading in their first language, so individuals naturally vary. Most readers fall
        somewhere between about 175 and 300 words per minute for ordinary non-fiction.
      </p>

      <h2 id="factors">What makes reading faster or slower</h2>
      <ul>
        <li>
          <strong>Difficulty of the text.</strong> Academic papers, legal documents and technical manuals take longer than news
          articles or novels. Expect 100–150 words per minute when studying dense material.
        </li>
        <li>
          <strong>Your goal.</strong> Reading to understand and remember, for example before an exam, is slower than reading for
          the gist.
        </li>
        <li>
          <strong>Familiarity.</strong> Experts read material in their field faster because they recognize the vocabulary and
          ideas.
        </li>
        <li>
          <strong>Language.</strong> Reading in a second language is usually slower, especially for specialized vocabulary.
        </li>
        <li>
          <strong>Format.</strong> Well-spaced text with clear headings is quicker to read than long, dense blocks, especially on a
          small phone screen.
        </li>
      </ul>

      <h2 id="speed-reading">What about speed reading?</h2>
      <p>
        Some apps and courses promise reading speeds of 1,000 words per minute or more. A major 2016 review of reading research led
        by Keith Rayner, published in <em>Psychological Science in the Public Interest</em>, concluded that there is a trade-off
        between speed and accuracy: reading much faster than normal generally means understanding less. Skimming is a useful skill
        for finding the right section or getting the gist, but it isn&apos;t a substitute for careful reading when comprehension
        matters.
      </p>

      <h2 id="speeches">How many words for a speech or presentation?</h2>
      <p>
        When speaking to an audience, most people slow down to somewhere around 130–150 words per minute, with pauses for
        emphasis, slides and audience reactions. That gives these rough guides:
      </p>
      <ul>
        <li>
          <strong>1-minute introduction:</strong> about 130–150 words
        </li>
        <li>
          <strong>5-minute talk:</strong> about 650–750 words
        </li>
        <li>
          <strong>10-minute presentation:</strong> about 1,300–1,500 words
        </li>
        <li>
          <strong>20-minute talk:</strong> about 2,600–3,000 words
        </li>
      </ul>
      <p>
        The best way to check is to rehearse once with a timer. If you run long, cut content rather than speaking faster. Your
        audience needs time to absorb what you say.
      </p>

      <h2 id="pages">How many pages is 1,000 words?</h2>
      <p>
        With a 12-point font such as Times New Roman and one-inch (2.5 cm) margins, 1,000 words fills roughly two single-spaced pages
        or four double-spaced pages. Larger fonts, wider margins, headings and short paragraphs all increase the page count, which
        is one reason many instructors prefer word limits to page limits.
      </p>

      <h2 id="use">Putting the numbers to use</h2>
      <ul>
        <li>
          <strong>Students:</strong> estimate how long a reading list will take at your study pace and schedule it across the week.
        </li>
        <li>
          <strong>Writers and bloggers:</strong> show a &quot;minutes to read&quot; label so readers know what they&apos;re committing
          to.
        </li>
        <li>
          <strong>Presenters and job candidates:</strong> check that a speech or interview answer fits its time slot before you
          rehearse.
        </li>
      </ul>
      <p>
        To get the word count of any text first, use the <Link href="/tools/word-counter">Word Counter</Link>, which also shows
        reading and speaking time.
      </p>
    </>
  );
}

export const faqs: FaqItem[] = [
  {
    q: "How long does it take to read 1,000 words?",
    a: "About 4 minutes 12 seconds at the average adult silent reading speed of 238 words per minute. Reading aloud at 183 words per minute takes about 5½ minutes.",
  },
  {
    q: "How long is a 1,000-word speech?",
    a: "About 7 minutes at a presentation pace of 140 words per minute. Faster speakers might finish in about 6½ minutes, while slower, more deliberate speakers may take 8 minutes or more.",
  },
  {
    q: "What is the average reading speed?",
    a: "Research summarizing 190 studies puts the adult average at about 238 words per minute for non-fiction and 260 for fiction when reading silently in English.",
  },
];

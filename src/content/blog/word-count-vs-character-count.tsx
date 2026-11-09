import Link from "next/link";
import type { FaqItem } from "@/components/faq";

export function Article() {
  return (
    <>
      <p className="text-xl leading-8 text-ink">
        A 650-word essay and a 4,000-character personal statement can be roughly the same length, yet they are measured in
        completely different ways. Knowing which limit applies, and how each is counted, saves you from a rejected form or a
        statement that gets cut off mid-sentence.
      </p>

      <h2 id="definitions">The difference in one minute</h2>
      <ul>
        <li>
          <strong>Word count</strong> measures how many words your text contains. It reflects how much you&apos;ve said, which is
          why essays, articles and reports usually use it.
        </li>
        <li>
          <strong>Character count</strong> measures every letter, number, punctuation mark and, usually, every space. It reflects
          how much room your text takes up, which is why forms, databases and screens usually use it.
        </li>
      </ul>
      <p>
        Character counts come in two versions. <strong>Characters with spaces</strong> counts everything, and is what most online
        forms and platforms mean by &quot;characters&quot;. <strong>Characters without spaces</strong> leaves out spaces, tabs and
        line breaks, and appears more often in publishing, translation and some academic guidelines.
      </p>

      <h2 id="example">The same sentence, counted three ways</h2>
      <blockquote>Keep it short, clear and specific.</blockquote>
      <table>
        <thead>
          <tr>
            <th>Measure</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Words</td>
            <td>6</td>
          </tr>
          <tr>
            <td>Characters with spaces</td>
            <td>34</td>
          </tr>
          <tr>
            <td>Characters without spaces</td>
            <td>29</td>
          </tr>
        </tbody>
      </table>
      <p>
        You can check any text instantly with the <Link href="/tools/character-counter">Character Counter</Link>, which shows all
        three numbers and tracks them against a limit you choose.
      </p>

      <h2 id="which">Which limit applies where?</h2>
      <table>
        <thead>
          <tr>
            <th>Situation</th>
            <th>Usually measured in</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>School and university essays</td>
            <td>Words</td>
            <td>&quot;2,000 words ± 10%&quot;</td>
          </tr>
          <tr>
            <td>US college application essays</td>
            <td>Words</td>
            <td>The Common App personal essay allows up to 650 words</td>
          </tr>
          <tr>
            <td>UK university applications</td>
            <td>Characters</td>
            <td>The UCAS personal statement allows up to 4,000 characters, including spaces</td>
          </tr>
          <tr>
            <td>Job application text boxes</td>
            <td>Usually characters</td>
            <td>&quot;Summarize your experience (1,500 characters max)&quot;</td>
          </tr>
          <tr>
            <td>Search result titles and descriptions</td>
            <td>Pixel width, often approximated in characters</td>
            <td>Meta descriptions are commonly kept to about 150–160 characters</td>
          </tr>
          <tr>
            <td>Social media bios and posts</td>
            <td>Characters</td>
            <td>Each platform sets its own limit, and limits change over time</td>
          </tr>
          <tr>
            <td>Text messages (SMS)</td>
            <td>Characters</td>
            <td>160 characters per message segment for plain text, fewer when emoji are included</td>
          </tr>
          <tr>
            <td>Translation and freelance writing</td>
            <td>Words, sometimes characters</td>
            <td>Rates per word are common for English; per-character rates are common for languages like Chinese and Japanese</td>
          </tr>
        </tbody>
      </table>
      <p>
        Application requirements change from year to year, so always confirm the current limit in the official instructions.
      </p>

      <h2 id="converting">Converting between words and characters</h2>
      <p>
        There is no exact conversion, because it depends on how long your words are. A useful rule of thumb for everyday English
        prose is about <strong>5 to 6 characters per word, including the space after it</strong>. That gives these rough
        equivalents:
      </p>
      <table>
        <thead>
          <tr>
            <th>Characters (with spaces)</th>
            <th>Approximate words</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>280</td>
            <td>45–55</td>
          </tr>
          <tr>
            <td>500</td>
            <td>80–100</td>
          </tr>
          <tr>
            <td>1,000</td>
            <td>160–200</td>
          </tr>
          <tr>
            <td>2,000</td>
            <td>330–400</td>
          </tr>
          <tr>
            <td>4,000</td>
            <td>650–800</td>
          </tr>
        </tbody>
      </table>
      <p>
        Academic and technical writing uses longer words, so it fits fewer words into the same number of characters. Conversational
        writing with short words fits more. If a limit matters, measure the real text rather than relying on an estimate.
      </p>

      <h2 id="gotchas">Why character counts sometimes disagree</h2>
      <p>
        Word counts are fairly consistent between tools. Character counts can differ more than you&apos;d expect, for technical
        reasons:
      </p>
      <ul>
        <li>
          <strong>Emoji and symbols.</strong> Many emoji are stored as two or more units of computer text. Some websites count
          those units instead of what you see, so a single emoji may use up two or more characters of a limit.
        </li>
        <li>
          <strong>Accented letters.</strong> A letter like &quot;é&quot; can be stored as one unit or as &quot;e&quot; plus an accent.
          Most modern tools count it as one character, but not all do.
        </li>
        <li>
          <strong>Line breaks.</strong> Text from Windows may use two invisible characters for each line break. Some forms count
          both.
        </li>
        <li>
          <strong>Curly quotes and dashes.</strong> Word processors replace straight quotes with curly ones and double hyphens with
          dashes. These still count as one character each, but some older systems convert or reject them when you paste.
        </li>
      </ul>
      <p>
        WriteWise counts characters the way a reader perceives them, so an emoji or accented letter counts as one. If you&apos;re
        within a few characters of a strict limit and your text includes emoji or special symbols, leave a small safety margin.
      </p>

      <h2 id="tips">Tips for writing to either kind of limit</h2>
      <ul>
        <li>
          <strong>Words:</strong> plan a word budget per section, and cut filler phrases (&quot;in order to&quot;, &quot;the fact
          that&quot;) before cutting ideas. Our guide on <Link href="/blog/how-to-count-words-in-an-essay">how to count words in
          an essay</Link> covers what counts toward the limit.
        </li>
        <li>
          <strong>Characters:</strong> lead with your most important point, because truncated text loses its ending. Prefer short
          words and numerals, and remove double spaces.
        </li>
        <li>
          <strong>Both:</strong> draft freely first, then edit to the limit. Writing to a counter from the first sentence tends to
          produce stiff, overcautious text.
        </li>
      </ul>
      <p>
        Track both at once with the <Link href="/tools/word-counter">Word Counter</Link>, which shows words, characters with and
        without spaces, sentences and paragraphs side by side.
      </p>
    </>
  );
}

export const faqs: FaqItem[] = [
  {
    q: "Do spaces count as characters?",
    a: "In most online forms and platforms, yes. Some publishing and academic guidelines ask for “characters excluding spaces”. When the instructions don't say, assume spaces are included.",
  },
  {
    q: "How many characters is 500 words?",
    a: "Roughly 2,500 to 3,000 characters including spaces for typical English prose, or about 2,000 to 2,500 without spaces. Text with many long words will be at the higher end.",
  },
  {
    q: "Is a character the same as a letter?",
    a: "No. Characters include letters, numbers, punctuation marks, symbols and usually spaces. “Hi, Sam!” has 5 letters but 8 characters.",
  },
];

import Link from "next/link";
import type { FaqItem } from "@/components/faq";

export function Guide() {
  return (
    <>
      <h2>How to use the character counter</h2>
      <ol>
        <li>
          <strong>Set your limit.</strong> Type a number into <em>Custom limit</em> or pick one of the quick presets.
        </li>
        <li>
          <strong>Choose how spaces count.</strong> Most online forms and platforms count spaces as characters. Turn off{" "}
          <em>Count spaces toward the limit</em> if your instructions say &quot;characters excluding spaces&quot;.
        </li>
        <li>
          <strong>Type or paste your text.</strong> The progress bar turns amber at 90% of the limit and red once you go over, and
          the footer tells you exactly how many characters you have left.
        </li>
        <li>
          <strong>Copy your text</strong> back into the form once it fits.
        </li>
      </ol>

      <h2>When character limits matter</h2>
      <p>
        Word limits are common in academic writing, but most online forms, platforms and search results limit characters instead.
        Some situations where a character counter saves you from a truncated or rejected submission:
      </p>
      <ul>
        <li>
          <strong>University applications.</strong> The UCAS personal statement in the UK, for example, has a limit of 4,000
          characters including spaces, and many scholarship portals cap answers by characters rather than words.
        </li>
        <li>
          <strong>Job applications.</strong> Applicant tracking systems often limit text boxes for cover letters, summaries and
          &quot;why do you want this role?&quot; questions.
        </li>
        <li>
          <strong>Search snippets.</strong> Search engines shorten page titles and descriptions that are too wide for the results
          page. Google measures this in pixels rather than characters, but keeping a meta description to roughly 150–160 characters
          is a common rule of thumb.
        </li>
        <li>
          <strong>Social profiles and posts.</strong> Bios, headlines and posts on most platforms have fixed character limits, and
          those limits change from time to time, so check the platform&apos;s current rules.
        </li>
        <li>
          <strong>SMS and push notifications.</strong> Long messages may be split into several parts or cut off on a lock screen.
        </li>
      </ul>

      <h2>How characters are counted</h2>
      <p>
        This tool counts <strong>user-perceived characters</strong>: what you see on the screen. That matters more than you might
        think, because computers store some characters as several pieces:
      </p>
      <ul>
        <li>
          An accented letter such as &quot;é&quot; can be stored as &quot;e&quot; plus an accent mark. It still counts as{" "}
          <strong>one</strong> character here.
        </li>
        <li>
          Emoji with skin tones or combined emoji such as 👨‍👩‍👧 are made of several code points but count as <strong>one</strong>{" "}
          character.
        </li>
        <li>
          Spaces, tabs and line breaks each count as one character in the &quot;with spaces&quot; figure. A line break pasted from
          Windows (carriage return plus line feed) counts once.
        </li>
      </ul>
      <div className="callout">
        <strong>Heads-up:</strong> some websites count characters in a simpler, more technical way, so an emoji may use up two or
        more characters of their limit. If you are close to a limit and your text contains emoji or special symbols, leave a few
        characters of margin.
      </div>

      <h2>Example</h2>
      <p>
        The sentence <code>Café open 9–5 ☕</code> has <strong>15 characters with spaces</strong> and{" "}
        <strong>12 without</strong>. The accented &quot;é&quot;, the en dash and the coffee emoji each count as a single character.
      </p>

      <h2>Tips for writing to a tight limit</h2>
      <ul>
        <li>Lead with the most important information, since truncated text loses its ending first.</li>
        <li>Replace phrases with single words: &quot;in order to&quot; becomes &quot;to&quot;, &quot;at this point in time&quot; becomes &quot;now&quot;.</li>
        <li>Use numerals instead of spelled-out numbers where your style allows it (&quot;12&quot; rather than &quot;twelve&quot;).</li>
        <li>
          Need to think in words instead? Our guide to <Link href="/blog/word-count-vs-character-count">word count vs. character count</Link>{" "}
          explains how to convert between the two.
        </li>
      </ul>
    </>
  );
}

export const faqs: FaqItem[] = [
  {
    q: "Do spaces count as characters?",
    a: "Usually, yes. Most forms, platforms and application portals count spaces. Some academic and publishing guidelines specify “characters excluding spaces,” which is why this tool shows both numbers and lets you choose which one applies to your limit.",
  },
  {
    q: "How many words is 1,000 characters?",
    a: "Roughly 150 to 200 words of typical English prose with spaces included, because the average English word is around 4.5 to 5 letters plus a space. Text with long technical words will contain fewer words per 1,000 characters.",
  },
  {
    q: "Why does another site show a different character count?",
    a: "Some tools count the underlying code units instead of visible characters, so emoji and certain accented letters count as two or more. Others count a Windows line break as two characters. This tool counts what you see.",
  },
  {
    q: "Is my text stored anywhere?",
    a: "No. Counting happens locally in your browser and your text is not uploaded. Your limit setting is not saved either. It resets when you leave the page.",
  },
];

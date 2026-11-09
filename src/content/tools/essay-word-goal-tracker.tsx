import Link from "next/link";
import type { FaqItem } from "@/components/faq";

export function Guide() {
  return (
    <>
      <h2>How to use the essay word goal tracker</h2>
      <ol>
        <li>
          <strong>Set your word target</strong> using the presets or by typing the exact number from your assignment brief.
        </li>
        <li>
          <strong>Choose the allowed range.</strong> If your course allows a margin, for example 10% either side of the target,
          select it so the tracker tells you when you are inside the acceptable window. Choose <em>Exact</em> if the number is a
          hard limit.
        </li>
        <li>
          <strong>Enter your writing pace</strong> in words per hour. If you&apos;re not sure, leave it at 500 and adjust later.
        </li>
        <li>
          <strong>Write in the box or paste your draft.</strong> You&apos;ll see the percentage complete, words remaining and an
          estimate of how long it will take to finish.
        </li>
      </ol>

      <h2>How the time estimate works</h2>
      <p>
        At first, the estimate divides the words you still need by the pace you entered. Once you have been writing in the box
        for at least two minutes and added 25 or more words, the tracker switches to your <strong>live pace</strong>, measured from
        the words you have actually added since you started typing during this visit. The label under the estimate always tells
        you which pace it is using.
      </p>
      <p>
        Drafting speed varies enormously with the task. Writing a first draft from a detailed outline is far quicker than
        researching as you go, and editing often produces few new words at all. Treat the estimate as a planning aid, not a
        promise. If the live pace looks unrealistic because you pasted a large section, simply clear and paste again, or rely on
        the pace setting.
      </p>

      <h2>Saving your draft</h2>
      <p>
        By default, nothing is saved: close the tab and the draft is gone. If you turn on <strong>Keep draft in this browser</strong>,
        your text and settings are stored in your browser&apos;s local storage on this device only. They are never sent to
        WriteWise. Turning the option off deletes the saved draft. Avoid this option on a shared or public computer.
      </p>
      <div className="callout">
        <strong>Tip:</strong> the tracker is a progress tool, not a word processor. Keep your master copy in your usual editor
        (Word, Google Docs, Pages or LibreOffice) and paste it in to check your progress.
      </div>

      <h2>Understanding word limits and margins</h2>
      <p>
        Rules differ between schools, universities and even individual instructors. Some UK universities, for example, accept work
        within 10% of the stated limit, while others treat the limit as an absolute maximum and penalize anything over it. In the
        US and Canada, high school and college assignments often give a range (&quot;1,000–1,200 words&quot;) or a minimum. Always
        check your assignment brief or course handbook, and ask your instructor if it isn&apos;t clear.
      </p>
      <p>
        It also matters what counts toward the limit. Titles, reference lists, appendices and sometimes in-text citations are
        often excluded. Our guide on <Link href="/blog/how-to-count-words-in-an-essay">how to count words in an essay</Link>{" "}
        explains the usual conventions.
      </p>

      <h2>Example: planning a 2,000-word essay</h2>
      <p>
        Suppose your essay is due in a week, the target is 2,000 words with a 10% margin, and you draft at about 400 words per
        hour. The tracker shows an acceptable range of 1,800 to 2,200 words and an estimated five hours of drafting. Splitting that
        into five one-hour sessions leaves two days for revision, which is where most of the improvement in an essay happens. Our{" "}
        <Link href="/blog/how-to-improve-essay-writing">essay revision guide</Link> explains how to use that time well.
      </p>

      <h2>Tips for reaching your target without padding</h2>
      <ul>
        <li>
          <strong>Outline first.</strong> Give each section its own mini word budget (for example, 10% introduction, 80% body, 10%
          conclusion) so you know when a section is running long.
        </li>
        <li>
          <strong>Write first, edit later.</strong> Turning off your inner editor while drafting is usually the fastest way to make
          progress.
        </li>
        <li>
          <strong>Short on words?</strong> Add analysis, not filler. Explain why each piece of evidence supports your argument, or
          address a counter-argument.
        </li>
        <li>
          <strong>Over the limit?</strong> Use the <Link href="/tools/paragraph-counter">Paragraph Counter</Link> to find the
          longest paragraphs. They are often the best places to tighten.
        </li>
      </ul>
    </>
  );
}

export const faqs: FaqItem[] = [
  {
    q: "Is my essay saved or uploaded?",
    a: "Your draft is never uploaded. It is only saved if you turn on “Keep draft in this browser”, and then only in your own browser's local storage on this device. Turning the option off deletes it.",
  },
  {
    q: "Can I go over the word limit by 10%?",
    a: "It depends entirely on your institution. Some allow a 10% margin, others penalize any amount over the limit. Check your assignment instructions or course handbook. The tracker's “Allowed range” setting lets you model whichever rule applies.",
  },
  {
    q: "How long does it take to write a 1,000-word essay?",
    a: "With research done and an outline ready, many students can draft 1,000 words in roughly two to three hours, and then need extra time for revision. Starting from scratch with research usually takes considerably longer.",
  },
  {
    q: "Does the tracker count words the same way as the Word Counter?",
    a: "Yes. All WriteWise tools share the same counting rules: hyphenated words and contractions count as one word, numbers count as words and stand-alone symbols are ignored.",
  },
];

import Link from "next/link";
import type { FaqItem } from "@/components/faq";

export function Article() {
  return (
    <>
      <p className="text-xl leading-8 text-ink">
        A word limit sounds simple until you start asking questions. Does the title count? What about the reference list, a
        long quotation or &quot;(Nguyen, 2021, p. 14)&quot;? This guide covers how to check your count in the tools you already use,
        what usually counts toward a limit, and how to land inside the allowed range without padding or panic.
      </p>

      <div className="callout">
        <strong>The short answer:</strong> the body of your essay almost always counts, including quotations. Title pages,
        reference lists and appendices usually don&apos;t. In-text citations, headings and footnotes vary between institutions, so
        check your assignment brief or course handbook. When in doubt, ask your instructor before the deadline, not after.
      </div>

      <h2 id="checking">How to check the word count in common programs</h2>
      <h3>Microsoft Word</h3>
      <p>
        Word shows a running count in the status bar at the bottom of the window. For the full breakdown, open{" "}
        <strong>Review → Word Count</strong> (on Windows you can also press <code>Ctrl</code> + <code>Shift</code> +{" "}
        <code>G</code>). To count only part of your document, such as the body without the references, select that text first.
        The status bar then shows &quot;X of Y words&quot;.
      </p>
      <h3>Google Docs</h3>
      <p>
        Choose <strong>Tools → Word count</strong>, or press <code>Ctrl</code> + <code>Shift</code> + <code>C</code> (
        <code>Cmd</code> + <code>Shift</code> + <code>C</code> on a Mac). Tick <em>Display word count while typing</em> to keep a
        live counter on screen. As in Word, selecting text first counts just the selection.
      </p>
      <h3>Apple Pages</h3>
      <p>
        Choose <strong>View → Show Word Count</strong>. The counter appears at the bottom of the page and can switch between
        words, characters and paragraphs.
      </p>
      <h3>WriteWise</h3>
      <p>
        Paste your text into the <Link href="/tools/word-counter">Word Counter</Link> for words, characters, sentences, paragraphs
        and reading time in one view. Because it runs in your browser, you can check a draft from any device, including one where
        you can&apos;t install software, without uploading it.
      </p>

      <h2 id="what-counts">What usually counts toward an essay word limit</h2>
      <p>
        There is no universal rule, but conventions are broadly similar across the US, Canada and the UK. Use this table as a
        starting point, then confirm with your own course.
      </p>
      <table>
        <thead>
          <tr>
            <th>Part of the essay</th>
            <th>Usually counted?</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Introduction, body and conclusion</td>
            <td>Yes</td>
            <td>This is what the limit is designed to measure.</td>
          </tr>
          <tr>
            <td>Direct quotations</td>
            <td>Yes</td>
            <td>Quoted words are part of your text. Long quotations are an expensive way to use your word budget.</td>
          </tr>
          <tr>
            <td>In-text citations</td>
            <td>Varies</td>
            <td>Often included in the US and Canada; some UK departments exclude them. Check your handbook.</td>
          </tr>
          <tr>
            <td>Headings and subheadings</td>
            <td>Varies</td>
            <td>Usually included if they are part of the body; rarely significant either way.</td>
          </tr>
          <tr>
            <td>Footnotes and endnotes</td>
            <td>Varies</td>
            <td>Often included when they contain discussion; sometimes excluded when they only contain references.</td>
          </tr>
          <tr>
            <td>Title and title page</td>
            <td>Usually not</td>
            <td>Including student number, course code and date.</td>
          </tr>
          <tr>
            <td>Reference list or bibliography</td>
            <td>Usually not</td>
            <td>The most common exclusion across APA, MLA, Harvard and Chicago styles.</td>
          </tr>
          <tr>
            <td>Abstract, appendices, tables and figures</td>
            <td>Usually not</td>
            <td>Dissertations often state separate rules for these.</td>
          </tr>
        </tbody>
      </table>
      <p>
        To count only the parts that matter, paste just your body text (from the first line of your introduction to the end of
        your conclusion) into a word counter, or select that range in your word processor.
      </p>

      <h2 id="tricky">Tricky cases: how individual words are counted</h2>
      <p>
        Word processors agree on ordinary words but differ on edge cases. These differences rarely add up to more than a few words
        in an essay, but they explain why two tools might disagree.
      </p>
      <ul>
        <li>
          <strong>Hyphenated words</strong> such as &quot;long-term&quot; or &quot;well-being&quot; are counted as one word by Microsoft
          Word and by WriteWise.
        </li>
        <li>
          <strong>Contractions</strong> such as &quot;isn&apos;t&quot; count as one word. In formal academic writing you may want to
          expand them anyway, which adds words.
        </li>
        <li>
          <strong>Numbers</strong> count as words: &quot;1,500&quot; is one word, but &quot;fifteen hundred&quot; is two.
        </li>
        <li>
          <strong>Dashes</strong> are handled differently. WriteWise treats an em dash as a gap between words, so
          &quot;results—surprisingly—improved&quot; is three words. Some programs count that as a single word.
        </li>
        <li>
          <strong>Citations</strong> such as &quot;(Nguyen, 2021, p. 14)&quot; typically count as four words: &quot;Nguyen&quot;,
          &quot;2021&quot;, &quot;p.&quot; and &quot;14&quot;.
        </li>
        <li>
          <strong>Abbreviations and URLs</strong> count as one word each, however long they are.
        </li>
      </ul>

      <h2 id="limits">Word limits, minimums and margins</h2>
      <p>
        How strictly a limit is applied depends on where you are studying and who set the assignment:
      </p>
      <ul>
        <li>
          <strong>Application essays</strong> are usually hard limits enforced by the form itself. The Common App personal essay,
          used by many US colleges, has long had a 650-word maximum; check the limit shown in your application, because the form
          enforces whatever it displays. Our <Link href="/tools/application-limit-checker">Application Limit Checker</Link> handles
          Common App, UCAS and custom limits.
        </li>
        <li>
          <strong>US and Canadian coursework</strong> often gives a range (&quot;1,000–1,250 words&quot;) or a page count. When a page
          count is given, formatting rules such as font, size and spacing matter as much as words.
        </li>
        <li>
          <strong>UK university coursework</strong> commonly states a single number. Some universities allow a margin, often 10%,
          and others apply a penalty for any words over the limit. Your module handbook will say which.
        </li>
      </ul>
      <p>
        Being far <em>under</em> the limit can be a problem too. A 1,500-word assignment answered in 900 words usually means the
        argument isn&apos;t developed enough, even if there&apos;s no formal penalty. The{" "}
        <Link href="/tools/essay-word-goal-tracker">Essay Word Goal Tracker</Link> lets you set a target and a margin and shows
        whether you&apos;re inside the acceptable range.
      </p>

      <h2 id="budget">Plan with a word budget</h2>
      <p>
        The easiest way to hit a limit is to plan for it. Before you write, split your total across sections. A common starting
        point for a standard essay is:
      </p>
      <ul>
        <li>
          <strong>Introduction:</strong> about 10%
        </li>
        <li>
          <strong>Body paragraphs:</strong> about 80%, divided among your main points
        </li>
        <li>
          <strong>Conclusion:</strong> about 10%
        </li>
      </ul>
      <p>
        For a 2,000-word essay with four main points, that means an introduction of about 200 words, four body sections of about
        400 words each and a conclusion of about 200 words. When one section runs long, you&apos;ll notice early instead of
        discovering a 700-word overrun the night before the deadline.
      </p>

      <h2 id="cutting">How to cut words without losing substance</h2>
      <p>Most drafts contain words that can go without changing the meaning. Start with these:</p>
      <table>
        <thead>
          <tr>
            <th>Wordy</th>
            <th>Concise</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>in order to</td>
            <td>to</td>
          </tr>
          <tr>
            <td>due to the fact that</td>
            <td>because</td>
          </tr>
          <tr>
            <td>it is important to note that</td>
            <td>(delete it and state the point)</td>
          </tr>
          <tr>
            <td>at this point in time</td>
            <td>now</td>
          </tr>
          <tr>
            <td>has the ability to</td>
            <td>can</td>
          </tr>
          <tr>
            <td>a large number of</td>
            <td>many</td>
          </tr>
        </tbody>
      </table>
      <p>
        Next, look for sentences that repeat what the previous sentence said, quotations you could paraphrase more briefly, and
        &quot;signposting&quot; that announces what you&apos;re about to say instead of saying it. The Word Counter&apos;s list of most
        repeated words is a quick way to find habits worth trimming.
      </p>

      <h2 id="adding">How to add words that actually improve the essay</h2>
      <p>If you&apos;re short, resist padding. Instead:</p>
      <ul>
        <li>Explain <em>why</em> each piece of evidence supports your point, not just <em>that</em> it does.</li>
        <li>Address a counter-argument and explain why your position still holds.</li>
        <li>Add a specific example, statistic or case study where you&apos;ve made a general claim.</li>
        <li>Strengthen the links between paragraphs so the argument builds rather than lists.</li>
      </ul>
      <p>
        For a full revision method, read <Link href="/blog/how-to-improve-essay-writing">How to improve your essay writing</Link>.
      </p>
    </>
  );
}

export const faqs: FaqItem[] = [
  {
    q: "Do in-text citations count toward the word limit?",
    a: "Often, but not always. Many US and Canadian instructors include them, while some UK universities exclude them. Your assignment brief or course handbook is the authority; if it doesn't say, ask your instructor.",
  },
  {
    q: "Does the bibliography count in the word count?",
    a: "Almost never. Reference lists and bibliographies are excluded from word limits in nearly all academic settings. Appendices and title pages are usually excluded too.",
  },
  {
    q: "Is it okay to go slightly over the word limit?",
    a: "Only if your institution explicitly allows a margin. Some accept up to 10% over, while others penalize any excess or stop reading at the limit. Application forms such as the Common App simply won't accept text over the maximum.",
  },
];

import Link from "next/link";
import type { FaqItem } from "@/components/faq";

function BeforeAfter({ before, after }: { before: string; after: string }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <figure>
        <figcaption className="text-sm text-muted">Copied from the PDF</figcaption>
        <pre className="mt-1 overflow-x-auto whitespace-pre-wrap rounded border border-line bg-surface p-3 font-mono text-sm leading-6">{before}</pre>
      </figure>
      <figure>
        <figcaption className="text-sm text-muted">After cleaning</figcaption>
        <pre className="mt-1 overflow-x-auto whitespace-pre-wrap rounded border border-accent bg-surface p-3 font-mono text-sm leading-6">{after}</pre>
      </figure>
    </div>
  );
}

export function Article() {
  return (
    <>
      <p className="text-xl leading-8 text-ink">
        Text copied from a PDF usually arrives with a line break at the end of every line, words split by hyphens and odd spacing. The
        fix is to join the lines back into paragraphs while keeping the real paragraph breaks. Here&apos;s why it happens and how to do
        it in under a minute.
      </p>

      <div className="callout">
        <strong>The short answer:</strong> paste the text into the <Link href="/tools/text-cleaner">Text Cleaner</Link>, turn on{" "}
        <em>Join hard-wrapped lines</em> (and <em>Rejoin words split by a hyphen</em> if you see broken words), check the preview,
        then copy the result.
      </div>

      <h2 id="why">Why PDF text breaks when you copy it</h2>
      <p>
        A PDF describes where each line of text sits on a page. It doesn&apos;t store paragraphs the way a word processor does. When you
        copy, most PDF readers rebuild the text line by line, so you get:
      </p>
      <ul>
        <li>a line break at the end of every visual line, often mid-sentence;</li>
        <li>hyphens left over from words split across lines (&quot;signif-&quot; / &quot;icantly&quot;);</li>
        <li>extra spaces where text was justified, plus non-breaking or invisible characters;</li>
        <li>page numbers, running headers and footnote markers mixed into the text;</li>
        <li>
          sometimes ligatures, single characters like &quot;ﬁ&quot; that replace &quot;fi&quot;, which can break searches and spell
          checks.
        </li>
      </ul>

      <h2 id="example">A worked example</h2>
      <BeforeAfter
        before={"Climate  policy   in the UK has changed signif-\nicantly since 2008, when the Climate\nChange Act set a legally binding\ntarget.\n\n\n\n  Critics argue that progress has been   uneven \nacross sectors."}
        after={"Climate policy in the UK has changed significantly since 2008, when the Climate Change Act set a legally binding target.\n\nCritics argue that progress has been uneven across sectors."}
      />
      <p>
        That result comes from the Text Cleaner&apos;s default spacing fixes plus <em>Join hard-wrapped lines</em> and{" "}
        <em>Rejoin words split by a hyphen</em>. You can load this exact text with the tool&apos;s <em>Load an example</em> button.
      </p>

      <h2 id="steps">Step by step</h2>
      <ol>
        <li>
          <strong>Copy one section at a time.</strong> Copying a whole multi-column page often interleaves the columns. Select one
          column or section, and leave out headers, footers and page numbers where you can.
        </li>
        <li>
          <strong>Paste into the Text Cleaner.</strong> The default fixes (collapse repeated spaces, trim line ends, convert
          non-breaking spaces, remove invisible characters, collapse extra blank lines) are safe for almost any text.
        </li>
        <li>
          <strong>Join the lines.</strong> Turn on <em>Join hard-wrapped lines</em>. This joins lines within each paragraph and keeps
          blank lines as paragraph breaks. If the PDF has no blank lines between paragraphs, add them in the original first at each
          real paragraph break.
        </li>
        <li>
          <strong>Repair split words.</strong> Turn on <em>Rejoin words split by a hyphen</em>, then scan the preview for compounds
          that really should keep their hyphen (&quot;well-known&quot;, &quot;long-term&quot;) and fix those by hand.
        </li>
        <li>
          <strong>Fix leftovers.</strong> Use <Link href="/tools/find-and-replace">Find and Replace</Link> to change ligatures such as
          &quot;ﬁ&quot; → &quot;fi&quot; and &quot;ﬂ&quot; → &quot;fl&quot;, or to remove repeated running headers.
        </li>
        <li>
          <strong>Compare before you use it.</strong> For important text, paste the original and cleaned versions into{" "}
          <Link href="/tools/text-compare">Text Compare</Link> to make sure nothing was lost.
        </li>
      </ol>

      <h2 id="quoting">If you&apos;re quoting the PDF</h2>
      <p>
        Cleaning changes formatting, not words, but always check quotations against the original document and cite the page number.
        If you&apos;re quoting a source in an essay, your citation style (APA, MLA, Chicago or Harvard) sets how to show page numbers and
        any changes you make.
      </p>

      <h2 id="lists">Lists and tables</h2>
      <p>
        Don&apos;t join lines for lists, addresses or table rows, because every line break there is meaningful. For lists, the
        spacing fixes alone are usually enough; then use <Link href="/tools/remove-duplicate-lines">Remove Duplicate Lines</Link> or{" "}
        <Link href="/tools/sort-lines">Sort Lines</Link> as needed. Tables copied from PDFs rarely survive intact; if the PDF came from
        a spreadsheet, ask for the original file instead.
      </p>
    </>
  );
}

export const faqs: FaqItem[] = [
  {
    q: "How do I remove line breaks but keep paragraphs?",
    a: "Use the Text Cleaner's “Join hard-wrapped lines” option. It joins lines within each paragraph and keeps blank lines as paragraph breaks.",
  },
  {
    q: "Why does copied PDF text have random hyphens?",
    a: "The PDF split long words across lines with a hyphen. When copied, the hyphen and line break stay. The “Rejoin words split by a hyphen” option fixes these, but check real compounds like “well-known” afterward.",
  },
  {
    q: "Is it safe to paste confidential PDF text into the cleaner?",
    a: "The Text Cleaner runs in your browser and doesn't upload text. Still follow your organization's rules for handling confidential documents.",
  },
];

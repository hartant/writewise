import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { categories, tools } from "@/lib/tools";
import { posts } from "@/lib/posts";
import { site } from "@/lib/site";
import { organizationLd, websiteLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { countCharacters, countSentences, countWords } from "@/lib/text/stats";
import { ToolSearch } from "@/components/tool-search";
import { ToolCard } from "@/components/tool-card";
import { PostCard } from "@/components/post-card";
import { Faq, type FaqItem } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { HeroCounter } from "@/tools/hero-counter";

export const metadata: Metadata = pageMetadata({
  title: `${site.name}: Free Word Counter & Private Writing Tools`,
  description: site.description,
  path: "/",
  absoluteTitle: true,
});

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

// Each result below is computed at build time by the same code the tools run.
const specimens = [
  { text: "well-known", result: plural(countWords("well-known"), "word"), note: "Hyphenated words count once" },
  { text: "don't", result: plural(countWords("don't"), "word"), note: "So do contractions" },
  { text: "1,200", result: plural(countWords("1,200"), "word"), note: "Numbers are words" },
  { text: "then—suddenly—silence", result: plural(countWords("then—suddenly—silence"), "word"), note: "Dashes separate words" },
  { text: "👍🏽", result: plural(countCharacters("👍🏽"), "character"), note: "Emoji count as one character" },
  { text: "Dr. Patel arrived.", result: plural(countSentences("Dr. Patel arrived."), "sentence"), note: "Abbreviations don't end sentences" },
  { text: "It costs 3.50. Fine.", result: plural(countSentences("It costs 3.50. Fine."), "sentence"), note: "Neither do decimals" },
];

const faqs: FaqItem[] = [
  {
    q: "Is WriteWise free?",
    a: "Yes. All eight tools are free, with no account, usage cap or trial. If advertising is added later to cover hosting, it will be kept away from the tools and will follow consent rules.",
  },
  {
    q: "Do you store or read the text I paste?",
    a: (
      <>
        No. The tools run in your browser, so your text is processed on your device and is not sent to our servers. The one
        exception is opt-in: the Essay Word Goal Tracker can keep a draft in your own browser&apos;s storage if you switch that
        on. See the <Link href="/privacy">Privacy Policy</Link>.
      </>
    ),
  },
  {
    q: "Why is my count slightly different from Word or Google Docs?",
    a: (
      <>
        Every program makes small decisions about hyphens, dashes and symbols. The table above shows ours. For what counts
        toward an assignment&apos;s limit, read <Link href="/blog/how-to-count-words-in-an-essay">how to count words in an essay</Link>.
      </>
    ),
  },
  {
    q: "Do the tools work on a phone?",
    a: "Yes, in current versions of Safari, Chrome, Firefox and Edge on phones, tablets and computers. Once a page has loaded, the tool keeps working even if your connection drops.",
  },
  {
    q: "Do you support British and Canadian spelling?",
    a: "The tools work with any spelling because they never change your words. The guides use American English and point out British and Canadian conventions where they differ.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={[websiteLd(), organizationLd()]} />

      <section className="container-ww pt-10 sm:pt-14">
        <div className="grid grid-cols-1 items-end gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div>
            <h1 className="max-w-[15ch] font-display text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.02em] text-ink sm:text-[4rem]">
              Free word counter and writing tools
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-ink-2">
              Paste an essay, cover letter or post below to count it. The counting happens in this browser tab, so your writing
              is never uploaded.
            </p>
          </div>
          {/* On small screens the counter comes first and search follows it. */}
          <div className="order-2 lg:order-none">
            <p className="mb-2 text-sm font-bold text-ink">Looking for another tool?</p>
            <ToolSearch />
          </div>
          <div className="order-1 lg:order-none lg:col-span-2">
            <HeroCounter />
          </div>
        </div>
      </section>

      <section className="container-ww mt-28" aria-labelledby="tools-heading">
        <div className="grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <div>
            <h2 id="tools-heading" className="font-display text-[2rem] font-semibold leading-tight tracking-tight text-ink">
              Tools
            </h2>
            <p className="mt-3 leading-7 text-ink-2">
              {tools.length} tools, each on its own page with a short guide to how it works.
            </p>
            <Link href="/tools" className="pencil-link mt-4 inline-flex items-center gap-1.5 font-bold text-ink">
              Browse by category <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
            {categories.map((c) => (
              <div key={c.id}>
                <h3 className="text-sm text-muted">
                  <Link href={`/tools#${c.id}`} className="hover:text-ink">
                    {c.name}
                  </Link>
                </h3>
                <div className="mt-2">
                  {tools
                    .filter((t) => t.category === c.id)
                    .map((t) => (
                      <ToolCard key={t.slug} tool={t} headingLevel={4} />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-ww mt-28" aria-labelledby="counting-heading">
        <div className="grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <div>
            <h2 id="counting-heading" className="font-display text-[2rem] font-semibold leading-tight tracking-tight text-ink">
              How we count
            </h2>
            <p className="mt-3 leading-7 text-ink-2">
              Word processors disagree on the edge cases. These are our rules, and every result in this table comes from the
              same code the tools use.
            </p>
          </div>
          <div>
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-ink text-sm text-muted">
                  <th scope="col" className="py-2 pr-4 font-normal">
                    Text
                  </th>
                  <th scope="col" className="py-2 pr-4 font-normal">
                    Counts as
                  </th>
                  <th scope="col" className="hidden py-2 font-normal sm:table-cell">
                    Why
                  </th>
                </tr>
              </thead>
              <tbody>
                {specimens.map((s) => (
                  <tr key={s.text} className="border-b border-line align-baseline">
                    <td className="py-3 pr-4 font-mono text-[1.05rem] text-ink">{s.text}</td>
                    <td className="whitespace-nowrap py-3 pr-4 font-mono text-[1.05rem] text-accent-text">{s.result}</td>
                    <td className="hidden py-3 text-[0.95rem] text-ink-2 sm:table-cell">{s.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-6 max-w-2xl leading-7 text-ink-2">
              <strong className="text-ink">Check that nothing is uploaded.</strong> Open your browser&apos;s developer tools, switch
              to the Network tab and type into any tool. You won&apos;t see a request, because there&apos;s nowhere for your text to
              go.
            </p>
          </div>
        </div>
      </section>

      <section className="container-ww mt-28" aria-labelledby="guides-heading">
        <div className="grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <div>
            <h2 id="guides-heading" className="font-display text-[2rem] font-semibold leading-tight tracking-tight text-ink">
              Guides
            </h2>
            <p className="mt-3 leading-7 text-ink-2">Answers to the questions that come up while you write.</p>
            <Link href="/blog" className="pencil-link mt-4 inline-flex items-center gap-1.5 font-bold text-ink">
              All guides <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-ww mt-28">
        <div className="grid grid-cols-1 gap-x-12 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <div />
          <div className="max-w-3xl">
            <Faq items={faqs} heading="Questions" />
          </div>
        </div>
      </section>
    </>
  );
}

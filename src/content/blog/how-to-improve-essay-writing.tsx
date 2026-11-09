import Link from "next/link";
import type { FaqItem } from "@/components/faq";

export function Article() {
  return (
    <>
      <p className="text-xl leading-8 text-ink">
        Strong essays are rarely written. They are rewritten. The difference between a B and an A is usually not talent but
        process: a clear question, a precise thesis, paragraphs that each do one job, and revision done in focused passes instead
        of one anxious read-through. This guide walks through that process step by step.
      </p>

      <h2 id="question">1. Answer the question that was actually asked</h2>
      <p>
        Many disappointing grades come from answering a slightly different question. Before you research anything, underline the
        instruction word in the prompt, because it tells you what kind of thinking is expected:
      </p>
      <ul>
        <li>
          <strong>Describe / outline:</strong> explain what something is or what happened, with little judgment.
        </li>
        <li>
          <strong>Analyze / examine:</strong> break the topic into parts and explain how they work or relate.
        </li>
        <li>
          <strong>Compare / contrast:</strong> identify similarities and differences, and say why they matter.
        </li>
        <li>
          <strong>Evaluate / assess / to what extent:</strong> weigh evidence on more than one side and reach a justified
          judgment.
        </li>
        <li>
          <strong>Discuss:</strong> explore different perspectives, usually ending with your own reasoned position.
        </li>
      </ul>
      <p>
        Then rewrite the question in your own words. If you can&apos;t, ask your instructor now rather than discovering the
        misunderstanding in your feedback.
      </p>

      <h2 id="thesis">2. Turn your topic into an arguable thesis</h2>
      <p>
        A thesis is the claim your whole essay sets out to prove. The most common weakness is a thesis that states a fact or a
        topic instead of an argument. A good test: could a reasonable person disagree with it?
      </p>
      <table>
        <thead>
          <tr>
            <th>Weak</th>
            <th>Stronger</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Social media affects teenagers.</td>
            <td>
              Social media harms teenagers&apos; sleep more than their self-esteem, which makes limits on late-night use more urgent
              than limits on total screen time.
            </td>
          </tr>
          <tr>
            <td>This essay will discuss the causes of the First World War.</td>
            <td>
              The alliance system turned a regional crisis into a world war, but it was military planning that made war
              difficult to stop once mobilization began.
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        The stronger versions are specific, make a claim someone could dispute, and hint at how the essay is organized. Your thesis
        can and should change as you research. Revise it at the end so it matches what you actually argued.
      </p>

      <h2 id="structure">3. Build paragraphs that each do one job</h2>
      <p>
        Every body paragraph should advance your thesis by making one point. A reliable structure, taught in many UK schools as{" "}
        <strong>PEEL</strong> and in North American classrooms under various names, is:
      </p>
      <ol>
        <li>
          <strong>Point:</strong> a topic sentence stating the paragraph&apos;s claim.
        </li>
        <li>
          <strong>Evidence:</strong> a quotation, statistic, example or source that supports it.
        </li>
        <li>
          <strong>Explanation:</strong> your analysis of how the evidence proves the point. This is where most of the marks are.
        </li>
        <li>
          <strong>Link:</strong> a sentence connecting the point back to your thesis or forward to the next paragraph.
        </li>
      </ol>
      <p>
        The five-paragraph essay (introduction, three body paragraphs, conclusion) is a useful scaffold when you&apos;re learning,
        but longer and more advanced essays should let the argument decide how many sections are needed.
      </p>
      <p>
        A quick structural check: read only the first sentence of each paragraph. If those sentences, in order, form a coherent
        summary of your argument, your structure is working. The{" "}
        <Link href="/tools/paragraph-counter">Paragraph Counter</Link> helps here too, because paragraphs far longer than the rest
        often contain two points that should be separated.
      </p>

      <h2 id="evidence">4. Use evidence, then explain it</h2>
      <p>
        A common piece of feedback is &quot;too descriptive&quot; or &quot;needs more analysis&quot;. It usually means the essay presents
        evidence but doesn&apos;t explain its significance. One helpful habit is the <strong>quotation sandwich</strong>: introduce
        the source, give the evidence, then explain what it shows. Here is an invented example to show the shape:
      </p>
      <blockquote>
        One economic historian argues that railways &quot;collapsed the distance between farm and city&quot;. This matters because it
        explains why food prices in industrial towns fell faster than wages rose, which undercuts the claim that workers gained
        nothing from industrialization.
      </blockquote>
      <p>
        The sentence after the quotation is doing the real work. As a rule of thumb, your own explanation should be at least as long
        as the evidence it follows. Always cite your sources in the style your course requires, such as APA, MLA, Chicago or
        Harvard, and keep quotations short so your own voice carries the essay.
      </p>

      <h2 id="passes">5. Revise in passes, from big to small</h2>
      <p>
        Trying to fix everything in one read leads to polishing sentences in paragraphs that should be deleted. Work from the
        largest issues to the smallest:
      </p>
      <ol>
        <li>
          <strong>Argument pass.</strong> Does the essay answer the question? Does every section support the thesis? Cut or move
          anything that doesn&apos;t.
        </li>
        <li>
          <strong>Structure pass.</strong> Is the order logical? Does each paragraph make one point and connect to the next?
        </li>
        <li>
          <strong>Evidence pass.</strong> Is every claim supported? Is every piece of evidence explained and correctly cited?
        </li>
        <li>
          <strong>Sentence pass.</strong> Is each sentence clear and as concise as it can be?
        </li>
        <li>
          <strong>Proofreading pass.</strong> Spelling, punctuation, formatting and citation details.
        </li>
      </ol>
      <p>
        Save a copy before each major pass. Afterward, paste your first and final drafts into{" "}
        <Link href="/tools/text-compare">Text Compare</Link> to see exactly what you changed. It&apos;s a surprisingly motivating way
        to learn which edits you make most often.
      </p>

      <h2 id="sentences">6. Make every sentence clearer</h2>
      <ul>
        <li>
          <strong>Prefer active voice when the actor matters.</strong> &quot;The committee rejected the proposal&quot; is clearer than
          &quot;The proposal was rejected.&quot; Passive voice is fine when the actor is unknown or unimportant, as in many lab reports.
        </li>
        <li>
          <strong>Use precise verbs.</strong> &quot;The data suggests&quot;, &quot;contradicts&quot; or &quot;confirms&quot; says more than
          &quot;the data shows&quot;.
        </li>
        <li>
          <strong>Cut filler.</strong> Words like &quot;very&quot;, &quot;really&quot;, &quot;basically&quot; and &quot;in today&apos;s
          society&quot; rarely add meaning.
        </li>
        <li>
          <strong>Vary sentence length.</strong> A short sentence after two longer ones adds emphasis. A page of identical sentence
          lengths reads like a list.
        </li>
        <li>
          <strong>Keep the subject and verb close.</strong> Long gaps between them force readers to hold too much in their heads.
        </li>
      </ul>

      <h2 id="spelling">7. Be consistent with American, British or Canadian spelling</h2>
      <p>
        Use the spelling convention your institution expects, and apply it consistently. Mixing conventions looks careless even when
        every individual word is &quot;correct&quot;.
      </p>
      <table>
        <thead>
          <tr>
            <th>American</th>
            <th>British</th>
            <th>Canadian (common usage)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>color, behavior</td>
            <td>colour, behaviour</td>
            <td>colour, behaviour</td>
          </tr>
          <tr>
            <td>analyze, organize</td>
            <td>analyse, organise (or organize)</td>
            <td>analyze, organize</td>
          </tr>
          <tr>
            <td>center, theater</td>
            <td>centre, theatre</td>
            <td>centre, theatre</td>
          </tr>
          <tr>
            <td>traveled, canceled</td>
            <td>travelled, cancelled</td>
            <td>travelled, cancelled</td>
          </tr>
          <tr>
            <td>defense, license (noun)</td>
            <td>defence, licence (noun)</td>
            <td>defence, licence (noun)</td>
          </tr>
        </tbody>
      </table>
      <p>
        Set your word processor&apos;s proofing language to match (for example, English (United States), English (United Kingdom)
        or English (Canada)) so the spellchecker flags the right words. Punctuation conventions differ too: American style places
        periods and commas inside closing quotation marks, while British style usually places them according to sense.
      </p>

      <h2 id="proofreading">8. Proofread like an editor</h2>
      <ul>
        <li>
          <strong>Take a break first.</strong> Even a few hours away helps you see what you wrote rather than what you meant.
        </li>
        <li>
          <strong>Read aloud.</strong> You&apos;ll hear missing words, repeated words and sentences that run out of breath.
        </li>
        <li>
          <strong>Change the format.</strong> Print it, or switch to a different font and size, to break familiarity.
        </li>
        <li>
          <strong>Read the conclusion and introduction together.</strong> They should agree. If your argument evolved while
          writing, update the introduction.
        </li>
        <li>
          <strong>Check the requirements last.</strong> Word count, formatting, title page, citation style and file name. The{" "}
          <Link href="/tools/word-counter">Word Counter</Link> gives you a final check in seconds.
        </li>
      </ul>

      <h2 id="checklist">A final pre-submission checklist</h2>
      <ul>
        <li>My thesis directly answers the question and is arguable.</li>
        <li>Every body paragraph makes one point that supports the thesis.</li>
        <li>Every piece of evidence is explained and correctly cited.</li>
        <li>My introduction and conclusion match the argument I actually made.</li>
        <li>I&apos;ve used one spelling convention throughout.</li>
        <li>The essay is within the word limit, counted according to my course&apos;s rules.</li>
        <li>The work is my own, and any help or sources are acknowledged as my institution requires.</li>
      </ul>
    </>
  );
}

export const faqs: FaqItem[] = [
  {
    q: "What is the fastest way to improve an essay?",
    a: "Sharpen your thesis and make sure every paragraph supports it. Structural fixes improve an essay far more than polishing individual sentences, so do them first.",
  },
  {
    q: "How many drafts should an essay go through?",
    a: "There's no magic number, but most strong essays go through at least two full revisions after the first draft: one for argument and structure, and one for clarity and correctness, followed by a final proofread.",
  },
  {
    q: "Should I use American or British spelling?",
    a: "Use whatever your school, university or publisher expects. In the US, use American spelling; in the UK, British spelling; in Canada, Canadian spelling, which combines British forms like “colour” and “centre” with “-ize” endings. Above all, be consistent.",
  },
];

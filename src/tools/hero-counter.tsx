"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { analyzeText, DEFAULT_READING_WPM, formatDuration, minutesFor } from "@/lib/text/stats";
import { fmt, Paper, SAMPLE_ESSAY, Stat } from "./ui";

/** The homepage's working word counter: a manuscript with the editor's tally in the margin. */
export function HeroCounter() {
  const [text, setText] = useState("");
  const deferred = useDeferredValue(text);
  const stats = useMemo(() => analyzeText(deferred), [deferred]);

  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-[minmax(0,1fr)_13rem]">
      <div className="sheet-stack">
        <Paper
          id="home-draft"
          label="Your draft"
          value={text}
          onChange={setText}
          rows={9}
          sample={SAMPLE_ESSAY}
          corner={`${fmt(stats.words)} words`}
          placeholder="Start typing, or paste an essay, cover letter or post…"
        />
      </div>
      <div>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 lg:grid-cols-1" aria-live="polite">
          <div className="col-span-2 lg:col-span-1">
            <Stat label="Words" value={fmt(stats.words)} accent />
          </div>
          <Stat label="Characters" value={fmt(stats.characters)} />
          <Stat label="Sentences" value={fmt(stats.sentences)} />
          <div className="col-span-2 lg:col-span-1">
            <Stat label="Reading time" value={<span className="text-xl">{formatDuration(minutesFor(stats.words, DEFAULT_READING_WPM))}</span>} />
          </div>
        </dl>
        <Link href="/tools/word-counter" className="pencil-link mt-6 inline-flex items-center gap-1.5 text-[0.95rem] font-bold text-ink">
          Full word counter <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <p className="mt-1 text-sm leading-5 text-muted">Adds paragraphs, speaking time and your most repeated words.</p>
      </div>
    </div>
  );
}

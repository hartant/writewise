"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { countCharacters, countSentences, countWords, splitParagraphs, type ParagraphMode } from "@/lib/text/stats";
import { fmt, Paper, SAMPLE_ESSAY, Segmented, Stat, StatGrid } from "./ui";

const LONG_PARAGRAPH = 150;
const MAX_ROWS = 200;

export function ParagraphCounter() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<ParagraphMode>("line");
  const deferred = useDeferredValue(text);

  const data = useMemo(() => {
    const paragraphs = splitParagraphs(deferred, mode).map((p) => ({
      text: p,
      words: countWords(p),
      sentences: countSentences(p),
    }));
    const words = countWords(deferred);
    const sentences = paragraphs.reduce((n, p) => n + p.sentences, 0);
    const longest = paragraphs.reduce((m, p) => Math.max(m, p.words), 0);
    return {
      paragraphs,
      words,
      characters: countCharacters(deferred),
      sentences,
      longest,
      avgWords: paragraphs.length ? words / paragraphs.length : 0,
      avgSentences: paragraphs.length ? sentences / paragraphs.length : 0,
      avgSentenceLength: sentences ? words / sentences : 0,
    };
  }, [deferred, mode]);

  const longCount = data.paragraphs.filter((p) => p.words > LONG_PARAGRAPH).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-3">
          <Segmented
            label="How paragraphs are separated"
            value={mode}
            onChange={setMode}
            options={[
              { value: "line", label: "Every line break" },
              { value: "blank", label: "Blank lines only" },
            ]}
          />
          <Paper
            id="pc-input"
            label="Your text"
            value={text}
            onChange={setText}
            placeholder="Paste your essay, article or report…"
            rows={14}
            sample={SAMPLE_ESSAY}
            footer={
              <span>
                {mode === "line"
                  ? "Each non-empty line counts as a paragraph, like Microsoft Word."
                  : "Paragraphs are separated by an empty line. Use this for text with hard line wraps."}
              </span>
            }
          />
        </div>
        <StatGrid className="content-start">
          <div className="col-span-2">
            <Stat label="Paragraphs" value={fmt(data.paragraphs.length)} accent />
          </div>
          <Stat label="Words" value={fmt(data.words)} />
          <Stat label="Characters" value={fmt(data.characters)} />
          <Stat label="Sentences" value={fmt(data.sentences)} />
          <Stat label="Longest" value={fmt(data.longest)} hint="words in one paragraph" />
          <Stat label="Words / para" value={data.avgWords.toFixed(1)} hint="average" />
          <Stat label="Sentences / para" value={data.avgSentences.toFixed(1)} hint="average" />
          <div className="col-span-2">
            <Stat label="Words per sentence" value={data.avgSentenceLength.toFixed(1)} hint="average sentence length" />
          </div>
        </StatGrid>
      </div>

      {data.paragraphs.length > 0 && (
        <div className="card p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-base font-semibold text-ink">Paragraph breakdown</h2>
            {longCount > 0 && (
              <p className="inline-flex items-center gap-1.5 rounded-full bg-warn-soft px-3 py-1 text-xs font-medium text-warn">
                <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
                {longCount} paragraph{longCount === 1 ? "" : "s"} over {LONG_PARAGRAPH} words
              </p>
            )}
          </div>
          <ol className="mt-4 space-y-3">
            {data.paragraphs.slice(0, MAX_ROWS).map((p, i) => {
              const long = p.words > LONG_PARAGRAPH;
              return (
                <li key={i} className="grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-3">
                  <span className="font-mono text-xs text-muted">¶{i + 1}</span>
                  <div className="min-w-0">
                    <p className="truncate text-sm text-ink-2">{p.text}</p>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-2">
                      <div
                        className={`h-full rounded-full ${long ? "bg-warn" : "bg-accent"}`}
                        style={{ width: `${data.longest ? (p.words / data.longest) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                  <span className={`text-right font-mono text-xs tabular-nums ${long ? "font-semibold text-warn" : "text-muted"}`}>
                    {fmt(p.words)}w · {p.sentences}s
                  </span>
                </li>
              );
            })}
          </ol>
          {data.paragraphs.length > MAX_ROWS && (
            <p className="mt-4 text-xs text-muted">Showing the first {MAX_ROWS} of {fmt(data.paragraphs.length)} paragraphs. Totals include all of them.</p>
          )}
        </div>
      )}
    </div>
  );
}

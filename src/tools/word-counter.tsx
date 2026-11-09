"use client";

import { useDeferredValue, useMemo, useState } from "react";
import {
  analyzeText,
  DEFAULT_READING_WPM,
  DEFAULT_SPEAKING_WPM,
  formatDuration,
  minutesFor,
  topWords,
} from "@/lib/text/stats";
import { CopyButton, fmt, Paper, SAMPLE_ESSAY, Stat, StatGrid } from "./ui";

export function WordCounter() {
  const [text, setText] = useState("");
  const deferred = useDeferredValue(text);
  const stats = useMemo(() => analyzeText(deferred), [deferred]);
  const frequent = useMemo(() => topWords(deferred, 6), [deferred]);
  const reading = formatDuration(minutesFor(stats.words, DEFAULT_READING_WPM));
  const speaking = formatDuration(minutesFor(stats.words, DEFAULT_SPEAKING_WPM));
  const avgSentence = stats.sentences ? (stats.words / stats.sentences).toFixed(1) : "0";

  const summary = () =>
    [
      `Words: ${fmt(stats.words)}`,
      `Characters: ${fmt(stats.characters)}`,
      `Characters (no spaces): ${fmt(stats.charactersNoSpaces)}`,
      `Sentences: ${fmt(stats.sentences)}`,
      `Paragraphs: ${fmt(stats.paragraphs)}`,
      `Reading time: ${reading} (at ${DEFAULT_READING_WPM} wpm)`,
      `Speaking time: ${speaking} (at ${DEFAULT_SPEAKING_WPM} wpm)`,
    ].join("\n");

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <Paper
        id="wc-input"
        label="Your text"
        value={text}
        onChange={setText}
        placeholder="Start typing or paste your text here…"
        rows={14}
        sample={SAMPLE_ESSAY}
        corner={`${fmt(stats.words)} words`}
        footer={<span>Counts update as you type. Nothing is sent anywhere.</span>}
      />
      <div className="space-y-4">
        <StatGrid>
          <div className="col-span-2">
            <Stat label="Words" value={fmt(stats.words)} accent />
          </div>
          <Stat label="Characters" value={fmt(stats.characters)} />
          <Stat label="No spaces" value={fmt(stats.charactersNoSpaces)} hint="Characters excl. spaces" />
          <Stat label="Sentences" value={fmt(stats.sentences)} />
          <Stat label="Paragraphs" value={fmt(stats.paragraphs)} />
          <Stat label="Reading time" value={<span className="text-lg">{reading}</span>} hint={`At ${DEFAULT_READING_WPM} wpm`} />
          <Stat label="Speaking time" value={<span className="text-lg">{speaking}</span>} hint={`At ${DEFAULT_SPEAKING_WPM} wpm`} />
        </StatGrid>
        <div className="card p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted">Avg. words per sentence</span>
            <span className="font-mono font-semibold tabular-nums text-ink">{avgSentence}</span>
          </div>
          {frequent.length > 0 && (
            <div className="mt-3 border-t border-line pt-3">
              <p className="text-sm text-muted">Most repeated words</p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {frequent.map((w) => (
                  <li key={w.word} className="rounded bg-surface-2 px-2 py-1 text-xs text-ink-2">
                    {w.word} <span className="font-mono text-muted">×{w.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <CopyButton getText={summary} label="Copy results" variant="primary" disabled={!text} />
        </div>
      </div>
    </div>
  );
}

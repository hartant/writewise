"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { countWords, formatDuration, minutesFor } from "@/lib/text/stats";
import { fmt, Paper } from "./ui";

const PRESETS = [
  { label: "Careful study", wpm: 150 },
  { label: "Read aloud", wpm: 183 },
  { label: "Average adult", wpm: 238 },
  { label: "Fiction", wpm: 260 },
  { label: "Fast reader", wpm: 320 },
  { label: "Skimming", wpm: 450 },
];

const COMPARE_SPEEDS = [130, 183, 238, 300, 450];

export function ReadingTimeCalculator() {
  const [text, setText] = useState("");
  const [manual, setManual] = useState("");
  const [wpm, setWpm] = useState(238);
  const deferred = useDeferredValue(text);
  const textWords = useMemo(() => countWords(deferred), [deferred]);

  const manualWords = Math.max(0, Math.floor(Number(manual) || 0));
  const usingManual = !text.trim() && manualWords > 0;
  const words = usingManual ? manualWords : textWords;
  const minutes = minutesFor(words, wpm);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="space-y-4">
        <Paper
          id="rt-input"
          label="Text to time"
          value={text}
          onChange={setText}
          placeholder="Paste an article, essay, speech or chapter…"
          rows={12}
          footer={<span>{fmt(textWords)} words detected</span>}
        />
        <div className="card flex flex-wrap items-center gap-3 p-4">
          <label htmlFor="rt-manual" className="text-sm text-ink-2">
            No text handy? Enter a word count instead:
          </label>
          <input
            id="rt-manual"
            type="number"
            inputMode="numeric"
            min={0}
            placeholder="e.g. 1000"
            value={manual}
            onChange={(e) => setManual(e.target.value)}
            className="field w-32 !py-1.5 font-mono"
          />
          {text.trim() && manualWords > 0 && <span className="text-xs text-muted">Clear the text box to use this number.</span>}
        </div>
      </div>

      <div className="space-y-4">
        <div className="card overflow-hidden">
          <div className="border-b-2 border-accent p-5">
            <p className="text-sm text-muted">Estimated reading time</p>
            <p className="mt-1 font-mono text-4xl text-accent-text" aria-live="polite">
              {formatDuration(minutes)}
            </p>
            <p className="mt-1 text-sm text-muted">
              {fmt(words)} words at {wpm} words per minute{usingManual ? " (manual count)" : ""}
            </p>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <label htmlFor="rt-speed" className="text-sm font-semibold text-ink">
                Reading speed
              </label>
              <span className="font-mono text-sm font-semibold tabular-nums text-accent-text">{wpm} wpm</span>
            </div>
            <input
              id="rt-speed"
              type="range"
              min={80}
              max={700}
              step={1}
              value={wpm}
              onChange={(e) => setWpm(Number(e.target.value))}
              className="mt-3 w-full accent-[var(--accent)]"
            />
            <div className="mt-3 grid grid-cols-2 gap-1.5" role="group" aria-label="Speed presets">
              {PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  aria-pressed={wpm === p.wpm}
                  onClick={() => setWpm(p.wpm)}
                  className="rounded border border-line px-2 py-1.5 text-left text-xs text-ink-2 transition-colors hover:border-accent aria-pressed:border-accent aria-pressed:bg-accent-soft aria-pressed:text-accent-text"
                >
                  <span className="block font-semibold">{p.label}</span>
                  <span className="font-mono text-muted">{p.wpm} wpm</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="card p-4">
          <p className="text-sm font-bold text-ink">At other speeds</p>
          <table className="mt-2 w-full text-sm">
            <tbody>
              {COMPARE_SPEEDS.map((s) => (
                <tr key={s} className="border-b border-line last:border-0">
                  <td className="py-1.5 font-mono text-muted">{s} wpm</td>
                  <td className="py-1.5 text-right font-medium text-ink">{formatDuration(minutesFor(words, s))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          type="button"
          className="btn btn-secondary w-full"
          onClick={() => {
            setText("");
            setManual("");
            setWpm(238);
          }}
          disabled={!text && !manual && wpm === 238}
        >
          Clear and reset
        </button>
      </div>
    </div>
  );
}

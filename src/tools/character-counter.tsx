"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { countCharacters, countCharactersNoSpaces, countLines, countWords } from "@/lib/text/stats";
import { CopyButton, fmt, Paper, ProgressBar, Stat, StatGrid } from "./ui";

const PRESETS = [50, 100, 160, 280, 500, 1000, 2000];

export function CharacterCounter() {
  const [text, setText] = useState("");
  const [limit, setLimit] = useState(160);
  const [limitInput, setLimitInput] = useState("160");
  const [countSpaces, setCountSpaces] = useState(true);
  const deferred = useDeferredValue(text);

  const stats = useMemo(
    () => ({
      withSpaces: countCharacters(deferred),
      noSpaces: countCharactersNoSpaces(deferred),
      words: countWords(deferred),
      lines: countLines(deferred),
    }),
    [deferred],
  );

  const used = countSpaces ? stats.withSpaces : stats.noSpaces;
  const pct = limit > 0 ? (used / limit) * 100 : 0;
  const remaining = limit - used;
  const tone = pct > 100 ? "bad" : pct >= 90 ? "warn" : "ok";

  function applyLimit(raw: string) {
    setLimitInput(raw);
    const n = Math.floor(Number(raw));
    if (Number.isFinite(n) && n > 0 && n <= 1_000_000) setLimit(n);
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <Paper
        id="cc-input"
        label="Your text"
        value={text}
        onChange={setText}
        placeholder="Type or paste text to count its characters…"
        rows={12}
        footer={
          <span className={remaining < 0 ? "font-semibold text-bad" : ""}>
            {remaining < 0 ? `${fmt(-remaining)} characters over the limit` : `${fmt(remaining)} characters left of ${fmt(limit)}`}
          </span>
        }
      />
      <div className="space-y-4">
        <div className="card p-4">
          <div className="flex items-baseline justify-between">
            <p className="text-sm font-semibold text-ink">Character limit</p>
            <p className={`font-mono text-sm font-semibold tabular-nums ${remaining < 0 ? "text-bad" : "text-ink"}`}>
              {fmt(used)} / {fmt(limit)}
            </p>
          </div>
          <div className="mt-3">
            <ProgressBar value={pct} tone={tone} label="Characters used of limit" />
          </div>
          <p className="mt-2 text-xs text-muted" aria-live="polite">
            {remaining < 0 ? `Over by ${fmt(-remaining)}. Trim a little.` : `${Math.round(pct)}% used, ${fmt(remaining)} remaining.`}
          </p>
          <div className="mt-4 grid grid-cols-[1fr_auto] items-center gap-2">
            <label htmlFor="cc-limit" className="text-sm text-muted">
              Custom limit
            </label>
            <input
              id="cc-limit"
              type="number"
              inputMode="numeric"
              min={1}
              max={1000000}
              value={limitInput}
              onChange={(e) => applyLimit(e.target.value)}
              className="field w-28 !py-1.5 text-right font-mono"
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5" role="group" aria-label="Limit presets">
            {PRESETS.map((p) => (
              <button
                key={p}
                type="button"
                aria-pressed={limit === p}
                onClick={() => applyLimit(String(p))}
                className="rounded border border-line px-2.5 py-1 font-mono text-xs text-ink-2 transition-colors hover:border-accent aria-pressed:border-accent aria-pressed:bg-accent-soft aria-pressed:text-accent-text"
              >
                {fmt(p)}
              </button>
            ))}
          </div>
          <label className="mt-4 flex items-center justify-between gap-3 text-sm text-ink-2">
            Count spaces toward the limit
            <input type="checkbox" className="toggle" checked={countSpaces} onChange={(e) => setCountSpaces(e.target.checked)} />
          </label>
        </div>
        <StatGrid>
          <Stat label="With spaces" value={fmt(stats.withSpaces)} accent={countSpaces} />
          <Stat label="No spaces" value={fmt(stats.noSpaces)} accent={!countSpaces} />
          <Stat label="Words" value={fmt(stats.words)} />
          <Stat label="Lines" value={fmt(stats.lines)} />
        </StatGrid>
        <CopyButton getText={() => text} label="Copy text" disabled={!text} />
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeftRight, GitCompareArrows, RotateCcw } from "lucide-react";
import { diffTexts, type DiffMode, type DiffResult } from "@/lib/text/diff";
import { fmt, Paper, Segmented, Stat, StatGrid } from "./ui";

const SAMPLE_A = `Social media has changed the way students communicate. Most students check their phones many times a day, and this effects their ability to focus in class.`;
const SAMPLE_B = `Social media has transformed the way students communicate. Many students check their phones dozens of times a day, and this affects their ability to concentrate in class.`;

export function TextCompare() {
  const [original, setOriginal] = useState("");
  const [revised, setRevised] = useState("");
  const [mode, setMode] = useState<DiffMode>("words");
  const [result, setResult] = useState<DiffResult | null>(null);
  const [compared, setCompared] = useState<{ a: string; b: string; mode: DiffMode } | null>(null);

  const stale = !!compared && (compared.a !== original || compared.b !== revised || compared.mode !== mode);
  const canCompare = original.length > 0 || revised.length > 0;

  function compare(a = original, b = revised, m = mode) {
    if (!a && !b) return;
    setResult(diffTexts(a, b, m));
    setCompared({ a, b, mode: m });
  }

  function reset() {
    setOriginal("");
    setRevised("");
    setResult(null);
    setCompared(null);
  }

  // Ctrl/Cmd + Enter runs the comparison. A ref keeps one listener with the latest state.
  const compareRef = useRef(compare);
  compareRef.current = compare;
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        compareRef.current();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Paper
          id="tc-original"
          label="Original text"
          value={original}
          onChange={setOriginal}
          placeholder="Paste the earlier version…"
          rows={11}
          sample={SAMPLE_A}
        />
        <Paper
          id="tc-revised"
          label="Revised text"
          value={revised}
          onChange={setRevised}
          placeholder="Paste the newer version…"
          rows={11}
          sample={SAMPLE_B}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button type="button" className="btn btn-primary" onClick={() => compare()} disabled={!canCompare}>
          <GitCompareArrows className="h-4 w-4" aria-hidden="true" />
          Compare texts
        </button>
        <Segmented
          label="Comparison detail"
          value={mode}
          onChange={setMode}
          options={[
            { value: "words", label: "Word by word" },
            { value: "lines", label: "Line by line" },
          ]}
        />
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            setOriginal(revised);
            setRevised(original);
          }}
          disabled={!canCompare}
        >
          <ArrowLeftRight className="h-4 w-4" aria-hidden="true" />
          Swap
        </button>
        <button type="button" className="btn btn-ghost" onClick={reset} disabled={!canCompare && !result}>
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Reset
        </button>
        <span className="hidden text-xs text-muted sm:inline">
          Tip: press <kbd className="rounded border border-line px-1 font-mono">Ctrl</kbd> +{" "}
          <kbd className="rounded border border-line px-1 font-mono">Enter</kbd>
        </span>
      </div>

      {result && (
        <div className="space-y-4" aria-live="polite">
          {stale && (
            <p className="rounded border border-warn/30 bg-warn-soft px-4 py-2.5 text-sm text-warn">
              The texts or settings changed since this comparison. Click “Compare texts” to update it.
            </p>
          )}
          {result.fellBack && (
            <p className="rounded border border-line bg-surface-2 px-4 py-2.5 text-sm text-muted">
              These texts differ in too many places for a word-level view, so they were compared {result.mode === "lines" ? "line by line" : "as whole blocks"}.
            </p>
          )}
          <StatGrid className="sm:grid-cols-4">
            <Stat label="Words added" value={<span className="text-ok">+{fmt(result.stats.wordsAdded)}</span>} hint={`${result.stats.additions} insertions`} />
            <Stat label="Words removed" value={<span className="text-bad">−{fmt(result.stats.wordsRemoved)}</span>} hint={`${result.stats.deletions} deletions`} />
            <Stat label="Unchanged" value={fmt(result.stats.wordsUnchanged)} hint="words" />
            <Stat label="Similarity" value={`${result.stats.similarity}%`} accent />
          </StatGrid>
          <div className="card overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-surface-2/60 px-4 py-2.5">
              <h2 className="text-sm font-semibold text-ink">Differences</h2>
              <div className="flex items-center gap-3 text-xs">
                <span className="diff-ins px-1.5 py-0.5">added</span>
                <span className="diff-del px-1.5 py-0.5">removed</span>
              </div>
            </div>
            {result.stats.identical ? (
              <p className="px-5 py-6 text-sm text-ok">The two texts are identical{mode === "words" ? " (ignoring differences in spacing)" : ""}.</p>
            ) : (
              <div className="max-h-[32rem] overflow-auto whitespace-pre-wrap break-words px-5 py-4 text-[1.0125rem] leading-8 text-ink-2">
                {result.segments.map((s, i) =>
                  s.type === "equal" ? (
                    <span key={i}>{s.value}</span>
                  ) : s.type === "insert" ? (
                    <ins key={i} className="diff-ins">
                      {s.value}
                    </ins>
                  ) : (
                    <del key={i} className="diff-del">
                      {s.value}
                    </del>
                  ),
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

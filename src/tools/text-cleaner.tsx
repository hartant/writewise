"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { cleanText, CLEANER_DEFAULTS, type CleanerOptions, type CleanerRule } from "@/lib/text/cleaner";
import { countCharacters } from "@/lib/text/stats";
import { CopyButton, DownloadButton, fmt, Paper, Toggle } from "./ui";

const SAMPLE =
  "Climate  policy   in the UK has changed signif-\nicantly since 2008, when the Climate\nChange Act set a legally binding\ntarget.​\n\n\n\n  Critics argue that progress has been   uneven \nacross sectors.\t\n";

type RuleInfo = { key: CleanerRule; label: string; hint: string; structural?: boolean };

const SPACING: RuleInfo[] = [
  { key: "collapseSpaces", label: "Collapse repeated spaces", hint: "“two  spaces” becomes “two spaces”" },
  { key: "trimLines", label: "Trim line ends", hint: "Remove spaces at the start and end of each line" },
  { key: "normalizeTabs", label: "Replace tabs with spaces", hint: "Each tab becomes one space" },
  { key: "convertNbsp", label: "Convert non-breaking spaces", hint: "Common in text copied from web pages and Word" },
  { key: "removeInvisible", label: "Remove invisible characters", hint: "Zero-width spaces, byte-order marks, soft hyphens. Emoji joiners are kept." },
];
const LINES: RuleInfo[] = [
  { key: "collapseBlankLines", label: "Collapse extra blank lines", hint: "Keep at most one blank line between paragraphs" },
  { key: "removeBlankLines", label: "Remove all blank lines", hint: "Paragraphs will no longer be separated", structural: true },
  { key: "joinWrappedLines", label: "Join hard-wrapped lines", hint: "Turn lines broken mid-sentence (e.g. from a PDF) back into paragraphs", structural: true },
  { key: "fixLineEndHyphens", label: "Rejoin words split by a hyphen", hint: "“signif-” + “icantly” becomes “significantly”. Can also join real compounds like “well-” + “known”.", structural: true },
  { key: "removeDuplicateLines", label: "Remove duplicate lines", hint: "Keep the first copy of each identical line", structural: true },
];

const LABELS: Record<CleanerRule, string> = Object.fromEntries([...SPACING, ...LINES].map((r) => [r.key, r.label])) as Record<CleanerRule, string>;

export function TextCleaner() {
  const [text, setText] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [opts, setOpts] = useState<CleanerOptions>(CLEANER_DEFAULTS);
  const deferred = useDeferredValue(text);
  const result = useMemo(() => cleanText(deferred, opts), [deferred, opts]);
  const changed = Object.entries(result.changes).filter(([, n]) => n && n > 0) as [CleanerRule, number][];

  const set = (k: CleanerRule, v: boolean) =>
    setOpts((s) => ({
      ...s,
      [k]: v,
      // Hyphen repair only applies while joining lines.
      ...(k === "joinWrappedLines" && !v ? { fixLineEndHyphens: false } : {}),
      ...(k === "fixLineEndHyphens" && v ? { joinWrappedLines: true } : {}),
    }));

  function apply() {
    setHistory((h) => [...h.slice(-19), text]);
    setText(result.output);
  }

  const rule = (r: RuleInfo) => (
    <Toggle
      key={r.key}
      label={r.structural ? `${r.label} ⚠` : r.label}
      hint={r.hint}
      checked={opts[r.key]}
      onChange={(v) => set(r.key, v)}
    />
  );

  return (
    <div className="space-y-6">
      <div className="card grid gap-x-10 gap-y-2 p-4 sm:p-5 md:grid-cols-2">
        <fieldset>
          <legend className="font-display text-base font-semibold text-ink">Spaces and characters</legend>
          <div className="mt-1">{SPACING.map(rule)}</div>
        </fieldset>
        <fieldset>
          <legend className="font-display text-base font-semibold text-ink">Lines and paragraphs</legend>
          <div className="mt-1">{LINES.map(rule)}</div>
          <p className="mt-2 text-sm text-muted">⚠ changes the structure of your text. Check the preview before you use the result.</p>
        </fieldset>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Paper
          id="tc-input"
          label="Original text"
          value={text}
          onChange={(v) => {
            setText(v);
            if (!v) setHistory([]);
          }}
          placeholder="Paste text copied from a PDF, email, web page or spreadsheet…"
          rows={14}
          sample={SAMPLE}
          corner={`${fmt(countCharacters(deferred))} chars`}
          footer={<span>Your original stays here until you choose “Replace original with result”.</span>}
        />
        <Paper
          id="tc-output"
          label="Preview of cleaned text"
          value={result.output}
          readOnly
          rows={14}
          placeholder="The cleaned version appears here."
          corner={`${fmt(countCharacters(result.output))} chars`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <CopyButton getText={() => result.output} label="Copy cleaned text" variant="primary" disabled={!result.output} />
        <DownloadButton filename="cleaned-text.txt" getText={() => result.output} disabled={!result.output} />
        <button type="button" className="btn btn-secondary" onClick={apply} disabled={!text || result.output === text}>
          Replace original with result
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => {
            setText(history[history.length - 1] ?? "");
            setHistory((h) => h.slice(0, -1));
          }}
          disabled={history.length === 0}
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Undo replace
        </button>
      </div>

      <div className="card p-4 sm:p-5" aria-live="polite">
        <h2 className="font-display text-lg font-semibold text-ink">Changes in the preview</h2>
        {!text ? (
          <p className="mt-2 text-[0.95rem] text-muted">Paste some text to see what each rule would change.</p>
        ) : changed.length === 0 ? (
          <p className="mt-2 text-[0.95rem] text-muted">Nothing to clean with the rules you selected.</p>
        ) : (
          <ul className="mt-2 divide-y divide-line">
            {changed.map(([k, n]) => (
              <li key={k} className="flex justify-between gap-4 py-1.5 text-[0.95rem]">
                <span className="text-ink-2">{LABELS[k]}</span>
                <span className="font-mono text-accent-text">{fmt(n)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

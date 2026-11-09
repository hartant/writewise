"use client";

import { useEffect, useRef, useState } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { findReplace, type FindReplaceOptions, type FindReplaceResult } from "@/lib/text/find-replace";
import { CopyButton, DownloadButton, fmt, Paper, Segmented, Toggle } from "./ui";

const SAMPLE = `Dear Hiring Manager,

I am excited to apply for the Marketing Coordinator role at Northwind. At Northwind, I would bring three years of campaign experience.

Contact me on 07700 900123 or by email.`;

const TIMEOUT_MS = 2000;
const PREVIEW_CHARS = 60000;

type Status = { state: "idle" } | { state: "working" } | { state: "done"; result: FindReplaceResult } | { state: "timeout" };

/**
 * Matching runs in a Web Worker so that a pathological regular expression can be
 * stopped after TIMEOUT_MS instead of freezing the page. The worker is built from
 * the same findReplace function used everywhere else.
 */
function createWorker(): Worker | null {
  if (typeof Worker === "undefined") return null;
  const src = `const findReplace = (${findReplace.toString()});
self.onmessage = (e) => {
  const { id, text, opts } = e.data;
  let result;
  try { result = findReplace(text, opts); } catch (err) { result = { ok: false, error: String((err && err.message) || err) }; }
  self.postMessage({ id, result });
};`;
  try {
    return new Worker(URL.createObjectURL(new Blob([src], { type: "text/javascript" })));
  } catch {
    return null;
  }
}

export function FindAndReplace() {
  const [text, setText] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [opts, setOpts] = useState<FindReplaceOptions>({ find: "", replace: "", caseSensitive: false, wholeWord: false, regex: false, all: true });
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const worker = useRef<Worker | null>(null);
  const jobId = useRef(0);

  useEffect(() => () => worker.current?.terminate(), []);

  useEffect(() => {
    if (!opts.find || !text) {
      setStatus({ state: "idle" });
      return;
    }
    const id = ++jobId.current;
    const debounce = setTimeout(() => {
      if (!worker.current) worker.current = createWorker();
      const w = worker.current;
      if (!w) {
        // No Worker support: plain searches are safe to run directly; regex is not.
        setStatus(opts.regex ? { state: "done", result: { ok: false, error: "Regular expressions need Web Worker support in your browser." } } : { state: "done", result: findReplace(text, opts) });
        return;
      }
      setStatus({ state: "working" });
      const timer = setTimeout(() => {
        if (jobId.current !== id) return;
        w.terminate();
        worker.current = null;
        setStatus({ state: "timeout" });
      }, TIMEOUT_MS);
      w.onmessage = (e: MessageEvent<{ id: number; result: FindReplaceResult }>) => {
        if (e.data.id !== jobId.current) return;
        clearTimeout(timer);
        setStatus({ state: "done", result: e.data.result });
      };
      w.postMessage({ id, text, opts });
    }, 150);
    return () => clearTimeout(debounce);
  }, [text, opts]);

  const set = <K extends keyof FindReplaceOptions>(k: K, v: FindReplaceOptions[K]) => setOpts((s) => ({ ...s, [k]: v }));
  const result = status.state === "done" && status.result.ok ? status.result : null;
  const output = result ? result.output : text;

  function apply() {
    if (!result || result.count === 0) return;
    setHistory((h) => [...h.slice(-19), text]);
    setText(result.output);
  }

  return (
    <div className="space-y-6">
      <div className="card space-y-4 p-4 sm:p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="fr-find" className="text-[0.95rem] font-bold text-ink">
              Find
            </label>
            <input
              id="fr-find"
              className="field mt-1 font-mono"
              value={opts.find}
              onChange={(e) => set("find", e.target.value)}
              placeholder={opts.regex ? "e.g. \\b(\\d{5}) (\\d{6})\\b" : "Text to find"}
              spellCheck={false}
              autoComplete="off"
              aria-describedby="fr-status"
            />
          </div>
          <div>
            <label htmlFor="fr-replace" className="text-[0.95rem] font-bold text-ink">
              Replace with
            </label>
            <input
              id="fr-replace"
              className="field mt-1 font-mono"
              value={opts.replace}
              onChange={(e) => set("replace", e.target.value)}
              placeholder={opts.regex ? "Use $1, $2 for groups" : "Leave empty to delete matches"}
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
          <Segmented
            label="How many to replace"
            value={opts.all ? "all" : "first"}
            onChange={(v) => set("all", v === "all")}
            options={[
              { value: "all", label: "Replace all" },
              { value: "first", label: "First match only" },
            ]}
          />
        </div>
        <div className="grid gap-x-8 sm:grid-cols-3">
          <Toggle label="Case-sensitive" hint="“Cat” won’t match “cat”" checked={opts.caseSensitive} onChange={(v) => set("caseSensitive", v)} />
          <Toggle label="Whole words only" hint="“cat” won’t match “catalog”" checked={opts.wholeWord} onChange={(v) => set("wholeWord", v)} />
          <Toggle label="Regular expression" hint="For patterns. Off means plain text." checked={opts.regex} onChange={(v) => set("regex", v)} />
        </div>
        <div id="fr-status" aria-live="polite" className="min-h-6 border-t border-line pt-3 text-[0.95rem]">
          {status.state === "idle" && <span className="text-muted">{text ? "Type something to find." : "Paste your text below, then type what to find."}</span>}
          {status.state === "working" && <span className="text-muted">Searching…</span>}
          {status.state === "timeout" && (
            <span className="flex items-start gap-2 text-bad">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              This pattern took longer than {TIMEOUT_MS / 1000} seconds and was stopped. Patterns with nested repeats, like (a+)+, can take
              practically forever on some text. Try a simpler pattern.
            </span>
          )}
          {status.state === "done" && !status.result.ok && (
            <span className="flex items-start gap-2 text-bad">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              That isn&apos;t a valid regular expression: {status.result.error}
            </span>
          )}
          {result && (
            <span className={result.count ? "text-ink" : "text-muted"}>
              {result.count === 0
                ? "No matches."
                : opts.all
                  ? `${fmt(result.count)}${result.capped ? "+" : ""} ${result.count === 1 ? "match" : "matches"} will be replaced.`
                  : "The first match will be replaced."}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Paper
          id="fr-input"
          label="Your text"
          value={text}
          onChange={(v) => {
            setText(v);
            if (!v) setHistory([]);
          }}
          rows={12}
          sample={SAMPLE}
          placeholder="Paste the text you want to edit…"
          footer={<span>Your text changes only when you click “Apply to my text”.</span>}
        />
        <Paper id="fr-output" label="Result preview" value={output} readOnly rows={12} placeholder="The result appears here." />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button type="button" className="btn btn-primary" onClick={apply} disabled={!result || result.count === 0}>
          Apply to my text
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
          Undo
        </button>
        <CopyButton getText={() => output} label="Copy result" disabled={!output} />
        <DownloadButton filename="edited-text.txt" getText={() => output} disabled={!output} />
        <button type="button" className="btn btn-ghost" onClick={() => setOpts((s) => ({ ...s, find: "", replace: "" }))} disabled={!opts.find && !opts.replace}>
          Clear find and replace
        </button>
      </div>

      {result && result.count > 0 && (
        <div className="card p-4 sm:p-5">
          <h2 className="font-display text-lg font-semibold text-ink">Matches in your text</h2>
          <div className="mt-3 max-h-80 overflow-auto whitespace-pre-wrap break-words font-mono text-[0.95rem] leading-7 text-ink-2">
            <Highlighted text={text.slice(0, PREVIEW_CHARS)} ranges={result.ranges} />
          </div>
          {(text.length > PREVIEW_CHARS || result.count > result.ranges.length) && (
            <p className="mt-2 text-sm text-muted">The highlight preview is shortened for long texts. The result above includes every match.</p>
          )}
        </div>
      )}
    </div>
  );
}

function Highlighted({ text, ranges }: { text: string; ranges: [number, number][] }) {
  const parts: React.ReactNode[] = [];
  let pos = 0;
  ranges.forEach(([start, end], i) => {
    if (start >= text.length) return;
    if (start > pos) parts.push(text.slice(pos, start));
    parts.push(
      <mark key={i} className="diff-ins">
        {end > start ? text.slice(start, Math.min(end, text.length)) : "‸"}
      </mark>,
    );
    pos = Math.max(pos, end);
  });
  parts.push(text.slice(pos));
  return <>{parts}</>;
}

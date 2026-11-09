"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { Info } from "lucide-react";
import { describeDedupe, processLines, type DedupeMode, type DedupeOptions } from "@/lib/text/dedupe";
import { CopyButton, DownloadButton, fmt, Paper, Segmented, Stat, StatGrid, Toggle } from "./ui";

const SAMPLE = `alex@example.com
jordan@example.com
Alex@example.com
sam@example.com

jordan@example.com
  taylor@example.com
sam@example.com
jordan@example.com`;

const MODES: { value: DedupeMode; label: string; title: string }[] = [
  { value: "keep-first", label: "Keep first copy", title: "Remove later repeats" },
  { value: "keep-last", label: "Keep last copy", title: "Remove earlier repeats" },
  { value: "duplicates-only", label: "Duplicates only", title: "List lines that repeat" },
  { value: "unique-only", label: "Unique only", title: "List lines that appear once" },
];

const MAX_FREQ_ROWS = 100;

export function RemoveDuplicateLines() {
  const [text, setText] = useState("");
  const [opts, setOpts] = useState<Required<DedupeOptions>>({
    mode: "keep-first",
    ignoreCase: false,
    trimWhitespace: true,
    removeEmpty: false,
    sort: false,
  });
  const deferred = useDeferredValue(text);
  const result = useMemo(() => processLines(deferred, opts), [deferred, opts]);
  const set = <K extends keyof DedupeOptions>(k: K, v: DedupeOptions[K]) => setOpts((s) => ({ ...s, [k]: v }));

  return (
    <div className="space-y-6">
      <div className="card space-y-4 p-4 sm:p-5">
        <Segmented label="What to keep" options={MODES} value={opts.mode} onChange={(v) => set("mode", v)} />
        <div className="grid gap-x-8 sm:grid-cols-2">
          <Toggle label="Case-sensitive" hint="When on, “Apple” and “apple” are different lines" checked={!opts.ignoreCase} onChange={(v) => set("ignoreCase", !v)} />
          <Toggle label="Ignore extra spaces" hint="Trim spaces at the start and end of each line" checked={opts.trimWhitespace} onChange={(v) => set("trimWhitespace", v)} />
          <Toggle label="Remove blank lines" hint="Otherwise blank lines stay where they are" checked={opts.removeEmpty} onChange={(v) => set("removeEmpty", v)} />
          <Toggle label="Sort A–Z" hint="Off by default: the original order is kept" checked={opts.sort} onChange={(v) => set("sort", v)} />
        </div>
        <p className="flex gap-2 border-t border-line pt-3 text-[0.95rem] leading-6 text-ink-2" aria-live="polite">
          <Info className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
          <span>
            <strong className="text-ink">What will happen:</strong> {describeDedupe(opts)}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Paper
          id="dl-input"
          label="Your list"
          value={text}
          onChange={setText}
          placeholder={"Paste one item per line…\napple\nbanana\napple"}
          rows={14}
          sample={SAMPLE}
          corner={`${fmt(result.originalLines)} lines`}
          footer={<span>Your list is never changed. The result appears on the right.</span>}
        />
        <Paper
          id="dl-output"
          label="Result"
          value={result.output}
          readOnly
          rows={14}
          placeholder={text ? "No lines match these rules." : "The result appears here as you paste."}
          corner={`${fmt(result.finalLines)} lines`}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <CopyButton getText={() => result.output} label="Copy result" variant="primary" disabled={!result.output} />
        <DownloadButton filename="cleaned-list.txt" getText={() => result.output} disabled={!result.output} />
        <button type="button" className="btn btn-ghost" onClick={() => setText(result.output)} disabled={!result.output || result.output === text}>
          Use result as new list
        </button>
      </div>

      <StatGrid className="sm:grid-cols-4">
        <Stat label="Lines in" value={fmt(result.originalLines)} />
        <Stat label="Lines out" value={fmt(result.finalLines)} accent />
        <Stat label="Different values" value={fmt(result.uniqueValues)} />
        <Stat
          label={opts.mode === "keep-first" || opts.mode === "keep-last" ? "Repeats removed" : "Values that repeat"}
          value={fmt(opts.mode === "keep-first" || opts.mode === "keep-last" ? result.duplicatesRemoved : result.repeatedValues)}
          hint={result.emptyRemoved ? `${fmt(result.emptyRemoved)} blank lines removed` : undefined}
        />
      </StatGrid>

      {result.frequencies.length > 0 && (
        <div className="card p-4 sm:p-5">
          <h2 className="font-display text-lg font-semibold text-ink">How often each repeated line appears</h2>
          <table className="mt-3 w-full text-left text-[0.95rem]">
            <thead>
              <tr className="border-b border-ink text-sm text-muted">
                <th scope="col" className="py-1.5 pr-4 font-normal">
                  Line
                </th>
                <th scope="col" className="py-1.5 text-right font-normal">
                  Times
                </th>
              </tr>
            </thead>
            <tbody>
              {result.frequencies.slice(0, MAX_FREQ_ROWS).map((f) => (
                <tr key={f.line} className="border-b border-line">
                  <td className="max-w-0 truncate py-1.5 pr-4 font-mono text-ink">{f.line}</td>
                  <td className="py-1.5 text-right font-mono text-accent-text">×{fmt(f.count)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {result.frequencies.length > MAX_FREQ_ROWS && (
            <p className="mt-2 text-sm text-muted">
              Showing the {MAX_FREQ_ROWS} most repeated of {fmt(result.frequencies.length)} values.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

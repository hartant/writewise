"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { removeDuplicateLines, type DedupeOptions } from "@/lib/text/dedupe";
import { CopyButton, fmt, Paper, Stat, StatGrid } from "./ui";

const SAMPLE = `alex@example.com
jordan@example.com
Alex@example.com
sam@example.com

jordan@example.com
  taylor@example.com
sam@example.com`;

export function RemoveDuplicateLines() {
  const [text, setText] = useState("");
  const [opts, setOpts] = useState<DedupeOptions>({ ignoreCase: false, trimWhitespace: true, removeEmpty: false });
  const deferred = useDeferredValue(text);
  const result = useMemo(() => removeDuplicateLines(deferred, opts), [deferred, opts]);

  const options: { key: keyof DedupeOptions; label: string; hint: string }[] = [
    { key: "ignoreCase", label: "Ignore case", hint: "“Apple” and “apple” count as duplicates" },
    { key: "trimWhitespace", label: "Ignore extra spaces", hint: "Trim spaces at the start and end of lines" },
    { key: "removeEmpty", label: "Remove empty lines", hint: "Delete blank lines from the output" },
  ];

  return (
    <div className="space-y-6">
      <div className="card grid gap-4 p-4 sm:grid-cols-3">
        {options.map((o) => (
          <label key={o.key} className="flex items-start justify-between gap-3">
            <span>
              <span className="block text-sm font-semibold text-ink">{o.label}</span>
              <span className="block text-xs text-muted">{o.hint}</span>
            </span>
            <input
              type="checkbox"
              className="toggle mt-0.5"
              checked={opts[o.key]}
              onChange={(e) => setOpts((s) => ({ ...s, [o.key]: e.target.checked }))}
            />
          </label>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Paper
          id="dl-input"
          label="Original lines"
          value={text}
          onChange={setText}
          placeholder={"Paste one item per line…\napple\nbanana\napple"}
          rows={14}
          sample={SAMPLE}
          footer={<span>{fmt(result.originalLines)} lines</span>}
        />
        <Paper
          id="dl-output"
          label="Cleaned output"
          value={result.output}
          readOnly
          rows={14}
          placeholder="Unique lines appear here, in their original order."
          actions={<CopyButton getText={() => result.output} label="Copy output" disabled={!result.output} />}
          footer={<span>{fmt(result.finalLines)} lines</span>}
        />
      </div>

      <StatGrid className="sm:grid-cols-4">
        <Stat label="Original lines" value={fmt(result.originalLines)} />
        <Stat label="Final lines" value={fmt(result.finalLines)} accent />
        <Stat label="Duplicates removed" value={fmt(result.duplicatesRemoved)} />
        <Stat label="Empty lines removed" value={fmt(result.emptyRemoved)} />
      </StatGrid>

      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn btn-secondary" onClick={() => setText(result.output)} disabled={!result.output || result.output === text}>
          Replace original with output
        </button>
      </div>
    </div>
  );
}

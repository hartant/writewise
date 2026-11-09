"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { sortLines, type SortMode } from "@/lib/text/sort";
import { countLines } from "@/lib/text/stats";
import { CopyButton, DownloadButton, fmt, Paper, Segmented, Toggle } from "./ui";

const SAMPLE = `Chapter 10: Results
chapter 2: Methods
Chapter 1: Introduction
appendix B
Appendix A
Chapter 3: Literature review`;

const MODES: { value: SortMode; label: string; title: string }[] = [
  { value: "natural-asc", label: "A–Z (natural)", title: "item2 comes before item10" },
  { value: "natural-desc", label: "Z–A (natural)", title: "item10 comes before item2" },
  { value: "az", label: "A–Z (strict)", title: "Character by character: item10 before item2" },
  { value: "za", label: "Z–A (strict)", title: "Character by character, reversed" },
  { value: "length-asc", label: "Shortest first", title: "By number of characters" },
  { value: "length-desc", label: "Longest first", title: "By number of characters" },
  { value: "reverse", label: "Reverse order", title: "Flip the list upside down without sorting" },
];

export function SortLines() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<SortMode>("natural-asc");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [removeBlank, setRemoveBlank] = useState(true);
  const deferred = useDeferredValue(text);
  const output = useMemo(() => sortLines(deferred, { mode, caseSensitive, removeBlank }).join("\n"), [deferred, mode, caseSensitive, removeBlank]);

  return (
    <div className="space-y-6">
      <div className="card space-y-3 p-4 sm:p-5">
        <Segmented label="Sort order" options={MODES} value={mode} onChange={setMode} />
        <div className="grid gap-x-8 sm:grid-cols-2">
          <Toggle
            label="Case-sensitive"
            hint={caseSensitive ? "Uppercase sorts before lowercase: “Apple” then “apple”" : "“apple” and “Apple” sort together"}
            checked={caseSensitive}
            onChange={setCaseSensitive}
          />
          <Toggle label="Remove blank lines" hint="Otherwise blank lines are moved to the end" checked={removeBlank} onChange={setRemoveBlank} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Paper
          id="sl-input"
          label="Your list"
          value={text}
          onChange={setText}
          placeholder={"Paste one item per line…"}
          rows={14}
          sample={SAMPLE}
          corner={`${fmt(countLines(deferred))} lines`}
          footer={<span>Your original list is kept as it is.</span>}
        />
        <Paper id="sl-output" label="Sorted list" value={output} readOnly rows={14} placeholder="The sorted list appears here." corner={`${fmt(countLines(output))} lines`} />
      </div>
      <div className="flex flex-wrap gap-2">
        <CopyButton getText={() => output} label="Copy sorted list" variant="primary" disabled={!output} />
        <DownloadButton filename="sorted-list.txt" getText={() => output} disabled={!output} />
      </div>
    </div>
  );
}

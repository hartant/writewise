"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { frequencyCsv, wordFrequency } from "@/lib/text/frequency";
import { CopyButton, DownloadButton, fmt, Paper, SAMPLE_ESSAY, Segmented, Stat, StatGrid, Toggle } from "./ui";

type SortBy = "count" | "alpha";
const MAX_ROWS = 300;

export function WordFrequencyCounter() {
  const [text, setText] = useState("");
  const [caseInsensitive, setCaseInsensitive] = useState(true);
  const [ignoreStopWords, setIgnoreStopWords] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [sortBy, setSortBy] = useState<SortBy>("count");
  const deferred = useDeferredValue(text);
  const result = useMemo(
    () => wordFrequency(deferred, { caseInsensitive, ignoreStopWords, includeNumbers }),
    [deferred, caseInsensitive, ignoreStopWords, includeNumbers],
  );
  const rows = useMemo(
    () => (sortBy === "count" ? result.rows : [...result.rows].sort((a, b) => a.word.localeCompare(b.word, "en"))),
    [result.rows, sortBy],
  );
  const tsv = () => ["Word\tCount\tPercent", ...rows.map((r) => `${r.word}\t${r.count}\t${r.percent.toFixed(2)}%`)].join("\n");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <Paper id="wf-input" label="Your text" value={text} onChange={setText} rows={12} sample={SAMPLE_ESSAY} placeholder="Paste an essay, article or transcript…" />
        <div className="space-y-4">
          <StatGrid>
            <Stat label="Words counted" value={fmt(result.totalWords)} accent />
            <Stat label="Different words" value={fmt(result.uniqueWords)} />
          </StatGrid>
          <div className="card p-4">
            <Toggle label="Ignore capitalization" hint="“The” and “the” count as one word" checked={caseInsensitive} onChange={setCaseInsensitive} />
            <Toggle label="Hide common words" hint="Leave out words like “the”, “and”, “of” from the table" checked={ignoreStopWords} onChange={setIgnoreStopWords} />
            <Toggle label="Include numbers" hint="Count values such as 2026 or 3" checked={includeNumbers} onChange={setIncludeNumbers} />
          </div>
        </div>
      </div>

      <div className="card p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-lg font-semibold text-ink">Frequency table</h2>
          <Segmented
            label="Sort table by"
            value={sortBy}
            onChange={setSortBy}
            options={[
              { value: "count", label: "Most frequent" },
              { value: "alpha", label: "A–Z" },
            ]}
          />
        </div>
        {rows.length === 0 ? (
          <p className="mt-4 text-[0.95rem] text-muted">{text ? "No words to show with these settings." : "Paste some text to build the table."}</p>
        ) : (
          <>
            <div className="mt-3 max-h-[28rem] overflow-auto">
              <table className="w-full text-left text-[0.95rem]">
                <thead className="sticky top-0 bg-surface">
                  <tr className="border-b border-ink text-sm text-muted">
                    <th scope="col" className="py-1.5 pr-4 font-normal">
                      Word
                    </th>
                    <th scope="col" className="py-1.5 pr-4 text-right font-normal">
                      Count
                    </th>
                    <th scope="col" className="py-1.5 text-right font-normal">
                      % of words
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.slice(0, MAX_ROWS).map((r) => (
                    <tr key={r.word} className="border-b border-line">
                      <td className="py-1.5 pr-4 font-mono text-ink">{r.word}</td>
                      <td className="py-1.5 pr-4 text-right font-mono text-accent-text">{fmt(r.count)}</td>
                      <td className="py-1.5 text-right font-mono text-ink-2">{r.percent.toFixed(2)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {rows.length > MAX_ROWS && (
              <p className="mt-2 text-sm text-muted">
                Showing {MAX_ROWS} of {fmt(rows.length)} words. The CSV download includes all of them.
              </p>
            )}
          </>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          <DownloadButton filename="word-frequency.csv" mime="text/csv" label="Download CSV" getText={() => frequencyCsv(rows)} disabled={!rows.length} />
          <CopyButton getText={tsv} label="Copy table" disabled={!rows.length} />
        </div>
      </div>
    </div>
  );
}

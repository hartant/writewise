export type FrequencyOptions = {
  /** Count "The" and "the" as the same word (shown in lowercase). */
  caseInsensitive: boolean;
  /** Leave out very common function words such as "the", "and" and "of". */
  ignoreStopWords: boolean;
  /** Include numbers such as 2026 or 3. */
  includeNumbers: boolean;
};

export type FrequencyRow = { word: string; count: number; percent: number };
export type FrequencyResult = { totalWords: number; uniqueWords: number; rows: FrequencyRow[] };

export const STOP_WORDS = new Set(
  (
    "a about above after again against all am an and any are as at be because been before being below between both " +
    "but by can can't could did do does doing don't down during each few for from further had has have having he her " +
    "here hers herself him himself his how i if in into is isn't it it's its itself just let's me more most my myself " +
    "no nor not of off on once only or other ought our ours ourselves out over own same she should so some such than " +
    "that that's the their theirs them themselves then there there's these they they're this those through to too " +
    "under until up very was wasn't we we're were what when where which while who whom why will with won't would you " +
    "you're your yours yourself yourselves"
  ).split(" "),
);

/**
 * Words are runs of letters and digits. Apostrophes and hyphens inside a word keep it
 * together ("don't", "well-known"), as do separators inside numbers ("1,200", "3.5");
 * other punctuation separates words, so "e.g." is
 * counted as "e" and "g". Curly apostrophes are treated as straight ones.
 */
const WORD = /[\p{L}\p{N}]+(?:(?:['’-]|(?<=\p{N})[.,](?=\p{N}))[\p{L}\p{N}]+)*/gu;

export function wordFrequency(text: string, opts: FrequencyOptions): FrequencyResult {
  const counts = new Map<string, number>();
  let total = 0;
  for (const m of text.matchAll(WORD)) {
    let word = m[0].replace(/’/g, "'");
    if (!opts.includeNumbers && /^[\p{N}.,]+$/u.test(word)) continue;
    total++;
    if (opts.caseInsensitive) word = word.toLowerCase();
    if (opts.ignoreStopWords && STOP_WORDS.has(word.toLowerCase())) continue;
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }
  const rows = [...counts.entries()]
    .map(([word, count]) => ({ word, count, percent: total ? (count / total) * 100 : 0 }))
    .sort((a, b) => b.count - a.count || a.word.localeCompare(b.word));
  return { totalWords: total, uniqueWords: counts.size, rows };
}

/** RFC 4180 CSV with a header row. */
export function frequencyCsv(rows: FrequencyRow[]): string {
  const esc = (s: string) => (/[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s);
  return ["word,count,percent", ...rows.map((r) => `${esc(r.word)},${r.count},${r.percent.toFixed(2)}`)].join("\r\n");
}

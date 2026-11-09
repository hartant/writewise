/**
 * Line deduplication. Lines are compared as whole values; blank lines are never
 * treated as values, so they are either kept where they are or removed.
 * Output order always follows the input unless sorting is explicitly requested.
 */

export type DedupeMode = "keep-first" | "keep-last" | "duplicates-only" | "unique-only";

export type DedupeOptions = {
  /** Treat "Apple" and "apple" as the same line. */
  ignoreCase: boolean;
  /** Ignore leading and trailing spaces when comparing, and trim them in the output. */
  trimWhitespace: boolean;
  /** Drop blank lines entirely. When false, blank lines stay in place (keep modes only). */
  removeEmpty: boolean;
  /** Which lines to output. Defaults to "keep-first". */
  mode?: DedupeMode;
  /** Sort the output A–Z (natural order: item2 before item10). Off by default. */
  sort?: boolean;
};

export type LineFrequency = { line: string; count: number };

export type DedupeResult = {
  output: string;
  originalLines: number;
  finalLines: number;
  /** Distinct non-blank values in the input. */
  uniqueValues: number;
  /** Extra copies removed (for keep modes). */
  duplicatesRemoved: number;
  /** Distinct values that appear more than once. */
  repeatedValues: number;
  emptyRemoved: number;
  /** Values that appear more than once, most frequent first. */
  frequencies: LineFrequency[];
};

type Entry = { display: string; count: number; first: number; last: number };

export function processLines(text: string, opts: DedupeOptions): DedupeResult {
  const mode = opts.mode ?? "keep-first";
  const empty: DedupeResult = {
    output: "",
    originalLines: 0,
    finalLines: 0,
    uniqueValues: 0,
    duplicatesRemoved: 0,
    repeatedValues: 0,
    emptyRemoved: 0,
    frequencies: [],
  };
  if (!text) return empty;

  const lines = text.split(/\r\n|\r|\n/);
  // A single trailing newline does not start a new line.
  if (lines.length > 1 && lines[lines.length - 1] === "") lines.pop();

  const values = lines.map((line) => (opts.trimWhitespace ? line.trim() : line));
  const keys = values.map((v) => (v.trim() === "" ? null : opts.ignoreCase ? v.toLowerCase() : v));

  const entries = new Map<string, Entry>();
  keys.forEach((key, i) => {
    if (key === null) return;
    const e = entries.get(key);
    if (e) {
      e.count++;
      e.last = i;
    } else entries.set(key, { display: values[i], count: 1, first: i, last: i });
  });

  const blanks = keys.filter((k) => k === null).length;
  const out: string[] = [];
  let emptyRemoved = 0;

  keys.forEach((key, i) => {
    if (key === null) {
      // Blank lines keep their position in keep modes unless removal is requested.
      if (opts.removeEmpty || mode === "duplicates-only" || mode === "unique-only" || opts.sort) emptyRemoved++;
      else out.push(values[i]);
      return;
    }
    const e = entries.get(key)!;
    switch (mode) {
      case "keep-first":
        if (e.first === i) out.push(values[i]);
        break;
      case "keep-last":
        if (e.last === i) out.push(values[i]);
        break;
      case "duplicates-only":
        if (e.count > 1 && e.first === i) out.push(values[i]);
        break;
      case "unique-only":
        if (e.count === 1) out.push(values[i]);
        break;
    }
  });

  if (opts.sort) {
    const collator = new Intl.Collator("en", { numeric: true, sensitivity: opts.ignoreCase ? "accent" : "variant", caseFirst: "upper" });
    out.sort(collator.compare);
  }

  const repeated = [...entries.values()].filter((e) => e.count > 1);
  const nonBlank = lines.length - blanks;

  return {
    output: out.join("\n"),
    originalLines: lines.length,
    finalLines: out.length,
    uniqueValues: entries.size,
    duplicatesRemoved: mode === "keep-first" || mode === "keep-last" ? nonBlank - entries.size : 0,
    repeatedValues: repeated.length,
    emptyRemoved,
    frequencies: repeated
      .sort((a, b) => b.count - a.count || a.first - b.first)
      .map((e) => ({ line: e.display, count: e.count })),
  };
}

/** Plain-English summary of what processLines will do with these options. */
export function describeDedupe(opts: DedupeOptions): string {
  const mode = opts.mode ?? "keep-first";
  const what = {
    "keep-first": "Keep the first copy of every line and remove later repeats",
    "keep-last": "Keep the last copy of every line and remove earlier repeats",
    "duplicates-only": "Show only lines that appear more than once (one copy each)",
    "unique-only": "Show only lines that appear exactly once",
  }[mode];
  const rules = [
    opts.ignoreCase ? "capitalization is ignored (“Apple” = “apple”)" : "capitalization matters (“Apple” ≠ “apple”)",
    opts.trimWhitespace ? "spaces at the start and end of lines are ignored and trimmed" : "spaces at the start and end of lines count",
    opts.removeEmpty || mode === "duplicates-only" || mode === "unique-only" || opts.sort
      ? "blank lines are removed"
      : "blank lines stay where they are",
    opts.sort ? "the result is sorted A–Z" : "the original order is kept",
  ];
  const detail = rules.join("; ");
  return `${what}. ${detail.charAt(0).toUpperCase()}${detail.slice(1)}.`;
}

/** Backwards-compatible helper: keep the first occurrence of each line. */
export function removeDuplicateLines(text: string, opts: DedupeOptions) {
  const r = processLines(text, { ...opts, mode: "keep-first", sort: false });
  return {
    output: r.output,
    originalLines: r.originalLines,
    finalLines: r.finalLines,
    duplicatesRemoved: r.duplicatesRemoved,
    emptyRemoved: r.emptyRemoved,
  };
}

export type DedupeOptions = {
  /** Treat "Apple" and "apple" as the same line. */
  ignoreCase: boolean;
  /** Ignore leading and trailing spaces when comparing, and trim them in the output. */
  trimWhitespace: boolean;
  /** Drop blank lines entirely. When false, blank lines are kept as-is and never deduplicated. */
  removeEmpty: boolean;
};

export type DedupeResult = {
  output: string;
  originalLines: number;
  finalLines: number;
  duplicatesRemoved: number;
  emptyRemoved: number;
};

export function removeDuplicateLines(text: string, opts: DedupeOptions): DedupeResult {
  if (!text) return { output: "", originalLines: 0, finalLines: 0, duplicatesRemoved: 0, emptyRemoved: 0 };

  const lines = text.split(/\r\n|\r|\n/);
  // A single trailing newline does not start a new line.
  if (lines.length > 1 && lines[lines.length - 1] === "") lines.pop();

  const seen = new Set<string>();
  const out: string[] = [];
  let duplicatesRemoved = 0;
  let emptyRemoved = 0;

  for (const line of lines) {
    const value = opts.trimWhitespace ? line.trim() : line;
    if (value.trim() === "") {
      if (opts.removeEmpty) emptyRemoved++;
      else out.push(value);
      continue;
    }
    const key = opts.ignoreCase ? value.toLowerCase() : value;
    if (seen.has(key)) {
      duplicatesRemoved++;
      continue;
    }
    seen.add(key);
    out.push(value);
  }

  return {
    output: out.join("\n"),
    originalLines: lines.length,
    finalLines: out.length,
    duplicatesRemoved,
    emptyRemoved,
  };
}

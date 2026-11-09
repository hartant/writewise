export type FindReplaceOptions = {
  find: string;
  replace: string;
  caseSensitive: boolean;
  wholeWord: boolean;
  /** Treat `find` as a JavaScript regular expression; `replace` may use $1, $&, \n and \t. */
  regex: boolean;
  /** Replace every match (true) or only the first (false). */
  all: boolean;
};

export type FindReplaceResult =
  | { ok: true; output: string; count: number; capped: boolean; ranges: [number, number][] }
  | { ok: false; error: string };

/**
 * Self-contained on purpose: this function is also serialized with toString() and run
 * inside a Web Worker, so it must not reference anything outside its own body.
 */
export function findReplace(text: string, o: FindReplaceOptions): FindReplaceResult {
  const MAX_MATCHES = 100000;
  const MAX_RANGES = 2000;
  if (!o.find) return { ok: true, output: text, count: 0, capped: false, ranges: [] };

  const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const flagsBase = "g" + (o.caseSensitive ? "" : "i");
  let source = o.regex ? o.find : escape(o.find);
  let re: RegExp;
  try {
    const wrapped = o.wholeWord ? "(?<![\\p{L}\\p{N}_])(?:" + source + ")(?![\\p{L}\\p{N}_])" : source;
    re = new RegExp(wrapped, flagsBase + "u");
  } catch (unicodeError) {
    if (!o.regex) return { ok: false, error: String((unicodeError as Error).message) };
    // Some valid non-Unicode patterns (e.g. "\-") are rejected in Unicode mode.
    try {
      source = o.wholeWord ? "\\b(?:" + source + ")\\b" : source;
      re = new RegExp(source, flagsBase);
    } catch (e) {
      return { ok: false, error: String((e as Error).message).replace(/^Invalid regular expression: (\/.*\/[a-z]*: )?/, "") };
    }
  }

  const ranges: [number, number][] = [];
  let count = 0;
  let capped = false;
  for (const m of text.matchAll(re)) {
    if (count >= MAX_MATCHES) {
      capped = true;
      break;
    }
    if (count < MAX_RANGES) ranges.push([m.index ?? 0, (m.index ?? 0) + m[0].length]);
    count++;
    if (!o.all) break;
  }
  if (count === 0) return { ok: true, output: text, count: 0, capped: false, ranges };

  // Regex mode understands \n and \t in the replacement, like most editors; plain mode is literal.
  const replacement = o.regex
    ? o.replace.replace(/\\(\\|n|t)/g, (_m, c) => (c === "n" ? "\n" : c === "t" ? "\t" : "\\"))
    : o.replace.replace(/\$/g, "$$$$");
  const single = new RegExp(re.source, re.flags.replace("g", ""));
  const output = o.all ? text.replace(re, replacement) : text.replace(single, replacement);
  return { ok: true, output, count: o.all ? count : 1, capped, ranges: o.all ? ranges : ranges.slice(0, 1) };
}

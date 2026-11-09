export type SortMode = "az" | "za" | "natural-asc" | "natural-desc" | "length-asc" | "length-desc" | "reverse";

export type SortOptions = {
  mode: SortMode;
  /** When true, uppercase sorts before lowercase and "apple" ≠ "Apple". */
  caseSensitive: boolean;
  /** Drop blank lines from the result. When false, blank lines are moved to the end. */
  removeBlank: boolean;
};

const length = (s: string) => Array.from(s).length;

/**
 * Sorts lines. Every sort is stable: lines that compare equal keep their original order.
 * "Natural" modes compare runs of digits as numbers, so item2 comes before item10.
 */
export function sortLines(text: string, opts: SortOptions): string[] {
  if (!text) return [];
  const lines = text.split(/\r\n|\r|\n/);
  if (lines.length > 1 && lines[lines.length - 1] === "") lines.pop();

  const content = lines.filter((l) => l.trim() !== "");
  const blanks = opts.removeBlank ? [] : lines.filter((l) => l.trim() === "");

  if (opts.mode === "reverse") {
    return opts.removeBlank ? lines.filter((l) => l.trim() !== "").reverse() : [...lines].reverse();
  }

  const collator = new Intl.Collator("en", {
    numeric: opts.mode.startsWith("natural"),
    sensitivity: opts.caseSensitive ? "variant" : "accent",
    caseFirst: opts.caseSensitive ? "upper" : "false",
  });
  const cmp: Record<Exclude<SortMode, "reverse">, (a: string, b: string) => number> = {
    az: collator.compare,
    "natural-asc": collator.compare,
    za: (a, b) => collator.compare(b, a),
    "natural-desc": (a, b) => collator.compare(b, a),
    "length-asc": (a, b) => length(a) - length(b),
    "length-desc": (a, b) => length(b) - length(a),
  };
  return [...content.sort(cmp[opts.mode]), ...blanks];
}

import { processLines } from "./dedupe.ts";

/**
 * Text cleaning with independent rules. Rules run in a fixed, documented order
 * (the order of the keys below), and each reports how many changes it made.
 */
export type CleanerOptions = {
  /** Remove zero-width spaces, word joiners, byte-order marks and soft hyphens. */
  removeInvisible: boolean;
  /** Turn non-breaking spaces into normal spaces. */
  convertNbsp: boolean;
  /** Replace tab characters with a single space. */
  normalizeTabs: boolean;
  /** Collapse runs of spaces inside a line into one space. */
  collapseSpaces: boolean;
  /** Remove spaces at the start and end of every line. */
  trimLines: boolean;
  /** Join lines inside a paragraph into one line (paragraphs stay separated by blank lines). */
  joinWrappedLines: boolean;
  /** When joining lines, rejoin words split by a hyphen at the end of a line ("exam-" + "ple"). */
  fixLineEndHyphens: boolean;
  /** Reduce two or more blank lines to a single blank line. */
  collapseBlankLines: boolean;
  /** Remove every blank line. */
  removeBlankLines: boolean;
  /** Remove repeated lines, keeping the first copy. */
  removeDuplicateLines: boolean;
};

export type CleanerRule = keyof CleanerOptions;

export const CLEANER_DEFAULTS: CleanerOptions = {
  removeInvisible: true,
  convertNbsp: true,
  normalizeTabs: false,
  collapseSpaces: true,
  trimLines: true,
  joinWrappedLines: false,
  fixLineEndHyphens: false,
  collapseBlankLines: true,
  removeBlankLines: false,
  removeDuplicateLines: false,
};

export type CleanerResult = { output: string; changes: Partial<Record<CleanerRule, number>> };

// Invisible characters that carry no meaning in ordinary prose. Zero-width joiners
// (U+200D) and non-joiners (U+200C) are deliberately kept: emoji sequences and some
// scripts need them.
const INVISIBLE = /[​⁠﻿­᠎]/g;

const count = (s: string, re: RegExp) => s.match(re)?.length ?? 0;

export function cleanText(input: string, opts: CleanerOptions): CleanerResult {
  const changes: Partial<Record<CleanerRule, number>> = {};
  if (!input) return { output: "", changes };
  let text = input.replace(/\r\n?/g, "\n");

  if (opts.removeInvisible) {
    changes.removeInvisible = count(text, INVISIBLE);
    text = text.replace(INVISIBLE, "");
  }
  if (opts.convertNbsp) {
    changes.convertNbsp = count(text, /[  ]/g);
    text = text.replace(/[  ]/g, " ");
  }
  if (opts.normalizeTabs) {
    changes.normalizeTabs = count(text, /\t/g);
    text = text.replace(/\t/g, " ");
  }
  if (opts.collapseSpaces) {
    changes.collapseSpaces = count(text, /(?<=\S) {2,}(?=\S)/g);
    text = text.replace(/(?<=\S) {2,}(?=\S)/g, " ");
  }
  if (opts.trimLines) {
    const before = text;
    text = text
      .split("\n")
      .map((l) => l.replace(/^[ \t]+|[ \t]+$/g, ""))
      .join("\n");
    changes.trimLines = before.split("\n").filter((l) => /^[ \t]|[ \t]$/.test(l)).length;
  }
  if (opts.joinWrappedLines) {
    let joins = 0;
    let hyphenFixes = 0;
    text = text
      .split(/\n[ \t]*\n/)
      .map((para) => {
        const lines = para.split("\n");
        let out = lines[0] ?? "";
        for (let i = 1; i < lines.length; i++) {
          const next = lines[i].replace(/^[ \t]+/, "");
          if (!next) continue;
          joins++;
          if (opts.fixLineEndHyphens && /\p{L}-$/u.test(out) && /^\p{Ll}/u.test(next)) {
            out = out.slice(0, -1) + next;
            hyphenFixes++;
          } else out = out.replace(/[ \t]+$/, "") + " " + next;
        }
        return out;
      })
      .join("\n\n");
    changes.joinWrappedLines = joins;
    if (opts.fixLineEndHyphens) changes.fixLineEndHyphens = hyphenFixes;
  }
  if (opts.removeBlankLines) {
    const lines = text.split("\n");
    const kept = lines.filter((l) => l.trim() !== "");
    changes.removeBlankLines = lines.length - kept.length;
    text = kept.join("\n");
  } else if (opts.collapseBlankLines) {
    changes.collapseBlankLines = count(text, /\n[ \t]*\n(?:[ \t]*\n)+/g);
    text = text.replace(/\n[ \t]*\n(?:[ \t]*\n)+/g, "\n\n");
  }
  if (opts.removeDuplicateLines) {
    const r = processLines(text, { ignoreCase: false, trimWhitespace: false, removeEmpty: false, mode: "keep-first" });
    changes.removeDuplicateLines = r.duplicatesRemoved;
    text = r.output;
  }
  return { output: text, changes };
}

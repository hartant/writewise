/**
 * Text statistics used by every counting tool.
 *
 * Counting rules (documented on the tool pages so results are explainable):
 * - Words are runs of characters separated by whitespace, em dashes or en dashes,
 *   and must contain at least one letter or digit. Hyphenated words ("well-known"),
 *   contractions ("don't") and numbers ("3.14") each count as one word.
 * - Chinese and Japanese characters, which are written without spaces, count as
 *   one word per character.
 * - Characters are counted as user-perceived characters (grapheme clusters), so an
 *   emoji or an accented letter counts as one character.
 */

// Hiragana, Katakana, CJK Unified Ideographs (+ Extension A) and compatibility ideographs.
const CJK_CHAR = /[぀-ヿ㐀-䶿一-鿿豈-﫿]/gu;
const HAS_CJK = /[぀-ヿ㐀-䶿一-鿿豈-﫿]/u;
const WORDLIKE = /[\p{L}\p{N}]/u;
const WORD_SPLIT = /[\s–—]+/u;

export function countWords(text: string): number {
  if (!text) return 0;
  let count = 0;
  for (const token of text.split(WORD_SPLIT)) {
    if (!token) continue;
    if (HAS_CJK.test(token)) {
      const cjk = token.match(CJK_CHAR)?.length ?? 0;
      const rest = token.replace(CJK_CHAR, " ");
      count += cjk + rest.split(/\s+/).filter((t) => WORDLIKE.test(t)).length;
    } else if (WORDLIKE.test(token)) {
      count++;
    }
  }
  return count;
}

type SegmenterLike = { segment(input: string): Iterable<unknown> };
let graphemeSegmenter: SegmenterLike | null | undefined;

function getSegmenter(): SegmenterLike | null {
  if (graphemeSegmenter === undefined) {
    const Seg = (Intl as unknown as { Segmenter?: new (l?: string, o?: object) => SegmenterLike }).Segmenter;
    graphemeSegmenter = Seg ? new Seg(undefined, { granularity: "grapheme" }) : null;
  }
  return graphemeSegmenter;
}

/** Counts user-perceived characters. */
export function countCharacters(text: string): number {
  if (!text) return 0;
  // Fast path: Latin text without combining marks, emoji or CJK has one code unit per character.
  if (!/[^\x00-˿]/.test(text)) {
    const crlf = text.match(/\r\n/g)?.length ?? 0;
    return text.length - crlf;
  }
  const seg = getSegmenter();
  if (!seg) return Array.from(text).length;
  let n = 0;
  for (const _ of seg.segment(text)) n++;
  return n;
}

export function countCharactersNoSpaces(text: string): number {
  return countCharacters(text.replace(/\s+/g, ""));
}

export type ParagraphMode = "line" | "blank";

/**
 * Splits text into paragraphs.
 * - "line": every non-empty line is a paragraph (how Microsoft Word counts).
 * - "blank": paragraphs are separated by one or more blank lines, so text that is
 *   hard-wrapped with single line breaks stays together.
 */
export function splitParagraphs(text: string, mode: ParagraphMode = "line"): string[] {
  if (!text) return [];
  const parts = mode === "line" ? text.split(/\r?\n/) : text.split(/(?:\r?\n[ \t]*){2,}/);
  return parts.map((p) => p.trim()).filter((p) => WORDLIKE.test(p));
}

export function countParagraphs(text: string, mode: ParagraphMode = "line"): number {
  return splitParagraphs(text, mode).length;
}

export function countLines(text: string): number {
  if (!text) return 0;
  const lines = text.split(/\r\n|\r|\n/);
  if (lines.length > 1 && lines[lines.length - 1] === "") lines.pop();
  return lines.length;
}

// Abbreviations that are almost never the end of a sentence.
const TITLES = new Set([
  "mr", "mrs", "ms", "mx", "dr", "prof", "sr", "jr", "st", "mt", "rev", "fr",
  "gen", "sen", "rep", "gov", "capt", "lt", "col", "sgt", "hon", "vs",
]);
const NEXT_CHAR = /\s*(\S?)/y;
const TERMINATOR = /[.!?…‽]+["'”’)\]]*/gu;

function sentenceEndsInBlock(block: string): number {
  let count = 0;
  let lastEnd = 0;
  TERMINATOR.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = TERMINATOR.exec(block))) {
    const start = m.index;
    const end = start + m[0].length;
    // Must be followed by whitespace or the end of the block (rules out 3.14, URLs, "e.g.x").
    if (end < block.length && !/\s/.test(block[end])) continue;
    // Only a terminator if the preceding text contains a word.
    if (!WORDLIKE.test(block.slice(lastEnd, start))) continue;
    if (/^\.+["'\u201d\u2019)\]]*$/.test(m[0])) {
      NEXT_CHAR.lastIndex = end;
      const nextChar = NEXT_CHAR.exec(block)?.[1] ?? "";
      // "approx. five", "e.g. the": a period followed by a lowercase word is an abbreviation.
      if (nextChar && /\p{Ll}/u.test(nextChar)) continue;
      const prevWord = /([\p{L}.]+)$/u.exec(block.slice(Math.max(0, start - 32), start))?.[1] ?? "";
      const bare = prevWord.replace(/\.+$/, "").toLowerCase();
      if (nextChar) {
        if (TITLES.has(bare)) continue; // "Dr. Smith"
        if (/^\p{Lu}$/u.test(prevWord)) continue; // initials: "J. K. Rowling"
        if (/^(\p{L}\.)+\p{L}$/u.test(prevWord)) continue; // "U.S. Army"
      }
    }
    count++;
    lastEnd = end;
  }
  if (WORDLIKE.test(block.slice(lastEnd))) count++; // trailing sentence without punctuation
  return count;
}

/**
 * Estimates the number of sentences. Line breaks also end a sentence, so headings
 * and list items without punctuation are counted.
 */
export function countSentences(text: string): number {
  if (!text) return 0;
  let total = 0;
  for (const block of text.split(/\r?\n+/)) {
    if (WORDLIKE.test(block)) total += sentenceEndsInBlock(block);
  }
  return total;
}

export type TextStats = {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  lines: number;
};

export function analyzeText(text: string, mode: ParagraphMode = "line"): TextStats {
  return {
    words: countWords(text),
    characters: countCharacters(text),
    charactersNoSpaces: countCharactersNoSpaces(text),
    sentences: countSentences(text),
    paragraphs: countParagraphs(text, mode),
    lines: countLines(text),
  };
}

/** Average silent reading speed for adults reading non-fiction (Brysbaert, 2019). */
export const DEFAULT_READING_WPM = 238;
/** A comfortable presentation pace. */
export const DEFAULT_SPEAKING_WPM = 140;

export function minutesFor(words: number, wpm: number): number {
  if (words <= 0 || wpm <= 0) return 0;
  return words / wpm;
}

/** Formats a duration in minutes as "4 min 12 sec", "45 sec" or "1 hr 5 min". */
export function formatDuration(minutes: number): string {
  if (!Number.isFinite(minutes) || minutes <= 0) return "0 sec";
  const totalSeconds = Math.max(1, Math.round(minutes * 60));
  if (totalSeconds < 60) return `${totalSeconds} sec`;
  if (totalSeconds < 3600) {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return s ? `${m} min ${s} sec` : `${m} min`;
  }
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.round((totalSeconds % 3600) / 60);
  if (m === 60) return `${h + 1} hr`;
  return m ? `${h} hr ${m} min` : `${h} hr`;
}

const STOP_WORDS = new Set(
  (
    "a an the and or but nor so yet for of to in on at by with from as into onto than then " +
    "is are was were be been being am do does did doing have has had having it its it's this that " +
    "these those there their they them he she him her his hers we us our you your i me my mine " +
    "not no if when while which who whom whose what where why how all any each both more most " +
    "some such can could will would should may might must shall about over under up down out " +
    "just also very too only own same other again further once here s t don't can't won't"
  ).split(" "),
);

export type WordFrequency = { word: string; count: number };

/** Most frequent words, excluding common function words. Useful for spotting repetition. */
export function topWords(text: string, limit = 8): WordFrequency[] {
  const counts = new Map<string, number>();
  const matches = text.toLowerCase().match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu);
  if (!matches) return [];
  for (const raw of matches) {
    const word = raw.replace(/’/g, "'");
    if (word.length < 3 || STOP_WORDS.has(word) || /^\d+$/.test(word)) continue;
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }
  return [...counts.entries()]
    .filter(([, c]) => c > 1)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([word, count]) => ({ word, count }));
}

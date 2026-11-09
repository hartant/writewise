export type CaseMode = "upper" | "lower" | "title" | "sentence" | "capitalized";

/**
 * Minor words kept lowercase in Title Case unless they are the first or last word
 * or follow a colon. This follows the widely used convention (also used by APA
 * style) of lowercasing articles, short conjunctions and prepositions of three
 * letters or fewer.
 */
const MINOR_WORDS = new Set([
  "a", "an", "the", "and", "but", "or", "nor", "for", "so", "yet",
  "as", "at", "by", "in", "of", "off", "on", "per", "to", "up", "via", "vs",
]);

const LETTER = /\p{L}/u;
const UPPER = /\p{Lu}/gu;
const ANY_LETTER = /\p{L}/gu;

/** True when most letters are uppercase, e.g. text typed with caps lock on. */
function isMostlyUppercase(text: string): boolean {
  const letters = text.match(ANY_LETTER)?.length ?? 0;
  if (letters === 0) return false;
  const upper = text.match(UPPER)?.length ?? 0;
  return upper / letters > 0.7;
}

/** Words like NASA, iPhone or McDonald that should keep their capitalization. */
function hasDeliberateCaps(word: string): boolean {
  const letters = word.match(ANY_LETTER) ?? [];
  if (letters.length < 2) return false;
  return letters.slice(1).some((ch) => ch !== ch.toLowerCase());
}

// Two or more consecutive all-caps words ("THIS IS LOUD") are shouting, not acronyms.
const SHOUTING = /(?<![\p{L}\p{N}])\p{Lu}[\p{Lu}'\u2019]+(?:[^\p{L}\p{N}\n]+\p{Lu}[\p{Lu}'\u2019]+)+(?![\p{L}\p{N}])/gu;

/** Lowercases shouted runs so only isolated acronyms keep their capitals. */
function prepare(text: string): { text: string; preserve: boolean } {
  if (isMostlyUppercase(text)) return { text: text.toLowerCase(), preserve: false };
  return { text: text.replace(SHOUTING, (run) => run.toLowerCase()), preserve: true };
}

function capitalizeFirst(word: string): string {
  const i = word.search(LETTER);
  if (i < 0) return word;
  return word.slice(0, i) + word.charAt(i).toUpperCase() + word.slice(i + 1);
}

function splitAffixes(token: string): [string, string, string] {
  const m = /^([^\p{L}\p{N}]*)(.*?)([^\p{L}\p{N}]*)$/su.exec(token);
  return m ? [m[1], m[2], m[3]] : ["", token, ""];
}

function titleCaseLine(line: string, preserve: boolean): string {
  const tokens = line.split(/(\s+)/);
  const wordIdx = tokens.map((t, i) => (t && !/^\s+$/.test(t) && LETTER.test(t) ? i : -1)).filter((i) => i >= 0);
  const first = wordIdx[0];
  const last = wordIdx[wordIdx.length - 1];
  let forceNext = true;

  return tokens
    .map((token, i) => {
      if (!token || /^\s+$/.test(token)) return token;
      if (!LETTER.test(token)) {
        if (/[:—?!]$/.test(token)) forceNext = true;
        return token;
      }
      const [lead, core, trail] = splitAffixes(token);
      const isEdge = i === first || i === last || forceNext;
      forceNext = /[:—?!.]/.test(trail);

      const parts = core.split("-");
      const out = parts.map((part, pi) => {
        if (preserve && hasDeliberateCaps(part)) return part;
        const lower = part.toLowerCase();
        const mustCap = pi === 0 ? isEdge : false;
        if (!mustCap && MINOR_WORDS.has(lower) && !(pi === parts.length - 1 && i === last)) return lower;
        return capitalizeFirst(lower);
      });
      return lead + out.join("-") + trail;
    })
    .join("");
}

function toTitleCase(input: string): string {
  const { text, preserve } = prepare(input);
  return text
    .split(/(\r?\n)/)
    .map((line) => (/^\r?\n$/.test(line) ? line : titleCaseLine(line, preserve)))
    .join("");
}

function toCapitalizedCase(input: string): string {
  const { text, preserve } = prepare(input);
  return text.replace(/[\p{L}\p{N}][\p{L}\p{N}'’]*/gu, (word) => {
    if (preserve && hasDeliberateCaps(word)) return word;
    return capitalizeFirst(word.toLowerCase());
  });
}

function toSentenceCase(input: string): string {
  const { text, preserve } = prepare(input);
  // Lowercase everything except acronyms and mixed-case words (NASA, iPhone).
  let out = text.replace(/[\p{L}\p{N}][\p{L}\p{N}'’]*/gu, (word) =>
    preserve && hasDeliberateCaps(word) ? word : word.toLowerCase(),
  );
  // Capitalize the first letter of the text, of each line and after . ! ?
  out = out.replace(/(^|[.!?…]["'”’)\]]*\s+|\n\s*)([^\p{L}\n]*)(\p{L})/gu, (_, sep, gap, ch) => sep + gap + ch.toUpperCase());
  // The pronoun "I" and its contractions.
  out = out.replace(/(^|[^\p{L}\p{N}'’])i(?=$|[^\p{L}\p{N}]|['’](?:m|ve|ll|d)\b)/gu, (_, pre) => pre + "I");
  return out;
}

export function convertCase(text: string, mode: CaseMode): string {
  switch (mode) {
    case "upper":
      return text.toUpperCase();
    case "lower":
      return text.toLowerCase();
    case "title":
      return toTitleCase(text);
    case "sentence":
      return toSentenceCase(text);
    case "capitalized":
      return toCapitalizedCase(text);
  }
}

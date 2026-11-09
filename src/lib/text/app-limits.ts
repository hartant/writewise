import { countCharacters, countWords } from "./stats.ts";

/**
 * Application limits. Only rules confirmed from official pages are marked verified.
 * Update `lastVerified` whenever the rules are re-checked against the sources.
 */
export const UCAS = {
  name: "UCAS personal statement",
  entryYears: "2026 entry onwards",
  questions: [
    "Why do you want to study this course or subject?",
    "How have your qualifications and studies helped you to prepare for this course or subject?",
    "What else have you done to prepare outside of education, and why are these experiences useful?",
  ],
  minPerAnswer: 350,
  maxTotal: 4000,
  verified: true,
  lastVerified: "2026-11-09",
  sources: [
    {
      label: "UCAS: How to write your personal statement (2026 entry onwards)",
      url: "https://www.ucas.com/applying/applying-to-university/writing-your-personal-statement/how-to-write-your-personal-statement-for-2026-entry-onwards",
    },
  ],
} as const;

export const COMMON_APP = {
  name: "Common App personal essay",
  /** Long-standing published range. Not re-verified from an official page for this release. */
  minWords: 250,
  maxWords: 650,
  verified: false,
  lastChecked: "2026-11-09",
  sources: [{ label: "Common App: 2026–2027 essay prompts", url: "https://www.commonapp.org/apply/essay-prompts" }],
} as const;

export type UcasAnswerCheck = { characters: number; belowMinimum: boolean; shortBy: number };
export type UcasCheck = {
  answers: UcasAnswerCheck[];
  total: number;
  remaining: number;
  overBy: number;
  ready: boolean;
};

/** Characters are counted as you see them, including spaces and line breaks. */
export function checkUcas(answers: string[]): UcasCheck {
  const checks = answers.map((a) => {
    const characters = countCharacters(a);
    return { characters, belowMinimum: characters < UCAS.minPerAnswer, shortBy: Math.max(0, UCAS.minPerAnswer - characters) };
  });
  const total = checks.reduce((n, c) => n + c.characters, 0);
  return {
    answers: checks,
    total,
    remaining: Math.max(0, UCAS.maxTotal - total),
    overBy: Math.max(0, total - UCAS.maxTotal),
    ready: total <= UCAS.maxTotal && checks.every((c) => !c.belowMinimum),
  };
}

export type RangeCheck = { value: number; status: "empty" | "under" | "ok" | "over"; delta: number };

export function checkRange(value: number, min: number | null, max: number | null): RangeCheck {
  if (value === 0) return { value, status: "empty", delta: min ?? 0 };
  if (max !== null && value > max) return { value, status: "over", delta: value - max };
  if (min !== null && value < min) return { value, status: "under", delta: min - value };
  return { value, status: "ok", delta: max !== null ? max - value : 0 };
}

export function countForLimit(text: string, unit: "words" | "characters" | "characters-no-spaces"): number {
  if (unit === "words") return countWords(text);
  if (unit === "characters") return countCharacters(text);
  return countCharacters(text.replace(/\s+/g, ""));
}

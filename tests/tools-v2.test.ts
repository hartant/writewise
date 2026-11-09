import { test } from "node:test";
import assert from "node:assert/strict";
import { processLines, describeDedupe } from "../src/lib/text/dedupe.ts";
import { cleanText, CLEANER_DEFAULTS } from "../src/lib/text/cleaner.ts";
import { sortLines } from "../src/lib/text/sort.ts";
import { findReplace } from "../src/lib/text/find-replace.ts";
import { wordFrequency, frequencyCsv } from "../src/lib/text/frequency.ts";
import { checkUcas, checkRange, countForLimit, UCAS } from "../src/lib/text/app-limits.ts";

const base = { ignoreCase: false, trimWhitespace: true, removeEmpty: false };

test("dedupe modes", () => {
  const t = "b\na\nB\nb\n\nc\na\n";
  assert.equal(processLines(t, { ...base, mode: "keep-first" }).output, "b\na\nB\n\nc");
  assert.equal(processLines(t, { ...base, mode: "keep-last" }).output, "B\nb\n\nc\na");
  assert.equal(processLines(t, { ...base, mode: "duplicates-only" }).output, "b\na");
  assert.equal(processLines(t, { ...base, mode: "unique-only" }).output, "B\nc");
  const ci = processLines(t, { ...base, ignoreCase: true, mode: "keep-first" });
  assert.equal(ci.output, "b\na\n\nc");
  assert.deepEqual(ci.frequencies, [{ line: "b", count: 3 }, { line: "a", count: 2 }]);
  assert.equal(ci.uniqueValues, 3);
  assert.equal(ci.duplicatesRemoved, 3);
});

test("dedupe sorting, blanks, unicode and emoji", () => {
  const r = processLines("item10\nitem2\n\nitem2\nÉclair\neclair\n🍎\n🍎", { ...base, sort: true });
  assert.deepEqual(r.output.split("\n"), ["🍎", "Éclair", "eclair", "item2", "item10"].sort(new Intl.Collator("en", { numeric: true, sensitivity: "variant", caseFirst: "upper" }).compare));
  assert.equal(r.emptyRemoved, 1);
  assert.ok(r.output.indexOf("item2") < r.output.indexOf("item10"));
  assert.equal(processLines("", base).originalLines, 0);
  assert.equal(processLines("   \n\t", { ...base, removeEmpty: true }).finalLines, 0);
  assert.match(describeDedupe({ ...base, mode: "keep-last" }), /^Keep the last copy/);
  const big = Array.from({ length: 200000 }, (_, i) => `user${i % 5000}@example.com`).join("\n");
  const t0 = Date.now();
  assert.equal(processLines(big, base).finalLines, 5000);
  assert.ok(Date.now() - t0 < 1500);
});

test("text cleaner rules", () => {
  const messy = "﻿Hello​  world  !\t\n  line two  \n\n\n\nThe exam-\nple was hard\nand long.\n";
  const r = cleanText(messy, CLEANER_DEFAULTS);
  assert.equal(r.output, "Hello world !\nline two\n\nThe exam-\nple was hard\nand long.\n");
  assert.equal(r.changes.removeInvisible, 2);
  assert.equal(r.changes.convertNbsp, 1);
  const joined = cleanText(messy, { ...CLEANER_DEFAULTS, joinWrappedLines: true, fixLineEndHyphens: true });
  assert.equal(joined.output, "Hello world ! line two\n\nThe example was hard and long.");
  assert.equal(cleanText("a\n\n\nb\na", { ...CLEANER_DEFAULTS, removeBlankLines: true, removeDuplicateLines: true }).output, "a\nb");
  // Emoji ZWJ sequences survive invisible-character removal.
  assert.equal(cleanText("👨‍👩‍👧", CLEANER_DEFAULTS).output, "👨‍👩‍👧");
  assert.equal(cleanText("", CLEANER_DEFAULTS).output, "");
  assert.equal(cleanText("well-\nKnown", { ...CLEANER_DEFAULTS, joinWrappedLines: true, fixLineEndHyphens: true }).output, "well- Known");
});

test("sort lines", () => {
  const t = "item10\nItem2\nitem1\n\nbanana\nApple\napple";
  assert.deepEqual(sortLines(t, { mode: "natural-asc", caseSensitive: false, removeBlank: true }), ["Apple", "apple", "banana", "item1", "Item2", "item10"]);
  assert.deepEqual(sortLines("item10\nitem2", { mode: "az", caseSensitive: false, removeBlank: true }), ["item10", "item2"]);
  assert.deepEqual(sortLines("b\nA\na\nB", { mode: "az", caseSensitive: true, removeBlank: true }), ["A", "a", "B", "b"]);
  assert.deepEqual(sortLines("a\n\nc\nb", { mode: "za", caseSensitive: false, removeBlank: false }), ["c", "b", "a", ""]);
  assert.deepEqual(sortLines("ccc\na\nbb\nd", { mode: "length-asc", caseSensitive: false, removeBlank: true }), ["a", "d", "bb", "ccc"]);
  assert.deepEqual(sortLines("1\n2\n\n3", { mode: "reverse", caseSensitive: false, removeBlank: false }), ["3", "", "2", "1"]);
  assert.deepEqual(sortLines("x2\nx10\nx1", { mode: "natural-desc", caseSensitive: false, removeBlank: true }), ["x10", "x2", "x1"]);
  assert.deepEqual(sortLines("", { mode: "az", caseSensitive: false, removeBlank: true }), []);
});

test("find and replace", () => {
  const o = { find: "cat", replace: "dog", caseSensitive: false, wholeWord: false, regex: false, all: true };
  let r = findReplace("Cat catalog cat", o);
  assert.ok(r.ok && r.output === "dog dogalog dog" && r.count === 3);
  r = findReplace("Cat catalog cat", { ...o, wholeWord: true });
  assert.ok(r.ok && r.output === "dog catalog dog" && r.count === 2);
  r = findReplace("Cat cat", { ...o, caseSensitive: true, all: false });
  assert.ok(r.ok && r.output === "Cat dog" && r.count === 1);
  r = findReplace("price $5", { ...o, find: "$5", replace: "$10" });
  assert.ok(r.ok && r.output === "price $10", "plain mode treats $ literally");
  r = findReplace("2026-11-09", { ...o, find: "(\\d+)-(\\d+)-(\\d+)", replace: "$3/$2/$1", regex: true });
  assert.ok(r.ok && r.output === "09/11/2026");
  r = findReplace("a-b", { ...o, find: "\\-", replace: "+", regex: true });
  assert.ok(r.ok && r.output === "a+b", "non-unicode fallback");
  r = findReplace("x", { ...o, find: "(", regex: true });
  assert.ok(!r.ok && r.error.length > 0);
  r = findReplace("café Café", { ...o, find: "café", wholeWord: true });
  assert.ok(r.ok && r.count === 2);
  r = findReplace("abc", { ...o, find: "", replace: "z" });
  assert.ok(r.ok && r.output === "abc" && r.count === 0);
  r = findReplace("aaa", { ...o, find: "x*", replace: "-", regex: true });
  assert.ok(r.ok && r.output === "-a-a-a-");
  // Serializable for the Web Worker: no outside references.
  const revived = new Function(`return (${findReplace.toString()})`)() as typeof findReplace;
  const rr = revived("one two", { ...o, find: "two", replace: "2" });
  assert.ok(rr.ok && rr.output === "one 2");
});

test("word frequency", () => {
  const r = wordFrequency("The cat and the hat. The CAT's hat-trick, don't 2026!", { caseInsensitive: true, ignoreStopWords: false, includeNumbers: false });
  assert.equal(r.totalWords, 9);
  assert.deepEqual(r.rows[0], { word: "the", count: 3, percent: (3 / 9) * 100 });
  assert.ok(r.rows.some((x) => x.word === "cat's") && r.rows.some((x) => x.word === "hat-trick") && r.rows.some((x) => x.word === "don't"));
  const s = wordFrequency("The cat and the hat", { caseInsensitive: true, ignoreStopWords: true, includeNumbers: true });
  assert.deepEqual(s.rows.map((x) => x.word), ["cat", "hat"]);
  assert.equal(s.totalWords, 5);
  assert.equal(frequencyCsv([{ word: 'say "hi", ok', count: 2, percent: 50 }]), 'word,count,percent\r\n"say ""hi"", ok",2,50.00');
  assert.equal(wordFrequency("", { caseInsensitive: true, ignoreStopWords: false, includeNumbers: true }).totalWords, 0);
});

test("application limits", () => {
  const a = "x".repeat(400);
  const r = checkUcas([a, "y".repeat(300), "z".repeat(3400)]);
  assert.equal(r.total, 4100);
  assert.equal(r.overBy, 100);
  assert.equal(r.answers[1].shortBy, 50);
  assert.equal(r.ready, false);
  assert.equal(checkUcas([a, a, a]).ready, true);
  assert.equal(checkUcas(["a b\nc", "", ""]).answers[0].characters, 5, "spaces and line breaks count");
  assert.equal(UCAS.maxTotal, 4000);
  assert.deepEqual(checkRange(700, 250, 650), { value: 700, status: "over", delta: 50 });
  assert.deepEqual(checkRange(200, 250, 650), { value: 200, status: "under", delta: 50 });
  assert.equal(checkRange(0, null, 100).status, "empty");
  assert.equal(countForLimit("a b  c", "characters-no-spaces"), 3);
});

test("regex replacement escapes and guide examples", () => {
  const o = { find: "[,;]\\s*", replace: "\\n", caseSensitive: false, wholeWord: false, regex: true, all: true };
  const r = findReplace("a@x.com, b@x.com;c@x.com", o);
  assert.ok(r.ok && r.output === "a@x.com\nb@x.com\nc@x.com");
  const lit = findReplace("a\\nb", { ...o, find: "a", replace: "\\n", regex: false });
  assert.ok(lit.ok && lit.output === "\\n\\nb", "plain mode keeps backslashes literally");
  const pdf = "Climate  policy   in the UK has changed signif-\nicantly since 2008, when the Climate\nChange Act set a legally binding\ntarget.\n\n\n\n  Critics argue that progress has been   uneven \nacross sectors.";
  const c = cleanText(pdf, { ...CLEANER_DEFAULTS, joinWrappedLines: true, fixLineEndHyphens: true });
  assert.equal(c.output, "Climate policy in the UK has changed significantly since 2008, when the Climate Change Act set a legally binding target.\n\nCritics argue that progress has been uneven across sectors.");
});

test("word frequency keeps formatted numbers whole", () => {
  const r = wordFrequency("It cost 1,200 dollars, or 3.5 times more. Then 2, 3.", { caseInsensitive: true, ignoreStopWords: false, includeNumbers: true });
  const words = r.rows.map((x) => x.word);
  assert.ok(words.includes("1,200") && words.includes("3.5") && words.includes("2") && words.includes("3"));
  assert.ok(!words.includes("200"));
  const noNum = wordFrequency("It cost 1,200 dollars", { caseInsensitive: true, ignoreStopWords: false, includeNumbers: false });
  assert.equal(noNum.totalWords, 3);
});

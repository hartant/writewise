import { test } from "node:test";
import assert from "node:assert/strict";
import {
  countWords, countCharacters, countCharactersNoSpaces, countSentences,
  countParagraphs, countLines, formatDuration, topWords, minutesFor,
} from "../src/lib/text/stats.ts";
import { convertCase } from "../src/lib/text/case.ts";
import { removeDuplicateLines } from "../src/lib/text/dedupe.ts";
import { diffTexts } from "../src/lib/text/diff.ts";

test("countWords basics and edge cases", () => {
  assert.equal(countWords(""), 0);
  assert.equal(countWords("   \n\t "), 0);
  assert.equal(countWords("Hello world"), 2);
  assert.equal(countWords("well-known don't 3.14 e.g."), 4);
  assert.equal(countWords("word—word – word"), 3);
  assert.equal(countWords("— , . !"), 0);
  assert.equal(countWords("Café naïve résumé"), 3);
  assert.equal(countWords("你好世界"), 4);
  assert.equal(countWords("I love 東京 trips"), 5);
  assert.equal(countWords("emoji 🎉 party"), 2);
});

test("countCharacters handles graphemes", () => {
  assert.equal(countCharacters(""), 0);
  assert.equal(countCharacters("abc def"), 7);
  assert.equal(countCharactersNoSpaces("abc def\n g"), 7);
  assert.equal(countCharacters("👍🏽"), 1);
  assert.equal(countCharacters("👨‍👩‍👧"), 1);
  assert.equal(countCharacters("é"), 1);
  assert.equal(countCharacters("a\r\nb"), 3);
});

test("countSentences heuristics", () => {
  assert.equal(countSentences(""), 0);
  assert.equal(countSentences("One. Two! Three?"), 3);
  assert.equal(countSentences("No punctuation here"), 1);
  assert.equal(countSentences("Dr. Smith arrived. He sat."), 2);
  assert.equal(countSentences("Pi is 3.14 roughly. Yes."), 2);
  assert.equal(countSentences("Bring fruit, e.g. apples. Done."), 2);
  assert.equal(countSentences("J. K. Rowling wrote it."), 1);
  assert.equal(countSentences("Wait... What?!"), 2);
  assert.equal(countSentences('He said "Stop." Then left.'), 2);
  assert.equal(countSentences("Heading\nBody text here. More."), 3);
  assert.equal(countSentences("..."), 0);
});

test("paragraphs and lines", () => {
  const t = "Para one line one\nline two\n\nPara two\n\n\n  \nPara three";
  assert.equal(countParagraphs(t, "line"), 4);
  assert.equal(countParagraphs(t, "blank"), 3);
  assert.equal(countParagraphs("", "line"), 0);
  assert.equal(countLines("a\nb\n"), 2);
  assert.equal(countLines("a"), 1);
  assert.equal(countLines(""), 0);
});

test("durations", () => {
  assert.equal(formatDuration(0), "0 sec");
  assert.equal(formatDuration(0.001), "1 sec");
  assert.equal(formatDuration(0.5), "30 sec");
  assert.equal(formatDuration(4.2), "4 min 12 sec");
  assert.equal(formatDuration(3), "3 min");
  assert.equal(formatDuration(65), "1 hr 5 min");
  assert.equal(formatDuration(119.99), "2 hr");
  assert.equal(minutesFor(238, 238), 1);
  assert.equal(minutesFor(100, 0), 0);
});

test("topWords skips stop words", () => {
  const r = topWords("The essay essay argues; the essay ARGUES clearly. clearly");
  assert.deepEqual(r[0], { word: "essay", count: 3 });
  assert.ok(!r.some((w) => w.word === "the"));
});

test("case conversion", () => {
  assert.equal(convertCase("hello World", "upper"), "HELLO WORLD");
  assert.equal(convertCase("Hello WORLD", "lower"), "hello world");
  assert.equal(convertCase("the lord of the rings", "title"), "The Lord of the Rings");
  assert.equal(convertCase("a tale of two cities: the end of an era", "title"), "A Tale of Two Cities: The End of an Era");
  assert.equal(convertCase("what are you looking at", "title"), "What Are You Looking At");
  assert.equal(convertCase("using NASA data on an iPhone", "title"), "Using NASA Data on an iPhone");
  assert.equal(convertCase("THE QUICK BROWN FOX", "title"), "The Quick Brown Fox");
  assert.equal(convertCase("a well-known state-of-the-art tool", "title"), "A Well-Known State-of-the-Art Tool");
  assert.equal(convertCase("THIS IS LOUD. i think so! what now", "sentence"), "This is loud. I think so! What now");
  assert.equal(convertCase("i'm sure The NASA Team Works.\nnext line", "sentence"), "I'm sure the NASA team works.\nNext line");
  assert.equal(convertCase("hello there, it's me", "capitalized"), "Hello There, It's Me");
  assert.equal(convertCase("", "title"), "");
  assert.equal(convertCase("  12 % ", "sentence"), "  12 % ");
});

test("remove duplicate lines", () => {
  const opts = { ignoreCase: false, trimWhitespace: true, removeEmpty: false };
  let r = removeDuplicateLines("apple\nbanana\napple\nApple\n\nbanana\n", opts);
  assert.equal(r.output, "apple\nbanana\nApple\n");
  assert.equal(r.originalLines, 6);
  assert.equal(r.finalLines, 4);
  assert.equal(r.duplicatesRemoved, 2);
  r = removeDuplicateLines("apple\nApple\n\n  apple  \n", { ...opts, ignoreCase: true, removeEmpty: true });
  assert.equal(r.output, "apple");
  assert.equal(r.emptyRemoved, 1);
  assert.equal(removeDuplicateLines("", opts).originalLines, 0);
  r = removeDuplicateLines(" a\na", { ...opts, trimWhitespace: false });
  assert.equal(r.finalLines, 2);
});

test("diff words", () => {
  const r = diffTexts("The quick brown fox jumps.", "The quick red fox leaps high.");
  const ins = r.segments.filter((s) => s.type === "insert").map((s) => s.value.trim());
  const del = r.segments.filter((s) => s.type === "delete").map((s) => s.value.trim());
  assert.ok(ins.includes("red") && del.includes("brown"));
  assert.equal(r.stats.wordsAdded, 3);
  assert.equal(r.stats.wordsRemoved, 2);
  assert.equal(r.stats.wordsUnchanged, 3);
  // Reconstruct both sides from segments.
  const rebuiltNew = r.segments.filter((s) => s.type !== "delete").map((s) => s.value).join("");
  const rebuiltOld = r.segments.filter((s) => s.type !== "insert").map((s) => s.value).join("");
  assert.equal(rebuiltNew, "The quick red fox leaps high.");
  assert.equal(rebuiltOld, "The quick brown fox jumps.");
});

test("diff identical, empty, lines and large inputs", () => {
  assert.equal(diffTexts("same text", "same text").stats.identical, true);
  assert.equal(diffTexts("", "").stats.similarity, 100);
  const e = diffTexts("", "new words");
  assert.equal(e.stats.wordsAdded, 2);
  const l = diffTexts("a\nb\nc\n", "a\nB\nc\n", "lines");
  assert.equal(l.stats.additions, 1);
  assert.equal(l.stats.deletions, 1);
  const words = Array.from({ length: 20000 }, (_, i) => `w${i}`);
  const t0 = Date.now();
  const big = diffTexts(words.join(" "), words.map((w, i) => (i % 500 === 0 ? "CHANGED" : w)).join(" "));
  assert.equal(big.stats.wordsAdded, 40);
  assert.ok(Date.now() - t0 < 2000, "large diff is fast");
  const rand = (n: number, seed: number) => Array.from({ length: n }, (_, i) => `x${(i * seed) % 9973}`).join(" ");
  const huge = diffTexts(rand(8000, 7), rand(8000, 13));
  assert.ok(huge.segments.length > 0);
});

test("large word count is fast", () => {
  const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(20000);
  const t0 = Date.now();
  assert.equal(countWords(text), 160000);
  countCharacters(text + "é");
  countSentences(text);
  assert.ok(Date.now() - t0 < 1500);
});

test("diff groups adjacent changes into one replacement", () => {
  const r = diffTexts(
    "Most students check their phones many times a day, and this effects their ability to focus in class.",
    "Many students check their phones dozens of times a day, and this affects their ability to concentrate in class.",
  );
  assert.deepEqual(
    r.segments.filter((s) => s.type === "insert").map((s) => s.value.trim()),
    ["Many", "dozens of", "affects", "concentrate"],
  );
  assert.equal(r.stats.additions, 4);
  assert.equal(r.stats.deletions, 4);
});

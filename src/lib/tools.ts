import type { PlanTier } from "./plans";

export type CategoryId = "counting" | "goals" | "cleanup" | "review";

/**
 * Where a tool processes text. Every tool today is "local" (in the browser).
 * A future AI- or API-powered tool must declare "server" so that its page shows
 * the correct privacy notice instead of the "processed locally" badge.
 */
export type ProcessingMode = "local" | "server";

export type ToolMeta = {
  slug: string;
  processing: ProcessingMode;
  /** Plan required to use the tool. See src/lib/plans.ts. */
  tier: PlanTier;
  name: string;
  /** Short card blurb. */
  summary: string;
  /** Lead paragraph shown under the H1. */
  lead: string;
  seoTitle: string;
  metaDescription: string;
  category: CategoryId;
  keywords: string[];
  related: string[];
  guides: string[];
  featured?: boolean;
};

export const categories: { id: CategoryId; name: string; description: string }[] = [
  {
    id: "counting",
    name: "Counting & analysis",
    description: "Measure words, characters, paragraphs and reading time with transparent, documented rules.",
  },
  {
    id: "goals",
    name: "Writing goals",
    description: "Set a target, watch your progress and get a realistic estimate of how long is left.",
  },
  {
    id: "cleanup",
    name: "Cleanup & formatting",
    description: "Fix capitalization and strip repeated lines from lists, data and notes in one click.",
  },
  {
    id: "review",
    name: "Editing & review",
    description: "See exactly what changed between two drafts, word by word or line by line.",
  },
];

export const tools: ToolMeta[] = [
  {
    slug: "word-counter",
    processing: "local",
    tier: "free",
    name: "Word Counter",
    summary: "Live word, character, sentence and paragraph counts with reading and speaking time.",
    lead: "Paste or type your text to see live word, character, sentence and paragraph counts, plus how long it takes to read and to say out loud.",
    seoTitle: "Word Counter: Count Words, Characters & Sentences",
    metaDescription:
      "Free online word counter. See live word, character, sentence and paragraph counts plus reading and speaking time. Runs in your browser with nothing uploaded.",
    category: "counting",
    keywords: ["word count", "count words", "essay", "characters", "sentences", "reading time"],
    related: ["character-counter", "essay-word-goal-tracker", "reading-time-calculator", "paragraph-counter"],
    guides: ["how-to-count-words-in-an-essay", "word-count-vs-character-count"],
    featured: true,
  },
  {
    slug: "character-counter",
    processing: "local",
    tier: "free",
    name: "Character Counter",
    summary: "Count characters with or without spaces against a custom limit, with a live progress bar.",
    lead: "Count characters with and without spaces as you type, then set a limit for a bio, meta description, application field or post and watch how much room you have left.",
    seoTitle: "Character Counter with Custom Limits",
    metaDescription:
      "Count characters with and without spaces, set a custom character limit and track it with a live progress bar. Free, private and processed in your browser.",
    category: "counting",
    keywords: ["character count", "letters", "limit", "bio", "meta description", "characters without spaces"],
    related: ["word-counter", "case-converter", "paragraph-counter"],
    guides: ["word-count-vs-character-count"],
    featured: true,
  },
  {
    slug: "reading-time-calculator",
    processing: "local",
    tier: "free",
    name: "Reading Time Calculator",
    summary: "Estimate how long any text takes to read at a speed you choose.",
    lead: "Find out how long a piece of writing takes to read. Pick a reading speed that matches your audience and get an estimate in minutes and seconds.",
    seoTitle: "Reading Time Calculator: How Long to Read Any Text",
    metaDescription:
      "Estimate how long a text takes to read. Adjust the reading speed in words per minute and get an instant estimate. Free, with no sign-up and no uploads.",
    category: "counting",
    keywords: ["reading time", "minutes to read", "words per minute", "wpm", "read aloud", "speech"],
    related: ["word-counter", "paragraph-counter", "essay-word-goal-tracker"],
    guides: ["how-long-does-it-take-to-read-1000-words"],
  },
  {
    slug: "essay-word-goal-tracker",
    processing: "local",
    tier: "free",
    name: "Essay Word Goal Tracker",
    summary: "Set a word target and track progress, words remaining and time to finish.",
    lead: "Set a word target for your essay, assignment or chapter, then write or paste your draft to see your progress, how many words remain and a realistic time-to-finish estimate.",
    seoTitle: "Essay Word Goal Tracker: Track Your Progress",
    metaDescription:
      "Set an essay word target and track your progress live: completion percentage, words remaining, a progress bar and an estimate of how long until you finish.",
    category: "goals",
    keywords: ["essay", "word goal", "target", "progress", "assignment", "dissertation", "nanowrimo"],
    related: ["word-counter", "paragraph-counter", "reading-time-calculator"],
    guides: ["how-to-count-words-in-an-essay", "how-to-improve-essay-writing"],
    featured: true,
  },
  {
    slug: "remove-duplicate-lines",
    processing: "local",
    tier: "free",
    name: "Remove Duplicate Lines",
    summary: "Delete repeated lines while keeping the first occurrence and the original order.",
    lead: "Paste a list, a column of data or any multi-line text and remove repeated lines instantly. The first occurrence of each line stays in its original position.",
    seoTitle: "Remove Duplicate Lines from Text or Lists",
    metaDescription:
      "Remove duplicate lines from any list or text while keeping the first occurrence and original order. Ignore case or remove empty lines. Free and private.",
    category: "cleanup",
    keywords: ["duplicate lines", "dedupe", "unique lines", "list", "emails", "clean list"],
    related: ["case-converter", "text-compare", "character-counter"],
    guides: [],
  },
  {
    slug: "case-converter",
    processing: "local",
    tier: "free",
    name: "Case Converter",
    summary: "Switch text between UPPERCASE, lowercase, Title Case, Sentence case and more.",
    lead: "Convert text between UPPERCASE, lowercase, Title Case, Sentence case and Capitalized Case. Useful for headings, references, accidental caps lock and tidy formatting.",
    seoTitle: "Case Converter: Title Case, Sentence Case & More",
    metaDescription:
      "Convert text to UPPERCASE, lowercase, Title Case, Sentence case or Capitalized Case instantly. Copy the result in one click. Free and runs in your browser.",
    category: "cleanup",
    keywords: ["title case", "sentence case", "uppercase", "lowercase", "capitalize", "caps lock"],
    related: ["remove-duplicate-lines", "word-counter", "character-counter"],
    guides: ["how-to-improve-essay-writing"],
    featured: true,
  },
  {
    slug: "paragraph-counter",
    processing: "local",
    tier: "free",
    name: "Paragraph Counter",
    summary: "Count paragraphs and spot overly long ones with per-paragraph statistics.",
    lead: "Count paragraphs and see how your text is structured: words per paragraph, sentence length and a paragraph-by-paragraph breakdown that flags blocks that may be too long.",
    seoTitle: "Paragraph Counter with Per-Paragraph Statistics",
    metaDescription:
      "Count paragraphs, words and characters and see average words per paragraph, sentence length and a breakdown that flags long paragraphs. Free and private.",
    category: "counting",
    keywords: ["paragraph count", "paragraphs", "structure", "average words per paragraph", "readability"],
    related: ["word-counter", "essay-word-goal-tracker", "reading-time-calculator"],
    guides: ["how-to-improve-essay-writing", "how-to-count-words-in-an-essay"],
  },
  {
    slug: "text-compare",
    processing: "local",
    tier: "free",
    name: "Text Compare",
    summary: "Compare two versions of a text and highlight every addition and deletion.",
    lead: "Paste an original and a revised version to see exactly what changed. Additions and deletions are highlighted word by word or line by line, with summary statistics.",
    seoTitle: "Text Compare: Highlight Differences Between Two Texts",
    metaDescription:
      "Compare two texts and highlight added and removed words or lines, with difference statistics and a similarity score. Free, private and processed in your browser.",
    category: "review",
    keywords: ["diff", "compare text", "difference", "revision", "changes", "drafts"],
    related: ["remove-duplicate-lines", "word-counter", "case-converter"],
    guides: ["how-to-improve-essay-writing"],
    featured: true,
  },
];

export function getTool(slug: string): ToolMeta {
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) throw new Error(`Unknown tool: ${slug}`);
  return tool;
}

export const toolPath = (slug: string) => `/tools/${slug}`;

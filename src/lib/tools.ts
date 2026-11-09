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
    name: "Count & analyze",
    description: "Words, characters, paragraphs, reading time and word frequency, with documented counting rules.",
  },
  {
    id: "goals",
    name: "Limits & goals",
    description: "Check essays and applications against word and character limits, and track progress to a target.",
  },
  {
    id: "cleanup",
    name: "Clean up & organize",
    description: "Tidy pasted text, remove repeated lines, sort lists and fix capitalization.",
  },
  {
    id: "review",
    name: "Edit & compare",
    description: "Replace words across a whole text and see exactly what changed between two drafts.",
  },
];

/** Everyday jobs mapped to the tool that does them. Used for task-based discovery. */
export const tasks: { label: string; slug: string }[] = [
  { label: "Check an essay against a word limit", slug: "word-counter" },
  { label: "Check a UCAS personal statement", slug: "application-limit-checker" },
  { label: "Fit text into a character limit", slug: "character-counter" },
  { label: "Remove duplicate email addresses", slug: "remove-duplicate-lines" },
  { label: "Fix text copied from a PDF", slug: "text-cleaner" },
  { label: "Put a list in alphabetical order", slug: "sort-lines" },
  { label: "Replace a word everywhere", slug: "find-and-replace" },
  { label: "See what changed between two drafts", slug: "text-compare" },
  { label: "Find words you repeat too often", slug: "word-frequency-counter" },
  { label: "Turn a heading into Title Case", slug: "case-converter" },
];

/** The tools featured first on the homepage: chosen for the most common writing tasks, not from usage data. */
export const startHere = ["word-counter", "character-counter", "application-limit-checker", "remove-duplicate-lines", "text-cleaner", "text-compare"];

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
    related: ["character-counter", "essay-word-goal-tracker", "word-frequency-counter", "application-limit-checker"],
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
    related: ["application-limit-checker", "word-counter", "text-cleaner"],
    guides: ["word-count-vs-character-count", "how-to-check-your-ucas-personal-statement-character-count"],
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
    related: ["word-counter", "application-limit-checker", "paragraph-counter"],
    guides: ["how-to-count-words-in-an-essay", "how-to-improve-essay-writing"],
    featured: true,
  },
  {
    slug: "remove-duplicate-lines",
    processing: "local",
    tier: "free",
    name: "Remove Duplicate Lines",
    summary: "Remove repeated lines, or list only the duplicates or only the unique lines, with counts.",
    lead: "Paste a list, such as email addresses, names or a spreadsheet column, and remove repeated lines. Choose which copy to keep, see how often each line repeats, and keep the original order.",
    seoTitle: "Remove Duplicate Lines: Dedupe Lists & Emails",
    metaDescription:
      "Remove duplicate lines from lists and email addresses. Keep the first or last copy, show only duplicates or unique lines, see counts, then copy or download. Private.",
    category: "cleanup",
    keywords: ["duplicate lines", "dedupe", "unique lines", "list", "emails", "email addresses", "clean list", "duplicates"],
    related: ["text-cleaner", "sort-lines", "case-converter", "text-compare"],
    guides: ["how-to-remove-duplicate-lines-from-a-list"],
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
    related: ["text-cleaner", "find-and-replace", "sort-lines"],
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
    related: ["word-counter", "word-frequency-counter", "essay-word-goal-tracker"],
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
    related: ["find-and-replace", "word-counter", "remove-duplicate-lines"],
    guides: ["how-to-improve-essay-writing"],
    featured: true,
  },
  {
    slug: "text-cleaner",
    processing: "local",
    tier: "free",
    name: "Text Cleaner",
    summary: "Fix messy pasted text: extra spaces, blank lines, broken PDF line wraps and invisible characters.",
    lead: "Clean up text copied from PDFs, emails and web pages. Pick exactly which fixes to apply, check the preview, then copy or download the result.",
    seoTitle: "Text Cleaner: Remove Extra Spaces & Line Breaks",
    metaDescription:
      "Clean up pasted text: remove extra spaces and blank lines, join lines broken by PDFs and strip invisible characters. Preview every change. Runs in your browser.",
    category: "cleanup",
    keywords: ["clean text", "remove extra spaces", "remove line breaks", "pdf", "blank lines", "invisible characters", "tabs"],
    related: ["remove-duplicate-lines", "find-and-replace", "sort-lines", "word-counter"],
    guides: ["how-to-clean-text-copied-from-a-pdf"],
  },
  {
    slug: "sort-lines",
    processing: "local",
    tier: "free",
    name: "Sort Lines",
    summary: "Sort a list A–Z, Z–A, in natural number order or by length, or reverse it.",
    lead: "Put any list in alphabetical order, sort numbers naturally so item 2 comes before item 10, order by length or simply reverse it.",
    seoTitle: "Sort Lines Alphabetically: A–Z, Natural & by Length",
    metaDescription:
      "Sort a list of lines alphabetically A–Z or Z–A, in natural number order, by length or in reverse. Case-sensitive option, copy and download. Free and private.",
    category: "cleanup",
    keywords: ["sort", "alphabetical order", "alphabetize", "a-z", "natural sort", "list", "reverse"],
    related: ["remove-duplicate-lines", "text-cleaner", "case-converter"],
    guides: ["how-to-remove-duplicate-lines-from-a-list"],
  },
  {
    slug: "find-and-replace",
    processing: "local",
    tier: "free",
    name: "Find and Replace",
    summary: "Replace a word or phrase everywhere in a text, with whole-word, case and regex options.",
    lead: "Replace a word, name or phrase across a whole text at once. Preview every match first, and undo if you change your mind.",
    seoTitle: "Find and Replace Text Online (with Regex Option)",
    metaDescription:
      "Find and replace words in any text: case-sensitive and whole-word matching, replace all or first, optional regular expressions, match count and undo. Private.",
    category: "review",
    keywords: ["find and replace", "replace words", "bulk replace", "regex", "search and replace", "substitute"],
    related: ["text-cleaner", "text-compare", "case-converter"],
    guides: ["how-to-improve-essay-writing"],
  },
  {
    slug: "word-frequency-counter",
    processing: "local",
    tier: "free",
    name: "Word Frequency Counter",
    summary: "See how often every word appears, as a sortable table you can export to CSV.",
    lead: "Count how often each word appears in your text. Spot repetition, check key terms and export the full table as a CSV file.",
    seoTitle: "Word Frequency Counter: Count Repeated Words",
    metaDescription:
      "Count how many times each word appears in a text. Sort by frequency or A–Z, hide common words, see percentages and export to CSV. Free, runs in your browser.",
    category: "counting",
    keywords: ["word frequency", "repeated words", "how many times", "word density", "csv", "most common words"],
    related: ["word-counter", "find-and-replace", "paragraph-counter"],
    guides: ["how-to-improve-essay-writing"],
  },
  {
    slug: "application-limit-checker",
    processing: "local",
    tier: "free",
    name: "Application Limit Checker",
    summary: "Check a UCAS personal statement, a Common App essay or any custom word or character limit.",
    lead: "Check your application writing against its limit before you paste it in: all three UCAS answers and the 4,000-character total, the Common App essay, or any custom limit.",
    seoTitle: "UCAS & Common App Limit Checker: Characters & Words",
    metaDescription:
      "Check a UCAS personal statement (three answers, 4,000 characters, 350 minimum each), a Common App essay or any custom word or character limit. Free and private.",
    category: "goals",
    keywords: ["ucas", "personal statement", "common app", "college essay", "application", "character limit", "word limit", "4000 characters"],
    related: ["character-counter", "word-counter", "essay-word-goal-tracker"],
    guides: ["how-to-check-your-ucas-personal-statement-character-count", "word-count-vs-character-count"],
  },
];

export function getTool(slug: string): ToolMeta {
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) throw new Error(`Unknown tool: ${slug}`);
  return tool;
}

export const toolPath = (slug: string) => `/tools/${slug}`;

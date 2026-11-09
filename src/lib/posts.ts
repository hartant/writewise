export type PostMeta = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  excerpt: string;
  published: string;
  modified: string;
  readingMinutes: number;
  tag: string;
  relatedTools: string[];
};

// Display order on /blog and the homepage.
export const posts: PostMeta[] = [
  {
    slug: "how-to-count-words-in-an-essay",
    title: "How to Count Words in an Essay (and What Actually Counts)",
    seoTitle: "How to Count Words in an Essay: What Counts",
    description:
      "What counts toward an essay word limit, how Word and Google Docs count, how to handle citations, headings and hyphens, and how to stay within the allowed range.",
    excerpt:
      "Titles, references, in-text citations, hyphenated words: here is what usually counts toward a word limit, and how to check before you submit.",
    published: "2026-11-09",
    modified: "2026-11-09",
    readingMinutes: 8,
    tag: "Essays",
    relatedTools: ["word-counter", "essay-word-goal-tracker", "paragraph-counter"],
  },
  {
    slug: "how-to-improve-essay-writing",
    title: "How to Improve Your Essay Writing: A Practical Revision Guide",
    seoTitle: "How to Improve Essay Writing: A Revision Guide",
    description:
      "A step-by-step approach to stronger essays: sharpening your thesis, structuring paragraphs, using evidence well, cutting filler words and revising in focused passes.",
    excerpt:
      "Better essays come from better revision. A pass-by-pass method for argument, structure, evidence and sentence-level clarity.",
    published: "2026-11-09",
    modified: "2026-11-09",
    readingMinutes: 10,
    tag: "Writing skills",
    relatedTools: ["paragraph-counter", "text-compare", "essay-word-goal-tracker"],
  },
  {
    slug: "how-long-does-it-take-to-read-1000-words",
    title: "How Long Does It Take to Read 1,000 Words?",
    seoTitle: "How Long Does It Take to Read 1,000 Words?",
    description:
      "Roughly four minutes for most adults reading silently, but it depends. Reading and speaking times for common word counts, and what changes the estimate.",
    excerpt:
      "About four minutes of silent reading for a typical adult, and around seven minutes to say out loud. Here is where those numbers come from.",
    published: "2026-11-09",
    modified: "2026-11-09",
    readingMinutes: 6,
    tag: "Reading",
    relatedTools: ["reading-time-calculator", "word-counter"],
  },
  {
    slug: "word-count-vs-character-count",
    title: "Word Count vs. Character Count: Which Limit Matters When?",
    seoTitle: "Word Count vs. Character Count: Key Differences",
    description:
      "How word counts and character counts differ, why spaces and emoji change results, and which limit applies to essays, applications, meta descriptions and social posts.",
    excerpt:
      "Essays usually limit words; forms and platforms usually limit characters. How each is measured, and how to convert between them.",
    published: "2026-11-09",
    modified: "2026-11-09",
    readingMinutes: 7,
    tag: "Basics",
    relatedTools: ["character-counter", "word-counter"],
  },
];

export function getPost(slug: string): PostMeta | undefined {
  return posts.find((p) => p.slug === slug);
}

export const postPath = (slug: string) => `/blog/${slug}`;

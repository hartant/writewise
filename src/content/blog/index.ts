import type { ComponentType } from "react";
import type { FaqItem } from "@/components/faq";
import * as countWords from "./how-to-count-words-in-an-essay";
import * as improveEssay from "./how-to-improve-essay-writing";
import * as readingTime from "./how-long-does-it-take-to-read-1000-words";
import * as wordVsChar from "./word-count-vs-character-count";

export const articles: Record<string, { Article: ComponentType; faqs: FaqItem[] }> = {
  "how-to-count-words-in-an-essay": countWords,
  "how-to-improve-essay-writing": improveEssay,
  "how-long-does-it-take-to-read-1000-words": readingTime,
  "word-count-vs-character-count": wordVsChar,
};

import type { ComponentType } from "react";
import type { FaqItem } from "@/components/faq";
import * as countWords from "./how-to-count-words-in-an-essay";
import * as improveEssay from "./how-to-improve-essay-writing";
import * as readingTime from "./how-long-does-it-take-to-read-1000-words";
import * as wordVsChar from "./word-count-vs-character-count";
import * as ucas from "./how-to-check-your-ucas-personal-statement-character-count";
import * as pdf from "./how-to-clean-text-copied-from-a-pdf";
import * as duplicates from "./how-to-remove-duplicate-lines-from-a-list";

export const articles: Record<string, { Article: ComponentType; faqs: FaqItem[] }> = {
  "how-to-count-words-in-an-essay": countWords,
  "how-to-improve-essay-writing": improveEssay,
  "how-long-does-it-take-to-read-1000-words": readingTime,
  "word-count-vs-character-count": wordVsChar,
  "how-to-check-your-ucas-personal-statement-character-count": ucas,
  "how-to-clean-text-copied-from-a-pdf": pdf,
  "how-to-remove-duplicate-lines-from-a-list": duplicates,
};

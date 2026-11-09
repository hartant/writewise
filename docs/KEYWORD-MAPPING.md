# Keyword mapping

One primary search intent per page. Phrases are seed hypotheses (see KEYWORD-RESEARCH.md for which were observed); none
include volume data. When two phrases share an intent, they map to the **same** page, and no near-duplicate pages are
created.

| Page | Primary intent | Main phrase (hypothesis) | Supporting phrases on the same page | Markets |
| --- | --- | --- | --- | --- |
| `/` | Find a free, private writing tool and count text now | free word counter and writing tools | online word counter, writing tools | US, UK, CA |
| `/tools` | Browse all tools by task | free writing tools | text tools online | US, UK, CA |
| `/tools/word-counter` | Count words in a text | word counter | online word counter, essay word counter, count words in essay, word count checker | US, UK, CA |
| `/tools/character-counter` | Count characters against a limit | character counter | character count online, character counter with spaces, character limit checker | US, UK, CA |
| `/tools/reading-time-calculator` | Estimate reading time | reading time calculator | words per minute calculator, how long to read | US, UK, CA |
| `/tools/essay-word-goal-tracker` | Track progress to an essay target | essay word count goal | word count tracker, essay progress | US, UK, CA |
| `/tools/application-limit-checker` | Check an application answer against its limit | UCAS personal statement character counter | Common App essay word counter, personal statement character count, application word limit checker | UK (UCAS), US (Common App), CA (custom limits) |
| `/tools/remove-duplicate-lines` | Remove repeated lines from a list | remove duplicate lines | duplicate line remover, remove duplicate email addresses, remove duplicates from list | US, UK, CA |
| `/tools/text-cleaner` | Fix messy pasted text | clean up text online | remove extra spaces, remove blank lines, remove line breaks | US, UK, CA |
| `/tools/sort-lines` | Sort a list | sort lines alphabetically | alphabetical order tool, sort list online, alphabetize list | US, UK, CA |
| `/tools/case-converter` | Change text case | case converter | title case converter, sentence case, capitalize | US, UK, CA |
| `/tools/paragraph-counter` | Count paragraphs and check structure | paragraph counter | how many paragraphs, words per paragraph | US, UK, CA |
| `/tools/find-and-replace` | Replace words in a text | find and replace text online | replace words in text, bulk text replacement, regex replace | US, UK, CA |
| `/tools/word-frequency-counter` | Count repeated words | word frequency counter | most common words, repeated words checker | US, UK, CA |
| `/tools/text-compare` | Compare two texts | text compare | compare two texts, difference checker, compare documents | US, UK, CA |
| `/blog/how-to-count-words-in-an-essay` | What counts toward a word limit | how to count words in an essay | does the bibliography count, do citations count | US, UK, CA |
| `/blog/how-to-improve-essay-writing` | Improve an essay through revision | how to improve essay writing | essay revision tips | US, UK, CA |
| `/blog/how-long-does-it-take-to-read-1000-words` | Reading/speaking time for a word count | how long to read 1000 words | how long is a 1000-word speech | US, UK, CA |
| `/blog/word-count-vs-character-count` | Understand the two kinds of limit | word count vs character count | do spaces count as characters | US, UK, CA |
| `/blog/how-to-check-your-ucas-personal-statement-character-count` | UCAS rules and how to check them | UCAS personal statement character count | UCAS 4000 characters, UCAS 350 minimum | UK |
| `/blog/how-to-clean-text-copied-from-a-pdf` | Fix PDF line breaks while keeping paragraphs | clean text copied from pdf | remove line breaks from pdf text | US, UK, CA |
| `/blog/how-to-remove-duplicate-lines-from-a-list` | Deduplicate lists and email lists | how to remove duplicate lines | remove duplicate email addresses, Excel/Sheets remove duplicates | US, UK, CA |

## Deliberately not created

| Candidate page | Reason |
| --- | --- |
| `/tools/essay-word-counter` | Same intent as the Word Counter, so it would be a near-duplicate. |
| `/tools/remove-duplicate-emails` | Same tool and intent as Remove Duplicate Lines; covered by its guide. |
| `/tools/ucas-…` and `/tools/common-app-…` as separate tools | One Application Limit Checker with modes serves both without thin pages. |
| `/blog/how-to-sort-a-list-alphabetically` | Would mostly repeat the Sort Lines page. |
| `/blog/how-to-check-a-common-app-essay-word-limit` | Deferred until the Common App limit is verified from an official source. |
| Country landing pages (`/uk`, `/canada`, …) | Would differ only by country name: doorway-style duplication. |

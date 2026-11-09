"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { convertCase, type CaseMode } from "@/lib/text/case";
import { countCharacters, countWords } from "@/lib/text/stats";
import { CopyButton, fmt, Paper } from "./ui";

const MODES: { id: CaseMode; label: string; example: string }[] = [
  { id: "sentence", label: "Sentence case", example: "A tale of two cities" },
  { id: "title", label: "Title Case", example: "A Tale of Two Cities" },
  { id: "upper", label: "UPPERCASE", example: "A TALE OF TWO CITIES" },
  { id: "lower", label: "lowercase", example: "a tale of two cities" },
  { id: "capitalized", label: "Capitalized Case", example: "A Tale Of Two Cities" },
];

export function CaseConverter() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<CaseMode>("title");
  const deferred = useDeferredValue(text);
  const output = useMemo(() => convertCase(deferred, mode), [deferred, mode]);

  return (
    <div className="space-y-6">
      <div className="seg" role="radiogroup" aria-label="Choose a case">
        {MODES.map((m) => (
          <button key={m.id} type="button" role="radio" aria-checked={mode === m.id} onClick={() => setMode(m.id)} title={m.example}>
            {m.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Paper
          id="case-input"
          label="Original text"
          value={text}
          onChange={setText}
          placeholder="Type or paste text, then pick a case above…"
          rows={12}
          sample={"the importance of being earnest: a trivial comedy for serious people\ni think NASA's new mission is exciting. what do you think?"}
          footer={
            <span>
              {fmt(countWords(deferred))} words · {fmt(countCharacters(deferred))} characters
            </span>
          }
        />
        <Paper
          id="case-output"
          label={`Result: ${MODES.find((m) => m.id === mode)?.label}`}
          value={output}
          readOnly
          rows={12}
          placeholder="Your converted text appears here."
          actions={<CopyButton getText={() => output} label="Copy" variant="primary" disabled={!output} />}
          footer={<span>Acronyms such as NASA and words like iPhone keep their capitals.</span>}
        />
      </div>
      <button type="button" className="btn btn-secondary" onClick={() => setText(output)} disabled={!output || output === text}>
        Use result as new input
      </button>
    </div>
  );
}

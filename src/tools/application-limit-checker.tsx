"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, ExternalLink } from "lucide-react";
import { checkRange, checkUcas, COMMON_APP, countForLimit, UCAS, type RangeCheck } from "@/lib/text/app-limits";
import { CopyButton, fmt, Paper, ProgressBar, Segmented, Toggle } from "./ui";

type Mode = "ucas" | "commonapp" | "words" | "characters";

const dateFmt = (iso: string) =>
  new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(new Date(iso));

export function ApplicationLimitChecker() {
  const [mode, setMode] = useState<Mode>("ucas");
  return (
    <div className="space-y-6">
      <Segmented
        label="What are you checking?"
        value={mode}
        onChange={setMode}
        options={[
          { value: "ucas", label: "UCAS personal statement" },
          { value: "commonapp", label: "Common App essay" },
          { value: "words", label: "Custom word limit" },
          { value: "characters", label: "Custom character limit" },
        ]}
      />
      {mode === "ucas" && <UcasChecker />}
      {mode === "commonapp" && <CommonAppChecker />}
      {mode === "words" && <CustomChecker unit="words" />}
      {mode === "characters" && <CustomChecker unit="characters" />}
      <p className="text-sm leading-6 text-muted">
        WriteWise is independent and isn&apos;t affiliated with UCAS, Common App or any university. The counter in the official
        application is always the final authority.
      </p>
    </div>
  );
}

function UcasChecker() {
  const [answers, setAnswers] = useState(["", "", ""]);
  const deferred = useDeferredValue(answers);
  const check = useMemo(() => checkUcas(deferred), [deferred]);
  const pct = (check.total / UCAS.maxTotal) * 100;

  return (
    <div className="space-y-6">
      <div className="card p-4 sm:p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p className="text-[0.95rem] text-ink-2">
            Total, including spaces and line breaks
          </p>
          <p className={`font-mono text-2xl ${check.overBy ? "text-bad" : "text-accent-text"}`} aria-live="polite">
            {fmt(check.total)} / {fmt(UCAS.maxTotal)}
          </p>
        </div>
        <div className="mt-3">
          <ProgressBar value={pct} tone={check.overBy ? "bad" : pct >= 95 ? "warn" : "accent"} label="Characters used of the 4,000 limit" />
        </div>
        <p className={`mt-3 flex items-start gap-2 text-[0.95rem] ${check.ready ? "text-ok" : check.overBy ? "text-bad" : "text-ink-2"}`}>
          {check.ready ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /> : <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />}
          {check.overBy
            ? `${fmt(check.overBy)} characters over the 4,000 limit. Trim before you paste it into UCAS.`
            : check.ready
              ? `All three answers meet the 350-character minimum, with ${fmt(check.remaining)} characters to spare.`
              : `${fmt(check.remaining)} characters left to share between your answers. Each answer needs at least ${UCAS.minPerAnswer}.`}
        </p>
      </div>

      {UCAS.questions.map((q, i) => {
        const a = check.answers[i];
        return (
          <Paper
            key={q}
            id={`ucas-${i}`}
            label={`Question ${i + 1}: ${q}`}
            value={answers[i]}
            onChange={(v) => setAnswers((s) => s.map((x, j) => (j === i ? v : x)))}
            rows={7}
            placeholder="Paste or write your answer…"
            corner={`${fmt(a.characters)} chars`}
            footer={
              <span className={a.belowMinimum && a.characters > 0 ? "text-warn" : a.characters >= UCAS.minPerAnswer ? "text-ok" : ""}>
                {a.characters === 0
                  ? `Minimum ${UCAS.minPerAnswer} characters for this answer.`
                  : a.belowMinimum
                    ? `${fmt(a.shortBy)} more characters needed to reach the ${UCAS.minPerAnswer}-character minimum.`
                    : `Meets the ${UCAS.minPerAnswer}-character minimum.`}
              </span>
            }
          />
        );
      })}

      <div className="flex flex-wrap gap-2">
        <CopyButton
          getText={() => UCAS.questions.map((q, i) => `${q}\n\n${answers[i]}`).join("\n\n")}
          label="Copy all three answers"
          disabled={answers.every((a) => !a)}
        />
      </div>

      <Sources
        verified
        date={UCAS.lastVerified}
        sources={UCAS.sources}
        note="For 2026 entry onwards, UCAS asks three questions instead of one free-form statement. The three answers are read together as one statement, so you can share the 4,000 characters between them however suits your course. The question text itself doesn't count toward the limit."
      />
    </div>
  );
}

function CommonAppChecker() {
  const [text, setText] = useState("");
  const [min, setMin] = useState(String(COMMON_APP.minWords));
  const [max, setMax] = useState(String(COMMON_APP.maxWords));
  const deferred = useDeferredValue(text);
  const words = useMemo(() => countForLimit(deferred, "words"), [deferred]);
  const minN = toLimit(min);
  const maxN = toLimit(max);
  const check = checkRange(words, minN, maxN);

  return (
    <div className="space-y-6">
      <div className="flex gap-3 border-l-2 border-warn bg-warn-soft p-4 text-[0.95rem] leading-6 text-ink-2">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-warn" aria-hidden="true" />
        <p>
          <strong className="text-ink">Check this range in your Common App account.</strong> The {COMMON_APP.minWords}–{COMMON_APP.maxWords}
          -word range below is the long-standing limit for the personal essay, but we couldn&apos;t confirm it on an official public Common
          App page when this tool was last checked ({dateFmt(COMMON_APP.lastChecked)}). The word limit shown in the writing section of the
          application is the one that applies. Colleges set their own limits for supplemental essays, so you can edit the numbers.
        </p>
      </div>
      <LimitInputs min={min} max={max} setMin={setMin} setMax={setMax} unitLabel="words" />
      <Result check={check} min={minN} max={maxN} unit="words" />
      <Paper id="ca-essay" label="Your essay" value={text} onChange={setText} rows={14} placeholder="Paste your essay…" corner={`${fmt(words)} words`} />
      <Sources verified={false} date={COMMON_APP.lastChecked} sources={COMMON_APP.sources} note="Common App's word counter may differ by a word or two from ours on hyphens, dashes and symbols." />
    </div>
  );
}

function CustomChecker({ unit }: { unit: "words" | "characters" }) {
  const [text, setText] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState(unit === "words" ? "500" : "1500");
  const [spaces, setSpaces] = useState(true);
  const deferred = useDeferredValue(text);
  const countUnit = unit === "words" ? "words" : spaces ? "characters" : "characters-no-spaces";
  const value = useMemo(() => countForLimit(deferred, countUnit), [deferred, countUnit]);
  const minN = toLimit(min);
  const maxN = toLimit(max);

  return (
    <div className="space-y-6">
      <p className="max-w-3xl text-[0.95rem] leading-6 text-ink-2">
        Use this for any application with its own limit: Canadian university supplementary applications, scholarship forms, job
        portals or US supplemental essays. Copy the numbers exactly as the instructions state them.
      </p>
      <div className="flex flex-wrap items-end gap-6">
        <LimitInputs min={min} max={max} setMin={setMin} setMax={setMax} unitLabel={unit} />
        {unit === "characters" && (
          <div className="min-w-64">
            <Toggle label="Count spaces" hint="Most online forms count spaces" checked={spaces} onChange={setSpaces} />
          </div>
        )}
      </div>
      <Result check={checkRange(value, minN, maxN)} min={minN} max={maxN} unit={unit} />
      <Paper id={`custom-${unit}`} label="Your answer" value={text} onChange={setText} rows={12} placeholder="Paste your answer…" corner={`${fmt(value)} ${unit}`} />
    </div>
  );
}

function toLimit(raw: string): number | null {
  const n = Math.floor(Number(raw));
  return raw.trim() !== "" && Number.isFinite(n) && n > 0 ? n : null;
}

function LimitInputs({ min, max, setMin, setMax, unitLabel }: { min: string; max: string; setMin: (v: string) => void; setMax: (v: string) => void; unitLabel: string }) {
  return (
    <div className="flex flex-wrap gap-4">
      <label className="text-[0.95rem] font-bold text-ink">
        Minimum {unitLabel} <span className="font-normal text-muted">(optional)</span>
        <input type="number" inputMode="numeric" min={1} value={min} onChange={(e) => setMin(e.target.value)} className="field mt-1 block w-36 font-mono" />
      </label>
      <label className="text-[0.95rem] font-bold text-ink">
        Maximum {unitLabel}
        <input type="number" inputMode="numeric" min={1} value={max} onChange={(e) => setMax(e.target.value)} className="field mt-1 block w-36 font-mono" />
      </label>
    </div>
  );
}

function Result({ check, min, max, unit }: { check: RangeCheck; min: number | null; max: number | null; unit: string }) {
  const tone = check.status === "over" ? "text-bad" : check.status === "ok" ? "text-ok" : "text-ink-2";
  const message = {
    empty: `Paste your text to check it${max ? ` against the ${fmt(max)}-${unit.replace(/s$/, "")} limit` : ""}.`,
    under: `${fmt(check.delta)} ${unit} below the ${fmt(min ?? 0)} minimum.`,
    ok: max ? `Within the limit, with ${fmt(check.delta)} ${unit} to spare.` : "Meets the minimum.",
    over: `${fmt(check.delta)} ${unit} over the ${fmt(max ?? 0)} limit.`,
  }[check.status];
  return (
    <div className="card p-4 sm:p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className={`text-[0.95rem] ${tone}`} aria-live="polite">
          {message}
        </p>
        <p className="font-mono text-2xl text-accent-text">
          {fmt(check.value)}
          {max ? ` / ${fmt(max)}` : ""}
        </p>
      </div>
      {max && (
        <div className="mt-3">
          <ProgressBar value={(check.value / max) * 100} tone={check.status === "over" ? "bad" : check.status === "ok" ? "ok" : "accent"} label={`${unit} used of limit`} />
        </div>
      )}
    </div>
  );
}

function Sources({ verified, date, sources, note }: { verified: boolean; date: string; sources: readonly { label: string; url: string }[]; note: string }) {
  return (
    <div className="border-t border-line pt-4 text-[0.95rem] leading-6 text-ink-2">
      <p>{note}</p>
      <p className="mt-2 text-sm text-muted">
        {verified ? "Last verified" : "Last checked (not verified)"}: {dateFmt(date)}. Source:{" "}
        {sources.map((s) => (
          <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="pencil-link inline-flex items-center gap-1 text-ink">
            {s.label}
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        ))}
      </p>
    </div>
  );
}

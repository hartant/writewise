"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, Copy, Download, Eraser, Sparkles } from "lucide-react";

/** Copies text to the clipboard, with a fallback for browsers without the async API. */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through */
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

/** Saves text as a file. Built locally with a Blob, so nothing is uploaded. */
export function downloadText(filename: string, text: string, mime = "text/plain") {
  // A byte-order mark helps Excel open UTF-8 CSV files with accented characters intact.
  const body = mime === "text/csv" ? "\uFEFF" + text : text;
  const url = URL.createObjectURL(new Blob([body], { type: `${mime};charset=utf-8` }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function DownloadButton({
  filename,
  getText,
  label = "Download .txt",
  mime,
  disabled,
}: {
  filename: string;
  getText: () => string;
  label?: string;
  mime?: string;
  disabled?: boolean;
}) {
  return (
    <button type="button" className="btn btn-secondary" onClick={() => downloadText(filename, getText(), mime)} disabled={disabled}>
      <Download className="h-4 w-4" aria-hidden="true" />
      {label}
    </button>
  );
}

/**
 * A row of mutually exclusive options with radio semantics: Tab focuses the group,
 * arrow keys move the selection (WAI-ARIA radio group pattern).
 */
export function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string; title?: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    if (!(e.key in keys)) return;
    e.preventDefault();
    const i = options.findIndex((o) => o.value === value);
    const next = options[(i + keys[e.key] + options.length) % options.length];
    onChange(next.value);
    const btn = e.currentTarget.querySelector<HTMLButtonElement>(`[data-value="${CSS.escape(next.value)}"]`);
    btn?.focus();
  }
  return (
    <div className="seg" role="radiogroup" aria-label={label} onKeyDown={onKeyDown}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          data-value={o.value}
          aria-checked={value === o.value}
          tabIndex={value === o.value ? 0 : -1}
          title={o.title}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** A labelled on/off switch with an optional explanation underneath. */
export function Toggle({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-start justify-between gap-3 py-1.5">
      <span>
        <span className="block text-[0.95rem] font-bold text-ink">{label}</span>
        {hint && <span className="block text-sm leading-5 text-muted">{hint}</span>}
      </span>
      <input type="checkbox" className="toggle mt-1" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    </label>
  );
}

export function CopyButton({
  getText,
  label = "Copy",
  variant = "secondary",
  disabled,
}: {
  getText: () => string;
  label?: string;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function onClick() {
    const ok = await copyText(getText());
    setState(ok ? "copied" : "failed");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), ok ? 1800 : 4000);
  }

  return (
    <button type="button" className={`btn btn-${variant}`} onClick={onClick} disabled={disabled}>
      {state === "copied" ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
      <span aria-live="polite">{state === "copied" ? "Copied" : state === "failed" ? "Copy blocked: select the text and press Ctrl+C" : label}</span>
    </button>
  );
}

/** A typed manuscript sheet: a label, quiet text actions, and the writing surface. */
export function Paper({
  id,
  label,
  value,
  onChange,
  placeholder,
  rows = 12,
  readOnly,
  actions,
  footer,
  sample,
  corner,
}: {
  id: string;
  label: string;
  value: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  rows?: number;
  readOnly?: boolean;
  actions?: ReactNode;
  footer?: ReactNode;
  /** Optional example text the user can load with one click. */
  sample?: string;
  /** Typed in the top-right corner, where a manuscript carries its word count. */
  corner?: ReactNode;
}) {
  return (
    <div className="card overflow-hidden">
      <div className="flex min-h-11 flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-line px-4 py-1.5 sm:px-6">
        <label htmlFor={id} className="text-sm font-bold text-ink">
          {label}
        </label>
        <div className="flex flex-wrap items-center gap-1">
          {sample && onChange && !value && (
            <button type="button" className="btn btn-ghost !min-h-8 !px-2 !py-1 text-sm" onClick={() => onChange(sample)}>
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Load an example
            </button>
          )}
          {actions}
          {onChange && !readOnly && value && (
            <button type="button" className="btn btn-ghost !min-h-8 !px-2 !py-1 text-sm" onClick={() => onChange("")}>
              <Eraser className="h-3.5 w-3.5" aria-hidden="true" />
              Clear
            </button>
          )}
          {corner && <span className="ml-2 font-mono text-sm text-muted">{corner}</span>}
        </div>
      </div>
      <textarea
        id={id}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        readOnly={readOnly}
        placeholder={placeholder}
        rows={rows}
        spellCheck={!readOnly}
        className="paper"
      />
      {footer && <div className="border-t border-line px-4 py-2 text-sm text-muted sm:px-6">{footer}</div>}
    </div>
  );
}

/** A margin note: a label and a typed number. `accent` marks the figure that matters most. */
export function Stat({ label, value, hint, accent }: { label: string; value: ReactNode; hint?: string; accent?: boolean }) {
  return (
    <div className={`note ${accent ? "is-key" : ""}`}>
      <dt>{label}</dt>
      <dd>{value}</dd>
      {hint && <p className="mt-0.5 text-xs text-muted">{hint}</p>}
    </div>
  );
}

export function StatGrid({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <dl className={`grid grid-cols-2 gap-x-6 gap-y-5 ${className}`}>{children}</dl>;
}

export function ProgressBar({ value, label, tone = "accent" }: { value: number; label: string; tone?: "accent" | "ok" | "warn" | "bad" }) {
  const pct = Math.max(0, Math.min(100, value));
  const colors = { accent: "bg-accent", ok: "bg-ok", warn: "bg-warn", bad: "bg-bad" } as const;
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      className="h-2 w-full overflow-hidden rounded-sm bg-surface-2"
    >
      <div className={`h-full transition-[width] duration-300 ease-out ${colors[tone]}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export const fmt = (n: number) => n.toLocaleString("en-US");

export const SAMPLE_ESSAY = `The library was quiet except for the hum of the old radiators. Maya opened her laptop, read the prompt again and typed a single sentence: "Technology has changed how students learn." It was true, but it wasn't an argument yet.

Good essays start with a claim someone could disagree with. Instead of saying that technology changed learning, Maya asked herself how it changed, for whom, and whether the change was worth it. Her new thesis read: "Instant access to information has made students faster researchers but less patient readers."

Now every paragraph had a job. One would show how search tools speed up research. Another would explore what happens to deep reading when every answer is a click away. The last would weigh the trade-off and suggest what students and teachers can do about it.

She checked her word count, set a goal of 1,200 words, and started writing.`;

"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, Info, Save } from "lucide-react";
import { countWords, formatDuration } from "@/lib/text/stats";
import { fmt, Paper, ProgressBar, Stat, StatGrid } from "./ui";

const TARGET_PRESETS = [250, 500, 1000, 1500, 2000, 3000, 5000];
const DRAFT_KEY = "ww-goal-draft";
const SETTINGS_KEY = "ww-goal-settings";

type Settings = { target: number; tolerance: number; pace: number; save: boolean };
const DEFAULTS: Settings = { target: 1000, tolerance: 10, pace: 500, save: false };

function safeGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function safeSet(key: string, value: string | null) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    /* storage unavailable */
  }
}

export function EssayWordGoalTracker() {
  const [text, setText] = useState("");
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [targetInput, setTargetInput] = useState(String(DEFAULTS.target));
  const [loaded, setLoaded] = useState(false);
  const deferred = useDeferredValue(text);
  const words = useMemo(() => countWords(deferred), [deferred]);

  // Live session pace: words added since the first edit in this visit.
  const session = useRef<{ start: number; words: number } | null>(null);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const raw = safeGet(SETTINGS_KEY);
    if (raw) {
      try {
        const s = { ...DEFAULTS, ...JSON.parse(raw) } as Settings;
        setSettings(s);
        setTargetInput(String(s.target));
        if (s.save) setText(safeGet(DRAFT_KEY) ?? "");
      } catch {
        /* ignore corrupt settings */
      }
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    safeSet(SETTINGS_KEY, settings.save ? JSON.stringify(settings) : null);
    if (!settings.save) safeSet(DRAFT_KEY, null);
  }, [settings, loaded]);

  useEffect(() => {
    if (!loaded || !settings.save) return;
    const t = setTimeout(() => safeSet(DRAFT_KEY, text), 400);
    return () => clearTimeout(t);
  }, [text, settings.save, loaded]);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 15000);
    return () => clearInterval(id);
  }, []);

  function onTextChange(value: string) {
    if (!session.current) session.current = { start: Date.now(), words };
    if (!value) session.current = null;
    setText(value);
    setNow(Date.now());
  }

  function update<K extends keyof Settings>(key: K, value: Settings[K]) {
    setSettings((s) => ({ ...s, [key]: value }));
  }

  function applyTarget(raw: string) {
    setTargetInput(raw);
    const n = Math.floor(Number(raw));
    if (Number.isFinite(n) && n > 0 && n <= 1_000_000) update("target", n);
  }

  const { target, tolerance, pace } = settings;
  const pct = target > 0 ? (words / target) * 100 : 0;
  const remaining = Math.max(0, target - words);
  const min = Math.ceil(target * (1 - tolerance / 100));
  const max = Math.floor(target * (1 + tolerance / 100));
  const status: "under" | "range" | "over" = words > max ? "over" : words >= min ? "range" : "under";

  const elapsedMin = session.current ? (now - session.current.start) / 60000 : 0;
  const added = session.current ? words - session.current.words : 0;
  const sessionPace = elapsedMin >= 2 && added >= 25 ? Math.round((added / elapsedMin) * 60) : null;
  const effectivePace = sessionPace ?? pace;
  const etaMinutes = effectivePace > 0 ? (remaining / effectivePace) * 60 : 0;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="space-y-4">
        <div className="card p-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm text-muted">Progress</p>
              <p className="mt-1 font-mono text-3xl font-semibold tabular-nums text-ink" aria-live="polite">
                {fmt(words)} <span className="text-lg text-muted">/ {fmt(target)} words</span>
              </p>
            </div>
            <p className="font-mono text-4xl text-accent-text">{Math.floor(pct)}%</p>
          </div>
          <div className="mt-4">
            <ProgressBar value={pct} tone={status === "over" ? "bad" : status === "range" ? "ok" : "accent"} label="Progress toward word goal" />
          </div>
          <p
            className={`mt-3 flex items-center gap-2 text-sm ${status === "over" ? "text-bad" : status === "range" ? "text-ok" : "text-muted"}`}
          >
            {status === "range" ? <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> : <Info className="h-4 w-4" aria-hidden="true" />}
            {status === "over"
              ? `Over the upper limit by ${fmt(words - max)} words. Time to trim.`
              : status === "range"
                ? tolerance > 0
                  ? `Within the allowed range (${fmt(min)}–${fmt(max)} words).`
                  : "Target reached exactly."
                : tolerance > 0
                  ? `${fmt(min - words)} words until the minimum of ${fmt(min)}.`
                  : `${fmt(remaining)} words to go.`}
          </p>
        </div>
        <Paper
          id="goal-input"
          label="Your draft"
          value={text}
          onChange={onTextChange}
          placeholder="Write here, or paste your draft to check your progress…"
          rows={14}
          corner={`${fmt(words)} / ${fmt(target)}`}
          footer={
            settings.save ? (
              <span className="inline-flex items-center gap-1.5">
                <Save className="h-3.5 w-3.5" aria-hidden="true" /> Draft is saved in this browser only (localStorage).
              </span>
            ) : (
              <span>Your draft is not saved. Turn on “Keep draft in this browser” to keep it between visits.</span>
            )
          }
        />
      </div>

      <div className="space-y-4">
        <StatGrid>
          <Stat label="Remaining" value={fmt(remaining)} hint="words to target" accent />
          <Stat label="Complete" value={`${Math.floor(pct)}%`} />
          <div className="col-span-2">
            <Stat
              label="Time to finish"
              value={<span className="text-xl">{remaining === 0 ? "Done" : formatDuration(etaMinutes)}</span>}
              hint={sessionPace ? `Based on your live pace of ${fmt(sessionPace)} words/hour` : `At ${fmt(pace)} words per hour`}
            />
          </div>
        </StatGrid>

        <div className="card space-y-4 p-4">
          <div>
            <div className="grid grid-cols-[1fr_auto] items-center gap-2">
              <label htmlFor="goal-target" className="text-sm font-semibold text-ink">
                Word target
              </label>
              <input
                id="goal-target"
                type="number"
                inputMode="numeric"
                min={1}
                value={targetInput}
                onChange={(e) => applyTarget(e.target.value)}
                className="field w-28 !py-1.5 text-right font-mono"
              />
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5" role="group" aria-label="Target presets">
              {TARGET_PRESETS.map((p) => (
                <button
                  key={p}
                  type="button"
                  aria-pressed={target === p}
                  onClick={() => applyTarget(String(p))}
                  className="rounded border border-line px-2.5 py-1 font-mono text-xs text-ink-2 transition-colors hover:border-accent aria-pressed:border-accent aria-pressed:bg-accent-soft aria-pressed:text-accent-text"
                >
                  {fmt(p)}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-[1fr_auto] items-center gap-2">
            <label htmlFor="goal-tolerance" className="text-sm text-ink-2">
              Allowed range
            </label>
            <select
              id="goal-tolerance"
              value={tolerance}
              onChange={(e) => update("tolerance", Number(e.target.value))}
              className="field w-28 !py-1.5"
            >
              <option value={0}>Exact</option>
              <option value={5}>± 5%</option>
              <option value={10}>± 10%</option>
              <option value={15}>± 15%</option>
            </select>
          </div>
          <div className="grid grid-cols-[1fr_auto] items-center gap-2">
            <label htmlFor="goal-pace" className="text-sm text-ink-2">
              Your writing pace <span className="block text-xs text-muted">words per hour</span>
            </label>
            <input
              id="goal-pace"
              type="number"
              inputMode="numeric"
              min={50}
              max={5000}
              step={50}
              value={pace}
              onChange={(e) => update("pace", Math.max(1, Math.floor(Number(e.target.value) || 0)))}
              className="field w-28 !py-1.5 text-right font-mono"
            />
          </div>
          <label className="flex items-center justify-between gap-3 border-t border-line pt-4 text-sm text-ink-2">
            Keep draft in this browser
            <input type="checkbox" className="toggle" checked={settings.save} onChange={(e) => update("save", e.target.checked)} />
          </label>
        </div>
      </div>
    </div>
  );
}

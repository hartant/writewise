"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { CornerDownLeft, Search } from "lucide-react";
import { tools, toolPath } from "@/lib/tools";
import { posts, postPath } from "@/lib/posts";

type Result =
  | { kind: "tool"; href: string; title: string; subtitle: string }
  | { kind: "guide"; href: string; title: string; subtitle: string };

const index = [
  ...tools.map((t) => ({
    result: { kind: "tool", href: toolPath(t.slug), title: t.name, subtitle: t.summary } as Result,
    primary: t.name.toLowerCase(),
    secondary: [...t.keywords, t.summary].join(" ").toLowerCase(),
  })),
  ...posts.map((p) => ({
    result: { kind: "guide", href: postPath(p.slug), title: p.title, subtitle: p.excerpt } as Result,
    primary: p.title.toLowerCase(),
    secondary: `${p.tag} ${p.excerpt}`.toLowerCase(),
  })),
];

function search(query: string): Result[] {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return index
    .map((entry) => {
      let score = 0;
      for (const term of terms) {
        if (entry.primary.startsWith(term)) score += 6;
        else if (entry.primary.includes(term)) score += 4;
        else if (entry.secondary.includes(term)) score += 1;
        else return { entry, score: 0 };
      }
      if (entry.result.kind === "tool") score += 0.5;
      return { entry, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map((r) => r.entry.result);
}

const suggestions = ["word count", "title case", "compare", "duplicates", "reading time"];

export function ToolSearch() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const listId = useId();
  const results = useMemo(() => search(query), [query]);
  const showList = focused && query.trim().length > 0;

  useEffect(() => setActive(0), [query]);

  // "/" focuses the search box, as on many productivity sites.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (e.key === "/" && !/input|textarea|select/i.test(target.tagName) && !target.isContentEditable) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      router.push(results[active].href);
    } else if (e.key === "Escape") {
      setQuery("");
    }
  }

  return (
    <div className="w-full max-w-xl">
      <div className="relative">
      <form role="search" onSubmit={(e) => e.preventDefault()} className="relative">
        <label htmlFor="tool-search" className="sr-only">
          Search tools and guides
        </label>
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden="true" />
        <input
          ref={inputRef}
          id="tool-search"
          type="search"
          role="combobox"
          aria-expanded={showList}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={showList && results[active] ? `${listId}-${active}` : undefined}
          autoComplete="off"
          spellCheck={false}
          placeholder="Search tools and guides…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          className="h-12 w-full rounded border border-line-strong bg-surface pl-11 pr-12 text-base text-ink transition-shadow placeholder:text-muted/80 focus:border-accent focus:shadow-[0_0_0_3px_var(--ring)] focus:outline-none [&::-webkit-search-cancel-button]:hidden"
        />
        <kbd className="pointer-events-none absolute right-3.5 top-1/2 hidden -translate-y-1/2 rounded border border-line px-1.5 font-mono text-xs text-muted sm:block">
          /
        </kbd>
      </form>

      {showList && (
        <ul
          id={listId}
          role="listbox"
          aria-label="Search results"
          className="card absolute inset-x-0 top-full z-30 mt-1 overflow-hidden py-1"
        >
          {results.length === 0 ? (
            <li className="px-4 py-3 text-sm text-muted">
              No matches. Try{" "}
              <Link href="/tools" className="font-medium text-accent-text underline">
                browsing all tools
              </Link>
              .
            </li>
          ) : (
            results.map((r, i) => (
              <li key={r.href} id={`${listId}-${i}`} role="option" aria-selected={i === active}>
                <Link
                  href={r.href}
                  onMouseEnter={() => setActive(i)}
                  className={`flex items-center gap-3 border-l-2 px-4 py-2.5 ${i === active ? "border-accent bg-surface-2" : "border-transparent"}`}
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[0.95rem] font-bold text-ink">
                      {r.title}
                      {r.kind === "guide" && <span className="ml-2 font-normal text-muted">Guide</span>}
                    </span>
                    <span className="block truncate text-xs text-muted">{r.subtitle}</span>
                  </span>
                  {i === active && <CornerDownLeft className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />}
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
      </div>

      <p className="mt-2.5 text-sm text-muted">
        Try:{" "}
        {suggestions.map((sug, i) => (
          <span key={sug}>
            <button
              type="button"
              onClick={() => {
                setQuery(sug);
                inputRef.current?.focus();
              }}
              className="text-ink-2 underline decoration-line-strong underline-offset-4 hover:decoration-accent"
            >
              {sug}
            </button>
            {i < suggestions.length - 1 ? ", " : ""}
          </span>
        ))}
      </p>
    </div>
  );
}

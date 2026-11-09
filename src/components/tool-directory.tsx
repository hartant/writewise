"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { categories, tools, type CategoryId } from "@/lib/tools";
import { Segmented } from "@/tools/ui";
import { ToolCard } from "./tool-card";

type Filter = CategoryId | "all";

/**
 * Searchable, filterable list of every tool. On the server (and before any input)
 * it renders the complete grouped list, so every tool link is in the HTML.
 */
export function ToolDirectory() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const matches = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    return tools.filter((t) => {
      if (filter !== "all" && t.category !== filter) return false;
      const hay = [t.name, t.summary, ...t.keywords].join(" ").toLowerCase();
      return terms.every((term) => hay.includes(term));
    });
  }, [query, filter]);

  const groups = categories
    .filter((c) => filter === "all" || c.id === filter)
    .map((c) => ({ ...c, items: matches.filter((t) => t.category === c.id) }))
    .filter((g) => g.items.length > 0);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full max-w-md">
          <label htmlFor="tool-filter" className="sr-only">
            Filter tools
          </label>
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            id="tool-filter"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter, e.g. “emails”, “sort”, “UCAS”"
            autoComplete="off"
            className="field h-12 !pl-11"
          />
        </div>
        <Segmented
          label="Category"
          value={filter}
          onChange={setFilter}
          options={[{ value: "all" as Filter, label: "All" }, ...categories.map((c) => ({ value: c.id as Filter, label: c.name }))]}
        />
      </div>

      <p className="sr-only" aria-live="polite">
        {matches.length} {matches.length === 1 ? "tool" : "tools"} shown
      </p>

      {groups.length === 0 ? (
        <p className="mt-10 text-ink-2">
          No tools match “{query}”. Try a simpler word, or{" "}
          <button type="button" className="pencil-link text-ink" onClick={() => (setQuery(""), setFilter("all"))}>
            show all tools
          </button>
          .
        </p>
      ) : (
        <div className="mt-10 space-y-12">
          {groups.map((g) => (
            <section key={g.id} id={g.id} aria-labelledby={`${g.id}-h`} className="scroll-mt-24">
              <h2 id={`${g.id}-h`} className="font-display text-[1.6rem] font-semibold text-ink">
                {g.name}
              </h2>
              <p className="mt-1 max-w-2xl text-ink-2">{g.description}</p>
              <div className="mt-4 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((t) => (
                  <ToolCard key={t.slug} tool={t} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

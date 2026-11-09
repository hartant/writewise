import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

export type FaqItem = { q: string; a: ReactNode };

/** Native <details> accordion: zero JavaScript, and the answers stay in the HTML for crawlers. */
export function Faq({ items, heading = "Frequently asked questions", id = "faq" }: { items: FaqItem[]; heading?: string; id?: string }) {
  return (
    <section aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`} className="font-display text-[2rem] font-semibold tracking-tight text-ink">
        {heading}
      </h2>
      <div className="mt-6 divide-y divide-line border-y border-line">
        {items.map((item) => (
          <details key={item.q} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-ink [&::-webkit-details-marker]:hidden">
              <h3 className="text-[1.05rem] font-bold">{item.q}</h3>
              <ChevronDown className="h-5 w-5 shrink-0 text-muted transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <div className="max-w-2xl pb-5 leading-7 text-ink-2 [&_a]:text-ink [&_a]:underline [&_a]:decoration-accent [&_a]:underline-offset-2">{item.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}

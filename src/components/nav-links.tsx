"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLinks({ links }: { links: { href: string; label: string }[] }) {
  const pathname = usePathname();
  // Mark only the most specific matching link, so /tools/word-counter highlights "Word Counter", not "Tools".
  const current = links
    .filter((l) => pathname === l.href || pathname.startsWith(l.href + "/"))
    .sort((a, b) => b.href.length - a.href.length)[0]?.href;
  return (
    <ul className="flex items-center gap-6">
      {links.map((l) => {
        const active = l.href === current;
        return (
          <li key={l.href}>
            <Link
              href={l.href}
              aria-current={active ? "page" : undefined}
              className={`text-[0.95rem] underline-offset-[6px] transition-colors hover:text-ink hover:underline hover:decoration-accent hover:decoration-2 ${
                active ? "text-ink underline decoration-accent decoration-2" : "text-muted"
              }`}
            >
              {l.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

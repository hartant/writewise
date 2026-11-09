import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { breadcrumbLd, type Crumb } from "@/lib/jsonld";
import { JsonLd } from "./json-ld";

/** Visible breadcrumb trail plus matching BreadcrumbList structured data. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-1">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-1">
                {last ? (
                  <span aria-current="page" className="font-medium text-ink-2">
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.path} className="rounded hover:text-accent-text">
                      {c.name}
                    </Link>
                    <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbLd(all)} />
    </>
  );
}

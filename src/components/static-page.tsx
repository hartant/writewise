import type { ReactNode } from "react";
import { Breadcrumbs } from "./breadcrumbs";

export function StaticPage({
  title,
  path,
  intro,
  updated,
  children,
}: {
  title: string;
  path: string;
  intro?: ReactNode;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <div className="container-ww pt-8">
      <Breadcrumbs items={[{ name: title, path }]} />
      <div className="mx-auto mt-8 max-w-3xl">
        <header>
          <h1 className="font-display text-[2.5rem] font-semibold leading-[1.1] tracking-tight text-ink sm:text-[3.25rem]">{title}</h1>
          {updated && <p className="mt-3 text-sm text-muted">Last updated: {updated}</p>}
          {intro && <div className="mt-5 text-lg leading-8 text-ink-2">{intro}</div>}
        </header>
        <div className="prose-ww mt-10">{children}</div>
      </div>
    </div>
  );
}

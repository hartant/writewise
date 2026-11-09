import Link from "next/link";

/** The proofreader's insertion caret: the mark an editor makes to add a word. */
export function LogoMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="5" className="fill-ink" />
      <path d="M8.5 22.5 16 9.5l7.5 13" fill="none" className="stroke-canvas" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2 rounded" aria-label="WriteWise home">
      <LogoMark className="h-6 w-6" />
      <span className="font-display text-[1.35rem] font-semibold tracking-tight text-ink">WriteWise</span>
    </Link>
  );
}

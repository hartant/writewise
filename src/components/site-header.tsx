import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "/tools", label: "Tools" },
  { href: "/tools/word-counter", label: "Word Counter" },
  { href: "/blog", label: "Guides" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/90 backdrop-blur supports-[backdrop-filter]:bg-canvas/80">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-surface focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <div className="container-ww relative flex h-16 items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Main" className="ml-auto hidden md:block">
          <NavLinks links={links} />
        </nav>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <MobileNav links={links} />
        </div>
      </div>
    </header>
  );
}

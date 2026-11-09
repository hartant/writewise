import Link from "next/link";
import { site } from "@/lib/site";
import { categories, tools, toolPath } from "@/lib/tools";
import { posts, postPath } from "@/lib/posts";
import { Logo } from "./logo";
import { CookieSettingsButton } from "./consent";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-28 border-t border-line">
      <div className="container-ww grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo />
          <p className="mt-4 max-w-xs text-[0.95rem] leading-6 text-muted">
            Free writing tools for students, job seekers and professionals. Everything you type is processed in your browser.
          </p>
        </div>
        <FooterCol title="Tools" className="md:col-span-3">
          {tools.map((t) => (
            <FooterLink key={t.slug} href={toolPath(t.slug)}>
              {t.name}
            </FooterLink>
          ))}
        </FooterCol>
        <FooterCol title="Guides" className="md:col-span-3">
          {posts.map((p) => (
            <FooterLink key={p.slug} href={postPath(p.slug)}>
              {p.title.split(":")[0].replace(/\s*\(.*\)/, "")}
            </FooterLink>
          ))}
          <FooterLink href="/blog">All guides</FooterLink>
        </FooterCol>
        <FooterCol title="WriteWise" className="md:col-span-2">
          <FooterLink href="/about">About</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
          <FooterLink href="/privacy">Privacy Policy</FooterLink>
          <FooterLink href="/terms">Terms of Use</FooterLink>
          <FooterLink href="/disclaimer">Disclaimer</FooterLink>
          {site.gaId && (
            <li>
              <CookieSettingsButton />
            </li>
          )}
        </FooterCol>
      </div>
      <div className="border-t border-line">
        <div className="container-ww flex flex-col gap-2 py-6 text-sm text-muted sm:flex-row sm:justify-between">
          <p>
            © {year} {site.name}
          </p>
          <p>
            {tools.length} tools in {categories.length} categories · No account needed
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h2 className="font-display text-base font-semibold text-ink">{title}</h2>
      <ul className="mt-3 space-y-2">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-[0.95rem] text-muted transition-colors hover:text-ink">
        {children}
      </Link>
    </li>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { mainNav } from "@/config/navigation";
import { ctas } from "@/config/site";
import { cn } from "@/lib/utils";
import { MegaMenu } from "./mega-menu";
import { MobileMenu } from "./mobile-menu";
import { ThemeToggle } from "./theme-toggle";

export const isActivePath = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-[var(--z-header)] w-full border-b transition-[background-color,border-color,box-shadow] duration-300 ease-out",
        scrolled
          ? "border-border bg-surface-overlay shadow-sm backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-background",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
      >
        Skip to content
      </a>
      <div
        className={cn(
          "mx-auto flex w-full max-w-[var(--layout-wide)] items-center gap-6 px-[var(--layout-gutter)] transition-[height] duration-300 ease-out",
          scrolled ? "h-[var(--layout-header-compact)]" : "h-[var(--layout-header)]",
        )}
      >
        <Logo className="shrink-0" />

        <nav aria-label="Main" className="ml-auto hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {mainNav.map((item) => {
              const active = isActivePath(pathname, item.href);
              if (item.children) {
                return (
                  <li key={item.href}>
                    <MegaMenu item={item} active={active} />
                  </li>
                );
              }
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex h-10 items-center rounded-md px-2.5 text-small font-medium transition-colors duration-200",
                      active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                      "after:absolute after:inset-x-2.5 after:bottom-1 after:h-px after:origin-left after:bg-accent after:transition-transform after:duration-300 after:ease-out",
                      active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 xl:ml-2">
          <ThemeToggle variant="compact" className="hidden sm:inline-flex" />
          <ButtonLink href={ctas.primary.href} size="sm" className="hidden md:inline-flex">
            {ctas.primary.label}
          </ButtonLink>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={mobileOpen}
            className="inline-flex size-11 items-center justify-center rounded-md text-foreground hover:bg-muted xl:hidden"
          >
            <Menu aria-hidden="true" className="size-5" />
          </button>
        </div>
      </div>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} pathname={pathname} />
    </header>
  );
}

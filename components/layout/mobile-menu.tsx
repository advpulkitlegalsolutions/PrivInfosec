"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { Drawer } from "@/components/ui/dialog";
import { mainNav } from "@/config/navigation";
import { ctas } from "@/config/site";
import { cn } from "@/lib/utils";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

/** Full-height mobile/tablet navigation sheet with nested Services list. */
export function MobileMenu({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Menu"
      hideTitle
      className="max-w-full sm:max-w-md"
      headerSlot={<Logo />}
      footer={
        <div className="flex flex-col gap-4">
          <ButtonLink href={ctas.primary.href} size="lg" className="w-full" onClick={onClose}>
            {ctas.primary.label}
          </ButtonLink>
        </div>
      }
    >
      <nav aria-label="Mobile" className="px-3 py-2">
        <ul className="flex flex-col">
          {mainNav.map((item) => {
            const active = isActive(pathname, item.href);
            if (item.children) {
              return (
                <li key={item.href}>
                  <details className="group" open={active}>
                    <summary
                      className={cn(
                        "flex min-h-14 cursor-pointer items-center justify-between rounded-md px-3 font-heading text-h4 font-medium tracking-nav",
                        active ? "text-nav-link-active" : "text-foreground",
                      )}
                    >
                      {item.label}
                      <ChevronDown aria-hidden="true" className="size-5 transition-transform duration-300 group-open:rotate-180" />
                    </summary>
                    <ul className="mb-2 ml-3 border-l border-border-accent pl-3">
                      <li>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="flex min-h-12 items-center gap-2 rounded-md px-3 text-body text-nav-link hover:text-nav-link-active"
                        >
                          All services <ArrowRight aria-hidden="true" className="size-4" />
                        </Link>
                      </li>
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={onClose}
                            aria-current={pathname === child.href ? "page" : undefined}
                            className={cn(
                              "flex min-h-12 items-center rounded-md px-3 py-2 text-body",
                              pathname === child.href ? "text-nav-link-active" : "text-nav-link hover:text-nav-link-active",
                            )}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              );
            }
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex min-h-14 items-center gap-3 rounded-md px-3 font-heading text-h4 font-medium tracking-nav",
                    active ? "text-nav-link-active" : "text-foreground hover:text-nav-link-active",
                  )}
                >
                  {active && <span aria-hidden="true" className="h-4 w-px bg-accent" />}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </Drawer>
  );
}

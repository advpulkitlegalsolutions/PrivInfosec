"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown } from "lucide-react";
import { megaMenuFeature, type NavItem } from "@/config/navigation";
import { services } from "@/data/services";
import { Icon } from "@/lib/icons";
import { cn } from "@/lib/utils";

/**
 * Services mega menu (desktop). Disclosure pattern: a button toggles a
 * panel of links. Opens on click or hover; closes on Escape (focus returns
 * to the trigger), outside click, focus leaving, or route change.
 */
export function MegaMenu({ item, active }: { item: NavItem; active: boolean }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  const close = useCallback(() => setOpen(false), []);

  // Close on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        triggerRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, close]);

  const onHover = (next: boolean) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpen(next), next ? 80 : 160);
  };

  return (
    <div
      ref={wrapperRef}
      onPointerEnter={(e) => e.pointerType === "mouse" && onHover(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && onHover(false)}
      onBlur={(e) => {
        if (!wrapperRef.current?.contains(e.relatedTarget as Node)) close();
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "relative inline-flex h-10 items-center gap-1 rounded-md px-2.5 text-small font-medium transition-colors duration-200",
          active || open ? "text-foreground" : "text-muted-foreground hover:text-foreground",
          "after:absolute after:inset-x-2.5 after:bottom-1 after:h-px after:origin-left after:bg-accent after:transition-transform after:duration-300",
          active ? "after:scale-x-100" : "after:scale-x-0",
        )}
      >
        {item.label}
        <ChevronDown
          aria-hidden="true"
          className={cn("size-3.5 transition-transform duration-300", open && "rotate-180")}
        />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-y border-border bg-surface-raised shadow-lg"
      >
        <div className="mx-auto grid max-w-[var(--layout-wide)] grid-cols-12 gap-8 px-[var(--layout-gutter)] py-8">
          <div className="col-span-8">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-mono text-eyebrow uppercase tracking-eyebrow text-muted-foreground">Four practices</p>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-small font-medium text-foreground hover:text-accent-text"
              >
                All services <ArrowRight aria-hidden="true" className="size-3.5" />
              </Link>
            </div>
            <ul className="grid grid-cols-2 gap-2">
              {services.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group flex gap-4 rounded-lg border border-transparent p-4 transition-colors hover:border-border hover:bg-surface-2"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border-accent bg-accent-soft text-accent-text">
                      <Icon name={s.icon} className="size-5" />
                    </span>
                    <span>
                      <span className="flex items-baseline gap-2">
                        <span className="font-mono text-caption text-accent-text">{s.number}</span>
                        <span className="font-heading text-body font-semibold text-foreground">{s.title}</span>
                      </span>
                      <span className="mt-1 block text-small leading-snug text-muted-foreground">{s.shortDescription}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-4">
            <Link
              href={megaMenuFeature.href}
              data-theme="dark"
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-lg border border-border-accent bg-background p-6 text-foreground"
            >
              <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-70" />
              <div className="relative">
                <p className="font-mono text-eyebrow uppercase tracking-eyebrow text-accent-text">{megaMenuFeature.eyebrow}</p>
                <p className="mt-3 font-heading text-h4 font-semibold">{megaMenuFeature.title}</p>
                <p className="mt-2 text-small text-muted-foreground">{megaMenuFeature.description}</p>
              </div>
              <span className="relative mt-6 inline-flex items-center gap-2 text-small font-medium text-accent-text">
                {megaMenuFeature.label}
                <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

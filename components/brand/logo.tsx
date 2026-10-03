import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Temporary PrivInfosec wordmark.
 * ------------------------------------------------------------------
 * To use the final logo: replace <LogoMark /> and the wordmark markup
 * below with an <Image src="/brand/logo.svg" … /> (or inline SVG). The
 * header, mobile menu and footer all render <Logo />, so nothing else
 * needs to change.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={cn("size-8", className)}>
      <path
        d="M16 2.75 27 6.6v8.15c0 6.6-4.55 11.6-11 14.5-6.45-2.9-11-7.9-11-14.5V6.6L16 2.75Z"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M12.75 22.5V9.75h4.6a3.65 3.65 0 0 1 0 7.3h-4.6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="21.6" cy="22.4" r="1.35" fill="var(--accent)" />
    </svg>
  );
}

export function Logo({ className, withDescriptor = true }: { className?: string; withDescriptor?: boolean }) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — home`}
      className={cn("group inline-flex items-center gap-2.5 rounded-sm text-foreground", className)}
    >
      <LogoMark className="transition-transform duration-300 ease-out group-hover:scale-[1.04]" />
      <span className="flex flex-col leading-none">
        <span className="font-heading text-[1.125rem] font-semibold tracking-[-0.02em]">PrivInfosec</span>
        {withDescriptor && (
          <span className="mt-1 font-mono text-[0.5625rem] font-medium tracking-[0.32em] text-muted-foreground">
            CONSULTING
          </span>
        )}
      </span>
    </Link>
  );
}

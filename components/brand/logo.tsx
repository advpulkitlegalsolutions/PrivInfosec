import { useId } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * PrivInfosec logo.
 * ------------------------------------------------------------------
 * Vector redraw of the black-and-gold "P" monogram. The ink parts use
 * `currentColor`, so the mark follows the text colour and stays legible
 * in both themes (near-black on paper, off-white on ink bands). The gold
 * stops are fixed brand values. Static exports of the same artwork live
 * in public/brand/ and app/icon.svg.
 *
 * On the dark site the ink parts render warm white, keeping clear
 * separation from the black background (the "light" logo version).
 * The header, mobile menu and footer all render <Logo />; the hero
 * illustration embeds <MonogramArt />.
 */
/** Monogram artwork (defs + paths) for embedding in any <svg>. */
export function MonogramArt() {
  // Unique gradient ids: the mark can appear several times on one page.
  const id = useId();
  const band = `${id}-band`;
  const bar = `${id}-bar`;
  return (
    <>
      <defs>
        {/* Gold stops follow --gradient-gold (styles/tokens.css). */}
        <linearGradient id={band} x1="0" y1="0" x2="100" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="currentColor" />
          <stop offset="0.14" stopColor="currentColor" />
          <stop offset="0.34" stopColor="#a97829" />
          <stop offset="0.6" stopColor="#e5c268" />
          <stop offset="0.8" stopColor="#c18d30" />
          <stop offset="1" stopColor="#7c551b" />
        </linearGradient>
        <linearGradient id={bar} x1="0" y1="58" x2="0" y2="137" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#e5c268" />
          <stop offset="0.45" stopColor="#c18d30" />
          <stop offset="1" stopColor="#76501a" />
        </linearGradient>
      </defs>
      <path fill="currentColor" d="M62 64C68 66 73 69 76 75 80 84 77 96 63 106H62Z" />
      <path
        fill={`url(#${band})`}
        d="M0 5Q0 0 4.5 2L72 34C92 44 99 60 95 78 91 94 78 103 63 106 76 96 80 84 76 75 73 69 68 66 62 64L0 34Z"
      />
      <path fill="currentColor" d="M0 43Q0 39.5 3 41L23.5 51Q26 52.3 26 55V127Q26 130 23.3 131L3 138.5Q0 139.5 0 136.5Z" />
      <path fill={`url(#${bar})`} d="M33 61Q33 58 36 59.5L55.5 69Q58 70.3 58 73V134Q58 137 55.3 136L36 127.3Q33 126 33 123Z" />
    </>
  );
}

/** viewBox for MonogramArt. */
export const monogramViewBox = "-2 -1 101 142";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox={monogramViewBox} fill="none" aria-hidden="true" className={cn("h-9 w-auto", className)}>
      <MonogramArt />
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
        <span className="font-display text-[1.375rem] font-bold tracking-[-0.01em]">
          Priv<span className="text-wordmark">Infosec</span>
        </span>
        {withDescriptor && (
          <span className="mt-1 text-[0.5625rem] font-semibold tracking-[0.38em] text-muted-foreground">
            CONSULTING
          </span>
        )}
      </span>
    </Link>
  );
}

"use client";

import { useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { themeModes, type ThemeMode } from "@/config/theme";
import { getResolvedTheme, getThemeMode, setThemeMode, THEME_EVENT } from "@/lib/theme";
import { cn } from "@/lib/utils";

const subscribe = (cb: () => void) => {
  window.addEventListener(THEME_EVENT, cb);
  return () => window.removeEventListener(THEME_EVENT, cb);
};
// Snapshot encodes mode + resolved theme so OS changes in "system" mode re-render.
const snapshot = () => `${getThemeMode()}|${getResolvedTheme()}`;
function useTheme() {
  const value = useSyncExternalStore<string | null>(subscribe, snapshot, () => null);
  if (!value) return { mode: null, resolved: null };
  const [mode, resolved] = value.split("|") as [ThemeMode, "light" | "dark"];
  return { mode, resolved };
}

const meta: Record<ThemeMode, { label: string; Icon: typeof Sun }> = {
  light: { label: "Light", Icon: Sun },
  dark: { label: "Dark", Icon: Moon },
  system: { label: "System", Icon: Monitor },
};

/**
 * Theme control.
 *  - variant="segmented": Light / Dark / System radio group (footer, mobile menu).
 *  - variant="compact":   single icon button toggling light ↔ dark (header).
 */
export function ThemeToggle({ variant = "segmented", className }: { variant?: "segmented" | "compact"; className?: string }) {
  const { mode, resolved: resolvedTheme } = useTheme();

  if (variant === "compact") {
    // Flip the *resolved* theme so every click visibly changes something.
    const resolved = resolvedTheme ?? "light";
    const next = resolved === "dark" ? "light" : "dark";
    const { Icon } = meta[resolved];
    return (
      <button
        type="button"
        onClick={() => setThemeMode(next)}
        aria-label={`Switch to ${next} theme`}
        title={`Switch to ${next} theme`}
        className={cn(
          "inline-flex size-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
          className,
        )}
      >
        {/* Render nothing theme-specific until mounted to avoid hydration mismatch */}
        {mode ? <Icon aria-hidden="true" className="size-[18px]" strokeWidth={1.5} /> : <Monitor aria-hidden="true" className="size-[18px] opacity-0" />}
      </button>
    );
  }

  return (
    <div role="radiogroup" aria-label="Colour theme" className={cn("inline-flex rounded-lg border border-border bg-surface-1 p-0.5", className)}>
      {themeModes.map((m) => {
        const { label, Icon } = meta[m];
        const checked = mode === m;
        return (
          <button
            key={m}
            type="button"
            role="radio"
            aria-checked={checked}
            onClick={() => setThemeMode(m)}
            className={cn(
              "inline-flex min-h-9 items-center gap-1.5 rounded-md px-2.5 text-caption font-medium transition-colors",
              checked ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
            {label}
          </button>
        );
      })}
    </div>
  );
}

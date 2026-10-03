import { THEME_STORAGE_KEY, themeConfig, type ThemeMode } from "@/config/theme";

/**
 * Inline, render-blocking script placed in <head>. It resolves the stored
 * theme mode (light / dark / system) before first paint so there is no
 * flash of the wrong theme, and keeps "system" in sync with the OS.
 * It is a static string with no user input.
 */
export const themeInitScript = `(function(){var d=document.documentElement;d.classList.add('js');var k=${JSON.stringify(
  THEME_STORAGE_KEY,
)};var q=window.matchMedia('(prefers-color-scheme: dark)');function a(){var m='${themeConfig.defaultMode}';try{m=localStorage.getItem(k)||m}catch(e){}var t=m==='dark'||(m==='system'&&q.matches)?'dark':'light';d.dataset.theme=t;d.dataset.themeMode=m;var c=document.querySelector('meta[name="theme-color"]');if(c)c.setAttribute('content',t==='dark'?'${themeConfig.themeColor.dark}':'${themeConfig.themeColor.light}')}a();q.addEventListener('change',function(){a();window.dispatchEvent(new Event('pi-theme-change'))});window.__piApplyTheme=a})();`;

declare global {
  interface Window {
    __piApplyTheme?: () => void;
  }
}

export const THEME_EVENT = "pi-theme-change";

export function setThemeMode(mode: ThemeMode) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {
    /* storage unavailable — apply for this page view only */
    document.documentElement.dataset.themeMode = mode;
  }
  window.__piApplyTheme?.();
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function getResolvedTheme(): "light" | "dark" {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function getThemeMode(): ThemeMode {
  return (document.documentElement.dataset.themeMode as ThemeMode) || themeConfig.defaultMode;
}

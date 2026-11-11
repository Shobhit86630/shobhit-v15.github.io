export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";
export const THEME_COLORS: Record<Theme, string> = { dark: "#0f0e0d", light: "#faf7f3" };

/**
 * Runs inline in <head> before first paint. If the visitor picked a theme
 * before, apply it; otherwise leave <html> without data-theme so the CSS
 * follows the OS setting via prefers-color-scheme.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t);}}catch(e){}})();`;

export function getActiveTheme(): Theme {
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "light" || attr === "dark") return attr;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce) {
    root.classList.add("theme-switching");
    window.setTimeout(() => root.classList.remove("theme-switching"), 400);
  }
  root.setAttribute("data-theme", theme);
  document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute("content", THEME_COLORS[theme]));
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* storage unavailable (private mode etc.) — theme still applies for this visit */
  }
}

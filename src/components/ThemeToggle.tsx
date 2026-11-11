"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { applyTheme, getActiveTheme, THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

/** Light / dark switch. Defaults to the OS preference until the visitor chooses. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(getActiveTheme());
    // Follow OS changes only while the visitor hasn't made an explicit choice.
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem(THEME_STORAGE_KEY);
      } catch {}
      if (!stored) setTheme(getActiveTheme());
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next: Theme = (theme ?? getActiveTheme()) === "dark" ? "light" : "dark";
    applyTheme(next);
    setTheme(next);
  };

  const label = theme ? `Switch to ${theme === "dark" ? "light" : "dark"} mode` : "Toggle colour theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-line-soft bg-surface/90 text-fg backdrop-blur transition-colors duration-300 hover:border-line hover:bg-surface-hover"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme && (
          <motion.span
            key={theme}
            initial={{ y: 18, opacity: 0, rotate: -60 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -18, opacity: 0, rotate: 60 }}
            transition={{ duration: 0.25 }}
            className="flex"
            aria-hidden="true"
          >
            {theme === "dark" ? <Moon className="h-[18px] w-[18px]" strokeWidth={1.8} /> : <Sun className="h-[18px] w-[18px]" strokeWidth={1.8} />}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Briefcase, FolderKanban, House, Layers, Mail, Menu, X, type LucideIcon } from "lucide-react";
import { navLinks, profile } from "@/data/portfolio";
import { ThemeToggle } from "./ThemeToggle";
import { cn, easeOut } from "@/lib/utils";

const icons: Record<(typeof navLinks)[number]["id"], LucideIcon> = {
  home: House,
  projects: FolderKanban,
  experience: Briefcase,
  tools: Layers,
  thoughts: BookOpen,
  contact: Mail,
};

function useActiveSection() {
  const [active, setActive] = useState<string>("home");
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      let current = "home";
      for (const link of navLinks) {
        if (link.id === "home") continue;
        const el = document.getElementById(link.id);
        if (el && el.getBoundingClientRect().top <= line) current = link.id;
      }
      // Last section may never reach the line on tall screens.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = "contact";
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return active;
}

function Availability({ compact = false }: { compact?: boolean }) {
  if (!profile.available) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line-soft bg-surface/80 text-xs text-muted backdrop-blur",
        compact ? "px-2.5 py-1.5" : "px-3.5 py-2",
      )}
    >
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
      </span>
      <span className={cn(compact && "sr-only sm:not-sr-only")}>{profile.availabilityText}</span>
    </span>
  );
}

export function Navbar() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: easeOut }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={cn(
          "mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 py-4 transition-colors duration-300 md:px-6",
        )}
      >
        <a
          href="#home"
          aria-label={`${profile.name} — home`}
          className="group -ml-1 flex h-11 items-center px-1 text-fg transition-transform duration-300 hover:-rotate-3 hover:scale-105"
        >
          <svg className="signature h-12 w-[136px] overflow-visible" viewBox="0 0 136 48" aria-hidden="true">
            <text x="2" y="37">{profile.firstName}</text>
          </svg>
        </a>

        {/* Desktop / tablet icon pill */}
        <nav
          aria-label="Primary"
          className={cn(
            "hidden items-center gap-1 rounded-2xl border border-line-soft p-1.5 backdrop-blur-md transition-colors duration-300 md:flex",
            scrolled ? "bg-surface/90 shadow-[0_8px_30px_rgba(0,0,0,0.18)]" : "bg-surface/70",
          )}
        >
          {navLinks.map((link) => {
            const Icon = icons[link.id];
            const isActive = active === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={isActive ? "true" : undefined}
                className="group relative flex h-10 w-10 items-center justify-center rounded-xl text-muted transition-colors duration-200 hover:text-fg"
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-xl bg-fg/10"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <Icon className={cn("relative h-[18px] w-[18px]", isActive && "text-fg")} strokeWidth={1.8} aria-hidden="true" />
                <span className="sr-only">{link.label}</span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-full mt-2 translate-y-1 whitespace-nowrap rounded-md bg-fg px-2 py-1 text-[11px] text-bg opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
                >
                  {link.label}
                </span>
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Availability compact />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line-soft bg-surface/90 text-fg backdrop-blur md:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: easeOut }}
            className="mx-4 rounded-2xl border border-line-soft bg-surface/95 p-2 shadow-2xl backdrop-blur-md md:hidden"
          >
            <ul>
              {navLinks.map((link, i) => {
                const Icon = icons[link.id];
                return (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * i, duration: 0.25 }}
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] transition-colors",
                        active === link.id ? "bg-fg/10 text-fg" : "text-muted hover:bg-fg/5 hover:text-fg",
                      )}
                    >
                      <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden="true" />
                      {link.label}
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

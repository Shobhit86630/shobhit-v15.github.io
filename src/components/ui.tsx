"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn, easeOut } from "@/lib/utils";
import type { Social } from "@/data/portfolio";

/** Fades + lifts its children into view once, when scrolled to. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "article" | "section";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, delay, ease: easeOut }}
    >
      {children}
    </Comp>
  );
}

const lineVariants: Variants = {
  hidden: { y: "105%" },
  show: (i: number) => ({ y: "0%", transition: { duration: 0.85, delay: i * 0.08, ease: easeOut } }),
};

/** Two-tone uppercase heading where each line slides up from a mask. */
export function SectionHeading({
  lines,
  className,
  id,
  as: Tag = "h2",
}: {
  lines: readonly [string, string];
  className?: string;
  id?: string;
  as?: "h1" | "h2";
}) {
  const reduce = useReducedMotion();
  return (
    <Tag id={id} className={cn("section-title", className)} aria-label={lines.join(" ")}>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden pb-[0.06em]" aria-hidden="true">
          <motion.span
            className={cn("block", i === 1 && "text-heading-dim")}
            custom={i}
            variants={lineVariants}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function SocialIcon({ icon, className }: { icon: Social["icon"]; className?: string }) {
  const common = { className: cn("h-[18px] w-[18px]", className), "aria-hidden": true, fill: "currentColor", viewBox: "0 0 24 24" };
  switch (icon) {
    case "github":
      return (
        <svg {...common}>
          <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
        </svg>
      );
    case "npm":
      return (
        <svg {...common}>
          <path d="M0 7.33v8h6.67v1.34H12v-1.34h12v-8H0Zm6.67 6.67H5.33v-4H4v4H1.33V8.67h5.34V14Zm4 0v1.33H8V8.67h5.33V14h-2.66Zm12 0h-1.34v-4H20v4h-1.33v-4h-1.34v4h-2.66V8.67h8V14ZM10.67 10H12v2.67h-1.33V10Z" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-10 6L2 7" />
        </svg>
      );
  }
}

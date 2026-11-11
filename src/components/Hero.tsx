"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Flame } from "lucide-react";
import { profile, socials } from "@/data/portfolio";
import { asset, easeOut } from "@/lib/utils";
import { SocialIcon } from "./ui";

/** Orange outline social icons, matching the reference card's icon style. */
function OutlineSocialIcon({ icon }: { icon: (typeof socials)[number]["icon"] }) {
  const p = {
    className: "h-[22px] w-[22px]",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (icon) {
    case "github":
      return (
        <svg {...p}>
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...p}>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case "npm":
      return <SocialIcon icon="npm" className="h-[22px] w-[22px]" />;
    case "mail":
      return (
        <svg {...p}>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-10 6L2 7" />
        </svg>
      );
  }
}

/**
 * Left-column profile card, laid out to match the reference:
 * inset photo, bold name, flame badge riding a dashed orange arc, blurb, socials.
 * Arc geometry is in pixels, anchored to the card edge and the badge.
 */
export function ProfileCard() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.1, ease: easeOut }}
      className="relative mx-auto w-full max-w-[344px]"
    >
      <div className="relative rounded-[14px] bg-white px-[52px] pb-[38px] pt-[30px] text-center text-[#151312] shadow-[var(--shadow-card)] ring-1 ring-[var(--card-ring)]">
        {/* Photo */}
        <div className="group relative aspect-[240/283] overflow-hidden rounded-[14px] bg-[linear-gradient(135deg,#e85d1c_0%,#c2410c_50%,#8f240a_100%)]">
          <Image
            src={asset(profile.portrait)}
            alt={`Portrait of ${profile.name}`}
            fill
            priority
            sizes="240px"
            className="object-contain object-bottom transition-transform duration-700 ease-out [transform-origin:50%_100%] group-hover:scale-[1.05]"
          />
        </div>

        {/* Name */}
        <h2 className="-mx-[46px] mt-[26px] whitespace-nowrap font-[family-name:var(--font-poppins)] text-[29px] font-bold leading-[1.1] tracking-[-0.025em]">
          {profile.name}
        </h2>

        {/* Flame badge — sits left of centre on the dashed arc */}
        <div className="relative h-[110px]" aria-hidden="true">
          {/* arc from the badge down to the card's left edge (origin = card edge) */}
          <motion.svg
            className="pointer-events-none absolute -left-[52px] top-0 h-[120px] w-[200px] overflow-visible"
            viewBox="0 0 200 120"
            fill="none"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <path d="M 108 53 A 140 140 0 0 1 0 102" stroke="#ff7a00" strokeWidth="3.2" strokeDasharray="9 7" />
          </motion.svg>
          <span className="absolute left-[49px] top-[18px] flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#ff7a00] text-white">
            <Flame className="h-[18px] w-[18px]" strokeWidth={2} />
          </span>
        </div>

        {/* Blurb */}
        <p className="-mx-[28px] font-[family-name:var(--font-poppins)] text-[17px] leading-[1.2] text-[#6a6b6e]">{profile.cardBlurb}</p>

        {/* Socials */}
        <ul className="mt-[42px] flex items-center justify-center gap-[26px]">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target={s.icon === "mail" ? undefined : "_blank"}
                rel={s.icon === "mail" ? undefined : "noopener noreferrer"}
                aria-label={s.label}
                className="flex text-accent transition-transform duration-300 hover:-translate-y-1 hover:scale-110"
              >
                <OutlineSocialIcon icon={s.icon} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Top-left dashed arc: lower half of a ring that spills over the card's top edge */}
      <motion.svg
        className="pointer-events-none absolute left-0 top-0 h-[100px] w-[200px] overflow-visible"
        viewBox="0 0 200 100"
        fill="none"
        aria-hidden="true"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        <path d="M 0 9 A 93 93 0 0 0 183 -19" stroke="#ff7a00" strokeWidth="3.2" strokeDasharray="9 7" />
      </motion.svg>
    </motion.div>
  );
}

const headlineLine = {
  hidden: { y: "105%" },
  show: (i: number) => ({ y: "0%", transition: { duration: 1, delay: 0.25 + i * 0.12, ease: easeOut } }),
};

export function Hero() {
  const reduce = useReducedMotion();
  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: easeOut },
  });

  return (
    <section aria-labelledby="hero-title" className="pt-2">
      <motion.p {...fade(0.15)} className="eyebrow mb-5 flex items-center gap-2">
        <span className="h-px w-8 bg-accent" aria-hidden="true" />
        {profile.title}
      </motion.p>

      <h1
        id="hero-title"
        className="display text-[clamp(3.1rem,11.5vw,6rem)]"
        aria-label={`${profile.name} — ${profile.title}`}
      >
        {profile.headline.map((line, i) => (
          <span key={line} className="block overflow-hidden pb-[0.05em]" aria-hidden="true">
            <motion.span
              className={i === 1 ? "block text-heading-dim" : "block"}
              custom={i}
              variants={headlineLine}
              initial={reduce ? false : "hidden"}
              animate="show"
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h1>

      <motion.p {...fade(0.55)} className="mt-6 max-w-[520px] text-[17px] leading-[1.6] text-muted">
        {profile.intro}
      </motion.p>

      <motion.div {...fade(0.7)} className="mt-8 flex flex-wrap gap-3">
        <a
          href="#projects"
          className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[15px] font-medium text-white transition-all duration-300 hover:bg-[#ff7d4b] hover:shadow-[0_10px_30px_rgba(244,108,56,0.35)]"
        >
          View Projects
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </a>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 text-[15px] font-medium text-fg transition-colors duration-300 hover:border-fg hover:bg-fg hover:text-bg"
        >
          Contact Me
        </a>
        {profile.resume && (
          <a
            href={asset(profile.resume)}
            className="inline-flex items-center gap-2 rounded-full px-4 py-3.5 text-[15px] text-muted underline-offset-4 hover:text-fg hover:underline"
          >
            Resume
          </a>
        )}
      </motion.div>
    </section>
  );
}

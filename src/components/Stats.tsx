"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight, CodeXml, Server } from "lucide-react";
import { focusCards, stats } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { Reveal } from "./ui";

/** Counts from 0 to `value` with GSAP the first time it scrolls into view. */
function CountUp({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const counter = { n: 0 };
    el.textContent = `${prefix}0${suffix}`;
    let tween: gsap.core.Tween | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        tween = gsap.to(counter, {
          n: value,
          duration: 1.6,
          ease: "power3.out",
          onUpdate: () => {
            el.textContent = `${prefix}${Math.round(counter.n)}${suffix}`;
          },
        });
        io.disconnect();
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      tween?.kill();
      el.textContent = `${prefix}${value}${suffix}`;
    };
  }, [value, prefix, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

const cardIcons = [Server, CodeXml];

export function Stats() {
  return (
    <section aria-label="Highlights" className="mt-14">
      <dl className="grid grid-cols-3 gap-4 sm:max-w-[560px] sm:gap-8">
        {stats.map((s, i) => (
          <Reveal key={s.label.join(" ")} delay={0.1 * i} className="flex flex-col-reverse">
            <dt className="mt-2 text-[11px] leading-[1.35] tracking-[0.04em] text-muted sm:text-xs">
              {s.label[0]}
              <br />
              {s.label[1]}
            </dt>
            <dd className="font-[family-name:var(--font-inter)] text-[clamp(2.4rem,7vw,4.4rem)] font-extrabold leading-none tracking-[-0.04em]">
              <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
            </dd>
          </Reveal>
        ))}
      </dl>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {focusCards.map((card, i) => {
          const Icon = cardIcons[i % cardIcons.length];
          return (
            <Reveal key={card.title} delay={0.1 * i}>
              <a
                href={card.href}
                className={cn(
                  "group relative flex min-h-[210px] flex-col justify-between overflow-hidden rounded-[18px] p-6 text-[#151312] transition-transform duration-500 ease-out hover:-translate-y-1.5",
                  card.tone === "accent" ? "bg-accent" : "bg-lime",
                )}
              >
                <span className="flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#151312]/10" aria-hidden="true">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <ArrowUpRight
                    className="h-7 w-7 transition-transform duration-500 group-hover:rotate-45"
                    strokeWidth={2.2}
                    aria-hidden="true"
                  />
                </span>
                <span className="max-w-[230px] font-[family-name:var(--font-inter)] text-[1.35rem] font-extrabold uppercase leading-[1.05] tracking-[-0.03em]">
                  {card.title}
                </span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-16 -right-16 h-44 w-44 rounded-full border-[18px] border-[#151312]/[0.07] transition-transform duration-700 group-hover:scale-125"
                />
              </a>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

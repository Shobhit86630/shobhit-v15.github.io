"use client";

import { ArrowUpRight } from "lucide-react";
import { thoughts } from "@/data/portfolio";
import { formatDate } from "@/lib/utils";
import { Reveal, SectionHeading } from "./ui";

export function Thoughts() {
  return (
    <section id="thoughts" aria-labelledby="thoughts-title" className="scroll-mt-24 pt-28 sm:pt-36">
      <SectionHeading id="thoughts-title" lines={["ENGINEERING", "THOUGHTS"]} />

      <ul className="-mx-3 mt-10 flex flex-col gap-2 sm:mt-14">
        {thoughts.map((post, i) => {
          const body = (
            <>
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-[family-name:var(--font-inter)] text-[1.45rem] font-extrabold leading-[1.15] tracking-[-0.025em] sm:text-[1.65rem]">
                  {post.title}
                </h3>
                {post.href && (
                  <ArrowUpRight
                    className="mt-1 h-6 w-6 shrink-0 text-accent transition-transform duration-500 group-hover:rotate-45"
                    aria-hidden="true"
                  />
                )}
              </div>
              <p className="mt-3 line-clamp-2 text-[15px] leading-relaxed text-muted">{post.excerpt}</p>
              <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-muted">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-dim" />
                <span>{post.readTime}</span>
                {post.draft && (
                  <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-[11px] uppercase tracking-[0.06em] text-accent">
                    Coming soon
                  </span>
                )}
              </p>
            </>
          );
          const cls = "group block rounded-[20px] p-4 transition-colors duration-300 hover:bg-surface sm:p-5";
          return (
            <Reveal as="li" key={post.title} delay={i * 0.06}>
              <article>
                {post.href ? (
                  <a href={post.href} target="_blank" rel="noopener noreferrer" className={cls}>
                    {body}
                  </a>
                ) : (
                  <div className={cls}>{body}</div>
                )}
              </article>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}

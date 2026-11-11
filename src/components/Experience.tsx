"use client";

import { Briefcase, GraduationCap } from "lucide-react";
import { experience } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./ui";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="scroll-mt-24 pt-28 sm:pt-36">
      <SectionHeading id="experience-title" lines={["EXPERIENCE", "& EDUCATION"]} />

      <ol className="relative mt-10 sm:mt-14">
        {/* timeline rail */}
        <span aria-hidden="true" className="absolute bottom-3 left-[19px] top-3 w-px bg-line" />
        {experience.map((job, i) => {
          const Icon = job.highlights.length ? Briefcase : GraduationCap;
          return (
            <Reveal as="li" key={`${job.company}-${job.role}`} delay={i * 0.08} className="relative pb-10 pl-14 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-bg-elevated text-accent"
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
              </span>

              <article className="group rounded-[20px] border border-line-soft bg-surface/40 p-6 transition-colors duration-300 hover:border-line hover:bg-surface sm:p-7">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div>
                    <h3 className="font-[family-name:var(--font-inter)] text-[1.5rem] font-extrabold leading-tight tracking-[-0.03em] sm:text-[1.7rem]">
                      {job.company}
                    </h3>
                    <p className="mt-0.5 text-[15px] text-fg/85">{job.role}</p>
                  </div>
                  <p className="shrink-0 text-sm text-muted sm:pt-1.5">
                    <time>{job.period}</time>
                    {job.location && <span className="block sm:text-right">{job.location}</span>}
                  </p>
                </div>

                <p className="mt-4 text-[15px] leading-relaxed text-muted">{job.summary}</p>

                {job.highlights.length > 0 && (
                  <ul className="mt-4 space-y-2.5">
                    {job.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-fg/80">
                        <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}

                {job.stack.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label="Stack">
                    {job.stack.map((s) => (
                      <li key={s} className="tag">
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}

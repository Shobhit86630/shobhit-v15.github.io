"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/data/portfolio";
import { asset } from "@/lib/utils";
import { Reveal, SectionHeading, SocialIcon } from "./ui";

function Preview({ project }: { project: Project }) {
  const reduce = useReducedMotion();
  const cls = "h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]";
  if (project.video && !reduce) {
    return (
      <video
        className={cls}
        src={asset(project.video)}
        poster={asset(project.image)}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={`${project.title} preview video`}
      />
    );
  }
  return (
    <Image
      src={asset(project.image)}
      alt={`${project.title} preview`}
      fill
      sizes="(max-width: 640px) 100vw, 320px"
      className={cls}
    />
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const primary = project.live ?? project.github;
  return (
    <Reveal as="li" delay={Math.min(index, 3) * 0.06}>
      <article className="group relative flex flex-col gap-5 rounded-[20px] p-3 transition-colors duration-300 hover:bg-surface sm:flex-row sm:items-center sm:gap-7">
        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-[14px] bg-surface sm:w-[44%]">
          <Preview project={project} />
          <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] text-white/80 backdrop-blur">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="flex min-w-0 flex-1 flex-col pb-2 pr-2 sm:pb-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-[family-name:var(--font-inter)] text-[1.6rem] font-extrabold leading-tight tracking-[-0.03em] sm:text-[1.85rem]">
                {project.title}
              </h3>
              <p className="mt-1 text-sm text-muted">{project.subtitle}</p>
            </div>
            {primary && (
              <a
                href={primary}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.title}`}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-accent transition-all duration-500 group-hover:rotate-45 group-hover:bg-accent group-hover:text-white"
              >
                <ArrowUpRight className="h-6 w-6" aria-hidden="true" />
              </a>
            )}
          </div>

          <p className="mt-3 text-[15px] leading-relaxed text-muted">{project.description}</p>

          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
            {project.tags.map((t) => (
              <li key={t} className="tag">
                {t}
              </li>
            ))}
          </ul>

          {(project.github || project.live) && (
            <div className="mt-5 flex flex-wrap gap-4 text-sm">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-fg/80 underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                  <SocialIcon icon="github" className="h-4 w-4" /> Source
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-fg/80 underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" /> {project.liveLabel ?? "Live demo"}
                </a>
              )}
            </div>
          )}
        </div>
      </article>
    </Reveal>
  );
}

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="scroll-mt-24 pt-28 sm:pt-36">
      <SectionHeading id="projects-title" lines={["RECENT", "PROJECTS"]} />
      <ul className="-mx-3 mt-10 flex flex-col gap-3 sm:mt-14">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </ul>
    </section>
  );
}

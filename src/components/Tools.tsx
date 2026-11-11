"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { DatabaseSearch, Sparkles } from "lucide-react";
import { tools, type Tool } from "@/data/portfolio";
import { asset, easeOut } from "@/lib/utils";
import { SectionHeading } from "./ui";

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.045 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: easeOut } },
};

const glyphs = { sparkles: Sparkles, "database-search": DatabaseSearch } as const;

/** Logo on a rounded tile, like the reference's tool list. */
function ToolIcon({ tool }: { tool: Tool }) {
  const Glyph = tool.glyph ? glyphs[tool.glyph] : null;
  return (
    <span
      aria-hidden="true"
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[14px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)] transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-105"
      style={{ backgroundColor: tool.tile ?? "#ffffff" }}
    >
      {tool.icon ? (
        <Image src={asset(tool.icon)} alt="" width={30} height={30} className="h-[30px] w-[30px]" />
      ) : Glyph ? (
        <Glyph className="h-7 w-7 text-[#151312]" strokeWidth={1.9} />
      ) : null}
    </span>
  );
}

export function Tools() {
  const reduce = useReducedMotion();
  return (
    <section id="tools" aria-labelledby="tools-title" className="scroll-mt-24 pt-28 sm:pt-36">
      <SectionHeading id="tools-title" lines={["TOOLS &", "TECHNOLOGIES"]} />

      <motion.ul
        className="mt-10 grid grid-cols-1 gap-2 sm:mt-14 sm:grid-cols-2"
        variants={container}
        initial={reduce ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      >
        {tools.map((tool) => (
          <motion.li key={tool.name} variants={item}>
            <div className="group flex items-center gap-4 rounded-[18px] p-3 transition-colors duration-300 hover:bg-surface">
              <ToolIcon tool={tool} />
              <div className="min-w-0">
                <p className="font-[family-name:var(--font-inter)] text-[1.15rem] font-bold leading-tight tracking-[-0.02em]">
                  {tool.name}
                </p>
                <p className="mt-0.5 truncate text-sm text-muted">{tool.category}</p>
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}

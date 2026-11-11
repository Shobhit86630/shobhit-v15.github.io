/**
 * Copies official brand logos from the `simple-icons` package (CC0) into
 * public/icons with each brand's colour baked in. Run with: npm run icons
 * To add one: find its slug on https://simpleicons.org, add it below, then
 * reference /icons/<slug>.svg from src/data/portfolio.ts.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import * as si from "simple-icons";

// slug -> colour override (null = official brand colour)
const icons = {
  go: null, python: null, typescript: null, javascript: "151312", react: null,
  nextdotjs: null, nodedotjs: null, postgresql: null, redis: null, docker: null,
  linux: "151312", git: null, langchain: "1C3C3C", langgraph: "1C3C3C",
  modelcontextprotocol: null, cloudflare: null, tailwindcss: null,
};

const all = Object.values(si).filter((v) => v && typeof v === "object" && "slug" in v);
const outDir = join(process.cwd(), "public/icons");
mkdirSync(outDir, { recursive: true });

for (const [slug, override] of Object.entries(icons)) {
  const icon = all.find((i) => i.slug === slug);
  if (!icon) throw new Error(`simple-icons has no "${slug}"`);
  const hex = override ?? icon.hex;
  writeFileSync(join(outDir, `${slug}.svg`), icon.svg.replace("<svg ", `<svg fill="#${hex}" `) + "\n");
  console.log(`${slug.padEnd(22)} #${hex}  (${icon.title})`);
}

import { ArrowUp } from "lucide-react";
import { profile } from "@/data/portfolio";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-28 border-t border-line-soft">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted sm:flex-row md:px-6">
        <p>
          © {year} {profile.name}. All rights reserved.
        </p>
        <p className="text-dim">Built with Next.js, Tailwind CSS &amp; Framer Motion.</p>
        <a
          href="#home"
          className="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-xs transition-colors hover:border-fg hover:text-fg"
        >
          Back to top <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}

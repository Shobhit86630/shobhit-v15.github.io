"use client";

import { useState } from "react";
import { Check, Copy, Send } from "lucide-react";
import { contact, profile, socials } from "@/data/portfolio";
import { Reveal, SectionHeading, SocialIcon } from "./ui";

/**
 * Static-export-friendly contact form: it composes a pre-filled email in the
 * visitor's mail client (no server needed). Swap `handleSubmit` for Formspree /
 * Web3Forms etc. if you later want in-page submission.
 */
export function Contact() {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<string>("");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setStatus("Couldn't copy automatically — the address is shown above.");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const type = String(data.get("type") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = `${type || "Hello"} — from ${name || "your portfolio"}`;
    const body = `${message}\n\n— ${name}${email ? ` (${email})` : ""}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("Opening your email app… If nothing happens, email me directly at the address above.");
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-24 pt-28 sm:pt-36">
      <SectionHeading id="contact-title" lines={contact.headline} />

      <Reveal className="mt-6 max-w-[520px]">
        <p className="text-[17px] leading-relaxed text-muted">{contact.blurb}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="break-all font-[family-name:var(--font-inter)] text-lg font-bold tracking-[-0.01em] text-fg underline decoration-accent decoration-2 underline-offset-[6px] transition-colors hover:text-accent sm:text-xl"
          >
            {profile.email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line px-3 text-xs text-muted transition-colors hover:border-fg hover:text-fg"
            aria-label="Copy email address"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-[#28a745]" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <ul className="mt-6 flex flex-wrap gap-3">
          {socials
            .filter((s) => s.icon !== "mail")
            .map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2.5 text-sm text-fg/85 transition-colors hover:bg-accent hover:text-white"
                >
                  <SocialIcon icon={s.icon} className="h-4 w-4" />
                  {s.label}
                </a>
              </li>
            ))}
        </ul>
      </Reveal>

      <Reveal delay={0.1} className="mt-12">
        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2" aria-describedby="form-note">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm text-muted">
              Name
            </label>
            <input id="name" name="name" required autoComplete="name" placeholder="Your name" className="field" />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm text-muted">
              Email
            </label>
            <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" className="field" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="type" className="mb-2 block text-sm text-muted">
              Reason
            </label>
            <select id="type" name="type" defaultValue="" className="field appearance-none">
              <option value="" disabled>
                Select…
              </option>
              {contact.inquiryTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="mb-2 block text-sm text-muted">
              Message
            </label>
            <textarea id="message" name="message" required rows={5} placeholder="Tell me a little about the role or project…" className="field resize-y" />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-accent px-6 py-4 text-[15px] font-medium text-white transition-all duration-300 hover:bg-[#ff7d4b] hover:shadow-[0_10px_30px_rgba(244,108,56,0.3)]"
            >
              Submit
              <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </button>
            <p id="form-note" className="mt-3 text-xs text-dim" role="status" aria-live="polite">
              {status || "Submitting opens a pre-filled email in your mail app."}
            </p>
          </div>
        </form>
      </Reveal>
    </section>
  );
}

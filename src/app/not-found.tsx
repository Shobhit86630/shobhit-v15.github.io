import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <p className="section-title">
        404
        <span className="block text-heading-dim">NOT FOUND</span>
      </p>
      <Link href="/" className="rounded-full bg-accent px-6 py-3 text-white hover:bg-[#ff7d4b]">
        Back home
      </Link>
    </main>
  );
}

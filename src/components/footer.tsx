import { site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="relative z-1 border-t border-border">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-6 py-8 font-mono text-xs text-dim">
        <p>
          <span aria-hidden className="text-accent">
            ${" "}
          </span>
          echo &quot;© {new Date().getFullYear()} {site.name}&quot;
        </p>
        <p className="ml-auto">Built with Next.js, Tailwind and too much coffee.</p>
      </div>
    </footer>
  );
}

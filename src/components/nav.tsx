"use client";

import { useEffect, useState } from "react";
import { Command, Menu, X } from "lucide-react";
import { sections } from "@/lib/sections";
import { site } from "@/lib/content";
import { openPalette } from "@/lib/palette-bus";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy: highlight whichever section currently owns the upper viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );

    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300 ease-[var(--ease-out-expo)]",
        scrolled || menuOpen
          ? "border-b border-border bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center gap-6 px-6">
        <a
          href="#top"
          className="font-mono text-sm font-medium text-text transition-colors hover:text-accent"
        >
          <span aria-hidden className="text-accent">
            ~/
          </span>
          {site.name.split(" ")[0].toLowerCase()}
        </a>

        <ul className="ml-auto hidden items-center gap-1 md:flex">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={active === s.id ? "true" : undefined}
                className={cn(
                  "rounded-md px-3 py-1.5 font-mono text-xs transition-colors duration-200",
                  active === s.id
                    ? "text-accent"
                    : "text-dim hover:text-muted",
                )}
              >
                {s.nav}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={openPalette}
          aria-label="Open command palette"
          className="ml-auto hidden items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-dim transition-colors duration-200 hover:border-border-hi hover:text-muted md:ml-0 md:inline-flex"
        >
          <Command className="size-3.5" />
          <span className="label">K</span>
        </button>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="ml-auto rounded-md border border-border p-1.5 text-muted transition-colors hover:border-border-hi md:hidden"
        >
          {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {menuOpen && (
        <ul
          id="mobile-menu"
          className="border-t border-border bg-bg/95 px-6 py-3 md:hidden"
        >
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 py-2.5 font-mono text-sm text-muted transition-colors hover:text-accent"
              >
                <span className="text-xs text-dim">{s.index}</span>
                {s.nav}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

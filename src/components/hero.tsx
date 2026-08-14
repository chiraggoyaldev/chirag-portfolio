"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowDown, Command, Mail } from "lucide-react";
import { Cursor, TerminalWindow } from "./terminal-window";
import { openPalette } from "@/lib/palette-bus";
import { site } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Types `text` out one character at a time, then fires `onDone` exactly once. */
function Typed({
  text,
  onDone,
  speed = 42,
}: {
  text: string;
  onDone: () => void;
  speed?: number;
}) {
  const [n, setN] = useState(0);
  const fired = useRef(false);
  const onDoneRef = useRef(onDone);

  // Kept in a ref, and updated in an effect rather than during render, so a new
  // `onDone` identity each render doesn't restart the typing timer.
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (n >= text.length) {
      if (!fired.current) {
        fired.current = true;
        onDoneRef.current();
      }
      return;
    }
    const t = setTimeout(() => setN((v) => v + 1), speed);
    return () => clearTimeout(t);
  }, [n, text.length, speed]);

  return <>{text.slice(0, n)}</>;
}

/**
 * A `$ command` line. Decorative: the commands are set dressing, not content,
 * so the whole line is hidden from assistive tech. What the commands *reveal*
 * is real content and lives outside this component.
 */
function CommandLine({
  text,
  show,
  active,
  instant,
  onDone,
}: {
  text: string;
  show: boolean;
  active: boolean;
  instant: boolean;
  onDone: () => void;
}) {
  return (
    <p
      aria-hidden
      className={cn(
        "flex gap-2 text-muted transition-opacity duration-300",
        show ? "opacity-100" : "opacity-0",
      )}
    >
      <span className="shrink-0 text-accent">$</span>
      <span>
        {instant || !show ? (
          text
        ) : active ? (
          <Typed text={text} onDone={onDone} />
        ) : (
          text
        )}
        {active && !instant && <Cursor />}
      </span>
    </p>
  );
}

/**
 * Fades content in as the typing sequence reaches it. Children stay mounted at
 * all times so the name, tagline and status are in the DOM for screen readers
 * and crawlers on first paint — and so the terminal never changes height.
 */
function Reveal({
  show,
  children,
  className,
  inert: makeInert,
}: {
  show: boolean;
  children: React.ReactNode;
  className?: string;
  inert?: boolean;
}) {
  return (
    <div
      // Only interactive blocks get `inert`; doing it to text would hide that
      // text from assistive tech, which is the opposite of the point.
      inert={makeInert ? !show : undefined}
      className={cn(
        "transition-opacity duration-500 ease-[var(--ease-out-expo)]",
        show ? "opacity-100" : "opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  const [stage, setStage] = useState(0);
  const instant = Boolean(reduced);

  // No effect needed to "skip" the animation: `instant` short-circuits `at()`,
  // so a reduced-motion preference reveals everything on the first render.
  const at = (s: number) => instant || stage >= s;
  const firstName = site.name.split(" ")[0].toLowerCase();

  return (
    <header className="relative z-1 mx-auto w-full max-w-5xl px-6 pt-32 pb-16 sm:pt-40 sm:pb-24">
      <TerminalWindow title={`~/${firstName} — zsh`}>
        <CommandLine
          text="whoami"
          show
          active={stage === 0}
          instant={instant}
          onDone={() => setStage(1)}
        />
        <Reveal show={at(1)} className="mt-2 pl-5">
          <h1 className="text-3xl leading-tight font-semibold tracking-tight text-text sm:text-5xl">
            {site.name}
          </h1>
          <p className="mt-2 text-base text-accent sm:text-lg">{site.role}</p>
        </Reveal>

        <div className="mt-7">
          <CommandLine
            text="cat about.txt"
            show={at(1)}
            active={stage === 1}
            instant={instant}
            onDone={() => setStage(2)}
          />
          <Reveal show={at(2)} className="mt-2 pl-5">
            <p className="max-w-2xl font-sans text-base leading-relaxed text-muted sm:text-lg">
              {site.tagline}
            </p>
          </Reveal>
        </div>

        <div className="mt-7">
          <CommandLine
            text="status"
            show={at(2)}
            active={stage === 2}
            instant={instant}
            onDone={() => setStage(3)}
          />
          <Reveal show={at(3)} className="mt-2 pl-5">
            <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-accent">
              <span aria-hidden className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              {site.availability}
              <span className="text-dim">· {site.location}</span>
            </p>
          </Reveal>
        </div>

        <Reveal
          show={at(3)}
          inert
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-md border border-accent/30 bg-accent/10 px-4 py-2.5 font-sans text-sm font-medium text-accent transition-colors duration-200 hover:border-accent/60 hover:bg-accent/20"
          >
            View my work
            <ArrowDown className="size-4 transition-transform duration-200 ease-[var(--ease-out-expo)] group-hover:translate-y-0.5" />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-md border border-border-hi bg-surface-2 px-4 py-2.5 font-sans text-sm font-medium text-text transition-colors duration-200 hover:border-dim"
          >
            <Mail className="size-4" />
            Get in touch
          </a>

          <button
            type="button"
            onClick={openPalette}
            className="ml-auto hidden items-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs text-dim transition-colors duration-200 hover:border-border-hi hover:text-muted sm:inline-flex"
          >
            <Command className="size-3.5" />
            <span className="label-cmd">K to navigate</span>
          </button>
        </Reveal>
      </TerminalWindow>
    </header>
  );
}

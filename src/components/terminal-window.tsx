import { cn } from "@/lib/utils";

/**
 * The window chrome that carries the terminal motif. Decorative only — every
 * piece of content inside it is also reachable by normal scrolling, so nobody
 * has to know what a shell is to use this site.
 */
export function TerminalWindow({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-surface",
        "shadow-[0_24px_80px_-24px_rgb(0_0_0/0.9)]",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-3">
        <span aria-hidden className="size-3 rounded-full bg-[#ff5f57]" />
        <span aria-hidden className="size-3 rounded-full bg-[#febc2e]" />
        <span aria-hidden className="size-3 rounded-full bg-[#28c840]" />
        <span className="label-cmd ml-2 truncate text-dim">{title}</span>
      </div>
      <div className="p-5 font-mono text-sm sm:p-7">{children}</div>
    </div>
  );
}

/** A `$ command` line. */
export function Prompt({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex gap-2 text-muted">
      <span aria-hidden className="shrink-0 text-accent">
        $
      </span>
      <span>{children}</span>
    </p>
  );
}

/** Output of a command. */
export function Output({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("mt-1.5 pl-5", className)}>{children}</div>;
}

/** The blinking block cursor. */
export function Cursor() {
  return (
    <span
      aria-hidden
      className="ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[0.18em] bg-accent animate-blink glow-accent"
    />
  );
}

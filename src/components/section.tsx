import { cn } from "@/lib/utils";
import type { Section as SectionMeta } from "@/lib/sections";

export function Section({
  meta,
  children,
  className,
}: {
  meta: SectionMeta;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={meta.id}
      aria-labelledby={`${meta.id}-title`}
      className={cn(
        "relative z-1 mx-auto w-full max-w-5xl px-6 py-14 sm:py-20",
        className,
      )}
    >
      <div className="flex items-center gap-4">
        <span className="label text-dim">{meta.index}</span>
        <p className="label-cmd flex gap-2 text-muted">
          <span aria-hidden className="text-accent">
            $
          </span>
          {meta.command}
        </p>
        <span aria-hidden className="h-px flex-1 bg-border" />
      </div>

      <h2
        id={`${meta.id}-title`}
        className="mt-5 text-2xl font-semibold tracking-tight text-text sm:text-3xl"
      >
        {meta.title}
      </h2>

      <div className="mt-10">{children}</div>
    </section>
  );
}

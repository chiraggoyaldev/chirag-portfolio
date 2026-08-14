import { ArrowUpRight, Lock, Target } from "lucide-react";
import { projects } from "@/lib/content";
import { sections } from "@/lib/sections";
import { Section } from "../section";
import { Reveal } from "../reveal";

const meta = sections.find((s) => s.id === "work")!;

export function Projects() {
  return (
    <Section meta={meta}>
      <div className="space-y-5">
        {projects.map((project, i) => (
          <Reveal key={project.name} delay={i * 0.08}>
            <article className="group rounded-lg border border-border bg-surface p-6 transition-colors duration-300 ease-[var(--ease-out-expo)] hover:border-border-hi sm:p-7">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <h3 className="font-mono text-lg font-medium text-text">
                  {project.name}
                </h3>
                <p className="label flex items-center gap-1.5 text-dim">
                  {project.links.length === 0 && (
                    <Lock aria-hidden className="size-3" />
                  )}
                  {project.kind}
                </p>
              </div>

              <p className="mt-4 max-w-3xl leading-relaxed text-muted">
                {project.blurb}
              </p>

              <p className="mt-4 flex gap-2.5 text-sm leading-relaxed text-accent">
                <Target aria-hidden className="mt-0.5 size-4 shrink-0" />
                <span>{project.outcome}</span>
              </p>

              {project.highlights && project.highlights.length > 0 && (
                <ul className="mt-6 space-y-3 border-t border-border pt-6">
                  {project.highlights.map((h) => (
                    <li
                      key={h.slice(0, 32)}
                      className="flex gap-3 text-sm leading-relaxed text-muted"
                    >
                      <span
                        aria-hidden
                        className="mt-px shrink-0 font-mono text-dim"
                      >
                        —
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}

              {project.stack.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded border border-border-hi bg-surface-2 px-2.5 py-1 font-mono text-xs text-dim"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              )}

              {project.links.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-5">
                  {project.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-sm text-accent transition-colors hover:text-accent-hi"
                      >
                        {link.label}
                        <ArrowUpRight className="size-3.5 transition-transform duration-200 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

import { experience } from "@/lib/content";
import { sections } from "@/lib/sections";
import { Section } from "../section";
import { Reveal } from "../reveal";

const meta = sections.find((s) => s.id === "experience")!;

export function Experience() {
  return (
    <Section meta={meta}>
      <ol className="space-y-10">
        {experience.map((job, i) => (
          <Reveal key={job.company} delay={i * 0.08}>
            <li className="relative border-l border-border pl-8">
              {/* commit dot */}
              <span
                aria-hidden
                className="absolute top-1.5 -left-[5px] size-2.5 rounded-full bg-accent ring-4 ring-bg"
              />

              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h3 className="text-lg font-medium text-text">{job.role}</h3>
                <p className="font-mono text-sm text-accent">{job.company}</p>
                <p className="label ml-auto text-dim">{job.period}</p>
              </div>

              <p className="mt-3 leading-relaxed text-muted">{job.summary}</p>

              <ul className="mt-5 space-y-3">
                {job.highlights.map((h) => (
                  <li
                    key={h.slice(0, 32)}
                    className="flex gap-3 text-sm leading-relaxed text-muted"
                  >
                    <span aria-hidden className="mt-px shrink-0 font-mono text-dim">
                      +
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

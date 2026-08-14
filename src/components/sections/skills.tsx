import { skills } from "@/lib/content";
import { cn } from "@/lib/utils";
import { sections } from "@/lib/sections";
import { Section } from "../section";
import { Reveal } from "../reveal";

const meta = sections.find((s) => s.id === "skills")!;

export function Skills() {
  return (
    <Section meta={meta}>
      <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
        {skills.map((group, i) => (
          <Reveal
            key={group.group}
            delay={i * 0.06}
            // An odd number of groups would leave a hole in a 2-column grid,
            // exposing the border colour used for the hairline gaps. The last
            // card stretches across instead.
            className={cn(
              "bg-surface p-5 sm:p-6",
              skills.length % 2 === 1 &&
                i === skills.length - 1 &&
                "sm:col-span-2",
            )}
          >
            <p className="flex items-center gap-2 font-mono text-sm text-accent">
              <span aria-hidden className="text-dim">
                └─
              </span>
              {group.group.toLowerCase()}/
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded border border-border-hi bg-surface-2 px-2.5 py-1 font-mono text-xs text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

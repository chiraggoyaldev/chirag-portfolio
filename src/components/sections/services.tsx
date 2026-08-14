import { services } from "@/lib/content";
import { sections } from "@/lib/sections";
import { Section } from "../section";
import { Reveal } from "../reveal";

const meta = sections.find((s) => s.id === "services")!;

export function Services() {
  return (
    <Section meta={meta}>
      <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
        {services.map((service, i) => (
          <Reveal
            key={service.title}
            delay={i * 0.06}
            className="bg-surface p-6 sm:p-7"
          >
            <p aria-hidden className="label text-dim">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-3 font-mono text-base text-accent">
              {service.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {service.body}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

import { about, site } from "@/lib/content";
import { sections } from "@/lib/sections";
import { Section } from "../section";
import { Reveal } from "../reveal";

const meta = sections.find((s) => s.id === "about")!;

export function About() {
  return (
    <Section meta={meta}>
      <div className="grid gap-12 md:grid-cols-[1.6fr_1fr]">
        <Reveal className="space-y-5">
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className="text-base leading-relaxed text-muted">
              {p}
            </p>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="space-y-0 rounded-lg border border-border bg-surface font-mono text-sm">
            <Fact term="role" value={site.role} />
            <Fact term="based" value={site.location} />
            <Fact term="status" value={site.availability} accent />
            <Fact term="exp" value="15 months" />
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}

function Fact({
  term,
  value,
  accent,
}: {
  term: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex gap-4 border-b border-border px-4 py-3 last:border-b-0">
      <dt className="w-16 shrink-0 text-dim">{term}</dt>
      <dd className={accent ? "text-accent" : "text-muted"}>{value}</dd>
    </div>
  );
}

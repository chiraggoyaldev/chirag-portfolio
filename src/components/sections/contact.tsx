import { ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "../icons";
import { site } from "@/lib/content";
import { sections } from "@/lib/sections";
import { Section } from "../section";
import { Reveal } from "../reveal";
import { CopyEmail } from "../copy-email";
import { ContactForm } from "../contact-form";

const meta = sections.find((s) => s.id === "contact")!;

export function Contact() {
  const socials = [
    { label: "GitHub", icon: GithubIcon, href: site.socials.github },
    { label: "LinkedIn", icon: LinkedinIcon, href: site.socials.linkedin },
    { label: "X", icon: XIcon, href: site.socials.x },
  ].filter((s) => s.href);

  return (
    <Section meta={meta}>
      <Reveal>
        <div className="rounded-lg border border-border bg-surface p-6 sm:p-9">
          <p className="max-w-2xl text-lg leading-relaxed text-muted">
            Got a project, or an existing codebase that needs a hand? Tell me
            what you&apos;re building and what&apos;s in the way — I read every
            message and reply within a day or two.
          </p>

          <div className="mt-8">
            <ContactForm />
          </div>

          <span aria-hidden className="mt-8 block h-px bg-border" />

          <p className="mt-6 mb-4 text-sm text-dim">
            Prefer your own mail client?
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-md border border-border-hi bg-surface-2 px-4 py-2.5 text-sm font-medium text-text transition-colors duration-200 hover:border-dim"
            >
              <Mail className="size-4" />
              {site.email}
            </a>
            <CopyEmail />
          </div>

          {socials.length > 0 && (
            <>
              <span aria-hidden className="mt-8 block h-px bg-border" />
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                {socials.map(({ label, icon: Icon, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-accent"
                    >
                      <Icon className="size-4" />
                      {label}
                      <ArrowUpRight className="size-3 text-dim transition-transform duration-200 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </Reveal>
    </Section>
  );
}

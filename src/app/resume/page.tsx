import type { Metadata } from "next";
import {
  cvSummary,
  education,
  experience,
  projects,
  site,
  skills,
} from "@/lib/content";

/**
 * Printable CV, rendered from the same content as the portfolio so the two can
 * never drift apart.
 *
 * Deliberately light, single-column and set in ordinary fonts rather than
 * matching the site's dark terminal look: CVs get printed, and get parsed by
 * applicant tracking systems that cope badly with multi-column layouts and
 * inverted colour. Personality belongs on the site; this is a document.
 */

export const metadata: Metadata = {
  title: "CV",
  // Contains a phone number, so keep it out of search results.
  robots: { index: false, follow: false },
};

const contactLine = [
  site.email,
  site.phone,
  site.location,
  site.url.replace(/^https?:\/\//, ""),
].filter(Boolean);

export default function ResumePage() {
  return (
    <div className="cv-root min-h-screen bg-white text-[#111] print:min-h-0">
      <style>{`
        /* Scoped to this route: the global stylesheet is built for a dark site. */
        .cv-root { font-family: var(--font-sans), system-ui, sans-serif; }
        .cv-sheet { max-width: 46rem; margin: 0 auto; padding: 2.75rem 2.5rem 3rem; }
        .cv-rule { border-bottom: 1.5px solid #111; padding-bottom: .25rem; margin-bottom: .85rem; }
        @page { size: A4; margin: 13mm 12mm; }
        @media print {
          .cv-sheet { max-width: none; margin: 0; padding: 0; }
          .cv-no-print { display: none !important; }
          /* Never split an entry across a page break. */
          .cv-entry { break-inside: avoid; page-break-inside: avoid; }
          a { text-decoration: none; color: #111; }
        }
      `}</style>

      <div className="cv-sheet">
        {/* ---- header ---- */}
        <header>
          <h1 className="text-[1.85rem] leading-tight font-bold tracking-tight">
            {site.name}
          </h1>
          <p className="mt-0.5 text-[1.02rem] text-[#333]">{site.role}</p>
          <p className="mt-2 text-[0.82rem] text-[#444]">
            {contactLine.join("  ·  ")}
          </p>
          <p className="text-[0.82rem] text-[#444]">
            {site.socials.github.replace(/^https?:\/\//, "")}
            {site.socials.linkedin
              ? `  ·  ${site.socials.linkedin.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}`
              : ""}
          </p>
        </header>

        {/* ---- summary ---- */}
        <section className="mt-6">
          <p className="text-[0.9rem] leading-relaxed text-[#222]">
            {cvSummary}
          </p>
        </section>

        {/* ---- experience ---- */}
        <Section title="Experience">
          {experience.map((job) => (
            <div key={job.company} className="cv-entry mb-4 last:mb-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-[0.98rem] font-semibold">
                  {job.role} — {job.company}
                </h3>
                <span className="text-[0.8rem] text-[#555]">{job.period}</span>
              </div>
              <ul className="mt-1.5 space-y-1">
                {(job.cvHighlights ?? job.highlights).map((h) => (
                  <li
                    key={h.slice(0, 28)}
                    className="flex gap-2 text-[0.86rem] leading-snug text-[#222]"
                  >
                    <span aria-hidden className="text-[#666]">
                      •
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Section>

        {/* ---- projects ----
             Names and stacks only. What was achieved on each is already in the
             Experience bullets above; repeating it here would cost half a page
             to say the same thing twice. */}
        <Section title="Client projects">
          {projects.map((p) => (
            <div key={p.name} className="cv-entry mb-1.5 last:mb-0">
              <p className="text-[0.88rem]">
                <span className="font-semibold">{p.name}</span>
                <span className="text-[#666]"> — {p.kind}</span>
              </p>
              {p.stack.length > 0 && (
                <p className="text-[0.8rem] leading-snug text-[#555]">
                  {p.stack.join(" · ")}
                </p>
              )}
            </div>
          ))}
        </Section>

        {/* ---- skills ---- */}
        <Section title="Skills">
          <ul className="space-y-1">
            {skills.map((group) => (
              <li key={group.group} className="text-[0.86rem] leading-snug">
                <span className="font-semibold">{group.group}: </span>
                <span className="text-[#222]">{group.items.join(", ")}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* ---- education ---- */}
        <Section title="Education">
          {education.map((e) => (
            <div
              key={e.institution}
              className="cv-entry flex flex-wrap items-baseline justify-between gap-x-4"
            >
              <p className="text-[0.9rem]">
                <span className="font-semibold">{e.qualification}</span>
                {", "}
                {e.institution}
              </p>
              <span className="text-[0.8rem] text-[#555]">{e.period}</span>
            </div>
          ))}
        </Section>

        <p className="cv-no-print mt-10 text-center text-[0.8rem] text-[#777]">
          Print this page (Ctrl/Cmd + P) to save it as a PDF.
        </p>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-5">
      <h2 className="cv-rule text-[0.76rem] font-bold tracking-[0.11em] uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}

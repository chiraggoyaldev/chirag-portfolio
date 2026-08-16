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
 *
 * Every contact detail is a real link. A PDF keeps them clickable, and a
 * recruiter reading on screen should be one click from the portfolio.
 */

export const metadata: Metadata = {
  title: "CV",
  // Contains a phone number, so keep it out of search results.
  robots: { index: false, follow: false },
};

const INK = "#15171a";
const BODY = "#33383d";
const SOFT = "#6b7280";
const RULE = "#d8dbdf";

function tidy(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

export default function ResumePage() {
  const contacts: Array<{ label: string; href: string }> = [
    { label: site.email, href: `mailto:${site.email}` },
    // Conditional spreads rather than filter+predicate: `site` is `as const`,
    // so its literal types make a type guard here more trouble than it's worth.
    ...(site.phone
      ? [{ label: site.phone, href: `tel:${site.phone.replace(/\s+/g, "")}` }]
      : []),
    { label: tidy(site.url), href: site.url },
    { label: tidy(site.socials.github), href: site.socials.github },
    ...(site.socials.linkedin
      ? [{ label: tidy(site.socials.linkedin), href: site.socials.linkedin }]
      : []),
  ];

  return (
    <div className="cv-root min-h-screen bg-white print:min-h-0">
      <style>{`
        /* Scoped to this route: the global stylesheet is built for a dark site.
           Its color-scheme:dark makes the browser paint its OWN dark canvas
           (#121212) behind the page. That is not a background, so no CSS
           background rule covers it, and it printed as a heavy black border
           around the whole CV. Resetting the colour scheme is the real fix;
           the background rules below are belt-and-braces.
           (Keep backticks out of this comment — it lives in a template
           literal, and one will silently end the string.) */
        html { color-scheme: light !important; }
        html, body { background: #fff !important; }

        .cv-root { font-family: var(--font-sans), system-ui, sans-serif; color: ${BODY}; }
        .cv-sheet { max-width: 47rem; margin: 0 auto; padding: 3rem 2.75rem 3.5rem; }

        /* Section headings: a hairline in a soft grey, not a slab of black.
           The weight comes from the letterspaced caps, not from the rule. */
        .cv-h2 {
          font-size: .7rem; font-weight: 700; letter-spacing: .14em;
          text-transform: uppercase; color: ${SOFT};
          padding-bottom: .3rem; margin-bottom: .8rem;
          border-bottom: 1px solid ${RULE};
        }

        .cv-link { color: ${BODY}; text-decoration: none; border-bottom: 1px solid ${RULE}; }
        .cv-link:hover { color: ${INK}; border-bottom-color: ${SOFT}; }

        /* Browsers printing from the UI honour this. Chrome's headless PDF
           engine does NOT — margins must be passed to the print call, which
           the PDF generation script does. Both paths need covering. */
        @page { size: A4; margin: 14mm 13mm; }

        @media print {
          html, body { background: #fff !important; }
          .cv-root { background: #fff !important; }
          .cv-sheet { max-width: none; margin: 0; padding: 0; }
          .cv-no-print { display: none !important; }
          .cv-entry { break-inside: avoid; page-break-inside: avoid; }
          /* Keep links functional in the PDF but visually quiet on paper. */
          .cv-link { border-bottom: none; color: ${BODY}; }

          /* Screen spacing runs ~30px over a single A4 page. Tighten the
             rhythm for print rather than cutting content — measured, not
             guessed; see the note in the README about re-checking this. */
          .cv-sheet section { margin-top: .88rem; }
          .cv-summary { margin-top: 1rem; }
          .cv-h2 { margin-bottom: .55rem; padding-bottom: .26rem; }
          .cv-entry { margin-bottom: .78rem; }
        }
      `}</style>

      <div className="cv-sheet">
        {/* ---- header ---- */}
        <header>
          <h1
            className="text-[2rem] leading-none font-bold tracking-tight"
            style={{ color: INK }}
          >
            {site.name}
          </h1>
          <p className="mt-1.5 text-[1.05rem]" style={{ color: BODY }}>
            {site.role}
            <span style={{ color: SOFT }}> · {site.location}</span>
          </p>

          <p className="mt-3 text-[0.83rem] leading-relaxed">
            {contacts.map((c, i) => (
              <span key={c.href}>
                {i > 0 && <span style={{ color: RULE }}> · </span>}
                <a className="cv-link" href={c.href}>
                  {c.label}
                </a>
              </span>
            ))}
          </p>
        </header>

        {/* ---- summary ---- */}
        <p
          className="cv-summary mt-6 text-[0.9rem] leading-relaxed"
          style={{ color: BODY }}
        >
          {cvSummary}
        </p>

        {/* ---- experience ---- */}
        <Section title="Experience">
          {experience.map((job) => (
            <div key={job.company} className="cv-entry mb-4 last:mb-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3
                  className="text-[0.97rem] font-semibold"
                  style={{ color: INK }}
                >
                  {job.role} — {job.company}
                </h3>
                <span className="text-[0.79rem]" style={{ color: SOFT }}>
                  {job.period}
                </span>
              </div>
              <ul className="mt-1.5 space-y-[0.3rem]">
                {(job.cvHighlights ?? job.highlights).map((h) => (
                  <li
                    key={h.slice(0, 28)}
                    className="flex gap-2 text-[0.855rem] leading-[1.45]"
                  >
                    <span aria-hidden style={{ color: RULE }}>
                      ▪
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
          {projects.map((p) => {
            const link = p.links[0];
            return (
              <div key={p.name} className="cv-entry mb-2 last:mb-0">
                <p className="text-[0.88rem]">
                  <span className="font-semibold" style={{ color: INK }}>
                    {link ? (
                      <a className="cv-link" href={link.href}>
                        {p.name}
                      </a>
                    ) : (
                      p.name
                    )}
                  </span>
                  <span style={{ color: SOFT }}> — {p.kind}</span>
                </p>
                {p.stack.length > 0 && (
                  <p
                    className="text-[0.79rem] leading-snug"
                    style={{ color: SOFT }}
                  >
                    {p.stack.join(" · ")}
                  </p>
                )}
              </div>
            );
          })}
        </Section>

        {/* ---- skills ---- */}
        <Section title="Skills">
          <ul className="space-y-[0.28rem]">
            {skills.map((group) => (
              <li key={group.group} className="text-[0.855rem] leading-snug">
                <span className="font-semibold" style={{ color: INK }}>
                  {group.group}:{" "}
                </span>
                {group.items.join(", ")}
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
              <p className="text-[0.89rem]">
                <span className="font-semibold" style={{ color: INK }}>
                  {e.qualification}
                </span>
                {", "}
                {e.institution}
              </p>
              <span className="text-[0.79rem]" style={{ color: SOFT }}>
                {e.period}
              </span>
            </div>
          ))}
        </Section>

        <p
          className="cv-no-print mt-10 text-center text-[0.8rem]"
          style={{ color: SOFT }}
        >
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
      <h2 className="cv-h2">{title}</h2>
      {children}
    </section>
  );
}

# Portfolio

Personal portfolio and freelance site. Dark, terminal-flavoured, single page.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Motion · cmdk

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (fully static)
npx tsc --noEmit # typecheck
npx eslint src   # lint
```

## Editing content

All copy lives in **`src/lib/content.ts`** — name, tagline, skills, experience,
projects, services, links. Components read from it, so nothing needs editing in
JSX to change what the site says.

Section order, headings and the shell commands shown above each one come from
**`src/lib/sections.ts`**. The nav, the ⌘K palette and the page all read from
that one array, so they cannot drift apart.

Outstanding placeholders:

```bash
grep -rn "TODO:" src/
```

## Design tokens

Every colour, spacing step and easing curve is defined once in the `@theme`
block at the top of **`src/app/globals.css`**. Components use tokens only —
adding a hard-coded hex or a second easing curve is what makes a phased build
start looking phased, so don't.

Dark-only by deliberate choice: one surface, tuned properly, rather than two
tuned adequately.

## Notes

- `src/app/opengraph-image.tsx` generates the social preview card at build time.
  It runs through Satori, which supports flexbox but **not** grid, and requires
  an explicit `display` on any element with more than one child.
- Motion is gated on `prefers-reduced-motion` globally in `globals.css`.
- The typing animation in the hero only animates opacity; all text is in the
  server-rendered HTML from first paint, for crawlers and screen readers.

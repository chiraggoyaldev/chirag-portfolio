/**
 * The section registry. The nav, the ⌘K palette and the page order all read
 * from this one array, so they can never drift out of sync.
 */
export const sections = [
  { id: "about", index: "01", command: "whoami", title: "About", nav: "About" },
  {
    id: "skills",
    index: "02",
    command: "ls skills/",
    title: "Skills",
    nav: "Skills",
  },
  {
    id: "work",
    index: "03",
    command: "cat projects.json",
    title: "Selected work",
    nav: "Work",
  },
  {
    id: "experience",
    index: "04",
    command: "git log --author=chirag",
    title: "Experience",
    nav: "Experience",
  },
  {
    id: "services",
    index: "05",
    command: "cat services.md",
    title: "What I can build for you",
    nav: "Services",
  },
  {
    id: "contact",
    index: "06",
    command: "mail -s 'new project'",
    title: "Get in touch",
    nav: "Contact",
  },
] as const;

export type Section = (typeof sections)[number];

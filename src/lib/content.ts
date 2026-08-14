/**
 * SINGLE SOURCE OF TRUTH for every piece of content on the site.
 *
 * Anything marked `TODO:` needs a real value before launch. Run
 *   grep -rn "TODO:" src/
 * to find everything still outstanding.
 *
 * Rule for this file: nothing goes in here that isn't true. Prospective
 * clients verify claims, so placeholders stay obvious rather than plausible.
 */

export const site = {
  name: "Chirag Goyal",
  // Shown under the name in the hero.
  role: "Full-stack Engineer",
  // One line, first person, no buzzwords. This is the single most-read sentence
  // on the page.
  tagline:
    "I build production web and mobile products — React and Next.js on the front, Python, Node and Rails behind them.",
  location: "Faridabad, India",
  availability: "Available for freelance work",

  // Personal address, matching the GitHub account and this repo's commits.
  email: "chirag.goyal.work@gmail.com",

  socials: {
    github: "https://github.com/chiraggoyaldev",
    linkedin: "https://www.linkedin.com/in/chirag-goyal-a987503a4/",
    x: "", // optional — leave empty to hide
  },

  // Canonical URL — drives canonical tags, OG tags, robots.txt and the sitemap.
  // Update this first if a custom domain is ever added, or search engines will
  // keep pointing at the old one.
  url: "https://chirag-portfolio-ten-beige.vercel.app",
} as const;

/* --------------------------------------------------------------------------
   ABOUT
   -------------------------------------------------------------------------- */

export const about = {
  // Two or three short paragraphs. Written to be skimmed.
  paragraphs: [
    "I'm a full-stack engineer at Beryl Systems, with 15 months of professional experience shipping software that real businesses run on — staff scheduling used by fitness chains, and a trademark filing platform used by applicants and attorneys.",
    "Most of my time goes to the unglamorous parts that decide whether a product actually works: migrating a legacy frontend without breaking the customers already using it, auditing which APIs are still live before deleting them, and making realtime updates behave on a flaky mobile connection.",
    "I'm now taking on freelance work alongside that. If you need someone who can own a feature end to end — schema, API, UI, and the deploy — that's the work I like most.",
  ],
} as const;

/* --------------------------------------------------------------------------
   TYPES
   -------------------------------------------------------------------------- */

export type SkillGroup = { group: string; items: string[] };

export type Job = {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
};

export type ProjectLink = { label: string; href: string };

export type Project = {
  name: string;
  kind: string;
  blurb: string;
  outcome: string;
  /** Specific engineering problems solved. Optional — omit for smaller projects. */
  highlights?: string[];
  stack: string[];
  links: ProjectLink[];
};

export type Service = { title: string; body: string };

/* --------------------------------------------------------------------------
   SKILLS — only things you'd be comfortable being interviewed on.
   -------------------------------------------------------------------------- */

export const skills: SkillGroup[] = [
  {
    group: "Frontend",
    items: [
      "React 19",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "TanStack Query",
      "GraphQL / Apollo",
      "Framer Motion",
    ],
  },
  {
    group: "Backend",
    items: [
      "Python",
      "Node.js",
      "Ruby on Rails",
      "PostgreSQL",
      "REST APIs",
      "Sidekiq",
      "Hasura",
    ],
  },
  {
    group: "Mobile",
    items: ["React Native", "Expo", "React Navigation"],
  },
  {
    group: "Cloud & Infra",
    items: [
      "AWS Lambda",
      "AWS ECS",
      "S3 / SQS",
      "Docker",
      "Terraform",
      "CloudFormation",
    ],
  },
  {
    group: "Practices",
    items: [
      "Legacy migration",
      "Browser automation (Selenium / Watir)",
      "Realtime (WebSockets / Ably)",
      "Observability",
      "Git / code review",
      "MCP tooling",
    ],
  },
];

/* --------------------------------------------------------------------------
   EXPERIENCE
   -------------------------------------------------------------------------- */

export const experience: Job[] = [
  {
    company: "Beryl Systems",
    role: "Software Engineer",
    period: "June 2025 — Present",
    summary:
      "Full-stack delivery on client platforms — a staff-scheduling product for fitness chains, and a trademark filing service.",
    highlights: [
      "Joined through a structured training period, then moved onto client delivery.",
      "Five months on trademarks411.com, where I built Rails automation driving the trademark office's filing system through a headless browser with Selenium and Watir — submitting new applications, Statements of Use and renewals without manual form entry. Contributed roughly a fifth of that codebase.",
      "Six months (current) on NetGym, a multi-tenant scheduling platform for gym chains — working across a Next.js frontend, a Rails monolith, a GraphQL layer and Python serverless functions on AWS.",
      "Migrated seven settings modules and a six-tab profile area off the Rails monolith onto Next.js while both frontends served live traffic against a single database, with no cutover window — including the coordination that stops two stacks firing the same side effect.",
      "Debugged and fixed production concurrency faults: lost updates under parallel event delivery, a sync deadlocking itself by holding transactions open across external HTTP calls, and duplicate rows under concurrent submission.",
      "Hardened multi-tenant authorization — permission gates, server-side tenancy verification, role-scoped exports, and removal of unguarded legacy write endpoints.",
      "Audited and retired dead API endpoints across the legacy codebase, establishing which routes still carried live traffic before removing them.",
      "Built internal MCP servers connecting the team's development tooling, so project context could be queried directly.",
    ],
  },
];

/* --------------------------------------------------------------------------
   PROJECTS

   NOTE: NetGym is a client's proprietary system. Prose only — no code, no
   screenshots, no internal ticket IDs, no dated incidents, no named customers
   or integration vendors, no internal codebase metrics. Do not add assets.

   The bar for anything written here: it should describe a problem solved and
   the technique used, in terms that would be recognisable to any engineer —
   not serve as a blueprint of how the client's system is built. If a line
   would help a competitor understand their architecture, it does not belong.
   -------------------------------------------------------------------------- */

export const projects: Project[] = [
  {
    name: "NetGym",
    kind: "Client project · via Beryl Systems · under NDA",
    blurb:
      "Multi-tenant SaaS for gym chains — staff scheduling, shift coverage, substitute requests, training, documentation and time clock. Tenants are isolated by subdomain, each integrated with one of eleven third-party gym-management systems.",
    outcome:
      "Migrated seven settings modules and a six-tab profile area from a Rails monolith onto Next.js with both frontends serving production traffic against one database — no cutover window, no downtime. Around 120 tickets shipped to date.",
    // Problems and techniques, deliberately not architecture documentation.
    // Nothing here names a customer, an integration vendor, an internal ticket
    // or a dated incident. See the NOTE above before adding to this list.
    highlights: [
      "Held one invariant across the whole migration: any single user action is served entirely by the old stack or entirely by the new one, so no request can half-succeed across a system boundary.",
      "Kept duplicated side effects from double-firing while both stacks read the same database — ownership flags let exactly one system own each callback, with a database-level trigger standing down when the legacy models intend to own a cascade themselves.",
      "Traced silently dropped records to concurrent event deliveries clobbering each other in a read-modify-write, with no atomic append available to serialise them. Replaced it with a compare-and-swap retry loop — jittered backoff, bounded attempts, hard deadline.",
      "Fixed a sync that deadlocked itself by making external HTTP calls inside open database transactions until the connection pool ran dry. Split it into concurrent fetches then sequential writes, moving all network I/O off the transaction path, and batched failure alerts that had been tripping rate limits.",
      "Hardened multi-tenant authorization: permission gates and role-rank checks on user management, tenancy re-verified server-side instead of trusted from the client, role scoping extended to CSV export so a scoped user cannot export rows they cannot see, and unguarded legacy write endpoints deleted rather than left reachable.",
      "Enforced uniqueness under concurrent submission with a partial unique index and graceful constraint handling, rather than a check-then-insert that cannot hold under load.",
      "Shipped net-new product work alongside the migration, including an e-signature flow for employment documentation — templated PDFs, acknowledgement and approval requirements, reminders, and auto-assignment for new staff.",
    ],
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "GraphQL",
      "Hasura",
      "Ruby on Rails",
      "PostgreSQL",
      "Python",
      "AWS",
      "Ably",
    ],
    // Deliberately no links — private repository.
    links: [],
  },
  {
    name: "trademarks411.com",
    kind: "Client project · via Beryl Systems",
    blurb:
      "Trademark search and filing service. I built server-side automation in Rails that drives the trademark office's online filing system through a headless browser — completing and submitting filings end to end with no operator at a keyboard, across several filing types including new applications, Statements of Use and renewals.",
    // Deliberately scope-led rather than metric-led: this was dev-side work,
    // so no customer-facing numbers are known first-hand. Better an accurate
    // scope claim than an invented statistic.
    outcome:
      "Replaced per-filing manual form entry with an unattended pipeline spanning several filing types; contributed roughly a fifth of the platform's codebase.",
    stack: [
      "Ruby on Rails",
      "Ruby",
      "Selenium",
      "Watir",
      "Background jobs",
    ],
    links: [{ label: "Live site", href: "https://trademarks411.com" }],
  },
];

/* --------------------------------------------------------------------------
   SERVICES — what a client can actually hire you for.
   -------------------------------------------------------------------------- */

export const services: Service[] = [
  {
    title: "Web app development",
    body: "A production Next.js or React application built end to end — data model, API, interface, deployment. Suited to teams who need a working product rather than a prototype.",
  },
  {
    title: "Legacy frontend migration",
    body: "Moving an ageing frontend onto a modern stack in phases, with parity checks at each step, so the people already using it never notice the change. This is the work I do daily.",
  },
  {
    title: "APIs & backend services",
    body: "REST or GraphQL APIs, background jobs, third-party integrations, and serverless functions on AWS — including the observability to know when they break.",
  },
  {
    title: "Mobile with React Native",
    body: "Cross-platform iOS and Android apps in React Native and Expo, sharing logic with an existing web product where it makes sense.",
  },
];

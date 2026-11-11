/**
 * Central content file. Every piece of copy, link and asset path on the site
 * lives here — edit this file instead of touching components.
 *
 * Assets marked PLACEHOLDER are demo files in /public. Replace them with real
 * screenshots / photos / recordings and keep the same paths (or update them here).
 */

export type Social = { label: string; href: string; icon: "github" | "linkedin" | "mail" | "npm" };

export type Stat = { value: number; suffix?: string; prefix?: string; label: [string, string] };

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  /** Static preview image (PLACEHOLDER by default). */
  image: string;
  /** Optional looping preview video (mp4/webm). Shown instead of the image when set. */
  video?: string;
  /** Leave undefined until the repository is public — the button is hidden. */
  github?: string;
  live?: string;
  liveLabel?: string;
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location?: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export type Tool = {
  name: string;
  category: string;
  /** Brand logo in /public/icons (synced from simple-icons via `npm run icons`). */
  icon?: string;
  /** Fallback glyph for concepts without an official logo. */
  glyph?: "sparkles" | "database-search";
  /** Tile background (defaults to white, like the reference). */
  tile?: string;
};

export type Thought = {
  title: string;
  excerpt: string;
  date: string; // ISO date
  readTime: string;
  href?: string;
  draft?: boolean;
};

export const site = {
  url: "https://shobhit86630.github.io/Shobhit-Bawangarh-Portfolio",
  title: "Shobhit Bawangarh — Software Engineer | AI Engineer",
  description:
    "Portfolio of Shobhit Bawangarh, a software engineer building reliable backend systems, production web apps and AI-powered tooling.",
  locale: "en_IN",
};

export const profile = {
  name: "Shobhit Bawangarh",
  firstName: "Shobhit",
  monogram: "SB",
  title: "Software Engineer | AI Engineer",
  headline: ["SOFTWARE", "& AI ENGINEER"] as const,
  location: "Bangalore, India",
  relocation: "Open to relocation",
  email: "shobhitbawangarh@gmail.com",
  available: true,
  availabilityText: "Open to work",
  cardBlurb: "A software engineer who ships end-to-end web apps, backend systems and AI tooling.",
  intro:
    "Software developer with a B.Tech in Computer Science and hands-on experience building and shipping end-to-end web applications. A curious, fast learner focused on reliable backend systems and practical AI engineering.",
  // Transparent cut-out portrait (800×800 WebP); it sits on the card's orange background.
  // Full-resolution original lives in /assets/portrait-original.png (not deployed).
  portrait: "/images/portrait.webp",
  // Drop a PDF into /public and set e.g. "/resume.pdf" to show a Resume button.
  // (Not published by default because the resume contains a phone number.)
  resume: undefined as string | undefined,
};

export const socials: Social[] = [
  { label: "GitHub", href: "https://github.com/shobhit86630", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/shobhit-bawangarh-378550324", icon: "linkedin" },
  { label: "Email", href: `mailto:${profile.email}`, icon: "mail" },
];

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "tools", label: "Tools" },
  { id: "thoughts", label: "Thoughts" },
  { id: "contact", label: "Contact" },
] as const;

/** Hero highlight cards (the orange + lime tiles under the stats). */
export const focusCards = [
  { title: "Backend systems, APIs & DevOps", tone: "accent" as const, href: "#projects" },
  { title: "Go, TypeScript, Next.js, LangGraph", tone: "lime" as const, href: "#tools" },
];

export const projects: Project[] = [
  {
    slug: "forgedeploy",
    title: "ForgeDeploy",
    subtitle: "Personal PaaS",
    description:
      "A self-hosted platform-as-a-service that builds and runs applications in Docker containers, written in Go.",
    tags: ["Go", "Docker", "Linux"],
    image: "/images/projects/forgedeploy.svg",
    // github: "https://github.com/shobhit86630/forgedeploy",
  },
  {
    slug: "job-discovery-agent",
    title: "Job Discovery Agent",
    subtitle: "AI automation",
    description:
      "An AI-powered agent that discovers job postings and enriches them with structured information automatically.",
    tags: ["Python", "LangGraph", "OpenAI API", "MCP"],
    image: "/images/projects/job-agent.svg",
  },
  {
    slug: "rag-log-diagnosis",
    title: "RAG Log Diagnosis",
    subtitle: "Retrieval-augmented debugging",
    description:
      "A retrieval-augmented system that diagnoses runtime errors by grounding LLM answers in logs and documentation.",
    tags: ["Python", "LangChain", "RAG", "OpenAI API"],
    image: "/images/projects/rag-logs.svg",
  },
  {
    slug: "bigtopsocial",
    title: "BigTopSocial Website",
    subtitle: "Production website",
    description:
      "Official website for a social media marketing agency, built end-to-end: APIs, lead forms, AI chatbot, Cloudinary media, SEO and deployment on Cloudflare + Vercel.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Cloudflare"],
    image: "/images/projects/bigtopsocial.svg",
    live: "https://bigtopsocial.com",
    liveLabel: "bigtopsocial.com",
  },
  {
    slug: "ecommerce-backend",
    title: "E-commerce Backend",
    subtitle: "Client project · team",
    description:
      "Backend for an e-commerce client: JWT authentication, REST APIs, admin functionality and Razorpay payment integration.",
    tags: ["Node.js", "REST APIs", "JWT", "Razorpay"],
    image: "/images/projects/ecommerce.svg",
  },
  {
    slug: "p2p-controls-engine",
    title: "P2P Controls Engine",
    subtitle: "Procure-to-pay rule engine",
    description:
      "A configurable controls engine with a YAML-driven rule system: typed evaluators for validation, duplicates, cross-dataset checks, date rules, windowed aggregation and fuzzy matching.",
    tags: ["TypeScript", "Node.js", "PostgreSQL", "Prisma"],
    image: "/images/projects/p2p.svg",
  },
  {
    slug: "testapi-cli",
    title: "API Testing CLI",
    subtitle: "npm package",
    description:
      "An interactive terminal tool for testing HTTP APIs — GET, POST, PUT, PATCH and DELETE — with request history.",
    tags: ["Node.js", "Axios", "MongoDB", "Docker"],
    image: "/images/projects/cli.svg",
    live: "https://www.npmjs.com/package/shobhit-testapi-cli",
    liveLabel: "npm",
  },
];

export const experience: Experience[] = [
  {
    company: "Nagpur Heights",
    role: "Software Developer Intern",
    period: "Dec 2025 – May 2026",
    summary:
      "Built and maintained production websites and backend features for agency and client projects.",
    highlights: [
      "Developed BigTopSocial's official website using Next.js and Vercel.",
      "Built backend features for e-commerce applications.",
      "Implemented JWT authentication, REST APIs, and Razorpay integration.",
      "Developed SEO-friendly real estate websites.",
      "Customized NestJS and Angular codebases for an internal CRM.",
    ],
    stack: ["Next.js", "Node.js", "NestJS", "Angular", "Vercel"],
  },
  {
    company: "G.H. Raisoni University",
    role: "B.Tech, Computer Science",
    period: "Graduated May 2026",
    location: "Amravati, India",
    summary: "Bachelor of Technology in Computer Science. AWS Cloud Computing Workshop, IIT Bombay (Dec 2024).",
    highlights: [],
    stack: [],
  },
];

export const tools: Tool[] = [
  { name: "Go", category: "Language", icon: "/icons/go.svg" },
  { name: "Python", category: "Language", icon: "/icons/python.svg" },
  { name: "TypeScript", category: "Language", icon: "/icons/typescript.svg" },
  { name: "JavaScript", category: "Language", icon: "/icons/javascript.svg", tile: "#F7DF1E" },
  { name: "React", category: "UI library", icon: "/icons/react.svg" },
  { name: "Next.js", category: "React framework", icon: "/icons/nextdotjs.svg" },
  { name: "Node.js", category: "Runtime", icon: "/icons/nodedotjs.svg" },
  { name: "PostgreSQL", category: "Database", icon: "/icons/postgresql.svg" },
  { name: "Redis", category: "In-memory store", icon: "/icons/redis.svg" },
  { name: "Docker", category: "Containers", icon: "/icons/docker.svg" },
  { name: "Linux", category: "Operating system", icon: "/icons/linux.svg", tile: "#FCC624" },
  { name: "Git", category: "Version control", icon: "/icons/git.svg" },
  { name: "LangChain", category: "LLM framework", icon: "/icons/langchain.svg" },
  { name: "LangGraph", category: "Agent orchestration", icon: "/icons/langgraph.svg" },
  { name: "RAG", category: "Retrieval-augmented generation", glyph: "database-search", tile: "#C5FF41" },
  { name: "OpenAI API", category: "LLM platform", glyph: "sparkles", tile: "#10A37F" },
  { name: "MCP", category: "Model Context Protocol", icon: "/icons/modelcontextprotocol.svg" },
  { name: "Cloudflare", category: "Edge & DNS", icon: "/icons/cloudflare.svg" },
  { name: "Tailwind CSS", category: "Styling", icon: "/icons/tailwindcss.svg" },
];

/** Statistics. Figures are derived from real data where possible — edit freely. */
export const stats: Stat[] = [
  { value: 6, prefix: "+", label: ["MONTHS OF", "EXPERIENCE"] },
  { value: projects.length, prefix: "+", label: ["PROJECTS", "SHIPPED"] },
  { value: tools.length, prefix: "+", label: ["TECHNOLOGIES", "USED"] },
];

/** PLACEHOLDER articles — replace with real posts (set href) when published. */
export const thoughts: Thought[] = [
  {
    title: "Building a Personal PaaS with Go and Docker",
    excerpt:
      "Placeholder article — notes on what it takes to build, run and route containers for your own deploy platform.",
    date: "2026-10-01",
    readTime: "6 min read",
    draft: true,
  },
  {
    title: "Grounding Error Diagnosis with RAG",
    excerpt:
      "Placeholder article — how retrieval over logs and docs makes LLM-assisted debugging more trustworthy.",
    date: "2026-09-01",
    readTime: "5 min read",
    draft: true,
  },
  {
    title: "AI as a Harness, Not a Crutch",
    excerpt:
      "Placeholder article — specify intent, review every generated change, verify behaviour: a workflow for AI-assisted engineering.",
    date: "2026-08-01",
    readTime: "4 min read",
    draft: true,
  },
];

export const contact = {
  headline: ["LET'S WORK", "TOGETHER"] as const,
  blurb: "Hiring for a junior software or AI engineering role, or have a project in mind? My inbox is open.",
  inquiryTypes: ["Full-time role", "Internship / contract", "Freelance project", "Just saying hi"],
};

// app/data/blog.ts

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  date: string;
  description: string;
  image: string;
  category: string;
  popularity: number;
  author: string;
  authorRole: string;
  content: ContentBlock[];
}

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "image"; src: string; caption?: string }
  | { type: "quote"; text: string; author: string; authorTitle: string }
  | { type: "list"; items: string[] };

export const blogs: BlogPost[] = [
  {
    id: 1,
    slug: "how-i-built-my-portfolio-using-react",
    title: "How I Built My Portfolio Using React & TailwindCSS",
    date: "2026-06-10",
    description: "A comprehensive step-by-step breakdown of designing and engineering a high-performance modern developer portfolio.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    category: "Technology",
    popularity: 96,
    author: "Baskar D",
    authorRole: "Full Stack Developer",
    content: [
      {
        type: "paragraph",
        text: "Building a personal portfolio is one of the most rewarding milestones for any web developer. Beyond showing off previous projects, it serves as living proof of your craft, design sensibilities, and technical standards.",
      },
      {
        type: "heading",
        text: "Why React and TailwindCSS?",
      },
      {
        type: "paragraph",
        text: "React's component-based paradigm makes it effortless to create modular, maintainable UI elements like animated cards, modal drawers, and reactive navigation headers. Paired with TailwindCSS, styling becomes lightning fast without leaving your JSX markup.",
      },
      {
        type: "quote",
        text: "Clean architecture and attention to responsive micro-interactions separate memorable portfolios from generic templates.",
        author: "Baskar D",
        authorTitle: "Full Stack Developer",
      },
      {
        type: "heading",
        text: "Key Architectural Highlights",
      },
      {
        type: "list",
        items: [
          "Fluid typography and responsive grid systems built with Tailwind",
          "Seamless light and dark mode toggling using CSS variables",
          "Micro-animations powered by Framer Motion for natural feel",
          "Zero layout shifts and fast image loading with modern picture tags",
        ],
      },
      {
        type: "paragraph",
        text: "Investing the effort into crafting an interactive showcase has directly driven freelance inquiries and client trust from day one.",
      },
    ],
  },
  {
    id: 2,
    slug: "top-5-tools-every-freelancer-should-use",
    title: "Top 5 Tools Every Freelance Developer Should Use in 2026",
    date: "2026-06-08",
    description: "Essential software recommendations that streamline project delivery, client billing, and everyday developer productivity.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
    category: "Freelancing",
    popularity: 94,
    author: "Baskar D",
    authorRole: "Freelance Consultant",
    content: [
      {
        type: "paragraph",
        text: "When managing multiple client projects solo, time management and clear organization make the difference between thriving and burning out. These five battle-tested tools keep my business running seamlessly.",
      },
      {
        type: "heading",
        text: "1. Notion – The Central Second Brain",
      },
      {
        type: "paragraph",
        text: "From sprint planning and client documentation to contract templates and invoice tracking, Notion acts as the command center for every project.",
      },
      {
        type: "heading",
        text: "2. Figma – Design Collaboration & Prototyping",
      },
      {
        type: "paragraph",
        text: "Presenting wireframes and clickable prototypes in Figma prevents misunderstandings early before writing a single line of frontend code.",
      },
      {
        type: "heading",
        text: "3. GitHub & Automated CI/CD",
      },
      {
        type: "paragraph",
        text: "Continuous integration pipelines ensure client preview deployments are generated automatically with every feature branch commit.",
      },
      {
        type: "list",
        items: [
          "Toggl Track for precise hourly telemetry and transparent invoices",
          "Slack & Loom for asynchronous client demos without endless meetings",
          "Stripe & Razorpay for frictionless international invoicing",
        ],
      },
    ],
  },
  {
    id: 3,
    slug: "mastering-nextjs-app-router-and-server-components",
    title: "Mastering Next.js App Router & React Server Components",
    date: "2026-06-05",
    description: "Deep-dive into streaming SSR, server actions, route handlers, and caching strategies in modern Next.js applications.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    category: "Next.js",
    popularity: 98,
    author: "Baskar D",
    authorRole: "Full Stack Developer",
    content: [
      {
        type: "paragraph",
        text: "The Next.js App Router represents a fundamental evolution in how we build React web applications, transitioning from client-heavy bundles to server-first rendering by default.",
      },
      {
        type: "heading",
        text: "The Power of Server-First Thinking",
      },
      {
        type: "paragraph",
        text: "With React Server Components (RSC), heavy dependencies like markdown parsers, syntax highlighters, and database query libraries stay on the server. The client receives only zero-bundle-size HTML and minimal interactive hydration.",
      },
      {
        type: "quote",
        text: "Ship less JavaScript to mobile devices. Server components let your users enjoy blazing performance even on slow networks.",
        author: "Baskar D",
        authorTitle: "Full Stack Developer",
      },
      {
        type: "heading",
        text: "Core Benefits Observed",
      },
      {
        type: "list",
        items: [
          "Instant Time to First Byte (TTFB) with Suspense streaming",
          "Direct database queries without writing boilerplate REST endpoints",
          "Unified metadata and dynamic OpenGraph generation for superior SEO",
          "Predictable caching layers with revalidatePath and tags",
        ],
      },
    ],
  },
  {
    id: 4,
    slug: "the-future-of-tailwind-css-v4-features",
    title: "Tailwind CSS v4: The New Era of Utility-First Web Styling",
    date: "2026-05-28",
    description: "Explore the lightning-fast Rust-based engine, CSS-first configuration, container queries, and native 3D transforms in Tailwind v4.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
    category: "Web Development",
    popularity: 88,
    author: "Baskar D",
    authorRole: "Full Stack Developer",
    content: [
      {
        type: "paragraph",
        text: "Tailwind CSS v4 redefines build times and developer ergonomics with its brand-new Oxide engine. Moving away from JavaScript configuration files to native CSS directives makes setup simpler than ever.",
      },
      {
        type: "heading",
        text: "What Changed in Tailwind v4?",
      },
      {
        type: "paragraph",
        text: "Gone are the days of complex tailwind.config.js setups. Everything is now configured directly in your main CSS file using clean @theme rules, while compile speeds are up to 10x faster.",
      },
      {
        type: "list",
        items: [
          "Zero-configuration CSS import with @import 'tailwindcss'",
          "Native container queries support without external plugins",
          "Built-in 3D transforms like perspective, rotate-x, and rotate-y",
          "First-class CSS variable binding across all theme palettes",
        ],
      },
    ],
  },
  {
    id: 5,
    slug: "full-stack-web-development-roadmap",
    title: "Full-Stack Web Development Roadmap: From Beginner to Pro",
    date: "2026-05-20",
    description: "A practical guide outlining the essential frontend, backend, database, and cloud skills required for modern full-stack development.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
    category: "Technology",
    popularity: 91,
    author: "Baskar D",
    authorRole: "Full Stack Developer",
    content: [
      {
        type: "paragraph",
        text: "Navigating the full-stack landscape can feel daunting with dozens of frameworks emerging each year. Focusing on foundational engineering fundamentals provides long-term career durability.",
      },
      {
        type: "heading",
        text: "The Three Pillars of Modern Full-Stack",
      },
      {
        type: "paragraph",
        text: "1. **Frontend Mastery**: Modern JavaScript (ESNext), TypeScript, React component lifecycle, accessibility, and responsive CSS.",
      },
      {
        type: "paragraph",
        text: "2. **Backend & Data**: Node.js, REST & GraphQL design, relational (PostgreSQL) and document (MongoDB) databases, and secure JWT authentication.",
      },
      {
        type: "paragraph",
        text: "3. **DevOps & Delivery**: Git workflows, Docker containerization, edge hosting (Vercel, AWS), and automated testing.",
      },
      {
        type: "quote",
        text: "Frameworks will come and go, but understanding HTTP, data structures, and database query optimization will always remain relevant.",
        author: "Baskar D",
        authorTitle: "Full Stack Developer",
      },
    ],
  },
  {
    id: 6,
    slug: "optimizing-web-performance-and-core-web-vitals",
    title: "Optimizing Web Performance: Cracking 100 on Core Web Vitals",
    date: "2026-05-14",
    description: "Actionable tactics for minimizing Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), and Interaction to Next Paint (INP).",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    category: "Performance",
    popularity: 93,
    author: "Baskar D",
    authorRole: "Performance Specialist",
    content: [
      {
        type: "paragraph",
        text: "Google's search ranking algorithms heavily prioritize user experience metrics known as Core Web Vitals. Fast sites convert higher, retain visitors longer, and achieve superior SEO visibility.",
      },
      {
        type: "heading",
        text: "Tactics for Lightning Fast Loads",
      },
      {
        type: "list",
        items: [
          "Convert hero images to WebP/AVIF with explicit dimensions to eradicate layout shift (CLS)",
          "Preload critical web fonts using rel='preload' with font-display: swap",
          "Code-split non-critical JavaScript widgets with dynamic imports",
          "Leverage HTTP caching and edge CDN distribution for static assets",
        ],
      },
      {
        type: "paragraph",
        text: "By systematically auditing network waterfalls in Chrome DevTools, we reduced our portfolio load time to under 0.8 seconds worldwide.",
      },
    ],
  },
  {
    id: 7,
    slug: "building-scalable-apis-with-nodejs-and-mongodb",
    title: "Building Resilient REST APIs with Node.js & MongoDB Atlas",
    date: "2026-05-08",
    description: "Best practices for Mongoose schema design, connection pooling, rate limiting, and robust error handling in production.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
    category: "Backend",
    popularity: 89,
    author: "Baskar D",
    authorRole: "Backend Engineer",
    content: [
      {
        type: "paragraph",
        text: "A well-architected backend API must handle unexpected traffic spikes, connection drops, and invalid payloads gracefully without crashing server processes.",
      },
      {
        type: "heading",
        text: "Connection Management & Caching",
      },
      {
        type: "paragraph",
        text: "In serverless environments like Next.js and AWS Lambda, database connections must be pooled and cached on global scopes to avoid exhausting MongoDB connection quotas.",
      },
      {
        type: "list",
        items: [
          "Validate incoming request bodies rigorously before reaching the database layer",
          "Index query fields such as slug, category, and createdAt for sub-10ms response times",
          "Implement unified JSON error response structures with appropriate HTTP status codes",
          "Secure sensitive credentials strictly via environment variables with validation",
        ],
      },
    ],
  },
  {
    id: 8,
    slug: "why-typescript-is-a-game-changer-for-modern-web-apps",
    title: "Why TypeScript Is Essential for Modern Web Applications",
    date: "2026-04-29",
    description: "How static type checking prevents runtime bugs, accelerates refactoring, and elevates developer satisfaction across teams.",
    image: "https://images.unsplash.com/photo-1516116211227-bbc13c244144?w=800&auto=format&fit=crop&q=80",
    category: "Technology",
    popularity: 90,
    author: "Baskar D",
    authorRole: "Full Stack Developer",
    content: [
      {
        type: "paragraph",
        text: "Once developers experience the superpowers of TypeScript's autocomplete, refactoring safety, and inline documentation, returning to untyped JavaScript is almost impossible.",
      },
      {
        type: "heading",
        text: "Eliminating 'Cannot read property of undefined'",
      },
      {
        type: "paragraph",
        text: "Runtime crashes that plague production deployments are caught during compilation in your IDE. Defining strict contracts for API responses and component props guarantees complete alignment across your application stack.",
      },
      {
        type: "quote",
        text: "Types are the best self-updating documentation you will ever write for yourself and your teammates.",
        author: "Baskar D",
        authorTitle: "Full Stack Developer",
      },
    ],
  },
  {
    id: 9,
    slug: "mastering-client-communication-for-freelancers",
    title: "Mastering Client Communication: The Freelancer's Guide",
    date: "2026-04-18",
    description: "Strategies for managing expectations, handling revisions constructively, and turning one-off gigs into long-term retainers.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
    category: "Freelancing",
    popularity: 87,
    author: "Baskar D",
    authorRole: "Freelance Consultant",
    content: [
      {
        type: "paragraph",
        text: "Technical coding chops will win you a client's interest, but exceptional communication and empathy are what win long-term loyalty, glowing referrals, and repeat contracts.",
      },
      {
        type: "heading",
        text: "Golden Rules of Client Interaction",
      },
      {
        type: "list",
        items: [
          "Set precise milestone deliverables and clear boundaries before commencing work",
          "Send concise weekly video summaries showing tangible progress",
          "Never assume requirements — rephrase client requests back to them for confirmation",
          "Deliver early whenever possible to build undeniable trust and reputation",
        ],
      },
    ],
  },
  {
    id: 10,
    slug: "ui-ux-design-principles-every-developer-must-know",
    title: "10 UI/UX Principles Every Software Developer Must Know",
    date: "2026-04-10",
    description: "Transform your applications from functional to delightful by mastering visual hierarchy, whitespace, and micro-interactions.",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80",
    category: "Design",
    popularity: 95,
    author: "Baskar D",
    authorRole: "UI/UX & Frontend Developer",
    content: [
      {
        type: "paragraph",
        text: "Developers often focus exclusively on code logic and backend algorithms while overlooking the visual ergonomics that determine whether users actually enjoy using the software.",
      },
      {
        type: "heading",
        text: "The Foundations of Great Digital Design",
      },
      {
        type: "paragraph",
        text: "Good design is not decorative art; it is visual problem-solving that guides the user's attention seamlessly toward their intended goals.",
      },
      {
        type: "list",
        items: [
          "Visual Hierarchy: Use font weights and sizes to emphasize primary actions",
          "Generous Whitespace: Give elements room to breathe to reduce cognitive friction",
          "Consistent Contrast: Ensure text adheres to WCAG AA accessibility standards",
          "Instant State Feedback: Button loaders, hover effects, and success toasts reassure users",
        ],
      },
      {
        type: "quote",
        text: "Design is not just what it looks like and feels like. Design is how it works.",
        author: "Steve Jobs",
        authorTitle: "Visionary",
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogs.find((post) => post.slug === slug);
}

export function getAllCategories(): string[] {
  return ["All", ...Array.from(new Set(blogs.map((post) => post.category)))];
}
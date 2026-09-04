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

type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "image"; src: string; caption?: string }
  | { type: "quote"; text: string; author: string; authorTitle: string }
  | { type: "list"; items: string[] };

export const blogs: BlogPost[] = [
  {
    id: 1,
    slug: "how-i-built-my-portfolio-using-react",
    title: "How I Built My Portfolio Using React",
    date: "2026-06-10",
    description: "A step-by-step guide to building a professional portfolio using React and TailwindCSS.",
    image: "https://picsum.photos/800/400?random=1",
    category: "Technology",
    popularity: 85,
    author: "Baskar D",
    authorRole: "Full Stack Developer",
    content: [
      {
        type: "paragraph",
        text: "Building a portfolio is essential for any developer. In this guide, I'll walk you through how I created my personal portfolio using React and TailwindCSS, and why these tools are perfect for the job.",
      },
      {
        type: "heading",
        text: "Why React?",
      },
      {
        type: "paragraph",
        text: "React's component-based architecture makes it easy to build reusable UI pieces. I used it to create a dynamic, fast, and responsive portfolio that showcases my projects and skills.",
      },
      {
        type: "image",
        src: "https://picsum.photos/800/400?random=2",
        caption: "My portfolio homepage",
      },
      {
        type: "quote",
        text: "React has completely changed the way I think about web development. It's not just a library; it's a paradigm shift.",
        author: "Baskar D",
        authorTitle: "Full Stack Developer",
      },
      {
        type: "list",
        items: [
          "Utility-first approach",
          "Customizable design system",
          "Built-in dark mode support",
        ],
      },
    ],
  },
  {
    id: 2,
    slug: "top-5-tools-every-freelancer-should-use",
    title: "Top 5 Tools Every Freelancer Should Use",
    date: "2026-06-08",
    description: "Discover the best tools for productivity, communication, and client management.",
    image: "https://picsum.photos/800/400?random=3",
    category: "Freelancing",
    popularity: 92,
    author: "Baskar D",
    authorRole: "Freelance Consultant",
    content: [
      {
        type: "paragraph",
        text: "Freelancing can be overwhelming without the right tools. Here are my top 5 picks that help me stay organized, communicate effectively, and deliver quality work to clients.",
      },
      {
        type: "heading",
        text: "1. Notion – All-in-one workspace",
      },
      {
        type: "paragraph",
        text: "Notion combines notes, tasks, databases, and calendars. I use it to plan projects, track deadlines, and store client information.",
      },
      {
        type: "heading",
        text: "2. Slack – Real-time communication",
      },
      {
        type: "paragraph",
        text: "Slack keeps me connected with clients and team members. It's fast, integrates with many apps, and reduces email clutter.",
      },
      {
        type: "heading",
        text: "3. Toggl – Time tracking",
      },
      {
        type: "paragraph",
        text: "Toggl helps me track hours spent on each project – essential for accurate billing and productivity analysis.",
      },
    ],
  },
  // Add more posts as needed
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogs.find((post) => post.slug === slug);
}

export function getAllCategories(): string[] {
  return ["All", ...new Set(blogs.map((post) => post.category))];
}
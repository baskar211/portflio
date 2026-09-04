// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/pages/Navbar";
import Footer from "@/app/pages/Footer";
import { blogs, getPostBySlug } from "@/data/blog";
import ImageWithFallback from "@/components/ImageWithFallback";
import dbConnect from "@/lib/mongodb";
import { Blog } from "@/models/Schema";

// Generate static paths at build time (SSG)
export async function generateStaticParams() {
  return blogs.map((post) => ({
    slug: post.slug,
  }));
}

// ---------- Helper: Render Content Blocks ----------
function renderContentBlock(block: any, index: number): React.ReactNode {
  switch (block.type) {
    case "paragraph":
      return (
        <p
          key={index}
          className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6 whitespace-pre-line"
        >
          {block.text}
        </p>
      );
    case "heading":
      return (
        <h2
          key={index}
          className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-4"
        >
          {block.text}
        </h2>
      );
    case "image":
      return (
        <figure key={index} className="my-10">
          <img
            src={block.src}
            alt={block.caption || "Blog image"}
            className="w-full rounded-xl shadow-lg"
          />
          {block.caption && (
            <figcaption className="text-sm text-gray-500 dark:text-gray-400 mt-3 text-center">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "quote":
      return (
        <blockquote
          key={index}
          className="border-l-4 border-indigo-500 pl-6 my-10 py-4 bg-gray-50 dark:bg-gray-800/50 rounded-r-xl"
        >
          <p className="text-xl italic font-medium text-gray-800 dark:text-gray-200">
            "{block.text}"
          </p>
          <cite className="block mt-2 text-sm not-italic text-gray-600 dark:text-gray-400">
            {block.author} – {block.authorTitle}
          </cite>
        </blockquote>
      );
    case "list":
      return (
        <ul
          key={index}
          className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-6"
        >
          {block.items.map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    default:
      return null; // ✅ must return something
  }
}

async function getBlogPost(slug: string) {
  try {
    await dbConnect();
    const post = await (Blog as any).findOne({ slug }).lean();
    if (post) return post;
  } catch (error) {
    console.error("Failed to load blog post from database:", error);
  }

  return getPostBySlug(slug);
}

// ---------- Page Component ----------
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const content = Array.isArray(post.content)
    ? post.content
    : [{ type: "paragraph", text: post.content }];

  const recentPosts = blogs
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-gray-900 pt-24 pb-12">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <span className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-xs font-semibold">
                {post.category}
              </span>
              <span>•</span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 mt-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {post.author}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {post.authorRole || "Admin"}
                </p>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl mb-12">
            <ImageWithFallback
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
              fallbackSrc="https://picsum.photos/800/400?random=1000"
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {content.map((block, idx) => renderContentBlock(block, idx))}
          </div>

          {/* Recent Posts */}
          <section className="mt-20 border-t border-gray-200 dark:border-gray-700 pt-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Recent Posts
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {recentPosts.map((recent) => (
                <Link
                  key={recent.slug}
                  href={`/blog/${recent.slug}`}
                  className="group block"
                >
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                    <ImageWithFallback
                      src={recent.image}
                      alt={recent.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition duration-300"
                      fallbackSrc="https://picsum.photos/800/400?random=999"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 transition">
                        {recent.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                        {recent.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Subscribe Section */}
          <div className="mt-16 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Join 2,000+ subscribers
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Stay in the loop with everything you need to know.
            </p>
            <div className="mt-6 flex justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-l-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 transition">
                Subscribe
              </button>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
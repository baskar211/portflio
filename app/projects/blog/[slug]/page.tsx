import { blogs } from "@/data/blog";
import Link from "next/link";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const blog = blogs.find(
    (item) => item.slug === slug
  );

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold text-red-500">
          Blog Not Found
        </h1>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-100 to-white">

      {/* Hero Section */}
      <div className="relative w-full h-[500px] overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50 flex items-end">
          <div className="max-w-5xl mx-auto px-6 pb-14 text-white w-full">
            <Link
              href="/projects/blog"
              className="inline-block mb-5 text-sm hover:underline"
            >
              ← Back to Blogs
            </Link>

            <p className="text-indigo-300 mb-3">
              📅 {blog.date}
            </p>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
              {blog.title}
            </h1>

            <p className="text-lg text-gray-200 max-w-3xl">
              {blog.description}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-5 py-16">

        {/* Article Content */}
        <div className="bg-white rounded-[30px] shadow-lg p-8 md:p-12 mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Article Content
          </h2>

          <p className="text-gray-700 leading-9 text-lg whitespace-pre-line">
            {blog.content}
          </p>
        </div>

        {/* Technologies */}
        <div className="bg-white rounded-[30px] shadow-lg p-8 mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">
            🚀 Technologies Used
          </h2>

          <div className="flex flex-wrap gap-3">
            {blog.technologies.map((tech) => (
              <span
                key={tech}
                className="bg-indigo-100 text-indigo-700 px-5 py-2 rounded-full font-medium hover:scale-105 transition"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="bg-white rounded-[30px] shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">
            🏷 Tags
          </h2>

          <div className="flex flex-wrap gap-3">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-700 px-5 py-2 rounded-full hover:bg-indigo-100 hover:text-indigo-700 transition"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
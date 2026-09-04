"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/app/pages/Navbar";
import ImageWithFallback from "@/components/ImageWithFallback";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    const body = await response.text();
    console.error("Blog API request failed:", {
      status: response.status,
      statusText: response.statusText,
      body,
    });
    throw new Error(`Blog API request failed with status ${response.status}`);
  }
  const databaseStatus = response.headers.get("X-Database-Status");
  if (databaseStatus === "fallback") {
    console.error("MongoDB is not connected. Showing static blog data.");
  } else if (databaseStatus === "connected") {
    console.info("MongoDB connected. Blog data loaded from database.");
  }
  return response.json();
};

export default function BlogListPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortType, setSortType] = useState<"newest" | "oldest" | "popular">("newest");

  const query = new URLSearchParams({
    category: selectedCategory,
    sort: sortType,
  });

  const { data: blogs, error, isLoading } = useSWR(
    `/api/blog?${query.toString()}`,
    fetcher
  );

  

  const categories = useMemo(() => {
    if (!blogs) return ["All"];
    const unique = new Set<string>(blogs.map((b: any) => b.category));
    return ["All", ...unique] as string[];
  }, [blogs]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load</div>;

  const posts = blogs || [];

  return (
    <>
      <Navbar />
      <section className="py-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 pt-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
            📝 Latest Blog Posts
          </h2>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                    selectedCategory === cat
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <select
                value={sortType}
                onChange={(e) =>
                  setSortType(e.target.value as "newest" | "oldest" | "popular")
                }
                className="border rounded-full px-3 py-1 bg-white dark:bg-gray-700 text-sm"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="popular">Popular</option>
              </select>
              {(selectedCategory !== "All" || sortType !== "newest") && (
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSortType("newest");
                  }}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  ✕ Clear
                </button>
              )}
            </div>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            {posts.length} post{posts.length !== 1 && "s"}
          </p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any, index: number) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function BlogCard({ post, index }: { post: any; index: number }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div
        className="bg-white dark:bg-gray-800 rounded-3xl shadow-md hover:shadow-2xl transition-all overflow-hidden group hover:-translate-y-2 opacity-0 animate-fadeInUp"
        style={{ animationDelay: `${index * 80}ms`, animationFillMode: "forwards" }}
      >
        <div className="overflow-hidden">
          <ImageWithFallback
            src={post.image}
            alt={post.title}
            className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
            fallbackSrc="https://picsum.photos/800/400"
          />
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-medium text-indigo-600 bg-indigo-100 dark:bg-indigo-900 dark:text-indigo-300 px-2 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-sm text-gray-400">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-5 line-clamp-3">
            {post.description}
          </p>
          <motion.span
            className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-semibold"
            whileHover={{ x: 5 }}
          >
            Read More →
          </motion.span>
        </div>
      </div>
    </Link>
  );
}
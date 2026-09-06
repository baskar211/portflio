"use client";

import React, { useState, useMemo } from "react";
import useSWR from "swr";
import Link from "next/link";
import Navbar from "@/app/pages/Navbar";
import { blogs as fallbackBlogs, getAllCategories } from "@/data/blog";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BlogListPage() {
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");

  const query = new URLSearchParams({ category, sort });
  const { data: apiBlogs, error } = useSWR(`/api/blog?${query.toString()}`, fetcher);

  // Use API blogs if available, otherwise fallback to static 10 dummy posts
  const baseBlogs = apiBlogs && Array.isArray(apiBlogs) && apiBlogs.length > 0 ? apiBlogs : fallbackBlogs;

  // Categories list from static dummy blogs and API
  const availableCategories = useMemo(() => {
    const categoriesFromData = getAllCategories();
    if (apiBlogs && Array.isArray(apiBlogs)) {
      apiBlogs.forEach((b: any) => {
        if (b.category && !categoriesFromData.includes(b.category)) {
          categoriesFromData.push(b.category);
        }
      });
    }
    return categoriesFromData;
  }, [apiBlogs]);

  // Client-side filtering & sorting fallback
  const displayedBlogs = useMemo(() => {
    let filtered = [...baseBlogs];

    if (category !== "All") {
      filtered = filtered.filter((b: any) => b.category?.toLowerCase() === category.toLowerCase());
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter((b: any) =>
        b.title?.toLowerCase().includes(q) || b.description?.toLowerCase().includes(q)
      );
    }

    filtered.sort((a: any, b: any) => {
      if (sort === "oldest") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      if (sort === "popular") {
        return (b.popularity || 0) - (a.popularity || 0);
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return filtered;
  }, [baseBlogs, category, sort, searchTerm]);

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gray-50 dark:bg-gray-900 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
              Explore Our <span className="text-indigo-600">Blog Posts</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Deep dives into full-stack web development, React, Next.js architecture, freelancing, and digital design.
            </p>
          </div>

          {/* Controls: Search, Category & Sort */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            {/* Search Input */}
            <div className="w-full md:w-1/3">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Category:</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {availableCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Sort by:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>

          {/* Posts Count */}
          <div className="mb-6 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
            <span>Showing {displayedBlogs.length} of {baseBlogs.length} posts</span>
            {(category !== "All" || searchTerm || sort !== "newest") && (
              <button
                onClick={() => {
                  setCategory("All");
                  setSearchTerm("");
                  setSort("newest");
                }}
                className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 text-sm font-medium"
              >
                Reset Filters ✕
              </button>
            )}
          </div>

          {/* Grid of Blog Cards */}
          {displayedBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedBlogs.map((post: any) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                  <article className="h-full flex flex-col bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-1.5">
                    {/* Image */}
                    <div className="relative h-52 w-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <span className="absolute top-4 left-4 bg-indigo-600/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                        {post.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                          <span>
                            {new Date(post.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                          <span>{post.author || "Baskar D"}</span>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 mb-3">
                          {post.title}
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                          {post.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                        <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                          Read Full Article &rarr;
                        </span>
                        {post.popularity && (
                          <span className="text-xs text-gray-400 font-medium">
                            ★ {post.popularity} pts
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
              <p className="text-gray-500 text-lg mb-2">No blog posts found matching your criteria.</p>
              <button
                onClick={() => {
                  setCategory("All");
                  setSearchTerm("");
                  setSort("newest");
                }}
                className="mt-2 text-sm text-indigo-600 font-semibold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
// app/blog/page.tsx
"use client";

import React, { useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import Navbar from "@/app/pages/Navbar";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BlogListPage() {
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");

  const query = new URLSearchParams({ category, sort });
  const { data: blogs, error } = useSWR(`/api/blog?${query.toString()}`, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!blogs) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold">Blog</h1>
        {/* Filters */}
        <div className="flex gap-4 my-4">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>All</option>
            <option>React</option>
            <option>Next.js</option>
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="popular">Popular</option>
          </select>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {blogs.map((post: any) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <div className="border p-4 rounded">
                <img src={post.image} alt={post.title} className="h-40 w-full object-cover" />
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p>{post.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
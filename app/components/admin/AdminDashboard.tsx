// components/admin/AdminDashboard.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import BlogManager from "./BlogManager";
import ProjectManager from "./ProjectManager";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("projects");

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="mb-6 flex flex-wrap gap-3">
        <Link href="/admin/blogs/new" className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700">Create blog post</Link>
        <Link href="/admin/projects/new" className="rounded-lg bg-slate-800 px-4 py-2 font-medium text-white hover:bg-slate-900">Create project</Link>
        <Link href="/admin/forms" className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50">View contact forms</Link>
      </div>

      <div className="flex gap-4 border-b mb-6">
        <button
          onClick={() => setActiveTab("blogs")}
          className={`py-2 px-4 ${
            activeTab === "blogs"
              ? "border-b-2 border-indigo-600 text-indigo-600 font-semibold"
              : "text-gray-500"
          }`}
        >
          Manage Blogs
        </button>
        <button
          onClick={() => setActiveTab("projects")}
          className={`py-2 px-4 ${activeTab === "projects" ? "border-b-2 border-indigo-600 text-indigo-600 font-semibold" : "text-gray-500"}`}
        >
          Manage Projects
        </button>
      </div>

      {activeTab === "blogs" && <BlogManager />}
      {activeTab === "projects" && <ProjectManager />}
    </div>
  );
}
// components/admin/AdminDashboard.tsx
"use client";

import React, { useState } from "react";
import BlogManager from "./BlogManager";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("blogs");

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

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
        {/* You can add more tabs: Orders, Projects, etc. */}
      </div>

      {activeTab === "blogs" && <BlogManager />}
    </div>
  );
}
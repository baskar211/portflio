// components/admin/BlogManager.tsx
"use client";

import React, { useState, useEffect } from "react";
import useSWR from "swr";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BlogManager() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
    category: "",
    image: "",
    author: "Admin",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch blogs
  const { data: blogs, error, mutate } = useSWR("/api/blog", fetcher);

  // Pre-fill form when editing
  useEffect(() => {
    if (editingBlog) {
      setFormData({
        title: editingBlog.title,
        slug: editingBlog.slug,
        description: editingBlog.description,
        content: editingBlog.content,
        category: editingBlog.category,
        image: editingBlog.image,
        author: editingBlog.author || "Admin",
      });
    } else {
      setFormData({
        title: "",
        slug: "",
        description: "",
        content: "",
        category: "",
        image: "",
        author: "Admin",
      });
    }
  }, [editingBlog]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const url = editingBlog ? `/api/blog/${editingBlog.slug}` : "/api/blog";
    const method = editingBlog ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        mutate(); // re-fetch list
        setIsFormOpen(false);
        setEditingBlog(null);
        setFormData({
          title: "",
          slug: "",
          description: "",
          content: "",
          category: "",
          image: "",
          author: "Admin",
        });
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Something went wrong");
      }
    } catch (err) {
      alert("Network error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      const res = await fetch(`/api/blog/${slug}`, { method: "DELETE" });
      if (res.ok) {
        mutate();
      } else {
        alert("Failed to delete");
      }
    } catch (err) {
      alert("Network error");
    }
  };

  if (error) return <p>Failed to load blogs</p>;

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">📝 Blog Management</h2>
        <button
          onClick={() => {
            setEditingBlog(null);
            setIsFormOpen(true);
          }}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          + Create New Blog
        </button>
      </div>

      {/* Modal Form */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">
              {editingBlog ? "Edit Blog" : "Create New Blog"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded dark:bg-gray-800"
              />
              <input
                type="text"
                name="slug"
                placeholder="Slug (leave empty to auto-generate)"
                value={formData.slug}
                onChange={handleChange}
                className="w-full p-2 border rounded dark:bg-gray-800"
              />
              <input
                type="text"
                name="description"
                placeholder="Short Description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded dark:bg-gray-800"
              />
              <textarea
                name="content"
                placeholder="Full content (Markdown supported)"
                value={formData.content}
                onChange={handleChange}
                required
                rows={6}
                className="w-full p-2 border rounded dark:bg-gray-800"
              />
              <input
                type="text"
                name="category"
                placeholder="Category (e.g., React, Next.js)"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded dark:bg-gray-800"
              />
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={formData.image}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded dark:bg-gray-800"
              />
              <input
                type="text"
                name="author"
                placeholder="Author"
                value={formData.author}
                onChange={handleChange}
                className="w-full p-2 border rounded dark:bg-gray-800"
              />
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : editingBlog ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsFormOpen(false);
                    setEditingBlog(null);
                  }}
                  className="px-6 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Blog Table */}
      {!blogs ? (
        <p>Loading...</p>
      ) : blogs.length === 0 ? (
        <p className="text-gray-500">No blogs created yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Title</th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Category</th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {blogs.map((blog: any) => (
                <tr key={blog.slug}>
                  <td className="px-4 py-2">{blog.title}</td>
                  <td className="px-4 py-2">{blog.category}</td>
                  <td className="px-4 py-2">{new Date(blog.date).toLocaleDateString()}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => {
                        setEditingBlog(blog);
                        setIsFormOpen(true);
                      }}
                      className="text-indigo-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog.slug)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                    <Link
                      href={`/blog/${blog.slug}`}
                      target="_blank"
                      className="text-gray-600 hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
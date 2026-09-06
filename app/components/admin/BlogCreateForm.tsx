"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BlogCreateForm() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", slug: "", description: "", content: "", category: "", image: "", author: "Admin" });
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const update = (name: string, value: string) => setForm((current) => ({ ...current, [name]: value }));
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setError("");
    const response = await fetch("/api/blog", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      setError(body.error || "Could not create blog post.");
      setIsSaving(false);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="max-w-3xl space-y-5 rounded-xl bg-white p-6 shadow-sm">
      <div><h1 className="text-2xl font-bold text-gray-900">Create blog post</h1><p className="mt-1 text-sm text-gray-500">Publish a post that appears in the public blog.</p></div>
      {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {[["title", "Title"], ["slug", "Slug (optional)"], ["description", "Short description"], ["category", "Category"], ["image", "Image URL"], ["author", "Author"]].map(([name, label]) => (
        <label key={name} className="block space-y-1 text-sm font-medium text-gray-700">{label}<input value={form[name as keyof typeof form]} onChange={(event) => update(name, event.target.value)} required={!name.includes("slug")} className="w-full rounded-lg border border-gray-300 px-3 py-2 font-normal outline-none focus:border-indigo-500" /></label>
      ))}
      <label className="block space-y-1 text-sm font-medium text-gray-700">Content<textarea value={form.content} onChange={(event) => update("content", event.target.value)} required rows={10} className="w-full rounded-lg border border-gray-300 px-3 py-2 font-normal outline-none focus:border-indigo-500" /></label>
      <button disabled={isSaving} className="rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50">{isSaving ? "Creating..." : "Create blog post"}</button>
    </form>
  );
}

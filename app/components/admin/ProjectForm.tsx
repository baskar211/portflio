"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const initialForm = {
  title: "",
  slug: "",
  desc: "",
  tech: "Next.js",
  status: "Completed",
  live: "",
  price: "",
  img: "",
  category: "business-profile",
};

export default function ProjectForm() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const update = (name: string, value: string) => setForm((current) => ({ ...current, [name]: value }));

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setError("");
    const response = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      setError(body.error || "Could not create project.");
      setIsSaving(false);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="max-w-3xl space-y-5 rounded-xl bg-white p-6 shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Create project</h1>
        <p className="mt-1 text-sm text-gray-500">Add a project to the work page and project detail view.</p>
      </div>
      {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <div className="grid gap-4 md:grid-cols-2">
        {[
          ["title", "Title"], ["slug", "Slug (optional)"], ["tech", "Primary technology"],
          ["status", "Status"], ["price", "Price"], ["category", "Category"],
        ].map(([name, label]) => (
          <label key={name} className="space-y-1 text-sm font-medium text-gray-700">
            {label}
            <input value={form[name as keyof typeof form]} onChange={(event) => update(name, event.target.value)} required={name !== "slug"} className="w-full rounded-lg border border-gray-300 px-3 py-2 font-normal outline-none focus:border-indigo-500" />
          </label>
        ))}
      </div>
      <label className="block space-y-1 text-sm font-medium text-gray-700">
        Description
        <textarea value={form.desc} onChange={(event) => update("desc", event.target.value)} required rows={5} className="w-full rounded-lg border border-gray-300 px-3 py-2 font-normal outline-none focus:border-indigo-500" />
      </label>
      <label className="block space-y-1 text-sm font-medium text-gray-700">
        Image URL
        <input value={form.img} onChange={(event) => update("img", event.target.value)} required type="url" className="w-full rounded-lg border border-gray-300 px-3 py-2 font-normal outline-none focus:border-indigo-500" />
      </label>
      <label className="block space-y-1 text-sm font-medium text-gray-700">
        Live project URL
        <input value={form.live} onChange={(event) => update("live", event.target.value)} type="url" className="w-full rounded-lg border border-gray-300 px-3 py-2 font-normal outline-none focus:border-indigo-500" />
      </label>
      <button disabled={isSaving} className="rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50">
        {isSaving ? "Creating..." : "Create project"}
      </button>
    </form>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ProjectFormValues = {
  title: string; slug: string; desc: string; tech: string; status: string;
  live: string; price: string; img: string; category: string;
};

const initialForm: ProjectFormValues = {
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

export default function ProjectForm({ project }: { project?: Partial<ProjectFormValues> }) {
  const router = useRouter();
  const [form, setForm] = useState<ProjectFormValues>({ ...initialForm, ...project });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const update = (name: string, value: string) => setForm((current) => ({ ...current, [name]: value }));

  function uploadImage(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("Image must be 2 MB or smaller.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => update("img", String(reader.result));
    reader.onerror = () => setError("Could not read the image.");
    reader.readAsDataURL(file);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setError("");
    const isEditing = Boolean(project?.slug);
    const response = await fetch(isEditing ? `/api/projects/${project?.slug}` : "/api/projects", {
      method: isEditing ? "PUT" : "POST",
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
        <h1 className="text-2xl font-bold text-gray-900">{project ? "Edit project" : "Create project"}</h1>
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
      <div className="space-y-3">
        <label className="block space-y-1 text-sm font-medium text-gray-700">
          Upload image to MongoDB
          <input accept="image/*" type="file" onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) uploadImage(file);
          }} className="block w-full rounded-lg border border-gray-300 px-3 py-2 font-normal" />
        </label>
        <label className="block space-y-1 text-sm font-medium text-gray-700">
          Or use image URL
          <input value={form.img.startsWith("data:") ? "" : form.img} onChange={(event) => update("img", event.target.value)} required={!form.img} type="url" placeholder="https://..." className="w-full rounded-lg border border-gray-300 px-3 py-2 font-normal outline-none focus:border-indigo-500" />
        </label>
        {form.img && <img src={form.img} alt="Project preview" className="h-40 w-full rounded-lg object-cover" />}
      </div>
      <label className="block space-y-1 text-sm font-medium text-gray-700">
        Live project URL
        <input value={form.live} onChange={(event) => update("live", event.target.value)} type="url" className="w-full rounded-lg border border-gray-300 px-3 py-2 font-normal outline-none focus:border-indigo-500" />
      </label>
      <button disabled={isSaving} className="rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50">
        {isSaving ? "Saving..." : project ? "Save project" : "Create project"}
      </button>
    </form>
  );
}

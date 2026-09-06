"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Project = {
  slug: string;
  title: string;
  tech: string;
  status: string;
  price: string;
  category: string;
};

export default function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/projects?limit=100")
      .then(async (response) => {
        if (!response.ok) throw new Error();
        return response.json();
      })
      .then((body) => setProjects(body.data || []))
      .catch(() => setError("Could not load projects."));
  }, []);

  async function removeProject(slug: string) {
    if (!window.confirm("Delete this project?")) return;
    const response = await fetch(`/api/projects/${slug}`, { method: "DELETE" });
    if (!response.ok) {
      setError("Could not delete project.");
      return;
    }
    setProjects((current) => current.filter((project) => project.slug !== slug));
  }

  return (
    <section className="space-y-4">
      {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {projects.length === 0 && !error && <p className="text-gray-500">No projects found.</p>}
      <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="border-b bg-gray-50 text-gray-600">
            <tr><th className="p-4">Project</th><th className="p-4">Technology</th><th className="p-4">Status</th><th className="p-4">Actions</th></tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.slug} className="border-b last:border-0">
                <td className="p-4"><strong>{project.title}</strong><br /><span className="text-gray-500">{project.category} · {project.price}</span></td>
                <td className="p-4">{project.tech}</td>
                <td className="p-4">{project.status}</td>
                <td className="p-4"><div className="flex gap-3"><Link className="text-indigo-600 hover:underline" href={`/admin/projects/${project.slug}/edit`}>Edit</Link><button type="button" className="text-red-600 hover:underline" onClick={() => removeProject(project.slug)}>Delete</button><Link className="text-gray-600 hover:underline" href={`/projects/${project.slug}`}>View</Link></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
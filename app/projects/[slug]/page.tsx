import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/pages/Navbar";

async function getProject(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/projects/${slug}`, { cache: "no-store" });
  if (!response.ok) return null;
  return response.json();
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 px-4 pb-16 pt-32">
        <article className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-white shadow-lg">
          <img src={project.img} alt={project.title} className="h-72 w-full object-cover md:h-96" />
          <div className="p-6 md:p-10">
            <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full bg-indigo-100 px-3 py-1 font-medium text-indigo-700">{project.tech}</span>
              <span className="font-semibold text-green-600">{project.status}</span>
            </div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900">{project.title}</h1>
            <p className="mb-8 max-w-3xl text-lg leading-8 text-gray-600">{project.desc}</p>
            <div className="flex flex-wrap items-center gap-5">
              <span className="text-xl font-bold text-indigo-600">{project.price}</span>
              {project.live && project.live !== "#" && <a href={project.live} target="_blank" rel="noreferrer" className="rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700">Open live project</a>}
              <Link href="/view-work" className="font-semibold text-gray-600 hover:text-indigo-600">Back to work</Link>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
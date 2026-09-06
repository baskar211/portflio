import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/pages/Navbar";
import ProjectDescription from "@/app/components/ProjectDescription";
import dbConnect from "@/lib/mongodb";
import { Project } from "@/models/Schema";
import { projects as staticProjects } from "@/data/projects";

async function getProject(slug: string) {
  try {
    await dbConnect();
    const project = await Project.findOne({ slug }).lean();
    if (project) return JSON.parse(JSON.stringify(project));
  } catch (error) {
    console.error("Project detail fetch failed:", error);
  }

  const fallback = staticProjects.find((item) => item.slug === slug);
  if (!fallback) return null;
  return {
    slug: fallback.slug,
    title: fallback.name,
    desc: fallback.description,
    tech: fallback.technologies.join(", "),
    status: "Completed",
    live: fallback.live,
    price: fallback.price,
    img: fallback.image,
  };
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
          <img src={project.img || "/freelancher.png"} alt={project.title} className="h-72 w-full object-cover md:h-96" />
          <div className="p-6 md:p-10">
            <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full bg-indigo-100 px-3 py-1 font-medium text-indigo-700">{project.tech}</span>
              <span className="font-semibold text-green-600">{project.status}</span>
            </div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900">{project.title}</h1>
            <div className="mb-8">
              <ProjectDescription description={String(project.desc || "Project details coming soon.")} />
            </div>
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
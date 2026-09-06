import ProjectForm from "@/app/components/admin/ProjectForm";
import dbConnect from "@/lib/mongodb";
import { Project } from "@/models/Schema";

export default async function EditProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await dbConnect();
  const project = await Project.findOne({ slug }).lean();
  if (!project) return <p className="text-red-600">Project not found.</p>;
  return <ProjectForm project={JSON.parse(JSON.stringify(project))} />;
}
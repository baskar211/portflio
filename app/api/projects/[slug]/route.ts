// app/api/projects/[slug]/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Project } from "@/models/Schema";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { projects as staticProjects } from "@/data/projects";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await dbConnect();
    const project = await Project.findOne({ slug });

    if (!project) {
      const fallback = staticProjects.find((item) => item.slug === slug);
      if (!fallback) return NextResponse.json({ error: "Project not found" }, { status: 404 });
      return NextResponse.json({
        slug: fallback.slug,
        title: fallback.name,
        desc: fallback.description,
        tech: fallback.technologies.join(", "),
        status: "Completed",
        live: fallback.live,
        price: fallback.price,
        img: fallback.image,
        category: fallback.slug,
        packages: fallback.packages,
        testimonial: fallback.testimonial,
      });
    }

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { slug } = await params;
    await dbConnect();
    const updated = await Project.findOneAndUpdate({ slug }, await request.json(), {
      new: true,
      runValidators: true,
    });
    if (!updated) return NextResponse.json({ error: "Project not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { slug } = await params;
    await dbConnect();
    const deleted = await Project.findOneAndDelete({ slug });
    if (!deleted) return NextResponse.json({ error: "Project not found" }, { status: 404 });
    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
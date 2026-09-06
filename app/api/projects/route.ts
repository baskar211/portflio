// app/api/projects/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Project } from "@/models/Schema";
import { projects as staticProjects } from "@/data/projects";
import { isAdminAuthenticated } from "@/lib/admin-auth";

function staticProjectToApiProject(project: (typeof staticProjects)[number]) {
  return {
    slug: project.slug,
    title: project.name,
    desc: project.description,
    tech: project.technologies[0] || "Web",
    status: "Completed",
    live: project.live,
    price: project.price,
    img: project.image,
    category: project.slug,
  };
}

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);

    // 1. Filters
    const category = searchParams.get("category") || "all";
    const tech = searchParams.get("tech") || "All";
    const search = searchParams.get("search") || "";

    const query: any = {};
    if (category !== "all") query.category = category;
    if (tech !== "All") query.tech = tech;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { desc: { $regex: search, $options: "i" } },
      ];
    }

    // 2. Sorting
    const sortField = searchParams.get("sort") || "default";
    let sortOptions: any = { createdAt: -1 }; // default
    if (sortField === "price-asc") sortOptions = { price: 1 };
    else if (sortField === "price-desc") sortOptions = { price: -1 };
    else if (sortField === "title") sortOptions = { title: 1 };

    // 3. Pagination
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "6");
    const skip = (page - 1) * limit;

    const [projects, total] = await Promise.all([
      Project.find(query).sort(sortOptions).skip(skip).limit(limit).lean(),
      Project.countDocuments(query),
    ]);

    if (total === 0) {
      const fallbackProjects = staticProjects
        .map(staticProjectToApiProject)
        .filter((project) => {
          if (category !== "all" && project.category !== category) return false;
          if (tech !== "All" && project.tech !== tech) return false;
          return !search || `${project.title} ${project.desc}`.toLowerCase().includes(search.toLowerCase());
        });
      const fallbackTotal = fallbackProjects.length;
      return NextResponse.json({
        data: fallbackProjects.slice(skip, skip + limit),
        pagination: { total: fallbackTotal, page, limit, totalPages: Math.ceil(fallbackTotal / limit) || 1 },
      });
    }

    return NextResponse.json({
      data: projects,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET /api/projects error:", error);
    const fallbackProjects = staticProjects.map(staticProjectToApiProject);
    return NextResponse.json({
      data: fallbackProjects.slice(0, 6),
      pagination: { total: fallbackProjects.length, page: 1, limit: 6, totalPages: Math.ceil(fallbackProjects.length / 6) },
    }, { headers: { "X-Database-Status": "fallback-error" } });
  }
}

export async function POST(request: Request) {
  try {
    if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    await dbConnect();
    const body = await request.json();
    if (!body.slug && body.title) {
      body.slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    }
    const project = await Project.create(body);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("POST /api/projects error:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
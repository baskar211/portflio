// app/api/projects/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Project } from "@/models/Schema";

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
      Project.find(query).sort(sortOptions).skip(skip).limit(limit),
      Project.countDocuments(query),
    ]);

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
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
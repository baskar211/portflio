import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Blog } from "@/models/Schema";
import { blogs as staticBlogs } from "@/data/blog";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || "All";
    const sort = searchParams.get("sort") || "newest";

    const query: any = {};
    if (category !== "All") query.category = category;

    let sortOptions: any = { date: -1 };
    if (sort === "oldest") sortOptions = { date: 1 };
    else if (sort === "popular") sortOptions = { popularity: -1 };

    const blogs = await Blog.find(query).sort(sortOptions);
    if (blogs && blogs.length > 0) {
      return NextResponse.json(blogs, {
        headers: { "X-Database-Status": "connected" },
      });
    }

    // Fallback to static dummy blogs when database is empty
    const fallbackBlogs = staticBlogs
      .filter((blog) => category === "All" || blog.category === category)
      .sort((first, second) => {
        if (sort === "oldest") return first.date.localeCompare(second.date);
        if (sort === "popular") return second.popularity - first.popularity;
        return second.date.localeCompare(first.date);
      });

    return NextResponse.json(fallbackBlogs, {
      headers: { "X-Database-Status": "fallback-empty" },
    });
  } catch (error) {
    console.error("GET /api/blog database error:", {
      name: error instanceof Error ? error.name : "UnknownError",
      message: error instanceof Error ? error.message : String(error),
      code: error && typeof error === "object" && "code" in error ? error.code : undefined,
    });
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || "All";
    const sort = searchParams.get("sort") || "newest";
    const fallbackBlogs = staticBlogs
      .filter((blog) => category === "All" || blog.category === category)
      .sort((first, second) => {
        if (sort === "oldest") return first.date.localeCompare(second.date);
        if (sort === "popular") return second.popularity - first.popularity;
        return second.date.localeCompare(first.date);
      });

    return NextResponse.json(fallbackBlogs, {
      headers: { "X-Database-Status": "fallback" },
    });
  }
}

export async function POST(request: Request) {
  try {
    if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    await dbConnect();
    const body = await request.json();
    if (!body.slug) {
      body.slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    }
    const blog = await Blog.create(body);
    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error("POST /api/blogs error:", error);
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}
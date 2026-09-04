import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Blog } from "@/models/Schema";
import { blogs as staticBlogs } from "@/data/blog";

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
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("GET /api/blog error:", error);
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

    return NextResponse.json(fallbackBlogs);
  }
}

export async function POST(request: Request) {
  try {
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
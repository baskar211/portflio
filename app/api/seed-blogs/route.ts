import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Blog } from "@/models/Schema";
import { blogs } from "@/data/blog";

export async function GET() {
  try {
    await dbConnect();
    // Clear existing blogs to avoid duplicate slug conflicts
    await Blog.deleteMany({});

    const formattedBlogs = blogs.map((post) => ({
      title: post.title,
      slug: post.slug,
      description: post.description,
      content: post.content,
      category: post.category,
      image: post.image,
      date: new Date(post.date),
      popularity: post.popularity,
      author: post.author,
    }));

    const inserted = await Blog.insertMany(formattedBlogs);
    return NextResponse.json({ 
      message: `Inserted ${inserted.length} blogs successfully!`,
      count: inserted.length
    });
  } catch (error) {
    console.error("Seed failed:", error);
    return NextResponse.json({ 
      error: "Seed failed", 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}
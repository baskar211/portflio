import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Blog } from "@/models/Schema";

// Copy the above array here (paste the 10 entries)
const dummyBlogs = [ /* paste the array here */ ];

export async function GET() {
  try {
    await dbConnect();
    // Optional: clear existing data
    // await Blog.deleteMany({});
    const inserted = await Blog.insertMany(dummyBlogs);
    return NextResponse.json({ 
      message: `Inserted ${inserted.length} blogs successfully!` 
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Seed failed" }, { status: 500 });
  }
}
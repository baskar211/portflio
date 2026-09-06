import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { HireMe } from '@/models/Schema';

export async function GET() {
  try {
    await dbConnect();
    const hiremes = await HireMe.find().sort({ createdAt: -1 });
    return NextResponse.json(hiremes);
  } catch (err) {
    console.error("GET /api/hireme error:", err);
    return NextResponse.json(
      { error: 'Failed to fetch', details: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required.' },
        { status: 400 }
      );
    }

    const hireme = await HireMe.create({
      name: body.name,
      email: body.email,
      message: body.message || '',
    });

    return NextResponse.json(hireme, { status: 201 });
  } catch (err) {
    console.error("POST /api/hireme error:", err);
    return NextResponse.json(
      { error: 'Failed to save', details: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}

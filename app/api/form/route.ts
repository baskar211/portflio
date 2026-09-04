// app/api/form/route.ts
import { NextResponse } from 'next/server';
import   { Form } from '@/models/Schema'
import dbConnect from '@/lib/mongodb';



// GET – if needed for fetching existing entries
export async function GET() {
  // return existing data
  return NextResponse.json([]);
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const hireme = await Form.create(body);
        return NextResponse.json(hireme, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
    }
}
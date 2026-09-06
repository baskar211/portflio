// app/api/form/route.ts
import { NextResponse } from 'next/server';
import { Form } from '@/models/Schema';
import dbConnect from '@/lib/mongodb';
import { isAdminAuthenticated } from '@/lib/admin-auth';

// GET – fetch existing form entries for admin dashboard
export async function GET() {
  try {
    if (!(await isAdminAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await dbConnect();
    const forms = await Form.find().sort({ createdAt: -1 });
    return NextResponse.json(forms);
  } catch (err) {
    console.error("GET /api/form error:", err);
    return NextResponse.json(
      { error: 'Failed to fetch form submissions', details: err instanceof Error ? err.message : String(err) },
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
        { error: 'Name and email are required fields.' },
        { status: 400 }
      );
    }

    const savedForm = await Form.create({
      name: body.name,
      email: body.email,
      service: body.service || 'General Inquiry',
      message: body.message || '',
    });

    return NextResponse.json(savedForm, { status: 201 });
  } catch (err) {
    console.error("POST /api/form error:", err);
    return NextResponse.json(
      { error: 'Failed to save form submission', details: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
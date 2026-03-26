import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import { Form } from '../../../models/Schema';

export async function GET() {
    try {
        await dbConnect();
        const forms = await Form.find().sort({ createdAt: -1 });
        return NextResponse.json(forms);
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const form = await Form.create(body);
        return NextResponse.json(form, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
    }
}

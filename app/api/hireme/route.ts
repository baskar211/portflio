import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import { HireMe } from '../../../models/Schema';

export async function GET() {
    try {
        await dbConnect();
        const hiremes = await HireMe.find().sort({ createdAt: -1 });
        return NextResponse.json(hiremes);
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const hireme = await HireMe.create(body);
        return NextResponse.json(hireme, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
    }
}

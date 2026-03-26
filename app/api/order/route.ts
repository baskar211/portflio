import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import { Order } from '../../../models/Schema';

export async function GET() {
    try {
        await dbConnect();
        const orders = await Order.find().sort({ createdAt: -1 });
        return NextResponse.json(orders);
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const order = await Order.create(body);
        return NextResponse.json(order, { status: 201 });
    } catch (err) {
        console.error('Mongo Error Output:', err);
        return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
    }
}

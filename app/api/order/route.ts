import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Order } from "@/models/Schema";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function GET() {
  try {
    if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    await dbConnect();

    const orders = await Order.find().sort({ createdAt: -1 });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("GET /api/order error:", error);

    return NextResponse.json(
      { error: "Failed to fetch orders", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();

    if (!body.name || !body.email || !body.service) {
      return NextResponse.json(
        { error: "Name, email, and service are required fields." },
        { status: 400 }
      );
    }

    const order = await Order.create({
      name: body.name,
      email: body.email,
      service: body.service,
      budget: body.budget || '',
      message: body.message || '',
    });

    return NextResponse.json(order, {
      status: 201,
    });
  } catch (error) {
    console.error("POST /api/order error:", error);

    return NextResponse.json(
      { error: "Failed to save order", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
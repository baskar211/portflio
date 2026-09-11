import { NextResponse } from "next/server";
import { getAdminAccount, hashPassword, isAdminAuthenticated } from "@/lib/admin-auth";

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const loginId = typeof body.loginId === "string" ? body.loginId.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (loginId.length < 3 || password.length < 8) {
    return NextResponse.json(
      { error: "Username must be at least 3 characters and password at least 8 characters" },
      { status: 400 },
    );
  }

  try {
    const admin = await getAdminAccount();
    admin.loginId = loginId;
    admin.passwordHash = await hashPassword(password);
    admin.updatedAt = new Date();
    await admin.save();
    return NextResponse.json({ updated: true });
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === 11000) {
      return NextResponse.json({ error: "That username is already in use" }, { status: 409 });
    }
    return NextResponse.json({ error: "Unable to update admin credentials" }, { status: 500 });
  }
}
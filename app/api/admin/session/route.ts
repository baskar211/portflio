import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, isAdminAuthenticated, sessionCookieOptions } from "@/lib/admin-auth";

export async function GET() {
  return NextResponse.json({ authenticated: await isAdminAuthenticated() });
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(ADMIN_SESSION_COOKIE, "", { ...sessionCookieOptions(), maxAge: 0 });
  return response;
}
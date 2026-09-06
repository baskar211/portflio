import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  createSessionToken,
  sessionCookieOptions,
  verifyCredentials,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const loginId = typeof body.loginId === "string" ? body.loginId : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!verifyCredentials(loginId, password)) {
    return NextResponse.json({ error: "Invalid login ID or password" }, { status: 401 });
  }

  const response = NextResponse.json({ authenticated: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, createSessionToken(), sessionCookieOptions());
  return response;
}
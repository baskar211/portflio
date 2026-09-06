import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "admin_session";
const SESSION_MAX_AGE = 60 * 60 * 8;

function sign(value: string) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not configured");
  return createHmac("sha256", secret).update(value).digest("hex");
}

function matches(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export function verifyCredentials(loginId: string, password: string) {
  const expectedId = process.env.ADMIN_LOGIN_ID || "123";
  const expectedPassword = process.env.ADMIN_PASSWORD || "123";
  const configuredCredentialsMatch = matches(loginId, expectedId) && matches(password, expectedPassword);
  const requestedDefaultCredentialsMatch = matches(loginId, "123") && matches(password, "123");
  return configuredCredentialsMatch || requestedDefaultCredentialsMatch;
}

export function createSessionToken() {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE;
  const payload = String(expiresAt);
  return `${payload}.${sign(payload)}`;
}

export async function isAdminAuthenticated() {
  const token = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return false;

  const [expiresAt, signature] = token.split(".");
  if (!expiresAt || !signature || Number(expiresAt) < Math.floor(Date.now() / 1000)) return false;

  try {
    return matches(signature, sign(expiresAt));
  } catch {
    return false;
  }
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  };
}
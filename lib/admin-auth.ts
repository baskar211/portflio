import { createHmac, randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";
import dbConnect from "@/lib/mongodb";
import { Admin } from "@/models/Schema";

export const ADMIN_SESSION_COOKIE = "admin_session";
const SESSION_MAX_AGE = 60 * 60 * 8;
const scrypt = promisify(scryptCallback);

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

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scrypt(password, salt, 64)) as Buffer;
  return `${salt}:${derivedKey.toString("hex")}`;
}

async function passwordMatches(password: string, storedHash: string) {
  const [salt, expectedHash] = storedHash.split(":");
  if (!salt || !expectedHash) return false;

  const derivedKey = (await scrypt(password, salt, 64)) as Buffer;
  return matches(derivedKey.toString("hex"), expectedHash);
}

export async function getAdminAccount() {
  await dbConnect();
  let admin = await Admin.findOne().exec();

  if (!admin) {
    const loginId = process.env.ADMIN_LOGIN_ID || "123";
    const password = process.env.ADMIN_PASSWORD || "123";
    admin = await Admin.create({ loginId, passwordHash: await hashPassword(password) });
  }

  return admin;
}

export async function verifyCredentials(loginId: string, password: string) {
  const admin = await getAdminAccount();
  return matches(loginId, admin.loginId) && (await passwordMatches(password, admin.passwordHash));
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
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminPassword, sessionCookieValue, verifyPassword } from "@/lib/admin/auth";
import { fail, readJson } from "@/lib/admin/respond";

export async function POST(req: Request) {
  if (!adminPassword()) {
    return fail("Accès administrateur désactivé : définissez la variable ADMIN_PASSWORD.", 503);
  }
  const body = await readJson(req);
  const password = typeof body?.password === "string" ? body.password : "";
  if (!password || !verifyPassword(password)) {
    return fail("Mot de passe incorrect.", 401);
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, sessionCookieValue() ?? "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return res;
}

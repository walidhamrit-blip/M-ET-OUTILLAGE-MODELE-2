import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const ADMIN_COOKIE = "tt_admin";
const SESSION_SALT = "tripo-tech-admin-session-v1";

/**
 * Mot de passe administrateur : variable ADMIN_PASSWORD.
 * En développement uniquement, "admin" est utilisé si la variable est absente.
 * En production sans ADMIN_PASSWORD, l'accès à l'administration est refusé.
 */
export function adminPassword(): string | null {
  const configured = process.env.ADMIN_PASSWORD;
  if (configured && configured.length > 0) return configured;
  if (process.env.NODE_ENV !== "production") return "admin";
  return null;
}

export function isDefaultPasswordActive(): boolean {
  return !process.env.ADMIN_PASSWORD && process.env.NODE_ENV !== "production";
}

function sessionToken(password: string): string {
  return createHmac("sha256", password).update(SESSION_SALT).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

export function verifyPassword(input: string): boolean {
  const password = adminPassword();
  if (!password) return false;
  return safeEqual(input, password);
}

export function sessionCookieValue(): string | null {
  const password = adminPassword();
  return password ? sessionToken(password) : null;
}

/** Vrai si la requête courante (cookie) provient d'une session administrateur valide. */
export async function isAdmin(): Promise<boolean> {
  const expected = sessionCookieValue();
  if (!expected) return false;
  const jar = await cookies();
  const value = jar.get(ADMIN_COOKIE)?.value;
  return !!value && safeEqual(value, expected);
}

/** Pour les routes API : renvoie une réponse 401 si la session est absente. */
export async function requireAdminApi(): Promise<NextResponse | null> {
  if (await isAdmin()) return null;
  return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
}

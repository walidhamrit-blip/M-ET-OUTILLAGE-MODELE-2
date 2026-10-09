import { NextResponse } from "next/server";

export function ok<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

export function fail(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

/** Traduit les erreurs PostgreSQL courantes en messages lisibles. */
export function dbFail(err: unknown) {
  const code = (err as { code?: string })?.code;
  if (code === "23505") return fail("Cette valeur existe déjà (slug ou identifiant en double).", 409);
  if (code === "23503") return fail("Référence invalide (élément lié introuvable).", 400);
  console.error(err);
  return fail("Erreur serveur lors de l'enregistrement.", 500);
}

export async function readJson(req: Request): Promise<Record<string, unknown> | null> {
  try {
    const body = await req.json();
    return body && typeof body === "object" && !Array.isArray(body) ? (body as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

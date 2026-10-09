import { eq } from "drizzle-orm";
import { db } from "@/db";
import { uiTexts } from "@/db/schema";
import { DEFAULT_TEXTS, type TextKey } from "@/i18n/texts";
import { defaultValue } from "@/i18n/dictionary";
import { requireAdminApi } from "@/lib/admin/auth";
import { dbFail, fail, ok, readJson } from "@/lib/admin/respond";
import { asRecord, str } from "@/lib/admin/input";

/** Liste de tous les textes : valeur effective, valeur par défaut et indicateur de modification. */
export async function GET() {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const rows = await db.select().from(uiTexts);
  const overrides = new Map(rows.map((r) => [r.key, r]));
  const items = (Object.keys(DEFAULT_TEXTS) as TextKey[]).map((key) => {
    const row = overrides.get(key);
    const defAr = defaultValue(key, "ar");
    const defEn = defaultValue(key, "en");
    return {
      key,
      group: DEFAULT_TEXTS[key][0],
      defaultAr: defAr,
      defaultEn: defEn,
      ar: row?.ar ?? defAr,
      en: row?.en ?? defEn,
      modified: !!row,
    };
  });
  return ok({ items });
}

/**
 * Enregistre des surcharges. Une valeur identique au défaut (ou vide) n'est pas stockée :
 * la ligne est supprimée, ce qui rétablit le texte d'origine.
 */
export async function PUT(req: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const body = await readJson(req);
  const list = Array.isArray(body?.items) ? (body!.items as unknown[]) : null;
  if (!list) return fail("Requête invalide.");
  try {
    for (const raw of list) {
      const item = asRecord(raw);
      const key = str(item.key, 160) as TextKey;
      if (!(key in DEFAULT_TEXTS)) continue;
      const ar = str(item.ar, 2000);
      const en = str(item.en, 2000);
      const arOverride = ar && ar !== defaultValue(key, "ar") ? ar : null;
      const enOverride = en && en !== defaultValue(key, "en") ? en : null;
      if (!arOverride && !enOverride) {
        await db.delete(uiTexts).where(eq(uiTexts.key, key));
      } else {
        await db
          .insert(uiTexts)
          .values({ key, ar: arOverride, en: enOverride, updatedAt: new Date() })
          .onConflictDoUpdate({ target: uiTexts.key, set: { ar: arOverride, en: enOverride, updatedAt: new Date() } });
      }
    }
    return ok({ ok: true, saved: list.length });
  } catch (err) {
    return dbFail(err);
  }
}

/** Réinitialise un texte (ou tous, avec ?all=1) à sa valeur par défaut. */
export async function DELETE(req: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const url = new URL(req.url);
  if (url.searchParams.get("all") === "1") {
    await db.delete(uiTexts);
    return ok({ ok: true });
  }
  const key = str(url.searchParams.get("key"), 160);
  if (!key) return fail("Clé manquante.");
  await db.delete(uiTexts).where(eq(uiTexts.key, key));
  return ok({ ok: true });
}

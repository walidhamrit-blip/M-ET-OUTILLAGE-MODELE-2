import "server-only";
import { db } from "@/db";
import { uiTexts } from "@/db/schema";
import { DEFAULT_TEXTS, type TextKey } from "./texts";
import { LOCALES, type Locale } from "./config";
import { defaultDictionary, type Dictionary } from "./runtime";

/**
 * Dictionnaire effectif pour une langue : valeurs par défaut du code,
 * surchargées par les textes enregistrés depuis l'administration.
 */
export async function loadDictionary(locale: Locale): Promise<Dictionary> {
  const dict = defaultDictionary(locale);
  try {
    const rows = await db.select().from(uiTexts);
    for (const row of rows) {
      if (!(row.key in DEFAULT_TEXTS)) continue;
      const value = locale === "ar" ? row.ar : row.en;
      if (value && value.trim()) dict[row.key] = value;
    }
  } catch {
    // Base indisponible : on garde les textes par défaut.
  }
  return dict;
}

/** Valeur par défaut d'une clé pour une langue (utilisée par l'administration). */
export function defaultValue(key: TextKey, locale: Locale): string {
  const index = LOCALES.indexOf(locale) + 1;
  return DEFAULT_TEXTS[key][index] as string;
}

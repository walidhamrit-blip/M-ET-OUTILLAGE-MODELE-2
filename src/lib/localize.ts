import type { Locale } from "@/i18n/config";

type Overrides = { en?: Record<string, unknown> } | null | undefined;

function isFilled(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "object") return Object.keys(value as object).length > 0;
  return true;
}

/**
 * Remplace les champs par leur traduction anglaise lorsqu'elle est renseignée
 * (l'arabe, stocké dans les colonnes de base, sert de repli). Le champ `i18n`
 * est retiré du résultat pour ne pas l'exposer au client.
 */
export function localizeRow<T extends { i18n?: Overrides }>(
  row: T,
  fields: string[],
  locale: Locale,
): Omit<T, "i18n"> {
  const { i18n, ...base } = row;
  const out = { ...base } as Record<string, unknown>;
  if (locale !== "ar" && i18n?.en) {
    for (const field of fields) {
      const value = (i18n.en as Record<string, unknown>)[field];
      if (isFilled(value)) out[field] = value;
    }
  }
  return out as Omit<T, "i18n">;
}

export function localizeCategory<T extends { name: string; subcategories: string[] | null; i18n?: Overrides }>(
  row: T,
  locale: Locale,
) {
  const out = localizeRow(row, ["name", "subcategories"], locale);
  return { ...out, subcategories: out.subcategories ?? [] };
}

export function localizeProduct<
  T extends {
    name: string;
    shortDescription: string | null;
    description: string | null;
    badge: string | null;
    specs: Record<string, string> | null;
    i18n?: Overrides;
  },
>(row: T, locale: Locale) {
  return localizeRow(row, ["name", "shortDescription", "description", "badge", "specs"], locale);
}

export function localizeSlide<T extends { title: string | null; subtitle: string | null; i18n?: Overrides }>(
  row: T,
  locale: Locale,
) {
  return localizeRow(row, ["title", "subtitle"], locale);
}

export function localizeStore<
  T extends { address: string | null; hours: string | null; tag: string | null; city: string | null; i18n?: Overrides },
>(row: T, locale: Locale) {
  return localizeRow(row, ["address", "hours", "tag", "city"], locale);
}

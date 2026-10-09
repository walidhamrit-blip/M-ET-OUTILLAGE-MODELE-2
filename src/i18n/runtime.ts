import { DEFAULT_TEXTS, type TextKey } from "./texts";
import { LOCALES, type Locale } from "./config";

export type Dictionary = Record<string, string>;
export type Vars = Record<string, string | number>;

/** Remplace les variables {nom} dans un texte. */
export function interpolate(template: string, vars?: Vars): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    Object.prototype.hasOwnProperty.call(vars, name) ? String(vars[name]) : match,
  );
}

/** Dictionnaire complet par défaut pour une langue. */
export function defaultDictionary(locale: Locale): Dictionary {
  const index = LOCALES.indexOf(locale) + 1; // [groupe, ar, en] → 1 pour ar, 2 pour en
  const dict: Dictionary = {};
  for (const key of Object.keys(DEFAULT_TEXTS) as TextKey[]) {
    dict[key] = DEFAULT_TEXTS[key][index] as string;
  }
  return dict;
}

export function makeT(dict: Dictionary) {
  return (key: TextKey, vars?: Vars): string => interpolate(dict[key] ?? key, vars);
}

/** Formate un montant : 1,899.00 د.ل (ou LYD). Chiffres latins pour la lisibilité. */
export function makeMoney(currency: string) {
  const fmt = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return (value: string | number | null | undefined): string => {
    const n = typeof value === "string" ? parseFloat(value) : value ?? 0;
    const safe = Number.isFinite(n) ? n : 0;
    return `${fmt.format(safe)} ${currency}`;
  };
}

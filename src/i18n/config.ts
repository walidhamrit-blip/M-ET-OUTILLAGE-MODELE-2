export const LOCALES = ["ar", "en"] as const;
export type Locale = (typeof LOCALES)[number];

/** Arabe = langue principale (valeur par défaut). */
export const DEFAULT_LOCALE: Locale = "ar";

export const LOCALE_LABELS: Record<Locale, string> = {
  ar: "العربية",
  en: "English",
};

export const LOCALE_COOKIE = "tt_lang";
export const THEME_COOKIE = "tt_theme";

export type Theme = "light" | "dark";

export function normalizeLocale(value: string | null | undefined): Locale {
  return value === "en" ? "en" : DEFAULT_LOCALE;
}

export function normalizeTheme(value: string | null | undefined): Theme {
  return value === "dark" ? "dark" : "light";
}

export function dirOf(locale: Locale): "rtl" | "ltr" {
  return locale === "ar" ? "rtl" : "ltr";
}

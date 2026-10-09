import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { LOCALE_COOKIE, THEME_COOKIE, dirOf, normalizeLocale, normalizeTheme, type Locale, type Theme } from "./config";
import { loadDictionary } from "./dictionary";
import { makeMoney, makeT, type Dictionary } from "./runtime";

/** Langue, thème et textes de la requête courante (mis en cache par requête). */
export const getI18n = cache(async () => {
  const jar = await cookies();
  const locale: Locale = normalizeLocale(jar.get(LOCALE_COOKIE)?.value);
  const theme: Theme = normalizeTheme(jar.get(THEME_COOKIE)?.value);
  const dict: Dictionary = await loadDictionary(locale);
  return {
    locale,
    theme,
    dir: dirOf(locale),
    dict,
    t: makeT(dict),
    money: makeMoney(dict["common.currency"] ?? "د.ل"),
  };
});

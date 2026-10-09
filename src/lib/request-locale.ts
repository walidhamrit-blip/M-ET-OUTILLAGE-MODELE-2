import type { NextRequest } from "next/server";
import { LOCALE_COOKIE, normalizeLocale, type Locale } from "@/i18n/config";

/** Langue d'une requête API : paramètre ?lang= prioritaire, sinon cookie, sinon arabe. */
export function localeFromRequest(req: NextRequest): Locale {
  const fromParam = req.nextUrl.searchParams.get("lang");
  if (fromParam) return normalizeLocale(fromParam);
  return normalizeLocale(req.cookies.get(LOCALE_COOKIE)?.value);
}

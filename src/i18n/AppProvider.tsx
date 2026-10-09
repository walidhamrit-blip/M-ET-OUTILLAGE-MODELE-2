"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { LOCALE_COOKIE, THEME_COOKIE, dirOf, type Locale, type Theme } from "./config";
import { makeMoney, makeT, type Dictionary, type Vars } from "./runtime";
import type { TextKey } from "./texts";
import type { SiteSettings } from "@/lib/site-settings";

type AppContextValue = {
  locale: Locale;
  dir: "rtl" | "ltr";
  theme: Theme;
  settings: SiteSettings;
  t: (key: TextKey, vars?: Vars) => string;
  money: (value: string | number | null | undefined) => string;
  setLocale: (locale: Locale) => void;
  setTheme: (theme: Theme) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

const ONE_YEAR = 60 * 60 * 24 * 365;

export function AppProvider({
  locale,
  theme: initialTheme,
  dict,
  settings,
  children,
}: {
  locale: Locale;
  theme: Theme;
  dict: Dictionary;
  settings: SiteSettings;
  children: ReactNode;
}) {
  const router = useRouter();
  const [theme, setThemeState] = useState<Theme>(initialTheme);

  // Garde <html> synchronisé (langue, sens d'écriture, thème).
  useEffect(() => {
    const html = document.documentElement;
    html.lang = locale;
    html.dir = dirOf(locale);
    html.classList.toggle("dark", theme === "dark");
  }, [locale, theme]);

  const setLocale = useCallback(
    (next: Locale) => {
      if (next === locale) return;
      document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${ONE_YEAR}; samesite=lax`;
      router.refresh();
    },
    [locale, router],
  );

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    document.cookie = `${THEME_COOKIE}=${next}; path=/; max-age=${ONE_YEAR}; samesite=lax`;
    document.documentElement.classList.toggle("dark", next === "dark");
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      locale,
      dir: dirOf(locale),
      theme,
      settings,
      t: makeT(dict),
      money: makeMoney(dict["common.currency"] ?? "د.ل"),
      setLocale,
      setTheme,
    }),
    [locale, theme, settings, dict, setLocale, setTheme],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useI18n(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useI18n must be used within AppProvider");
  return ctx;
}

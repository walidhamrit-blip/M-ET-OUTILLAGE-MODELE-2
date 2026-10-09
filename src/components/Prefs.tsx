"use client";

import { Moon, Sun } from "lucide-react";
import { useI18n } from "@/i18n/AppProvider";
import { LOCALES, LOCALE_LABELS } from "@/i18n/config";

/** Sélecteur de langue (العربية | English) — fonctionnel, persistant (cookie). */
export function LanguageSwitch({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();
  return (
    <div
      role="group"
      aria-label={t("topbar.language")}
      className={`inline-flex items-center rounded-full border border-white/30 p-[2px] text-[12px] font-bold ${className}`}
    >
      {LOCALES.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLocale(l)}
            aria-pressed={active}
            lang={l}
            className={`rounded-full px-3 py-[3px] transition ${
              active ? "bg-[#ffea00] text-black" : "text-white/80 hover:text-white"
            } ${l === "ar" ? "font-arabic" : ""}`}
          >
            {LOCALE_LABELS[l]}
          </button>
        );
      })}
    </div>
  );
}

/** Bascule clair / sombre — mémorisée dans un cookie. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme, t } = useI18n();
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? t("topbar.themeLight") : t("topbar.themeDark")}
      title={isDark ? t("topbar.themeLight") : t("topbar.themeDark")}
      className={`inline-flex h-[26px] w-[26px] items-center justify-center rounded-full border border-white/30 text-white/85 transition hover:bg-white/10 hover:text-white ${className}`}
    >
      {isDark ? <Sun size={14} /> : <Moon size={14} />}
    </button>
  );
}

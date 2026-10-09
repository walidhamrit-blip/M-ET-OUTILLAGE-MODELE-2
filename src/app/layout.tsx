import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { AppProvider } from "@/i18n/AppProvider";
import { getI18n } from "@/i18n/server";
import { getSettings } from "@/lib/settings";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

/** Racine : langue (AR par défaut / EN), sens d'écriture, thème sombre et textes de l'interface. */
export default async function RootLayout({ children }: { children: ReactNode }) {
  const { locale, theme, dir, dict } = await getI18n();
  const settings = await getSettings();
  return (
    <html lang={locale} dir={dir} className={theme === "dark" ? "dark" : undefined} suppressHydrationWarning>
      <body className="antialiased">
        <AppProvider locale={locale} theme={theme} dict={dict} settings={settings}>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}

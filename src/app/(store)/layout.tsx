import type { ReactNode } from "react";
import { asc } from "drizzle-orm";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { CartProvider } from "@/store/cart";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { getI18n } from "@/i18n/server";
import { localizeCategory } from "@/lib/localize";

async function getCategories(locale: "ar" | "en") {
  try {
    const rows = await db.select().from(categories).orderBy(asc(categories.order), asc(categories.id));
    return rows.map((row) => localizeCategory(row, locale));
  } catch {
    return [];
  }
}

/** Mise en page de la vitrine : en-tête, navigation, pied de page, panier. */
export default async function StoreLayout({ children }: { children: ReactNode }) {
  const { locale } = await getI18n();
  const cats = await getCategories(locale);
  return (
    <CartProvider>
      <TopBar />
      <Header categories={cats} />
      <NavBar categories={cats} />
      <PromoBanner />
      <main className="min-h-[60vh] pb-4">{children}</main>
      <Footer categories={cats} />
      <CartDrawer />
    </CartProvider>
  );
}

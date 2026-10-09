import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { CartProvider } from "@/store/cart";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { asc } from "drizzle-orm";

export const metadata: Metadata = {
  title: "MATEK Libya — Matériaux de Construction & Outillage à Tripoli",
  description:
    "MATEK Tripoli : N°1 des matériaux de construction, outillage, peinture, plomberie, électricité et climatisation en Libye. Livraison rapide partout en Libye.",
};

async function getCategories() {
  try {
    return await db.select().from(categories).orderBy(asc(categories.order));
  } catch {
    return [];
  }
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const cats = await getCategories();
  return (
    <html lang="fr">
      <body className="antialiased">
        <CartProvider>
          <TopBar />
          <Header categories={cats} />
          <NavBar categories={cats} />
          <PromoBanner />
          <main className="min-h-[60vh] pb-4">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}

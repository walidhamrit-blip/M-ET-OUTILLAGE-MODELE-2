"use client";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import Link from "next/link";
import ProductCard, { Product } from "@/components/ProductCard";
import { useCart } from "@/store/cart";
import { useI18n } from "@/i18n/AppProvider";

export default function FavoritesPage() {
  const { favorites } = useCart();
  const { t, locale } = useI18n();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      if (!favorites.length) {
        setProducts([]);
        setLoading(false);
        return;
      }
      try {
        const r = await fetch(`/api/products?ids=${favorites.join(",")}&limit=60&lang=${locale}`);
        const j = await r.json();
        setProducts(j.products || []);
      } catch {}
      setLoading(false);
    };
    load();
  }, [favorites, locale]);

  return (
    <div className="mx-auto max-w-[1280px] px-4 mt-4">
      <div className="bg-white dark:bg-[#1a222c] border dark:border-[#2c3644] rounded overflow-hidden">
        <div className="section-bar px-5 py-3.5 border-b dark:border-[#2c3644] flex items-center gap-2">
          <Heart size={19} className="text-[#e30613]" fill="currentColor" />
          <h1 className="text-[18px] font-black">{t("favorites.title", { count: favorites.length })}</h1>
        </div>
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4">
            {Array.from({ length: 4 }).map((_, i) => <div key={i} className="shimmer aspect-square rounded" />)}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <Heart size={52} className="mx-auto text-gray-200 dark:text-gray-600" />
            <p className="mt-3 font-bold text-gray-600 dark:text-gray-300">{t("favorites.empty")}</p>
            <Link href="/recherche" className="inline-block mt-3 bg-[#e30613] text-white font-bold text-[14px] px-6 py-2.5 rounded">{t("favorites.discover")}</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 p-3">
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}

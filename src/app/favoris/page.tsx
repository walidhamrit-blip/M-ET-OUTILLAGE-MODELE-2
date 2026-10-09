"use client";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import Link from "next/link";
import ProductCard, { Product } from "@/components/ProductCard";
import { useCart } from "@/store/cart";

export default function FavoritesPage() {
  const { favorites } = useCart();
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
        const r = await fetch(`/api/products?limit=60`);
        const j = await r.json();
        setProducts((j.products || []).filter((p: Product) => favorites.includes(p.id)));
      } catch {}
      setLoading(false);
    };
    load();
  }, [favorites]);

  return (
    <div className="mx-auto max-w-[1280px] px-4 mt-4">
      <div className="bg-white border rounded overflow-hidden">
        <div className="section-bar px-5 py-3.5 border-b flex items-center gap-2">
          <Heart size={19} className="text-[#e30613]" fill="currentColor" />
          <h1 className="text-[18px] font-black uppercase">Mes favoris ({favorites.length})</h1>
        </div>
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4">
            {Array.from({ length: 4 }).map((_, i) => <div key={i} className="shimmer aspect-square rounded" />)}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <Heart size={52} className="mx-auto text-gray-200" />
            <p className="mt-3 font-bold text-gray-600">Aucun favori pour le moment</p>
            <Link href="/recherche" className="inline-block mt-3 bg-[#e30613] text-white font-bold text-[14px] px-6 py-2.5 rounded">Découvrir nos produits</Link>
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

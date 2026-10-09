"use client";
import Link from "next/link";
import { ShoppingCart, Heart, Eye, Star } from "lucide-react";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/format";

export type Product = {
  id: number;
  name: string;
  slug: string;
  reference: string | null;
  price: string | number;
  oldPrice: string | number | null;
  image: string | null;
  rating: string | number | null;
  reviewsCount: number | null;
  badge: string | null;
  discount: number | null;
  stock: number | null;
  isNew?: boolean | null;
  isPromo?: boolean | null;
  brandName?: string | null;
};

export default function ProductCard({ product }: { product: Product }) {
  const { addItem, favorites, toggleFavorite } = useCart();
  const price = typeof product.price === "string" ? parseFloat(product.price) : product.price;
  const oldPrice = product.oldPrice ? (typeof product.oldPrice === "string" ? parseFloat(product.oldPrice) : product.oldPrice) : null;
  const pct = oldPrice && oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : product.discount || 0;
  const isFav = favorites.includes(product.id);
  const rating = product.rating ? parseFloat(String(product.rating)) : 4.5;

  return (
    <div className="product-card relative bg-white border border-gray-200 rounded-[4px] overflow-hidden flex flex-col h-full">
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1 items-start">
        {pct > 0 && (
          <span className="bg-[#e30613] text-white text-[12px] font-bold px-2 py-[2px] rounded-sm shadow">
            -{pct}%
          </span>
        )}
        {product.isNew && (
          <span className="bg-[#2f3d4c] text-white text-[11px] font-bold px-2 py-[2px] rounded-sm">
            NOUVEAU
          </span>
        )}
        {product.badge && (
          <span className="bg-[#ffea00] text-black text-[11px] font-bold px-2 py-[2px] rounded-sm">
            {product.badge}
          </span>
        )}
      </div>
      <button
        onClick={() => toggleFavorite(product.id)}
        aria-label="Favori"
        className={`absolute top-2 right-2 z-10 w-8 h-8 rounded-full flex items-center justify-center transition shadow ${
          isFav ? "bg-[#e30613] text-white" : "bg-white/90 text-gray-500 hover:text-[#e30613] border"
        }`}
      >
        <Heart size={16} fill={isFav ? "currentColor" : "none"} />
      </button>

      {/* Image */}
      <Link href={`/produit/${product.slug}`} className="block relative overflow-hidden bg-[#f7f7f7] aspect-square">
        <img
          src={product.image || "/images/placeholder.jpg"}
          alt={product.name}
          loading="lazy"
          className="p-img w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500&q=70&auto=format&fit=crop"; }}
        />
        <div className="quick-actions absolute bottom-2 left-2 right-2 flex gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem({ id: product.id, name: product.name, slug: product.slug, image: product.image || "", price, oldPrice, reference: product.reference });
            }}
            className="flex-1 bg-[#2f3d4c]/95 hover:bg-[#e30613] text-white text-[12px] font-bold py-2 rounded-sm flex items-center justify-center gap-1.5 transition"
          >
            <ShoppingCart size={14} /> AJOUTER
          </button>
          <Link
            href={`/produit/${product.slug}`}
            className="w-9 h-[32px] bg-white/95 hover:bg-[#ffea00] rounded-sm flex items-center justify-center transition"
            aria-label="Voir"
          >
            <Eye size={15} />
          </Link>
        </div>
      </Link>

      {/* Body */}
      <div className="p-3 flex flex-col flex-1">
        {product.brandName && (
          <div className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide">{product.brandName}</div>
        )}
        <Link href={`/produit/${product.slug}`} className="text-[13px] font-medium text-gray-800 leading-snug line-clamp-2 hover:text-[#e30613] transition min-h-[36px]">
          {product.name}
        </Link>
        <div className="flex items-center gap-1 mt-1">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={12} className={s <= Math.round(rating) ? "text-[#f5a623] fill-[#f5a623]" : "text-gray-300"} />
            ))}
          </div>
          <span className="text-[11px] text-gray-400">({product.reviewsCount ?? 0})</span>
        </div>
        <div className="text-[11px] text-gray-400 mt-0.5">Réf: {product.reference || `MTK-${product.id}`}</div>
        <div className="mt-auto pt-2 border-t border-dashed border-gray-200 mt-2">
          {oldPrice && oldPrice > price && (
            <div className="text-[12px] text-gray-400 line-through">{formatPrice(oldPrice)}</div>
          )}
          <div className="flex items-end justify-between gap-2">
            <div className="text-[#e30613] font-black text-[17px] leading-none">{formatPrice(price)}</div>
            {(product.stock ?? 0) <= 5 && (product.stock ?? 0) > 0 && (
              <span className="text-[10px] font-bold text-orange-600">Plus que {product.stock} !</span>
            )}
          </div>
          {(product.stock ?? 1) <= 0 && (
            <div className="text-[11px] font-bold text-gray-400 mt-1">Rupture de stock</div>
          )}
        </div>
      </div>
    </div>
  );
}

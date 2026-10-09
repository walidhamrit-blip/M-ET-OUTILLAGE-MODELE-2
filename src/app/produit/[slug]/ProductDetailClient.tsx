"use client";
import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Heart, Minus, Plus, Star, Truck, ShieldCheck, RotateCcw, MapPin, Phone, Check, ChevronRight } from "lucide-react";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/format";

export default function ProductDetailClient({
  product,
  brandName,
  catName,
  catSlug,
}: {
  product: any;
  brandName: string | null;
  catName: string | null;
  catSlug: string | null;
}) {
  const { addItem, setOpen, favorites, toggleFavorite } = useCart();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"desc" | "specs" | "livraison">("desc");
  const [imgIndex, setImgIndex] = useState(0);

  const price = parseFloat(product.price);
  const oldPrice = product.oldPrice ? parseFloat(product.oldPrice) : null;
  const pct = oldPrice && oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : product.discount || 0;
  const isFav = favorites.includes(product.id);
  const rating = product.rating ? parseFloat(String(product.rating)) : 4.5;
  const images: string[] = product.images?.length ? product.images : [product.image].filter(Boolean);
  const mainImg = images[imgIndex] || product.image;

  const specs: Record<string, string> = product.specs || {
    Référence: product.reference || `MTK-${product.id}`,
    Marque: brandName || "Matek",
    Garantie: "12 mois",
    Disponibilité: "En stock — Tripoli",
  };

  return (
    <div className="mx-auto max-w-[1280px] px-4 mt-4">
      {/* Breadcrumb */}
      <div className="text-[12px] text-gray-500 flex items-center gap-1.5 mb-3 flex-wrap">
        <Link href="/" className="hover:text-[#e30613]">Accueil</Link>
        <ChevronRight size={12} />
        {catSlug && <><Link href={`/categorie/${catSlug}`} className="hover:text-[#e30613]">{catName}</Link><ChevronRight size={12} /></>}
        <span className="font-semibold text-gray-800 line-clamp-1">{product.name}</span>
      </div>

      <div className="bg-white border border-gray-200 rounded-[4px] p-4 sm:p-6 grid lg:grid-cols-2 gap-6">
        {/* Gallery */}
        <div>
          <div className="relative border rounded overflow-hidden bg-[#f7f7f7] aspect-square group">
            {pct > 0 && (
              <span className="absolute top-3 left-3 z-10 bg-[#e30613] text-white text-[14px] font-black px-3 py-1 rounded-sm shadow-lg">
                -{pct}%
              </span>
            )}
            {product.isNew && (
              <span className="absolute top-3 left-3 mt-9 z-10 bg-[#2f3d4c] text-white text-[11px] font-bold px-2 py-[3px] rounded-sm">
                NOUVEAU
              </span>
            )}
            <img key={mainImg} src={mainImg} alt={product.name} className="fade-animate w-full h-full object-cover group-hover:scale-105 transition duration-500" />
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 mt-2">
              {images.map((im, i) => (
                <button key={i} onClick={() => setImgIndex(i)} className={`w-[70px] h-[70px] border-2 rounded overflow-hidden ${i === imgIndex ? "border-[#e30613]" : "border-gray-200"}`}>
                  <img src={im} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          {brandName && <div className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">{brandName}</div>}
          <h1 className="text-[20px] sm:text-[24px] font-bold leading-snug mt-1">{product.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={16} className={s <= Math.round(rating) ? "text-[#f5a623] fill-[#f5a623]" : "text-gray-300"} />
              ))}
            </div>
            <span className="text-[13px] text-gray-500">{rating.toFixed(1)} — {product.reviewsCount ?? 0} avis</span>
            <span className="text-[12px] text-gray-400">| Réf: {product.reference || `MTK-${product.id}`}</span>
          </div>

          <p className="text-[14px] text-gray-600 mt-3 leading-relaxed">
            {product.shortDescription || product.description?.slice(0, 180) || "Produit original, garantie officielle, disponible dans nos magasins de Tripoli."}
          </p>

          <div className="flex items-end gap-3 mt-4 pb-4 border-b border-dashed">
            <div className="text-[#e30613] font-black text-[32px] leading-none">{formatPrice(price)}</div>
            {oldPrice && oldPrice > price && (
              <div className="text-gray-400 line-through text-[17px] mb-[2px]">{formatPrice(oldPrice)}</div>
            )}
            <span className="text-[11px] text-gray-500 mb-1">TTC</span>
          </div>

          <div className="flex items-center gap-2 mt-3 text-[13px]">
            {(product.stock ?? 0) > 0 ? (
              <span className="flex items-center gap-1.5 text-green-700 font-bold bg-green-50 border border-green-200 rounded-full px-3 py-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> En stock — Expédition 24h
              </span>
            ) : (
              <span className="font-bold text-gray-500 bg-gray-100 rounded-full px-3 py-1">Rupture de stock</span>
            )}
            {(product.stock ?? 0) > 0 && (product.stock ?? 0) <= 5 && (
              <span className="text-orange-600 font-bold">Plus que {product.stock} pièces !</span>
            )}
          </div>

          {/* Qty + Add */}
          <div className="flex flex-wrap items-center gap-3 mt-5">
            <div className="flex items-center border-2 border-gray-200 rounded">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-10 h-[46px] flex items-center justify-center hover:bg-gray-100 transition" aria-label="Moins"><Minus size={16} /></button>
              <span className="w-12 text-center font-black text-[17px]">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="w-10 h-[46px] flex items-center justify-center hover:bg-gray-100 transition" aria-label="Plus"><Plus size={16} /></button>
            </div>
            <button
              onClick={() => {
                addItem({ id: product.id, name: product.name, slug: product.slug, image: product.image || "", price, oldPrice, reference: product.reference }, qty);
                setOpen(true);
              }}
              disabled={(product.stock ?? 1) <= 0}
              className="flex-1 min-w-[200px] h-[50px] bg-[#e30613] hover:bg-[#b3050f] disabled:bg-gray-300 text-white font-black text-[15px] rounded flex items-center justify-center gap-2 transition shadow-lg hover:shadow-xl hover:-translate-y-[1px]"
            >
              <ShoppingCart size={19} /> AJOUTER AU PANIER
            </button>
            <button
              onClick={() => toggleFavorite(product.id)}
              className={`w-[50px] h-[50px] rounded border-2 flex items-center justify-center transition ${isFav ? "border-[#e30613] bg-red-50 text-[#e30613]" : "border-gray-200 text-gray-400 hover:border-[#e30613] hover:text-[#e30613]"}`}
              aria-label="Favori"
            >
              <Heart size={20} fill={isFav ? "currentColor" : "none"} />
            </button>
          </div>

          {/* Services */}
          <div className="grid grid-cols-2 gap-2 mt-5">
            {[
              { icon: Truck, t: "Livraison 24h Tripoli", d: "Offerte dès 500 د.ل" },
              { icon: ShieldCheck, t: "Garantie officielle", d: "12–24 mois" },
              { icon: RotateCcw, t: "Retour 7 jours", d: "En magasin" },
              { icon: MapPin, t: "Retrait 1h", d: "4 magasins Tripoli" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2.5 border rounded p-2.5 bg-gray-50/60">
                <s.icon size={20} className="text-[#e30613] shrink-0" />
                <div><div className="text-[12.5px] font-bold leading-tight">{s.t}</div><div className="text-[11.5px] text-gray-500">{s.d}</div></div>
              </div>
            ))}
          </div>

          <a href="tel:+218214444444" className="mt-4 flex items-center gap-3 bg-[#2f3d4c] rounded p-3 hover:bg-[#243140] transition">
            <span className="w-10 h-10 rounded-full bg-[#ffea00] flex items-center justify-center shrink-0"><Phone size={18} className="text-black" /></span>
            <div>
              <div className="text-white text-[13px] font-bold">Une question sur ce produit ? Appelez-nous</div>
              <div className="text-[#ffea00] font-black text-[16px]">+218 21 444 44 44</div>
            </div>
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-gray-200 rounded-[4px] mt-4 overflow-hidden">
        <div className="flex border-b">
          {[
            { v: "desc", l: "Description" },
            { v: "specs", l: "Caractéristiques" },
            { v: "livraison", l: "Livraison & Retours" },
          ].map((t: any) => (
            <button
              key={t.v}
              onClick={() => setTab(t.v)}
              className={`px-5 sm:px-8 py-3.5 text-[13px] sm:text-[14px] font-bold uppercase transition border-b-[3px] -mb-[1px] ${tab === t.v ? "border-[#e30613] text-[#e30613] bg-red-50/40" : "border-transparent text-gray-500 hover:text-gray-800"}`}
            >
              {t.l}
            </button>
          ))}
        </div>
        <div className="p-5 text-[14px] text-gray-700 leading-relaxed fade-animate" key={tab}>
          {tab === "desc" && (
            <p>{product.description || `${product.name} — qualité professionnelle garantie. Disponible immédiatement dans nos 4 magasins de Tripoli (Janzour, Ain Zara, Tajoura, Gargaresh) avec livraison rapide partout en Libye. Produit original avec garantie officielle MATEK.`}</p>
          )}
          {tab === "specs" && (
            <div className="max-w-[640px]">
              {Object.entries(specs).map(([k, v], i) => (
                <div key={k} className={`flex justify-between px-4 py-2.5 ${i % 2 ? "bg-white" : "bg-gray-50"} border-b text-[13px]`}>
                  <span className="font-semibold text-gray-500">{k}</span>
                  <span className="font-bold flex items-center gap-1"><Check size={14} className="text-green-600" />{String(v)}</span>
                </div>
              ))}
            </div>
          )}
          {tab === "livraison" && (
            <ul className="space-y-2 list-disc pl-5">
              <li>Livraison 24h à Tripoli (25 د.ل, offerte dès 500 د.ل).</li>
              <li>Livraison 48/72h vers Misrata, Zawiya, Benghazi et toute la Libye.</li>
              <li>Retrait gratuit en 1h dans nos 4 magasins de Tripoli.</li>
              <li>Retour / échange sous 7 jours en magasin avec ticket de caisse.</li>
              <li>Paiement à la livraison en espèces ou par virement.</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

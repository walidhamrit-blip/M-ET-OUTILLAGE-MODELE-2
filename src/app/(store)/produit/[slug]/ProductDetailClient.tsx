"use client";
import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Heart, Minus, Plus, Star, Truck, ShieldCheck, RotateCcw, MapPin, Phone, Check, ChevronRight } from "lucide-react";
import { useCart } from "@/store/cart";
import { useI18n } from "@/i18n/AppProvider";

type ProductView = {
  id: number;
  name: string;
  slug: string;
  reference: string | null;
  shortDescription: string | null;
  description: string | null;
  price: string;
  oldPrice: string | null;
  image: string | null;
  images: string[] | null;
  rating: string | null;
  reviewsCount: number | null;
  badge: string | null;
  discount: number | null;
  stock: number | null;
  isNew: boolean | null;
  specs: Record<string, string> | null;
};

export default function ProductDetailClient({
  product,
  brandName,
  catName,
  catSlug,
}: {
  product: ProductView;
  brandName: string | null;
  catName: string | null;
  catSlug: string | null;
}) {
  const { addItem, setOpen, favorites, toggleFavorite } = useCart();
  const { t, money, settings } = useI18n();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"desc" | "specs" | "livraison">("desc");
  const [imgIndex, setImgIndex] = useState(0);

  const price = parseFloat(product.price);
  const oldPrice = product.oldPrice ? parseFloat(product.oldPrice) : null;
  const pct = oldPrice && oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : product.discount || 0;
  const isFav = favorites.includes(product.id);
  const rating = product.rating ? parseFloat(String(product.rating)) : 4.5;
  const images: string[] = product.images?.length ? product.images : [product.image].filter(Boolean) as string[];
  const mainImg = images[imgIndex] || product.image;
  const reference = product.reference || `TT-${product.id}`;
  const fee = money(settings.delivery.fee);
  const threshold = money(settings.delivery.freeThreshold);

  const specs: Record<string, string> = product.specs && Object.keys(product.specs).length
    ? product.specs
    : {
        [t("product.specRef")]: reference,
        [t("common.brand")]: brandName || settings.company.name,
        [t("product.specWarranty")]: t("product.specWarrantyValue"),
        [t("product.specAvailability")]: t("product.specAvailabilityValue"),
      };

  const services = [
    { icon: Truck, title: t("product.svcDelivery"), desc: t("product.svcDeliveryDesc", { threshold }) },
    { icon: ShieldCheck, title: t("services.warranty"), desc: t("product.svcWarrantyDesc") },
    { icon: RotateCcw, title: t("services.returns"), desc: t("product.svcReturnDesc") },
    { icon: MapPin, title: t("product.svcPickup"), desc: t("product.svcPickupDesc") },
  ];

  const deliveryLines = [
    t("product.delivery1", { fee, threshold }),
    t("product.delivery2"),
    t("product.delivery3"),
    t("product.delivery4"),
    t("product.delivery5"),
  ];

  return (
    <div className="mx-auto max-w-[1280px] px-4 mt-4">
      {/* Fil d'Ariane */}
      <div className="text-[12px] text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mb-3 flex-wrap">
        <Link href="/" className="hover:text-[#e30613]">{t("common.home")}</Link>
        <ChevronRight size={12} className="rtl:rotate-180" />
        {catSlug && (
          <>
            <Link href={`/categorie/${catSlug}`} className="hover:text-[#e30613]">{catName}</Link>
            <ChevronRight size={12} className="rtl:rotate-180" />
          </>
        )}
        <span className="font-semibold text-gray-800 dark:text-gray-200 line-clamp-1">{product.name}</span>
      </div>

      <div className="bg-white dark:bg-[#1a222c] border border-gray-200 dark:border-[#2c3644] rounded-[4px] p-4 sm:p-6 grid lg:grid-cols-2 gap-6">
        {/* Galerie */}
        <div>
          <div className="relative border dark:border-[#2c3644] rounded overflow-hidden bg-[#f7f7f7] dark:bg-[#243040] aspect-square group">
            {pct > 0 && (
              <span className="absolute top-3 start-3 z-10 bg-[#e30613] text-white text-[14px] font-black px-3 py-1 rounded-sm shadow-lg" dir="ltr">
                -{pct}%
              </span>
            )}
            {product.isNew && (
              <span className="absolute top-3 start-3 mt-9 z-10 bg-[#2f3d4c] text-white text-[11px] font-bold px-2 py-[3px] rounded-sm">
                {t("card.new")}
              </span>
            )}
            {mainImg && <img key={mainImg} src={mainImg} alt={product.name} className="fade-animate w-full h-full object-cover group-hover:scale-105 transition duration-500" />}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 mt-2">
              {images.map((im, i) => (
                <button type="button" key={i} onClick={() => setImgIndex(i)} className={`w-[70px] h-[70px] border-2 rounded overflow-hidden ${i === imgIndex ? "border-[#e30613]" : "border-gray-200 dark:border-[#2c3644]"}`}>
                  <img src={im} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Informations */}
        <div>
          {brandName && <div className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">{brandName}</div>}
          <h1 className="text-[20px] sm:text-[24px] font-bold leading-snug mt-1">{product.name}</h1>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={16} className={s <= Math.round(rating) ? "text-[#f5a623] fill-[#f5a623]" : "text-gray-300"} />
              ))}
            </div>
            <span className="text-[13px] text-gray-500">{t("product.rating", { rating: rating.toFixed(1), count: product.reviewsCount ?? 0 })}</span>
            <span className="text-[12px] text-gray-400">| {t("common.ref")} <span dir="ltr">{reference}</span></span>
          </div>

          <p className="text-[14px] text-gray-600 dark:text-gray-300 mt-3 leading-relaxed">
            {product.shortDescription || product.description?.slice(0, 180) || t("product.defaultShort")}
          </p>

          <div className="flex items-end gap-3 mt-4 pb-4 border-b border-dashed dark:border-[#2c3644]">
            <div className="text-[#e30613] font-black text-[32px] leading-none">{money(price)}</div>
            {oldPrice && oldPrice > price && (
              <div className="text-gray-400 line-through text-[17px] mb-[2px]">{money(oldPrice)}</div>
            )}
            <span className="text-[11px] text-gray-500 mb-1">{t("common.tax")}</span>
          </div>

          <div className="flex items-center gap-2 mt-3 text-[13px] flex-wrap">
            {(product.stock ?? 0) > 0 ? (
              <span className="flex items-center gap-1.5 text-green-700 dark:text-green-300 font-bold bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-full px-3 py-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> {t("product.inStock")}
              </span>
            ) : (
              <span className="font-bold text-gray-500 bg-gray-100 dark:bg-white/10 rounded-full px-3 py-1">{t("card.outOfStock")}</span>
            )}
            {(product.stock ?? 0) > 0 && (product.stock ?? 0) <= 5 && (
              <span className="text-orange-600 font-bold">{t("product.onlyLeft", { count: product.stock ?? 0 })}</span>
            )}
          </div>

          {/* Quantité + ajout */}
          <div className="flex flex-wrap items-center gap-3 mt-5">
            <div className="flex items-center border-2 border-gray-200 dark:border-[#2c3644] rounded">
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-10 h-[46px] flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/10 transition" aria-label={t("cart.decrease")}><Minus size={16} /></button>
              <span className="w-12 text-center font-black text-[17px]">{qty}</span>
              <button type="button" onClick={() => setQty((q) => q + 1)} className="w-10 h-[46px] flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/10 transition" aria-label={t("cart.increase")}><Plus size={16} /></button>
            </div>
            <button
              type="button"
              onClick={() => {
                addItem({ id: product.id, name: product.name, slug: product.slug, image: product.image || "", price, oldPrice, reference: product.reference }, qty);
                setOpen(true);
              }}
              disabled={(product.stock ?? 1) <= 0}
              className="flex-1 min-w-[200px] h-[50px] bg-[#e30613] hover:bg-[#b3050f] disabled:bg-gray-300 text-white font-black text-[15px] rounded flex items-center justify-center gap-2 transition shadow-lg hover:shadow-xl hover:-translate-y-[1px]"
            >
              <ShoppingCart size={19} /> {t("product.add")}
            </button>
            <button
              type="button"
              onClick={() => toggleFavorite(product.id)}
              className={`w-[50px] h-[50px] rounded border-2 flex items-center justify-center transition ${isFav ? "border-[#e30613] bg-red-50 dark:bg-red-900/20 text-[#e30613]" : "border-gray-200 dark:border-[#2c3644] text-gray-400 hover:border-[#e30613] hover:text-[#e30613]"}`}
              aria-label={t("header.favoriteAria")}
            >
              <Heart size={20} fill={isFav ? "currentColor" : "none"} />
            </button>
          </div>

          {/* Services */}
          <div className="grid grid-cols-2 gap-2 mt-5">
            {services.map((s, i) => (
              <div key={i} className="flex items-center gap-2.5 border dark:border-[#2c3644] rounded p-2.5 bg-gray-50/60 dark:bg-[#202a36]">
                <s.icon size={20} className="text-[#e30613] shrink-0" />
                <div><div className="text-[12.5px] font-bold leading-tight">{s.title}</div><div className="text-[11.5px] text-gray-500">{s.desc}</div></div>
              </div>
            ))}
          </div>

          <a href={`tel:${settings.company.phone.replace(/\s+/g, "")}`} className="mt-4 flex items-center gap-3 bg-[#2f3d4c] rounded p-3 hover:bg-[#243140] transition">
            <span className="w-10 h-10 rounded-full bg-[#ffea00] flex items-center justify-center shrink-0"><Phone size={18} className="text-black" /></span>
            <div>
              <div className="text-white text-[13px] font-bold">{t("product.askUs")}</div>
              <div className="text-[#ffea00] font-black text-[16px]" dir="ltr">{settings.company.phone}</div>
            </div>
          </a>
        </div>
      </div>

      {/* Onglets */}
      <div className="bg-white dark:bg-[#1a222c] border border-gray-200 dark:border-[#2c3644] rounded-[4px] mt-4 overflow-hidden">
        <div className="flex border-b dark:border-[#2c3644] overflow-x-auto">
          {([
            { v: "desc", l: t("product.tabDesc") },
            { v: "specs", l: t("product.tabSpecs") },
            { v: "livraison", l: t("product.tabDelivery") },
          ] as const).map((tb) => (
            <button
              type="button"
              key={tb.v}
              onClick={() => setTab(tb.v)}
              className={`px-5 sm:px-8 py-3.5 text-[13px] sm:text-[14px] font-bold whitespace-nowrap transition border-b-[3px] -mb-[1px] ${tab === tb.v ? "border-[#e30613] text-[#e30613] bg-red-50/40 dark:bg-red-900/10" : "border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"}`}
            >
              {tb.l}
            </button>
          ))}
        </div>
        <div className="p-5 text-[14px] text-gray-700 dark:text-gray-300 leading-relaxed fade-animate" key={tab}>
          {tab === "desc" && (
            <p>{product.description || t("product.defaultDesc", { name: product.name })}</p>
          )}
          {tab === "specs" && (
            <div className="max-w-[640px]">
              {Object.entries(specs).map(([k, v], i) => (
                <div key={k} className={`flex justify-between px-4 py-2.5 ${i % 2 ? "bg-white dark:bg-transparent" : "bg-gray-50 dark:bg-[#202a36]"} border-b dark:border-[#2c3644] text-[13px]`}>
                  <span className="font-semibold text-gray-500">{k}</span>
                  <span className="font-bold flex items-center gap-1"><Check size={14} className="text-green-600" />{String(v)}</span>
                </div>
              ))}
            </div>
          )}
          {tab === "livraison" && (
            <ul className="space-y-2 list-disc ps-5">
              {deliveryLines.map((line) => <li key={line}>{line}</li>)}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

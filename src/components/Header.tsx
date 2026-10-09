"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, Heart, User, ChevronDown, Menu } from "lucide-react";
import { useCart } from "@/store/cart";
import { useI18n } from "@/i18n/AppProvider";
import { LanguageSwitch, ThemeToggle } from "./Prefs";

type Cat = { id: number; name: string; slug: string };
type Suggest = { id: number; name: string; slug: string; reference: string | null; image: string | null; price: string };

export default function Header({ categories }: { categories: Cat[] }) {
  const { count, setOpen, favorites } = useCart();
  const { t, money, locale } = useI18n();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Suggest[]>([]);
  const [showSuggest, setShowSuggest] = useState(false);
  const [catSlug, setCatSlug] = useState("");
  const [showCatDrop, setShowCatDrop] = useState(false);
  const [bump, setBump] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const catLabel = catSlug ? categories.find((c) => c.slug === catSlug)?.name ?? t("header.allCategories") : t("header.allCategories");

  const searchHref = () => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (catSlug) params.set("categorie", catSlug);
    const qs = params.toString();
    return qs ? `/recherche?${qs}` : "/recherche";
  };

  useEffect(() => {
    setBump(true);
    const timer = setTimeout(() => setBump(false), 350);
    return () => clearTimeout(timer);
  }, [count]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setShowSuggest(false);
        setShowCatDrop(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const r = await fetch(`/api/products?search=${encodeURIComponent(query)}&limit=6&lang=${locale}`);
        const j = await r.json();
        setResults(j.products || []);
        setShowSuggest(true);
      } catch {}
    }, 250);
    return () => clearTimeout(timer);
  }, [query, locale]);

  return (
    <div className="bg-[#2f3d4c] sticky top-0 z-[60] shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
      <div className="mx-auto max-w-[1280px] px-4 h-[72px] flex items-center gap-4 lg:gap-8">
        <button className="lg:hidden text-white" aria-label={t("header.menu")}>
          <Menu />
        </button>

        {/* Logo */}
        <Link href="/" className="shrink-0 group">
          <div className="flex items-center gap-2">
            <div className="border-[3px] border-white rounded-[6px] px-2.5 py-[3px] leading-none transition group-hover:border-[#ffea00]">
              <span className="text-white font-black italic text-[22px] sm:text-[26px] tracking-tighter group-hover:text-[#ffea00] transition" dir="ltr">
                TRIPO<span className="text-[#ffea00] group-hover:text-white transition">-TECH</span>
              </span>
            </div>
            <div className="hidden xl:block leading-tight">
              <div className="text-[#ffea00] text-[11px] font-bold uppercase tracking-widest">{t("header.tagline")}</div>
              <div className="text-white/80 text-[11px] font-semibold">{t("header.city")}</div>
            </div>
          </div>
        </Link>

        {/* Search */}
        <div ref={boxRef} className="relative flex-1 max-w-[640px] hidden md:block">
          <div className="flex h-[44px] rounded-[4px] overflow-hidden bg-white shadow-inner">
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowCatDrop((v) => !v)}
                className="h-full px-3 text-[13px] text-gray-600 bg-gray-100 border-e border-gray-200 flex items-center gap-1 hover:bg-gray-200 transition min-w-[150px] justify-between"
              >
                <span className="truncate max-w-[120px]">{catLabel}</span>
                <ChevronDown size={14} />
              </button>
              {showCatDrop && (
                <div className="drop-down absolute top-[48px] start-0 w-[230px] bg-white shadow-xl border rounded-md overflow-hidden z-50 max-h-[320px] overflow-y-auto thin-scroll">
                  <button
                    type="button"
                    onClick={() => { setCatSlug(""); setShowCatDrop(false); }}
                    className="w-full text-start px-4 py-2 text-[13px] hover:bg-gray-100 hover:text-[#e30613]"
                  >
                    {t("header.allCategories")}
                  </button>
                  {categories.map((c) => (
                    <button
                      type="button"
                      key={c.id}
                      onClick={() => { setCatSlug(c.slug); setShowCatDrop(false); }}
                      className="w-full text-start px-4 py-2 text-[13px] hover:bg-gray-100 hover:text-[#e30613]"
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => query.length >= 2 && setShowSuggest(true)}
              placeholder={t("header.searchPlaceholder")}
              className="flex-1 px-4 text-[14px] outline-none text-gray-800 placeholder:text-gray-400"
            />
            <Link
              href={searchHref()}
              aria-label={t("header.searchPlaceholder")}
              className="w-[56px] bg-[#e30613] hover:bg-[#b3050f] transition flex items-center justify-center text-white"
            >
              <Search size={20} strokeWidth={2.5} />
            </Link>
          </div>
          {showSuggest && results.length > 0 && (
            <div className="drop-down absolute top-[50px] start-0 end-0 bg-white rounded-md shadow-2xl border overflow-hidden z-50">
              {results.map((p) => (
                <Link
                  key={p.id}
                  href={`/produit/${p.slug}`}
                  onClick={() => setShowSuggest(false)}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 border-b last:border-0 transition"
                >
                  {p.image && <img src={p.image} alt="" className="w-11 h-11 object-cover rounded border" />}
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium truncate">{p.name}</div>
                    <div className="text-[12px] text-gray-500">{p.reference}</div>
                  </div>
                  <div className="text-[#e30613] font-bold text-[14px] whitespace-nowrap">{money(p.price)}</div>
                </Link>
              ))}
              <Link
                href={searchHref()}
                onClick={() => setShowSuggest(false)}
                className="block text-center py-2 text-[13px] font-semibold text-[#e30613] bg-gray-50 hover:bg-gray-100"
              >
                {t("header.seeAllResults")}
              </Link>
            </div>
          )}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-1 sm:gap-2 ms-auto">
          <div className="md:hidden flex items-center gap-1">
            <LanguageSwitch />
            <ThemeToggle />
          </div>
          <Link href="/compte" className="hidden sm:flex flex-col items-center text-white/90 hover:text-[#ffea00] transition px-2">
            <User size={24} />
            <span className="text-[11px] font-medium">{t("header.account")}</span>
          </Link>
          <Link href="/favoris" className="hidden sm:flex flex-col items-center text-white/90 hover:text-[#ffea00] transition px-2 relative">
            <Heart size={24} />
            {favorites.length > 0 && (
              <span className="absolute -top-1 end-0 bg-[#ffea00] text-black text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                {favorites.length}
              </span>
            )}
            <span className="text-[11px] font-medium">{t("header.favorites")}</span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t("header.cartAria")}
            className={`flex items-center gap-2 text-white px-3 py-2 rounded transition hover:bg-white/10 ${bump ? "scale-110" : "scale-100"} transition-transform`}
          >
            <span className="relative">
              <ShoppingCart size={26} />
              <span className="absolute -top-2 -end-2 bg-[#e30613] text-white text-[11px] font-bold rounded-full min-w-[20px] h-[20px] flex items-center justify-center px-1 border-2 border-[#2f3d4c]">
                {count}
              </span>
            </span>
            <span className="hidden lg:block text-start leading-tight">
              <span className="block text-[11px] text-white/70">{t("header.cartLabel")}</span>
              <span className="block text-[13px] font-bold">{t("header.cartItems")}</span>
            </span>
          </button>
        </div>
      </div>

      {/* Mobile search */}
      <div className="md:hidden px-4 pb-3 flex items-center gap-2">
        <div className="flex h-[40px] flex-1 rounded overflow-hidden bg-white">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("header.searchMobile")}
            className="flex-1 px-3 text-[14px] outline-none"
          />
          <Link href={searchHref()} aria-label={t("header.searchMobile")} className="w-[48px] bg-[#e30613] flex items-center justify-center text-white">
            <Search size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}

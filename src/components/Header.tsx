"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, Heart, User, ChevronDown, Menu, X } from "lucide-react";
import { useCart } from "@/store/cart";

type Cat = { id: number; name: string; slug: string };

export default function Header({ categories }: { categories: Cat[] }) {
  const { count, setOpen, favorites } = useCart();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [showSuggest, setShowSuggest] = useState(false);
  const [catFilter, setCatFilter] = useState("Toutes catégories");
  const [showCatDrop, setShowCatDrop] = useState(false);
  const [bump, setBump] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setBump(true);
    const t = setTimeout(() => setBump(false), 350);
    return () => clearTimeout(t);
  }, [count]);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setShowSuggest(false);
        setShowCatDrop(false);
      }
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    const t = setTimeout(async () => {
      try {
        const r = await fetch(`/api/products?search=${encodeURIComponent(query)}&limit=6`);
        const j = await r.json();
        setResults(j.products || []);
        setShowSuggest(true);
      } catch {}
    }, 250);
    return () => clearTimeout(t);
  }, [query]);

  return (
    <div className="bg-[#2f3d4c] sticky top-0 z-[60] shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
      <div className="mx-auto max-w-[1280px] px-4 h-[72px] flex items-center gap-4 lg:gap-8">
        {/* Mobile menu btn placeholder */}
        <button className="lg:hidden text-white" aria-label="menu">
          <Menu />
        </button>

        {/* Logo MATEK like MYTEK */}
        <Link href="/" className="shrink-0 group">
          <div className="flex items-center gap-2">
            <div className="border-[3px] border-white rounded-[6px] px-3 py-[3px] leading-none transition group-hover:border-[#ffea00]">
              <span className="text-white font-black italic text-[30px] tracking-tighter group-hover:text-[#ffea00] transition">
                MA<span className="text-[#ffea00] group-hover:text-white transition">TEK</span>
              </span>
            </div>
            <div className="hidden xl:block leading-tight">
              <div className="text-[#ffea00] text-[11px] font-bold uppercase tracking-widest">Matériaux & Outillage</div>
              <div className="text-white/80 text-[11px] font-semibold">TRIPOLI — LIBYE</div>
            </div>
          </div>
        </Link>

        {/* Search */}
        <div ref={boxRef} className="relative flex-1 max-w-[640px] hidden md:block">
          <div className="flex h-[44px] rounded-[4px] overflow-hidden bg-white shadow-inner">
            <div className="relative">
              <button
                onClick={() => setShowCatDrop((v) => !v)}
                className="h-full px-3 text-[13px] text-gray-600 bg-gray-100 border-r border-gray-200 flex items-center gap-1 hover:bg-gray-200 transition min-w-[150px] justify-between"
              >
                <span className="truncate max-w-[120px]">{catFilter}</span>
                <ChevronDown size={14} />
              </button>
              {showCatDrop && (
                <div className="drop-down absolute top-[48px] left-0 w-[230px] bg-white shadow-xl border rounded-md overflow-hidden z-50 max-h-[320px] overflow-y-auto thin-scroll">
                  <button
                    onClick={() => { setCatFilter("Toutes catégories"); setShowCatDrop(false); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-gray-100 hover:text-[#e30613]"
                  >
                    Toutes catégories
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => { setCatFilter(c.name); setShowCatDrop(false); }}
                      className="w-full text-left px-4 py-2 text-[13px] hover:bg-gray-100 hover:text-[#e30613]"
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
              placeholder="Rechercher : perceuse, ciment, peinture, groupe électrogène..."
              className="flex-1 px-4 text-[14px] outline-none text-gray-800 placeholder:text-gray-400"
            />
            <Link
              href={query ? `/recherche?q=${encodeURIComponent(query)}` : `/recherche`}
              className="w-[56px] bg-[#e30613] hover:bg-[#b3050f] transition flex items-center justify-center text-white"
            >
              <Search size={20} strokeWidth={2.5} />
            </Link>
          </div>
          {showSuggest && results.length > 0 && (
            <div className="drop-down absolute top-[50px] left-0 right-0 bg-white rounded-md shadow-2xl border overflow-hidden z-50">
              {results.map((p: any) => (
                <Link
                  key={p.id}
                  href={`/produit/${p.slug}`}
                  onClick={() => setShowSuggest(false)}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 border-b last:border-0 transition"
                >
                  <img src={p.image} alt={p.name} className="w-11 h-11 object-cover rounded border" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium truncate">{p.name}</div>
                    <div className="text-[12px] text-gray-500">{p.reference}</div>
                  </div>
                  <div className="text-[#e30613] font-bold text-[14px] whitespace-nowrap">
                    {parseFloat(p.price).toFixed(2)} د.ل
                  </div>
                </Link>
              ))}
              <Link
                href={`/recherche?q=${encodeURIComponent(query)}`}
                onClick={() => setShowSuggest(false)}
                className="block text-center py-2 text-[13px] font-semibold text-[#e30613] bg-gray-50 hover:bg-gray-100"
              >
                Voir tous les résultats →
              </Link>
            </div>
          )}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-1 sm:gap-2 ml-auto">
          <Link href="/compte" className="hidden sm:flex flex-col items-center text-white/90 hover:text-[#ffea00] transition px-2">
            <User size={24} />
            <span className="text-[11px] font-medium">Compte</span>
          </Link>
          <Link href="/favoris" className="hidden sm:flex flex-col items-center text-white/90 hover:text-[#ffea00] transition px-2 relative">
            <Heart size={24} />
            {favorites.length > 0 && (
              <span className="absolute -top-1 right-0 bg-[#ffea00] text-black text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                {favorites.length}
              </span>
            )}
            <span className="text-[11px] font-medium">Favoris</span>
          </Link>
          <button
            onClick={() => setOpen(true)}
            className={`flex items-center gap-2 text-white px-3 py-2 rounded transition hover:bg-white/10 ${bump ? "scale-110" : "scale-100"} transition-transform`}
          >
            <span className="relative">
              <ShoppingCart size={26} />
              <span className="absolute -top-2 -right-2 bg-[#e30613] text-white text-[11px] font-bold rounded-full min-w-[20px] h-[20px] flex items-center justify-center px-1 border-2 border-[#2f3d4c]">
                {count}
              </span>
            </span>
            <span className="hidden lg:block text-left leading-tight">
              <span className="block text-[11px] text-white/70">Mon Panier</span>
              <span className="block text-[13px] font-bold">Articles</span>
            </span>
          </button>
        </div>
      </div>

      {/* Mobile search */}
      <div className="md:hidden px-4 pb-3">
        <div className="flex h-[40px] rounded overflow-hidden bg-white">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un produit..."
            className="flex-1 px-3 text-[14px] outline-none"
          />
          <Link href={query ? `/recherche?q=${encodeURIComponent(query)}` : `/recherche`} className="w-[48px] bg-[#e30613] flex items-center justify-center text-white">
            <Search size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}

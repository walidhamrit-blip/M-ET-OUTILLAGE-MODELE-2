"use client";
import { useEffect, useState } from "react";
import ProductCard, { Product } from "./ProductCard";
import Link from "next/link";
import { SlidersHorizontal, ChevronDown, ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
import { useI18n } from "@/i18n/AppProvider";

export default function ListingClient({
  categorySlug,
  initialSearch,
  initialBrand,
  initialFlag,
  title,
}: {
  categorySlug?: string;
  initialSearch?: string;
  initialBrand?: string;
  initialFlag?: string;
  title: string;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState("new");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initialSearch || "");
  const [showSort, setShowSort] = useState(false);
  const { t, locale } = useI18n();

  const sorts = [
    { v: "new", l: t("home.newTitle") },
    { v: "price-asc", l: t("catalog.sortPriceAsc") },
    { v: "price-desc", l: t("catalog.sortPriceDesc") },
    { v: "promo", l: t("catalog.sortPromo") },
  ];

  useEffect(() => {
    setSearch(initialSearch || "");
    setPage(1);
  }, [initialSearch, categorySlug, initialBrand, initialFlag]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        if (categorySlug) params.set("categorie", categorySlug);
        if (initialBrand) params.set("marque", initialBrand);
        if (initialFlag) params.set("flag", initialFlag);
        params.set("sort", sort);
        params.set("page", String(page));
        params.set("limit", "24");
        params.set("lang", locale);
        const r = await fetch(`/api/products?${params.toString()}`);
        const j = await r.json();
        setProducts(j.products || []);
        setTotal(j.total || 0);
        setTotalPages(j.totalPages || 1);
      } catch {}
      setLoading(false);
    };
    fetchData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [search, categorySlug, initialBrand, initialFlag, sort, page, locale]);

  return (
    <div className="mx-auto max-w-[1280px] px-4 mt-4">
      {/* breadcrumb */}
      <div className="text-[12px] text-gray-500 flex items-center gap-1.5 mb-2">
        <Link href="/" className="hover:text-[#e30613]">{t("common.home")}</Link>
        <span>/</span>
        <span className="font-semibold text-gray-800 dark:text-gray-200">{title}</span>
        <span className="ms-2 bg-gray-200 dark:bg-white/10 rounded-full px-2 py-[1px] text-[11px] font-bold">{t("common.productsCount", { count: total })}</span>
      </div>

      <div className="bg-white dark:bg-[#1a222c] border border-gray-200 dark:border-[#2c3644] rounded-t-[4px]">
        <div className="section-bar flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b border-gray-200 dark:border-[#2c3644]">
          <h1 className="text-[18px] sm:text-[20px] font-black uppercase">{title}</h1>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button type="button" onClick={() => setShowSort((v) => !v)} className="flex items-center gap-2 border dark:border-[#2c3644] rounded px-3 py-2 text-[13px] font-medium hover:border-[#e30613] transition">
                <SlidersHorizontal size={15} />
                {sorts.find((s) => s.v === sort)?.l}
                <ChevronDown size={14} />
              </button>
              {showSort && (
                <div className="drop-down absolute end-0 top-[42px] w-[200px] bg-white dark:bg-[#1a222c] border dark:border-[#2c3644] rounded shadow-xl z-20 overflow-hidden">
                  {sorts.map((s) => (
                    <button
                      key={s.v}
                      type="button"
                      onClick={() => { setSort(s.v); setShowSort(false); setPage(1); }}
                      className={`w-full text-start px-4 py-2.5 text-[13px] hover:bg-gray-50 dark:hover:bg-white/5 ${sort === s.v ? "text-[#e30613] font-bold bg-red-50/50 dark:bg-red-900/20" : ""}`}
                    >
                      {s.l}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 p-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="border rounded overflow-hidden">
                <div className="shimmer aspect-square" />
                <div className="p-3 space-y-2">
                  <div className="shimmer h-3 rounded" />
                  <div className="shimmer h-3 rounded w-2/3" />
                  <div className="shimmer h-5 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <LayoutGrid size={48} className="mx-auto text-gray-200" />
            <p className="mt-3 font-bold text-gray-600 dark:text-gray-300">{t("catalog.empty")}</p>
            <p className="text-[13px] text-gray-400">{t("catalog.emptyHint")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 p-3">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 py-5 border-t">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              aria-label={t("common.prev")}
              className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-[#e30613] hover:text-white hover:border-[#e30613] disabled:opacity-40 transition"
            >
              <ChevronLeft size={18} className="rtl:rotate-180" />
            </button>
            {Array.from({ length: Math.min(totalPages, 7) }).map((_, i) => {
              const n = i + 1;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  className={`w-9 h-9 rounded-full text-[13px] font-bold transition ${n === page ? "bg-[#e30613] text-white" : "border hover:border-[#e30613] hover:text-[#e30613]"}`}
                >
                  {n}
                </button>
              );
            })}
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              aria-label={t("common.next")}
              className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-[#e30613] hover:text-white hover:border-[#e30613] disabled:opacity-40 transition"
            >
              <ChevronRight size={18} className="rtl:rotate-180" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

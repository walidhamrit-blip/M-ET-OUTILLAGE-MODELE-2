"use client";
import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n } from "@/i18n/AppProvider";

type Brand = { id: number; name: string; slug: string; logo?: string | null; color?: string | null };

export default function BrandsCarousel({ brands }: { brands: Brand[] }) {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    const rtl = document.documentElement.dir === "rtl";
    ref.current?.scrollBy({ left: (rtl ? -dir : dir) * 400, behavior: "smooth" });
  };

  return (
    <div className="mx-auto max-w-[1280px] px-4 mt-6">
      <div className="bg-white dark:bg-[#1a222c] rounded-[4px] border border-gray-200 dark:border-[#2c3644] p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[16px] sm:text-[18px] font-black">{t("brands.title")}</h2>
          <div className="flex gap-2">
            <button type="button" onClick={() => scroll(-1)} aria-label={t("common.prev")} className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-[#e30613] hover:text-white hover:border-[#e30613] transition"><ChevronLeft size={17} /></button>
            <button type="button" onClick={() => scroll(1)} aria-label={t("common.next")} className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-[#e30613] hover:text-white hover:border-[#e30613] transition"><ChevronRight size={17} /></button>
          </div>
        </div>
        <div ref={ref} className="no-scrollbar flex gap-3 overflow-x-auto scroll-smooth pb-1">
          {brands.map((b) => (
            <Link
              key={b.id}
              href={`/recherche?marque=${b.slug}`}
              className="brand-logo shrink-0 w-[150px] h-[74px] border-2 border-gray-100 dark:border-[#2c3644] rounded-md bg-white flex items-center justify-center px-4"
            >
              {b.logo ? (
                <img src={b.logo} alt={b.name} className="max-h-[52px] max-w-full object-contain" />
              ) : (
                <span className="font-black italic text-[19px] tracking-tight" style={{ color: b.color || "#2f3d4c" }}>
                  {b.name.toUpperCase()}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard, { Product } from "./ProductCard";
import { useI18n } from "@/i18n/AppProvider";

export default function ProductSection({
  title,
  subtitle,
  products,
  link,
  linkLabel,
  dark = false,
}: {
  title: string;
  subtitle?: string;
  products: Product[];
  link: string;
  linkLabel?: string;
  dark?: boolean;
}) {
  const { t } = useI18n();
  const scroller = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08 }
    );
    el.classList.add("reveal");
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /** Défilement dans le sens de lecture : "précédent" revient vers le début de la liste. */
  const scrollBy = (dir: number) => {
    const el = scroller.current;
    if (!el) return;
    const rtl = document.documentElement.dir === "rtl";
    el.scrollBy({ left: (rtl ? -dir : dir) * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  if (!products.length) return null;

  return (
    <div ref={sectionRef} className="mx-auto max-w-[1280px] px-4 mt-6">
      <div className={`rounded-t-[4px] border border-b-0 border-gray-200 ${dark ? "bg-[#2f3d4c]" : "bg-white"}`}>
        <div className="section-bar flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div>
            <h2 className={`text-[17px] sm:text-[19px] font-black uppercase tracking-tight ${dark ? "text-white" : "text-[#222]"}`}>
              {title}
            </h2>
            {subtitle && <p className={`text-[12px] ${dark ? "text-white/70" : "text-gray-500"}`}>{subtitle}</p>}
          </div>
          <div className="flex items-center gap-2">
            <Link href={link} className="hidden sm:inline-block text-[13px] font-bold text-[#e30613] hover:underline me-1">
              {linkLabel ?? t("common.seeAll")}
            </Link>
            <button type="button" onClick={() => scrollBy(-1)} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#e30613] hover:text-white hover:border-[#e30613] transition" aria-label={t("common.prev")}>
              <ChevronLeft size={18} />
            </button>
            <button type="button" onClick={() => scrollBy(1)} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#e30613] hover:text-white hover:border-[#e30613] transition" aria-label={t("common.next")}>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <div ref={scroller} className="no-scrollbar flex gap-3 overflow-x-auto p-3 scroll-smooth">
          {products.map((p) => (
            <div key={p.id} className="w-[200px] sm:w-[220px] shrink-0">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

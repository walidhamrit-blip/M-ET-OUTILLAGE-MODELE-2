"use client";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n } from "@/i18n/AppProvider";

type Cat = { id: number; name: string; slug: string; image?: string | null };

/** Images de repli par rayon lorsque la catégorie n'a pas encore d'image. */
const fallbackImgs: Record<string, string> = {
  "outillage-electrique": "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&q=70&auto=format&fit=crop",
  "outillage-a-main": "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=300&q=70&auto=format&fit=crop",
  "materiaux-construction": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=300&q=70&auto=format&fit=crop",
  "peinture-droguerie": "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=300&q=70&auto=format&fit=crop",
  "plomberie-sanitaire": "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=300&q=70&auto=format&fit=crop",
  "electricite-eclairage": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&q=70&auto=format&fit=crop",
  "climatisation": "https://images.unsplash.com/photo-1631545806609-24040d63f86a?w=300&q=70&auto=format&fit=crop",
  "quincaillerie": "https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?w=300&q=70&auto=format&fit=crop",
  "groupes-electrogenes": "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=300&q=70&auto=format&fit=crop",
  "carrelage-revetement": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&q=70&auto=format&fit=crop",
  "jardin-exterieur": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&q=70&auto=format&fit=crop",
  "securite": "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=300&q=70&auto=format&fit=crop",
};

export default function CategoryCircles({ categories }: { categories: Cat[] }) {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    el.classList.add("reveal");
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const scroll = (dir: number) => {
    const rtl = document.documentElement.dir === "rtl";
    ref.current?.scrollBy({ left: (rtl ? -dir : dir) * 400, behavior: "smooth" });
  };

  return (
    <div ref={wrapRef} className="mx-auto max-w-[1280px] px-4 mt-5">
      <div className="bg-white dark:bg-[#1a222c] rounded-[4px] border border-gray-200 dark:border-[#2c3644] p-4 relative">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[16px] sm:text-[18px] font-black">{t("home.categoriesTitle")}</h2>
          <div className="hidden sm:flex gap-2">
            <button type="button" onClick={() => scroll(-1)} aria-label={t("common.prev")} className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-[#e30613] hover:text-white hover:border-[#e30613] transition"><ChevronLeft size={17} /></button>
            <button type="button" onClick={() => scroll(1)} aria-label={t("common.next")} className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-[#e30613] hover:text-white hover:border-[#e30613] transition"><ChevronRight size={17} /></button>
          </div>
        </div>
        <div ref={ref} className="no-scrollbar flex gap-4 sm:gap-5 overflow-x-auto pb-1 scroll-smooth">
          {categories.map((c) => (
            <Link key={c.id} href={`/categorie/${c.slug}`} className="cat-circle shrink-0 w-[104px] sm:w-[124px] text-center border-2 border-transparent rounded-xl p-2">
              <div className="w-[88px] h-[88px] sm:w-[104px] sm:h-[104px] mx-auto rounded-full overflow-hidden border-[3px] border-gray-100 dark:border-[#2c3644] shadow-md">
                <img src={c.image || fallbackImgs[c.slug] || fallbackImgs["outillage-electrique"]} alt={c.name} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="cat-label text-[12px] sm:text-[13px] font-semibold mt-2 leading-tight transition">{c.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

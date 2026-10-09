"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n/AppProvider";

/** Trois tuiles promotionnelles, éditables dans l'administration (Paramètres > Accueil). */
export default function PromoTiles() {
  const { t, locale, settings } = useI18n();
  const tiles = settings.home.tiles;
  if (!tiles.length) return null;
  return (
    <div className="mx-auto max-w-[1280px] px-4 mt-6 grid sm:grid-cols-3 gap-3">
      {tiles.map((tile, i) => (
        <Link key={i} href={tile.link} className="group relative overflow-hidden rounded-[4px] h-[150px] sm:h-[170px] shadow">
          <img src={tile.img} alt={tile.title[locale]} className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l from-black/70 via-black/30 to-transparent" />
          {tile.tag && (
            <span className="absolute top-3 start-3 bg-[#e30613] text-white text-[12px] font-bold px-2 py-[2px] rounded-sm" dir="ltr">{tile.tag}</span>
          )}
          <div className="absolute bottom-0 start-0 end-0 p-4">
            <div className="text-white font-black text-[18px] leading-tight">{tile.title[locale]}</div>
            <div className="text-white/80 text-[12px]">{tile.desc[locale]}</div>
            <span className="inline-flex items-center gap-1 text-[#ffea00] text-[13px] font-bold mt-1 group-hover:gap-3 transition-all">
              {t("home.discover")} <ArrowRight size={15} className="rtl:rotate-180" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

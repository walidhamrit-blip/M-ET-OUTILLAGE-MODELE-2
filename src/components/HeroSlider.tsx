"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n } from "@/i18n/AppProvider";
import type { TextKey } from "@/i18n/texts";

export type Slide = {
  id: number;
  title: string | null;
  subtitle: string | null;
  image: string | null;
  link: string | null;
  bgColor: string | null;
};

/** Diaporama de repli, utilisé uniquement lorsqu'aucune diapositive n'est active en base. */
const FALLBACK: { id: number; titleKey: TextKey; subKey: TextKey; link: string; bgColor: string }[] = [
  { id: 1, titleKey: "hero.fb1.title", subKey: "hero.fb1.subtitle", link: "/categorie/outillage-electrique", bgColor: "#1a2a3a" },
  { id: 2, titleKey: "hero.fb2.title", subKey: "hero.fb2.subtitle", link: "/categorie/materiaux-construction", bgColor: "#e30613" },
  { id: 3, titleKey: "hero.fb3.title", subKey: "hero.fb3.subtitle", link: "/categorie/climatisation", bgColor: "#0e7490" },
  { id: 4, titleKey: "hero.fb4.title", subKey: "hero.fb4.subtitle", link: "/categorie/groupes-electrogenes", bgColor: "#3f3f46" },
  { id: 5, titleKey: "hero.fb5.title", subKey: "hero.fb5.subtitle", link: "/categorie/peinture-droguerie", bgColor: "#b45309" },
];

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const { t } = useI18n();
  const data: Slide[] =
    slides.length > 0
      ? slides
      : FALLBACK.map((f) => ({
          id: f.id,
          title: t(f.titleKey),
          subtitle: t(f.subKey),
          image: null,
          link: f.link,
          bgColor: f.bgColor,
        }));
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback((i: number) => {
    setIndex((i + data.length) % data.length);
  }, [data.length]);

  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  useEffect(() => {
    if (paused) return;
    timer.current = setTimeout(next, 5000);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [index, paused, next]);

  const s = data[index % data.length];

  return (
    <div
      className="relative mx-auto max-w-[1280px] mt-3 px-0 sm:px-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative overflow-hidden sm:rounded-[4px] bg-[#e9e9e9] dark:bg-[#1a222c] h-[300px] sm:h-[400px] lg:h-[440px] shadow">
        {/* Background */}
        <div key={s.id} className="absolute inset-0">
          {s.image ? (
            <img src={s.image} alt="" className="hero-zoom w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full" style={{ background: `linear-gradient(115deg, ${s.bgColor} 0%, #111c26 70%)` }}>
              {/* decorative shapes */}
              <div className="absolute -end-20 -top-20 w-[420px] h-[420px] rounded-full bg-white/5" />
              <div className="absolute end-40 bottom-[-160px] w-[380px] h-[380px] rounded-full bg-[#ffea00]/10" />
              <div className="absolute end-10 top-1/2 -translate-y-1/2 hidden lg:block opacity-90">
                <HeroArt id={s.id} />
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l from-black/45 via-black/10 to-transparent" />
        </div>

        {/* Text */}
        <div key={`t-${s.id}-${index}`} className="absolute inset-0 flex flex-col justify-center px-8 sm:px-16 max-w-[720px]">
          <div className="hero-text-up inline-flex w-fit items-center gap-2 bg-[#e30613] text-white text-[11px] sm:text-[12px] font-bold px-3 py-1 rounded-sm uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-[#ffea00] animate-pulse" />
            {t("hero.badge")}
          </div>
          <h2 className="hero-text-up hero-text-up-d1 text-white font-black text-[28px] sm:text-[46px] lg:text-[54px] leading-[1.05] drop-shadow-[3px_3px_0_rgba(0,0,0,0.35)]">
            {s.title}
          </h2>
          <p className="hero-text-up hero-text-up-d2 text-white/90 text-[14px] sm:text-[20px] mt-3 font-medium">
            {s.subtitle}
          </p>
          <div className="hero-text-up hero-text-up-d3 mt-6 flex items-center gap-3">
            <Link
              href={s.link || "/recherche"}
              className="bg-[#ffea00] hover:bg-white text-black font-bold text-[14px] sm:text-[15px] px-7 py-3 rounded-sm transition shadow-[3px_3px_0_rgba(0,0,0,0.4)] hover:shadow-none hover:-translate-y-[1px]"
            >
              {t("hero.cta")}
            </Link>
            <Link href="/magasins" className="hidden sm:inline-block border-2 border-white text-white font-bold text-[14px] px-6 py-[10px] rounded-sm hover:bg-white hover:text-black transition">
              {t("hero.stores")}
            </Link>
          </div>
        </div>

        {/* Side arrows */}
        <button
          type="button"
          onClick={prev}
          aria-label={t("common.prev")}
          className="absolute start-0 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-[#e30613] hover:text-white text-[#2f3d4c] w-[38px] sm:w-[48px] h-[64px] sm:h-[84px] flex items-center justify-center rounded-e-[4px] transition shadow-lg group"
        >
          <ChevronLeft size={30} strokeWidth={1.5} className="group-hover:-translate-x-[2px] rtl:rotate-180 transition" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label={t("common.next")}
          className="absolute end-0 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-[#e30613] hover:text-white text-[#2f3d4c] w-[38px] sm:w-[48px] h-[64px] sm:h-[84px] flex items-center justify-center rounded-s-[4px] transition shadow-lg group"
        >
          <ChevronRight size={30} strokeWidth={1.5} className="group-hover:translate-x-[2px] rtl:rotate-180 transition" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 start-1/2 -translate-x-1/2 flex items-center gap-2">
          {data.map((d, i) => (
            <button
              type="button"
              key={`${d.id}-${i}`}
              onClick={() => go(i)}
              aria-label={t("common.slideLabel", { n: i + 1 })}
              className={`h-[5px] rounded-full transition-all duration-300 ${
                i === index ? "w-[38px] bg-white" : "w-[22px] bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        {/* Progress bar */}
        {!paused && (
          <div key={index} className="absolute bottom-0 start-0 h-[3px] bg-[#e30613] animate-[progress_5s_linear_forwards]" />
        )}
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}

function HeroArt({ id }: { id: number }) {
  const emojis: Record<number, string> = { 1: "🛠️", 2: "🏗️", 3: "❄️", 4: "⚡", 5: "🎨" };
  return (
    <div className="w-[300px] h-[300px] rounded-full bg-gradient-to-br from-white/15 to-white/5 border border-white/20 flex items-center justify-center backdrop-blur-sm">
      <span className="text-[130px] drop-shadow-2xl">{emojis[id] || "🧰"}</span>
    </div>
  );
}

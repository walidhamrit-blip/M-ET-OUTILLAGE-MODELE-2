"use client";
import { useEffect, useState, useRef } from "react";
import { Zap, ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard, { Product } from "./ProductCard";
import { useI18n } from "@/i18n/AppProvider";

function useCountdown() {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });
  useEffect(() => {
    // Les ventes flash se terminent à minuit.
    const tick = () => {
      const now = new Date();
      const end = new Date();
      end.setHours(23, 59, 59, 999);
      const diff = Math.max(0, end.getTime() - now.getTime());
      setTime({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function FlashSale({ products }: { products: Product[] }) {
  const { t } = useI18n();
  const { h, m, s } = useCountdown();
  const ref = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08 }
    );
    el.classList.add("reveal");
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  if (!products.length) return null;
  const pad = (n: number) => String(n).padStart(2, "0");
  const rtl = () => document.documentElement.dir === "rtl";

  return (
    <div ref={wrapRef} className="mx-auto max-w-[1280px] px-4 mt-6">
      <div className="rounded-[4px] overflow-hidden border border-[#e30613]/30 shadow-[0_6px_24px_rgba(227,6,19,0.12)]">
        <div className="bg-gradient-to-r from-[#e30613] via-[#c20510] to-[#2f3d4c] px-4 py-3 flex flex-wrap items-center gap-3 justify-between">
          <div className="flex items-center gap-3">
            <span className="pulse-red w-10 h-10 rounded-full bg-[#ffea00] flex items-center justify-center">
              <Zap size={20} className="text-black" fill="currentColor" />
            </span>
            <div>
              <h2 className="text-white font-black text-[18px] sm:text-[20px] uppercase italic leading-none">{t("flash.title")}</h2>
              <p className="text-white/80 text-[12px]">{t("flash.subtitle")}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {[
              { v: pad(h), l: t("flash.hours") },
              { v: pad(m), l: t("flash.minutes") },
              { v: pad(s), l: t("flash.seconds") },
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="bg-black/60 backdrop-blur rounded px-2.5 py-1.5 text-center min-w-[56px] border border-white/20">
                  <div className="text-white font-black text-[20px] leading-none tabular-nums" dir="ltr">{b.v}</div>
                  <div className="text-[#ffea00] text-[10px] font-bold tracking-widest">{b.l}</div>
                </div>
                {i < 2 && <span className="text-white font-black text-[18px]">:</span>}
              </div>
            ))}
            <div className="hidden sm:flex gap-2 ms-3">
              <button
                type="button"
                onClick={() => ref.current?.scrollBy({ left: (rtl() ? 460 : -460), behavior: "smooth" })}
                aria-label={t("common.prev")}
                className="w-9 h-9 rounded-full bg-white/15 text-white border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => ref.current?.scrollBy({ left: (rtl() ? -460 : 460), behavior: "smooth" })}
                aria-label={t("common.next")}
                className="w-9 h-9 rounded-full bg-white/15 text-white border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 dark:bg-[#1a222c]">
          <div ref={ref} className="no-scrollbar flex gap-3 overflow-x-auto scroll-smooth">
            {products.map((p) => (
              <div key={p.id} className="w-[200px] sm:w-[220px] shrink-0">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

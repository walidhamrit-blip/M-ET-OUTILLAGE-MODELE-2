"use client";
import { useEffect, useState, useRef } from "react";
import { Zap, ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard, { Product } from "./ProductCard";

function useCountdown() {
  const [t, setT] = useState({ h: 7, m: 42, s: 18 });
  useEffect(() => {
    // ends at midnight
    const tick = () => {
      const now = new Date();
      const end = new Date();
      end.setHours(23, 59, 59, 999);
      const diff = Math.max(0, end.getTime() - now.getTime());
      setT({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export default function FlashSale({ products }: { products: Product[] }) {
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

  return (
    <div ref={wrapRef} className="mx-auto max-w-[1280px] px-4 mt-6">
      <div className="rounded-[4px] overflow-hidden border border-[#e30613]/30 shadow-[0_6px_24px_rgba(227,6,19,0.12)]">
        <div className="bg-gradient-to-r from-[#e30613] via-[#c20510] to-[#2f3d4c] px-4 py-3 flex flex-wrap items-center gap-3 justify-between">
          <div className="flex items-center gap-3">
            <span className="pulse-red w-10 h-10 rounded-full bg-[#ffea00] flex items-center justify-center">
              <Zap size={20} className="text-black" fill="currentColor" />
            </span>
            <div>
              <h2 className="text-white font-black text-[18px] sm:text-[20px] uppercase italic leading-none">Ventes Flash</h2>
              <p className="text-white/80 text-[12px]">Chaque jour de 09h à minuit — Tripoli</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {[
              { v: pad(h), l: "HRS" },
              { v: pad(m), l: "MIN" },
              { v: pad(s), l: "SEC" },
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="bg-black/60 backdrop-blur rounded px-2.5 py-1.5 text-center min-w-[56px] border border-white/20">
                  <div className="text-white font-black text-[20px] leading-none tabular-nums">{b.v}</div>
                  <div className="text-[#ffea00] text-[10px] font-bold tracking-widest">{b.l}</div>
                </div>
                {i < 2 && <span className="text-white font-black text-[18px]">:</span>}
              </div>
            ))}
            <div className="hidden sm:flex gap-2 ml-3">
              <button onClick={() => ref.current?.scrollBy({ left: -460, behavior: "smooth" })} className="w-9 h-9 rounded-full bg-white/15 text-white border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition"><ChevronLeft size={18} /></button>
              <button onClick={() => ref.current?.scrollBy({ left: 460, behavior: "smooth" })} className="w-9 h-9 rounded-full bg-white/15 text-white border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition"><ChevronRight size={18} /></button>
            </div>
          </div>
        </div>
        <div className="bg-white p-3">
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

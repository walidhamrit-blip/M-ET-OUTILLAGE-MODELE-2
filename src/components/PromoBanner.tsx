"use client";
import Link from "next/link";

export default function PromoBanner() {
  return (
    <Link href="/magasins" className="block bg-[#e30613] overflow-hidden relative group">
      <div className="mx-auto max-w-[1280px] px-4 h-[52px] flex items-center justify-center gap-3 sm:gap-5">
        <span className="text-[#ffea00] font-black text-[18px] sm:text-[28px] tracking-tight italic drop-shadow-[2px_2px_0_rgba(0,0,0,0.35)] whitespace-nowrap">
          NOUVEAU
        </span>
        <span className="bg-[#ffea00] text-black font-black text-[16px] sm:text-[26px] px-2 sm:px-3 py-[1px] italic tracking-tight -rotate-[1.5deg] shadow-[3px_3px_0_rgba(0,0,0,0.4)] whitespace-nowrap group-hover:rotate-0 transition-transform">
          MAGASIN
        </span>
        <span className="text-white font-black text-[18px] sm:text-[28px] whitespace-nowrap" dir="rtl">
          تفتح أبوابها في عين زارة
        </span>
        <span className="hidden md:inline-block border-[2.5px] border-white rounded px-3 py-[2px] ml-2">
          <span className="text-white font-black italic text-[22px] tracking-tighter">
            MA<span className="text-[#ffea00]">TEK</span>
          </span>
        </span>
        <span className="blink-glow hidden sm:inline-block bg-black text-white text-[14px] sm:text-[16px] font-bold px-5 py-1.5 rounded-full ml-2 whitespace-nowrap group-hover:bg-[#222]">
          Cliquez ici
        </span>
      </div>
      {/* shine sweep */}
      <span className="pointer-events-none absolute inset-y-0 w-[120px] bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 animate-[shine_3.5s_ease-in-out_infinite] left-0" />
      <style jsx>{`
        @keyframes shine {
          0% { left: -140px; }
          60%, 100% { left: 110%; }
        }
      `}</style>
    </Link>
  );
}

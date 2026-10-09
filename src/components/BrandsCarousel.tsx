"use client";
import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BrandsCarousel({ brands }: { brands: { id: number; name: string; slug: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);

  const colors: Record<string, string> = {
    Bosch: "#ea0016", Makita: "#00838f", DeWalt: "#febd17", Stanley: "#000000",
    Total: "#c8102e", Ingco: "#f5a800", Sika: "#ffcc00", Legrand: "#e2001a",
    Schneider: "#3dcdbf", Knauf: "#0072bc", Jotun: "#003da5", Coral: "#e30613",
  };

  return (
    <div className="mx-auto max-w-[1280px] px-4 mt-6">
      <div className="bg-white rounded-[4px] border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[16px] sm:text-[18px] font-black uppercase">Nos <span className="text-[#e30613]">marques</span></h2>
          <div className="flex gap-2">
            <button onClick={() => ref.current?.scrollBy({ left: -400, behavior: "smooth" })} className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-[#e30613] hover:text-white hover:border-[#e30613] transition"><ChevronLeft size={17} /></button>
            <button onClick={() => ref.current?.scrollBy({ left: 400, behavior: "smooth" })} className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-[#e30613] hover:text-white hover:border-[#e30613] transition"><ChevronRight size={17} /></button>
          </div>
        </div>
        <div ref={ref} className="no-scrollbar flex gap-3 overflow-x-auto scroll-smooth pb-1">
          {brands.map((b) => (
            <Link
              key={b.id}
              href={`/recherche?marque=${b.slug}`}
              className="brand-logo shrink-0 w-[150px] h-[74px] border-2 border-gray-100 rounded-md bg-white flex items-center justify-center px-4"
            >
              <span className="font-black italic text-[19px] tracking-tight" style={{ color: colors[b.name] || "#2f3d4c" }}>
                {b.name.toUpperCase()}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

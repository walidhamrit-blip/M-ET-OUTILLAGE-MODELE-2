"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PromoTiles() {
  const tiles = [
    {
      title: "Outillage Pro",
      desc: "Perceuses, meuleuses, coffrets",
      img: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&q=70&auto=format&fit=crop",
      link: "/categorie/outillage-electrique",
      tag: "-30%",
    },
    {
      title: "Peinture & Déco",
      desc: "Jotun, Coral, Sika",
      img: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&q=70&auto=format&fit=crop",
      link: "/categorie/peinture-droguerie",
      tag: "TOP",
    },
    {
      title: "Groupes Électrogènes",
      desc: "Ne restez jamais sans courant",
      img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=70&auto=format&fit=crop",
      link: "/categorie/groupes-electrogenes",
      tag: "-15%",
    },
  ];
  return (
    <div className="mx-auto max-w-[1280px] px-4 mt-6 grid sm:grid-cols-3 gap-3">
      {tiles.map((t, i) => (
        <Link key={i} href={t.link} className="group relative overflow-hidden rounded-[4px] h-[150px] sm:h-[170px] shadow">
          <img src={t.img} alt={t.title} className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          <span className="absolute top-3 left-3 bg-[#e30613] text-white text-[12px] font-bold px-2 py-[2px] rounded-sm">{t.tag}</span>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="text-white font-black text-[18px] leading-tight">{t.title}</div>
            <div className="text-white/80 text-[12px]">{t.desc}</div>
            <span className="inline-flex items-center gap-1 text-[#ffea00] text-[13px] font-bold mt-1 group-hover:gap-3 transition-all">
              Découvrir <ArrowRight size={15} />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

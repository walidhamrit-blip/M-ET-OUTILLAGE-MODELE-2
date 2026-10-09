"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Menu, ChevronRight, ChevronDown, Wrench, Hammer, PaintBucket, Plug, Droplets,
  Snowflake, Package, Lightbulb, ShieldCheck, Zap, LayoutGrid, Drill
} from "lucide-react";

type Cat = { id: number; name: string; slug: string; icon?: string | null; productCount?: number | null };

const iconMap: Record<string, any> = {
  Wrench, Hammer, PaintBucket, Plug, Droplets, Snowflake, Package, Lightbulb, ShieldCheck, Zap, LayoutGrid, Drill
};

const subMap: Record<string, string[]> = {
  "outillage-electrique": ["Perceuses & Visseuses", "Meuleuses", "Scies circulaires", "Perforateurs", "Ponceuses", "Coffrets"],
  "outillage-a-main": ["Clés & Douilles", "Marteaux", "Tournevis", "Pinces", "Scies à main", "Coffrets à outils"],
  "materiaux-construction": ["Ciment & Béton", "Fer à béton", "Briques & Parpaings", "Plâtre & Enduits", "Sable & Gravier", "Bois de coffrage"],
  "peinture-droguerie": ["Peinture intérieure", "Peinture extérieure", "Enduits", "Vernis & Lasures", "Pinceaux & Rouleaux"],
  "plomberie-sanitaire": ["Tuyaux & Raccords", "Robinetterie", "WC & Lavabos", "Chauffe-eau", "Pompes à eau"],
  "electricite-eclairage": ["Câbles & Fils", "Disjoncteurs", "Interrupteurs", "Luminaires LED", "Tableaux électriques"],
  "climatisation": ["Climatiseurs", "Chauffe-eau solaires", "Ventilateurs", "Déshumidificateurs"],
  "quincaillerie": ["Visserie", "Serrures", "Charnières", "Chevilles", "Colles & Silicones"],
  "groupes-electrogenes": ["Groupes essence", "Groupes diesel", "Compresseurs", "Postes à souder"],
  "carrelage-revetement": ["Carrelage sol", "Faïence murale", "Parquet", "Plinthes", "Colles carrelage"],
  "jardin-exterieur": ["Tondeuses", "Taille-haies", "Arrosage", "Mobilier jardin"],
  "securite": ["Casques", "Gants", "Chaussures de sécurité", "Lunettes", "Extincteurs"],
};

export default function NavBar({ categories }: { categories: Cat[] }) {
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const closeTimer = useRef<any>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setMegaOpen(false);
      setActiveCat(null);
    }, 180);
  };

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  const links = [
    { label: "Rentrée Chantier", href: "/categorie/outillage-electrique", hot: true },
    { label: "Climatiseur", href: "/categorie/climatisation" },
    { label: "Service Entreprise", href: "/entreprise" },
    { label: "Vente En Ligne", href: "/recherche" },
    { label: "Matek Recrute", href: "/recrutement" },
    { label: "Nous Contacter", href: "/contact" },
  ];

  return (
    <div className="bg-white border-b border-gray-200 relative z-[55]">
      <div className="mx-auto max-w-[1280px] px-4 flex items-stretch">
        {/* TOUS NOS RAYONS */}
        <div className="relative" onMouseEnter={openMega} onMouseLeave={scheduleClose}>
          <button
            onClick={() => setMegaOpen((v) => !v)}
            className={`flex items-center gap-3 px-5 h-[52px] font-bold text-[15px] tracking-wide transition -mt-[14px] rounded-t-[6px] pt-[14px] ${
              megaOpen ? "bg-[#e30613] text-white" : "bg-white text-[#222] shadow-[0_-2px_10px_rgba(0,0,0,0.12)]"
            }`}
          >
            <span className="whitespace-nowrap">TOUS NOS RAYONS</span>
            <Menu size={20} className={megaOpen ? "text-white" : "text-[#e30613]"} />
          </button>

          {/* Mega dropdown */}
          {megaOpen && (
            <div className="mega-animate absolute left-0 top-[52px] flex shadow-2xl border border-gray-200 bg-white rounded-b-md overflow-hidden z-50">
              <div className="w-[280px] max-h-[480px] overflow-y-auto thin-scroll py-1">
                {categories.map((c) => {
                  const Icon = iconMap[c.icon || ""] || LayoutGrid;
                  const hasSub = !!subMap[c.slug];
                  return (
                    <Link
                      key={c.id}
                      href={`/categorie/${c.slug}`}
                      onMouseEnter={() => setActiveCat(c.slug)}
                      onClick={() => setMegaOpen(false)}
                      className={`rayon-item flex items-center gap-3 px-4 py-[10px] border-b border-gray-100 last:border-0 ${activeCat === c.slug ? "bg-gray-100" : ""}`}
                    >
                      <Icon size={19} className={activeCat === c.slug ? "text-[#e30613]" : "text-gray-500"} />
                      <span className="rayon-name flex-1 text-[13.5px] text-gray-800">{c.name}</span>
                      {hasSub && <ChevronRight size={15} className="text-gray-400" />}
                    </Link>
                  );
                })}
              </div>
              {/* Sub panel */}
              {activeCat && subMap[activeCat] && (
                <div className="fade-animate w-[260px] bg-gray-50 border-l border-gray-200 p-4 hidden md:block">
                  <div className="text-[13px] font-bold text-[#e30613] uppercase mb-3 tracking-wide">
                    {categories.find((c) => c.slug === activeCat)?.name}
                  </div>
                  <ul className="space-y-1">
                    {subMap[activeCat].map((s) => (
                      <li key={s}>
                        <Link
                          href={`/categorie/${activeCat}`}
                          onClick={() => setMegaOpen(false)}
                          className="flex items-center gap-2 text-[13px] text-gray-700 hover:text-[#e30613] hover:pl-1 transition-all py-[5px]"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#e30613]/60" />
                          {s}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/categorie/${activeCat}`}
                    onClick={() => setMegaOpen(false)}
                    className="mt-4 inline-block text-[12px] font-bold text-white bg-[#2f3d4c] hover:bg-[#e30613] transition px-4 py-2 rounded"
                  >
                    Tout voir →
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Links */}
        <nav className="hidden lg:flex items-stretch flex-1">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className={`nav-link flex items-center px-4 text-[14px] font-medium border-r border-gray-100 first:border-l whitespace-nowrap ${l.hot ? "text-[#e30613] font-semibold bg-red-50/60" : "text-gray-800"}`}
            >
              {l.label}
              {l.hot && <span className="ml-1 w-1.5 h-1.5 rounded-full bg-[#e30613] animate-ping-slow" />}
            </Link>
          ))}
          <Link
            href="/aide"
            className="flex items-center px-6 text-[14px] font-bold text-white bg-[#e30613] hover:bg-[#b3050f] transition ml-auto"
          >
            Aide ?
          </Link>
        </nav>

        {/* Mobile */}
        <button className="lg:hidden ml-auto flex items-center gap-2 px-3 text-[14px] font-semibold" onClick={() => setMobileOpen((v) => !v)}>
          Menu <ChevronDown size={16} className={mobileOpen ? "rotate-180 transition" : "transition"} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="drop-down lg:hidden border-t bg-white max-h-[70vh] overflow-y-auto">
          {categories.map((c) => (
            <Link key={c.id} href={`/categorie/${c.slug}`} onClick={() => setMobileOpen(false)} className="flex items-center justify-between px-5 py-3 border-b text-[14px]">
              {c.name} <ChevronRight size={15} className="text-gray-400" />
            </Link>
          ))}
          <div className="p-4 grid grid-cols-2 gap-2">
            {links.map((l) => (
              <Link key={l.label} href={l.href} onClick={() => setMobileOpen(false)} className="text-center bg-gray-100 rounded py-2 text-[13px] font-medium">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes pingSlow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .animate-ping-slow {
          animation: pingSlow 1.4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

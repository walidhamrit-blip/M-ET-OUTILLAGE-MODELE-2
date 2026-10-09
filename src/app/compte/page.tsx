"use client";
import { useState } from "react";
import { User, Package, Heart, MapPin } from "lucide-react";
import Link from "next/link";

export default function AccountPage() {
  const [tab, setTab] = useState<"login" | "register">("login");
  return (
    <div className="mx-auto max-w-[560px] px-4 mt-6">
      <div className="bg-white border rounded overflow-hidden">
        <div className="bg-[#2f3d4c] px-6 py-5 text-center">
          <span className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto"><User size={28} className="text-[#ffea00]" /></span>
          <h1 className="text-white font-black text-[20px] uppercase mt-2">Mon compte Matek</h1>
          <p className="text-white/70 text-[13px]">Commandes, favoris, devis pros</p>
        </div>
        <div className="flex border-b">
          {(["login", "register"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`flex-1 py-3.5 text-[14px] font-bold uppercase border-b-[3px] -mb-[1px] transition ${tab === t ? "border-[#e30613] text-[#e30613]" : "border-transparent text-gray-400"}`}>
              {t === "login" ? "Se connecter" : "Créer un compte"}
            </button>
          ))}
        </div>
        <form className="p-6 space-y-3" onSubmit={(e) => e.preventDefault()}>
          {tab === "register" && <input placeholder="Nom complet *" className="w-full h-[46px] border rounded px-3 text-[14px] outline-none focus:border-[#e30613]" />}
          <input placeholder="Téléphone *" className="w-full h-[46px] border rounded px-3 text-[14px] outline-none focus:border-[#e30613]" />
          {tab === "register" && <input placeholder="Email" className="w-full h-[46px] border rounded px-3 text-[14px] outline-none focus:border-[#e30613]" />}
          <input type="password" placeholder="Mot de passe *" className="w-full h-[46px] border rounded px-3 text-[14px] outline-none focus:border-[#e30613]" />
          <button className="w-full h-[50px] bg-[#e30613] hover:bg-[#b3050f] text-white font-black text-[15px] rounded transition">
            {tab === "login" ? "SE CONNECTER" : "CRÉER MON COMPTE"}
          </button>
          <p className="text-[12px] text-gray-400 text-center">En continuant, vous acceptez nos conditions générales de vente.</p>
        </form>
        <div className="grid grid-cols-3 border-t divide-x text-center">
          {[
            { icon: Package, l: "Commandes", href: "/commande" },
            { icon: Heart, l: "Favoris", href: "/favoris" },
            { icon: MapPin, l: "Magasins", href: "/magasins" },
          ].map((s) => (
            <Link key={s.l} href={s.href} className="py-4 hover:bg-gray-50 transition">
              <s.icon size={20} className="mx-auto text-[#e30613]" />
              <div className="text-[12px] font-bold mt-1">{s.l}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

import { MapPin, Phone, Clock, Car, CreditCard, Package } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

const stores = [
  {
    name: "MATEK Janzour — Flagship",
    addr: "Route côtière, km 12, Janzour, Tripoli",
    phone: "+218 21 444 44 01",
    hours: "Lun – Sam : 8h30 – 19h30 • Dim : 9h – 13h",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=700&q=70&auto=format&fit=crop",
    tag: "Le plus grand — 2 500 m²",
  },
  {
    name: "MATEK Ain Zara",
    addr: "Route de l'Aéroport, km 7, Tripoli",
    phone: "+218 21 444 44 02",
    hours: "Lun – Sam : 8h30 – 19h30 • Dim : 9h – 13h",
    img: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=700&q=70&auto=format&fit=crop",
    tag: "Nouveau magasin",
  },
  {
    name: "MATEK Tajoura",
    addr: "Zone industrielle, Tajoura, Tripoli",
    phone: "+218 21 444 44 03",
    hours: "Lun – Sam : 8h30 – 19h00",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=700&q=70&auto=format&fit=crop",
    tag: "Dépôt pro & gros",
  },
  {
    name: "MATEK Gargaresh",
    addr: "Rue principale, Gargaresh, Tripoli",
    phone: "+218 21 444 44 04",
    hours: "Lun – Sam : 9h00 – 19h30",
    img: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=700&q=70&auto=format&fit=crop",
    tag: "Centre-ville",
  },
];

export default function StoresPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 mt-4">
      {/* Hero */}
      <div className="relative overflow-hidden rounded h-[170px] sm:h-[220px]">
        <img src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1400&q=70&auto=format&fit=crop" alt="Magasins" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-6">
          <span className="bg-[#ffea00] text-black text-[11px] font-black px-2 py-1 rounded-sm w-fit uppercase tracking-widest">Tripoli — Libye</span>
          <h1 className="text-white font-black text-[26px] sm:text-[36px] uppercase mt-1">Nos 4 magasins</h1>
          <p className="text-white/85 text-[14px]">Retrait 1h • Parking • Conseillers chantier • Devis pros</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        {stores.map((s) => (
          <div key={s.name} className="bg-white border rounded overflow-hidden hover:shadow-xl transition group">
            <div className="relative h-[190px] overflow-hidden">
              <img src={s.img} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <span className="absolute top-3 left-3 bg-[#e30613] text-white text-[12px] font-bold px-2.5 py-1 rounded-sm">{s.tag}</span>
            </div>
            <div className="p-4">
              <h2 className="font-black text-[16px]">{s.name}</h2>
              <div className="mt-2 space-y-1.5 text-[13px] text-gray-600">
                <div className="flex gap-2"><MapPin size={15} className="text-[#e30613] shrink-0 mt-0.5" />{s.addr}</div>
                <div className="flex gap-2 items-center"><Phone size={15} className="text-[#e30613] shrink-0" /><b>{s.phone}</b></div>
                <div className="flex gap-2"><Clock size={15} className="text-[#e30613] shrink-0 mt-0.5" />{s.hours}</div>
              </div>
              <div className="flex gap-4 mt-3 text-[11.5px] text-gray-500">
                <span className="flex items-center gap-1"><Car size={14} /> Parking</span>
                <span className="flex items-center gap-1"><Package size={14} /> Retrait 1h</span>
                <span className="flex items-center gap-1"><CreditCard size={14} /> Espèces / Virement</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#2f3d4c] rounded p-6 mt-4 text-center">
        <h2 className="text-white font-black text-[19px]">Un chantier à livrer ? Appelez la centrale</h2>
        <p className="text-white/70 text-[13px]">Devis pros en 2h — livraison chantier à Tripoli & environs</p>
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          <a href="tel:+218214444444" className="bg-[#ffea00] text-black font-black text-[15px] px-8 py-3 rounded hover:bg-white transition">+218 21 444 44 44</a>
          <Link href="/entreprise" className="border-2 border-white text-white font-bold text-[14px] px-8 py-3 rounded hover:bg-white hover:text-black transition">Devis entreprise</Link>
        </div>
      </div>
    </div>
  );
}

import { Truck, ShieldCheck, RotateCcw, Headset } from "lucide-react";

export default function ServicesBar() {
  const items = [
    { icon: Truck, title: "Livraison rapide", desc: "Tripoli 24h — Libye 48/72h" },
    { icon: ShieldCheck, title: "Garantie officielle", desc: "Jusqu'à 2 ans pièces" },
    { icon: RotateCcw, title: "Retour 7 jours", desc: "Échange en magasin" },
    { icon: Headset, title: "Support 6j/7", desc: "+218 21 444 44 44" },
  ];
  return (
    <div className="mx-auto max-w-[1280px] px-4 mt-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {items.map((it, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-[4px] p-4 flex items-center gap-3 hover:border-[#e30613] hover:shadow-lg transition group">
            <span className="w-11 h-11 rounded-full bg-[#f4f4f4] group-hover:bg-[#e30613] flex items-center justify-center shrink-0 transition">
              <it.icon size={22} className="text-[#e30613] group-hover:text-white transition" />
            </span>
            <div>
              <div className="font-bold text-[14px]">{it.title}</div>
              <div className="text-[12px] text-gray-500">{it.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

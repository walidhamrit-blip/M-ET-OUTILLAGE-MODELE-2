import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export const dynamic = "force-dynamic";

export default function ContactPage() {
  const stores = [
    { name: "MATEK Janzour", addr: "Route côtière, km 12, Janzour", phone: "+218 21 444 44 01", hours: "8h30 – 19h30" },
    { name: "MATEK Ain Zara", addr: "Route de l'Aéroport, km 7, Tripoli", phone: "+218 21 444 44 02", hours: "8h30 – 19h30" },
    { name: "MATEK Tajoura", addr: "Zone industrielle, Tajoura", phone: "+218 21 444 44 03", hours: "8h30 – 19h00" },
    { name: "MATEK Gargaresh", addr: "Rue principale, Gargaresh", phone: "+218 21 444 44 04", hours: "9h00 – 19h30" },
  ];
  return (
    <div className="mx-auto max-w-[1280px] px-4 mt-4">
      <div className="bg-white border rounded overflow-hidden">
        <div className="section-bar px-5 py-3.5 border-b">
          <h1 className="text-[19px] font-black uppercase">Nous contacter</h1>
          <p className="text-[13px] text-gray-500">Une question, un devis, un produit ? Notre équipe vous répond en moins de 2h ouvrées.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-0">
          <div className="p-5 border-b md:border-b-0 md:border-r">
            <h2 className="font-black text-[15px] uppercase mb-4">Envoyez-nous un message</h2>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-3">
                <input placeholder="Nom complet *" className="h-[44px] border rounded px-3 text-[14px] outline-none focus:border-[#e30613]" />
                <input placeholder="Téléphone *" className="h-[44px] border rounded px-3 text-[14px] outline-none focus:border-[#e30613]" />
              </div>
              <input placeholder="Email" className="w-full h-[44px] border rounded px-3 text-[14px] outline-none focus:border-[#e30613]" />
              <select className="w-full h-[44px] border rounded px-3 text-[14px] outline-none focus:border-[#e30613] bg-white">
                <option>Question produit</option>
                <option>Demande de devis entreprise</option>
                <option>Suivi de commande</option>
                <option>SAV / Garantie</option>
                <option>Autre</option>
              </select>
              <textarea rows={5} placeholder="Votre message..." className="w-full border rounded px-3 py-2.5 text-[14px] outline-none focus:border-[#e30613]" />
              <button className="bg-[#e30613] hover:bg-[#b3050f] text-white font-bold text-[14px] px-8 py-3 rounded transition flex items-center gap-2">
                <Send size={16} /> Envoyer le message
              </button>
            </form>
          </div>
          <div className="p-5 bg-gray-50/60">
            <h2 className="font-black text-[15px] uppercase mb-4">Nos coordonnées</h2>
            <div className="space-y-3 text-[14px]">
              <div className="flex gap-3 items-start bg-white border rounded p-3">
                <Phone size={19} className="text-[#e30613] mt-0.5" />
                <div><b>Centrale d&apos;appel</b><div className="text-[#e30613] font-black text-[18px]">+218 21 444 44 44</div><div className="text-[12px] text-gray-500">Lun – Sam : 8h30 – 19h30</div></div>
              </div>
              <div className="flex gap-3 items-start bg-white border rounded p-3">
                <Mail size={19} className="text-[#e30613] mt-0.5" />
                <div><b>Email</b><div>contact@matek.ly — devis@matek.ly</div></div>
              </div>
              <div className="flex gap-3 items-start bg-white border rounded p-3">
                <Clock size={19} className="text-[#e30613] mt-0.5" />
                <div><b>Horaires magasins</b><div className="text-[13px] text-gray-600">Lun – Sam : 8h30 – 19h30 • Dim : 9h – 13h</div></div>
              </div>
            </div>
            <h3 className="font-black text-[14px] uppercase mt-5 mb-2">Nos 4 magasins à Tripoli</h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {stores.map((s) => (
                <div key={s.name} className="bg-white border rounded p-3 text-[12.5px] hover:border-[#e30613] transition">
                  <div className="font-bold flex items-center gap-1.5"><MapPin size={14} className="text-[#e30613]" />{s.name}</div>
                  <div className="text-gray-500 mt-1">{s.addr}</div>
                  <div className="font-semibold mt-0.5">{s.phone}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

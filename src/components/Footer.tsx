"use client";
import { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Send, CreditCard, Truck, ShieldCheck, ChevronUp, Share2, AtSign, Play } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setMsg("Veuillez saisir un email valide.");
      return;
    }
    try {
      const r = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      if (r.ok) {
        setMsg("Merci ! Vous êtes inscrit à nos offres.");
        setEmail("");
      } else {
        setMsg("Vous êtes déjà inscrit.");
      }
    } catch {
      setMsg("Erreur, réessayez.");
    }
  };

  return (
    <footer className="mt-10">
      {/* Newsletter like Mytek */}
      <div className="bg-[#e30613]">
        <div className="mx-auto max-w-[1280px] px-4 py-5 flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="flex items-center gap-3 text-white">
            <span className="w-11 h-11 rounded-full bg-white/15 flex items-center justify-center">
              <Send size={20} />
            </span>
            <div>
              <div className="font-black text-[17px] uppercase">Inscrivez-vous à la newsletter</div>
              <div className="text-white/85 text-[13px]">Recevez nos promos chantier & nouveautés à Tripoli</div>
            </div>
          </div>
          <form onSubmit={subscribe} className="flex w-full md:w-[440px]">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse email..."
              className="flex-1 h-[44px] px-4 rounded-l-[4px] text-[14px] outline-none text-gray-800"
            />
            <button className="bg-[#222] hover:bg-black text-white font-bold text-[14px] px-6 rounded-r-[4px] transition">
              OK
            </button>
          </form>
        </div>
        {msg && <div className="text-center pb-3 text-white text-[13px] font-semibold">{msg}</div>}
      </div>

      {/* Main footer */}
      <div className="bg-[#2f3d4c] text-gray-300">
        <div className="mx-auto max-w-[1280px] px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="border-[3px] border-white rounded-[6px] px-3 py-[3px] inline-block">
              <span className="text-white font-black italic text-[28px] tracking-tighter">
                MA<span className="text-[#ffea00]">TEK</span>
              </span>
            </div>
            <p className="text-[13px] mt-3 leading-relaxed text-gray-400">
              N°1 des matériaux de construction & outillage à Tripoli, Libye. 4 magasins, +12 000 références, prix chantier toute l&apos;année.
            </p>
            <div className="flex gap-2 mt-4">
              {[Share2, AtSign, Play].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#e30613] flex items-center justify-center transition">
                  <Icon size={17} />
                </a>
              ))}
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#e30613] flex items-center justify-center transition text-[13px] font-black">in</a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-[14px] uppercase mb-4 border-b border-white/10 pb-2">Informations</h4>
            <ul className="space-y-2 text-[13px]">
              <li><Link href="/entreprise" className="hover:text-[#ffea00] transition">Service Entreprise / Devis</Link></li>
              <li><Link href="/magasins" className="hover:text-[#ffea00] transition">Nos magasins à Tripoli</Link></li>
              <li><Link href="/recrutement" className="hover:text-[#ffea00] transition">Matek Recrute</Link></li>
              <li><Link href="/aide" className="hover:text-[#ffea00] transition">Aide & FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-[#ffea00] transition">Nous contacter</Link></li>
              <li><Link href="/commande" className="hover:text-[#ffea00] transition">Suivi de commande</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-[14px] uppercase mb-4 border-b border-white/10 pb-2">Nos rayons</h4>
            <ul className="space-y-2 text-[13px]">
              <li><Link href="/categorie/outillage-electrique" className="hover:text-[#ffea00] transition">Outillage Électrique</Link></li>
              <li><Link href="/categorie/materiaux-construction" className="hover:text-[#ffea00] transition">Matériaux de Construction</Link></li>
              <li><Link href="/categorie/peinture-droguerie" className="hover:text-[#ffea00] transition">Peinture & Droguerie</Link></li>
              <li><Link href="/categorie/plomberie-sanitaire" className="hover:text-[#ffea00] transition">Plomberie & Sanitaire</Link></li>
              <li><Link href="/categorie/electricite-eclairage" className="hover:text-[#ffea00] transition">Électricité & Éclairage</Link></li>
              <li><Link href="/categorie/climatisation" className="hover:text-[#ffea00] transition">Climatisation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-[14px] uppercase mb-4 border-b border-white/10 pb-2">Contact Tripoli</h4>
            <ul className="space-y-3 text-[13px]">
              <li className="flex gap-2"><MapPin size={16} className="text-[#ffea00] shrink-0 mt-0.5" /> Route de l&apos;Aéroport, Km 7<br />Tripoli, Libye</li>
              <li className="flex gap-2 items-center"><Phone size={16} className="text-[#ffea00] shrink-0" /> +218 21 444 44 44</li>
              <li className="flex gap-2 items-center"><Mail size={16} className="text-[#ffea00] shrink-0" /> contact@matek.ly</li>
              <li className="flex gap-2"><Clock size={16} className="text-[#ffea00] shrink-0 mt-0.5" /> Lun – Sam : 8h30 – 19h30<br />Dim : 9h – 13h</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto max-w-[1280px] px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-gray-400">
            <span>© 2026 MATEK Libya — Matériaux & Outillage, Tripoli. Tous droits réservés.</span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5"><CreditCard size={15} /> Paiement à la livraison</span>
              <span className="flex items-center gap-1.5"><Truck size={15} /> Livraison 24/72h</span>
              <span className="flex items-center gap-1.5"><ShieldCheck size={15} /> Garantie officielle</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="bounce-soft fixed bottom-5 right-5 z-[70] w-11 h-11 rounded-full bg-[#e30613] hover:bg-[#b3050f] text-white flex items-center justify-center shadow-xl transition"
        aria-label="Haut de page"
      >
        <ChevronUp size={22} />
      </button>
    </footer>
  );
}

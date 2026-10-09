"use client";
import { useState } from "react";
import { ChevronDown, Truck, RotateCcw, ShieldCheck, CreditCard, Phone, Package } from "lucide-react";
import Link from "next/link";

const faqs = [
  { q: "Quels sont les délais de livraison ?", a: "Tripoli : 24h ouvrées (25 د.ل, offerte dès 500 د.ل). Reste de la Libye (Misrata, Zawiya, Benghazi...) : 48 à 72h. Les produits lourds (ciment, fer) sont livrés par camion avec prise de RDV téléphonique." },
  { q: "Quels moyens de paiement acceptez-vous ?", a: "Paiement à la livraison en espèces, virement bancaire, et paiement en magasin. Pour les entreprises : compte pro avec facturation mensuelle sur devis." },
  { q: "Puis-je retourner ou échanger un produit ?", a: "Oui, sous 7 jours en magasin avec le ticket de caisse et l'emballage d'origine. Les produits électriques doivent être non utilisés. Le SAV garantie (12–24 mois) est géré dans nos 4 magasins de Tripoli." },
  { q: "Faites-vous des devis pour les entreprises et chantiers ?", a: "Oui ! Envoyez votre liste de besoins à devis@matek.ly ou appelez le +218 21 444 44 44. Réponse avec prix pros en moins de 2h ouvrées, livraison directe sur chantier possible." },
  { q: "Comment retirer ma commande en magasin ?", a: "Choisissez 'Retrait 1h' au moment de la commande ou appelez le magasin. Vous recevez un SMS de confirmation, puis présentez-vous avec le numéro de commande. Retrait gratuit dans nos 4 magasins de Tripoli." },
  { q: "Les prix affichés sont-ils TTC ?", a: "Oui, tous nos prix sont affichés en dinars libyens (د.ل) toutes taxes comprises. Les factures sont fournies pour chaque achat, y compris pour les professionnels." },
];

export default function HelpPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-[900px] px-4 mt-4">
      <div className="bg-white border rounded overflow-hidden">
        <div className="bg-[#e30613] px-6 py-6 text-center">
          <h1 className="text-white font-black text-[24px] uppercase">Centre d&apos;aide</h1>
          <p className="text-white/85 text-[14px]">Tout ce qu&apos;il faut savoir pour commander sereinement</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 border-b">
          {[
            { icon: Truck, l: "Livraison 24/72h" },
            { icon: RotateCcw, l: "Retour 7 jours" },
            { icon: ShieldCheck, l: "Garantie 12–24 mois" },
            { icon: CreditCard, l: "Paiement livraison" },
          ].map((s, i) => (
            <div key={i} className="bg-gray-50 border rounded p-3 text-center">
              <s.icon size={22} className="mx-auto text-[#e30613]" />
              <div className="text-[12px] font-bold mt-1.5">{s.l}</div>
            </div>
          ))}
        </div>
        <div className="p-4 sm:p-6">
          <h2 className="font-black text-[16px] uppercase mb-3">Questions fréquentes</h2>
          <div className="space-y-2">
            {faqs.map((f, i) => (
              <div key={i} className={`border rounded overflow-hidden transition ${open === i ? "border-[#e30613]" : ""}`}>
                <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left font-bold text-[14px] hover:bg-gray-50 transition">
                  {f.q}
                  <ChevronDown size={18} className={`shrink-0 text-[#e30613] transition ${open === i ? "rotate-180" : ""}`} />
                </button>
                {open === i && <div className="fade-animate px-4 pb-4 text-[13.5px] text-gray-600 leading-relaxed">{f.a}</div>}
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-3 mt-5">
            <a href="tel:+218214444444" className="bg-[#2f3d4c] rounded p-4 flex items-center gap-3 hover:bg-[#243140] transition">
              <Phone size={26} className="text-[#ffea00]" />
              <span><span className="block text-white font-bold text-[14px]">Toujours bloqué ? Appelez-nous</span><span className="block text-[#ffea00] font-black">+218 21 444 44 44</span></span>
            </a>
            <Link href="/commande" className="bg-gray-100 border rounded p-4 flex items-center gap-3 hover:border-[#e30613] transition">
              <Package size={26} className="text-[#e30613]" />
              <span><span className="block font-bold text-[14px]">Suivre ma commande</span><span className="block text-[12px] text-gray-500">Saisissez votre N° MTK-...</span></span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

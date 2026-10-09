import { Building2, FileText, Truck, BadgePercent, Phone, HardHat } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function EntreprisePage() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 mt-4">
      <div className="relative overflow-hidden rounded h-[200px] sm:h-[260px]">
        <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1400&q=70&auto=format&fit=crop" alt="Entreprise" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2f3d4c]/95 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10">
          <span className="bg-[#ffea00] text-black text-[11px] font-black px-2.5 py-1 rounded-sm w-fit uppercase tracking-widest">Matek Pro — BTP & Artisans</span>
          <h1 className="text-white font-black text-[26px] sm:text-[38px] uppercase mt-1">Service Entreprise</h1>
          <p className="text-white/85 text-[14px] sm:text-[16px]">Prix chantier, compte pro, livraison sur site à Tripoli</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
        {[
          { icon: BadgePercent, t: "Prix dégressifs", d: "Remises par volume jusqu'à -25% sur ciment, fer, peinture, outillage." },
          { icon: FileText, t: "Devis en 2h", d: "Envoyez votre métré, recevez un devis détaillé sous 2h ouvrées." },
          { icon: Truck, t: "Livraison chantier", d: "Camions grues, déchargement sur site à Tripoli & environs." },
          { icon: Building2, t: "Compte pro", d: "Facturation mensuelle, historique, interlocuteur dédié." },
        ].map((s, i) => (
          <div key={i} className="bg-white border rounded p-4 hover:border-[#e30613] hover:shadow-lg transition">
            <span className="w-11 h-11 rounded-full bg-red-50 flex items-center justify-center"><s.icon size={22} className="text-[#e30613]" /></span>
            <div className="font-black text-[14px] mt-2.5">{s.t}</div>
            <div className="text-[13px] text-gray-500 mt-1">{s.d}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border rounded mt-4 overflow-hidden grid md:grid-cols-2">
        <div className="p-6">
          <h2 className="font-black text-[17px] uppercase">Demander un devis pro</h2>
          <p className="text-[13px] text-gray-500">Réponse garantie sous 2h ouvrées.</p>
          <form className="mt-4 space-y-3" onSubmit={(e) => e.preventDefault()}>
            <div className="grid sm:grid-cols-2 gap-3">
              <input placeholder="Société *" className="h-[44px] border rounded px-3 text-[14px] outline-none focus:border-[#e30613]" />
              <input placeholder="Nom du contact *" className="h-[44px] border rounded px-3 text-[14px] outline-none focus:border-[#e30613]" />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <input placeholder="Téléphone *" className="h-[44px] border rounded px-3 text-[14px] outline-none focus:border-[#e30613]" />
              <input placeholder="Email pro" className="h-[44px] border rounded px-3 text-[14px] outline-none focus:border-[#e30613]" />
            </div>
            <textarea rows={4} placeholder="Décrivez vos besoins : quantités, références, délai, lieu de livraison..." className="w-full border rounded px-3 py-2.5 text-[14px] outline-none focus:border-[#e30613]" />
            <button className="bg-[#e30613] hover:bg-[#b3050f] text-white font-black text-[14px] px-8 py-3.5 rounded transition w-full sm:w-auto">
              ENVOYER MA DEMANDE DE DEVIS
            </button>
          </form>
        </div>
        <div className="bg-[#2f3d4c] p-6 text-white flex flex-col justify-center">
          <HardHat size={40} className="text-[#ffea00]" />
          <h3 className="font-black text-[20px] mt-3">+850 entreprises nous font confiance</h3>
          <p className="text-white/75 text-[14px] mt-1">Promoteurs, entrepreneurs, plombiers, électriciens, peintres — rejoignez le programme Matek Pro.</p>
          <ul className="mt-4 space-y-2 text-[13px]">
            {["Conseiller pro dédié 6j/7", "Catalogue gros-œuvre & second-œuvre complet", "Retrait dépôt Tajoura en 1h", "Garantie chantiers & SAV prioritaire"].map((l) => (
              <li key={l} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#ffea00]" />{l}</li>
            ))}
          </ul>
          <a href="tel:+218214444444" className="mt-5 flex items-center gap-2 bg-white/10 hover:bg-white/15 rounded p-3 transition">
            <Phone size={22} className="text-[#ffea00]" />
            <span><span className="block text-[12px] text-white/70">Ligne directe pros</span><span className="block font-black text-[17px]">+218 21 444 44 44</span></span>
          </a>
          <Link href="/magasins" className="mt-3 text-[13px] font-bold text-[#ffea00] hover:underline">→ Voir le dépôt pro de Tajoura</Link>
        </div>
      </div>
    </div>
  );
}

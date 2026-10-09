import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

const jobs = [
  { title: "Vendeur rayon Outillage", loc: "Janzour", type: "CDI", desc: "Conseil clients pros & particuliers, mise en rayon, gestion des stocks outillage." },
  { title: "Chauffeur-livreur (camion)", loc: "Tajoura", type: "CDI", desc: "Livraisons matériaux sur chantiers à Tripoli, permis C exigé, prime chantiers." },
  { title: "Caissier / Caissière", loc: "Ain Zara", type: "CDI", desc: "Accueil, encaissements, gestion des avoirs. Expérience commerce exigée." },
  { title: "Commercial terrain BTP", loc: "Tripoli", type: "CDI + primes", desc: "Prospection entreprises & chantiers, devis, suivi comptes pros." },
  { title: "Magasinier dépôt", loc: "Tajoura", type: "CDI", desc: "Réception, préparation commandes, conduite chariot (CACES un plus)." },
  { title: "Technicien SAV", loc: "Gargaresh", type: "CDI", desc: "Diagnostic & réparation outillage électroportatif, gestion garanties." },
];

export default function RecrutementPage() {
  return (
    <div className="mx-auto max-w-[1000px] px-4 mt-4">
      <div className="bg-gradient-to-r from-[#2f3d4c] to-[#e30613] rounded p-6 sm:p-8 text-white">
        <span className="bg-[#ffea00] text-black text-[11px] font-black px-2.5 py-1 rounded-sm uppercase tracking-widest">Matek Recrute</span>
        <h1 className="font-black text-[26px] sm:text-[34px] uppercase mt-2">Rejoignez le N°1 à Tripoli</h1>
        <p className="text-white/85 text-[14px] mt-1">+120 collaborateurs • Formation • Évolution • Primes de performance</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-3 mt-4">
        {jobs.map((j) => (
          <div key={j.title} className="bg-white border rounded p-4 hover:border-[#e30613] hover:shadow-lg transition group">
            <div className="flex items-start justify-between gap-2">
              <span className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0"><Briefcase size={19} className="text-[#e30613]" /></span>
              <span className="bg-[#2f3d4c] text-white text-[11px] font-bold px-2 py-1 rounded">{j.type}</span>
            </div>
            <h2 className="font-black text-[15px] mt-2 group-hover:text-[#e30613] transition">{j.title}</h2>
            <p className="text-[13px] text-gray-500 mt-1">{j.desc}</p>
            <div className="flex items-center gap-3 mt-2.5 text-[12px] text-gray-500">
              <span className="flex items-center gap-1"><MapPin size={13} />{j.loc}</span>
              <span className="flex items-center gap-1"><Clock size={13} />Plein temps</span>
            </div>
            <a href="mailto:rh@matek.ly" className="mt-3 inline-flex items-center gap-1 text-[13px] font-bold text-[#e30613] group-hover:gap-3 transition-all">
              Postuler <ArrowRight size={15} />
            </a>
          </div>
        ))}
      </div>
      <div className="bg-white border rounded p-5 mt-4 text-center">
        <h2 className="font-black text-[16px]">Candidature spontanée</h2>
        <p className="text-[13px] text-gray-500">Envoyez votre CV à <b className="text-[#e30613]">rh@matek.ly</b> ou déposez-le dans nos magasins.</p>
      </div>
    </div>
  );
}

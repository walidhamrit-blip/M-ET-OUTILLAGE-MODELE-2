"use client";
import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Truck, CheckCircle2, MapPin, Phone, ChevronRight, Banknote, Building2 } from "lucide-react";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/format";

const cities = ["Tripoli", "Janzour", "Tajoura", "Zawiya", "Misrata", "Zliten", "Benghazi", "Autre"];

export default function CheckoutPage() {
  const { items, subtotal, clear, updateQty, removeItem } = useCart();
  const [form, setForm] = useState({
    customerName: "", customerPhone: "", customerEmail: "", city: "Tripoli", address: "", notes: "", paymentMethod: "cod",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ orderNumber: string; total: number } | null>(null);
  const [trackNum, setTrackNum] = useState("");
  const [tracked, setTracked] = useState<any>(null);

  const delivery = subtotal >= 500 || subtotal === 0 ? 0 : 25;
  const total = subtotal + delivery;

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.customerName.trim() || !form.customerPhone.trim()) {
      setError("Veuillez saisir votre nom et votre téléphone.");
      return;
    }
    if (!items.length) {
      setError("Votre panier est vide.");
      return;
    }
    setLoading(true);
    try {
      const r = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, items: items.map((i) => ({ id: i.id, qty: i.qty })) }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "Erreur");
      setSuccess({ orderNumber: j.orderNumber, total: j.total });
      clear();
    } catch (err: any) {
      setError(err.message || "Erreur lors de la commande.");
    }
    setLoading(false);
  };

  const track = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackNum.trim()) return;
    try {
      const r = await fetch(`/api/orders?number=${encodeURIComponent(trackNum.trim())}`);
      const j = await r.json();
      setTracked(r.ok ? j : { error: "Commande introuvable" });
    } catch {
      setTracked({ error: "Erreur" });
    }
  };

  if (success) {
    return (
      <div className="mx-auto max-w-[640px] px-4 mt-8">
        <div className="bg-white border rounded p-8 text-center">
          <span className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
            <CheckCircle2 size={44} className="text-green-600" />
          </span>
          <h1 className="text-[24px] font-black mt-4">Commande confirmée !</h1>
          <p className="text-gray-500 text-[14px] mt-1">Merci {form.customerName || ""}, notre équipe vous appellera pour confirmer.</p>
          <div className="bg-gray-50 border rounded p-4 mt-5 space-y-1.5 text-[14px]">
            <div className="flex justify-between"><span className="text-gray-500">N° de commande</span><span className="font-black text-[#e30613]">{success.orderNumber}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Total à payer</span><span className="font-black">{formatPrice(success.total)}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Paiement</span><span className="font-bold">À la livraison</span></div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-5">
            <Link href="/" className="border-2 border-[#2f3d4c] text-[#2f3d4c] font-bold text-[14px] py-3 rounded hover:bg-[#2f3d4c] hover:text-white transition">Retour accueil</Link>
            <Link href="/recherche" className="bg-[#e30613] text-white font-bold text-[14px] py-3 rounded hover:bg-[#b3050f] transition">Continuer mes achats</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 mt-4">
      <div className="text-[12px] text-gray-500 flex items-center gap-1.5 mb-3">
        <Link href="/" className="hover:text-[#e30613]">Accueil</Link>
        <ChevronRight size={12} />
        <span className="font-semibold text-gray-800">Commander</span>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-4 items-start">
        {/* Form */}
        <form onSubmit={submit} className="bg-white border rounded overflow-hidden">
          <div className="section-bar px-5 py-3.5 border-b flex items-center gap-2">
            <Truck size={19} className="text-[#e30613]" />
            <h1 className="text-[17px] font-black uppercase">Informations de livraison</h1>
          </div>
          <div className="p-5 grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[13px] font-bold">Nom complet *</label>
              <input value={form.customerName} onChange={(e) => set("customerName", e.target.value)} placeholder="Ex : Ahmed El-Fitouri" className="mt-1 w-full h-[44px] border rounded px-3 text-[14px] outline-none focus:border-[#e30613] transition" />
            </div>
            <div>
              <label className="text-[13px] font-bold">Téléphone *</label>
              <input value={form.customerPhone} onChange={(e) => set("customerPhone", e.target.value)} placeholder="Ex : 091 000 0000" className="mt-1 w-full h-[44px] border rounded px-3 text-[14px] outline-none focus:border-[#e30613] transition" />
            </div>
            <div>
              <label className="text-[13px] font-bold">Email (optionnel)</label>
              <input value={form.customerEmail} onChange={(e) => set("customerEmail", e.target.value)} placeholder="email@exemple.com" className="mt-1 w-full h-[44px] border rounded px-3 text-[14px] outline-none focus:border-[#e30613] transition" />
            </div>
            <div>
              <label className="text-[13px] font-bold">Ville</label>
              <select value={form.city} onChange={(e) => set("city", e.target.value)} className="mt-1 w-full h-[44px] border rounded px-3 text-[14px] outline-none focus:border-[#e30613] bg-white">
                {cities.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="text-[13px] font-bold">Adresse complète</label>
              <input value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Rue, quartier, repère..." className="mt-1 w-full h-[44px] border rounded px-3 text-[14px] outline-none focus:border-[#e30613] transition" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-[13px] font-bold">Notes (optionnel)</label>
              <textarea value={form.notes} onChange={(e) => set("notes", e.target.value)} rows={2} placeholder="Horaire de livraison souhaité, étage, chantier..." className="mt-1 w-full border rounded px-3 py-2 text-[14px] outline-none focus:border-[#e30613] transition" />
            </div>
          </div>

          <div className="px-5 pb-2">
            <h2 className="text-[15px] font-black uppercase mb-3">Mode de paiement</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <button type="button" onClick={() => set("paymentMethod", "cod")} className={`border-2 rounded p-3.5 flex items-center gap-3 text-left transition ${form.paymentMethod === "cod" ? "border-[#e30613] bg-red-50/50" : "border-gray-200 hover:border-gray-300"}`}>
                <Banknote size={26} className="text-[#e30613] shrink-0" />
                <span><span className="block font-bold text-[14px]">Paiement à la livraison</span><span className="block text-[12px] text-gray-500">Espèces à la réception</span></span>
              </button>
              <button type="button" onClick={() => set("paymentMethod", "transfer")} className={`border-2 rounded p-3.5 flex items-center gap-3 text-left transition ${form.paymentMethod === "transfer" ? "border-[#e30613] bg-red-50/50" : "border-gray-200 hover:border-gray-300"}`}>
                <Building2 size={26} className="text-[#2f3d4c] shrink-0" />
                <span><span className="block font-bold text-[14px]">Virement bancaire</span><span className="block text-[12px] text-gray-500">Confirmation par téléphone</span></span>
              </button>
            </div>
          </div>

          {error && <div className="mx-5 mb-3 bg-red-50 border border-red-200 text-red-700 text-[13px] font-semibold rounded px-3 py-2.5">{error}</div>}

          <div className="p-5 pt-2">
            <button disabled={loading} className="w-full h-[52px] bg-[#e30613] hover:bg-[#b3050f] disabled:opacity-60 text-white font-black text-[16px] rounded transition shadow-lg">
              {loading ? "Envoi en cours..." : `CONFIRMER LA COMMANDE — ${formatPrice(total)}`}
            </button>
            <p className="text-[12px] text-gray-400 text-center mt-2">En commandant, vous acceptez nos conditions de vente. Confirmation par téléphone sous 2h ouvrées.</p>
          </div>
        </form>

        {/* Summary */}
        <div className="space-y-4">
          <div className="bg-white border rounded overflow-hidden">
            <div className="px-5 py-3.5 border-b flex items-center gap-2">
              <ShoppingCart size={18} className="text-[#e30613]" />
              <h2 className="text-[15px] font-black uppercase">Votre panier ({items.length})</h2>
            </div>
            <div className="p-3 space-y-2 max-h-[320px] overflow-y-auto thin-scroll">
              {items.length === 0 && <p className="text-center text-gray-400 text-[13px] py-6">Panier vide — <Link href="/recherche" className="text-[#e30613] font-bold">découvrir nos produits</Link></p>}
              {items.map((it) => (
                <div key={it.id} className="flex gap-2.5 border rounded p-2">
                  <img src={it.image} alt={it.name} className="w-[52px] h-[52px] object-cover rounded border" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[12.5px] font-medium line-clamp-1">{it.name}</div>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center border rounded text-[12px]">
                        <button type="button" onClick={() => updateQty(it.id, it.qty - 1)} className="w-6 h-6 hover:bg-gray-100">−</button>
                        <span className="w-7 text-center font-bold">{it.qty}</span>
                        <button type="button" onClick={() => updateQty(it.id, it.qty + 1)} className="w-6 h-6 hover:bg-gray-100">+</button>
                      </div>
                      <span className="text-[#e30613] font-black text-[13px]">{formatPrice(it.price * it.qty)}</span>
                    </div>
                  </div>
                  <button type="button" onClick={() => removeItem(it.id)} className="text-gray-300 hover:text-[#e30613] text-[16px]">×</button>
                </div>
              ))}
            </div>
            <div className="p-4 border-t bg-gray-50 space-y-1 text-[13px]">
              <div className="flex justify-between"><span>Sous-total</span><span className="font-bold">{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between"><span>Livraison</span><span className="font-bold">{delivery === 0 ? "GRATUITE" : formatPrice(delivery)}</span></div>
              <div className="flex justify-between text-[17px] font-black pt-2 border-t"><span>Total</span><span className="text-[#e30613]">{formatPrice(total)}</span></div>
            </div>
          </div>

          {/* Track */}
          <div className="bg-[#2f3d4c] rounded p-5 text-white">
            <h3 className="font-black text-[15px] uppercase flex items-center gap-2"><MapPin size={17} className="text-[#ffea00]" /> Suivre ma commande</h3>
            <form onSubmit={track} className="flex mt-3">
              <input value={trackNum} onChange={(e) => setTrackNum(e.target.value)} placeholder="Ex : MTK-12345678" className="flex-1 h-[42px] px-3 rounded-l text-[13px] text-gray-800 outline-none" />
              <button className="bg-[#e30613] hover:bg-[#b3050f] px-5 font-bold text-[13px] rounded-r transition">OK</button>
            </form>
            {tracked && (
              <div className="mt-3 text-[13px] bg-white/10 rounded p-3">
                {tracked.error ? (
                  <span className="text-[#ff9a9a]">{tracked.error}</span>
                ) : (
                  <div className="space-y-1">
                    <div className="flex justify-between"><span>N°</span><b>{tracked.order.orderNumber}</b></div>
                    <div className="flex justify-between"><span>Statut</span><b className="text-[#ffea00]">{tracked.order.status === "pending" ? "En préparation" : tracked.order.status}</b></div>
                    <div className="flex justify-between"><span>Total</span><b>{formatPrice(tracked.order.total)}</b></div>
                  </div>
                )}
              </div>
            )}
            <div className="mt-3 flex items-center gap-2 text-[12px] text-white/70">
              <Phone size={14} /> Besoin d&apos;aide ? +218 21 444 44 44
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

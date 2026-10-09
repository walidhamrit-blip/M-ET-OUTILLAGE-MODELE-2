"use client";
import Link from "next/link";
import { X, Trash2, Minus, Plus, ShoppingCart, Truck, CheckCircle2 } from "lucide-react";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/format";

export default function CartDrawer() {
  const { items, isOpen, setOpen, updateQty, removeItem, subtotal, count, toast } = useCart();
  const delivery = subtotal >= 500 ? 0 : subtotal > 0 ? 25 : 0;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[90]">
          <div className="overlay-in absolute inset-0 bg-black/55" onClick={() => setOpen(false)} />
          <aside className="drawer-in absolute right-0 top-0 bottom-0 w-full max-w-[420px] bg-white shadow-2xl flex flex-col">
            <div className="bg-[#2f3d4c] text-white px-4 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold">
                <ShoppingCart size={20} />
                Mon Panier ({count})
              </div>
              <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-full hover:bg-white/15 flex items-center justify-center transition" aria-label="Fermer">
                <X size={20} />
              </button>
            </div>

            {subtotal > 0 && subtotal < 500 && (
              <div className="px-4 py-2.5 bg-[#ffea00]/20 border-b border-[#ffea00] text-[12px] font-semibold flex items-center gap-2">
                <Truck size={16} className="text-[#e30613]" />
                Plus que {formatPrice(500 - subtotal)} pour la livraison GRATUITE à Tripoli !
              </div>
            )}
            {subtotal >= 500 && (
              <div className="px-4 py-2.5 bg-green-50 border-b border-green-200 text-[12px] font-bold text-green-700 flex items-center gap-2">
                <CheckCircle2 size={16} />
                Livraison GRATUITE à Tripoli débloquée !
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-3 space-y-2.5 thin-scroll">
              {items.length === 0 && (
                <div className="text-center py-16">
                  <ShoppingCart size={56} className="mx-auto text-gray-200" />
                  <p className="mt-4 font-bold text-gray-600">Votre panier est vide</p>
                  <p className="text-[13px] text-gray-400">Découvrez nos rayons matériaux & outillage</p>
                  <button onClick={() => setOpen(false)} className="mt-4 bg-[#e30613] text-white font-bold text-[14px] px-6 py-2.5 rounded hover:bg-[#b3050f] transition">
                    Continuer mes achats
                  </button>
                </div>
              )}
              {items.map((it) => (
                <div key={it.id} className="flex gap-3 border rounded p-2.5 hover:shadow transition">
                  <Link href={`/produit/${it.slug}`} onClick={() => setOpen(false)}>
                    <img src={it.image} alt={it.name} className="w-[70px] h-[70px] object-cover rounded border" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/produit/${it.slug}`} onClick={() => setOpen(false)} className="text-[13px] font-medium leading-snug line-clamp-2 hover:text-[#e30613]">
                      {it.name}
                    </Link>
                    <div className="text-[11px] text-gray-400">{it.reference}</div>
                    <div className="flex items-center justify-between mt-1.5">
                      <div className="flex items-center border rounded overflow-hidden">
                        <button onClick={() => updateQty(it.id, it.qty - 1)} className="w-7 h-7 flex items-center justify-center hover:bg-gray-100" aria-label="Moins"><Minus size={13} /></button>
                        <span className="w-8 text-center text-[13px] font-bold">{it.qty}</span>
                        <button onClick={() => updateQty(it.id, it.qty + 1)} className="w-7 h-7 flex items-center justify-center hover:bg-gray-100" aria-label="Plus"><Plus size={13} /></button>
                      </div>
                      <div className="text-[#e30613] font-black text-[14px]">{formatPrice(it.price * it.qty)}</div>
                    </div>
                  </div>
                  <button onClick={() => removeItem(it.id)} className="self-start text-gray-400 hover:text-[#e30613] transition" aria-label="Supprimer">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {items.length > 0 && (
              <div className="border-t p-4 space-y-2 bg-gray-50">
                <div className="flex justify-between text-[13px]"><span>Sous-total</span><span className="font-bold">{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between text-[13px]"><span>Livraison</span><span className="font-bold">{delivery === 0 ? "GRATUITE" : formatPrice(delivery)}</span></div>
                <div className="flex justify-between text-[16px] font-black pt-2 border-t"><span>Total</span><span className="text-[#e30613]">{formatPrice(subtotal + delivery)}</span></div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button onClick={() => setOpen(false)} className="border-2 border-[#2f3d4c] text-[#2f3d4c] font-bold text-[13px] py-2.5 rounded hover:bg-[#2f3d4c] hover:text-white transition">
                    Continuer
                  </button>
                  <Link href="/commande" onClick={() => setOpen(false)} className="bg-[#e30613] text-white text-center font-bold text-[13px] py-2.5 rounded hover:bg-[#b3050f] transition">
                    Commander
                  </Link>
                </div>
              </div>
            )}
          </aside>
        </div>
      )}

      {toast && (
        <div className="toast-up fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-[#2f3d4c] text-white pl-3 pr-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2.5 max-w-[92vw]">
          <span className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shrink-0">
            <CheckCircle2 size={18} />
          </span>
          <span className="text-[13px] font-medium truncate">{toast}</span>
        </div>
      )}
    </>
  );
}

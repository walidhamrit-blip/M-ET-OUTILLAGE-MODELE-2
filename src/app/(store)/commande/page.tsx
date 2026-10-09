"use client";
import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Truck, CheckCircle2, MapPin, Phone, ChevronRight, Banknote, Building2 } from "lucide-react";
import { useCart } from "@/store/cart";
import { useI18n } from "@/i18n/AppProvider";
import type { TextKey } from "@/i18n/texts";

/** Villes proposées : la valeur enregistrée est le nom canonique, l'étiquette est traduite. */
const CITIES: { value: string; key: TextKey }[] = [
  { value: "Tripoli", key: "city.tripoli" },
  { value: "Janzour", key: "city.janzour" },
  { value: "Tajoura", key: "city.tajoura" },
  { value: "Zawiya", key: "city.zawiya" },
  { value: "Misrata", key: "city.misrata" },
  { value: "Zliten", key: "city.zliten" },
  { value: "Benghazi", key: "city.benghazi" },
  { value: "Other", key: "city.other" },
];

const INPUT = "mt-1 w-full h-[44px] border dark:border-[#2c3644] rounded px-3 text-[14px] outline-none focus:border-[#e30613] transition bg-white dark:bg-[#202a36]";
const CHOICE_ON = "border-[#e30613] bg-red-50/50 dark:bg-red-900/20";
const CHOICE_OFF = "border-gray-200 dark:border-[#2c3644] hover:border-gray-300";

export default function CheckoutPage() {
  const { items, subtotal, clear, updateQty, removeItem } = useCart();
  const { t, money, settings } = useI18n();
  const { fee, freeThreshold } = settings.delivery;
  const [form, setForm] = useState({
    customerName: "", customerPhone: "", customerEmail: "", city: "Tripoli", address: "", notes: "", paymentMethod: "cod",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ orderNumber: string; total: number } | null>(null);
  const [trackNum, setTrackNum] = useState("");
  const [tracked, setTracked] = useState<{ error?: string; order?: { orderNumber: string; status: string; total: string } } | null>(null);

  const delivery = subtotal >= freeThreshold || subtotal === 0 ? 0 : fee;
  const total = subtotal + delivery;

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.customerName.trim() || !form.customerPhone.trim()) {
      setError(t("checkout.errorRequired"));
      return;
    }
    if (!items.length) {
      setError(t("checkout.errorEmpty"));
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
      if (!r.ok) throw new Error(j.error || t("checkout.errorGeneric"));
      setSuccess({ orderNumber: j.orderNumber, total: j.total });
      clear();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("checkout.errorGeneric"));
    }
    setLoading(false);
  };

  const track = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackNum.trim()) return;
    try {
      const r = await fetch(`/api/orders?number=${encodeURIComponent(trackNum.trim())}`);
      const j = await r.json();
      setTracked(r.ok ? j : { error: t("checkout.trackNotFound") });
    } catch {
      setTracked({ error: t("common.error") });
    }
  };

  if (success) {
    return (
      <div className="mx-auto max-w-[640px] px-4 mt-8">
        <div className="bg-white dark:bg-[#1a222c] border dark:border-[#2c3644] rounded p-8 text-center">
          <span className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center mx-auto">
            <CheckCircle2 size={44} className="text-green-600" />
          </span>
          <h1 className="text-[24px] font-black mt-4">{t("checkout.success")}</h1>
          <p className="text-gray-500 text-[14px] mt-1">{t("checkout.thanks", { name: form.customerName || "" })}</p>
          <div className="bg-gray-50 dark:bg-[#202a36] border dark:border-[#2c3644] rounded p-4 mt-5 space-y-1.5 text-[14px]">
            <div className="flex justify-between"><span className="text-gray-500">{t("checkout.orderNo")}</span><span className="font-black text-[#e30613]" dir="ltr">{success.orderNumber}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">{t("checkout.totalToPay")}</span><span className="font-black">{money(success.total)}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">{t("checkout.paymentLabel")}</span><span className="font-bold">{t("checkout.onDelivery")}</span></div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-5">
            <Link href="/" className="border-2 border-[#2f3d4c] dark:border-[#8ea3b8] text-[#2f3d4c] dark:text-[#c9d6e3] font-bold text-[14px] py-3 rounded hover:bg-[#2f3d4c] hover:text-white transition">{t("checkout.backHome")}</Link>
            <Link href="/recherche" className="bg-[#e30613] text-white font-bold text-[14px] py-3 rounded hover:bg-[#b3050f] transition">{t("cart.keepShopping")}</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 mt-4">
      <div className="text-[12px] text-gray-500 flex items-center gap-1.5 mb-3">
        <Link href="/" className="hover:text-[#e30613]">{t("common.home")}</Link>
        <ChevronRight size={12} className="rtl:rotate-180" />
        <span className="font-semibold text-gray-800 dark:text-gray-200">{t("checkout.title")}</span>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-4 items-start">
        {/* Formulaire */}
        <form onSubmit={submit} className="bg-white dark:bg-[#1a222c] border dark:border-[#2c3644] rounded overflow-hidden">
          <div className="section-bar px-5 py-3.5 border-b dark:border-[#2c3644] flex items-center gap-2">
            <Truck size={19} className="text-[#e30613]" />
            <h1 className="text-[17px] font-black uppercase">{t("checkout.deliveryInfo")}</h1>
          </div>
          <div className="p-5 grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[13px] font-bold" htmlFor="c-name">{t("form.fullName")}</label>
              <input id="c-name" value={form.customerName} onChange={(e) => set("customerName", e.target.value)} placeholder={t("checkout.namePh")} className={INPUT} />
            </div>
            <div>
              <label className="text-[13px] font-bold" htmlFor="c-phone">{t("form.phone")}</label>
              <input id="c-phone" value={form.customerPhone} onChange={(e) => set("customerPhone", e.target.value)} placeholder={t("checkout.phonePh")} className={INPUT} dir="ltr" />
            </div>
            <div>
              <label className="text-[13px] font-bold" htmlFor="c-email">{t("checkout.emailLabel")}</label>
              <input id="c-email" type="email" value={form.customerEmail} onChange={(e) => set("customerEmail", e.target.value)} placeholder="email@exemple.com" className={INPUT} dir="ltr" />
            </div>
            <div>
              <label className="text-[13px] font-bold" htmlFor="c-city">{t("checkout.city")}</label>
              <select id="c-city" value={form.city} onChange={(e) => set("city", e.target.value)} className={INPUT}>
                {CITIES.map((c) => <option key={c.value} value={c.value}>{t(c.key)}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="text-[13px] font-bold" htmlFor="c-address">{t("checkout.address")}</label>
              <input id="c-address" value={form.address} onChange={(e) => set("address", e.target.value)} placeholder={t("checkout.addressPh")} className={INPUT} />
            </div>
            <div className="sm:col-span-2">
              <label className="text-[13px] font-bold" htmlFor="c-notes">{t("checkout.notes")}</label>
              <textarea id="c-notes" value={form.notes} onChange={(e) => set("notes", e.target.value)} rows={2} placeholder={t("checkout.notesPh")} className="mt-1 w-full border dark:border-[#2c3644] bg-white dark:bg-[#202a36] rounded px-3 py-2 text-[14px] outline-none focus:border-[#e30613] transition" />
            </div>
          </div>

          <div className="px-5 pb-2">
            <h2 className="text-[15px] font-black uppercase mb-3">{t("checkout.payment")}</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <button type="button" onClick={() => set("paymentMethod", "cod")} aria-pressed={form.paymentMethod === "cod"} className={`border-2 rounded p-3.5 flex items-center gap-3 text-start transition ${form.paymentMethod === "cod" ? CHOICE_ON : CHOICE_OFF}`}>
                <Banknote size={26} className="text-[#e30613] shrink-0" />
                <span><span className="block font-bold text-[14px]">{t("checkout.payCod")}</span><span className="block text-[12px] text-gray-500">{t("checkout.payCodDesc")}</span></span>
              </button>
              <button type="button" onClick={() => set("paymentMethod", "transfer")} aria-pressed={form.paymentMethod === "transfer"} className={`border-2 rounded p-3.5 flex items-center gap-3 text-start transition ${form.paymentMethod === "transfer" ? CHOICE_ON : CHOICE_OFF}`}>
                <Building2 size={26} className="text-[#2f3d4c] dark:text-[#c9d6e3] shrink-0" />
                <span><span className="block font-bold text-[14px]">{t("checkout.payTransfer")}</span><span className="block text-[12px] text-gray-500">{t("checkout.payTransferDesc")}</span></span>
              </button>
            </div>
          </div>

          {error && <div role="alert" className="mx-5 mb-3 mt-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-[13px] font-semibold rounded px-3 py-2.5">{error}</div>}

          <div className="p-5 pt-2">
            <button disabled={loading} className="w-full h-[52px] bg-[#e30613] hover:bg-[#b3050f] disabled:opacity-60 text-white font-black text-[16px] rounded transition shadow-lg">
              {loading ? t("checkout.sending") : t("checkout.submit", { total: money(total) })}
            </button>
            <p className="text-[12px] text-gray-400 text-center mt-2">{t("checkout.terms")}</p>
          </div>
        </form>

        {/* Récapitulatif */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#1a222c] border dark:border-[#2c3644] rounded overflow-hidden">
            <div className="px-5 py-3.5 border-b dark:border-[#2c3644] flex items-center gap-2">
              <ShoppingCart size={18} className="text-[#e30613]" />
              <h2 className="text-[15px] font-black uppercase">{t("checkout.summaryTitle", { count: items.length })}</h2>
            </div>
            <div className="p-3 space-y-2 max-h-[320px] overflow-y-auto thin-scroll">
              {items.length === 0 && (
                <p className="text-center text-gray-400 text-[13px] py-6">
                  {t("checkout.emptyCartText")} <Link href="/recherche" className="text-[#e30613] font-bold">{t("checkout.discover")}</Link>
                </p>
              )}
              {items.map((it) => (
                <div key={it.id} className="flex gap-2.5 border dark:border-[#2c3644] rounded p-2">
                  <img src={it.image} alt="" className="w-[52px] h-[52px] object-cover rounded border" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[12.5px] font-medium line-clamp-1">{it.name}</div>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center border dark:border-[#2c3644] rounded text-[12px]">
                        <button type="button" onClick={() => updateQty(it.id, it.qty - 1)} className="w-6 h-6 hover:bg-gray-100 dark:hover:bg-white/10" aria-label={t("cart.decrease")}>−</button>
                        <span className="w-7 text-center font-bold">{it.qty}</span>
                        <button type="button" onClick={() => updateQty(it.id, it.qty + 1)} className="w-6 h-6 hover:bg-gray-100 dark:hover:bg-white/10" aria-label={t("cart.increase")}>+</button>
                      </div>
                      <span className="text-[#e30613] font-black text-[13px]">{money(it.price * it.qty)}</span>
                    </div>
                  </div>
                  <button type="button" onClick={() => removeItem(it.id)} className="text-gray-300 hover:text-[#e30613] text-[16px]" aria-label={t("cart.remove")}>×</button>
                </div>
              ))}
            </div>
            <div className="p-4 border-t dark:border-[#2c3644] bg-gray-50 dark:bg-[#202a36] space-y-1 text-[13px]">
              <div className="flex justify-between"><span>{t("cart.subtotal")}</span><span className="font-bold">{money(subtotal)}</span></div>
              <div className="flex justify-between"><span>{t("cart.delivery")}</span><span className="font-bold">{delivery === 0 ? t("cart.free") : money(delivery)}</span></div>
              <div className="flex justify-between text-[17px] font-black pt-2 border-t dark:border-[#2c3644]"><span>{t("cart.total")}</span><span className="text-[#e30613]">{money(total)}</span></div>
            </div>
          </div>

          {/* Suivi de commande */}
          <div className="bg-[#2f3d4c] rounded p-5 text-white">
            <h3 className="font-black text-[15px] uppercase flex items-center gap-2"><MapPin size={17} className="text-[#ffea00]" /> {t("checkout.trackTitle")}</h3>
            <form onSubmit={track} className="flex mt-3">
              <input value={trackNum} onChange={(e) => setTrackNum(e.target.value)} placeholder={t("checkout.trackPh")} aria-label={t("checkout.trackTitle")} dir="ltr" className="flex-1 h-[42px] px-3 rounded-s text-[13px] text-gray-800 outline-none" />
              <button className="bg-[#e30613] hover:bg-[#b3050f] px-5 font-bold text-[13px] rounded-e transition">{t("checkout.trackOk")}</button>
            </form>
            {tracked && (
              <div className="mt-3 text-[13px] bg-white/10 rounded p-3">
                {tracked.error || !tracked.order ? (
                  <span className="text-[#ff9a9a]">{tracked.error}</span>
                ) : (
                  <div className="space-y-1">
                    <div className="flex justify-between"><span>{t("checkout.trackNo")}</span><b dir="ltr">{tracked.order.orderNumber}</b></div>
                    <div className="flex justify-between"><span>{t("checkout.trackStatus")}</span><b className="text-[#ffea00]">{t(`status.${tracked.order.status}` as TextKey)}</b></div>
                    <div className="flex justify-between"><span>{t("cart.total")}</span><b>{money(tracked.order.total)}</b></div>
                  </div>
                )}
              </div>
            )}
            <div className="mt-3 flex items-center gap-2 text-[12px] text-white/70">
              <Phone size={14} /> <span>{t("checkout.needHelp", { phone: settings.company.phone })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

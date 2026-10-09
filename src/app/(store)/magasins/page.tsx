import { MapPin, Phone, Clock, Car, CreditCard, Package } from "lucide-react";
import Link from "next/link";
import { getI18n } from "@/i18n/server";
import { getSettings } from "@/lib/settings";
import { storesFor } from "@/lib/store-data";

export const dynamic = "force-dynamic";

export default async function StoresPage() {
  const { t, locale } = await getI18n();
  const { company } = await getSettings();
  const stores = await storesFor(locale);
  return (
    <div className="mx-auto max-w-[1280px] px-4 mt-4">
      {/* Bandeau */}
      <div className="relative overflow-hidden rounded h-[170px] sm:h-[220px]">
        <img src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1400&q=70&auto=format&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l from-black/75 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-6">
          <span className="bg-[#ffea00] text-black text-[11px] font-black px-2 py-1 rounded-sm w-fit uppercase tracking-widest">{t("stores.tag")}</span>
          <h1 className="text-white font-black text-[26px] sm:text-[36px] mt-1">{t("stores.title")}</h1>
          <p className="text-white/85 text-[14px]">{t("stores.subtitle")}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        {stores.map((s) => (
          <div key={s.id} className="bg-white dark:bg-[#1a222c] border dark:border-[#2c3644] rounded overflow-hidden hover:shadow-xl transition group">
            <div className="relative h-[190px] overflow-hidden bg-gray-100 dark:bg-[#202a36]">
              {s.image && <img src={s.image} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />}
              {s.tag && <span className="absolute top-3 start-3 bg-[#e30613] text-white text-[12px] font-bold px-2.5 py-1 rounded-sm">{s.tag}</span>}
            </div>
            <div className="p-4">
              <h2 className="font-black text-[16px]">{s.name}</h2>
              <div className="mt-2 space-y-1.5 text-[13px] text-gray-600 dark:text-gray-300">
                {s.address && <div className="flex gap-2"><MapPin size={15} className="text-[#e30613] shrink-0 mt-0.5" />{s.address}</div>}
                {s.phone && <div className="flex gap-2 items-center"><Phone size={15} className="text-[#e30613] shrink-0" /><b dir="ltr">{s.phone}</b></div>}
                {s.hours && <div className="flex gap-2"><Clock size={15} className="text-[#e30613] shrink-0 mt-0.5" />{s.hours}</div>}
              </div>
              <div className="flex flex-wrap gap-4 mt-3 text-[11.5px] text-gray-500">
                <span className="flex items-center gap-1"><Car size={14} /> {t("stores.parking")}</span>
                <span className="flex items-center gap-1"><Package size={14} /> {t("stores.pickup")}</span>
                <span className="flex items-center gap-1"><CreditCard size={14} /> {t("stores.payment")}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#2f3d4c] rounded p-6 mt-4 text-center">
        <h2 className="text-white font-black text-[19px]">{t("stores.callTitle")}</h2>
        <p className="text-white/70 text-[13px]">{t("stores.callSub")}</p>
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          <a href={`tel:${company.phone.replace(/\s+/g, "")}`} className="bg-[#ffea00] text-black font-black text-[15px] px-8 py-3 rounded hover:bg-white transition" dir="ltr">{company.phone}</a>
          <Link href="/entreprise" className="border-2 border-white text-white font-bold text-[14px] px-8 py-3 rounded hover:bg-white hover:text-black transition">{t("stores.callCta")}</Link>
        </div>
      </div>
    </div>
  );
}

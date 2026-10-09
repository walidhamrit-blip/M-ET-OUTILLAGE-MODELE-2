import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { getI18n } from "@/i18n/server";
import { getSettings } from "@/lib/settings";
import { storesFor } from "@/lib/store-data";
import ContactForm from "./ContactForm";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const { t, locale } = await getI18n();
  const { company } = await getSettings();
  const stores = await storesFor(locale);
  return (
    <div className="mx-auto max-w-[1280px] px-4 mt-4">
      <div className="bg-white dark:bg-[#1a222c] border dark:border-[#2c3644] rounded overflow-hidden">
        <div className="section-bar px-5 py-3.5 border-b dark:border-[#2c3644]">
          <h1 className="text-[19px] font-black uppercase">{t("contact.title")}</h1>
          <p className="text-[13px] text-gray-500 dark:text-gray-400">{t("contact.subtitle")}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-0">
          <div className="p-5 border-b md:border-b-0 md:border-e dark:border-[#2c3644]">
            <h2 className="font-black text-[15px] uppercase mb-4">{t("contact.formTitle")}</h2>
            <ContactForm />
          </div>
          <div className="p-5 bg-gray-50/60 dark:bg-[#171e27]">
            <h2 className="font-black text-[15px] uppercase mb-4">{t("contact.details")}</h2>
            <div className="space-y-3 text-[14px]">
              <div className="flex gap-3 items-start bg-white dark:bg-[#1a222c] border dark:border-[#2c3644] rounded p-3">
                <Phone size={19} className="text-[#e30613] mt-0.5 shrink-0" />
                <div><b>{t("contact.callCentre")}</b><div className="text-[#e30613] font-black text-[18px]" dir="ltr">{company.phone}</div><div className="text-[12px] text-gray-500">{t("hours.weekdays")}</div></div>
              </div>
              <div className="flex gap-3 items-start bg-white dark:bg-[#1a222c] border dark:border-[#2c3644] rounded p-3">
                <Mail size={19} className="text-[#e30613] mt-0.5 shrink-0" />
                <div><b>{t("form.email")}</b><div dir="ltr">{company.emailContact} — {company.emailQuotes}</div></div>
              </div>
              <div className="flex gap-3 items-start bg-white dark:bg-[#1a222c] border dark:border-[#2c3644] rounded p-3">
                <Clock size={19} className="text-[#e30613] mt-0.5 shrink-0" />
                <div><b>{t("contact.storeHours")}</b><div className="text-[13px] text-gray-600 dark:text-gray-300">{t("hours.weekdays")} • {t("hours.sunday")}</div></div>
              </div>
            </div>
            <h3 className="font-black text-[14px] uppercase mt-5 mb-2">{t("contact.storesTitle")}</h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {stores.map((s) => (
                <div key={s.id} className="bg-white dark:bg-[#1a222c] border dark:border-[#2c3644] rounded p-3 text-[12.5px] hover:border-[#e30613] transition">
                  <div className="font-bold flex items-center gap-1.5"><MapPin size={14} className="text-[#e30613] shrink-0" />{s.name}</div>
                  {s.address && <div className="text-gray-500 dark:text-gray-400 mt-1">{s.address}</div>}
                  {s.phone && <div className="font-semibold mt-0.5" dir="ltr">{s.phone}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

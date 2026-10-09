"use client";
import { Send } from "lucide-react";
import { useI18n } from "@/i18n/AppProvider";

/** Formulaire de contact (saisie uniquement : l'envoi n'est pas encore relié à un traitement serveur). */
export default function ContactForm() {
  const { t } = useI18n();
  return (
    <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
      <div className="grid sm:grid-cols-2 gap-3">
        <input aria-label={t("form.fullName")} placeholder={t("form.fullName")} className="h-[44px] border dark:border-[#2c3644] bg-white dark:bg-[#202a36] rounded px-3 text-[14px] outline-none focus:border-[#e30613]" />
        <input aria-label={t("form.phone")} placeholder={t("form.phone")} className="h-[44px] border dark:border-[#2c3644] bg-white dark:bg-[#202a36] rounded px-3 text-[14px] outline-none focus:border-[#e30613]" />
      </div>
      <input aria-label={t("form.email")} placeholder={t("form.email")} className="w-full h-[44px] border dark:border-[#2c3644] bg-white dark:bg-[#202a36] rounded px-3 text-[14px] outline-none focus:border-[#e30613]" />
      <select aria-label={t("contact.subject")} className="w-full h-[44px] border dark:border-[#2c3644] bg-white dark:bg-[#202a36] rounded px-3 text-[14px] outline-none focus:border-[#e30613]">
        <option>{t("contact.subjProduct")}</option>
        <option>{t("contact.subjQuote")}</option>
        <option>{t("contact.subjOrder")}</option>
        <option>{t("contact.subjWarranty")}</option>
        <option>{t("form.other")}</option>
      </select>
      <textarea aria-label={t("form.message")} rows={5} placeholder={t("form.message")} className="w-full border dark:border-[#2c3644] bg-white dark:bg-[#202a36] rounded px-3 py-2.5 text-[14px] outline-none focus:border-[#e30613]" />
      <button type="submit" className="bg-[#e30613] hover:bg-[#b3050f] text-white font-bold text-[14px] px-8 py-3 rounded transition flex items-center gap-2">
        <Send size={16} className="rtl:-scale-x-100" /> {t("contact.send")}
      </button>
    </form>
  );
}

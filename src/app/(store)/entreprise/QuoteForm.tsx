"use client";
import { useI18n } from "@/i18n/AppProvider";

/** Demande de devis pro (saisie uniquement : l'envoi n'est pas encore relié à un traitement serveur). */
export default function QuoteForm() {
  const { t } = useI18n();
  const INPUT = "h-[44px] border dark:border-[#2c3644] bg-white dark:bg-[#202a36] rounded px-3 text-[14px] outline-none focus:border-[#e30613]";
  return (
    <form className="mt-4 space-y-3" onSubmit={(e) => e.preventDefault()}>
      <div className="grid sm:grid-cols-2 gap-3">
        <input aria-label={t("form.company")} placeholder={t("form.company")} className={INPUT} />
        <input aria-label={t("form.contactName")} placeholder={t("form.contactName")} className={INPUT} />
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <input aria-label={t("form.phone")} placeholder={t("form.phone")} className={INPUT} />
        <input aria-label={t("form.emailPro")} placeholder={t("form.emailPro")} className={INPUT} />
      </div>
      <textarea aria-label={t("business.needs")} rows={4} placeholder={t("business.needs")} className="w-full border dark:border-[#2c3644] bg-white dark:bg-[#202a36] rounded px-3 py-2.5 text-[14px] outline-none focus:border-[#e30613]" />
      <button type="submit" className="bg-[#e30613] hover:bg-[#b3050f] text-white font-black text-[14px] px-8 py-3.5 rounded transition w-full sm:w-auto">
        {t("business.submit")}
      </button>
    </form>
  );
}

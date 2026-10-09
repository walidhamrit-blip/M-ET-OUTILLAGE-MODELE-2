import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";
import { getI18n } from "@/i18n/server";
import { getSettings } from "@/lib/settings";
import type { TextKey } from "@/i18n/texts";

export const dynamic = "force-dynamic";

const JOB_IDS = [1, 2, 3, 4, 5, 6] as const;
const jobKey = (n: number, field: "title" | "desc" | "loc" | "type") => `careers.job${n}.${field}` as TextKey;

export default async function RecrutementPage() {
  const { t } = await getI18n();
  const { company } = await getSettings();
  return (
    <div className="mx-auto max-w-[1000px] px-4 mt-4">
      <div className="bg-gradient-to-r rtl:bg-gradient-to-l from-[#2f3d4c] to-[#e30613] rounded p-6 sm:p-8 text-white">
        <span className="bg-[#ffea00] text-black text-[11px] font-black px-2.5 py-1 rounded-sm uppercase tracking-widest">{t("careers.tag")}</span>
        <h1 className="font-black text-[26px] sm:text-[34px] mt-2">{t("careers.title")}</h1>
        <p className="text-white/85 text-[14px] mt-1">{t("careers.subtitle")}</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-3 mt-4">
        {JOB_IDS.map((n) => (
          <div key={n} className="bg-white dark:bg-[#1a222c] border dark:border-[#2c3644] rounded p-4 hover:border-[#e30613] hover:shadow-lg transition group">
            <div className="flex items-start justify-between gap-2">
              <span className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center shrink-0"><Briefcase size={19} className="text-[#e30613]" /></span>
              <span className="bg-[#2f3d4c] text-white text-[11px] font-bold px-2 py-1 rounded">{t(jobKey(n, "type"))}</span>
            </div>
            <h2 className="font-black text-[15px] mt-2 group-hover:text-[#e30613] transition">{t(jobKey(n, "title"))}</h2>
            <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-1">{t(jobKey(n, "desc"))}</p>
            <div className="flex items-center gap-3 mt-2.5 text-[12px] text-gray-500">
              <span className="flex items-center gap-1"><MapPin size={13} />{t(jobKey(n, "loc"))}</span>
              <span className="flex items-center gap-1"><Clock size={13} />{t("careers.fullTime")}</span>
            </div>
            <a href={`mailto:${company.emailHR}`} className="mt-3 inline-flex items-center gap-1 text-[13px] font-bold text-[#e30613] group-hover:gap-3 transition-all">
              {t("careers.apply")} <ArrowRight size={15} className="rtl:rotate-180" />
            </a>
          </div>
        ))}
      </div>
      <div className="bg-white dark:bg-[#1a222c] border dark:border-[#2c3644] rounded p-5 mt-4 text-center">
        <h2 className="font-black text-[16px]">{t("careers.spontTitle")}</h2>
        <p className="text-[13px] text-gray-500 dark:text-gray-400" dir="auto">
          {t("careers.spontText", { email: company.emailHR })}
        </p>
      </div>
    </div>
  );
}

import { Building2, FileText, Truck, BadgePercent, Phone, HardHat } from "lucide-react";
import Link from "next/link";
import { getI18n } from "@/i18n/server";
import { getSettings } from "@/lib/settings";
import QuoteForm from "./QuoteForm";

export const dynamic = "force-dynamic";

export default async function EntreprisePage() {
  const { t } = await getI18n();
  const { company } = await getSettings();
  const services = [
    { icon: BadgePercent, title: t("business.svc1Title"), desc: t("business.svc1Desc") },
    { icon: FileText, title: t("business.svc2Title"), desc: t("business.svc2Desc") },
    { icon: Truck, title: t("business.svc3Title"), desc: t("business.svc3Desc") },
    { icon: Building2, title: t("business.svc4Title"), desc: t("business.svc4Desc") },
  ];
  const bullets = [t("business.bullet1"), t("business.bullet2"), t("business.bullet3"), t("business.bullet4")];
  return (
    <div className="mx-auto max-w-[1280px] px-4 mt-4">
      <div className="relative overflow-hidden rounded h-[200px] sm:h-[260px]">
        <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1400&q=70&auto=format&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l from-[#2f3d4c]/95 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10">
          <span className="bg-[#ffea00] text-black text-[11px] font-black px-2.5 py-1 rounded-sm w-fit uppercase tracking-widest">{t("business.tag")}</span>
          <h1 className="text-white font-black text-[26px] sm:text-[38px] mt-1">{t("business.title")}</h1>
          <p className="text-white/85 text-[14px] sm:text-[16px]">{t("business.subtitle")}</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
        {services.map((s, i) => (
          <div key={i} className="bg-white dark:bg-[#1a222c] border dark:border-[#2c3644] rounded p-4 hover:border-[#e30613] hover:shadow-lg transition">
            <span className="w-11 h-11 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center"><s.icon size={22} className="text-[#e30613]" /></span>
            <div className="font-black text-[14px] mt-2.5">{s.title}</div>
            <div className="text-[13px] text-gray-500 dark:text-gray-400 mt-1">{s.desc}</div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#1a222c] border dark:border-[#2c3644] rounded mt-4 overflow-hidden grid md:grid-cols-2">
        <div className="p-6">
          <h2 className="font-black text-[17px] uppercase">{t("business.formTitle")}</h2>
          <p className="text-[13px] text-gray-500 dark:text-gray-400">{t("business.formSub")}</p>
          <QuoteForm />
        </div>
        <div className="bg-[#2f3d4c] p-6 text-white flex flex-col justify-center">
          <HardHat size={40} className="text-[#ffea00]" />
          <h3 className="font-black text-[20px] mt-3">{t("business.panelTitle")}</h3>
          <p className="text-white/75 text-[14px] mt-1">{t("business.panelText")}</p>
          <ul className="mt-4 space-y-2 text-[13px]">
            {bullets.map((l) => (
              <li key={l} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#ffea00] shrink-0" />{l}</li>
            ))}
          </ul>
          <a href={`tel:${company.phone.replace(/\s+/g, "")}`} className="mt-5 flex items-center gap-2 bg-white/10 hover:bg-white/15 rounded p-3 transition">
            <Phone size={22} className="text-[#ffea00]" />
            <span><span className="block text-[12px] text-white/70">{t("business.directLine")}</span><span className="block font-black text-[17px]" dir="ltr">{company.phone}</span></span>
          </a>
          <Link href="/magasins" className="mt-3 text-[13px] font-bold text-[#ffea00] hover:underline">{t("business.depotLink")}</Link>
        </div>
      </div>
    </div>
  );
}

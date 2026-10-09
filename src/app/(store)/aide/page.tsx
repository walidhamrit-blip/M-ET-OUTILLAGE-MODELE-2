"use client";
import { useState } from "react";
import { ChevronDown, Truck, RotateCcw, ShieldCheck, CreditCard, Phone, Package } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/i18n/AppProvider";

const FAQ = [1, 2, 3, 4, 5, 6] as const;

export default function HelpPage() {
  const [open, setOpen] = useState<number | null>(0);
  const { t, money, settings } = useI18n();
  const fee = money(settings.delivery.fee);
  const threshold = money(settings.delivery.freeThreshold);
  const phone = settings.company.phone;
  const email = settings.company.emailQuotes;

  const answers: Record<number, string> = {
    1: t("help.a1", { fee, threshold }),
    2: t("help.a2"),
    3: t("help.a3"),
    4: t("help.a4", { email, phone }),
    5: t("help.a5"),
    6: t("help.a6"),
  };
  const questions: Record<number, string> = {
    1: t("help.q1"), 2: t("help.q2"), 3: t("help.q3"), 4: t("help.q4"), 5: t("help.q5"), 6: t("help.q6"),
  };

  return (
    <div className="mx-auto max-w-[900px] px-4 mt-4">
      <div className="bg-white dark:bg-[#1a222c] border dark:border-[#2c3644] rounded overflow-hidden">
        <div className="bg-[#e30613] px-6 py-6 text-center">
          <h1 className="text-white font-black text-[24px] uppercase">{t("help.title")}</h1>
          <p className="text-white/85 text-[14px]">{t("help.subtitle")}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 border-b dark:border-[#2c3644]">
          {[
            { icon: Truck, l: t("help.tile1") },
            { icon: RotateCcw, l: t("help.tile2") },
            { icon: ShieldCheck, l: t("help.tile3") },
            { icon: CreditCard, l: t("help.tile4") },
          ].map((s, i) => (
            <div key={i} className="bg-gray-50 dark:bg-[#202a36] border dark:border-[#2c3644] rounded p-3 text-center">
              <s.icon size={22} className="mx-auto text-[#e30613]" />
              <div className="text-[12px] font-bold mt-1.5">{s.l}</div>
            </div>
          ))}
        </div>
        <div className="p-4 sm:p-6">
          <h2 className="font-black text-[16px] uppercase mb-3">{t("help.faqTitle")}</h2>
          <div className="space-y-2">
            {FAQ.map((n, i) => (
              <div key={n} className={`border dark:border-[#2c3644] rounded overflow-hidden transition ${open === i ? "border-[#e30613]" : ""}`}>
                <button type="button" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-start font-bold text-[14px] hover:bg-gray-50 dark:hover:bg-white/5 transition">
                  {questions[n]}
                  <ChevronDown size={18} className={`shrink-0 text-[#e30613] transition ${open === i ? "rotate-180" : ""}`} />
                </button>
                {open === i && <div className="fade-animate px-4 pb-4 text-[13.5px] text-gray-600 dark:text-gray-300 leading-relaxed">{answers[n]}</div>}
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-3 mt-5">
            <a href={`tel:${phone.replace(/\s+/g, "")}`} className="bg-[#2f3d4c] rounded p-4 flex items-center gap-3 hover:bg-[#243140] transition">
              <Phone size={26} className="text-[#ffea00]" />
              <span><span className="block text-white font-bold text-[14px]">{t("help.stuck")}</span><span className="block text-[#ffea00] font-black" dir="ltr">{phone}</span></span>
            </a>
            <Link href="/commande" className="bg-gray-100 dark:bg-[#202a36] border dark:border-[#2c3644] rounded p-4 flex items-center gap-3 hover:border-[#e30613] transition">
              <Package size={26} className="text-[#e30613]" />
              <span><span className="block font-bold text-[14px]">{t("checkout.trackTitle")}</span><span className="block text-[12px] text-gray-500">{t("help.trackHint")}</span></span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

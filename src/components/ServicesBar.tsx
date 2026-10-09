"use client";
import { Truck, ShieldCheck, RotateCcw, Headset } from "lucide-react";
import { useI18n } from "@/i18n/AppProvider";

export default function ServicesBar() {
  const { t, settings } = useI18n();
  const items = [
    { icon: Truck, title: t("services.delivery"), desc: t("services.deliveryDesc") },
    { icon: ShieldCheck, title: t("services.warranty"), desc: t("services.warrantyDesc") },
    { icon: RotateCcw, title: t("services.returns"), desc: t("services.returnsDesc") },
    { icon: Headset, title: t("services.support"), desc: settings.company.phone },
  ];
  return (
    <div className="mx-auto max-w-[1280px] px-4 mt-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {items.map((it, i) => (
          <div key={i} className="bg-white dark:bg-[#1a222c] border border-gray-200 dark:border-[#2c3644] rounded-[4px] p-4 flex items-center gap-3 hover:border-[#e30613] hover:shadow-lg transition group">
            <span className="w-11 h-11 rounded-full bg-[#f4f4f4] dark:bg-[#243040] group-hover:bg-[#e30613] flex items-center justify-center shrink-0 transition">
              <it.icon size={22} className="text-[#e30613] group-hover:text-white transition" />
            </span>
            <div>
              <div className="font-bold text-[14px]">{it.title}</div>
              <div className="text-[12px] text-gray-500 dark:text-gray-400" dir="auto">{it.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

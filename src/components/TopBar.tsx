"use client";
import { Phone, MapPin, Truck, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/i18n/AppProvider";
import { LanguageSwitch, ThemeToggle } from "./Prefs";

export default function TopBar() {
  const { t, settings } = useI18n();
  const phone = settings.company.phone;
  return (
    <div className="hidden md:block bg-[#243140] text-[12px] text-gray-300">
      <div className="mx-auto max-w-[1280px] px-4 flex items-center justify-between h-[32px]">
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5 hover:text-white transition">
            <Phone size={13} className="text-[#ffea00]" />
            <a href={`tel:${phone.replace(/\s+/g, "")}`} className="font-semibold tracking-wide" dir="ltr">
              {phone}
            </a>
          </span>
          <Link href="/magasins" className="topbar-link flex items-center gap-1.5 transition">
            <MapPin size={13} />
            {t("topbar.stores")}
          </Link>
          <span className="hidden lg:flex items-center gap-1.5">
            <Truck size={13} />
            {t("topbar.delivery")}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-green-400" />
            {t("topbar.cod")}
          </span>
          <LanguageSwitch />
          <ThemeToggle />
          <span className="bg-[#e30613] text-white px-2 py-[1px] rounded-sm font-bold">{t("common.currency")}</span>
        </div>
      </div>
    </div>
  );
}

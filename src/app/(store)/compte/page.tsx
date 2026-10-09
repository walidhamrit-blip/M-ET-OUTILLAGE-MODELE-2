"use client";
import { useState } from "react";
import { User, Package, Heart, MapPin } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/i18n/AppProvider";

export default function AccountPage() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const { t } = useI18n();
  const INPUT = "w-full h-[46px] border dark:border-[#2c3644] bg-white dark:bg-[#202a36] rounded px-3 text-[14px] outline-none focus:border-[#e30613]";
  return (
    <div className="mx-auto max-w-[560px] px-4 mt-6">
      <div className="bg-white dark:bg-[#1a222c] border dark:border-[#2c3644] rounded overflow-hidden">
        <div className="bg-[#2f3d4c] px-6 py-5 text-center">
          <span className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto"><User size={28} className="text-[#ffea00]" /></span>
          <h1 className="text-white font-black text-[20px] uppercase mt-2">{t("account.title")}</h1>
          <p className="text-white/70 text-[13px]">{t("account.subtitle")}</p>
        </div>
        <div className="flex border-b dark:border-[#2c3644]">
          {(["login", "register"] as const).map((tb) => (
            <button type="button" key={tb} onClick={() => setTab(tb)} className={`flex-1 py-3.5 text-[14px] font-bold uppercase border-b-[3px] -mb-[1px] transition ${tab === tb ? "border-[#e30613] text-[#e30613]" : "border-transparent text-gray-400"}`}>
              {tb === "login" ? t("account.login") : t("account.register")}
            </button>
          ))}
        </div>
        <form className="p-6 space-y-3" onSubmit={(e) => e.preventDefault()}>
          {tab === "register" && <input aria-label={t("form.fullName")} placeholder={t("form.fullName")} className={INPUT} />}
          <input aria-label={t("form.phone")} placeholder={t("form.phone")} className={INPUT} />
          {tab === "register" && <input aria-label={t("form.email")} placeholder={t("form.email")} className={INPUT} />}
          <input type="password" aria-label={t("form.password")} placeholder={t("form.password")} className={INPUT} />
          <button className="w-full h-[50px] bg-[#e30613] hover:bg-[#b3050f] text-white font-black text-[15px] rounded transition">
            {tab === "login" ? t("account.submitLogin") : t("account.submitRegister")}
          </button>
          <p className="text-[12px] text-gray-400 text-center">{t("account.terms")}</p>
        </form>
        <div className="grid grid-cols-3 border-t dark:border-[#2c3644] divide-x dark:divide-[#2c3644] text-center">
          {[
            { icon: Package, l: t("account.orders"), href: "/commande" },
            { icon: Heart, l: t("header.favorites"), href: "/favoris" },
            { icon: MapPin, l: t("account.stores"), href: "/magasins" },
          ].map((s) => (
            <Link key={s.href} href={s.href} className="py-4 hover:bg-gray-50 dark:hover:bg-white/5 transition">
              <s.icon size={20} className="mx-auto text-[#e30613]" />
              <div className="text-[12px] font-bold mt-1">{s.l}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

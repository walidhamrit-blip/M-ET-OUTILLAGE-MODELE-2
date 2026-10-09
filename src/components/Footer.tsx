"use client";
import { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Send, CreditCard, Truck, ShieldCheck, ChevronUp, Share2, AtSign, Play } from "lucide-react";
import { useI18n } from "@/i18n/AppProvider";

type Cat = { id: number; name: string; slug: string };

const LINK = "hover:text-[#ffea00] transition";

export default function Footer({ categories }: { categories: Cat[] }) {
  const { t, settings, locale } = useI18n();
  const { company } = settings;
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const year = new Date().getFullYear();

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setMsg(t("footer.invalid"));
      return;
    }
    try {
      const r = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) {
        setMsg(t("footer.invalid"));
      } else if (j.alreadySubscribed) {
        setMsg(t("footer.alreadySub"));
      } else {
        setMsg(t("footer.subscribed"));
        setEmail("");
      }
    } catch {
      setMsg(t("footer.error"));
    }
  };

  return (
    <footer className="mt-10">
      {/* Newsletter */}
      <div className="bg-[#e30613]">
        <div className="mx-auto max-w-[1280px] px-4 py-5 flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="flex items-center gap-3 text-white">
            <span className="w-11 h-11 rounded-full bg-white/15 flex items-center justify-center">
              <Send size={20} />
            </span>
            <div>
              <div className="font-black text-[17px] uppercase">{t("footer.newsTitle")}</div>
              <div className="text-white/85 text-[13px]">{t("footer.newsText")}</div>
            </div>
          </div>
          <form onSubmit={subscribe} className="flex w-full md:w-[440px]">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("footer.emailPh")}
              className="flex-1 h-[44px] px-4 rounded-s-[4px] text-[14px] outline-none text-gray-800"
            />
            <button className="bg-[#222] hover:bg-black text-white font-bold text-[14px] px-6 rounded-e-[4px] transition">
              {t("footer.ok")}
            </button>
          </form>
        </div>
        {msg && <div className="text-center pb-3 text-white text-[13px] font-semibold">{msg}</div>}
      </div>

      {/* Main footer */}
      <div className="bg-[#2f3d4c] text-gray-300">
        <div className="mx-auto max-w-[1280px] px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="border-[3px] border-white rounded-[6px] px-3 py-[3px] inline-block">
              <span className="text-white font-black italic text-[24px] tracking-tighter" dir="ltr">
                TRIPO<span className="text-[#ffea00]">-TECH</span>
              </span>
            </div>
            <p className="text-[13px] mt-3 leading-relaxed text-gray-400">{t("footer.about")}</p>
            <div className="flex gap-2 mt-4">
              {[Share2, AtSign, Play].map((Icon, i) => (
                <a key={i} href="#" aria-hidden tabIndex={-1} className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#e30613] flex items-center justify-center transition">
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-[14px] uppercase mb-4 border-b border-white/10 pb-2">{t("footer.colInfo")}</h4>
            <ul className="space-y-2 text-[13px]">
              <li><Link href="/entreprise" className={LINK}>{t("footer.linkBusiness")}</Link></li>
              <li><Link href="/magasins" className={LINK}>{t("footer.linkStores")}</Link></li>
              <li><Link href="/recrutement" className={LINK}>{t("footer.linkCareers")}</Link></li>
              <li><Link href="/aide" className={LINK}>{t("footer.linkHelp")}</Link></li>
              <li><Link href="/contact" className={LINK}>{t("footer.linkContact")}</Link></li>
              <li><Link href="/commande" className={LINK}>{t("footer.linkOrder")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-[14px] uppercase mb-4 border-b border-white/10 pb-2">{t("footer.colCats")}</h4>
            <ul className="space-y-2 text-[13px]">
              {categories.slice(0, 6).map((c) => (
                <li key={c.id}><Link href={`/categorie/${c.slug}`} className={LINK}>{c.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-[14px] uppercase mb-4 border-b border-white/10 pb-2">{t("footer.colContact")}</h4>
            <ul className="space-y-3 text-[13px]">
              <li className="flex gap-2"><MapPin size={16} className="text-[#ffea00] shrink-0 mt-0.5" /> <span>{company.address[locale]}</span></li>
              <li className="flex gap-2 items-center"><Phone size={16} className="text-[#ffea00] shrink-0" /> <span dir="ltr">{company.phone}</span></li>
              <li className="flex gap-2 items-center"><Mail size={16} className="text-[#ffea00] shrink-0" /> <span dir="ltr">{company.emailContact}</span></li>
              <li className="flex gap-2"><Clock size={16} className="text-[#ffea00] shrink-0 mt-0.5" /> <span>{t("hours.weekdays")}<br />{t("hours.sunday")}</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto max-w-[1280px] px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-gray-400">
            <span>{t("footer.copyright", { year, company: company.name })}</span>
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1.5"><CreditCard size={15} /> {t("footer.payCod")}</span>
              <span className="flex items-center gap-1.5"><Truck size={15} /> {t("footer.delivery")}</span>
              <span className="flex items-center gap-1.5"><ShieldCheck size={15} /> {t("footer.warranty")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="bounce-soft fixed bottom-5 end-5 z-[70] w-11 h-11 rounded-full bg-[#e30613] hover:bg-[#b3050f] text-white flex items-center justify-center shadow-xl transition"
        aria-label={t("footer.backTop")}
      >
        <ChevronUp size={22} />
      </button>
    </footer>
  );
}

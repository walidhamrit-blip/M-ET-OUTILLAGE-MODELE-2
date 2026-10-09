"use client";
import { useState } from "react";
import { useI18n } from "@/i18n/AppProvider";

const INPUT = "h-[44px] border dark:border-[#2c3644] bg-white dark:bg-[#202a36] rounded px-3 text-[14px] outline-none focus:border-[#e30613]";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Demande de devis pro : envoi vers /api/inquiries (kind=quote), consultée dans l'administration. */
export default function QuoteForm() {
  const { t } = useI18n();
  const [company, setCompany] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error" | "invalid">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const valid = company.trim() && contactName.trim() && phone.replace(/\D/g, "").length >= 6 && (email.trim() === "" || EMAIL.test(email.trim())) && message.trim();
    if (!valid) {
      setStatus("invalid");
      return;
    }
    setStatus("sending");
    try {
      const r = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "quote", company, fullName: contactName, phone, email, message }),
      });
      if (!r.ok) throw new Error("send");
      setStatus("sent");
      setCompany(""); setContactName(""); setPhone(""); setEmail(""); setMessage("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className="mt-4 space-y-3" onSubmit={submit} noValidate>
      <div className="grid sm:grid-cols-2 gap-3">
        <input aria-label={t("form.company")} placeholder={t("form.company")} value={company} onChange={(e) => setCompany(e.target.value)} className={INPUT} />
        <input aria-label={t("form.contactName")} placeholder={t("form.contactName")} value={contactName} onChange={(e) => setContactName(e.target.value)} className={INPUT} />
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <input aria-label={t("form.phone")} placeholder={t("form.phone")} value={phone} onChange={(e) => setPhone(e.target.value)} className={INPUT} dir="ltr" />
        <input aria-label={t("form.emailPro")} placeholder={t("form.emailPro")} type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={INPUT} dir="ltr" />
      </div>
      <textarea aria-label={t("business.needs")} rows={4} placeholder={t("business.needs")} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full border dark:border-[#2c3644] bg-white dark:bg-[#202a36] rounded px-3 py-2.5 text-[14px] outline-none focus:border-[#e30613]" />
      {status === "invalid" && <p className="text-[13px] text-[#e30613] font-semibold">{t("form.required")}</p>}
      {status === "error" && <p className="text-[13px] text-[#e30613] font-semibold">{t("form.sendError")}</p>}
      {status === "sent" && <p className="text-[13px] text-green-700 dark:text-green-400 font-semibold">{t("form.quoteSent")}</p>}
      <button type="submit" disabled={status === "sending"} className="bg-[#e30613] hover:bg-[#b3050f] disabled:opacity-60 text-white font-black text-[14px] px-8 py-3.5 rounded transition w-full sm:w-auto">
        {status === "sending" ? t("form.sending") : t("business.submit")}
      </button>
    </form>
  );
}

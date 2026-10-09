"use client";
import { useState } from "react";
import { Send } from "lucide-react";
import { useI18n } from "@/i18n/AppProvider";

const FIELD = "h-[44px] border dark:border-[#2c3644] bg-white dark:bg-[#202a36] rounded px-3 text-[14px] outline-none focus:border-[#e30613]";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Formulaire de contact : envoi vers /api/inquiries (consulté dans l'administration, rubrique Demandes). */
export default function ContactForm() {
  const { t } = useI18n();
  const subjects = [t("contact.subjProduct"), t("contact.subjQuote"), t("contact.subjOrder"), t("contact.subjWarranty"), t("form.other")];
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(subjects[0]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error" | "invalid">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const valid = fullName.trim() && phone.replace(/\D/g, "").length >= 6 && (email.trim() === "" || EMAIL.test(email.trim())) && message.trim();
    if (!valid) {
      setStatus("invalid");
      return;
    }
    setStatus("sending");
    try {
      const r = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "contact", fullName, phone, email, subject, message }),
      });
      if (!r.ok) throw new Error("send");
      setStatus("sent");
      setFullName(""); setPhone(""); setEmail(""); setMessage(""); setSubject(subjects[0]);
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className="space-y-3" onSubmit={submit} noValidate>
      <div className="grid sm:grid-cols-2 gap-3">
        <input aria-label={t("form.fullName")} placeholder={t("form.fullName")} value={fullName} onChange={(e) => setFullName(e.target.value)} className={FIELD} />
        <input aria-label={t("form.phone")} placeholder={t("form.phone")} value={phone} onChange={(e) => setPhone(e.target.value)} className={FIELD} dir="ltr" />
      </div>
      <input aria-label={t("form.email")} placeholder={t("form.email")} type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`w-full ${FIELD}`} dir="ltr" />
      <select aria-label={t("contact.subject")} value={subject} onChange={(e) => setSubject(e.target.value)} className={`w-full ${FIELD}`}>
        {subjects.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <textarea aria-label={t("form.message")} rows={5} placeholder={t("form.message")} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full border dark:border-[#2c3644] bg-white dark:bg-[#202a36] rounded px-3 py-2.5 text-[14px] outline-none focus:border-[#e30613]" />
      {status === "invalid" && <p className="text-[13px] text-[#e30613] font-semibold">{t("form.required")}</p>}
      {status === "error" && <p className="text-[13px] text-[#e30613] font-semibold">{t("form.sendError")}</p>}
      {status === "sent" && <p className="text-[13px] text-green-700 dark:text-green-400 font-semibold">{t("form.sent")}</p>}
      <button type="submit" disabled={status === "sending"} className="bg-[#e30613] hover:bg-[#b3050f] disabled:opacity-60 text-white font-bold text-[14px] px-8 py-3 rounded transition flex items-center gap-2">
        <Send size={16} className="rtl:-scale-x-100" /> {status === "sending" ? t("form.sending") : t("contact.send")}
      </button>
    </form>
  );
}

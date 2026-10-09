import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { inquiries } from "@/db/schema";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const KINDS = ["contact", "quote"];

/** Reçoit une demande du formulaire de contact (kind=contact) ou de devis entreprise (kind=quote). */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const kind = KINDS.includes(body?.kind) ? body.kind : "";
    const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

    const fullName = str(body?.fullName, 150);
    const company = str(body?.company, 150);
    const phone = str(body?.phone, 40);
    const email = str(body?.email, 150).toLowerCase();
    const subject = str(body?.subject, 120);
    const message = str(body?.message, 3000);

    const phoneOk = phone.replace(/\D/g, "").length >= 6;
    const emailOk = email === "" || EMAIL.test(email);
    const companyOk = kind === "contact" || company.length > 0;

    if (!kind || !fullName || !phoneOk || !emailOk || !companyOk || !message) {
      return NextResponse.json({ error: "Informations incomplètes ou invalides." }, { status: 400 });
    }

    await db.insert(inquiries).values({
      kind,
      fullName,
      company: company || null,
      phone,
      email: email || null,
      subject: subject || null,
      message,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

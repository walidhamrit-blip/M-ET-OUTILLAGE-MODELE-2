import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { newsletter } from "@/db/schema";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase().slice(0, 150) : "";
    if (!EMAIL.test(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }
    const inserted = await db.insert(newsletter).values({ email }).onConflictDoNothing().returning({ id: newsletter.id });
    return NextResponse.json({ ok: true, alreadySubscribed: inserted.length === 0 });
  } catch {
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }
}

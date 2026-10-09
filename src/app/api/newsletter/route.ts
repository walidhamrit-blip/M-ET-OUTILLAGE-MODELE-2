import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { newsletter } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }
    await db.insert(newsletter).values({ email }).onConflictDoNothing();
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }
}

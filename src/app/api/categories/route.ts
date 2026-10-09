import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { asc } from "drizzle-orm";
import { localeFromRequest } from "@/lib/request-locale";
import { localizeCategory } from "@/lib/localize";

export async function GET(req: NextRequest) {
  const locale = localeFromRequest(req);
  const rows = await db.select().from(categories).orderBy(asc(categories.order), asc(categories.id));
  return NextResponse.json({ categories: rows.map((r) => localizeCategory(r, locale)) });
}

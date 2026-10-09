import { asc } from "drizzle-orm";
import { db } from "@/db";
import { slides } from "@/db/schema";
import { requireAdminApi } from "@/lib/admin/auth";
import { dbFail, fail, ok, readJson } from "@/lib/admin/respond";
import { mapSlide } from "@/lib/admin/mappers";

export async function GET() {
  const denied = await requireAdminApi();
  if (denied) return denied;
  return ok(await db.select().from(slides).orderBy(asc(slides.order), asc(slides.id)));
}

export async function POST(req: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const body = await readJson(req);
  if (!body) return fail("Requête invalide.");
  try {
    const [row] = await db.insert(slides).values((mapSlide(body) as { values: typeof slides.$inferInsert }).values).returning();
    return ok(row, 201);
  } catch (err) {
    return dbFail(err);
  }
}

import { asc } from "drizzle-orm";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { requireAdminApi } from "@/lib/admin/auth";
import { dbFail, fail, ok, readJson } from "@/lib/admin/respond";
import { mapCategory } from "@/lib/admin/mappers";

export async function GET() {
  const denied = await requireAdminApi();
  if (denied) return denied;
  return ok(await db.select().from(categories).orderBy(asc(categories.order), asc(categories.id)));
}

export async function POST(req: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const body = await readJson(req);
  if (!body) return fail("Requête invalide.");
  const mapped = mapCategory(body);
  if (!mapped.ok) return fail(mapped.error);
  try {
    const [row] = await db.insert(categories).values(mapped.values as typeof categories.$inferInsert).returning();
    return ok(row, 201);
  } catch (err) {
    return dbFail(err);
  }
}

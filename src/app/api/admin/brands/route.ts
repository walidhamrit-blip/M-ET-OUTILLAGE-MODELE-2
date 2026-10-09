import { asc } from "drizzle-orm";
import { db } from "@/db";
import { brands } from "@/db/schema";
import { requireAdminApi } from "@/lib/admin/auth";
import { dbFail, fail, ok, readJson } from "@/lib/admin/respond";
import { mapBrand } from "@/lib/admin/mappers";

export async function GET() {
  const denied = await requireAdminApi();
  if (denied) return denied;
  return ok(await db.select().from(brands).orderBy(asc(brands.name)));
}

export async function POST(req: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const body = await readJson(req);
  if (!body) return fail("Requête invalide.");
  const mapped = mapBrand(body);
  if (!mapped.ok) return fail(mapped.error);
  try {
    const [row] = await db.insert(brands).values(mapped.values as typeof brands.$inferInsert).returning();
    return ok(row, 201);
  } catch (err) {
    return dbFail(err);
  }
}

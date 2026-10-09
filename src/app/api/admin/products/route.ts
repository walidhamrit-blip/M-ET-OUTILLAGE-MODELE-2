import { desc } from "drizzle-orm";
import { db } from "@/db";
import { products } from "@/db/schema";
import { requireAdminApi } from "@/lib/admin/auth";
import { dbFail, fail, ok, readJson } from "@/lib/admin/respond";
import { mapProduct } from "@/lib/admin/mappers";

export async function GET() {
  const denied = await requireAdminApi();
  if (denied) return denied;
  return ok(await db.select().from(products).orderBy(desc(products.id)));
}

export async function POST(req: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const body = await readJson(req);
  if (!body) return fail("Requête invalide.");
  const mapped = mapProduct(body);
  if (!mapped.ok) return fail(mapped.error);
  try {
    const [row] = await db.insert(products).values(mapped.values as typeof products.$inferInsert).returning();
    return ok(row, 201);
  } catch (err) {
    return dbFail(err);
  }
}

import { eq } from "drizzle-orm";
import { db } from "@/db";
import { brands, products } from "@/db/schema";
import { requireAdminApi } from "@/lib/admin/auth";
import { dbFail, fail, ok, readJson } from "@/lib/admin/respond";
import { mapBrand } from "@/lib/admin/mappers";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Ctx) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const id = Number((await params).id);
  const body = await readJson(req);
  if (!Number.isInteger(id) || !body) return fail("Requête invalide.");
  const mapped = mapBrand(body);
  if (!mapped.ok) return fail(mapped.error);
  try {
    const [row] = await db.update(brands).set(mapped.values as typeof brands.$inferInsert).where(eq(brands.id, id)).returning();
    return row ? ok(row) : fail("Marque introuvable.", 404);
  } catch (err) {
    return dbFail(err);
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const id = Number((await params).id);
  if (!Number.isInteger(id)) return fail("Identifiant invalide.");
  await db.update(products).set({ brandId: null }).where(eq(products.brandId, id));
  await db.delete(brands).where(eq(brands.id, id));
  return ok({ ok: true });
}

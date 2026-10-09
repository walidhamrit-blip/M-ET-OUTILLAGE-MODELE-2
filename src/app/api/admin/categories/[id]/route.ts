import { eq } from "drizzle-orm";
import { db } from "@/db";
import { categories, products } from "@/db/schema";
import { requireAdminApi } from "@/lib/admin/auth";
import { dbFail, fail, ok, readJson } from "@/lib/admin/respond";
import { mapCategory } from "@/lib/admin/mappers";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Ctx) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const id = Number((await params).id);
  const body = await readJson(req);
  if (!Number.isInteger(id) || !body) return fail("Requête invalide.");
  const mapped = mapCategory(body);
  if (!mapped.ok) return fail(mapped.error);
  try {
    const [row] = await db
      .update(categories)
      .set(mapped.values as typeof categories.$inferInsert)
      .where(eq(categories.id, id))
      .returning();
    return row ? ok(row) : fail("Rayon introuvable.", 404);
  } catch (err) {
    return dbFail(err);
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const id = Number((await params).id);
  if (!Number.isInteger(id)) return fail("Identifiant invalide.");
  await db.update(products).set({ categoryId: null }).where(eq(products.categoryId, id));
  await db.delete(categories).where(eq(categories.id, id));
  return ok({ ok: true });
}

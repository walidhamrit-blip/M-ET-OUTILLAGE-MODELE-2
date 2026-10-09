import { eq } from "drizzle-orm";
import { db } from "@/db";
import { products } from "@/db/schema";
import { requireAdminApi } from "@/lib/admin/auth";
import { dbFail, fail, ok, readJson } from "@/lib/admin/respond";
import { mapProduct } from "@/lib/admin/mappers";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const id = Number((await params).id);
  if (!Number.isInteger(id)) return fail("Identifiant invalide.");
  const [row] = await db.select().from(products).where(eq(products.id, id));
  return row ? ok(row) : fail("Produit introuvable.", 404);
}

export async function PUT(req: Request, { params }: Ctx) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const id = Number((await params).id);
  const body = await readJson(req);
  if (!Number.isInteger(id) || !body) return fail("Requête invalide.");
  const mapped = mapProduct(body);
  if (!mapped.ok) return fail(mapped.error);
  try {
    const [row] = await db
      .update(products)
      .set(mapped.values as typeof products.$inferInsert)
      .where(eq(products.id, id))
      .returning();
    return row ? ok(row) : fail("Produit introuvable.", 404);
  } catch (err) {
    return dbFail(err);
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const id = Number((await params).id);
  if (!Number.isInteger(id)) return fail("Identifiant invalide.");
  await db.delete(products).where(eq(products.id, id));
  return ok({ ok: true });
}

import { eq } from "drizzle-orm";
import { db } from "@/db";
import { slides } from "@/db/schema";
import { requireAdminApi } from "@/lib/admin/auth";
import { dbFail, fail, ok, readJson } from "@/lib/admin/respond";
import { mapSlide } from "@/lib/admin/mappers";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Ctx) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const id = Number((await params).id);
  const body = await readJson(req);
  if (!Number.isInteger(id) || !body) return fail("Requête invalide.");
  try {
    const [row] = await db.update(slides).set((mapSlide(body) as { values: typeof slides.$inferInsert }).values).where(eq(slides.id, id)).returning();
    return row ? ok(row) : fail("Diapositive introuvable.", 404);
  } catch (err) {
    return dbFail(err);
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const id = Number((await params).id);
  if (!Number.isInteger(id)) return fail("Identifiant invalide.");
  await db.delete(slides).where(eq(slides.id, id));
  return ok({ ok: true });
}

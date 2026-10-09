import { eq } from "drizzle-orm";
import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { requireAdminApi } from "@/lib/admin/auth";
import { fail, ok, readJson } from "@/lib/admin/respond";

type Ctx = { params: Promise<{ id: string }> };

/** Marque une demande comme traitée (ou non traitée). */
export async function PATCH(req: Request, { params }: Ctx) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const id = Number((await params).id);
  const body = await readJson(req);
  if (!Number.isInteger(id) || typeof body?.handled !== "boolean") return fail("Requête invalide.");
  const [row] = await db.update(inquiries).set({ handled: body.handled }).where(eq(inquiries.id, id)).returning();
  return row ? ok(row) : fail("Demande introuvable.", 404);
}

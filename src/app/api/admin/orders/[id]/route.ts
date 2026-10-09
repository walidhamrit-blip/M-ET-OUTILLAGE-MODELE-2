import { eq } from "drizzle-orm";
import { db } from "@/db";
import { orderItems, orders } from "@/db/schema";
import { requireAdminApi } from "@/lib/admin/auth";
import { fail, ok, readJson } from "@/lib/admin/respond";
import { str } from "@/lib/admin/input";

type Ctx = { params: Promise<{ id: string }> };

const STATUSES = ["pending", "confirmed", "delivering", "delivered", "cancelled"];

export async function GET(_req: Request, { params }: Ctx) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const id = Number((await params).id);
  if (!Number.isInteger(id)) return fail("Identifiant invalide.");
  const [order] = await db.select().from(orders).where(eq(orders.id, id));
  if (!order) return fail("Commande introuvable.", 404);
  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, id));
  return ok({ ...order, items });
}

export async function PATCH(req: Request, { params }: Ctx) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const id = Number((await params).id);
  const body = await readJson(req);
  const status = str(body?.status, 30);
  if (!Number.isInteger(id) || !STATUSES.includes(status)) return fail("Statut invalide.");
  const [row] = await db.update(orders).set({ status }).where(eq(orders.id, id)).returning();
  return row ? ok(row) : fail("Commande introuvable.", 404);
}

import { desc } from "drizzle-orm";
import { db } from "@/db";
import { newsletter } from "@/db/schema";
import { requireAdminApi } from "@/lib/admin/auth";
import { ok } from "@/lib/admin/respond";

export async function GET() {
  const denied = await requireAdminApi();
  if (denied) return denied;
  return ok(await db.select().from(newsletter).orderBy(desc(newsletter.id)));
}

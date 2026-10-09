import { eq } from "drizzle-orm";
import { db } from "@/db";
import { media } from "@/db/schema";

type Ctx = { params: Promise<{ id: string }> };

/** Images téléversées (publique, mise en cache longue : chaque image a un identifiant unique). */
export async function GET(_req: Request, { params }: Ctx) {
  const id = Number((await params).id);
  if (!Number.isInteger(id)) return new Response("Not found", { status: 404 });
  const [row] = await db.select().from(media).where(eq(media.id, id));
  if (!row) return new Response("Not found", { status: 404 });
  return new Response(new Uint8Array(row.data), {
    headers: {
      "Content-Type": row.mime,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

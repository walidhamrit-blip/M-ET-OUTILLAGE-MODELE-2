import { db } from "@/db";
import { media } from "@/db/schema";
import { requireAdminApi } from "@/lib/admin/auth";
import { fail, ok } from "@/lib/admin/respond";

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_BYTES = 5 * 1024 * 1024;

/** Téléversement d'image (multipart, champ "file") ; renvoie l'URL publique /api/media/[id]. */
export async function POST(req: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return fail("Envoi invalide.");
  }
  const file = form.get("file");
  if (!(file instanceof File)) return fail("Aucun fichier reçu.");
  if (!ALLOWED.includes(file.type)) return fail("Format non supporté (JPEG, PNG, WebP ou GIF).");
  if (file.size > MAX_BYTES) return fail("Image trop lourde (5 Mo maximum).");
  const buffer = Buffer.from(await file.arrayBuffer());
  const [row] = await db
    .insert(media)
    .values({ filename: file.name.slice(0, 250), mime: file.type, size: buffer.length, data: buffer })
    .returning({ id: media.id });
  return ok({ id: row.id, url: `/api/media/${row.id}` }, 201);
}

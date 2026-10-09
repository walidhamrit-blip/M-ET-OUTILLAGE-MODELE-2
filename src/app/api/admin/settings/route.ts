import { db } from "@/db";
import { settings as settingsTable } from "@/db/schema";
import { requireAdminApi } from "@/lib/admin/auth";
import { dbFail, fail, ok, readJson } from "@/lib/admin/respond";
import { getSettings } from "@/lib/settings";
import { mergeSettings, type SiteSettings, type HomeTile } from "@/lib/site-settings";
import { asRecord, num, str, strOrNull } from "@/lib/admin/input";

export async function GET() {
  const denied = await requireAdminApi();
  if (denied) return denied;
  return ok(await getSettings());
}

function bilingual(v: unknown) {
  const o = asRecord(v);
  return { ar: str(o.ar, 500), en: str(o.en, 500) };
}

function tile(v: unknown): HomeTile {
  const o = asRecord(v);
  return {
    img: str(o.img, 1000),
    link: str(o.link, 300) || "/",
    tag: str(o.tag, 30),
    title: bilingual(o.title),
    desc: bilingual(o.desc),
  };
}

export async function PUT(req: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const body = await readJson(req);
  if (!body) return fail("Requête invalide.");
  const c = asRecord(body.company);
  const d = asRecord(body.delivery);
  const h = asRecord(body.home);
  const next: SiteSettings = mergeSettings({
    company: {
      name: str(c.name, 80) || "TRIPO-TECH",
      phone: str(c.phone, 40),
      emailContact: str(c.emailContact, 150),
      emailQuotes: str(c.emailQuotes, 150),
      emailHR: str(c.emailHR, 150),
      address: bilingual(c.address),
    },
    delivery: {
      fee: Math.max(0, num(d.fee, 0)),
      freeThreshold: Math.max(0, num(d.freeThreshold, 0)),
    },
    home: {
      bannerImage: strOrNull(h.bannerImage, 1000) ?? "",
      storeImage: strOrNull(h.storeImage, 1000) ?? "",
      tiles: Array.isArray(h.tiles) ? h.tiles.slice(0, 6).map(tile) : [],
    },
  });
  try {
    for (const key of ["company", "delivery", "home"] as const) {
      await db
        .insert(settingsTable)
        .values({ key, value: next[key], updatedAt: new Date() })
        .onConflictDoUpdate({ target: settingsTable.key, set: { value: next[key], updatedAt: new Date() } });
    }
    return ok(next);
  } catch (err) {
    return dbFail(err);
  }
}

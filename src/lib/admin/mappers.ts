import { asRecord, bool, int, isSlug, num, numOrNull, slugify, specsFrom, str, strArray, strOrNull } from "./input";

type Result<T> = { ok: true; values: T } | { ok: false; error: string };

/** Ne conserve que les champs traduits renseignés (évite de stocker des chaînes vides). */
function cleanI18n(en: Record<string, unknown>): Record<string, unknown> | null {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(en)) {
    if (typeof v === "string" && v.trim()) out[k] = v.trim();
    else if (Array.isArray(v) && v.length) out[k] = v;
    else if (v && typeof v === "object" && !Array.isArray(v) && Object.keys(v).length) out[k] = v;
  }
  return Object.keys(out).length ? out : null;
}

function en(body: Record<string, unknown>): Record<string, unknown> {
  return asRecord(asRecord(body.i18n).en);
}

export function mapCategory(body: Record<string, unknown>): Result<Record<string, unknown>> {
  const name = str(body.name, 120);
  if (!name) return { ok: false, error: "Le nom (arabe) est obligatoire." };
  const slug = str(body.slug, 120) || slugify(name) || `rayon-${Date.now()}`;
  if (!isSlug(slug)) return { ok: false, error: "Le slug doit contenir uniquement des lettres minuscules, chiffres et tirets." };
  const e = en(body);
  return {
    ok: true,
    values: {
      name,
      slug,
      icon: strOrNull(body.icon, 60),
      image: strOrNull(body.image),
      order: int(body.order),
      featured: bool(body.featured),
      productCount: int(body.productCount),
      subcategories: strArray(body.subcategories),
      i18n: cleanI18n({ name: str(e.name, 120), subcategories: strArray(e.subcategories) }),
    },
  };
}

export function mapBrand(body: Record<string, unknown>): Result<Record<string, unknown>> {
  const name = str(body.name, 120);
  if (!name) return { ok: false, error: "Le nom de la marque est obligatoire." };
  const slug = str(body.slug, 120) || slugify(name);
  if (!isSlug(slug)) return { ok: false, error: "Le slug doit contenir uniquement des lettres minuscules, chiffres et tirets." };
  const color = str(body.color, 20);
  return {
    ok: true,
    values: {
      name,
      slug,
      logo: strOrNull(body.logo),
      color: /^#[0-9a-fA-F]{3,8}$/.test(color) ? color : "#2f3d4c",
      featured: bool(body.featured),
    },
  };
}

export function mapSlide(body: Record<string, unknown>): Result<Record<string, unknown>> {
  const e = en(body);
  return {
    ok: true,
    values: {
      title: strOrNull(body.title, 255),
      subtitle: strOrNull(body.subtitle, 255),
      image: strOrNull(body.image),
      mobileImage: strOrNull(body.mobileImage),
      link: strOrNull(body.link, 255),
      bgColor: strOrNull(body.bgColor, 20) ?? "#1a2a3a",
      order: int(body.order),
      active: body.active === undefined ? true : bool(body.active),
      i18n: cleanI18n({ title: str(e.title, 255), subtitle: str(e.subtitle, 255) }),
    },
  };
}

export function mapStore(body: Record<string, unknown>): Result<Record<string, unknown>> {
  const name = str(body.name, 150);
  if (!name) return { ok: false, error: "Le nom du magasin est obligatoire." };
  const e = en(body);
  const lat = numOrNull(body.lat);
  const lng = numOrNull(body.lng);
  return {
    ok: true,
    values: {
      name,
      address: strOrNull(body.address, 255),
      city: strOrNull(body.city, 80) ?? "طرابلس",
      phone: strOrNull(body.phone, 40),
      hours: strOrNull(body.hours, 120),
      lat: lat === null ? null : String(lat),
      lng: lng === null ? null : String(lng),
      image: strOrNull(body.image),
      tag: strOrNull(body.tag, 80),
      order: int(body.order),
      i18n: cleanI18n({
        address: str(e.address, 255),
        city: str(e.city, 80),
        hours: str(e.hours, 120),
        tag: str(e.tag, 80),
      }),
    },
  };
}

export function mapProduct(body: Record<string, unknown>): Result<Record<string, unknown>> {
  const name = str(body.name, 255);
  if (!name) return { ok: false, error: "Le nom (arabe) du produit est obligatoire." };
  const slug = str(body.slug, 255) || slugify(str(body.reference, 60) || name) || `produit-${Date.now()}`;
  if (!isSlug(slug)) return { ok: false, error: "Le slug doit contenir uniquement des lettres minuscules, chiffres et tirets." };
  const price = numOrNull(body.price);
  if (price === null || price < 0) return { ok: false, error: "Le prix doit être un nombre positif." };
  const oldPrice = numOrNull(body.oldPrice);
  const rating = Math.min(5, Math.max(0, num(body.rating, 4.5)));
  const e = en(body);
  const images = strArray(body.images);
  return {
    ok: true,
    values: {
      name,
      slug,
      reference: strOrNull(body.reference, 60),
      description: strOrNull(body.description, 5000),
      shortDescription: strOrNull(body.shortDescription, 500),
      price: String(price),
      oldPrice: oldPrice === null ? null : String(oldPrice),
      categoryId: numOrNull(body.categoryId),
      brandId: numOrNull(body.brandId),
      image: strOrNull(body.image),
      images,
      stock: Math.max(0, int(body.stock, 0)),
      rating: rating.toFixed(1),
      reviewsCount: Math.max(0, int(body.reviewsCount, 0)),
      badge: strOrNull(body.badge, 40),
      discount: oldPrice !== null && oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0,
      isNew: bool(body.isNew),
      isPromo: bool(body.isPromo),
      isBestSeller: bool(body.isBestSeller),
      isFlash: bool(body.isFlash),
      specs: specsFrom(body.specs),
      i18n: cleanI18n({
        name: str(e.name, 255),
        shortDescription: str(e.shortDescription, 500),
        description: str(e.description, 5000),
        badge: str(e.badge, 40),
        specs: specsFrom(e.specs),
      }),
    },
  };
}

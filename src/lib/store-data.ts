import "server-only";
import { asc, SQL } from "drizzle-orm";
import { db } from "@/db";
import { products, stores, categories, brands, slides } from "@/db/schema";
import type { Locale } from "@/i18n/config";
import { localizeCategory, localizeProduct, localizeSlide, localizeStore } from "./localize";

/** Exécute une requête et renvoie une valeur de repli si la base est indisponible. */
export async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

const cardColumns = {
  id: products.id,
  name: products.name,
  slug: products.slug,
  reference: products.reference,
  shortDescription: products.shortDescription,
  description: products.description,
  price: products.price,
  oldPrice: products.oldPrice,
  image: products.image,
  rating: products.rating,
  reviewsCount: products.reviewsCount,
  badge: products.badge,
  discount: products.discount,
  stock: products.stock,
  isNew: products.isNew,
  isPromo: products.isPromo,
  i18n: products.i18n,
};

/** Produits pour les cartes (localisés), filtrés et triés. */
export function productCards(locale: Locale, where: SQL | undefined, order: SQL, limit: number) {
  return safe(async () => {
    const rows = await db.select(cardColumns).from(products).where(where).orderBy(order).limit(limit);
    return rows.map((row) => {
      const loc = localizeProduct({ ...row, specs: null }, locale);
      return {
        id: loc.id,
        name: loc.name,
        slug: loc.slug,
        reference: loc.reference,
        price: loc.price,
        oldPrice: loc.oldPrice,
        image: loc.image,
        rating: loc.rating,
        reviewsCount: loc.reviewsCount,
        badge: loc.badge,
        discount: loc.discount,
        stock: loc.stock,
        isNew: loc.isNew,
        isPromo: loc.isPromo,
      };
    });
  }, []);
}

export function categoriesFor(locale: Locale) {
  return safe(async () => {
    const rows = await db.select().from(categories).orderBy(asc(categories.order), asc(categories.id));
    return rows.map((r) => localizeCategory(r, locale));
  }, []);
}

export function brandsAll() {
  return safe(() => db.select().from(brands).orderBy(asc(brands.name)), []);
}

export function slidesFor(locale: Locale) {
  return safe(async () => {
    const rows = await db.select().from(slides).orderBy(asc(slides.order), asc(slides.id));
    return rows.filter((r) => r.active !== false).map((r) => localizeSlide(r, locale));
  }, []);
}

export function storesFor(locale: Locale) {
  return safe(async () => {
    const rows = await db.select().from(stores).orderBy(asc(stores.order), asc(stores.id));
    return rows.map((r) => localizeStore(r, locale));
  }, []);
}


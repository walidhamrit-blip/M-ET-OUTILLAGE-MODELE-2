import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { products, brands, categories } from "@/db/schema";
import { eq, ilike, or, and, desc, asc, sql, inArray, SQL } from "drizzle-orm";
import { localeFromRequest } from "@/lib/request-locale";
import { localizeProduct } from "@/lib/localize";

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const locale = localeFromRequest(req);
  const search = (sp.get("search") || "").trim().slice(0, 100);
  const category = sp.get("categorie") || "";
  const brand = sp.get("marque") || "";
  const flag = sp.get("flag") || "";
  const sort = sp.get("sort") || "new";
  const limit = Math.min(Math.max(parseInt(sp.get("limit") || "24", 10) || 24, 1), 60);
  const page = Math.max(parseInt(sp.get("page") || "1", 10) || 1, 1);
  const offset = (page - 1) * limit;

  const conditions: SQL[] = [];
  if (search) {
    const like = `%${search}%`;
    // Recherche dans le nom, la référence et toutes les traductions (AR et EN).
    conditions.push(
      or(ilike(products.name, like), ilike(products.reference, like), sql`${products.i18n}::text ilike ${like}`)!,
    );
  }
  if (category) {
    const cat = await db.select().from(categories).where(eq(categories.slug, category)).limit(1);
    if (cat[0]) conditions.push(eq(products.categoryId, cat[0].id));
  }
  if (brand) {
    const b = await db.select().from(brands).where(eq(brands.slug, brand)).limit(1);
    if (b[0]) conditions.push(eq(products.brandId, b[0].id));
  }
  const ids = (sp.get("ids") || "")
    .split(",")
    .map((v) => parseInt(v, 10))
    .filter((v) => Number.isInteger(v) && v > 0)
    .slice(0, 100);
  if (ids.length) conditions.push(inArray(products.id, ids));
  if (flag === "promo") conditions.push(eq(products.isPromo, true));
  if (flag === "new") conditions.push(eq(products.isNew, true));
  if (flag === "best") conditions.push(eq(products.isBestSeller, true));
  if (flag === "flash") conditions.push(eq(products.isFlash, true));

  const orderBy =
    sort === "price-asc" ? asc(products.price)
    : sort === "price-desc" ? desc(products.price)
    : sort === "promo" ? desc(products.discount)
    : desc(products.id);

  const where = conditions.length ? and(...conditions) : undefined;

  const rows = await db
    .select({
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
      brandName: brands.name,
    })
    .from(products)
    .leftJoin(brands, eq(products.brandId, brands.id))
    .where(where)
    .orderBy(orderBy)
    .limit(limit)
    .offset(offset);

  const countRes = await db.select({ count: sql<number>`count(*)` }).from(products).where(where);
  const total = Number(countRes[0]?.count || 0);

  const items = rows.map((row) => {
    const loc = localizeProduct({ ...row, specs: null }, locale);
    return {
      id: loc.id,
      name: loc.name,
      slug: loc.slug,
      reference: loc.reference,
      shortDescription: loc.shortDescription,
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
      brandName: loc.brandName,
    };
  });

  return NextResponse.json({
    products: items,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}

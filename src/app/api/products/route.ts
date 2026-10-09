import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { products, brands, categories } from "@/db/schema";
import { eq, ilike, or, and, desc, asc, sql } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const search = sp.get("search") || "";
  const category = sp.get("categorie") || "";
  const brand = sp.get("marque") || "";
  const flag = sp.get("flag") || "";
  const sort = sp.get("sort") || "new";
  const limit = Math.min(parseInt(sp.get("limit") || "24"), 60);
  const page = Math.max(parseInt(sp.get("page") || "1"), 1);
  const offset = (page - 1) * limit;

  const conditions: any[] = [];
  if (search) {
    conditions.push(or(ilike(products.name, `%${search}%`), ilike(products.reference, `%${search}%`)));
  }
  if (category) {
    const cat = await db.select().from(categories).where(eq(categories.slug, category)).limit(1);
    if (cat[0]) conditions.push(eq(products.categoryId, cat[0].id));
  }
  if (brand) {
    const b = await db.select().from(brands).where(eq(brands.slug, brand)).limit(1);
    if (b[0]) conditions.push(eq(products.brandId, b[0].id));
  }
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
      brandName: brands.name,
    })
    .from(products)
    .leftJoin(brands, eq(products.brandId, brands.id))
    .where(where)
    .orderBy(orderBy)
    .limit(limit)
    .offset(offset);

  const countRes = await db
    .select({ count: sql<number>`count(*)` })
    .from(products)
    .where(where);

  return NextResponse.json({
    products: rows,
    total: Number(countRes[0]?.count || 0),
    page,
    totalPages: Math.ceil(Number(countRes[0]?.count || 0) / limit),
  });
}

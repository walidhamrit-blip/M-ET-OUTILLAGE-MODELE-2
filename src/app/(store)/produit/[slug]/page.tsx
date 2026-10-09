import { db } from "@/db";
import { products, brands, categories } from "@/db/schema";
import { eq, and, ne, desc } from "drizzle-orm";
import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";
import ProductSection from "@/components/ProductSection";
import { getI18n } from "@/i18n/server";
import { localizeCategory, localizeProduct } from "@/lib/localize";
import { productCards, safe } from "@/lib/store-data";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { t, locale } = await getI18n();

  const rows = await safe(() => db.select().from(products).where(eq(products.slug, slug)).limit(1), []);
  const row = rows[0];
  if (!row) return notFound();

  const [brand, category] = await Promise.all([
    row.brandId
      ? safe(async () => (await db.select().from(brands).where(eq(brands.id, row.brandId!)).limit(1))[0] ?? null, null)
      : null,
    row.categoryId
      ? safe(async () => (await db.select().from(categories).where(eq(categories.id, row.categoryId!)).limit(1))[0] ?? null, null)
      : null,
  ]);

  const product = localizeProduct(row, locale);
  const catLocal = category ? localizeCategory(category, locale) : null;

  const related = row.categoryId
    ? await productCards(
        locale,
        and(eq(products.categoryId, row.categoryId), ne(products.id, row.id)),
        desc(products.id),
        10,
      )
    : [];

  return (
    <>
      <ProductDetailClient
        product={{
          id: product.id,
          name: product.name,
          slug: product.slug,
          reference: product.reference,
          shortDescription: product.shortDescription,
          description: product.description,
          price: product.price,
          oldPrice: product.oldPrice,
          image: product.image,
          images: row.images,
          rating: product.rating,
          reviewsCount: product.reviewsCount,
          badge: product.badge,
          discount: product.discount,
          stock: product.stock,
          isNew: product.isNew,
          specs: product.specs,
        }}
        brandName={brand?.name ?? null}
        catName={catLocal?.name ?? null}
        catSlug={category?.slug ?? null}
      />
      <ProductSection title={t("catalog.similar")} products={related} link={category ? `/categorie/${category.slug}` : "/recherche"} />
    </>
  );
}

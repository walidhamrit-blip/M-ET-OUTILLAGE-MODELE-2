import { db } from "@/db";
import { products, brands, categories } from "@/db/schema";
import { eq, and, ne } from "drizzle-orm";
import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";
import ProductSection from "@/components/ProductSection";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let product: any = null;
  let brandName: string | null = null;
  let catName: string | null = null;
  let catSlug: string | null = null;
  let related: any[] = [];

  try {
    const rows = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
    product = rows[0] || null;
    if (product) {
      if (product.brandId) {
        const b = await db.select().from(brands).where(eq(brands.id, product.brandId)).limit(1);
        brandName = b[0]?.name || null;
      }
      if (product.categoryId) {
        const c = await db.select().from(categories).where(eq(categories.id, product.categoryId)).limit(1);
        catName = c[0]?.name || null;
        catSlug = c[0]?.slug || null;
        related = await db
          .select({
            id: products.id, name: products.name, slug: products.slug, reference: products.reference,
            price: products.price, oldPrice: products.oldPrice, image: products.image,
            rating: products.rating, reviewsCount: products.reviewsCount, badge: products.badge,
            discount: products.discount, stock: products.stock, isNew: products.isNew, isPromo: products.isPromo,
          })
          .from(products)
          .where(and(eq(products.categoryId, product.categoryId), ne(products.id, product.id)))
          .limit(10);
      }
    }
  } catch {}

  if (!product) return notFound();

  return (
    <>
      <ProductDetailClient product={product} brandName={brandName} catName={catName} catSlug={catSlug} />
      <ProductSection title="Produits similaires" products={related} link={catSlug ? `/categorie/${catSlug}` : "/recherche"} />
    </>
  );
}

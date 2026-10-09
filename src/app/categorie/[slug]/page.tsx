import { db } from "@/db";
import { categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import ListingClient from "@/components/ListingClient";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let cat = null;
  try {
    const rows = await db.select().from(categories).where(eq(categories.slug, slug)).limit(1);
    cat = rows[0] || null;
  } catch {}
  if (!cat && slug) {
    // allow page even if DB empty, with pretty title
    const pretty = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return <ListingClient categorySlug={slug} title={pretty} />;
  }
  if (!cat) return notFound();
  return (
    <>
      {/* Category hero */}
      <div className="mx-auto max-w-[1280px] px-4 mt-3">
        <div className="relative overflow-hidden rounded-[4px] h-[130px] sm:h-[170px]">
          <img
            src={cat.image || "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1400&q=70&auto=format&fit=crop"}
            alt={cat.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-6">
            <h1 className="text-white font-black text-[24px] sm:text-[32px] uppercase">{cat.name}</h1>
            <p className="text-white/80 text-[13px]">Les meilleurs prix à Tripoli — Stock disponible, livraison 24h</p>
          </div>
        </div>
      </div>
      <ListingClient categorySlug={slug} title={cat.name} />
    </>
  );
}

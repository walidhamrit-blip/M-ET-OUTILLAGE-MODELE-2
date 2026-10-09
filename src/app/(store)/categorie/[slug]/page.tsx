import { db } from "@/db";
import { categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import ListingClient from "@/components/ListingClient";
import { notFound } from "next/navigation";
import { getI18n } from "@/i18n/server";
import { localizeCategory } from "@/lib/localize";
import { safe } from "@/lib/store-data";

export const dynamic = "force-dynamic";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { t, locale } = await getI18n();
  const rows = await safe(() => db.select().from(categories).where(eq(categories.slug, slug)).limit(1), []);
  const row = rows[0];
  if (!row) {
    // Rayon absent de la base : titre de repli à partir du slug.
    const pretty = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return <ListingClient categorySlug={slug} title={pretty} />;
  }
  const cat = localizeCategory(row, locale);
  return (
    <>
      {/* Bandeau du rayon */}
      <div className="mx-auto max-w-[1280px] px-4 mt-3">
        <div className="relative overflow-hidden rounded-[4px] h-[130px] sm:h-[170px]">
          <img
            src={cat.image || "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1400&q=70&auto=format&fit=crop"}
            alt={cat.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l from-black/75 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-6">
            <h1 className="text-white font-black text-[24px] sm:text-[32px]">{cat.name}</h1>
            <p className="text-white/80 text-[13px]">{t("catalog.categoryHero")}</p>
          </div>
        </div>
      </div>
      <ListingClient categorySlug={slug} title={cat.name} />
    </>
  );
}

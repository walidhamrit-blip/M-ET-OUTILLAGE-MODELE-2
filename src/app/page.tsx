import { db } from "@/db";
import { products, categories, brands, slides } from "@/db/schema";
import { eq, desc, asc } from "drizzle-orm";
import HeroSlider from "@/components/HeroSlider";
import CategoryCircles from "@/components/CategoryCircles";
import ProductSection from "@/components/ProductSection";
import FlashSale from "@/components/FlashSale";
import BrandsCarousel from "@/components/BrandsCarousel";
import ServicesBar from "@/components/ServicesBar";
import PromoTiles from "@/components/PromoTiles";
import Link from "next/link";
import { MapPin, Truck, BadgeCheck } from "lucide-react";

export const dynamic = "force-dynamic";

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

export default async function HomePage() {
  const [cats, brandRows, slideRows, promo, best, news, flash] = await Promise.all([
    safe(() => db.select().from(categories).orderBy(asc(categories.order)), []),
    safe(() => db.select().from(brands).orderBy(asc(brands.name)), []),
    safe(() => db.select().from(slides).orderBy(asc(slides.order)), []),
    safe(
      () =>
        db
          .select({
            id: products.id, name: products.name, slug: products.slug, reference: products.reference,
            price: products.price, oldPrice: products.oldPrice, image: products.image,
            rating: products.rating, reviewsCount: products.reviewsCount, badge: products.badge,
            discount: products.discount, stock: products.stock, isNew: products.isNew, isPromo: products.isPromo,
          })
          .from(products).where(eq(products.isPromo, true)).orderBy(desc(products.discount)).limit(12),
      []
    ),
    safe(
      () =>
        db
          .select({
            id: products.id, name: products.name, slug: products.slug, reference: products.reference,
            price: products.price, oldPrice: products.oldPrice, image: products.image,
            rating: products.rating, reviewsCount: products.reviewsCount, badge: products.badge,
            discount: products.discount, stock: products.stock, isNew: products.isNew, isPromo: products.isPromo,
          })
          .from(products).where(eq(products.isBestSeller, true)).orderBy(desc(products.id)).limit(12),
      []
    ),
    safe(
      () =>
        db
          .select({
            id: products.id, name: products.name, slug: products.slug, reference: products.reference,
            price: products.price, oldPrice: products.oldPrice, image: products.image,
            rating: products.rating, reviewsCount: products.reviewsCount, badge: products.badge,
            discount: products.discount, stock: products.stock, isNew: products.isNew, isPromo: products.isPromo,
          })
          .from(products).where(eq(products.isNew, true)).orderBy(desc(products.id)).limit(12),
      []
    ),
    safe(
      () =>
        db
          .select({
            id: products.id, name: products.name, slug: products.slug, reference: products.reference,
            price: products.price, oldPrice: products.oldPrice, image: products.image,
            rating: products.rating, reviewsCount: products.reviewsCount, badge: products.badge,
            discount: products.discount, stock: products.stock, isNew: products.isNew, isPromo: products.isPromo,
          })
          .from(products).where(eq(products.isFlash, true)).orderBy(desc(products.discount)).limit(10),
      []
    ),
  ]);

  return (
    <>
      <HeroSlider slides={slideRows as any} />

      {/* Info strip like Mytek */}
      <div className="mx-auto max-w-[1280px] px-4 mt-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[13px]">
          <div className="bg-[#2f3d4c] text-white rounded px-4 py-2.5 flex items-center gap-2.5">
            <MapPin size={18} className="text-[#ffea00] shrink-0" />
            <span><b>4 magasins à Tripoli</b> — Janzour, Ain Zara, Tajoura, Gargaresh</span>
          </div>
          <div className="bg-[#2f3d4c] text-white rounded px-4 py-2.5 flex items-center gap-2.5">
            <Truck size={18} className="text-[#ffea00] shrink-0" />
            <span><b>Livraison 24h à Tripoli</b> — offerte dès 500 د.ل d&apos;achat</span>
          </div>
          <div className="bg-[#e30613] text-white rounded px-4 py-2.5 flex items-center gap-2.5">
            <BadgeCheck size={18} className="text-[#ffea00] shrink-0" />
            <span><b>Prix chantier pros</b> — Devis entreprise en 2h</span>
          </div>
        </div>
      </div>

      <CategoryCircles categories={cats} />

      <FlashSale products={flash as any} />

      <PromoTiles />

      <ProductSection
        title="Nos promotions"
        subtitle="Les meilleures remises matériaux & outillage — quantités limitées"
        products={promo as any}
        link="/promotions"
      />

      <ProductSection
        title="Meilleures ventes"
        subtitle="Les produits préférés des artisans & bricoleurs libyens"
        products={best as any}
        link="/recherche?tri=best"
      />

      {/* Wide banner */}
      <div className="mx-auto max-w-[1280px] px-4 mt-6">
        <Link href="/entreprise" className="group relative block overflow-hidden rounded-[4px] h-[140px] sm:h-[180px]">
          <img
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1400&q=70&auto=format&fit=crop"
            alt="Service entreprise"
            className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2f3d4c]/95 via-[#2f3d4c]/60 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10">
            <div className="bg-[#ffea00] text-black text-[11px] font-black px-2 py-[3px] rounded-sm w-fit uppercase tracking-widest">Service entreprise</div>
            <div className="text-white font-black text-[22px] sm:text-[32px] mt-1">Vos chantiers livrés à prix pros</div>
            <div className="text-white/80 text-[13px] sm:text-[15px]">Devis en 2h — Comptes pros — Livraison chantier à Tripoli & environs</div>
          </div>
          <span className="absolute right-6 top-1/2 -translate-y-1/2 hidden sm:inline-block bg-[#e30613] group-hover:bg-[#ffea00] group-hover:text-black text-white font-bold text-[14px] px-6 py-3 rounded-sm transition">
            Demander un devis
          </span>
        </Link>
      </div>

      <ProductSection
        title="Nouveautés"
        subtitle="Les derniers arrivages dans nos magasins de Tripoli"
        products={news as any}
        link="/recherche?tri=new"
      />

      <BrandsCarousel brands={brandRows} />

      <ServicesBar />

      {/* Stores teaser */}
      <div className="mx-auto max-w-[1280px] px-4 mt-6">
        <div className="bg-white rounded-[4px] border border-gray-200 p-5 grid md:grid-cols-2 gap-5 items-center">
          <div>
            <h2 className="text-[19px] font-black uppercase">Nos magasins <span className="text-[#e30613]">à Tripoli</span></h2>
            <p className="text-[13px] text-gray-500 mt-1">4 adresses pour vous servir — parking, retrait 1h, conseillers chantier.</p>
            <ul className="mt-3 space-y-2 text-[13px]">
              {[
                "MATEK Janzour — Route côtière, km 12",
                "MATEK Ain Zara — Route de l'Aéroport, km 7",
                "MATEK Tajoura — Zone industrielle",
                "MATEK Gargaresh — Rue principale",
              ].map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#e30613]" /> {s}
                </li>
              ))}
            </ul>
            <Link href="/magasins" className="inline-block mt-4 bg-[#2f3d4c] hover:bg-[#e30613] text-white font-bold text-[13px] px-6 py-2.5 rounded transition">
              Voir les magasins
            </Link>
          </div>
          <div className="rounded overflow-hidden h-[220px]">
            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=70&auto=format&fit=crop" alt="Magasin Matek Tripoli" className="w-full h-full object-cover hover:scale-105 transition duration-700" />
          </div>
        </div>
      </div>
    </>
  );
}

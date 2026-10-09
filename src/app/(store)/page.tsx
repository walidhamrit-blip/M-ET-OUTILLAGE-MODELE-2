import { desc, eq } from "drizzle-orm";
import HeroSlider from "@/components/HeroSlider";
import CategoryCircles from "@/components/CategoryCircles";
import ProductSection from "@/components/ProductSection";
import FlashSale from "@/components/FlashSale";
import BrandsCarousel from "@/components/BrandsCarousel";
import ServicesBar from "@/components/ServicesBar";
import PromoTiles from "@/components/PromoTiles";
import Link from "next/link";
import { MapPin, Truck, BadgeCheck } from "lucide-react";
import { getI18n } from "@/i18n/server";
import { getSettings } from "@/lib/settings";
import { products } from "@/db/schema";
import { brandsAll, categoriesFor, productCards, slidesFor, storesFor } from "@/lib/store-data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { t, locale, money } = await getI18n();
  const settings = await getSettings();
  const [cats, brandRows, slideRows, promo, best, news, flash, storeRows] = await Promise.all([
    categoriesFor(locale),
    brandsAll(),
    slidesFor(locale),
    productCards(locale, eq(products.isPromo, true), desc(products.discount), 12),
    productCards(locale, eq(products.isBestSeller, true), desc(products.id), 12),
    productCards(locale, eq(products.isNew, true), desc(products.id), 12),
    productCards(locale, eq(products.isFlash, true), desc(products.discount), 10),
    storesFor(locale),
  ]);

  return (
    <>
      <HeroSlider slides={slideRows} />

      {/* Bandeau d'information */}
      <div className="mx-auto max-w-[1280px] px-4 mt-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[13px]">
          <div className="bg-[#2f3d4c] text-white rounded px-4 py-2.5 flex items-center gap-2.5">
            <MapPin size={18} className="text-[#ffea00] shrink-0" />
            <span><b>{t("home.infoStores")}</b> {t("home.infoStoresDetail")}</span>
          </div>
          <div className="bg-[#2f3d4c] text-white rounded px-4 py-2.5 flex items-center gap-2.5">
            <Truck size={18} className="text-[#ffea00] shrink-0" />
            <span>
              <b>{t("home.infoDelivery")}</b>{" "}
              {t("home.infoDeliveryDetail", { amount: money(settings.delivery.freeThreshold) })}
            </span>
          </div>
          <div className="bg-[#e30613] text-white rounded px-4 py-2.5 flex items-center gap-2.5">
            <BadgeCheck size={18} className="text-[#ffea00] shrink-0" />
            <span><b>{t("home.infoPro")}</b> {t("home.infoProDetail")}</span>
          </div>
        </div>
      </div>

      <CategoryCircles categories={cats} />

      <FlashSale products={flash} />

      <PromoTiles />

      <ProductSection title={t("home.promosTitle")} subtitle={t("home.promosSubtitle")} products={promo} link="/promotions" />

      <ProductSection title={t("home.bestTitle")} subtitle={t("home.bestSubtitle")} products={best} link="/recherche?tri=best" />

      {/* Bannière entreprise */}
      <div className="mx-auto max-w-[1280px] px-4 mt-6">
        <Link href="/entreprise" className="group relative block overflow-hidden rounded-[4px] h-[140px] sm:h-[180px]">
          <img
            src={settings.home.bannerImage}
            alt={t("home.bannerTag")}
            className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l from-[#2f3d4c]/95 via-[#2f3d4c]/60 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10">
            <div className="bg-[#ffea00] text-black text-[11px] font-black px-2 py-[3px] rounded-sm w-fit uppercase tracking-widest">{t("home.bannerTag")}</div>
            <div className="text-white font-black text-[22px] sm:text-[32px] mt-1">{t("home.bannerTitle")}</div>
            <div className="text-white/80 text-[13px] sm:text-[15px]">{t("home.bannerText")}</div>
          </div>
          <span className="absolute end-6 top-1/2 -translate-y-1/2 hidden sm:inline-block bg-[#e30613] group-hover:bg-[#ffea00] group-hover:text-black text-white font-bold text-[14px] px-6 py-3 rounded-sm transition">
            {t("home.bannerCta")}
          </span>
        </Link>
      </div>

      <ProductSection title={t("home.newTitle")} subtitle={t("home.newSubtitle")} products={news} link="/recherche?tri=new" />

      <BrandsCarousel brands={brandRows} />

      <ServicesBar />

      {/* Aperçu des magasins */}
      <div className="mx-auto max-w-[1280px] px-4 mt-6">
        <div className="bg-white dark:bg-[#1a222c] rounded-[4px] border border-gray-200 dark:border-[#2c3644] p-5 grid md:grid-cols-2 gap-5 items-center">
          <div>
            <h2 className="text-[19px] font-black">{t("home.storesTitle")}</h2>
            <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-1">{t("home.storesText")}</p>
            <ul className="mt-3 space-y-2 text-[13px]">
              {storeRows.map((s) => (
                <li key={s.name} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#e30613] shrink-0" /> <span className="font-semibold">{s.name}</span>
                  {s.address && <span className="text-gray-500 dark:text-gray-400">— {s.address}</span>}
                </li>
              ))}
            </ul>
            <Link href="/magasins" className="inline-block mt-4 bg-[#2f3d4c] hover:bg-[#e30613] text-white font-bold text-[13px] px-6 py-2.5 rounded transition">
              {t("home.storesCta")}
            </Link>
          </div>
          <div className="rounded overflow-hidden h-[220px]">
            <img src={settings.home.storeImage} alt={t("home.storesAlt")} className="w-full h-full object-cover hover:scale-105 transition duration-700" />
          </div>
        </div>
      </div>
    </>
  );
}

import ListingClient from "@/components/ListingClient";
import { getI18n } from "@/i18n/server";

export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; marque?: string; tri?: string; categorie?: string }>;
}) {
  const sp = await searchParams;
  const { t } = await getI18n();
  const q = (sp.q || "").slice(0, 100);
  const brand = (sp.marque || "").slice(0, 100);
  const category = (sp.categorie || "").slice(0, 100);
  const tri = sp.tri || "";
  const flag = tri === "best" ? "best" : tri === "new" ? "new" : "";

  let title = t("catalog.titleAll");
  if (q) title = t("catalog.resultsFor", { query: q });
  else if (brand) title = t("catalog.brandTitle", { brand: brand.charAt(0).toUpperCase() + brand.slice(1) });
  else if (tri === "best") title = t("home.bestTitle");
  else if (tri === "new") title = t("home.newTitle");

  return (
    <ListingClient
      initialSearch={q}
      initialBrand={brand}
      initialFlag={flag}
      categorySlug={category || undefined}
      title={title}
    />
  );
}

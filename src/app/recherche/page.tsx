import ListingClient from "@/components/ListingClient";

export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; marque?: string; tri?: string }>;
}) {
  const sp = await searchParams;
  const q = sp.q || "";
  const brand = sp.marque || "";
  const tri = sp.tri || "";
  const flag = tri === "best" ? "best" : tri === "new" ? "new" : "";

  let title = "Tous les produits";
  if (q) title = `Résultats pour "${q}"`;
  else if (brand) title = `Marque ${brand.charAt(0).toUpperCase() + brand.slice(1)}`;
  else if (tri === "best") title = "Meilleures ventes";
  else if (tri === "new") title = "Nouveautés";

  return <ListingClient initialSearch={q} initialBrand={brand} initialFlag={flag} title={title} />;
}

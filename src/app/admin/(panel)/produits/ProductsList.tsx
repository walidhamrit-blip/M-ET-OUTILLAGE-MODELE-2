"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Search, Pencil } from "lucide-react";
import { Badge, Button, Empty, Notice, PageHeader, api } from "@/components/admin/ui";

type Product = {
  id: number;
  name: string;
  slug: string;
  reference: string | null;
  price: string;
  oldPrice: string | null;
  image: string | null;
  stock: number | null;
  categoryId: number | null;
  brandId: number | null;
  isNew: boolean | null;
  isPromo: boolean | null;
  isBestSeller: boolean | null;
  isFlash: boolean | null;
  i18n: { en?: { name?: string } } | null;
};
type Named = { id: number; name: string };

export default function ProductsList() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [cats, setCats] = useState<Named[]>([]);
  const [brands, setBrands] = useState<Named[]>([]);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      api<Product[]>("/api/admin/products"),
      api<Named[]>("/api/admin/categories"),
      api<Named[]>("/api/admin/brands"),
    ])
      .then(([p, c, b]) => {
        setProducts(p);
        setCats(c);
        setBrands(b);
      })
      .catch((e: Error) => setError(e.message));
  }, []);

  const catName = useMemo(() => new Map(cats.map((c) => [c.id, c.name])), [cats]);
  const brandName = useMemo(() => new Map(brands.map((b) => [b.id, b.name])), [brands]);

  const filtered = useMemo(() => {
    if (!products) return [];
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (cat && String(p.categoryId) !== cat) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        (p.i18n?.en?.name ?? "").toLowerCase().includes(q) ||
        (p.reference ?? "").toLowerCase().includes(q) ||
        p.slug.includes(q)
      );
    });
  }, [products, query, cat]);

  return (
    <>
      <PageHeader
        title="Produits"
        subtitle={products ? `${products.length} produit(s) au catalogue.` : undefined}
        actions={
          <Link href="/admin/produits/nouveau" className="inline-flex items-center gap-1.5 rounded-md bg-[#e30613] hover:bg-[#b3050f] px-4 py-2 text-sm font-semibold text-white">
            <Plus size={16} /> Nouveau produit
          </Link>
        }
      />
      {error && <div className="mb-4"><Notice kind="error">{error}</Notice></div>}

      <div className="flex flex-wrap gap-2 mb-4">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher par nom (AR ou EN), référence, slug…"
            className="w-full rounded-md border border-gray-300 dark:border-[#2c3644] bg-white dark:bg-[#1a222c] ps-9 pe-3 py-2 text-sm outline-none focus:border-[#e30613]"
          />
        </div>
        <select value={cat} onChange={(e) => setCat(e.target.value)} className="rounded-md border border-gray-300 dark:border-[#2c3644] bg-white dark:bg-[#1a222c] px-3 py-2 text-sm">
          <option value="">Tous les rayons</option>
          {cats.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      {!products ? (
        <p className="text-sm text-gray-500">Chargement…</p>
      ) : filtered.length === 0 ? (
        <Empty>Aucun produit ne correspond.</Empty>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-[#2c3644] bg-white dark:bg-[#1a222c]">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-[#202a36] text-start text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-3 py-2.5 text-start font-bold">Produit</th>
                <th className="px-3 py-2.5 text-start font-bold">Référence</th>
                <th className="px-3 py-2.5 text-start font-bold">Rayon / marque</th>
                <th className="px-3 py-2.5 text-end font-bold">Prix</th>
                <th className="px-3 py-2.5 text-center font-bold">Stock</th>
                <th className="px-3 py-2.5 text-start font-bold">Indicateurs</th>
                <th className="px-3 py-2.5 text-end font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-[#2c3644]">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/70 dark:hover:bg-white/5">
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 shrink-0 overflow-hidden rounded border border-gray-200 dark:border-[#2c3644] bg-gray-50">
                        {p.image && <img src={p.image} alt="" className="h-full w-full object-cover" />}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold truncate max-w-[300px]" dir="rtl">{p.name}</div>
                        <div className="text-xs text-gray-500 truncate max-w-[300px]">{p.i18n?.en?.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2.5"><code className="text-xs" dir="ltr">{p.reference ?? "—"}</code></td>
                  <td className="px-3 py-2.5 text-xs text-gray-600 dark:text-gray-400">
                    <div>{p.categoryId ? catName.get(p.categoryId) : "—"}</div>
                    <div>{p.brandId ? brandName.get(p.brandId) : ""}</div>
                  </td>
                  <td className="px-3 py-2.5 text-end whitespace-nowrap">
                    <div className="font-bold" dir="ltr">{Number(p.price).toFixed(2)}</div>
                    {p.oldPrice && <div className="text-xs text-gray-400 line-through" dir="ltr">{Number(p.oldPrice).toFixed(2)}</div>}
                  </td>
                  <td className="px-3 py-2.5 text-center">
                    {(p.stock ?? 0) > 0 ? <span>{p.stock}</span> : <Badge tone="red">Rupture</Badge>}
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="flex flex-wrap gap-1">
                      {p.isNew && <Badge tone="dark">Nouveau</Badge>}
                      {p.isPromo && <Badge tone="red">Promo</Badge>}
                      {p.isBestSeller && <Badge tone="amber">Best</Badge>}
                      {p.isFlash && <Badge tone="blue">Flash</Badge>}
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-end">
                    <Link href={`/admin/produits/${p.id}`} className="inline-flex items-center gap-1 rounded-md border border-gray-300 dark:border-[#2c3644] px-2.5 py-1.5 text-xs font-semibold hover:bg-gray-50 dark:hover:bg-white/10">
                      <Pencil size={13} /> Modifier
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-3"><Button size="sm" variant="ghost" onClick={() => setQuery("")} className={query ? "" : "invisible"}>Effacer la recherche</Button></div>
    </>
  );
}

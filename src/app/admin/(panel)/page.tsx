import Link from "next/link";
import { desc, sql } from "drizzle-orm";
import type { PgTable } from "drizzle-orm/pg-core";
import { db } from "@/db";
import { brands, categories, newsletter, orders, products, stores, uiTexts } from "@/db/schema";
import { PageHeader, Card, Badge } from "@/components/admin/ui";
import { safe } from "@/lib/store-data";
import { getSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

const STATUS_TONE: Record<string, "gray" | "green" | "red" | "amber" | "blue"> = {
  pending: "amber", confirmed: "blue", delivering: "blue", delivered: "green", cancelled: "red",
};

export default async function DashboardPage() {
  const count = (table: PgTable) =>
    safe(async () => Number((await db.select({ n: sql<number>`count(*)` }).from(table))[0]?.n ?? 0), 0);
  const [nProducts, nCategories, nBrands, nStores, nOrders, nSubs, nTexts, recent] = await Promise.all([
    count(products),
    count(categories),
    count(brands),
    count(stores),
    count(orders),
    count(newsletter),
    count(uiTexts),
    safe(() => db.select().from(orders).orderBy(desc(orders.id)).limit(6), []),
  ]);
  const settings = await getSettings();

  const tiles = [
    { href: "/admin/produits", label: "Produits", value: nProducts },
    { href: "/admin/rayons", label: "Rayons", value: nCategories },
    { href: "/admin/marques", label: "Marques", value: nBrands },
    { href: "/admin/magasins", label: "Magasins", value: nStores },
    { href: "/admin/commandes", label: "Commandes", value: nOrders },
    { href: "/admin/newsletter", label: "Abonnés newsletter", value: nSubs },
  ];

  return (
    <>
      <PageHeader title="Tableau de bord" subtitle={`Bienvenue dans l'administration de ${settings.company.name}.`} />

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {tiles.map((t) => (
          <Link key={t.href} href={t.href} className="rounded-lg border border-gray-200 dark:border-[#2c3644] bg-white dark:bg-[#1a222c] p-4 hover:border-[#e30613] transition">
            <div className="text-xs font-bold uppercase tracking-wide text-gray-500">{t.label}</div>
            <div className="mt-1 text-3xl font-black">{t.value}</div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mt-6">
        <Card title="Dernières commandes" actions={<Link href="/admin/commandes" className="text-sm font-semibold text-[#e30613]">Tout voir →</Link>}>
          {recent.length === 0 ? (
            <p className="text-sm text-gray-500">Aucune commande pour le moment.</p>
          ) : (
            <ul className="divide-y divide-gray-100 dark:divide-[#2c3644]">
              {recent.map((o) => (
                <li key={o.id} className="py-2.5 flex items-center justify-between gap-3 text-sm">
                  <Link href={`/admin/commandes/${o.id}`} className="font-bold hover:text-[#e30613]" dir="ltr">{o.orderNumber}</Link>
                  <span className="truncate text-gray-600 dark:text-gray-400">{o.customerName}</span>
                  <Badge tone={STATUS_TONE[o.status ?? "pending"] ?? "gray"}>{o.status}</Badge>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title="Accès rapides">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <Link href="/admin/textes" className="rounded-md border border-gray-200 dark:border-[#2c3644] p-3 hover:border-[#e30613]">Modifier les textes (AR / EN)</Link>
            <Link href="/admin/parametres" className="rounded-md border border-gray-200 dark:border-[#2c3644] p-3 hover:border-[#e30613]">Coordonnées, livraison, accueil</Link>
            <Link href="/admin/produits/nouveau" className="rounded-md border border-gray-200 dark:border-[#2c3644] p-3 hover:border-[#e30613]">Ajouter un produit</Link>
            <Link href="/admin/diaporama" className="rounded-md border border-gray-200 dark:border-[#2c3644] p-3 hover:border-[#e30613]">Gérer le diaporama</Link>
          </div>
          <p className="mt-4 text-xs text-gray-500">{nTexts} texte(s) personnalisé(s) sur l&apos;ensemble de l&apos;interface.</p>
        </Card>
      </div>
    </>
  );
}

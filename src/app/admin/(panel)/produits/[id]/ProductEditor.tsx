"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ExternalLink, Save, Trash2 } from "lucide-react";
import { Badge, Button, Card, Field, Grid2, ImageField, ImageListField, Input, Notice, PageHeader, Select, SpecsField, Textarea, Toggle, api, numStr } from "@/components/admin/ui";

type Named = { id: number; name: string };
type ProductRow = {
  id: number; name: string; slug: string; reference: string | null; shortDescription: string | null; description: string | null;
  price: string; oldPrice: string | null; categoryId: number | null; brandId: number | null; image: string | null; images: string[] | null;
  stock: number | null; rating: string | null; reviewsCount: number | null; badge: string | null; discount: number | null;
  isNew: boolean | null; isPromo: boolean | null; isBestSeller: boolean | null; isFlash: boolean | null;
  specs: Record<string, string> | null;
  i18n: { en?: { name?: string; shortDescription?: string; description?: string; badge?: string; specs?: Record<string, string> } } | null;
};

type Draft = {
  name: string; nameEn: string; slug: string; reference: string; categoryId: string; brandId: string;
  price: string; oldPrice: string; stock: string; rating: string; reviewsCount: string;
  badge: string; badgeEn: string;
  isNew: boolean; isPromo: boolean; isBestSeller: boolean; isFlash: boolean;
  image: string; images: string[];
  shortDescription: string; shortDescriptionEn: string; description: string; descriptionEn: string;
  specs: Record<string, string>; specsEn: Record<string, string>;
};

const emptyDraft = (): Draft => ({
  name: "", nameEn: "", slug: "", reference: "", categoryId: "", brandId: "",
  price: "", oldPrice: "", stock: "10", rating: "4.5", reviewsCount: "0",
  badge: "", badgeEn: "", isNew: true, isPromo: false, isBestSeller: false, isFlash: false,
  image: "", images: [], shortDescription: "", shortDescriptionEn: "", description: "", descriptionEn: "",
  specs: {}, specsEn: {},
});

function toDraft(p: ProductRow): Draft {
  return {
    name: p.name, nameEn: p.i18n?.en?.name ?? "", slug: p.slug, reference: p.reference ?? "",
    categoryId: numStr(p.categoryId), brandId: numStr(p.brandId),
    price: numStr(p.price), oldPrice: numStr(p.oldPrice), stock: numStr(p.stock), rating: numStr(p.rating), reviewsCount: numStr(p.reviewsCount),
    badge: p.badge ?? "", badgeEn: p.i18n?.en?.badge ?? "",
    isNew: !!p.isNew, isPromo: !!p.isPromo, isBestSeller: !!p.isBestSeller, isFlash: !!p.isFlash,
    image: p.image ?? "", images: p.images ?? [],
    shortDescription: p.shortDescription ?? "", shortDescriptionEn: p.i18n?.en?.shortDescription ?? "",
    description: p.description ?? "", descriptionEn: p.i18n?.en?.description ?? "",
    specs: p.specs ?? {}, specsEn: p.i18n?.en?.specs ?? {},
  };
}

function toBody(d: Draft) {
  return {
    name: d.name,
    slug: d.slug,
    reference: d.reference,
    shortDescription: d.shortDescription,
    description: d.description,
    price: d.price === "" ? null : Number(d.price),
    oldPrice: d.oldPrice === "" ? null : Number(d.oldPrice),
    categoryId: d.categoryId === "" ? null : Number(d.categoryId),
    brandId: d.brandId === "" ? null : Number(d.brandId),
    image: d.image,
    images: d.images,
    stock: Number(d.stock) || 0,
    rating: Number(d.rating) || 0,
    reviewsCount: Number(d.reviewsCount) || 0,
    badge: d.badge,
    isNew: d.isNew,
    isPromo: d.isPromo,
    isBestSeller: d.isBestSeller,
    isFlash: d.isFlash,
    specs: d.specs,
    i18n: {
      en: {
        name: d.nameEn,
        shortDescription: d.shortDescriptionEn,
        description: d.descriptionEn,
        badge: d.badgeEn,
        specs: d.specsEn,
      },
    },
  };
}

export default function ProductEditor({ id }: { id: string }) {
  const router = useRouter();
  const isNew = id === "nouveau";
  const [draft, setDraft] = useState<Draft | null>(isNew ? emptyDraft() : null);
  const [row, setRow] = useState<ProductRow | null>(null);
  const [cats, setCats] = useState<Named[]>([]);
  const [brands, setBrands] = useState<Named[]>([]);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "error"; text: string } | null>(null);

  useEffect(() => {
    api<Named[]>("/api/admin/categories").then(setCats).catch(() => {});
    api<Named[]>("/api/admin/brands").then(setBrands).catch(() => {});
    if (!isNew) {
      api<ProductRow>(`/api/admin/products/${id}`)
        .then((p) => {
          setRow(p);
          setDraft(toDraft(p));
        })
        .catch((e: Error) => setMsg({ kind: "error", text: e.message }));
    }
  }, [id, isNew]);

  if (!draft) {
    return msg ? <Notice kind="error">{msg.text}</Notice> : <p className="text-sm text-gray-500">Chargement…</p>;
  }

  const set = (patch: Partial<Draft>) => setDraft((d) => (d ? { ...d, ...patch } : d));
  const oldNum = Number(draft.oldPrice);
  const priceNum = Number(draft.price);
  const computedDiscount = draft.oldPrice && oldNum > priceNum && priceNum >= 0 ? Math.round(((oldNum - priceNum) / oldNum) * 100) : 0;

  const save = async () => {
    setMsg(null);
    if (!draft.name.trim()) return setMsg({ kind: "error", text: "Le nom (arabe) est obligatoire." });
    if (draft.price === "" || Number.isNaN(priceNum) || priceNum < 0) return setMsg({ kind: "error", text: "Le prix doit être un nombre positif." });
    setBusy(true);
    try {
      if (isNew) {
        const created = await api<ProductRow>("/api/admin/products", { method: "POST", body: toBody(draft) });
        router.replace(`/admin/produits/${created.id}`);
        setMsg({ kind: "ok", text: "Produit créé." });
        setRow(created);
        setDraft(toDraft(created));
      } else {
        const updated = await api<ProductRow>(`/api/admin/products/${id}`, { method: "PUT", body: toBody(draft) });
        setRow(updated);
        setDraft(toDraft(updated));
        setMsg({ kind: "ok", text: "Produit enregistré." });
      }
    } catch (e) {
      setMsg({ kind: "error", text: e instanceof Error ? e.message : "Erreur" });
    }
    setBusy(false);
  };

  const remove = async () => {
    if (!confirm("Supprimer définitivement ce produit ?")) return;
    setBusy(true);
    try {
      await api(`/api/admin/products/${id}`, { method: "DELETE" });
      router.replace("/admin/produits");
      router.refresh();
    } catch (e) {
      setMsg({ kind: "error", text: e instanceof Error ? e.message : "Erreur" });
      setBusy(false);
    }
  };

  return (
    <>
      <div className="mb-3">
        <Link href="/admin/produits" className="inline-flex items-center gap-1 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-[#e30613]">
          <ArrowLeft size={15} /> Retour aux produits
        </Link>
      </div>
      <PageHeader
        title={isNew ? "Nouveau produit" : draft.name || "Produit"}
        subtitle={row ? `Référence ${row.reference ?? "—"} · slug ${row.slug}` : "Renseignez les informations en arabe (principal) et en anglais."}
        actions={
          <>
            {row && (
              <a href={`/produit/${row.slug}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 dark:border-[#2c3644] px-3 py-2 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-white/10">
                <ExternalLink size={15} /> Voir sur le site
              </a>
            )}
            {!isNew && (
              <Button variant="danger" onClick={remove} disabled={busy}><Trash2 size={15} /> Supprimer</Button>
            )}
            <Button variant="primary" onClick={save} disabled={busy}><Save size={15} /> {busy ? "Enregistrement…" : "Enregistrer"}</Button>
          </>
        }
      />
      {msg && <div className="mb-4"><Notice kind={msg.kind === "ok" ? "ok" : "error"}>{msg.text}</Notice></div>}

      <div className="space-y-5">
        <Card title="Identification">
          <Grid2>
            <Field label="Nom (AR)"><Input dir="rtl" value={draft.name} onChange={(e) => set({ name: e.target.value })} /></Field>
            <Field label="Name (EN)"><Input dir="ltr" value={draft.nameEn} onChange={(e) => set({ nameEn: e.target.value })} /></Field>
            <Field label="Slug (adresse du produit)" hint="Lettres minuscules, chiffres et tirets. Généré si vide.">
              <Input dir="ltr" value={draft.slug} onChange={(e) => set({ slug: e.target.value })} placeholder="generé-automatiquement" />
            </Field>
            <Field label="Référence"><Input dir="ltr" value={draft.reference} onChange={(e) => set({ reference: e.target.value })} /></Field>
            <Field label="Rayon">
              <Select value={draft.categoryId} onChange={(e) => set({ categoryId: e.target.value })}>
                <option value="">— Aucun —</option>
                {cats.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </Select>
            </Field>
            <Field label="Marque">
              <Select value={draft.brandId} onChange={(e) => set({ brandId: e.target.value })}>
                <option value="">— Aucune —</option>
                {brands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
              </Select>
            </Field>
          </Grid2>
        </Card>

        <Card title="Prix, stock et avis">
          <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
            <Field label="Prix (LYD)"><Input type="number" min={0} step="0.01" dir="ltr" value={draft.price} onChange={(e) => set({ price: e.target.value })} /></Field>
            <Field label="Ancien prix (LYD)"><Input type="number" min={0} step="0.01" dir="ltr" value={draft.oldPrice} onChange={(e) => set({ oldPrice: e.target.value })} /></Field>
            <Field label="Remise calculée" hint="Automatique si un ancien prix est saisi.">
              <div className="rounded-md border border-gray-200 dark:border-[#2c3644] px-3 py-2 text-sm font-bold">{computedDiscount} %</div>
            </Field>
            <Field label="Stock"><Input type="number" min={0} value={draft.stock} onChange={(e) => set({ stock: e.target.value })} /></Field>
            <Field label="Note (0–5)"><Input type="number" min={0} max={5} step="0.1" dir="ltr" value={draft.rating} onChange={(e) => set({ rating: e.target.value })} /></Field>
            <Field label="Nombre d'avis"><Input type="number" min={0} value={draft.reviewsCount} onChange={(e) => set({ reviewsCount: e.target.value })} /></Field>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Field label="Badge (AR)" hint="Ex : الأكثر مبيعاً"><Input dir="rtl" value={draft.badge} onChange={(e) => set({ badge: e.target.value })} /></Field>
            <Field label="Badge (EN)" hint="Ex : TOP SELLER"><Input dir="ltr" value={draft.badgeEn} onChange={(e) => set({ badgeEn: e.target.value })} /></Field>
          </div>
          <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
            <Toggle label="Nouveauté" checked={draft.isNew} onChange={(v) => set({ isNew: v })} />
            <Toggle label="Promotion" checked={draft.isPromo} onChange={(v) => set({ isPromo: v })} />
            <Toggle label="Meilleure vente" checked={draft.isBestSeller} onChange={(v) => set({ isBestSeller: v })} />
            <Toggle label="Vente flash" checked={draft.isFlash} onChange={(v) => set({ isFlash: v })} />
            {computedDiscount > 0 && <Badge tone="red">-{computedDiscount}%</Badge>}
          </div>
        </Card>

        <Card title="Images">
          <div className="grid gap-6 lg:grid-cols-2">
            <ImageField label="Image principale" value={draft.image} onChange={(v) => set({ image: v })} />
            <ImageListField label="Galerie (ordre d'affichage)" values={draft.images} onChange={(v) => set({ images: v })} />
          </div>
        </Card>

        <Card title="Descriptions">
          <Grid2>
            <Field label="Description courte (AR)"><Textarea dir="rtl" rows={2} value={draft.shortDescription} onChange={(e) => set({ shortDescription: e.target.value })} /></Field>
            <Field label="Short description (EN)"><Textarea dir="ltr" rows={2} value={draft.shortDescriptionEn} onChange={(e) => set({ shortDescriptionEn: e.target.value })} /></Field>
            <Field label="Description complète (AR)"><Textarea dir="rtl" rows={6} value={draft.description} onChange={(e) => set({ description: e.target.value })} /></Field>
            <Field label="Full description (EN)"><Textarea dir="ltr" rows={6} value={draft.descriptionEn} onChange={(e) => set({ descriptionEn: e.target.value })} /></Field>
          </Grid2>
        </Card>

        <Card title="Caractéristiques">
          <Grid2>
            <SpecsField label="Caractéristiques (AR)" value={draft.specs} onChange={(v) => set({ specs: v })} />
            <SpecsField label="Specifications (EN)" value={draft.specsEn} onChange={(v) => set({ specsEn: v })} />
          </Grid2>
          <p className="mt-3 text-xs text-gray-500">Si aucune caractéristique n&apos;est saisie, le site affiche les informations par défaut (référence, marque, garantie, disponibilité).</p>
        </Card>
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <Button variant="primary" onClick={save} disabled={busy}><Save size={15} /> {busy ? "Enregistrement…" : "Enregistrer le produit"}</Button>
      </div>
    </>
  );
}

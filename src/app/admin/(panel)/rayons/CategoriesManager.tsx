"use client";
import ResourceManager from "@/components/admin/ResourceManager";
import { Badge, Field, Grid2, ImageField, Input, LinesField, Select, Toggle, numStr } from "@/components/admin/ui";
import { slugify } from "@/lib/admin/slug";

type Category = {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
  image: string | null;
  order: number | null;
  featured: boolean | null;
  productCount: number | null;
  subcategories: string[] | null;
  i18n: { en?: { name?: string; subcategories?: string[] } } | null;
};

type Draft = {
  name: string; nameEn: string; slug: string; icon: string; image: string; order: string;
  productCount: string; featured: boolean; subs: string[]; subsEn: string[];
};

const ICONS = ["Drill", "Hammer", "Package", "PaintBucket", "Droplets", "Plug", "Snowflake", "Wrench", "Zap", "LayoutGrid", "ShieldCheck", "Lightbulb", "Leaf"];

const emptyDraft = (): Draft => ({
  name: "", nameEn: "", slug: "", icon: "LayoutGrid", image: "", order: "0", productCount: "0", featured: true, subs: [], subsEn: [],
});

export default function CategoriesManager() {
  return (
    <ResourceManager<Category, Draft>
      title="Rayons"
      subtitle="Rayons (catégories) du menu « Tous nos rayons », de la page d'accueil et du pied de page. Le slug définit l'adresse de la page du rayon."
      endpoint="/api/admin/categories"
      itemLabel="Rayon"
      wide
      emptyDraft={emptyDraft}
      toDraft={(r) => ({
        name: r.name,
        nameEn: r.i18n?.en?.name ?? "",
        slug: r.slug,
        icon: r.icon ?? "LayoutGrid",
        image: r.image ?? "",
        order: numStr(r.order),
        productCount: numStr(r.productCount),
        featured: r.featured !== false,
        subs: r.subcategories ?? [],
        subsEn: r.i18n?.en?.subcategories ?? [],
      })}
      toBody={(d) => ({
        name: d.name,
        slug: d.slug || slugify(d.nameEn || d.name),
        icon: d.icon,
        image: d.image,
        order: Number(d.order) || 0,
        productCount: Number(d.productCount) || 0,
        featured: d.featured,
        subcategories: d.subs,
        i18n: { en: { name: d.nameEn, subcategories: d.subsEn } },
      })}
      validate={(d) => (!d.name.trim() ? "Le nom (arabe) est obligatoire." : null)}
      columns={[
        { head: "Image", render: (r) => (r.image ? <img src={r.image} alt="" className="h-10 w-10 rounded-full object-cover" /> : <span className="inline-block h-10 w-10 rounded-full bg-gray-100 dark:bg-white/10" />) },
        { head: "Nom", render: (r) => (<div><div className="font-semibold" dir="rtl">{r.name}</div><div className="text-xs text-gray-500">{r.i18n?.en?.name}</div></div>) },
        { head: "Slug", render: (r) => <code className="text-xs" dir="ltr">{r.slug}</code> },
        { head: "Sous-rayons", render: (r) => (r.subcategories ?? []).length, className: "text-center" },
        { head: "Ordre", render: (r) => r.order ?? 0, className: "text-center" },
        { head: "Accueil", render: (r) => (r.featured === false ? <Badge tone="gray">Non</Badge> : <Badge tone="green">Oui</Badge>) },
      ]}
      renderForm={(d, set) => (
        <>
          <Grid2>
            <Field label="Nom (AR)"><Input dir="rtl" value={d.name} onChange={(e) => set({ name: e.target.value })} /></Field>
            <Field label="Name (EN)"><Input dir="ltr" value={d.nameEn} onChange={(e) => set({ nameEn: e.target.value })} /></Field>
            <Field label="Slug (adresse)" hint="Laissez vide pour le générer à partir du nom anglais. Lettres minuscules, chiffres et tirets.">
              <Input dir="ltr" value={d.slug} onChange={(e) => set({ slug: e.target.value })} placeholder={slugify(d.nameEn || d.name) || "ex: outillage-electrique"} />
            </Field>
            <Field label="Icône du menu">
              <Select value={d.icon} onChange={(e) => set({ icon: e.target.value })}>
                {ICONS.map((i) => <option key={i} value={i}>{i}</option>)}
              </Select>
            </Field>
          </Grid2>
          <ImageField label="Image du rayon" value={d.image} onChange={(v) => set({ image: v })} />
          <Grid2>
            <LinesField label="Sous-rayons (AR) — un par ligne" value={d.subs} onChange={(v) => set({ subs: v })} />
            <LinesField label="Subcategories (EN) — one per line" value={d.subsEn} onChange={(v) => set({ subsEn: v })} />
          </Grid2>
          <Grid2>
            <Field label="Ordre d'affichage"><Input type="number" value={d.order} onChange={(e) => set({ order: e.target.value })} /></Field>
            <Field label="Nombre de produits (affiché)"><Input type="number" value={d.productCount} onChange={(e) => set({ productCount: e.target.value })} /></Field>
          </Grid2>
          <Toggle label="Mis en avant (accueil, pied de page)" checked={d.featured} onChange={(v) => set({ featured: v })} />
        </>
      )}
    />
  );
}

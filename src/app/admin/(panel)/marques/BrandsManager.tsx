"use client";
import ResourceManager from "@/components/admin/ResourceManager";
import { Badge, Field, Grid2, ImageField, Input, Toggle } from "@/components/admin/ui";
import { slugify } from "@/lib/admin/slug";

type Brand = { id: number; name: string; slug: string; logo: string | null; color: string | null; featured: boolean | null };

type Draft = { name: string; slug: string; logo: string; color: string; featured: boolean };

export default function BrandsManager() {
  return (
    <ResourceManager<Brand, Draft>
      title="Marques"
      subtitle="Marques affichées dans le carrousel de la page d'accueil. Sans logo, le nom est affiché dans la couleur de la marque."
      endpoint="/api/admin/brands"
      itemLabel="Marque"
      emptyDraft={() => ({ name: "", slug: "", logo: "", color: "#2f3d4c", featured: true })}
      toDraft={(r) => ({ name: r.name, slug: r.slug, logo: r.logo ?? "", color: r.color ?? "#2f3d4c", featured: r.featured !== false })}
      toBody={(d) => ({ name: d.name, slug: d.slug || slugify(d.name), logo: d.logo, color: d.color, featured: d.featured })}
      validate={(d) => (!d.name.trim() ? "Le nom de la marque est obligatoire." : null)}
      columns={[
        { head: "Logo", render: (r) => (r.logo ? <img src={r.logo} alt="" className="h-10 w-20 object-contain" /> : <span className="font-black italic" style={{ color: r.color ?? "#2f3d4c" }}>{r.name.toUpperCase()}</span>) },
        { head: "Nom", render: (r) => <span className="font-semibold">{r.name}</span> },
        { head: "Slug", render: (r) => <code className="text-xs" dir="ltr">{r.slug}</code> },
        { head: "Couleur", render: (r) => (<span className="inline-flex items-center gap-2"><span className="h-4 w-4 rounded border border-gray-300" style={{ background: r.color ?? "#2f3d4c" }} /><code className="text-xs" dir="ltr">{r.color}</code></span>) },
        { head: "Accueil", render: (r) => (r.featured === false ? <Badge tone="gray">Non</Badge> : <Badge tone="green">Oui</Badge>) },
      ]}
      renderForm={(d, set) => (
        <>
          <Grid2>
            <Field label="Nom"><Input value={d.name} onChange={(e) => set({ name: e.target.value })} dir="ltr" /></Field>
            <Field label="Slug" hint="Utilisé dans le lien de recherche par marque.">
              <Input dir="ltr" value={d.slug} onChange={(e) => set({ slug: e.target.value })} placeholder={slugify(d.name) || "ex: bosch"} />
            </Field>
            <Field label="Couleur de la marque">
              <div className="flex gap-2">
                <input type="color" value={d.color} onChange={(e) => set({ color: e.target.value })} className="h-9 w-12 rounded border border-gray-300" />
                <Input dir="ltr" value={d.color} onChange={(e) => set({ color: e.target.value })} />
              </div>
            </Field>
            <div className="flex items-end pb-2"><Toggle label="Affichée sur l'accueil" checked={d.featured} onChange={(v) => set({ featured: v })} /></div>
          </Grid2>
          <ImageField label="Logo (facultatif)" value={d.logo} onChange={(v) => set({ logo: v })} hint="Format carré ou horizontal, fond transparent conseillé." />
        </>
      )}
    />
  );
}

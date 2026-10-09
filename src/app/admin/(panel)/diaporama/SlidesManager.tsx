"use client";
import ResourceManager from "@/components/admin/ResourceManager";
import { Badge, Field, Grid2, ImageField, Input, Toggle, numStr, Textarea } from "@/components/admin/ui";

type Slide = {
  id: number;
  title: string | null;
  subtitle: string | null;
  image: string | null;
  mobileImage: string | null;
  link: string | null;
  bgColor: string | null;
  order: number | null;
  active: boolean | null;
  i18n: { en?: { title?: string; subtitle?: string } } | null;
};

type Draft = {
  title: string; titleEn: string; subtitle: string; subtitleEn: string;
  image: string; mobileImage: string; link: string; bgColor: string; order: string; active: boolean;
};

const emptyDraft = (): Draft => ({
  title: "", titleEn: "", subtitle: "", subtitleEn: "", image: "", mobileImage: "", link: "/recherche", bgColor: "#1a2a3a", order: "0", active: true,
});

export default function SlidesManager() {
  return (
    <ResourceManager<Slide, Draft>
      title="Diaporama d'accueil"
      subtitle="Les diapositives actives s'affichent en haut de la page d'accueil, dans l'ordre indiqué."
      endpoint="/api/admin/slides"
      itemLabel="Diapositive"
      wide
      emptyDraft={emptyDraft}
      toDraft={(r) => ({
        title: r.title ?? "",
        titleEn: r.i18n?.en?.title ?? "",
        subtitle: r.subtitle ?? "",
        subtitleEn: r.i18n?.en?.subtitle ?? "",
        image: r.image ?? "",
        mobileImage: r.mobileImage ?? "",
        link: r.link ?? "",
        bgColor: r.bgColor ?? "#1a2a3a",
        order: numStr(r.order),
        active: r.active !== false,
      })}
      toBody={(d) => ({
        title: d.title,
        subtitle: d.subtitle,
        image: d.image,
        mobileImage: d.mobileImage,
        link: d.link,
        bgColor: d.bgColor,
        order: Number(d.order) || 0,
        active: d.active,
        i18n: { en: { title: d.titleEn, subtitle: d.subtitleEn } },
      })}
      validate={(d) => (!d.title.trim() && !d.image.trim() ? "Renseignez au moins un titre ou une image." : null)}
      columns={[
        { head: "Aperçu", render: (r) => (r.image ? <img src={r.image} alt="" className="h-12 w-20 rounded object-cover" /> : <span className="inline-block h-12 w-20 rounded" style={{ background: r.bgColor ?? "#1a2a3a" }} />) },
        { head: "Titre", render: (r) => (<div><div className="font-semibold">{r.title}</div><div className="text-xs text-gray-500">{r.i18n?.en?.title}</div></div>) },
        { head: "Ordre", render: (r) => r.order ?? 0, className: "text-center" },
        { head: "Statut", render: (r) => (r.active === false ? <Badge tone="gray">Masquée</Badge> : <Badge tone="green">Active</Badge>) },
      ]}
      renderForm={(d, set) => (
        <>
          <Grid2>
            <Field label="Titre (AR)"><Input dir="rtl" value={d.title} onChange={(e) => set({ title: e.target.value })} /></Field>
            <Field label="Title (EN)"><Input dir="ltr" value={d.titleEn} onChange={(e) => set({ titleEn: e.target.value })} /></Field>
            <Field label="Sous-titre (AR)"><Textarea dir="rtl" rows={2} value={d.subtitle} onChange={(e) => set({ subtitle: e.target.value })} /></Field>
            <Field label="Subtitle (EN)"><Textarea dir="ltr" rows={2} value={d.subtitleEn} onChange={(e) => set({ subtitleEn: e.target.value })} /></Field>
          </Grid2>
          <Grid2>
            <ImageField label="Image (bureau)" aspect="wide" value={d.image} onChange={(v) => set({ image: v })} hint="Sans image, un fond de couleur est affiché." />
            <ImageField label="Image (mobile, facultatif)" aspect="wide" value={d.mobileImage} onChange={(v) => set({ mobileImage: v })} />
          </Grid2>
          <Grid2>
            <Field label="Lien du bouton"><Input dir="ltr" value={d.link} onChange={(e) => set({ link: e.target.value })} /></Field>
            <Field label="Couleur de fond">
              <div className="flex gap-2">
                <input type="color" value={d.bgColor} onChange={(e) => set({ bgColor: e.target.value })} className="h-9 w-12 rounded border border-gray-300" />
                <Input dir="ltr" value={d.bgColor} onChange={(e) => set({ bgColor: e.target.value })} />
              </div>
            </Field>
            <Field label="Ordre d'affichage"><Input type="number" value={d.order} onChange={(e) => set({ order: e.target.value })} /></Field>
            <div className="flex items-end pb-2"><Toggle label="Diapositive active" checked={d.active} onChange={(v) => set({ active: v })} /></div>
          </Grid2>
        </>
      )}
    />
  );
}

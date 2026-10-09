"use client";
import ResourceManager from "@/components/admin/ResourceManager";
import { Field, Grid2, ImageField, Input, Textarea, numStr } from "@/components/admin/ui";

type Store = {
  id: number;
  name: string;
  address: string | null;
  city: string | null;
  phone: string | null;
  hours: string | null;
  lat: string | null;
  lng: string | null;
  image: string | null;
  tag: string | null;
  order: number | null;
  i18n: { en?: { address?: string; city?: string; hours?: string; tag?: string } } | null;
};

type Draft = {
  name: string; city: string; cityEn: string; address: string; addressEn: string; phone: string;
  hours: string; hoursEn: string; tag: string; tagEn: string; image: string; lat: string; lng: string; order: string;
};

const emptyDraft = (): Draft => ({
  name: "", city: "طرابلس", cityEn: "Tripoli", address: "", addressEn: "", phone: "", hours: "", hoursEn: "",
  tag: "", tagEn: "", image: "", lat: "", lng: "", order: "0",
});

export default function StoresManager() {
  return (
    <ResourceManager<Store, Draft>
      title="Magasins"
      subtitle="Adresses, téléphones et horaires des magasins (pages Magasins, Contact et aperçu de l'accueil)."
      endpoint="/api/admin/stores"
      itemLabel="Magasin"
      wide
      emptyDraft={emptyDraft}
      toDraft={(r) => ({
        name: r.name,
        city: r.city ?? "",
        cityEn: r.i18n?.en?.city ?? "",
        address: r.address ?? "",
        addressEn: r.i18n?.en?.address ?? "",
        phone: r.phone ?? "",
        hours: r.hours ?? "",
        hoursEn: r.i18n?.en?.hours ?? "",
        tag: r.tag ?? "",
        tagEn: r.i18n?.en?.tag ?? "",
        image: r.image ?? "",
        lat: numStr(r.lat),
        lng: numStr(r.lng),
        order: numStr(r.order),
      })}
      toBody={(d) => ({
        name: d.name,
        city: d.city,
        phone: d.phone,
        hours: d.hours,
        tag: d.tag,
        address: d.address,
        image: d.image,
        lat: d.lat === "" ? null : Number(d.lat),
        lng: d.lng === "" ? null : Number(d.lng),
        order: Number(d.order) || 0,
        i18n: { en: { address: d.addressEn, city: d.cityEn, hours: d.hoursEn, tag: d.tagEn } },
      })}
      validate={(d) => (!d.name.trim() ? "Le nom du magasin est obligatoire." : null)}
      columns={[
        { head: "Image", render: (r) => (r.image ? <img src={r.image} alt="" className="h-10 w-14 rounded object-cover" /> : null) },
        { head: "Nom", render: (r) => <span className="font-semibold">{r.name}</span> },
        { head: "Adresse", render: (r) => (<div><div dir="rtl">{r.address}</div><div className="text-xs text-gray-500">{r.i18n?.en?.address}</div></div>) },
        { head: "Téléphone", render: (r) => <span dir="ltr">{r.phone}</span> },
        { head: "Ordre", render: (r) => r.order ?? 0, className: "text-center" },
      ]}
      renderForm={(d, set) => (
        <>
          <Grid2>
            <Field label="Nom du magasin"><Input dir="ltr" value={d.name} onChange={(e) => set({ name: e.target.value })} /></Field>
            <Field label="Téléphone"><Input dir="ltr" value={d.phone} onChange={(e) => set({ phone: e.target.value })} /></Field>
            <Field label="Ville (AR)"><Input dir="rtl" value={d.city} onChange={(e) => set({ city: e.target.value })} /></Field>
            <Field label="City (EN)"><Input dir="ltr" value={d.cityEn} onChange={(e) => set({ cityEn: e.target.value })} /></Field>
            <Field label="Adresse (AR)"><Textarea dir="rtl" rows={2} value={d.address} onChange={(e) => set({ address: e.target.value })} /></Field>
            <Field label="Address (EN)"><Textarea dir="ltr" rows={2} value={d.addressEn} onChange={(e) => set({ addressEn: e.target.value })} /></Field>
            <Field label="Horaires (AR)"><Input dir="rtl" value={d.hours} onChange={(e) => set({ hours: e.target.value })} /></Field>
            <Field label="Hours (EN)"><Input dir="ltr" value={d.hoursEn} onChange={(e) => set({ hoursEn: e.target.value })} /></Field>
            <Field label="Étiquette (AR)" hint="Ex : المعرض الرئيسي — 2500 م²"><Input dir="rtl" value={d.tag} onChange={(e) => set({ tag: e.target.value })} /></Field>
            <Field label="Tag (EN)"><Input dir="ltr" value={d.tagEn} onChange={(e) => set({ tagEn: e.target.value })} /></Field>
            <Field label="Latitude (facultatif)"><Input dir="ltr" value={d.lat} onChange={(e) => set({ lat: e.target.value })} /></Field>
            <Field label="Longitude (facultatif)"><Input dir="ltr" value={d.lng} onChange={(e) => set({ lng: e.target.value })} /></Field>
            <Field label="Ordre d'affichage"><Input type="number" value={d.order} onChange={(e) => set({ order: e.target.value })} /></Field>
          </Grid2>
          <ImageField label="Photo du magasin" aspect="wide" value={d.image} onChange={(v) => set({ image: v })} />
        </>
      )}
    />
  );
}

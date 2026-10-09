"use client";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Plus, Save, Trash2 } from "lucide-react";
import { Button, Card, Field, ImageField, Input, Notice, PageHeader, api, numStr } from "@/components/admin/ui";
import type { SiteSettings, HomeTile } from "@/lib/site-settings";

const MAX_TILES = 6;
const EMPTY_TILE: HomeTile = {
  img: "",
  link: "/",
  tag: "",
  title: { ar: "", en: "" },
  desc: { ar: "", en: "" },
};

export default function SettingsEditor() {
  const [s, setS] = useState<SiteSettings | null>(null);
  const [msg, setMsg] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api<SiteSettings>("/api/admin/settings")
      .then(setS)
      .catch((e: Error) => setMsg({ kind: "error", text: e.message }));
  }, []);

  if (!s) return <p className="text-sm text-gray-500">Chargement…</p>;

  const setCompany = (patch: Partial<SiteSettings["company"]>) => setS({ ...s, company: { ...s.company, ...patch } });
  const setDelivery = (patch: Partial<SiteSettings["delivery"]>) => setS({ ...s, delivery: { ...s.delivery, ...patch } });
  const setHome = (patch: Partial<SiteSettings["home"]>) => setS({ ...s, home: { ...s.home, ...patch } });
  const setTile = (i: number, tile: HomeTile) => setHome({ tiles: s.home.tiles.map((t, k) => (k === i ? tile : t)) });
  const moveTile = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= s.home.tiles.length) return;
    const tiles = [...s.home.tiles];
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    setHome({ tiles });
  };

  const save = async () => {
    setBusy(true);
    setMsg(null);
    try {
      const saved = await api<SiteSettings>("/api/admin/settings", { method: "PUT", body: s });
      setS(saved);
      setMsg({ kind: "ok", text: "Paramètres enregistrés." });
    } catch (e) {
      setMsg({ kind: "error", text: e instanceof Error ? e.message : "Erreur" });
    }
    setBusy(false);
  };

  return (
    <>
      <PageHeader
        title="Paramètres & accueil"
        subtitle="Coordonnées de l'entreprise, frais de livraison et contenu de la page d'accueil."
        actions={
          <Button variant="primary" onClick={save} disabled={busy}>
            <Save size={16} /> {busy ? "Enregistrement…" : "Enregistrer"}
          </Button>
        }
      />
      {msg && <div className="mb-4"><Notice kind={msg.kind === "ok" ? "ok" : "error"}>{msg.text}</Notice></div>}

      <div className="space-y-5">
        <Card title="Entreprise">
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Nom de l'entreprise">
              <Input value={s.company.name} onChange={(e) => setCompany({ name: e.target.value })} />
            </Field>
            <Field label="Téléphone (centrale)">
              <Input dir="ltr" value={s.company.phone} onChange={(e) => setCompany({ phone: e.target.value })} />
            </Field>
            <Field label="E-mail de contact">
              <Input dir="ltr" type="email" value={s.company.emailContact} onChange={(e) => setCompany({ emailContact: e.target.value })} />
            </Field>
            <Field label="E-mail devis entreprises">
              <Input dir="ltr" type="email" value={s.company.emailQuotes} onChange={(e) => setCompany({ emailQuotes: e.target.value })} />
            </Field>
            <Field label="E-mail ressources humaines">
              <Input dir="ltr" type="email" value={s.company.emailHR} onChange={(e) => setCompany({ emailHR: e.target.value })} />
            </Field>
            <div />
            <Field label="Adresse (arabe)">
              <Input dir="rtl" value={s.company.address.ar} onChange={(e) => setCompany({ address: { ...s.company.address, ar: e.target.value } })} />
            </Field>
            <Field label="Adresse (anglais)">
              <Input dir="ltr" value={s.company.address.en} onChange={(e) => setCompany({ address: { ...s.company.address, en: e.target.value } })} />
            </Field>
          </div>
        </Card>

        <Card title="Livraison">
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
            <Field label="Frais de livraison (LYD)" hint="Appliqués sous le seuil de livraison gratuite.">
              <Input type="number" min={0} step="0.01" value={numStr(s.delivery.fee)} onChange={(e) => setDelivery({ fee: Number(e.target.value) || 0 })} />
            </Field>
            <Field label="Livraison gratuite à partir de (LYD)" hint="Montant du panier à partir duquel la livraison est offerte.">
              <Input type="number" min={0} step="0.01" value={numStr(s.delivery.freeThreshold)} onChange={(e) => setDelivery({ freeThreshold: Number(e.target.value) || 0 })} />
            </Field>
          </div>
        </Card>

        <Card title="Page d'accueil — visuels">
          <div className="grid md:grid-cols-2 gap-6">
            <ImageField label="Bannière « Service entreprise »" aspect="wide" value={s.home.bannerImage} onChange={(v) => setHome({ bannerImage: v })} />
            <ImageField label="Aperçu « Nos magasins »" aspect="wide" value={s.home.storeImage} onChange={(v) => setHome({ storeImage: v })} />
          </div>
        </Card>

        <Card
          title={`Tuiles promotionnelles (${s.home.tiles.length}/${MAX_TILES})`}
          actions={
            <Button size="sm" variant="secondary" disabled={s.home.tiles.length >= MAX_TILES} onClick={() => setHome({ tiles: [...s.home.tiles, { ...EMPTY_TILE }] })}>
              <Plus size={14} /> Ajouter une tuile
            </Button>
          }
        >
          {s.home.tiles.length === 0 && <p className="text-sm text-gray-500">Aucune tuile : la section est masquée sur l&apos;accueil.</p>}
          <div className="space-y-5">
            {s.home.tiles.map((t, i) => (
              <div key={i} className="rounded-lg border border-gray-200 dark:border-[#2c3644] p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold">Tuile {i + 1}</span>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" onClick={() => moveTile(i, -1)} disabled={i === 0} aria-label="Monter"><ChevronUp size={14} /></Button>
                    <Button size="sm" variant="ghost" onClick={() => moveTile(i, 1)} disabled={i === s.home.tiles.length - 1} aria-label="Descendre"><ChevronDown size={14} /></Button>
                    <Button size="sm" variant="danger" onClick={() => setHome({ tiles: s.home.tiles.filter((_, k) => k !== i) })}><Trash2 size={14} /></Button>
                  </div>
                </div>
                <div className="grid md:grid-cols-[1fr_2fr] gap-4">
                  <ImageField label="Image" value={t.img} onChange={(v) => setTile(i, { ...t, img: v })} />
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Field label="Titre (AR)"><Input dir="rtl" value={t.title.ar} onChange={(e) => setTile(i, { ...t, title: { ...t.title, ar: e.target.value } })} /></Field>
                    <Field label="Title (EN)"><Input dir="ltr" value={t.title.en} onChange={(e) => setTile(i, { ...t, title: { ...t.title, en: e.target.value } })} /></Field>
                    <Field label="Description (AR)"><Input dir="rtl" value={t.desc.ar} onChange={(e) => setTile(i, { ...t, desc: { ...t.desc, ar: e.target.value } })} /></Field>
                    <Field label="Description (EN)"><Input dir="ltr" value={t.desc.en} onChange={(e) => setTile(i, { ...t, desc: { ...t.desc, en: e.target.value } })} /></Field>
                    <Field label="Étiquette" hint="Ex : -30%, TOP"><Input dir="ltr" value={t.tag} onChange={(e) => setTile(i, { ...t, tag: e.target.value })} /></Field>
                    <Field label="Lien" hint="Ex : /categorie/peinture-droguerie"><Input dir="ltr" value={t.link} onChange={(e) => setTile(i, { ...t, link: e.target.value })} /></Field>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}

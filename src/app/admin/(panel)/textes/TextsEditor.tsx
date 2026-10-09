"use client";
import { useEffect, useMemo, useState } from "react";
import { Search, RotateCcw, Save } from "lucide-react";
import { Badge, Button, Empty, Notice, PageHeader, Select, Textarea, api } from "@/components/admin/ui";

type TextItem = {
  key: string;
  group: string;
  defaultAr: string;
  defaultEn: string;
  ar: string;
  en: string;
  modified: boolean;
};

export default function TextsEditor() {
  const [items, setItems] = useState<TextItem[]>([]);
  const [saved, setSaved] = useState<Record<string, { ar: string; en: string }>>({});
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("");
  const [msg, setMsg] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const applyData = (data: { items: TextItem[] }) => {
    setItems(data.items);
    setSaved(Object.fromEntries(data.items.map((i) => [i.key, { ar: i.ar, en: i.en }])));
  };

  const load = () => api<{ items: TextItem[] }>("/api/admin/texts").then(applyData);

  useEffect(() => {
    let alive = true;
    api<{ items: TextItem[] }>("/api/admin/texts")
      .then((data) => alive && applyData(data))
      .catch((e: Error) => alive && setMsg({ kind: "error", text: e.message }));
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const groups = useMemo(() => Array.from(new Set(items.map((i) => i.group))), [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((i) => {
      if (group && i.group !== group) return false;
      if (!q) return true;
      return i.key.toLowerCase().includes(q) || i.ar.toLowerCase().includes(q) || i.en.toLowerCase().includes(q);
    });
  }, [items, query, group]);

  const dirty = items.filter((i) => {
    const s = saved[i.key];
    return s && (s.ar !== i.ar || s.en !== i.en);
  });

  const update = (key: string, patch: Partial<Pick<TextItem, "ar" | "en">>) => {
    setItems((prev) => prev.map((i) => (i.key === key ? { ...i, ...patch } : i)));
  };

  const saveAll = async () => {
    setBusy(true);
    setMsg(null);
    try {
      await api("/api/admin/texts", {
        method: "PUT",
        body: { items: dirty.map((i) => ({ key: i.key, ar: i.ar, en: i.en })) },
      });
      await load();
      setMsg({ kind: "ok", text: `${dirty.length} texte(s) enregistré(s).` });
    } catch (e) {
      setMsg({ kind: "error", text: e instanceof Error ? e.message : "Erreur" });
    }
    setBusy(false);
  };

  const reset = async (key: string) => {
    if (!confirm("Rétablir le texte d'origine (AR et EN) ?")) return;
    setBusy(true);
    try {
      await api(`/api/admin/texts?key=${encodeURIComponent(key)}`, { method: "DELETE" });
      await load();
      setMsg({ kind: "ok", text: "Texte rétabli." });
    } catch (e) {
      setMsg({ kind: "error", text: e instanceof Error ? e.message : "Erreur" });
    }
    setBusy(false);
  };

  return (
    <>
      <PageHeader
        title="Textes du site"
        subtitle="Tous les textes de l'interface, en arabe (langue principale) et en anglais. Un texte modifié est signalé ; « Rétablir » restaure la valeur d'origine."
        actions={
          <Button variant="primary" onClick={saveAll} disabled={busy || dirty.length === 0}>
            <Save size={16} /> Enregistrer ({dirty.length})
          </Button>
        }
      />

      {msg && <div className="mb-4"><Notice kind={msg.kind === "ok" ? "ok" : "error"}>{msg.text}</Notice></div>}

      <div className="flex flex-wrap gap-2 mb-4">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un texte ou une clé…"
            className="w-full rounded-md border border-gray-300 dark:border-[#2c3644] bg-white dark:bg-[#1a222c] ps-9 pe-3 py-2 text-sm outline-none focus:border-[#e30613]"
          />
        </div>
        <Select value={group} onChange={(e) => setGroup(e.target.value)} className="w-auto min-w-[200px]">
          <option value="">Toutes les sections</option>
          {groups.map((g) => <option key={g} value={g}>{g}</option>)}
        </Select>
      </div>

      <p className="text-xs text-gray-500 mb-3">{filtered.length} texte(s) affiché(s) — {items.filter((i) => i.modified).length} personnalisé(s)</p>

      {filtered.length === 0 && <Empty>Aucun texte ne correspond à la recherche.</Empty>}

      <div className="space-y-3">
        {filtered.map((i) => {
          const isDirty = dirty.some((d) => d.key === i.key);
          return (
            <div key={i.key} className={`rounded-lg border bg-white dark:bg-[#1a222c] p-4 ${isDirty ? "border-[#e30613]" : "border-gray-200 dark:border-[#2c3644]"}`}>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="dark">{i.group}</Badge>
                  <code className="text-[11px] text-gray-500" dir="ltr">{i.key}</code>
                  {i.modified && <Badge tone="amber">Personnalisé</Badge>}
                  {isDirty && <Badge tone="red">Non enregistré</Badge>}
                </div>
                {i.modified && (
                  <Button size="sm" variant="ghost" onClick={() => reset(i.key)} disabled={busy}>
                    <RotateCcw size={13} /> Rétablir
                  </Button>
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <label className="block">
                  <span className="block text-[11px] font-bold uppercase text-gray-500 mb-1">Arabe (principal)</span>
                  <Textarea dir="rtl" rows={2} value={i.ar} placeholder={i.defaultAr} onChange={(e) => update(i.key, { ar: e.target.value })} />
                </label>
                <label className="block">
                  <span className="block text-[11px] font-bold uppercase text-gray-500 mb-1">English</span>
                  <Textarea dir="ltr" rows={2} value={i.en} placeholder={i.defaultEn} onChange={(e) => update(i.key, { en: e.target.value })} />
                </label>
              </div>
              {(i.ar.trim() === "" || i.en.trim() === "") && (
                <p className="text-[11px] text-amber-600 mt-1">Champ vide : la valeur d&apos;origine sera utilisée.</p>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

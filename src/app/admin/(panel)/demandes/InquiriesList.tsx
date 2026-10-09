"use client";
import { useEffect, useMemo, useState } from "react";
import { Button, Empty, Notice, PageHeader, api } from "@/components/admin/ui";

type Inquiry = {
  id: number;
  kind: string;
  fullName: string;
  company: string | null;
  phone: string;
  email: string | null;
  subject: string | null;
  message: string;
  handled: boolean;
  createdAt: string | null;
};

const KIND_LABEL: Record<string, string> = { contact: "Contact", quote: "Devis entreprise" };
type Filter = "open" | "all" | "quote";

export default function InquiriesList() {
  const [rows, setRows] = useState<Inquiry[] | null>(null);
  const [filter, setFilter] = useState<Filter>("open");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<number | null>(null);

  const load = () => api<Inquiry[]>("/api/admin/inquiries").then(setRows).catch((e: Error) => setError(e.message));
  useEffect(() => {
    load();
  }, []);

  const visible = useMemo(() => {
    if (!rows) return [];
    if (filter === "open") return rows.filter((r) => !r.handled);
    if (filter === "quote") return rows.filter((r) => r.kind === "quote");
    return rows;
  }, [rows, filter]);

  const toggle = async (row: Inquiry) => {
    setBusy(row.id);
    setError(null);
    try {
      const updated = await api<Inquiry>(`/api/admin/inquiries/${row.id}`, { method: "PATCH", body: { handled: !row.handled } });
      setRows((prev) => prev?.map((r) => (r.id === row.id ? { ...r, handled: updated.handled } : r)) ?? null);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(null);
    }
  };

  const openCount = rows?.filter((r) => !r.handled).length ?? 0;
  const tabs: { id: Filter; label: string }[] = [
    { id: "open", label: `À traiter (${openCount})` },
    { id: "quote", label: "Devis entreprise" },
    { id: "all", label: "Toutes" },
  ];

  return (
    <>
      <PageHeader
        title="Demandes"
        subtitle="Messages du formulaire de contact et demandes de devis entreprise."
        actions={<Button onClick={load}>Actualiser</Button>}
      />
      {error && <div className="mb-4"><Notice kind="error">{error}</Notice></div>}
      <div className="mb-4 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilter(tab.id)}
            className={`px-3 py-1.5 rounded text-[13px] font-semibold border transition ${
              filter === tab.id
                ? "bg-[#e30613] border-[#e30613] text-white"
                : "bg-white dark:bg-[#1a222c] border-gray-300 dark:border-[#2c3644] text-gray-700 dark:text-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {!rows ? (
        <p className="text-sm text-gray-500">Chargement…</p>
      ) : visible.length === 0 ? (
        <Empty>{filter === "open" ? "Aucune demande en attente." : "Aucune demande pour le moment."}</Empty>
      ) : (
        <div className="space-y-3">
          {visible.map((r) => (
            <div key={r.id} className={`rounded-lg border p-4 bg-white dark:bg-[#1a222c] border-gray-200 dark:border-[#2c3644] ${r.handled ? "opacity-60" : ""}`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${r.kind === "quote" ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"}`}>
                      {KIND_LABEL[r.kind] ?? r.kind}
                    </span>
                    {r.subject && <span className="text-xs text-gray-500">{r.subject}</span>}
                  </div>
                  <div className="font-bold mt-1">
                    {r.fullName}
                    {r.company && <span className="font-normal text-gray-500"> — {r.company}</span>}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-0.5" dir="ltr">
                    {r.phone}
                    {r.email && <> · <a href={`mailto:${r.email}`} className="underline">{r.email}</a></>}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{r.createdAt ? new Date(r.createdAt).toLocaleString("fr-FR") : "—"}</div>
                </div>
                <Button onClick={() => toggle(r)} disabled={busy === r.id}>
                  {r.handled ? "Marquer non traitée" : "Marquer traitée"}
                </Button>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm border-t border-gray-100 dark:border-[#2c3644] pt-3">{r.message}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

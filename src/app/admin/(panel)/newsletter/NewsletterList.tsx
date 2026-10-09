"use client";
import { useEffect, useState } from "react";
import { Copy } from "lucide-react";
import { Button, Empty, Notice, PageHeader, api } from "@/components/admin/ui";

type Sub = { id: number; email: string; createdAt: string | null };

export default function NewsletterList() {
  const [rows, setRows] = useState<Sub[] | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api<Sub[]>("/api/admin/newsletter").then(setRows).catch((e: Error) => setError(e.message));
  }, []);

  const copy = async () => {
    if (!rows) return;
    await navigator.clipboard.writeText(rows.map((r) => r.email).join("\n"));
    setMsg("Adresses copiées dans le presse-papiers.");
  };

  return (
    <>
      <PageHeader
        title="Newsletter"
        subtitle={rows ? `${rows.length} abonné(s).` : "Adresses inscrites via le pied de page du site."}
        actions={<Button onClick={copy} disabled={!rows?.length}><Copy size={15} /> Copier les adresses</Button>}
      />
      {error && <div className="mb-4"><Notice kind="error">{error}</Notice></div>}
      {msg && <div className="mb-4"><Notice kind="ok">{msg}</Notice></div>}
      {!rows ? (
        <p className="text-sm text-gray-500">Chargement…</p>
      ) : rows.length === 0 ? (
        <Empty>Aucun abonné pour le moment.</Empty>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-[#2c3644] bg-white dark:bg-[#1a222c]">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-[#202a36] text-start text-xs uppercase text-gray-500">
              <tr><th className="px-3 py-2.5 text-start">E-mail</th><th className="px-3 py-2.5 text-start">Inscription</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-[#2c3644]">
              {rows.map((r) => (
                <tr key={r.id}>
                  <td className="px-3 py-2.5" dir="ltr">{r.email}</td>
                  <td className="px-3 py-2.5 text-xs text-gray-500">{r.createdAt ? new Date(r.createdAt).toLocaleString("fr-FR") : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

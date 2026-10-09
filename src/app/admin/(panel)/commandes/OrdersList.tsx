"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Badge, Empty, Notice, PageHeader, Select, api } from "@/components/admin/ui";
import { ORDER_STATUSES, ORDER_TONE, type OrderRow } from "@/components/admin/orders";

const money = (v: string | null) => (v === null ? "—" : `${Number(v).toFixed(2)} LYD`);
const date = (v: string | null) => (v ? new Date(v).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" }) : "—");

export default function OrdersList() {
  const [rows, setRows] = useState<OrderRow[] | null>(null);
  const [filter, setFilter] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api<OrderRow[]>("/api/admin/orders").then(setRows).catch((e: Error) => setError(e.message));
  }, []);

  const shown = useMemo(() => (rows ?? []).filter((r) => !filter || r.status === filter), [rows, filter]);

  const setStatus = async (id: number, status: string) => {
    try {
      await api(`/api/admin/orders/${id}`, { method: "PATCH", body: { status } });
      setRows((prev) => (prev ? prev.map((r) => (r.id === id ? { ...r, status } : r)) : prev));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
    }
  };

  return (
    <>
      <PageHeader title="Commandes" subtitle="Commandes passées sur le site. Le statut est visible par le client au suivi de commande." />
      {error && <div className="mb-4"><Notice kind="error">{error}</Notice></div>}
      <div className="mb-4 w-64">
        <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">Tous les statuts</option>
          {ORDER_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </Select>
      </div>
      {!rows ? (
        <p className="text-sm text-gray-500">Chargement…</p>
      ) : shown.length === 0 ? (
        <Empty>Aucune commande.</Empty>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-[#2c3644] bg-white dark:bg-[#1a222c]">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-[#202a36] text-start text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-3 py-2.5 text-start font-bold">N°</th>
                <th className="px-3 py-2.5 text-start font-bold">Date</th>
                <th className="px-3 py-2.5 text-start font-bold">Client</th>
                <th className="px-3 py-2.5 text-start font-bold">Ville</th>
                <th className="px-3 py-2.5 text-end font-bold">Total</th>
                <th className="px-3 py-2.5 text-start font-bold">Statut</th>
                <th className="px-3 py-2.5 text-end font-bold">Détail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-[#2c3644]">
              {shown.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50/70 dark:hover:bg-white/5">
                  <td className="px-3 py-2.5 font-bold" dir="ltr">{o.orderNumber}</td>
                  <td className="px-3 py-2.5 text-xs text-gray-500">{date(o.createdAt)}</td>
                  <td className="px-3 py-2.5">
                    <div className="font-semibold">{o.customerName}</div>
                    <div className="text-xs text-gray-500" dir="ltr">{o.customerPhone}</div>
                  </td>
                  <td className="px-3 py-2.5">{o.city}</td>
                  <td className="px-3 py-2.5 text-end font-bold whitespace-nowrap">{money(o.total)}</td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <Badge tone={ORDER_TONE[o.status ?? "pending"] ?? "gray"}>{ORDER_STATUSES.find((s) => s.value === o.status)?.label ?? o.status}</Badge>
                      <select
                        aria-label="Changer le statut"
                        value={o.status ?? "pending"}
                        onChange={(e) => setStatus(o.id, e.target.value)}
                        className="rounded border border-gray-300 dark:border-[#2c3644] bg-white dark:bg-[#1a222c] px-1.5 py-1 text-xs"
                      >
                        {ORDER_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                      </select>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-end">
                    <Link href={`/admin/commandes/${o.id}`} className="text-sm font-semibold text-[#e30613] hover:underline">Ouvrir</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

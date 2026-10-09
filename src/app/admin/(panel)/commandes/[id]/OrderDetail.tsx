"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge, Card, Notice, PageHeader, Select, api } from "@/components/admin/ui";
import { ORDER_STATUSES, ORDER_TONE, PAYMENT_LABELS, type OrderRow } from "@/components/admin/orders";

type Item = { id: number; productName: string | null; quantity: number; unitPrice: string | null; productImage: string | null };
type Detail = OrderRow & { items: Item[] };

const money = (v: string | null) => (v === null ? "—" : `${Number(v).toFixed(2)} LYD`);

export default function OrderDetail({ id }: { id: string }) {
  const [order, setOrder] = useState<Detail | null>(null);
  const [msg, setMsg] = useState<{ kind: "ok" | "error"; text: string } | null>(null);

  useEffect(() => {
    api<Detail>(`/api/admin/orders/${id}`).then(setOrder).catch((e: Error) => setMsg({ kind: "error", text: e.message }));
  }, [id]);

  const setStatus = async (status: string) => {
    try {
      await api(`/api/admin/orders/${id}`, { method: "PATCH", body: { status } });
      setOrder((o) => (o ? { ...o, status } : o));
      setMsg({ kind: "ok", text: "Statut mis à jour." });
    } catch (e) {
      setMsg({ kind: "error", text: e instanceof Error ? e.message : "Erreur" });
    }
  };

  if (!order) return msg ? <Notice kind="error">{msg.text}</Notice> : <p className="text-sm text-gray-500">Chargement…</p>;

  return (
    <>
      <div className="mb-3">
        <Link href="/admin/commandes" className="inline-flex items-center gap-1 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-[#e30613]">
          <ArrowLeft size={15} /> Retour aux commandes
        </Link>
      </div>
      <PageHeader
        title={`Commande ${order.orderNumber}`}
        subtitle={order.createdAt ? new Date(order.createdAt).toLocaleString("fr-FR") : undefined}
        actions={
          <div className="flex items-center gap-2">
            <Badge tone={ORDER_TONE[order.status ?? "pending"] ?? "gray"}>{ORDER_STATUSES.find((s) => s.value === order.status)?.label}</Badge>
            <Select value={order.status ?? "pending"} onChange={(e) => setStatus(e.target.value)} className="w-auto">
              {ORDER_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </Select>
          </div>
        }
      />
      {msg && <div className="mb-4"><Notice kind={msg.kind === "ok" ? "ok" : "error"}>{msg.text}</Notice></div>}

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-5">
          <Card title="Articles">
            <table className="w-full text-sm">
              <thead className="text-start text-xs uppercase text-gray-500">
                <tr><th className="py-2 text-start">Produit</th><th className="py-2 text-center">Qté</th><th className="py-2 text-end">Prix unitaire</th><th className="py-2 text-end">Sous-total</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-[#2c3644]">
                {order.items.map((it) => (
                  <tr key={it.id}>
                    <td className="py-2.5">
                      <div className="flex items-center gap-2">
                        {it.productImage && <img src={it.productImage} alt="" className="h-9 w-9 rounded object-cover" />}
                        <span>{it.productName}</span>
                      </div>
                    </td>
                    <td className="py-2.5 text-center">{it.quantity}</td>
                    <td className="py-2.5 text-end">{money(it.unitPrice)}</td>
                    <td className="py-2.5 text-end font-semibold">{money(String(Number(it.unitPrice ?? 0) * it.quantity))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 ms-auto max-w-xs space-y-1 text-sm">
              <div className="flex justify-between"><span>Sous-total</span><span>{money(order.subtotal)}</span></div>
              <div className="flex justify-between"><span>Livraison</span><span>{Number(order.delivery) === 0 ? "Gratuite" : money(order.delivery)}</span></div>
              <div className="flex justify-between text-base font-black pt-1 border-t dark:border-[#2c3644]"><span>Total</span><span>{money(order.total)}</span></div>
            </div>
          </Card>
        </div>

        <Card title="Client & livraison">
          <dl className="space-y-3 text-sm">
            <div><dt className="text-xs uppercase text-gray-500">Nom</dt><dd className="font-semibold">{order.customerName}</dd></div>
            <div><dt className="text-xs uppercase text-gray-500">Téléphone</dt><dd dir="ltr">{order.customerPhone}</dd></div>
            <div><dt className="text-xs uppercase text-gray-500">E-mail</dt><dd dir="ltr">{order.customerEmail || "—"}</dd></div>
            <div><dt className="text-xs uppercase text-gray-500">Ville</dt><dd>{order.city}</dd></div>
            <div><dt className="text-xs uppercase text-gray-500">Adresse</dt><dd>{order.address || "—"}</dd></div>
            <div><dt className="text-xs uppercase text-gray-500">Notes</dt><dd>{order.notes || "—"}</dd></div>
            <div><dt className="text-xs uppercase text-gray-500">Paiement</dt><dd>{PAYMENT_LABELS[order.paymentMethod ?? "cod"] ?? order.paymentMethod}</dd></div>
          </dl>
        </Card>
      </div>
    </>
  );
}

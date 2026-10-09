/** Statuts de commande (valeurs stockées et libellés en français pour l'administration). */
export const ORDER_STATUSES = [
  { value: "pending", label: "En préparation" },
  { value: "confirmed", label: "Confirmée" },
  { value: "delivering", label: "En livraison" },
  { value: "delivered", label: "Livrée" },
  { value: "cancelled", label: "Annulée" },
] as const;

export const ORDER_TONE: Record<string, "gray" | "green" | "red" | "amber" | "blue"> = {
  pending: "amber",
  confirmed: "blue",
  delivering: "blue",
  delivered: "green",
  cancelled: "red",
};

export const PAYMENT_LABELS: Record<string, string> = {
  cod: "Paiement à la livraison",
  transfer: "Virement bancaire",
};

export type OrderRow = {
  id: number;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  city: string | null;
  address: string | null;
  notes: string | null;
  paymentMethod: string | null;
  subtotal: string | null;
  delivery: string | null;
  total: string | null;
  status: string | null;
  createdAt: string | null;
};

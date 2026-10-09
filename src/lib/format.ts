/** Remise en pourcentage entre un ancien prix et un prix actuel. */
export function discountPercent(price: number, oldPrice?: number | null): number {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

/** Numéro de commande public (préfixe TT-). */
export function makeOrderNumber(): string {
  return `TT-${Date.now().toString().slice(-8)}`;
}

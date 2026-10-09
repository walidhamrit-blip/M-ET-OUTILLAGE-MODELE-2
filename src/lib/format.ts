export function formatPrice(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return "0,00 د.ل";
  const n = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(n)) return "0,00 د.ل";
  return (
    n.toLocaleString("fr-TN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) +
    " د.ل"
  );
}

export function discountPercent(price: number, oldPrice?: number | null): number {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

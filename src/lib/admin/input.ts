/** Helpers de lecture/validation des données envoyées par l'administration. */

export function str(value: unknown, max = 500): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/** Chaîne ou null si vide. */
export function strOrNull(value: unknown, max = 2000): string | null {
  const v = str(value, max);
  return v.length ? v : null;
}

export function num(value: unknown, fallback = 0): number {
  const n = typeof value === "number" ? value : parseFloat(String(value ?? ""));
  return Number.isFinite(n) ? n : fallback;
}

/** Nombre ou null si vide. */
export function numOrNull(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const n = num(value, NaN);
  return Number.isFinite(n) ? n : null;
}

export function int(value: unknown, fallback = 0): number {
  return Math.round(num(value, fallback));
}

export function bool(value: unknown): boolean {
  return value === true || value === "true" || value === 1 || value === "1" || value === "on";
}

export function strArray(value: unknown, max = 200): string[] {
  if (Array.isArray(value)) return value.map((v) => str(v, max)).filter((v) => v.length > 0);
  if (typeof value === "string") return value.split("\n").map((v) => v.trim()).filter(Boolean);
  return [];
}

/** Lignes "Clé: valeur" → objet. */
export function specsFrom(value: unknown): Record<string, string> {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      const key = str(k, 120);
      const val = str(v, 500);
      if (key && val) out[key] = val;
    }
    return out;
  }
  if (typeof value === "string") {
    const out: Record<string, string> = {};
    for (const line of value.split("\n")) {
      const idx = line.indexOf(":");
      if (idx < 0) continue;
      const key = line.slice(0, idx).trim();
      const val = line.slice(idx + 1).trim();
      if (key && val) out[key] = val;
    }
    return out;
  }
  return {};
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 110);
}

export function isSlug(value: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

export function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

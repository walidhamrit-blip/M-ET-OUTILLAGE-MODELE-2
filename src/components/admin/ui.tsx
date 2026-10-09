"use client";

import { useEffect, useRef, useState, type ReactNode, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes } from "react";
import { ImageIcon, Upload, X, ChevronUp, ChevronDown, Loader2, Plus } from "lucide-react";

/* ---------- Appels API ---------- */

export async function api<T = unknown>(url: string, options: { method?: string; body?: unknown } = {}): Promise<T> {
  const init: RequestInit = { method: options.method ?? "GET", headers: {} };
  if (options.body !== undefined) {
    (init.headers as Record<string, string>)["Content-Type"] = "application/json";
    init.body = JSON.stringify(options.body);
  }
  const r = await fetch(url, init);
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error((data as { error?: string }).error || `Erreur ${r.status}`);
  return data as T;
}

/** Nombre → chaîne ("" si vide) pour les champs de formulaire. */
export const numStr = (v: unknown) => (v === null || v === undefined ? "" : String(v));

/* ---------- Mise en page ---------- */

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Card({ title, children, actions, className = "" }: { title?: string; children: ReactNode; actions?: ReactNode; className?: string }) {
  return (
    <section className={`bg-white dark:bg-[#1a222c] border border-gray-200 dark:border-[#2c3644] rounded-lg shadow-sm ${className}`}>
      {(title || actions) && (
        <header className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 border-b border-gray-200 dark:border-[#2c3644]">
          {title && <h2 className="font-bold text-gray-900 dark:text-white">{title}</h2>}
          {actions}
        </header>
      )}
      <div className="p-5">{children}</div>
    </section>
  );
}

/* ---------- Boutons ---------- */

const BTN_VARIANTS = {
  primary: "bg-[#e30613] hover:bg-[#b3050f] text-white border-transparent",
  secondary: "bg-white hover:bg-gray-50 text-gray-800 border-gray-300 dark:bg-[#202a36] dark:text-gray-100 dark:border-[#2c3644] dark:hover:bg-[#2c3644]",
  dark: "bg-[#2f3d4c] hover:bg-[#243140] text-white border-transparent",
  danger: "bg-white hover:bg-red-50 text-red-600 border-red-300 dark:bg-transparent dark:hover:bg-red-900/20 dark:text-red-400 dark:border-red-800",
  ghost: "bg-transparent hover:bg-gray-100 text-gray-700 border-transparent dark:text-gray-300 dark:hover:bg-white/10",
};

export function Button({
  variant = "secondary",
  size = "md",
  className = "",
  children,
  ...rest
}: { variant?: keyof typeof BTN_VARIANTS; size?: "sm" | "md" } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const sizes = size === "sm" ? "px-2.5 py-1.5 text-xs" : "px-4 py-2 text-sm";
  return (
    <button
      type="button"
      {...rest}
      className={`inline-flex items-center justify-center gap-1.5 rounded-md border font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed ${sizes} ${BTN_VARIANTS[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

/* ---------- Champs ---------- */

const FIELD_BASE =
  "w-full rounded-md border border-gray-300 dark:border-[#2c3644] bg-white dark:bg-[#1a222c] px-3 py-2 text-sm text-gray-900 dark:text-gray-100 outline-none focus:border-[#e30613] focus:ring-2 focus:ring-[#e30613]/20";

export function Field({ label, hint, children, className = "" }: { label: string; hint?: string; children: ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-xs font-bold uppercase tracking-wide text-gray-600 dark:text-gray-400 mb-1">{label}</span>
      {children}
      {hint && <span className="block text-[11px] text-gray-400 mt-1">{hint}</span>}
    </label>
  );
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${FIELD_BASE} ${props.className ?? ""}`} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${FIELD_BASE} ${props.className ?? ""}`} />;
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${FIELD_BASE} ${props.className ?? ""}`} />;
}

export function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer select-none text-sm text-gray-700 dark:text-gray-300">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="peer sr-only" />
      <span className={`relative inline-block h-5 w-9 rounded-full transition ${checked ? "bg-[#e30613]" : "bg-gray-300 dark:bg-[#2c3644]"}`}>
        <span className={`absolute top-0.5 start-0.5 h-4 w-4 rounded-full bg-white shadow transition ${checked ? "translate-x-4 rtl:-translate-x-4" : ""}`} />
      </span>
      {label}
    </label>
  );
}

/* ---------- Notifications & badges ---------- */

export function Notice({ kind, children }: { kind: "ok" | "error" | "info"; children: ReactNode }) {
  const styles = {
    ok: "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/30 dark:border-green-800 dark:text-green-200",
    error: "bg-red-50 border-red-200 text-red-700 dark:bg-red-900/30 dark:border-red-800 dark:text-red-200",
    info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-200",
  };
  return <div role={kind === "error" ? "alert" : "status"} className={`rounded-md border px-3 py-2 text-sm ${styles[kind]}`}>{children}</div>;
}

export function Badge({ tone = "gray", children }: { tone?: "gray" | "green" | "red" | "amber" | "blue" | "dark"; children: ReactNode }) {
  const tones = {
    gray: "bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-300",
    green: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
    red: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    amber: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    blue: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
    dark: "bg-[#2f3d4c] text-white",
  };
  return <span className={`inline-block rounded px-2 py-0.5 text-[11px] font-bold ${tones[tone]}`}>{children}</span>;
}

/* ---------- Fenêtre modale ---------- */

export function Modal({ open, title, onClose, children, footer, wide = false }: { open: boolean; title: string; onClose: () => void; children: ReactNode; footer?: ReactNode; wide?: boolean }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`my-8 w-full ${wide ? "max-w-3xl" : "max-w-xl"} rounded-lg bg-white dark:bg-[#1a222c] border border-gray-200 dark:border-[#2c3644] shadow-2xl`} role="dialog" aria-modal="true" aria-label={title}>
        <header className="flex items-center justify-between border-b border-gray-200 dark:border-[#2c3644] px-5 py-3">
          <h2 className="font-bold text-gray-900 dark:text-white">{title}</h2>
          <button type="button" onClick={onClose} className="rounded p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10" aria-label="Fermer">
            <X size={18} />
          </button>
        </header>
        <div className="p-5 space-y-4">{children}</div>
        {footer && <footer className="flex flex-wrap justify-end gap-2 border-t border-gray-200 dark:border-[#2c3644] px-5 py-3">{footer}</footer>}
      </div>
    </div>
  );
}

/* ---------- Images ---------- */

/** Téléverse une image vers la médiathèque et renvoie son URL publique. */
export async function uploadImage(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  const r = await fetch("/api/admin/media", { method: "POST", body: fd });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || "Échec du téléversement");
  return j.url as string;
}

export function ImageField({ label, value, onChange, hint, aspect = "square" }: { label: string; value: string; onChange: (v: string) => void; hint?: string; aspect?: "square" | "wide" }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const thumb = aspect === "wide" ? "w-40 h-24" : "w-24 h-24";
  return (
    <div>
      <span className="block text-xs font-bold uppercase tracking-wide text-gray-600 dark:text-gray-400 mb-1">{label}</span>
      <div className="flex flex-wrap gap-3">
        <div className={`${thumb} shrink-0 overflow-hidden rounded-md border border-dashed border-gray-300 dark:border-[#2c3644] bg-gray-50 dark:bg-[#202a36] flex items-center justify-center`}>
          {value ? <img src={value} alt="" className="h-full w-full object-cover" /> : <ImageIcon className="text-gray-400" size={26} />}
        </div>
        <div className="flex-1 min-w-[220px] space-y-2">
          <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder="https://… ou URL téléversée" dir="ltr" />
          <div className="flex flex-wrap items-center gap-2">
            <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-gray-300 dark:border-[#2c3644] bg-white dark:bg-[#202a36] px-3 py-1.5 text-xs font-semibold hover:bg-gray-50 dark:hover:bg-[#2c3644]">
              {busy ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
              {busy ? "Envoi…" : "Téléverser une image"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="sr-only"
                disabled={busy}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  e.target.value = "";
                  if (!file) return;
                  setErr(null);
                  setBusy(true);
                  try {
                    onChange(await uploadImage(file));
                  } catch (error) {
                    setErr(error instanceof Error ? error.message : "Erreur");
                  }
                  setBusy(false);
                }}
              />
            </label>
            {value && (
              <Button size="sm" variant="ghost" onClick={() => onChange("")}>Retirer</Button>
            )}
          </div>
          {err && <p className="text-xs text-red-600">{err}</p>}
          {hint && <p className="text-[11px] text-gray-400">{hint}</p>}
        </div>
      </div>
    </div>
  );
}

/** Liste ordonnée d'images (galerie produit). */
export function ImageListField({ label, values, onChange }: { label: string; values: string[]; onChange: (v: string[]) => void }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const move = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= values.length) return;
    const next = [...values];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="block text-xs font-bold uppercase tracking-wide text-gray-600 dark:text-gray-400">{label}</span>
        <Button size="sm" variant="secondary" onClick={() => inputRef.current?.click()} disabled={busy}>
          {busy ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />} Ajouter une image
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="sr-only"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            if (!file) return;
            setErr(null);
            setBusy(true);
            try {
              onChange([...values, await uploadImage(file)]);
            } catch (error) {
              setErr(error instanceof Error ? error.message : "Erreur");
            }
            setBusy(false);
          }}
        />
      </div>
      {values.length === 0 && <p className="text-xs text-gray-400 py-2">Aucune image supplémentaire.</p>}
      <ul className="space-y-2">
        {values.map((url, i) => (
          <li key={`${i}-${url}`} className="flex items-center gap-2">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded border border-gray-200 dark:border-[#2c3644] bg-gray-50">
              {url && <img src={url} alt="" className="h-full w-full object-cover" />}
            </div>
            <Input value={url} dir="ltr" onChange={(e) => onChange(values.map((v, k) => (k === i ? e.target.value : v)))} className="flex-1" />
            <Button size="sm" variant="ghost" onClick={() => move(i, -1)} aria-label="Monter" disabled={i === 0}><ChevronUp size={14} /></Button>
            <Button size="sm" variant="ghost" onClick={() => move(i, 1)} aria-label="Descendre" disabled={i === values.length - 1}><ChevronDown size={14} /></Button>
            <Button size="sm" variant="danger" onClick={() => onChange(values.filter((_, k) => k !== i))} aria-label="Supprimer"><X size={14} /></Button>
          </li>
        ))}
      </ul>
      {err && <p className="text-xs text-red-600 mt-1">{err}</p>}
    </div>
  );
}

/** Édition d'une liste de lignes de texte (une valeur par ligne). */
export function LinesField({ label, value, onChange, hint, rows = 4 }: { label: string; value: string[]; onChange: (v: string[]) => void; hint?: string; rows?: number }) {
  return (
    <Field label={label} hint={hint}>
      <Textarea rows={rows} value={value.join("\n")} onChange={(e) => onChange(e.target.value.split("\n"))} />
    </Field>
  );
}

/** Texte de sélection "Clé: valeur" par ligne (caractéristiques). */
export function SpecsField({ label, value, onChange }: { label: string; value: Record<string, string>; onChange: (v: Record<string, string>) => void }) {
  const text = Object.entries(value).map(([k, v]) => `${k}: ${v}`).join("\n");
  return (
    <Field label={label} hint="Une caractéristique par ligne, au format « Nom: valeur ».">
      <Textarea
        rows={5}
        defaultValue={text}
        onChange={(e) => {
          const out: Record<string, string> = {};
          for (const line of e.target.value.split("\n")) {
            const idx = line.indexOf(":");
            if (idx < 0) continue;
            const k = line.slice(0, idx).trim();
            const v = line.slice(idx + 1).trim();
            if (k && v) out[k] = v;
          }
          onChange(out);
        }}
      />
    </Field>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return <div className="py-12 text-center text-sm text-gray-500 dark:text-gray-400">{children}</div>;
}


/** Grille de formulaire deux colonnes (écran large). */
export function Grid2({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-2">{children}</div>;
}

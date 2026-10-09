"use client";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button, Empty, Modal, Notice, PageHeader, api } from "./ui";

type Column<Row> = { head: string; render: (row: Row) => ReactNode; className?: string };

export type ResourceProps<Row extends { id: number }, Draft> = {
  title: string;
  subtitle?: string;
  endpoint: string;
  itemLabel: string;
  emptyDraft: () => Draft;
  toDraft: (row: Row) => Draft;
  toBody: (draft: Draft) => Record<string, unknown>;
  validate?: (draft: Draft) => string | null;
  columns: Column<Row>[];
  renderForm: (draft: Draft, set: (patch: Partial<Draft>) => void) => ReactNode;
  wide?: boolean;
  /** Pour une liste courte (tri par défaut côté serveur). */
  rowKey?: (row: Row) => string;
};

export default function ResourceManager<Row extends { id: number }, Draft>(props: ResourceProps<Row, Draft>) {
  const { endpoint, itemLabel } = props;
  const [rows, setRows] = useState<Row[] | null>(null);
  const [editing, setEditing] = useState<{ id: number | null } | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const load = useCallback(() => api<Row[]>(endpoint).then(setRows), [endpoint]);

  useEffect(() => {
    let alive = true;
    api<Row[]>(endpoint)
      .then((data) => alive && setRows(data))
      .catch((e: Error) => alive && setError(e.message || "Erreur de chargement"));
    return () => {
      alive = false;
    };
  }, [endpoint]);

  const open = (row: Row | null) => {
    setError(null);
    setNotice(null);
    if (row) {
      setEditing({ id: row.id });
      setDraft(props.toDraft(row));
    } else {
      setEditing({ id: null });
      setDraft(props.emptyDraft());
    }
  };

  const close = () => {
    setEditing(null);
    setDraft(null);
    setError(null);
  };

  const save = async () => {
    if (!draft) return;
    const invalid = props.validate?.(draft);
    if (invalid) {
      setError(invalid);
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const body = props.toBody(draft);
      if (editing?.id) {
        await api(`${endpoint}/${editing.id}`, { method: "PUT", body });
      } else {
        await api(endpoint, { method: "POST", body });
      }
      await load();
      setNotice(editing?.id ? `${itemLabel} mis à jour.` : `${itemLabel} créé.`);
      close();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
    }
    setBusy(false);
  };

  const remove = async () => {
    if (!editing?.id) return;
    if (!confirm(`Supprimer ce ${itemLabel.toLowerCase()} ? Cette action est définitive.`)) return;
    setBusy(true);
    try {
      await api(`${endpoint}/${editing.id}`, { method: "DELETE" });
      await load();
      setNotice(`${itemLabel} supprimé.`);
      close();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
    }
    setBusy(false);
  };

  return (
    <>
      <PageHeader
        title={props.title}
        subtitle={props.subtitle}
        actions={
          <Button variant="primary" onClick={() => open(null)}>
            <Plus size={16} /> Ajouter
          </Button>
        }
      />
      {notice && <div className="mb-4"><Notice kind="ok">{notice}</Notice></div>}
      {error && !editing && <div className="mb-4"><Notice kind="error">{error}</Notice></div>}

      {rows === null ? (
        <p className="text-sm text-gray-500">Chargement…</p>
      ) : rows.length === 0 ? (
        <Empty>Aucun élément pour le moment.</Empty>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-[#2c3644] bg-white dark:bg-[#1a222c]">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-[#202a36] text-left text-xs uppercase tracking-wide text-gray-500">
              <tr>
                {props.columns.map((c) => (
                  <th key={c.head} className={`px-3 py-2.5 font-bold ${c.className ?? ""}`}>{c.head}</th>
                ))}
                <th className="px-3 py-2.5 text-end font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-[#2c3644]">
              {rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50/70 dark:hover:bg-white/5">
                  {props.columns.map((c) => (
                    <td key={c.head} className={`px-3 py-2.5 align-middle ${c.className ?? ""}`}>{c.render(row)}</td>
                  ))}
                  <td className="px-3 py-2.5 text-end whitespace-nowrap">
                    <Button size="sm" variant="secondary" onClick={() => open(row)}><Pencil size={13} /> Modifier</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        open={editing !== null}
        onClose={close}
        wide={props.wide}
        title={editing?.id ? `Modifier — ${itemLabel}` : `Nouveau — ${itemLabel}`}
        footer={
          <>
            {editing?.id && (
              <Button variant="danger" onClick={remove} disabled={busy} className="me-auto">
                <Trash2 size={14} /> Supprimer
              </Button>
            )}
            <Button onClick={close} disabled={busy}>Annuler</Button>
            <Button variant="primary" onClick={save} disabled={busy}>{busy ? "Enregistrement…" : "Enregistrer"}</Button>
          </>
        }
      >
        {error && <Notice kind="error">{error}</Notice>}
        {draft && props.renderForm(draft, (patch) => setDraft((d) => (d ? { ...d, ...patch } : d)))}
      </Modal>
    </>
  );
}

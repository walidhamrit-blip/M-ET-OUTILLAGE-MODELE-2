"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { Button, Input, Notice } from "@/components/admin/ui";

export default function LoginForm({ configured, defaultActive }: { configured: boolean; defaultActive: boolean }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const r = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) {
        setError(j.error || "Connexion impossible.");
        setBusy(false);
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Erreur réseau.");
      setBusy(false);
    }
  };

  return (
    <div dir="ltr" className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#0f141a] px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-xl border border-gray-200 dark:border-[#2c3644] bg-white dark:bg-[#1a222c] p-7 shadow-lg space-y-5">
        <div className="text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#e30613] text-white"><Lock size={22} /></span>
          <h1 className="mt-3 text-xl font-black text-gray-900 dark:text-white">TRIPO-TECH</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Administration du site</p>
        </div>
        {!configured && (
          <Notice kind="error">Accès désactivé : la variable d&apos;environnement ADMIN_PASSWORD n&apos;est pas définie sur le serveur.</Notice>
        )}
        {configured && defaultActive && (
          <Notice kind="info">Mode développement : mot de passe par défaut « admin » (définissez ADMIN_PASSWORD pour le changer).</Notice>
        )}
        <label className="block">
          <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-gray-600 dark:text-gray-400">Mot de passe</span>
          <Input type="password" autoFocus autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={!configured} />
        </label>
        {error && <Notice kind="error">{error}</Notice>}
        <Button variant="primary" type="submit" className="w-full py-2.5" disabled={busy || !configured || !password}>
          {busy ? "Connexion…" : "Se connecter"}
        </Button>
      </form>
    </div>
  );
}

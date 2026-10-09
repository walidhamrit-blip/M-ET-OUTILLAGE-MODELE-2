import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin/auth";
import AdminShell from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

/** Garde d'accès : toutes les pages du panneau exigent une session administrateur. */
export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdmin())) redirect("/admin/login");
  return <AdminShell>{children}</AdminShell>;
}

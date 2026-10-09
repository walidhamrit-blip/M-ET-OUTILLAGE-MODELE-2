import { redirect } from "next/navigation";
import { isAdmin, isDefaultPasswordActive, adminPassword } from "@/lib/admin/auth";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin");
  return <LoginForm configured={!!adminPassword()} defaultActive={isDefaultPasswordActive()} />;
}

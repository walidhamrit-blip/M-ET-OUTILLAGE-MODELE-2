"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Languages, SlidersHorizontal, Images, Layers, Package, BadgeCheck, Store, ShoppingBag, Mail, Inbox, LogOut, ExternalLink,
} from "lucide-react";
import { ThemeToggle } from "@/components/Prefs";

const NAV = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard, exact: true },
  { href: "/admin/textes", label: "Textes du site", icon: Languages },
  { href: "/admin/parametres", label: "Paramètres & accueil", icon: SlidersHorizontal },
  { href: "/admin/diaporama", label: "Diaporama", icon: Images },
  { href: "/admin/rayons", label: "Rayons", icon: Layers },
  { href: "/admin/produits", label: "Produits", icon: Package },
  { href: "/admin/marques", label: "Marques", icon: BadgeCheck },
  { href: "/admin/magasins", label: "Magasins", icon: Store },
  { href: "/admin/commandes", label: "Commandes", icon: ShoppingBag },
  { href: "/admin/demandes", label: "Demandes", icon: Inbox },
  { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <div dir="ltr" className="min-h-screen bg-gray-100 dark:bg-[#0f141a] text-gray-900 dark:text-gray-100 md:flex">
      <aside className="md:w-60 md:shrink-0 bg-[#2f3d4c] text-white md:min-h-screen md:sticky md:top-0 md:h-screen md:overflow-y-auto">
        <div className="px-5 py-4 border-b border-white/10">
          <div className="font-black italic text-lg tracking-tight">TRIPO<span className="text-[#ffea00]">-TECH</span></div>
          <div className="text-[11px] uppercase tracking-widest text-white/60">Administration</div>
        </div>
        <nav className="flex md:flex-col gap-1 overflow-x-auto p-2 md:p-3">
          {NAV.map((item) => {
            const active = item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex shrink-0 items-center gap-2.5 rounded-md px-3 py-2 text-sm font-semibold transition ${
                  active ? "bg-[#e30613] text-white" : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={17} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-end gap-2 border-b border-gray-200 dark:border-[#2c3644] bg-white dark:bg-[#1a222c] px-4 py-2.5">
          <ThemeToggle className="!text-gray-600 dark:!text-gray-300 !border-gray-300 dark:!border-[#2c3644]" />
          <a href="/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10">
            <ExternalLink size={15} /> Voir le site
          </a>
          <button type="button" onClick={logout} className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 dark:border-[#2c3644] px-3 py-1.5 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-white/10">
            <LogOut size={15} /> Déconnexion
          </button>
        </div>
        <main className="p-4 sm:p-6 max-w-[1200px]">{children}</main>
      </div>
    </div>
  );
}

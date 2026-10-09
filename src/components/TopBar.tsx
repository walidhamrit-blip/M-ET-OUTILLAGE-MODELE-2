"use client";
import { Phone, MapPin, Truck, ShieldCheck, Globe } from "lucide-react";
import Link from "next/link";

export default function TopBar() {
  return (
    <div className="hidden md:block bg-[#243140] text-[12px] text-gray-300">
      <div className="mx-auto max-w-[1280px] px-4 flex items-center justify-between h-[32px]">
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5 hover:text-white transition">
            <Phone size={13} className="text-[#ffea00]" />
            <a href="tel:+218214444444" className="font-semibold tracking-wide">+218 21 444 44 44</a>
          </span>
          <Link href="/magasins" className="topbar-link flex items-center gap-1.5 transition">
            <MapPin size={13} />
            Nos magasins à Tripoli
          </Link>
          <span className="hidden lg:flex items-center gap-1.5">
            <Truck size={13} />
            Livraison partout en Libye
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-green-400" />
            Paiement à la livraison
          </span>
          <button className="flex items-center gap-1 topbar-link transition">
            <Globe size={13} /> FR | <span className="font-arabic">عربي</span>
          </button>
          <span className="bg-[#e30613] text-white px-2 py-[1px] rounded-sm font-bold">LYD د.ل</span>
        </div>
      </div>
    </div>
  );
}

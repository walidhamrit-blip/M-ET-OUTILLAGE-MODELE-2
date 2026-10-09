"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useI18n } from "@/i18n/AppProvider";

const CART_KEY = "tripo-cart";
const FAV_KEY = "tripo-fav";
// Anciennes clés (avant le renommage en TRIPO-TECH), lues une seule fois pour ne pas perdre le panier.
const LEGACY_CART_KEY = "matek-cart";
const LEGACY_FAV_KEY = "matek-fav";

export type CartItem = {
  id: number;
  name: string;
  slug: string;
  image: string;
  price: number;
  oldPrice?: number | null;
  qty: number;
  reference?: string | null;
};

type CartContextType = {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  toast: string | null;
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeItem: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  clear: () => void;
  setOpen: (v: boolean) => void;
  favorites: number[];
  toggleFavorite: (id: number) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loaded, setLoaded] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_KEY) ?? localStorage.getItem(LEGACY_CART_KEY);
      if (raw) setItems(JSON.parse(raw));
      const fav = localStorage.getItem(FAV_KEY) ?? localStorage.getItem(LEGACY_FAV_KEY);
      if (fav) setFavorites(JSON.parse(fav));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    localStorage.removeItem(LEGACY_CART_KEY);
  }, [items, loaded]);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
    localStorage.removeItem(LEGACY_FAV_KEY);
  }, [favorites, loaded]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const addItem: CartContextType["addItem"] = (item, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((p) => p.id === item.id);
      if (found) {
        return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + qty } : p));
      }
      return [...prev, { ...item, qty }];
    });
    setToast(t("common.addedToCart", { name: item.name }));
  };

  const removeItem = (id: number) => setItems((prev) => prev.filter((p) => p.id !== id));
  const updateQty = (id: number, qty: number) => {
    if (qty <= 0) return removeItem(id);
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty } : p)));
  };
  const clear = () => setItems([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  };

  const { count, subtotal } = useMemo(() => {
    return {
      count: items.reduce((a, b) => a + b.qty, 0),
      subtotal: items.reduce((a, b) => a + b.qty * b.price, 0),
    };
  }, [items]);

  return (
    <CartContext.Provider
      value={{ items, count, subtotal, isOpen, toast, addItem, removeItem, updateQty, clear, setOpen, favorites, toggleFavorite }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

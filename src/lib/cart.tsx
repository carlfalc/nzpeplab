import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getById, type Product } from "./products";

export type CartItem = { id: string; qty: number };
type CartCtx = {
  items: CartItem[];
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  detailed: { product: Product; qty: number }[];
  open: boolean;
  setOpen: (v: boolean) => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "nzpep_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (hydrated) localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const add: CartCtx["add"] = (id, qty = 1) =>
    setItems((prev) => {
      const found = prev.find((i) => i.id === id);
      if (found) return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { id, qty }];
    });
  const remove: CartCtx["remove"] = (id) => setItems((prev) => prev.filter((i) => i.id !== id));
  const setQty: CartCtx["setQty"] = (id, qty) =>
    setItems((prev) => (qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty } : i))));
  const clear = () => setItems([]);

  const detailed = items
    .map((i) => {
      const product = getById(i.id);
      return product ? { product, qty: i.qty } : null;
    })
    .filter(Boolean) as { product: Product; qty: number }[];
  const count = items.reduce((a, b) => a + b.qty, 0);
  const subtotal = detailed.reduce((a, b) => a + b.product.price * b.qty, 0);

  return (
    <Ctx.Provider value={{ items, add, remove, setQty, clear, count, subtotal, detailed, open, setOpen }}>
      {children}
    </Ctx.Provider>
  );
}

export const useCart = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart must be inside CartProvider");
  return v;
};

export const fmt = (n: number) => `$${n.toFixed(2)} NZD`;

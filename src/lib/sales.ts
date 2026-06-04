import { PRODUCTS, type Product } from "./products";

// Seed sales counts (used as starting popularity until real orders accumulate).
// Higher = more popular. These get added to live order counts from localStorage.
const SEED: Record<string, number> = {
  p1: 142, // Retatrutide
  p2: 128, // Tirzepatide
  p3: 115, // BPC-157
  p5: 98,  // Epitalon
  p7: 91,  // Ipamorelin
  p4: 84,  // TB-500
  p6: 72,  // GHK-Cu
  p9: 61,  // Semax
  p8: 55,  // CJC-1295
  p10: 48, // Selank
  p11: 40, // BAC water
  p12: 33, // Syringes
};

const KEY = "nzpep_sales_v1";

function readLive(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

export function recordSale(items: { id: string; qty: number }[]) {
  if (typeof window === "undefined") return;
  const live = readLive();
  for (const it of items) {
    live[it.id] = (live[it.id] || 0) + it.qty;
  }
  localStorage.setItem(KEY, JSON.stringify(live));
}

export function getSalesCount(id: string): number {
  return (SEED[id] || 0) + (readLive()[id] || 0);
}

export function getTopSellers(limit = 10): (Product & { sales: number; rank: number })[] {
  const ranked = PRODUCTS.map((p) => ({ ...p, sales: getSalesCount(p.id) }))
    .sort((a, b) => b.sales - a.sales)
    .slice(0, limit)
    .map((p, i) => ({ ...p, rank: i + 1 }));
  return ranked;
}

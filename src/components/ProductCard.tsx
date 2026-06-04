import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/products";
import { useCart, fmt } from "@/lib/cart";
import { Plus } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  const { add, setOpen } = useCart();
  return (
    <div className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <Link to="/product/$slug" params={{ slug: product.slug }} className="block">
        <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-ink via-ink to-ink/80 flex items-center justify-center">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_30%,var(--color-lime),transparent_50%)]" />
          <div className="relative text-center">
            <div className="font-display text-3xl sm:text-4xl font-bold text-lime">
              {product.mg ? `${product.mg}` : "—"}
              {product.mg && <span className="text-base font-medium">mg</span>}
            </div>
            <div className="nav-label text-white/70 mt-1 text-[10px]">{product.name}</div>
          </div>
          {product.purity >= 98 && (
            <span className="absolute top-3 left-3 bg-lime text-lime-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">
              {product.purity}% HPLC
            </span>
          )}
        </div>
      </Link>
      <div className="p-4 sm:p-5">
        <Link to="/product/$slug" params={{ slug: product.slug }}>
          <h3 className="font-semibold text-base group-hover:text-ink transition">{product.name}</h3>
        </Link>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-display font-bold text-lg">{fmt(product.price)}</span>
          <button
            onClick={() => { add(product.id); setOpen(true); }}
            className="bg-ink text-ink-foreground hover:bg-lime hover:text-lime-foreground p-2.5 rounded-full transition"
            aria-label="Add to cart"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

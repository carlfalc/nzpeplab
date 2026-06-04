import { Link } from "@tanstack/react-router";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart, fmt } from "@/lib/cart";
import { FREE_SHIP_THRESHOLD } from "@/lib/products";

export function CartDrawer() {
  const { open, setOpen, detailed, setQty, remove, subtotal, count } = useCart();
  if (!open) return null;
  const remaining = Math.max(0, FREE_SHIP_THRESHOLD - subtotal);

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <aside className="absolute right-0 top-0 h-full w-full sm:w-[440px] bg-background flex flex-col shadow-2xl">
        <header className="flex items-center justify-between p-5 border-b border-border">
          <h3 className="font-display font-bold text-lg">Your Cart ({count})</h3>
          <button onClick={() => setOpen(false)} className="p-2 hover:bg-muted rounded-lg"><X className="h-5 w-5" /></button>
        </header>

        {subtotal > 0 && (
          <div className="px-5 py-3 bg-muted text-sm">
            {remaining > 0 ? (
              <>Add <strong>{fmt(remaining)}</strong> for free NZ shipping.</>
            ) : (
              <span className="text-foreground font-medium">🎉 You've unlocked free NZ shipping!</span>
            )}
            <div className="mt-2 h-1.5 bg-border rounded-full overflow-hidden">
              <div className="h-full bg-lime transition-all" style={{ width: `${Math.min(100, (subtotal / FREE_SHIP_THRESHOLD) * 100)}%` }} />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {detailed.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p>Your cart is empty.</p>
              <Link to="/shop" onClick={() => setOpen(false)} className="inline-block mt-4 nav-label text-lime hover:underline">
                Browse products →
              </Link>
            </div>
          )}
          {detailed.map(({ product, qty }) => (
            <div key={product.id} className="flex gap-4 border-b border-border pb-4">
              <div className="h-20 w-20 rounded-lg bg-gradient-to-br from-ink to-muted-foreground/40 flex items-center justify-center text-lime font-display font-bold">
                {product.mg ? `${product.mg}mg` : "—"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{product.name}</p>
                <p className="text-xs text-muted-foreground">Purity {product.purity}%</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center border border-border rounded-md">
                    <button className="p-1.5" onClick={() => setQty(product.id, qty - 1)}><Minus className="h-3.5 w-3.5" /></button>
                    <span className="px-2 text-sm font-medium">{qty}</span>
                    <button className="p-1.5" onClick={() => setQty(product.id, qty + 1)}><Plus className="h-3.5 w-3.5" /></button>
                  </div>
                  <span className="font-semibold">{fmt(product.price * qty)}</span>
                </div>
              </div>
              <button onClick={() => remove(product.id)} className="text-muted-foreground hover:text-destructive p-1 h-fit">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {detailed.length > 0 && (
          <footer className="border-t border-border p-5 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold">{fmt(subtotal)}</span>
            </div>
            <Link
              to="/checkout"
              onClick={() => setOpen(false)}
              className="block text-center bg-ink text-ink-foreground py-4 rounded-lg nav-label hover:bg-ink/90 transition"
            >
              Checkout →
            </Link>
            <Link to="/cart" onClick={() => setOpen(false)} className="block text-center text-sm text-muted-foreground hover:text-foreground">
              View full cart
            </Link>
          </footer>
        )}
      </aside>
    </div>
  );
}

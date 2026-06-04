import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart, fmt } from "@/lib/cart";
import { FREE_SHIP_THRESHOLD } from "@/lib/products";
import { Minus, Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — NZ Peptide Lab" }] }),
  component: CartPage,
});

function CartPage() {
  const { detailed, setQty, remove, subtotal } = useCart();
  const shipping = subtotal >= FREE_SHIP_THRESHOLD || subtotal === 0 ? 0 : 9.5;

  return (
    <div className="container-px max-w-5xl mx-auto py-10 sm:py-14">
      <h1 className="font-display text-3xl sm:text-4xl font-bold">Your cart</h1>

      {detailed.length === 0 ? (
        <div className="mt-12 text-center text-muted-foreground">
          <p>Your cart is empty.</p>
          <Link to="/shop" className="mt-4 inline-block bg-ink text-ink-foreground px-6 py-3 rounded-full nav-label">Browse products</Link>
        </div>
      ) : (
        <div className="mt-8 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-3">
            {detailed.map(({ product, qty }) => (
              <div key={product.id} className="flex gap-4 bg-card border border-border rounded-2xl p-4">
                <div className="h-24 w-24 rounded-xl bg-gradient-to-br from-ink to-muted-foreground/30 flex items-center justify-center text-lime font-display font-bold">
                  {product.mg ? `${product.mg}mg` : "—"}
                </div>
                <div className="flex-1 min-w-0">
                  <Link to="/product/$slug" params={{ slug: product.slug }} className="font-semibold hover:text-ink">{product.name}</Link>
                  <p className="text-xs text-muted-foreground">Purity {product.purity}% · {fmt(product.price)} each</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center border border-border rounded-md">
                      <button className="p-2" onClick={() => setQty(product.id, qty - 1)}><Minus className="h-3.5 w-3.5" /></button>
                      <span className="px-3 text-sm font-medium">{qty}</span>
                      <button className="p-2" onClick={() => setQty(product.id, qty + 1)}><Plus className="h-3.5 w-3.5" /></button>
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

          <div className="lg:col-span-1">
            <div className="bg-muted/40 border border-border rounded-2xl p-6 sticky top-24">
              <h3 className="font-display font-bold text-lg">Order summary</h3>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{fmt(subtotal)}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{shipping === 0 ? "Free" : fmt(shipping)}</dd></div>
                <div className="flex justify-between border-t border-border pt-3 mt-3 font-display font-bold text-lg"><dt>Total</dt><dd>{fmt(subtotal + shipping)}</dd></div>
              </dl>
              <Link to="/checkout" className="mt-6 block text-center bg-ink text-ink-foreground py-4 rounded-full nav-label hover:bg-ink/90">
                Proceed to checkout
              </Link>
              <p className="mt-3 text-xs text-muted-foreground text-center">Secure checkout · Card · Apple Pay · Wise</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

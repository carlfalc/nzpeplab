import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCart, fmt } from "@/lib/cart";
import { FREE_SHIP_THRESHOLD } from "@/lib/products";
import { useState } from "react";
import { CreditCard, Building2, Check } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — NZ Peptide Lab" }] }),
  component: Checkout,
});

type Pay = "card" | "wise";

function Checkout() {
  const { detailed, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [pay, setPay] = useState<Pay>("card");
  const [agree, setAgree] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [orderRef] = useState(() => `NZP-${Date.now().toString().slice(-6)}`);
  const shipping = subtotal >= FREE_SHIP_THRESHOLD || subtotal === 0 ? 0 : 9.5;
  const total = subtotal + shipping;

  if (detailed.length === 0) {
    return (
      <div className="container-px max-w-3xl mx-auto py-20 text-center">
        <p className="text-muted-foreground">Your cart is empty.</p>
        <Link to="/shop" className="mt-6 inline-block bg-ink text-ink-foreground px-6 py-3 rounded-full nav-label">Shop now</Link>
      </div>
    );
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) return;
    setSubmitting(true);
    setTimeout(() => {
      clear();
      navigate({ to: "/order-confirmed", search: { ref: orderRef, method: pay } });
    }, 800);
  };

  return (
    <div className="container-px max-w-6xl mx-auto py-10 sm:py-14">
      <h1 className="font-display text-3xl sm:text-4xl font-bold">Checkout</h1>

      <form onSubmit={onSubmit} className="mt-8 grid lg:grid-cols-[1fr_400px] gap-8">
        <div className="space-y-8">
          <Section title="Contact">
            <Field label="Email" type="email" required name="email" />
            <Field label="Phone (optional)" type="tel" name="phone" />
          </Section>

          <Section title="Shipping address">
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="First name" required name="fn" />
              <Field label="Last name" required name="ln" />
            </div>
            <Field label="Address" required name="addr" />
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="City" required name="city" />
              <Field label="Postcode" required name="pc" />
            </div>
            <div className="text-sm text-muted-foreground bg-muted/40 rounded-lg p-3">
              Shipping to <strong>New Zealand</strong> only · Tracked overnight courier
            </div>
          </Section>

          <Section title="Payment">
            <div className="grid sm:grid-cols-2 gap-3">
              <PayOption active={pay === "card"} onClick={() => setPay("card")} icon={CreditCard} title="Card / Apple Pay" sub="Secure Stripe checkout" />
              <PayOption active={pay === "wise"} onClick={() => setPay("wise")} icon={Building2} title="Wise / Bank Transfer" sub="Instructions on next page" />
            </div>

            {pay === "card" && (
              <div className="mt-4 border border-border rounded-xl p-4 bg-muted/30 text-sm text-muted-foreground">
                <p>Stripe integration is ready to enable. Once connected, secure card + Apple Pay fields appear here.</p>
              </div>
            )}
            {pay === "wise" && (
              <div className="mt-4 border border-border rounded-xl p-4 bg-muted/30 text-sm space-y-2">
                <p className="font-semibold">After placing your order, transfer to:</p>
                <p className="font-mono text-xs">Account: NZ Peptide Lab Ltd<br/>BSB / Bank: ANZ NZ — 01-0123-0456789-00<br/>Wise: nzpeplab@wise.com</p>
                <p className="text-muted-foreground">Reference: <strong className="text-foreground">{orderRef}</strong> — orders dispatch once funds clear (usually same day with Wise).</p>
              </div>
            )}
          </Section>

          <label className="flex items-start gap-3 text-sm cursor-pointer">
            <input type="checkbox" required checked={agree} onChange={(e) => setAgree(e.target.checked)}
              className="mt-1 h-4 w-4 accent-lime" />
            <span className="text-muted-foreground">
              I confirm I am 18+ and acknowledge that all products are for <strong className="text-foreground">research purposes only — not for human consumption</strong>. I agree to the Terms & Privacy Policy.
            </span>
          </label>
        </div>

        <aside>
          <div className="bg-muted/40 border border-border rounded-2xl p-6 sticky top-24">
            <h3 className="font-display font-bold text-lg mb-4">Order summary</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {detailed.map(({ product, qty }) => (
                <div key={product.id} className="flex gap-3 text-sm">
                  <div className="h-12 w-12 shrink-0 rounded-lg bg-gradient-to-br from-ink to-muted-foreground/30 flex items-center justify-center text-lime font-bold text-xs">
                    {product.mg ? `${product.mg}` : "—"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{product.name}</p>
                    <p className="text-muted-foreground text-xs">Qty {qty}</p>
                  </div>
                  <span className="font-medium">{fmt(product.price * qty)}</span>
                </div>
              ))}
            </div>
            <dl className="mt-5 pt-4 border-t border-border space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{fmt(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{shipping === 0 ? "Free" : fmt(shipping)}</dd></div>
              <div className="flex justify-between font-display font-bold text-lg pt-2 border-t border-border"><dt>Total</dt><dd>{fmt(total)}</dd></div>
            </dl>
            <button
              type="submit"
              disabled={!agree || submitting}
              className="mt-5 w-full bg-lime text-lime-foreground py-4 rounded-full nav-label disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-105 transition"
            >
              {submitting ? "Placing order…" : `Place order · ${fmt(total)}`}
            </button>
          </div>
        </aside>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-card border border-border rounded-2xl p-6 space-y-3">
      <h3 className="font-display font-bold text-lg">{title}</h3>
      {children}
    </section>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground nav-label">{label}</span>
      <input {...props} className="mt-1 w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-ink" />
    </label>
  );
}

function PayOption({ active, onClick, icon: Icon, title, sub }: { active: boolean; onClick: () => void; icon: typeof CreditCard; title: string; sub: string }) {
  return (
    <button type="button" onClick={onClick} className={`text-left border-2 rounded-xl p-4 transition ${active ? "border-ink bg-ink/5" : "border-border hover:border-ink/40"}`}>
      <div className="flex items-center justify-between">
        <Icon className="h-5 w-5" />
        {active && <Check className="h-4 w-4 text-lime" />}
      </div>
      <div className="mt-3 font-semibold text-sm">{title}</div>
      <div className="text-xs text-muted-foreground">{sub}</div>
    </button>
  );
}

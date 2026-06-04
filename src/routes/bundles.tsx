import { createFileRoute } from "@tanstack/react-router";
import { BUNDLES, getById } from "@/lib/products";
import { useCart, fmt } from "@/lib/cart";

export const Route = createFileRoute("/bundles")({
  head: () => ({ meta: [{ title: "Stacks & Bundles — NZ Peptide Lab" }] }),
  component: BundlesPage,
});

function BundlesPage() {
  const { add, setOpen } = useCart();
  return (
    <div className="container-px max-w-7xl mx-auto py-14">
      <span className="nav-label text-muted-foreground">Save more</span>
      <h1 className="font-display text-4xl font-bold mt-1">Stacks & Bundles</h1>
      <p className="mt-3 text-muted-foreground max-w-xl">Hand-picked peptide combinations for popular research protocols. Save more when you stack.</p>

      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {BUNDLES.map(b => (
          <div key={b.id} className="bg-card border border-border rounded-2xl p-6 relative">
            <span className="absolute top-4 right-4 bg-lime text-lime-foreground nav-label text-[10px] px-2 py-1 rounded-full">{b.tag}</span>
            <h3 className="font-display text-2xl font-bold">{b.name}</h3>
            <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
              {b.productIds.map(pid => {
                const p = getById(pid)!;
                return <li key={pid}>· {p.name} {p.mg}mg — {p.purity}% HPLC</li>;
              })}
            </ul>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold">{fmt(b.price)}</span>
              <span className="text-sm text-muted-foreground line-through">{fmt(b.original)}</span>
            </div>
            <button
              onClick={() => { b.productIds.forEach(pid => add(pid)); setOpen(true); }}
              className="mt-5 w-full bg-ink text-ink-foreground py-3 rounded-full nav-label hover:bg-ink/90"
            >Add stack to cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProduct, PRODUCTS } from "@/lib/products";
import { useCart, fmt } from "@/lib/cart";
import { ProductCard } from "@/components/ProductCard";
import { ShieldCheck, Truck, FileText, ArrowLeft } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} ${loaderData.product.mg ?? ""}mg — NZ Peptide Lab` },
          { name: "description", content: loaderData.product.description },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="container-px py-20 text-center">
      <p className="text-muted-foreground">Product not found.</p>
      <Link to="/shop" className="nav-label text-lime mt-4 inline-block">Back to shop →</Link>
    </div>
  ),
  errorComponent: () => <div className="container-px py-20 text-center">Something went wrong.</div>,
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add, setOpen } = useCart();
  const [qty, setQty] = useState(1);
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <>
      <div className="container-px max-w-7xl mx-auto pt-8 pb-16">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-ink mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <div className="aspect-square rounded-3xl relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-ink via-ink to-ink/80">
              {product.image ? (
                <img
                  src={product.image}
                  alt={`${product.name} ${product.mg ?? ""}${product.unit ?? "mg"} vial`}
                  className="h-full w-full object-contain p-6 bg-white"
                />
              ) : (
                <>
                  <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_30%,var(--color-lime),transparent_55%)]" />
                  <div className="relative text-center">
                    <div className="font-display text-6xl sm:text-8xl font-bold text-lime">
                      {product.mg ?? "—"}
                      {product.mg && <span className="text-2xl">{product.unit ?? "mg"}</span>}
                    </div>
                    <div className="nav-label text-white/70 mt-4">{product.name}</div>
                  </div>
                </>
              )}
              <span className="absolute top-5 left-5 bg-lime text-lime-foreground nav-label text-xs px-3 py-1.5 rounded-full z-10">
                {product.purity}% HPLC
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2 mt-3">
              {[0,1,2,3].map(i => (
                <div key={i} className="aspect-square rounded-xl bg-muted border border-border" />
              ))}
            </div>
          </div>

          <div>
            <span className="nav-label text-muted-foreground">{product.category.replace("-", " ")}</span>
            <h1 className="mt-2 font-display text-3xl sm:text-5xl font-bold tracking-tight">{product.name}</h1>
            <div className="mt-3 flex items-center gap-3">
              <span className="font-display text-3xl font-bold">{fmt(product.price)}</span>
              {product.mg && <span className="text-muted-foreground">· {product.mg}mg vial</span>}
            </div>
            <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

            <div className="mt-8 flex items-center gap-3">
              <div className="flex items-center border border-border rounded-full">
                <button className="px-4 py-3" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span className="w-8 text-center font-medium">{qty}</span>
                <button className="px-4 py-3" onClick={() => setQty(q => q + 1)}>+</button>
              </div>
              <button
                onClick={() => { add(product.id, qty); setOpen(true); }}
                className="flex-1 bg-ink text-ink-foreground py-4 rounded-full nav-label hover:bg-ink/90 transition"
              >
                Add to Cart · {fmt(product.price * qty)}
              </button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 text-xs">
              <Feature icon={ShieldCheck} label="HPLC verified" />
              <Feature icon={Truck} label="NZ overnight" />
              <Feature icon={FileText} label="Batch COA" />
            </div>

            <div className="mt-10 border border-border rounded-2xl overflow-hidden">
              <div className="bg-muted px-5 py-3 nav-label">Specifications</div>
              <dl className="divide-y divide-border text-sm">
                <Row k="Purity" v={`${product.purity}% (HPLC)`} />
                {product.mg && <Row k="Size" v={`${product.mg}mg lyophilised`} />}
                {product.sequence && <Row k="Type" v={product.sequence} />}
                {product.storage && <Row k="Storage" v={product.storage} />}
                <Row k="Batch COA" v={<Link to="/coas" className="text-lime hover:underline">Download PDF →</Link>} />
              </dl>
            </div>

            <p className="mt-8 text-xs text-muted-foreground border-t border-border pt-4 uppercase tracking-wider">
              For research purposes only. Not for human consumption.
            </p>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="font-display text-2xl font-bold mb-6">Related products</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>

      {/* Sticky mobile add-to-cart */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-background border-t border-border p-3 flex gap-2">
        <div className="flex-1">
          <div className="text-xs text-muted-foreground">{product.name}</div>
          <div className="font-display font-bold">{fmt(product.price * qty)}</div>
        </div>
        <button
          onClick={() => { add(product.id, qty); setOpen(true); }}
          className="bg-lime text-lime-foreground px-6 py-3 rounded-full nav-label"
        >Add to Cart</button>
      </div>
    </>
  );
}

function Feature({ icon: Icon, label }: { icon: typeof ShieldCheck; label: string }) {
  return (
    <div className="border border-border rounded-xl p-3 text-center">
      <Icon className="h-4 w-4 mx-auto text-ink" />
      <div className="mt-1 nav-label text-[10px]">{label}</div>
    </div>
  );
}
function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex justify-between px-5 py-3">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="font-medium text-right">{v}</dd>
    </div>
  );
}

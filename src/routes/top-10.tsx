import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Flame, TrendingUp } from "lucide-react";
import { getTopSellers } from "@/lib/sales";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/lib/products";

export const Route = createFileRoute("/top-10")({
  head: () => ({
    meta: [
      { title: "Top 10 Bestsellers — NZ Peptide Lab" },
      { name: "description", content: "The 10 most-ordered research peptides on NZ Peptide Lab, updated live from real sales." },
      { property: "og:title", content: "Top 10 Bestsellers — NZ Peptide Lab" },
      { property: "og:description", content: "The 10 most-ordered research peptides, updated live from real sales." },
    ],
  }),
  component: TopTen,
});

function TopTen() {
  // Sales live in localStorage, so compute after hydration to avoid SSR mismatch.
  const [top, setTop] = useState<(Product & { sales: number; rank: number })[]>([]);
  useEffect(() => {
    setTop(getTopSellers(10));
  }, []);

  return (
    <div>
      <section className="bg-ink text-ink-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top_left,var(--color-lime),transparent_60%)]" />
        <div className="container-px max-w-7xl mx-auto relative py-16 sm:py-20">
          <span className="nav-label inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
            <Flame className="h-3.5 w-3.5 text-lime" /> Live bestsellers
          </span>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl font-bold leading-tight">
            The <span className="text-lime">Top 10</span> peptides<br/>
            researchers are ordering now.
          </h1>
          <p className="mt-4 text-ink-foreground/70 max-w-xl">
            Ranked by real order volume. Updates automatically every time a researcher checks out.
          </p>
        </div>
      </section>

      <section className="container-px max-w-7xl mx-auto py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {top.map((p) => (
            <div key={p.id} className="relative">
              <span className="absolute -top-3 -left-3 z-10 h-10 w-10 rounded-full bg-lime text-lime-foreground font-display font-bold flex items-center justify-center shadow-lg">
                {p.rank}
              </span>
              <ProductCard product={p} />
              <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-lime" />
                {p.sales} sold
              </div>
            </div>
          ))}
        </div>
        {top.length === 0 && (
          <p className="text-center text-muted-foreground py-10">Loading bestsellers…</p>
        )}
        <div className="mt-12 text-center">
          <Link to="/shop" className="inline-flex bg-ink text-ink-foreground px-7 py-3 rounded-full nav-label hover:bg-ink/90 transition">
            Browse the full catalog →
          </Link>
        </div>
      </section>
    </div>
  );
}

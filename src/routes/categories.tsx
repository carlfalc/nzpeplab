import { createFileRoute, Link } from "@tanstack/react-router";
import { CATEGORIES } from "@/lib/products";

export const Route = createFileRoute("/categories")({
  head: () => ({ meta: [{ title: "Categories — NZ Peptide Lab" }] }),
  component: () => (
    <div className="container-px max-w-7xl mx-auto py-14">
      <h1 className="font-display text-4xl font-bold">Categories</h1>
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CATEGORIES.map((c, i) => (
          <Link key={c.id} to="/shop" search={{ category: c.id }}
            className={`rounded-2xl p-8 border border-border hover:-translate-y-1 transition ${i % 3 === 0 ? "bg-ink text-ink-foreground" : "bg-card"}`}>
            <span className={`nav-label ${i % 3 === 0 ? "text-lime" : "text-muted-foreground"}`}>0{i+1}</span>
            <h3 className="mt-4 font-display text-2xl font-bold">{c.name}</h3>
            <p className={`mt-2 text-sm ${i % 3 === 0 ? "text-ink-foreground/60" : "text-muted-foreground"}`}>{c.blurb}</p>
          </Link>
        ))}
      </div>
    </div>
  ),
});

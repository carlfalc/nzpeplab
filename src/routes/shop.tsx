import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PRODUCTS, CATEGORIES, type Category } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

type Search = { category?: Category; sort?: "price-asc" | "price-desc" | "popular" };

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    category: s.category as Category | undefined,
    sort: (s.sort as Search["sort"]) ?? "popular",
  }),
  head: () => ({
    meta: [
      { title: "Shop Research Peptides — NZ Peptide Lab" },
      { name: "description", content: "Browse our full range of HPLC-verified research peptides. Filter by category, sort by price." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const { category, sort } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (category) list = list.filter(p => p.category === category);
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "popular") list.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    return list;
  }, [category, sort]);

  return (
    <div className="container-px max-w-7xl mx-auto py-10 sm:py-14">
      <header className="mb-8">
        <span className="nav-label text-muted-foreground">Catalog</span>
        <h1 className="font-display text-3xl sm:text-5xl font-bold mt-1">
          {category ? CATEGORIES.find(c => c.id === category)?.name : "All Peptides"}
        </h1>
        <p className="mt-2 text-muted-foreground">{filtered.length} products · HPLC verified · shipped from Auckland</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-56 shrink-0">
          <button onClick={() => setOpen(!open)} className="lg:hidden w-full p-3 border border-border rounded-lg nav-label">
            {open ? "Hide" : "Show"} filters
          </button>
          <div className={`${open ? "block" : "hidden"} lg:block mt-4 lg:mt-0 space-y-6`}>
            <div>
              <h4 className="nav-label mb-3">Category</h4>
              <ul className="space-y-1">
                <li>
                  <Link to="/shop" className={`block py-1.5 text-sm hover:text-ink ${!category ? "font-semibold text-ink" : "text-muted-foreground"}`}>All</Link>
                </li>
                {CATEGORIES.map(c => (
                  <li key={c.id}>
                    <Link to="/shop" search={{ category: c.id }} className={`block py-1.5 text-sm hover:text-ink ${category === c.id ? "font-semibold text-ink" : "text-muted-foreground"}`}>{c.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="nav-label mb-3">Sort by</h4>
              <select
                value={sort}
                onChange={(e) => navigate({ search: (s) => ({ ...s, sort: e.target.value as Search["sort"] }) })}
                className="w-full p-2 border border-border rounded-lg bg-background text-sm"
              >
                <option value="popular">Popularity</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
            </div>
          </div>
        </aside>

        <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}

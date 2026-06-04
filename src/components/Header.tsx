import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { CATEGORIES } from "@/lib/products";

const NAV = [
  { to: "/top-10", label: "Top 10" },
  { to: "/shop", label: "Shop" },
  { to: "/categories", label: "Categories" },
  { to: "/bundles", label: "Stacks" },
  { to: "/coas", label: "COAs" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { count, setOpen } = useCart();
  const [menu, setMenu] = useState(false);

  return (
    <>
      <div className="bg-lime text-lime-foreground text-center text-xs sm:text-sm py-2 px-4 font-medium">
        Free NZ shipping over $150 · Pay with Card, Apple Pay or Wise · Tracked overnight courier
      </div>
      <header className="sticky top-0 z-40 bg-ink text-ink-foreground border-b border-white/10">
        <div className="container-px max-w-7xl mx-auto h-16 flex items-center justify-between gap-4">
          <button onClick={() => setMenu(true)} className="lg:hidden p-2 -ml-2" aria-label="Menu">
            <Menu className="h-6 w-6" />
          </button>

          <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg tracking-tight">
            <span className="h-3 w-3 rounded-full bg-lime" />
            <span>NZ<span className="text-lime">PEP</span>LAB</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="nav-label text-ink-foreground/80 hover:text-lime transition-colors"
                activeProps={{ className: "nav-label text-lime" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button className="p-2 hover:text-lime transition" aria-label="Search">
              <Search className="h-5 w-5" />
            </button>
            <Link to="/account" className="p-2 hover:text-lime transition hidden sm:inline-flex" aria-label="Account">
              <User className="h-5 w-5" />
            </Link>
            <button onClick={() => setOpen(true)} className="p-2 hover:text-lime transition relative" aria-label="Cart">
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-lime text-lime-foreground text-[10px] font-bold rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {menu && (
        <div className="fixed inset-0 z-50 bg-ink text-ink-foreground lg:hidden">
          <div className="container-px h-16 flex items-center justify-between border-b border-white/10">
            <span className="font-display font-bold">Menu</span>
            <button onClick={() => setMenu(false)} className="p-2"><X className="h-6 w-6" /></button>
          </div>
          <nav className="container-px py-6 flex flex-col gap-1">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setMenu(false)}
                className="nav-label py-4 border-b border-white/10 hover:text-lime">
                {n.label}
              </Link>
            ))}
            <div className="mt-6 nav-label text-white/50">Categories</div>
            {CATEGORIES.map(c => (
              <Link key={c.id} to="/shop" search={{ category: c.id }} onClick={() => setMenu(false)}
                className="py-3 text-base hover:text-lime">{c.name}</Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}

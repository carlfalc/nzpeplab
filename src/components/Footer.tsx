import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground mt-24">
      <div className="container-px max-w-7xl mx-auto py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 font-display font-bold text-lg">
            <span className="h-3 w-3 rounded-full bg-lime" />
            NZ<span className="text-lime">PEP</span>LAB
          </div>
          <p className="mt-4 text-sm text-ink-foreground/70 max-w-xs">
            HPLC-verified research peptides. Proudly NZ owned & operated. Fast tracked courier nationwide.
          </p>
          <div className="mt-6 flex gap-3">
            <a className="p-2 rounded-full bg-white/5 hover:bg-lime hover:text-lime-foreground transition" href="#"><Instagram className="h-4 w-4" /></a>
            <a className="p-2 rounded-full bg-white/5 hover:bg-lime hover:text-lime-foreground transition" href="#"><Twitter className="h-4 w-4" /></a>
            <a className="p-2 rounded-full bg-white/5 hover:bg-lime hover:text-lime-foreground transition" href="#"><Facebook className="h-4 w-4" /></a>
          </div>
        </div>

        <FCol title="Shop" links={[
          { to: "/shop", label: "All Products" },
          { to: "/categories", label: "Categories" },
          { to: "/bundles", label: "Stacks & Bundles" },
          { to: "/coas", label: "Lab COAs" },
        ]} />
        <FCol title="Company" links={[
          { to: "/about", label: "About" },
          { to: "/contact", label: "Contact" },
          { to: "/faq", label: "FAQ" },
        ]} />
        <FCol title="Policies" links={[
          { to: "/policies/shipping", label: "Shipping" },
          { to: "/policies/returns", label: "Returns" },
          { to: "/policies/privacy", label: "Privacy" },
          { to: "/policies/terms", label: "Terms" },
        ]} />
      </div>

      <div className="border-t border-white/10">
        <div className="container-px max-w-7xl mx-auto py-6 text-xs text-ink-foreground/60 flex flex-col md:flex-row gap-3 justify-between">
          <p>© {new Date().getFullYear()} NZ Peptide Lab. All rights reserved.</p>
          <p className="text-lime/90 font-medium uppercase tracking-wider">
            For research purposes only — not for human consumption.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h4 className="nav-label text-lime mb-4">{title}</h4>
      <ul className="space-y-2 text-sm text-ink-foreground/80">
        {links.map((l) => (
          <li key={l.to}><Link to={l.to} className="hover:text-lime transition">{l.label}</Link></li>
        ))}
      </ul>
    </div>
  );
}

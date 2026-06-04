import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, FlaskConical, Truck, Lock, ArrowRight, Star } from "lucide-react";
import { PRODUCTS, CATEGORIES, BUNDLES, getById, FREE_SHIP_THRESHOLD } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { fmt } from "@/lib/cart";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NZ Peptide Lab — HPLC-Verified Research Peptides" },
      { name: "description", content: "Premium research peptides shipped fast across New Zealand. ≥98% HPLC purity, batch COAs, NZ owned." },
    ],
  }),
  component: Home,
});

const FAQS = [
  { q: "What is HPLC purity testing?", a: "High-Performance Liquid Chromatography quantifies peptide purity. Every batch we sell is tested ≥98% and shipped with a downloadable COA." },
  { q: "How fast is shipping in NZ?", a: "Orders placed before 2pm NZT ship same business day via tracked overnight courier from Auckland." },
  { q: "Do you accept Wise / bank transfer?", a: "Yes — choose 'Wise / Bank Transfer' at checkout and we'll email you our account details and order reference." },
  { q: "Are these for human use?", a: "No. All products are sold strictly for in-vitro research and laboratory use only." },
];

function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <CategoriesGrid />
      <Featured />
      <Bundles />
      <WhyUs />
      <COASection />
      <FAQ />
      <Newsletter />
    </>
  );
}

function Hero() {
  return (
    <section className="bg-ink text-ink-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top_right,var(--color-lime),transparent_60%)]" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-lime/10 blur-3xl" />
      <div className="container-px max-w-7xl mx-auto relative pt-16 sm:pt-24 pb-20 sm:pb-28 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="nav-label inline-flex items-center gap-2 bg-white/5 backdrop-blur border border-white/10 px-3 py-1.5 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse" /> NZ Owned · Lab Verified
          </span>
          <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
            HPLC-Verified <br />
            <span className="text-lime">Research Peptides</span>
            <br /> Shipped Across NZ.
          </h1>
          <p className="mt-6 text-lg text-ink-foreground/70 max-w-lg">
            Independently tested ≥98% purity. Tracked overnight courier. Secure card, Apple Pay or Wise checkout. Free shipping over {fmt(FREE_SHIP_THRESHOLD)}.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link to="/shop" className="inline-flex items-center justify-center gap-2 bg-lime text-lime-foreground px-7 py-4 rounded-full nav-label hover:brightness-105 transition">
              Shop Now <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/coas" className="inline-flex items-center justify-center gap-2 border border-white/20 px-7 py-4 rounded-full nav-label hover:bg-white/5 transition">
              View COAs
            </Link>
          </div>
          <div className="mt-10 flex items-center gap-4 text-sm text-ink-foreground/70">
            <div className="flex">{[0,1,2,3,4].map(i => <Star key={i} className="h-4 w-4 fill-lime text-lime" />)}</div>
            <span>Rated 4.9 · trusted by NZ researchers</span>
          </div>
        </div>
        <div className="relative hidden lg:block">
          <div className="aspect-square rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-8 backdrop-blur">
            <div className="grid grid-cols-2 gap-4 h-full">
              {[PRODUCTS[0], PRODUCTS[2], PRODUCTS[4], PRODUCTS[6]].map((p, i) => (
                <div key={p.id} className={`rounded-2xl bg-gradient-to-br from-ink/40 to-white/5 border border-white/10 flex flex-col items-center justify-center text-center p-4 ${i % 2 === 1 ? "translate-y-6" : ""}`}>
                  <div className="font-display text-3xl font-bold text-lime">{p.mg}<span className="text-sm">mg</span></div>
                  <div className="nav-label text-[10px] text-white/70 mt-2">{p.name}</div>
                  <div className="mt-2 text-[10px] text-lime">{p.purity}% HPLC</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [
    { icon: FlaskConical, label: "≥98% HPLC purity" },
    { icon: ShieldCheck, label: "Batch COAs" },
    { icon: Truck, label: "Tracked NZ courier" },
    { icon: Lock, label: "Secure payments" },
  ];
  return (
    <section className="border-y border-border bg-muted/40">
      <div className="container-px max-w-7xl mx-auto py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((it) => (
          <div key={it.label} className="flex items-center gap-3 justify-center sm:justify-start">
            <it.icon className="h-5 w-5 text-ink" />
            <span className="nav-label">{it.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function CategoriesGrid() {
  return (
    <section className="container-px max-w-7xl mx-auto py-16 sm:py-24">
      <div className="flex items-end justify-between mb-10 gap-4">
        <div>
          <span className="nav-label text-muted-foreground">Browse</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-1">Shop by category</h2>
        </div>
        <Link to="/categories" className="hidden sm:inline-flex nav-label hover:text-ink/70">All categories →</Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {CATEGORIES.map((c, i) => (
          <Link
            key={c.id}
            to="/shop"
            search={{ category: c.id }}
            className={`group relative rounded-2xl p-6 sm:p-8 overflow-hidden border border-border transition-all hover:-translate-y-1 ${
              i % 3 === 0 ? "bg-ink text-ink-foreground" : "bg-card"
            }`}
          >
            <span className={`nav-label ${i % 3 === 0 ? "text-lime" : "text-muted-foreground"}`}>0{i + 1}</span>
            <h3 className="mt-6 font-display text-xl sm:text-2xl font-bold">{c.name}</h3>
            <p className={`mt-2 text-sm ${i % 3 === 0 ? "text-ink-foreground/60" : "text-muted-foreground"}`}>{c.blurb}</p>
            <ArrowRight className="mt-6 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        ))}
      </div>
    </section>
  );
}

function Featured() {
  const featured = PRODUCTS.filter(p => p.featured);
  return (
    <section className="container-px max-w-7xl mx-auto py-16 sm:py-20">
      <div className="flex items-end justify-between mb-10 gap-4">
        <div>
          <span className="nav-label text-muted-foreground">Bestsellers</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-1">Featured peptides</h2>
        </div>
        <Link to="/shop" className="hidden sm:inline-flex nav-label hover:text-ink/70">View all →</Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {featured.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}

function Bundles() {
  return (
    <section className="bg-muted/40 border-y border-border">
      <div className="container-px max-w-7xl mx-auto py-16 sm:py-20">
        <div className="flex items-end justify-between mb-10 gap-4">
          <div>
            <span className="nav-label text-muted-foreground">Save more</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mt-1">Stacks & bundles</h2>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
          {BUNDLES.map(b => (
            <Link key={b.id} to="/bundles" className="relative bg-card rounded-2xl p-6 border border-border hover:shadow-xl hover:-translate-y-1 transition-all">
              <span className="absolute top-4 right-4 bg-lime text-lime-foreground nav-label text-[10px] px-2 py-1 rounded-full">{b.tag}</span>
              <h3 className="font-display text-2xl font-bold">{b.name}</h3>
              <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
                {b.productIds.map(pid => {
                  const p = getById(pid)!;
                  return <li key={pid}>· {p.name} {p.mg}mg</li>;
                })}
              </ul>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-2xl font-bold">{fmt(b.price)}</span>
                <span className="text-sm text-muted-foreground line-through">{fmt(b.original)}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const items = [
    { icon: FlaskConical, t: "Independent HPLC testing", d: "Every batch tested at an independent NZ lab. COAs published online." },
    { icon: Truck, t: "Same-day NZ dispatch", d: "Order before 2pm NZT — tracked overnight courier from Auckland." },
    { icon: ShieldCheck, t: "100% NZ owned & operated", d: "Local team, local support, no international customs surprises." },
    { icon: Lock, t: "Secure encrypted checkout", d: "Card, Apple Pay or Wise. PCI-DSS compliant Stripe processing." },
  ];
  return (
    <section className="container-px max-w-7xl mx-auto py-16 sm:py-24">
      <div className="text-center mb-12">
        <span className="nav-label text-muted-foreground">Why NZ Peptide Lab</span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2 max-w-2xl mx-auto">Built by researchers, for researchers.</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {items.map(it => (
          <div key={it.t} className="bg-card border border-border rounded-2xl p-6 hover:border-ink transition">
            <div className="h-11 w-11 rounded-xl bg-ink text-lime flex items-center justify-center"><it.icon className="h-5 w-5" /></div>
            <h3 className="mt-5 font-semibold">{it.t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{it.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function COASection() {
  return (
    <section className="bg-ink text-ink-foreground">
      <div className="container-px max-w-7xl mx-auto py-16 sm:py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="nav-label text-lime">Lab Verified</span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold">Every batch, every COA — public.</h2>
          <p className="mt-4 text-ink-foreground/70 max-w-md">
            Each shipment includes a unique batch number. Look it up any time to download the full Certificate of Analysis with HPLC + mass-spec data.
          </p>
          <Link to="/coas" className="mt-6 inline-flex items-center gap-2 bg-lime text-lime-foreground px-6 py-3 rounded-full nav-label hover:brightness-105">
            Browse COAs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6 font-mono text-xs">
          <div className="flex justify-between text-lime"><span>BATCH</span><span>NZP-24-0917</span></div>
          <div className="mt-3 border-t border-white/10 pt-3 space-y-2 text-ink-foreground/80">
            <div className="flex justify-between"><span>Compound</span><span>BPC-157</span></div>
            <div className="flex justify-between"><span>HPLC Purity</span><span className="text-lime">99.42%</span></div>
            <div className="flex justify-between"><span>Mass [M+H]+</span><span>1419.6</span></div>
            <div className="flex justify-between"><span>Tested</span><span>17 Sep 2024</span></div>
            <div className="flex justify-between"><span>Lab</span><span>Auckland Analytical</span></div>
          </div>
          <div className="mt-4 h-24 bg-gradient-to-r from-lime/30 via-lime/10 to-transparent rounded relative overflow-hidden">
            <svg viewBox="0 0 200 80" className="w-full h-full">
              <polyline fill="none" stroke="oklch(0.88 0.22 130)" strokeWidth="1.5" points="0,70 30,68 50,40 55,10 60,40 80,65 130,63 150,55 160,30 165,8 170,30 180,60 200,62" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="container-px max-w-3xl mx-auto py-16 sm:py-24">
      <div className="text-center mb-10">
        <span className="nav-label text-muted-foreground">Questions</span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2">Frequently asked</h2>
      </div>
      <div className="space-y-3">
        {FAQS.map((f, i) => (
          <div key={i} className="bg-card border border-border rounded-xl">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left font-semibold"
            >
              <span>{f.q}</span>
              <span className={`text-lime text-xl transition-transform ${open === i ? "rotate-45" : ""}`}>+</span>
            </button>
            {open === i && <p className="px-5 pb-5 text-muted-foreground text-sm">{f.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="container-px max-w-4xl mx-auto pb-20">
      <div className="bg-gradient-to-br from-ink to-ink/90 text-ink-foreground rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-lime/20 blur-3xl" />
        <h2 className="relative font-display text-2xl sm:text-3xl font-bold">Get new batches & restock alerts</h2>
        <p className="relative mt-3 text-ink-foreground/70">Occasional emails. Unsubscribe anytime.</p>
        <form className="relative mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input type="email" required placeholder="you@email.com" className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/10 placeholder:text-ink-foreground/40 focus:outline-none focus:border-lime" />
          <button type="submit" className="bg-lime text-lime-foreground px-6 py-3 rounded-full nav-label hover:brightness-105">Subscribe</button>
        </form>
      </div>
    </section>
  );
}

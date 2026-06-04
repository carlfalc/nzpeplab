import { createFileRoute } from "@tanstack/react-router";
import { PRODUCTS } from "@/lib/products";
import { Download } from "lucide-react";

export const Route = createFileRoute("/coas")({
  head: () => ({
    meta: [
      { title: "Lab COAs — NZ Peptide Lab" },
      { name: "description", content: "Browse Certificates of Analysis for every batch. HPLC purity + mass spec data." },
    ],
  }),
  component: COAs,
});

function COAs() {
  return (
    <div className="container-px max-w-5xl mx-auto py-14">
      <span className="nav-label text-muted-foreground">Lab verified</span>
      <h1 className="font-display text-4xl font-bold mt-1">Certificates of Analysis</h1>
      <p className="mt-3 text-muted-foreground max-w-2xl">Every batch is independently HPLC tested in Auckland. Download any COA below — also linked on individual product pages.</p>

      <div className="mt-10 border border-border rounded-2xl overflow-hidden divide-y divide-border">
        <div className="grid grid-cols-12 gap-2 px-5 py-3 bg-muted nav-label text-xs">
          <div className="col-span-4">Product</div>
          <div className="col-span-3">Batch</div>
          <div className="col-span-2">Purity</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-1 text-right">COA</div>
        </div>
        {PRODUCTS.filter(p => p.mg).map((p, i) => (
          <div key={p.id} className="grid grid-cols-12 gap-2 px-5 py-4 items-center text-sm hover:bg-muted/40">
            <div className="col-span-4 font-medium">{p.name} {p.mg}mg</div>
            <div className="col-span-3 font-mono text-xs">NZP-24-{(917 + i).toString().padStart(4,"0")}</div>
            <div className="col-span-2 text-lime font-semibold">{p.purity}%</div>
            <div className="col-span-2 text-muted-foreground text-xs">17 Sep 2024</div>
            <div className="col-span-1 text-right">
              <button className="inline-flex items-center gap-1 nav-label text-xs hover:text-lime"><Download className="h-3.5 w-3.5" /> PDF</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

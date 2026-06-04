import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

const FAQS = [
  { q: "What is HPLC purity testing?", a: "High-Performance Liquid Chromatography is the gold-standard purity assay for peptides. We test every batch to ≥98% and publish the COA." },
  { q: "How fast does NZ shipping take?", a: "Order before 2pm NZT for same-day dispatch. Tracked overnight courier covers most of NZ in 1–2 business days." },
  { q: "Do you ship internationally?", a: "Currently NZ-only. We're working on AU shipping — sign up for the newsletter for updates." },
  { q: "Can I pay with Wise / bank transfer?", a: "Yes. Choose Wise at checkout — we'll email account details with your order reference." },
  { q: "How should I store peptides?", a: "Lyophilised vials are stable at 2–8°C. Once reconstituted, refrigerate and use within 30 days." },
  { q: "Are these safe for human use?", a: "No. All products are for in-vitro research only and are not approved for human consumption." },
];

export const Route = createFileRoute("/faq")({
  head: () => ({ meta: [{ title: "FAQ — NZ Peptide Lab" }] }),
  component: FAQ,
});

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="container-px max-w-3xl mx-auto py-14">
      <span className="nav-label text-muted-foreground">FAQ</span>
      <h1 className="font-display text-4xl font-bold mt-1">Frequently asked</h1>
      <div className="mt-8 space-y-3">
        {FAQS.map((f, i) => (
          <div key={i} className="bg-card border border-border rounded-xl">
            <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left font-semibold">
              <span>{f.q}</span>
              <span className={`text-lime text-xl transition-transform ${open === i ? "rotate-45" : ""}`}>+</span>
            </button>
            {open === i && <p className="px-5 pb-5 text-muted-foreground text-sm">{f.a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

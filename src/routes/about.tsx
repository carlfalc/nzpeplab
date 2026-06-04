import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — NZ Peptide Lab" }] }),
  component: () => (
    <div className="container-px max-w-3xl mx-auto py-14">
      <span className="nav-label text-muted-foreground">About</span>
      <h1 className="font-display text-4xl font-bold mt-1">NZ owned. Lab obsessed.</h1>
      <div className="prose prose-lg mt-8 space-y-5 text-muted-foreground leading-relaxed">
        <p>NZ Peptide Lab supplies HPLC-verified research peptides to universities, clinics and independent researchers across New Zealand.</p>
        <p>We obsess over batch quality and publish a Certificate of Analysis for every lot — no exceptions. All inventory is stored in temperature-controlled facilities in Auckland and dispatched via tracked overnight courier.</p>
        <p>All products are sold strictly for in-vitro research. Not for human consumption.</p>
      </div>
    </div>
  ),
});

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

      <div className="mt-12 rounded-2xl border border-border bg-muted/40 p-6">
        <h2 className="font-display text-xl font-bold">Company information</h2>
        <div className="mt-3 space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            This website is now owned and operated exclusively by Global Bio Research Limited, a
            Hong Kong registered company (Registration Number: 80091900).
          </p>
          <p>
            Ownership and operational control have changed, and any individuals previously
            associated with this website are no longer involved in its management or operations.
          </p>
          <p>
            All enquiries regarding this website should be directed to Global Bio Research Limited —{" "}
            <a href="https://globalbioresearch.co" target="_blank" rel="noopener noreferrer" className="text-lime hover:underline">
              globalbioresearch.co
            </a>
          </p>
        </div>
      </div>
    </div>
  ),
});

import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";

type Search = { ref?: string; method?: "card" | "wise" };

export const Route = createFileRoute("/order-confirmed")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    ref: s.ref as string | undefined,
    method: s.method as Search["method"],
  }),
  head: () => ({ meta: [{ title: "Order Confirmed — NZ Peptide Lab" }] }),
  component: Confirmed,
});

function Confirmed() {
  const { ref, method } = Route.useSearch();
  return (
    <div className="container-px max-w-2xl mx-auto py-20 text-center">
      <CheckCircle2 className="h-16 w-16 text-lime mx-auto" />
      <h1 className="mt-6 font-display text-3xl sm:text-4xl font-bold">Order received</h1>
      <p className="mt-3 text-muted-foreground">
        Reference <span className="font-mono font-semibold text-foreground">{ref}</span> — a confirmation email is on its way.
      </p>
      {method === "wise" && (
        <div className="mt-8 bg-muted/40 border border-border rounded-2xl p-6 text-left text-sm">
          <p className="font-semibold mb-2">Wise / Bank Transfer instructions</p>
          <p className="font-mono text-xs">Account: NZ Peptide Lab Ltd<br/>ANZ NZ — 01-0123-0456789-00<br/>Wise: nzpeplab@wise.com</p>
          <p className="mt-3 text-muted-foreground">Include reference <strong className="text-foreground">{ref}</strong>. We dispatch as soon as funds clear.</p>
        </div>
      )}
      <Link to="/shop" className="mt-10 inline-block bg-ink text-ink-foreground px-7 py-3 rounded-full nav-label">Continue shopping</Link>
    </div>
  );
}

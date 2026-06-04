import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "Account — NZ Peptide Lab" }] }),
  component: () => (
    <div className="container-px max-w-md mx-auto py-20 text-center">
      <h1 className="font-display text-3xl font-bold">Sign in</h1>
      <p className="mt-3 text-muted-foreground">Customer accounts coming soon. Track orders via the email confirmation link for now.</p>
      <Link to="/shop" className="mt-6 inline-block bg-ink text-ink-foreground px-6 py-3 rounded-full nav-label">Back to shop</Link>
    </div>
  ),
});

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — NZ Peptide Lab" }] }),
  component: () => (
    <div className="container-px max-w-2xl mx-auto py-14">
      <span className="nav-label text-muted-foreground">Get in touch</span>
      <h1 className="font-display text-4xl font-bold mt-1">Contact us</h1>
      <p className="mt-3 text-muted-foreground">Questions about a batch, an order, or bulk pricing? Drop us a line.</p>

      <form className="mt-8 space-y-3">
        <input placeholder="Name" required className="w-full px-4 py-3 border border-border rounded-lg" />
        <input type="email" placeholder="Email" required className="w-full px-4 py-3 border border-border rounded-lg" />
        <textarea placeholder="Message" rows={5} required className="w-full px-4 py-3 border border-border rounded-lg" />
        <button className="bg-ink text-ink-foreground px-7 py-3 rounded-full nav-label">Send message</button>
      </form>

      <div className="mt-12 text-sm text-muted-foreground">
        <p>Email: <a className="text-lime" href="mailto:hello@nzpeplab.co.nz">hello@nzpeplab.co.nz</a></p>
        <p>Hours: Mon–Fri 9am–5pm NZT</p>
      </div>
    </div>
  ),
});

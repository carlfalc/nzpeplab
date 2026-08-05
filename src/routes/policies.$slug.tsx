import { createFileRoute } from "@tanstack/react-router";

const COPY: Record<string, { title: string; body: string[] }> = {
  shipping: {
    title: "Shipping Policy",
    body: [
      "All orders ship from Auckland via tracked overnight courier.",
      "Orders placed before 2pm NZT ship the same business day.",
      "Free shipping on NZ orders over $150. Flat $9.50 otherwise.",
      "Signature on delivery required. We do not ship internationally at this time.",
    ],
  },
  returns: {
    title: "Returns Policy",
    body: [
      "Due to the nature of research peptides, we cannot accept returns on opened or unsealed product.",
      "If your order arrives damaged or incorrect, contact us within 7 days for a free replacement.",
      "Cold-chain integrity must be maintained — damaged shipments must be photographed on arrival.",
    ],
  },
  privacy: {
    title: "Privacy Policy",
    body: [
      "We collect only the information necessary to process and ship your order.",
      "Payment details are handled by Stripe (PCI-DSS compliant) and never touch our servers.",
      "We never sell or share your data with third parties for marketing.",
    ],
  },
  terms: {
    title: "Terms of Service",
    body: [
      "By purchasing from NZ Peptide Lab you confirm you are 18+ and acquiring product for laboratory research only.",
      "All products are sold for in-vitro research use only — NOT for human consumption.",
      "Misuse of products is the sole responsibility of the buyer.",
    ],
  },
};

export const Route = createFileRoute("/policies/$slug")({
  head: ({ params }) => ({
    meta: [{ title: `${COPY[params.slug]?.title ?? "Policy"} — NZ Peptide Lab` }],
  }),
  component: PolicyPage,
});

function PolicyPage() {
  const { slug } = Route.useParams();
  const data = COPY[slug];
  if (!data) {
    return <div className="container-px max-w-3xl mx-auto py-20 text-center text-muted-foreground">Policy not found.</div>;
  }
  return (
    <div className="container-px max-w-3xl mx-auto py-14">
      <span className="nav-label text-muted-foreground">Policies</span>
      <h1 className="font-display text-4xl font-bold mt-1">{data.title}</h1>
      <div className="mt-8 space-y-4 text-muted-foreground leading-relaxed">
        {data.body.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      <div className="mt-12 flex justify-end">
        <div className="max-w-sm md:text-right rounded-2xl border border-border bg-muted/40 p-5 text-xs text-muted-foreground space-y-2">
          <h2 className="nav-label text-ink">Company information</h2>
          <p>
            This website is owned and operated exclusively by Global Bio Research Limited, a Hong
            Kong registered company (Registration Number: 80091900).
          </p>
          <p>
            Ownership and operational control have changed, and any individuals previously
            associated with this website are no longer involved in its management or operations.
          </p>
          <p>
            All enquiries:{" "}
            <a href="https://globalbioresearch.co" target="_blank" rel="noopener noreferrer" className="text-lime hover:underline">
              globalbioresearch.co
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

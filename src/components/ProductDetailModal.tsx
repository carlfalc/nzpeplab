import { useEffect } from "react";
import { X } from "lucide-react";
import type { Product, Evidence } from "@/lib/products";
import { RESEARCH_DISCLAIMER } from "@/lib/products";

const EVIDENCE_LABEL: Record<Evidence, string> = {
  approved: "Approved medicine",
  clinical: "Human clinical trial",
  "human-early": "Early human data",
  preclinical: "Preclinical (animal)",
  invitro: "In-vitro (cell/lab)",
};

const EVIDENCE_TONE: Record<Evidence, string> = {
  approved: "bg-lime text-lime-foreground",
  clinical: "bg-lime/80 text-lime-foreground",
  "human-early": "bg-muted text-foreground",
  preclinical: "bg-muted text-muted-foreground",
  invitro: "bg-muted text-muted-foreground",
};

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-lime/40 bg-lime/10 px-3 py-1 text-xs font-medium text-foreground">
      {children}
    </span>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <h4 className="nav-label text-lime text-xs">{title}</h4>
      <div className="mt-2 text-sm text-foreground/90">{children}</div>
    </div>
  );
}

export function ProductDetailModal({
  product,
  open,
  onClose,
}: {
  product: Product;
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;
  const d = product.details;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} details`}
    >
      <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-card border border-border shadow-2xl">
        {/* header */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 bg-card/95 backdrop-blur px-6 pt-6 pb-4 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-2xl font-bold">{product.name}</h3>
              {product.mg != null && (
                <span className="text-lime font-bold">
                  {product.mg}
                  {product.unit ?? "mg"}
                </span>
              )}
            </div>
            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="bg-lime text-lime-foreground font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                {product.purity}% HPLC
              </span>
              {product.sequence && <span>{product.sequence}</span>}
            </div>
          </div>
          <button onClick={onClose} aria-label="Close" className="rounded-full p-2 hover:bg-muted transition">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* body */}
        <div className="px-6 pb-8">
          {!d ? (
            <p className="mt-6 text-sm text-muted-foreground">{product.description}</p>
          ) : (
            <>
              <p className="mt-5 text-sm text-foreground/90">{d.overview}</p>

              {d.suitedFor?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {d.suitedFor.map((s) => (
                    <Tag key={s}>{s.replace("-", " ")}</Tag>
                  ))}
                </div>
              )}

              <Section title="How it works">{d.mechanism}</Section>

              {d.benefits?.length > 0 && (
                <Section title="Reported benefits (research context)">
                  <ul className="list-disc pl-5 space-y-1">
                    {d.benefits.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </Section>
              )}

              {d.studies?.length > 0 && (
                <Section title="What studies show">
                  <ul className="space-y-2">
                    {d.studies.map((s, i) => (
                      <li key={i} className="flex gap-2">
                        <span className={`shrink-0 self-start rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${EVIDENCE_TONE[s.evidence]}`}>
                          {EVIDENCE_LABEL[s.evidence]}
                        </span>
                        <span>{s.finding}</span>
                      </li>
                    ))}
                  </ul>
                </Section>
              )}

              {d.organsSystems?.length > 0 && (
                <Section title="Organs & systems studied">
                  <div className="flex flex-wrap gap-2">
                    {d.organsSystems.map((o, i) => (
                      <span key={i} className="rounded-lg bg-muted px-2.5 py-1 text-xs">{o}</span>
                    ))}
                  </div>
                </Section>
              )}

              {d.biomarkers?.length > 0 && (
                <Section title="Markers & levels measured">
                  <div className="flex flex-wrap gap-2">
                    {d.biomarkers.map((b, i) => (
                      <span key={i} className="rounded-lg border border-border px-2.5 py-1 text-xs">{b}</span>
                    ))}
                  </div>
                </Section>
              )}

              {d.stacking?.length > 0 && (
                <Section title="Commonly co-studied with">
                  <div className="flex flex-wrap gap-2">
                    {d.stacking.map((s, i) => (
                      <span key={i} className="rounded-full bg-ink text-ink-foreground px-3 py-1 text-xs">{s}</span>
                    ))}
                  </div>
                </Section>
              )}

              {d.sideEffects?.length > 0 && (
                <Section title="Reported side effects / cautions">
                  <ul className="list-disc pl-5 space-y-1 text-foreground/80">
                    {d.sideEffects.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </Section>
              )}

              <p className="mt-8 rounded-xl bg-muted/60 p-4 text-[11px] leading-relaxed text-muted-foreground">
                {RESEARCH_DISCLAIMER}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

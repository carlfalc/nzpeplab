export type Category =
  | "weight-management"
  | "recovery-repair"
  | "longevity"
  | "performance"
  | "cognitive"
  | "accessories";

export const CATEGORIES: { id: Category; name: string; blurb: string }[] = [
  { id: "weight-management", name: "Weight Management", blurb: "Metabolic & body composition research." },
  { id: "recovery-repair", name: "Recovery & Repair", blurb: "Tissue, tendon and wound healing studies." },
  { id: "longevity", name: "Longevity", blurb: "Cellular aging and senescence pathways." },
  { id: "performance", name: "Performance", blurb: "Endurance, strength and output research." },
  { id: "cognitive", name: "Cognitive", blurb: "Neurotrophic and memory pathway studies." },
  { id: "accessories", name: "Accessories", blurb: "BAC water, syringes, vials, consumables." },
];

export type Product = {
  id: string;
  slug: string;
  name: string;
  mg: number | null;
  category: Category;
  price: number; // NZD
  purity: number; // percent
  sequence?: string;
  storage?: string;
  description: string;
  related?: string[];
  featured?: boolean;
};

export const PRODUCTS: Product[] = [
  {
    id: "p1", slug: "retatrutide-10mg", name: "Retatrutide", mg: 10, category: "weight-management",
    price: 199, purity: 99.1, sequence: "Triple agonist GLP-1/GIP/Glucagon",
    storage: "Lyophilised, store at 2–8°C", featured: true,
    description: "Research-grade triple agonist peptide. HPLC verified ≥99% purity.",
  },
  {
    id: "p2", slug: "tirzepatide-10mg", name: "Tirzepatide", mg: 10, category: "weight-management",
    price: 169, purity: 98.7, featured: true,
    storage: "Lyophilised, store at 2–8°C",
    description: "Dual GIP/GLP-1 receptor agonist for metabolic research.",
  },
  {
    id: "p3", slug: "bpc-157-5mg", name: "BPC-157", mg: 5, category: "recovery-repair",
    price: 49, purity: 99.4, featured: true,
    storage: "Lyophilised, store at 2–8°C",
    description: "Body protection compound studied for tissue repair pathways.",
  },
  {
    id: "p4", slug: "tb-500-5mg", name: "TB-500", mg: 5, category: "recovery-repair",
    price: 59, purity: 98.9,
    storage: "Lyophilised, store at 2–8°C",
    description: "Thymosin Beta-4 fragment for cellular migration research.",
  },
  {
    id: "p5", slug: "epitalon-10mg", name: "Epitalon", mg: 10, category: "longevity",
    price: 45, purity: 99.2, featured: true,
    description: "Tetrapeptide studied for telomerase and circadian pathways.",
  },
  {
    id: "p6", slug: "ghk-cu-50mg", name: "GHK-Cu", mg: 50, category: "longevity",
    price: 65, purity: 99.0,
    description: "Copper peptide studied for skin and gene expression research.",
  },
  {
    id: "p7", slug: "ipamorelin-5mg", name: "Ipamorelin", mg: 5, category: "performance",
    price: 39, purity: 99.3, featured: true,
    description: "Selective GH secretagogue peptide.",
  },
  {
    id: "p8", slug: "cjc-1295-no-dac-5mg", name: "CJC-1295 No DAC", mg: 5, category: "performance",
    price: 42, purity: 98.8,
    description: "GHRH analog studied in pulsatile GH release research.",
  },
  {
    id: "p9", slug: "semax-10mg", name: "Semax", mg: 10, category: "cognitive",
    price: 55, purity: 99.1,
    description: "Heptapeptide studied for BDNF and neuroprotective research.",
  },
  {
    id: "p10", slug: "selank-10mg", name: "Selank", mg: 10, category: "cognitive",
    price: 52, purity: 99.0,
    description: "Anxiolytic research peptide derived from tuftsin.",
  },
  {
    id: "p11", slug: "bac-water-30ml", name: "Bacteriostatic Water", mg: null, category: "accessories",
    price: 12, purity: 100,
    description: "30ml sterile bacteriostatic water for reconstitution.",
  },
  {
    id: "p12", slug: "insulin-syringes-100pk", name: "Insulin Syringes (100pk)", mg: null, category: "accessories",
    price: 25, purity: 100,
    description: "0.5ml U-100 syringes, 29G, 100 pack.",
  },
];

export type Bundle = {
  id: string; slug: string; name: string; productIds: string[]; price: number; original: number; tag: string;
};

export const BUNDLES: Bundle[] = [
  { id: "b1", slug: "recovery-stack", name: "Recovery Stack", productIds: ["p3","p4"], price: 95, original: 108, tag: "Save $13" },
  { id: "b2", slug: "longevity-stack", name: "Longevity Stack", productIds: ["p5","p6"], price: 99, original: 110, tag: "Save $11" },
  { id: "b3", slug: "performance-stack", name: "Performance Stack", productIds: ["p7","p8"], price: 72, original: 81, tag: "Save $9" },
];

export const getProduct = (slug: string) => PRODUCTS.find(p => p.slug === slug);
export const getById = (id: string) => PRODUCTS.find(p => p.id === id);

export const FREE_SHIP_THRESHOLD = 150;

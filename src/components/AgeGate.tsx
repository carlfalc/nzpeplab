import { useEffect, useState } from "react";

const KEY = "nzpep_age_ok_v1";

export function AgeGate() {
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      setOk(localStorage.getItem(KEY) === "1");
    } catch {
      setOk(true);
    }
  }, []);

  useEffect(() => {
    if (ok === false) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [ok]);

  if (ok === null || ok === true) return null;

  const accept = () => {
    try { localStorage.setItem(KEY, "1"); } catch {}
    setOk(true);
  };
  const reject = () => { window.location.href = "https://www.google.com"; };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 backdrop-blur-md px-4">
      <div className="w-full max-w-md rounded-2xl bg-card text-card-foreground p-8 shadow-2xl border border-border">
        <div className="flex items-center gap-2 mb-6">
          <div className="h-3 w-3 rounded-full bg-lime" />
          <span className="nav-label">NZ Peptide Lab</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight">Age verification</h2>
        <p className="mt-3 text-muted-foreground">
          You must be <strong className="text-foreground">18 years or older</strong> to enter this site.
          All products are sold for <strong className="text-foreground">research purposes only</strong> and are not for human consumption.
        </p>
        <p className="mt-4 font-medium">Are you over 18?</p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={accept}
            className="flex-1 rounded-lg bg-lime text-lime-foreground py-3 nav-label hover:brightness-105 transition"
          >
            Yes — Enter
          </button>
          <button
            onClick={reject}
            className="flex-1 rounded-lg border-2 border-border py-3 nav-label hover:bg-muted transition"
          >
            No — Exit
          </button>
        </div>
        <p className="mt-6 text-xs text-muted-foreground text-center">
          By entering, you agree to our Terms and acknowledge the research-use-only disclaimer.
        </p>
      </div>
    </div>
  );
}

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CartProvider } from "../lib/cart";
import { AgeGate } from "../components/AgeGate";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CartDrawer } from "../components/CartDrawer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-md bg-ink px-4 py-2 text-sm font-medium text-ink-foreground hover:bg-ink/90">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong on our end.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center justify-center rounded-md bg-ink px-4 py-2 text-sm font-medium text-ink-foreground hover:bg-ink/90"
          >Try again</button>
          <a href="/" className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "NZ Peptide Lab — HPLC-Verified Research Peptides" },
      { name: "description", content: "Premium research peptides shipped fast across New Zealand. Longevity, Weight Management Research only - HPLC-verified ≥98% purity, batch COAs, secure payments." },
      { property: "og:title", content: "NZ Peptide Lab — HPLC-Verified Research Peptides" },
      { property: "og:description", content: "Premium research peptides shipped fast across New Zealand. Longevity, Weight Management Research only - HPLC-verified ≥98% purity, batch COAs, secure payments." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "NZ Peptide Lab — HPLC-Verified Research Peptides" },
      { name: "twitter:description", content: "Premium research peptides shipped fast across New Zealand. Longevity, Weight Management Research only - HPLC-verified ≥98% purity, batch COAs, secure payments." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/568d92cb-8a75-41b9-b8bc-231ec1698dec/id-preview-95181899--15d6babb-afe5-4ec7-9d3c-59e29c8727db.lovable.app-1780563143297.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/568d92cb-8a75-41b9-b8bc-231ec1698dec/id-preview-95181899--15d6babb-afe5-4ec7-9d3c-59e29c8727db.lovable.app-1780563143297.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1"><Outlet /></main>
          <Footer />
        </div>
        <CartDrawer />
        <AgeGate />
      </CartProvider>
    </QueryClientProvider>
  );
}

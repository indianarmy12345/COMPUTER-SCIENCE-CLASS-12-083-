import { useEffect } from "react";
import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Toaster } from "@/components/ui/sonner";
import { ADSENSE_CLIENT } from "@/components/AdSlot";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-neon">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          That chapter isn't in the syllabus.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CS 083 Hub — Learn CBSE Class 12 Computer Science with Live IDEs" },
      {
        name: "description",
        content:
          "Master the full CBSE Class 12 Computer Science (Code 083) syllabus — Python, SQL, Networks & DBMS — with real-world examples, live in-browser IDEs, progress tracking and downloadable PDF notes.",
      },
      { name: "author", content: "CS 083 Hub" },
      { name: "theme-color", content: "#0F1729" },
      { property: "og:title", content: "CS 083 Hub — Learn CBSE Class 12 Computer Science with Live IDEs" },
      {
        property: "og:description",
        content:
          "Interactive CBSE Class 12 CS course with live Python (Pyodide) and SQL (SQLite) playgrounds, full notes and chapter-wise progress tracking.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "CS 083 Hub — Learn CBSE Class 12 Computer Science with Live IDEs" },
      {
        name: "twitter:description",
        content:
          "Learn the entire CBSE Class 12 CS syllabus with live Python & SQL IDEs — no installs, no setup.",
      },
      { name: "twitter:image", content: "/og-image.jpg" },
      { name: "description", content: "A comprehensive educational platform for Class 12 Computer Science, offering interactive learning with real-time examples and IDEs." },
      { property: "og:description", content: "A comprehensive educational platform for Class 12 Computer Science, offering interactive learning with real-time examples and IDEs." },
      { name: "twitter:description", content: "A comprehensive educational platform for Class 12 Computer Science, offering interactive learning with real-time examples and IDEs." },
      { name: "google-adsense-account", content: "ca-pub-5234729428537235" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-12 items-center gap-2 border-b border-border bg-background px-3">
            <SidebarTrigger />
            <span className="text-sm font-medium text-muted-foreground">
              CBSE Computer Science · 083
            </span>
          </header>
          <main className="min-w-0 flex-1">
            <Outlet />
          </main>
          <footer className="border-t border-border bg-background/60 px-4 py-6 text-xs text-muted-foreground sm:px-8">
            <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 sm:flex-row">
              <span>© {new Date().getFullYear()} CS 083 Hub. Built for CBSE learners.</span>
              <nav className="flex items-center gap-4">
                <Link to="/about" className="hover:text-neon">About</Link>
                <Link to="/contact" className="hover:text-neon">Contact</Link>
                <Link to="/privacy" className="hover:text-neon">Privacy</Link>
              </nav>
            </div>
          </footer>
        </div>
        <Toaster />
        <LazyAdSenseScript />
      </div>
    </SidebarProvider>
  );
}

function LazyAdSenseScript() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (import.meta.env.DEV) return;
    if (
      window.location.hostname.includes("lovableproject.com") ||
      window.location.hostname.includes("-preview--")
    ) {
      return;
    }

    let loaded = false;
    let timeoutId: number | undefined;
    let idleId: number | undefined;

    const load = () => {
      if (loaded) return;
      loaded = true;
      if (document.getElementById("adsense-script")) return;

      const script = document.createElement("script");
      script.id = "adsense-script";
      script.async = true;
      script.crossOrigin = "anonymous";
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
      document.head.appendChild(script);
    };

    const idle = (window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    });

    timeoutId = window.setTimeout(load, 3500);
    idleId = idle.requestIdleCallback?.(load, { timeout: 5000 });

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      if (idleId) idle.cancelIdleCallback?.(idleId);
    };
  }, []);

  return null;
}

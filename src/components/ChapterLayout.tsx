import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { chapters } from "@/lib/syllabus";

export function ChapterLayout({
  slug,
  children,
}: {
  slug: string;
  children: ReactNode;
}) {
  const idx = chapters.findIndex((c) => c.slug === slug);
  const current = chapters[idx];
  const prev = chapters[idx - 1];
  const next = chapters[idx + 1];

  return (
    <article className="mx-auto max-w-4xl px-4 py-8 sm:px-8">
      <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-neon">
        {current?.unit}
      </div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{current?.title}</h1>
      <p className="mt-2 text-muted-foreground">{current?.blurb}</p>
      <div className="mt-8 space-y-8 text-[15px] leading-7">{children}</div>

      <nav className="mt-16 flex items-center justify-between border-t border-border pt-6 text-sm">
        {prev ? (
          <Link
            to={prev.slug}
            className="group flex items-center gap-2 text-muted-foreground hover:text-neon"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>
              <span className="block text-[10px] uppercase tracking-wider">Previous</span>
              {prev.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            to={next.slug}
            className="group ml-auto flex items-center gap-2 text-right text-muted-foreground hover:text-neon"
          >
            <span>
              <span className="block text-[10px] uppercase tracking-wider">Next</span>
              {next.title}
            </span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        ) : null}
      </nav>
    </article>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 text-xl font-semibold tracking-tight text-neon-2">{title}</h2>
      <div className="space-y-3 text-foreground/90">{children}</div>
    </section>
  );
}

export function Callout({
  label = "Real-world",
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-neon/40 bg-neon/5 p-4">
      <div className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-neon">
        {label}
      </div>
      <div className="text-sm text-foreground/90">{children}</div>
    </div>
  );
}

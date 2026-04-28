import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Code2, Database, Network, Sparkles, Terminal } from "lucide-react";
import { chapters } from "@/lib/syllabus";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CS 083 — Class 12 Computer Science | Interactive CBSE Course" },
      {
        name: "description",
        content:
          "Master the full CBSE Class 12 Computer Science syllabus with real examples, live Python (Pyodide) and SQL (SQLite) IDEs, and chapter-wise notes.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const xii = chapters.filter((c) => c.className === "XII");
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border bg-hero">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-8 sm:py-28">
          <div className="inline-flex items-center gap-2 rounded-full border border-neon/40 bg-neon/10 px-3 py-1 text-xs font-medium text-neon">
            <Sparkles className="h-3 w-3" /> CBSE 2026–27 · Code 083
          </div>
          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            The whole Class 12 <span className="text-neon">Computer Science</span>{" "}
            syllabus — with a real IDE.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Learn Python, Computer Networks and DBMS with bite-sized lessons,
            real-world examples, and{" "}
            <span className="text-foreground">live in-browser code execution</span> — no
            installs, no setup.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/xii/functions"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-neon transition-transform hover:scale-[1.02]"
            >
              Start learning <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/playground"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-semibold hover:border-neon"
            >
              <Terminal className="h-4 w-4" /> Open playground
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { icon: Code2, label: "Programming", marks: "40" },
              { icon: Network, label: "Networks", marks: "10" },
              { icon: Database, label: "DBMS + SQL", marks: "20" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-lg border border-border bg-card/60 p-4 backdrop-blur"
              >
                <s.icon className="h-5 w-5 text-neon-2" />
                <div className="mt-3 text-sm text-muted-foreground">{s.label}</div>
                <div className="text-2xl font-semibold">
                  {s.marks}
                  <span className="text-sm text-muted-foreground"> marks</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-8">
        <h2 className="text-2xl font-semibold tracking-tight">Class XII chapters</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Tap a chapter to read the notes, see real-world examples, and run code.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {xii.map((c) => (
            <Link
              key={c.slug}
              to={c.slug}
              className="group rounded-lg border border-border bg-card p-4 transition-colors hover:border-neon"
            >
              <div className="text-[11px] font-semibold uppercase tracking-widest text-neon-2">
                {c.unit}
              </div>
              <div className="mt-1 flex items-center justify-between gap-2">
                <h3 className="font-semibold">{c.title}</h3>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-neon" />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{c.blurb}</p>
            </Link>
          ))}
        </div>

        <h2 className="mt-14 text-2xl font-semibold tracking-tight">
          Class XI quick revision
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {chapters
            .filter((c) => c.className === "XI")
            .map((c) => (
              <Link
                key={c.slug}
                to={c.slug}
                className="rounded-lg border border-border bg-card p-4 hover:border-neon-2"
              >
                <div className="text-[11px] font-semibold uppercase tracking-widest text-neon-2">
                  {c.unit}
                </div>
                <h3 className="mt-1 font-semibold">{c.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{c.blurb}</p>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}

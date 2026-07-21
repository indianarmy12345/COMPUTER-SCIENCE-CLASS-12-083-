import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Code2, Search, Sparkles, Terminal, GraduationCap, Rocket, Zap } from "lucide-react";
import { chapters } from "@/lib/syllabus";
import { courses, lessonPath } from "@/lib/courses";
import { AdSlot } from "@/components/AdSlot";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CodeLearners — Learn to Code, Free & Interactive" },
      {
        name: "description",
        content:
          "Free interactive programming courses. Learn Python from beginner to advanced with a live in-browser editor. HTML, CSS & JavaScript coming soon.",
      },
      { property: "og:title", content: "CodeLearners — Learn to Code in Your Browser" },
      {
        property: "og:description",
        content:
          "Free interactive Python course with a live editor in every lesson. HTML, CSS & JS coming soon.",
      },
      { property: "og:url", content: "https://cslearners.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://cslearners.lovable.app/" }],
  }),
  component: Home,
});

type SearchHit = {
  type: "lesson" | "chapter" | "course";
  title: string;
  subtitle: string;
  to: string;
};

function Home() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const python = courses.find((c) => c.slug === "python")!;
  const xi = chapters.filter((c) => c.className === "XI");
  const xii = chapters.filter((c) => c.className === "XII");

  const index = useMemo<SearchHit[]>(() => {
    const hits: SearchHit[] = [];
    for (const c of courses) {
      hits.push({
        type: "course",
        title: `${c.title} course`,
        subtitle: c.tagline,
        to: c.status === "available" ? `/learn/${c.slug}` : "/learn",
      });
      for (const l of c.lessons) {
        hits.push({
          type: "lesson",
          title: l.title,
          subtitle: `${c.title} · ${l.module}`,
          to: lessonPath(c.slug, l.slug),
        });
      }
    }
    for (const ch of chapters) {
      hits.push({
        type: "chapter",
        title: ch.title,
        subtitle: `CBSE ${ch.unit}`,
        to: ch.slug,
      });
    }
    return hits;
  }, []);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return index
      .filter(
        (h) =>
          h.title.toLowerCase().includes(term) ||
          h.subtitle.toLowerCase().includes(term),
      )
      .slice(0, 8);
  }, [q, index]);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border bg-hero">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-neon/20 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-4 py-24 sm:px-8 sm:py-32 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-neon/40 bg-neon/10 px-3 py-1 text-xs font-medium text-neon">
            <Sparkles className="h-3 w-3" /> Free · Interactive · No installs
          </div>
          <h1 className="mx-auto mt-6 max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
            Learn to code, <br className="hidden sm:block" />
            <span className="text-neon">right in your browser.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            A complete <span className="text-foreground">Python course</span> from
            beginner to advanced, with a live editor in every lesson.
            HTML, CSS and JavaScript tracks are on the way.
          </p>

          {/* SEARCH */}
          <div className="relative mx-auto mt-10 max-w-xl">
            <div className="flex items-center gap-2 rounded-xl border border-border bg-card/80 px-4 py-3 shadow-lg backdrop-blur focus-within:border-neon">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && results[0]) navigate({ to: results[0].to });
                  if (e.key === "Escape") setQ("");
                }}
                placeholder="Search lessons, topics or CBSE chapters…"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                aria-label="Search courses and lessons"
              />
              {q && (
                <button
                  onClick={() => setQ("")}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  clear
                </button>
              )}
            </div>
            {results.length > 0 && (
              <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
                {results.map((r) => (
                  <Link
                    key={r.to + r.title}
                    to={r.to}
                    onClick={() => setQ("")}
                    className="flex items-center justify-between gap-3 border-b border-border/60 px-4 py-3 text-left last:border-b-0 hover:bg-neon/10"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium">{r.title}</div>
                      <div className="truncate text-xs text-muted-foreground">{r.subtitle}</div>
                    </div>
                    <span className="rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                      {r.type}
                    </span>
                  </Link>
                ))}
              </div>
            )}
            {q && results.length === 0 && (
              <div className="absolute left-0 right-0 top-full z-20 mt-2 rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground shadow-2xl">
                No results for "{q}".
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/learn/$course"
              params={{ course: "python" }}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-neon transition-transform hover:scale-[1.02]"
            >
              Start Python <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/learn"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-semibold hover:border-neon"
            >
              Browse all courses
            </Link>
            <Link
              to="/playground"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-semibold hover:border-neon"
            >
              <Terminal className="h-4 w-4" /> Playground
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURE STRIP */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-4 py-10 sm:grid-cols-3 sm:px-8">
          <Feature icon={<Zap className="h-5 w-5 text-neon" />} title="Live editor in every lesson">
            Real Python runs in your browser via Pyodide — no installs, no setup.
          </Feature>
          <Feature icon={<Rocket className="h-5 w-5 text-neon" />} title="Beginner → advanced">
            51 hand-crafted lessons take you from "hello world" to async, decorators and testing.
          </Feature>
          <Feature icon={<GraduationCap className="h-5 w-5 text-neon" />} title="CBSE track included">
            Class 11 revision + Class 12 CS (Code 083) with PYQs and PDF notes.
          </Feature>
        </div>
      </section>

      {/* COURSES */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-8">
        <AdSlot className="mb-10" />
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Courses</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Pick a language and start building.
            </p>
          </div>
          <Link to="/learn" className="text-sm font-medium text-neon hover:underline">
            See all →
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {courses.map((c) => {
            const available = c.status === "available";
            const inner = (
              <div
                className={`h-full rounded-xl border p-5 transition-colors ${
                  available
                    ? "border-border bg-card hover:border-neon"
                    : "border-border/50 bg-card/40 opacity-70"
                }`}
              >
                <div className={`text-2xl font-bold ${c.color}`}>{c.title}</div>
                <div className="mt-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                  {available ? `${c.lessons.length} lessons` : "Coming soon"}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{c.tagline}</p>
              </div>
            );
            return available ? (
              <Link key={c.slug} to="/learn/$course" params={{ course: c.slug }} preload="intent">
                {inner}
              </Link>
            ) : (
              <div key={c.slug}>{inner}</div>
            );
          })}
        </div>

        {/* Python modules */}
        <div className="mt-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Python — full course</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {python.lessons.length} lessons across {python.modules.length} modules.
              </p>
            </div>
            <Link
              to="/learn/$course"
              params={{ course: "python" }}
              className="text-sm font-medium text-neon hover:underline"
            >
              Start course →
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {python.modules.map((mod) => {
              const count = python.lessons.filter((l) => l.module === mod).length;
              const first = python.lessons.find((l) => l.module === mod)!;
              return (
                <Link
                  key={mod}
                  to="/learn/$course/$lesson"
                  params={{ course: "python", lesson: first.slug }}
                  preload="intent"
                  className="group rounded-lg border border-border bg-card p-4 transition-colors hover:border-neon"
                >
                  <div className="text-[11px] font-semibold uppercase tracking-widest text-neon-2">
                    Module
                  </div>
                  <div className="mt-1 flex items-center justify-between gap-2">
                    <h3 className="font-semibold">{mod}</h3>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-neon" />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{count} lessons</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CBSE — separate section */}
      <section className="border-t border-border bg-card/20">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-8">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-neon-2">
            <Code2 className="h-3.5 w-3.5" /> CBSE Track · Code 083
          </div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            CBSE Class 11 & 12 Computer Science
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Board-aligned syllabus with detailed theory, previous-year questions,
            live Python & SQL playgrounds and downloadable PDF notes.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-widest text-neon">
                Class XI · Revision
              </div>
              <div className="mt-3 space-y-2">
                {xi.map((c) => (
                  <Link
                    key={c.slug}
                    to={c.slug}
                    preload="intent"
                    className="block rounded-md border border-border bg-card p-3 hover:border-neon"
                  >
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-neon-2">
                      {c.unit}
                    </div>
                    <div className="text-sm font-medium">{c.title}</div>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-widest text-neon">
                Class XII · Syllabus
              </div>
              <div className="mt-3 space-y-2">
                {xii.map((c) => (
                  <Link
                    key={c.slug}
                    to={c.slug}
                    preload="intent"
                    className="block rounded-md border border-border bg-card p-3 hover:border-neon"
                  >
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-neon-2">
                      {c.unit}
                    </div>
                    <div className="text-sm font-medium">{c.title}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Feature({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-card/40 p-5">
      <div className="flex items-center gap-2">
        {icon}
        <div className="font-semibold">{title}</div>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{children}</p>
    </div>
  );
}

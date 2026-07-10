import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Code2, Sparkles, Terminal } from "lucide-react";
import { chapters } from "@/lib/syllabus";
import { courses } from "@/lib/courses";
import { AdSlot } from "@/components/AdSlot";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CS Learners — Learn Python, Free & Interactive" },
      {
        name: "description",
        content:
          "Free interactive programming courses. Learn Python from beginner to advanced with a live in-browser editor. HTML, CSS, JS coming soon. CBSE Class 12 CS syllabus included.",
      },
      { property: "og:title", content: "CS Learners — Learn to Code in Your Browser" },
      {
        property: "og:description",
        content:
          "Free interactive Python course, plus CBSE Class 12 CS syllabus with live Python & SQL IDEs.",
      },
      { property: "og:url", content: "https://cslearners.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://cslearners.lovable.app/" }],
  }),
  component: Home,
});

function Home() {
  const xii = chapters.filter((c) => c.className === "XII");
  const python = courses.find((c) => c.slug === "python")!;
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border bg-hero">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-8 sm:py-28">
          <div className="inline-flex items-center gap-2 rounded-full border border-neon/40 bg-neon/10 px-3 py-1 text-xs font-medium text-neon">
            <Sparkles className="h-3 w-3" /> Free · Interactive · No installs
          </div>
          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            Learn to code, <span className="text-neon">in your browser.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            A full <span className="text-foreground">Python course</span> from beginner to
            advanced, with a live editor in every lesson. HTML, CSS and JavaScript
            tracks are coming soon.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
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

          <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-4">
            {courses.map((c) => (
              <div
                key={c.slug}
                className="rounded-lg border border-border bg-card/60 p-4"
              >
                <div className={`text-lg font-bold ${c.color}`}>{c.title}</div>
                <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                  {c.status === "available" ? `${c.lessons.length} lessons` : "Coming soon"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-8">
        <AdSlot className="mb-10" />
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
            See all →
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

        <div className="mt-14 rounded-lg border border-border bg-card/40 p-5">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-neon-2">
            <Code2 className="h-3.5 w-3.5" /> CBSE Class 12 · Code 083
          </div>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">
            Studying for the CBSE Class 12 CS exam?
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Full board-aligned syllabus, PYQs, and downloadable notes are still here.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {xii.slice(0, 4).map((c) => (
              <Link
                key={c.slug}
                to={c.slug}
                className="rounded-md border border-border bg-card p-3 hover:border-neon"
              >
                <div className="text-[10px] font-semibold uppercase tracking-widest text-neon-2">
                  {c.unit}
                </div>
                <div className="text-sm font-medium">{c.title}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

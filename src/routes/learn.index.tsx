import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Code2 } from "lucide-react";
import { courses, type Course } from "@/lib/courses";
import { useCourseProgress } from "@/lib/progress";
import { Progress } from "@/components/ui/progress";


export const Route = createFileRoute("/learn/")({
  head: () => ({
    meta: [
      { title: "Learn to Code — Courses" },
      {
        name: "description",
        content:
          "Free interactive programming courses. Learn Python from beginner to advanced with live in-browser code, plus upcoming HTML, CSS and JavaScript tracks.",
      },
      { property: "og:title", content: "Learn to Code — Courses" },
      {
        property: "og:description",
        content:
          "Free interactive programming courses with a live editor in every lesson.",
      },
      { property: "og:url", content: "https://cslearners.lovable.app/learn" },
    ],
    links: [{ rel: "canonical", href: "https://cslearners.lovable.app/learn" }],
  }),
  component: LearnIndex,
});

function LearnIndex() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-8">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-neon/40 bg-neon/10 px-3 py-1 text-xs font-medium text-neon">
          <Code2 className="h-3 w-3" /> Courses
        </div>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">Learn to code, in your browser.</h1>
        <p className="mt-3 text-muted-foreground">
          Free, interactive programming courses. Every lesson has a live editor —
          no installs, no setup.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {courses.map((c) => (
          <CourseCard key={c.slug} course={c} />
        ))}
      </div>


      <div className="mt-12 rounded-lg border border-border bg-card/40 p-5">
        <h2 className="text-lg font-semibold">Preparing for CBSE Class 12 CS (Code 083)?</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Our original board-aligned syllabus, PYQs and downloadable notes are still here.
        </p>
        <Link
          to="/"
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-neon hover:underline"
        >
          Open the CBSE hub <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

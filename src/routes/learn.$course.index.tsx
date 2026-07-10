import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { getCourse, lessonPath, type Course } from "@/lib/courses";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/learn/$course/")({
  loader: ({ params }) => {
    const course = getCourse(params.course);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ params, loaderData }) => {
    const course = loaderData?.course;
    const title = course ? `${course.title} — full course` : "Course";
    const desc = course
      ? `Free ${course.title} course: ${course.lessons.length} lessons from beginner to advanced, with a live editor in every lesson.`
      : "Programming course.";
    const url = `https://cslearners.lovable.app/learn/${params.course}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: CoursePage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-2xl font-bold">Course not found</h1>
      <Link to="/learn" className="mt-4 inline-block text-neon hover:underline">
        Browse all courses
      </Link>
    </div>
  ),
});

function CoursePage() {
  const { course } = Route.useLoaderData() as { course: Course };
  const { isDone } = useProgress();

  if (course.status !== "available") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className={`text-4xl font-bold ${course.color}`}>{course.title}</h1>
        <p className="mt-3 text-muted-foreground">{course.tagline}</p>
        <p className="mt-6 text-sm text-muted-foreground">
          This course is on the way. Meanwhile, start with{" "}
          <Link to="/learn/$course" params={{ course: "python" }} className="text-neon hover:underline">
            Python
          </Link>
          .
        </p>
      </div>
    );
  }

  const doneCount = course.lessons.filter((l) => isDone(lessonPath(course.slug, l.slug))).length;
  const pct = Math.round((doneCount / course.lessons.length) * 100);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-8">
      <div className="text-[11px] font-semibold uppercase tracking-widest text-neon-2">Course</div>
      <h1 className={`mt-1 text-4xl font-bold tracking-tight ${course.color}`}>{course.title}</h1>
      <p className="mt-2 text-muted-foreground">{course.tagline}</p>

      <div className="mt-6 flex items-center gap-4 rounded-lg border border-border bg-card/40 p-4 text-sm">
        <div className="text-muted-foreground">
          Progress: <span className="font-mono text-neon">{doneCount}</span> / {course.lessons.length} lessons
          {" "}({pct}%)
        </div>
        {course.lessons[0] && (
          <Link
            to="/learn/$course/$lesson"
            params={{ course: course.slug, lesson: course.lessons[0].slug }}
            className="ml-auto inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90"
          >
            Start course <ArrowRight className="h-3 w-3" />
          </Link>
        )}
      </div>

      <div className="mt-10 space-y-8">
        {course.modules.map((mod) => {
          const items = course.lessons.filter((l) => l.module === mod);
          return (
            <section key={mod}>
              <h2 className="text-lg font-semibold tracking-tight text-neon-2">{mod}</h2>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {items.map((l) => {
                  const done = isDone(lessonPath(course.slug, l.slug));
                  return (
                    <Link
                      key={l.slug}
                      to="/learn/$course/$lesson"
                      params={{ course: course.slug, lesson: l.slug }}
                      preload="intent"
                      className="group flex items-start gap-3 rounded-md border border-border bg-card p-3 transition-colors hover:border-neon"
                    >
                      <div className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full border border-border text-[10px] text-muted-foreground">
                        {done ? (
                          <CheckCircle2 className="h-4 w-4 text-neon" />
                        ) : (
                          <span>{l.order}</span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium">{l.title}</div>
                        <div className="text-xs text-muted-foreground">{l.blurb}</div>
                      </div>
                      <ArrowRight className="mt-1 h-4 w-4 flex-none text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-neon" />
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

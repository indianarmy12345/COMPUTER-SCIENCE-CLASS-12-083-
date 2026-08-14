import { useRef, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, CheckCircle2 } from "lucide-react";
import { markComplete, useCourseProgress } from "@/lib/progress";
import { Button } from "@/components/ui/button";
import { AdSlot } from "@/components/AdSlot";
import { ChapterCtx } from "@/components/ChapterLayout";
import type { Course, Lesson } from "@/lib/courses";
import { lessonPath } from "@/lib/courses";
import { PyRunner } from "@/components/PyRunner";
import type { LessonContent } from "@/content/python";


export function LessonPage({
  course,
  lesson,
  content,
  prev,
  next,
}: {
  course: Course;
  lesson: Lesson;
  content: LessonContent;
  prev?: Lesson;
  next?: Lesson;
}) {
  const slug = lessonPath(course.slug, lesson.slug);
  const { isDone, total } = useCourseProgress(course);
  const done = isDone(slug);
  const articleRef = useRef<HTMLDivElement>(null);
  const lessonIndex = course.lessons.findIndex((l) => l.slug === lesson.slug) + 1;

  return (
    <ChapterCtx.Provider value={slug}>
      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-8">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neon">
          <Link to="/learn/$course" params={{ course: course.slug }} className="hover:underline">
            {course.title}
          </Link>
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground">{lesson.module}</span>
          <span className="text-muted-foreground">·</span>
          <span className="normal-case tracking-normal text-muted-foreground">
            Lesson {lessonIndex} of {total}
          </span>
          {done && (
            <span className="inline-flex items-center gap-1 rounded-full border border-neon/40 bg-neon/10 px-2 py-0.5 text-[10px] text-neon">
              <CheckCircle2 className="h-3 w-3" /> Completed
            </span>
          )}
        </div>
        <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">{lesson.title}</h1>
        <p className="mt-2 text-muted-foreground">{lesson.blurb}</p>


        <div ref={articleRef} className="mt-8 space-y-8 text-[15px] leading-7">
          <section>
            <p className="text-foreground/90">{content.intro}</p>
          </section>

          {content.sections.map((s, i) => (
            <section key={i}>
              <h2 className="mb-3 text-xl font-semibold tracking-tight text-neon-2">{s.title}</h2>
              <ProseBody text={s.body} />
              {s.code && <CodeBlock code={s.code} />}
            </section>
          ))}

          <section>
            <h2 className="mb-3 text-xl font-semibold tracking-tight text-neon-2">
              Try it yourself
            </h2>
            <PyRunner
              title={content.runner.title ?? "Python"}
              initialCode={content.runner.code}
              height={240}
            />
          </section>

          {content.keyPoints && content.keyPoints.length > 0 && (
            <section>
              <h2 className="mb-3 text-xl font-semibold tracking-tight text-neon-2">
                Key points
              </h2>
              <ul className="list-disc space-y-1 pl-6 text-foreground/90">
                {content.keyPoints.map((k, i) => (
                  <li key={i}>{k}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <AdSlot className="mt-10" />

        <MarkCompleteBar slug={slug} done={done} />

        <LessonNav course={course} prev={prev} next={next} />
      </article>
    </ChapterCtx.Provider>
  );
}

function ProseBody({ text }: { text: string }) {
  // Split on blank lines into paragraphs; keep single \n as line breaks.
  const paras = text.split(/\n{2,}/);
  return (
    <div className="space-y-3 text-foreground/90">
      {paras.map((p, i) => (
        <p key={i} className="whitespace-pre-line">
          {p}
        </p>
      ))}
    </div>
  );
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div className="group relative mt-3">
      <div className="absolute right-2 top-2 z-10 opacity-80 transition-opacity group-hover:opacity-100">
        <CopyButton value={code} />
      </div>
      <pre className="overflow-x-auto rounded-lg border border-border bg-[var(--code-bg)] p-3 pr-20 font-mono text-sm leading-relaxed text-foreground">
        {code}
      </pre>
    </div>
  );
}

function MarkCompleteBar({ slug, done }: { slug: string; done: boolean }) {
  return (
    <div className="mt-12 flex items-center justify-between rounded-lg border border-border bg-card/40 p-4">
      <div className="text-sm text-muted-foreground">
        {done
          ? "Nice work — this lesson is marked complete."
          : "Run the example above or mark this lesson complete when you're ready."}
      </div>
      <Button
        size="sm"
        variant={done ? "secondary" : "default"}
        onClick={() => markComplete(slug)}
        disabled={done}
        className="shrink-0"
      >
        <Check className="mr-1 h-4 w-4" />
        {done ? "Completed" : "Mark complete"}
      </Button>
    </div>
  );
}

function LessonNav({
  course,
  prev,
  next,
}: {
  course: Course;
  prev?: Lesson;
  next?: Lesson;
}) {
  return (
    <nav className="mt-8 flex items-center justify-between border-t border-border pt-6 text-sm">
      {prev ? (
        <Link
          to="/learn/$course/$lesson"
          params={{ course: course.slug, lesson: prev.slug }}
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
          to="/learn/$course/$lesson"
          params={{ course: course.slug, lesson: next.slug }}
          className="group ml-auto flex items-center gap-2 text-right text-muted-foreground hover:text-neon"
        >
          <span>
            <span className="block text-[10px] uppercase tracking-wider">Next</span>
            {next.title}
          </span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      ) : (
        <Link
          to="/learn/$course"
          params={{ course: course.slug }}
          className="group ml-auto flex items-center gap-2 text-right text-muted-foreground hover:text-neon"
        >
          <span>
            <span className="block text-[10px] uppercase tracking-wider">Back to</span>
            {course.title} course
          </span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </nav>
  );
}

// Silence unused ReactNode import when tsgo pedantic
export type _KeepReactNode = ReactNode;

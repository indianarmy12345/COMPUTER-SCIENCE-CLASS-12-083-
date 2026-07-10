import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getLesson, type Course, type Lesson } from "@/lib/courses";
import { getLessonContent, type LessonContent } from "@/content/python";
import { LessonPage } from "@/components/LessonLayout";

export const Route = createFileRoute("/learn/$course/$lesson")({
  loader: ({ params }) => {
    const info = getLesson(params.course, params.lesson);
    const content = getLessonContent(params.course, params.lesson);
    if (!info || !content) throw notFound();
    return { ...info, content };
  },
  head: ({ params, loaderData }) => {
    const lesson = loaderData?.lesson;
    const course = loaderData?.course;
    const title = lesson ? `${lesson.title} — ${course?.title}` : "Lesson";
    const desc = lesson?.blurb ?? "Interactive programming lesson.";
    const url = `https://cslearners.lovable.app/learn/${params.course}/${params.lesson}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: LessonRoute,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-2xl font-bold">Lesson not found</h1>
      <Link to="/learn" className="mt-4 inline-block text-neon hover:underline">
        Browse all courses
      </Link>
    </div>
  ),
});

function LessonRoute() {
  const data = Route.useLoaderData() as {
    course: Course;
    lesson: Lesson;
    prev?: Lesson;
    next?: Lesson;
    content: LessonContent;
  };
  return (
    <LessonPage
      course={data.course}
      lesson={data.lesson}
      content={data.content}
      prev={data.prev}
      next={data.next}
    />
  );
}

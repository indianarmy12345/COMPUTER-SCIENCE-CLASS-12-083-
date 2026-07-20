import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { courses } from "@/lib/courses";

export default defineTool({
  name: "list_lessons",
  title: "List lessons in a course",
  description: "Return the ordered lesson list for a course, grouped by module.",
  inputSchema: {
    course: z.string().describe("Course slug, e.g. 'python'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ course }) => {
    const c = courses.find((x) => x.slug === course);
    if (!c) {
      return {
        content: [{ type: "text", text: `No course with slug '${course}'.` }],
        isError: true,
      };
    }
    const lessons = c.lessons
      .slice()
      .sort((a, b) => a.order - b.order)
      .map((l) => ({ slug: l.slug, title: l.title, module: l.module, order: l.order, blurb: l.blurb }));
    return {
      content: [{ type: "text", text: JSON.stringify(lessons, null, 2) }],
      structuredContent: { course: c.slug, lessons },
    };
  },
});

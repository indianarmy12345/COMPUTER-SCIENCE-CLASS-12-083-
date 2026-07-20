import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { courses } from "@/lib/courses";

export default defineTool({
  name: "get_lesson",
  title: "Get lesson metadata",
  description:
    "Return metadata for a single lesson (title, module, order, blurb) and a link to the full lesson page on CS Learners.",
  inputSchema: {
    course: z.string().describe("Course slug, e.g. 'python'."),
    lesson: z.string().describe("Lesson slug within the course, e.g. 'hello-world'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ course, lesson }) => {
    const c = courses.find((x) => x.slug === course);
    if (!c) {
      return { content: [{ type: "text", text: `No course '${course}'.` }], isError: true };
    }
    const l = c.lessons.find((x) => x.slug === lesson);
    if (!l) {
      return { content: [{ type: "text", text: `No lesson '${lesson}' in course '${course}'.` }], isError: true };
    }
    const url = `https://cslearners.lovable.app/learn/${course}/${lesson}`;
    return {
      content: [
        {
          type: "text",
          text: `${l.title}\nModule: ${l.module} (lesson #${l.order})\n\n${l.blurb}\n\nOpen: ${url}`,
        },
      ],
      structuredContent: { course: c.slug, lesson: { ...l, url } },
    };
  },
});

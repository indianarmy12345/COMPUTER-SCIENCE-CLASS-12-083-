import { defineTool } from "@lovable.dev/mcp-js";
import { courses } from "@/lib/courses";

export default defineTool({
  name: "list_courses",
  title: "List programming courses",
  description: "List all programming courses available on CS Learners (Python, plus upcoming HTML/CSS/JS).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const summary = courses.map((c) => ({
      slug: c.slug,
      title: c.title,
      tagline: c.tagline,
      status: c.status,
      modules: c.modules,
      lessonCount: c.lessons.length,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(summary, null, 2) }],
      structuredContent: { courses: summary },
    };
  },
});

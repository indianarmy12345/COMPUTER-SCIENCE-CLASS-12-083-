import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { chapters } from "@/lib/syllabus";

export default defineTool({
  name: "list_cbse_chapters",
  title: "List CBSE Class 11/12 CS chapters",
  description: "List CBSE Computer Science (Code 083) chapters covered on CS Learners.",
  inputSchema: {
    className: z.enum(["XI", "XII", "all"]).optional().describe("Filter by class: 'XI', 'XII', or 'all'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ className }) => {
    const filter = className ?? "all";
    const list = chapters
      .filter((c) => filter === "all" || c.className === filter)
      .map((c) => ({
        slug: c.slug,
        title: c.title,
        className: c.className,
        url: `https://cslearners.lovable.app/${c.className.toLowerCase()}/${c.slug}`,
      }));
    return {
      content: [{ type: "text", text: JSON.stringify(list, null, 2) }],
      structuredContent: { chapters: list },
    };
  },
});

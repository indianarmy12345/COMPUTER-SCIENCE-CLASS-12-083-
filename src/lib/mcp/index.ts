import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listCourses from "./tools/list-courses";
import listLessons from "./tools/list-lessons";
import getLesson from "./tools/get-lesson";
import listCbseChapters from "./tools/list-cbse-chapters";
import whoami from "./tools/whoami";

// The OAuth issuer MUST be the direct Supabase host. On publish, SUPABASE_URL
// is rewritten to the `.lovable.cloud` proxy, which mcp-js rejects (RFC 8414
// issuer mismatch). The project ref survives publish unchanged via
// import.meta.env.VITE_SUPABASE_PROJECT_ID (Vite inlines it at build time).
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "cs-learners-mcp",
  title: "CS Learners",
  version: "0.1.0",
  instructions:
    "Tools for the CS Learners programming-learning platform. Use `list_courses` and `list_lessons` to browse the Python course, `get_lesson` to fetch a lesson's metadata and URL, `list_cbse_chapters` to browse CBSE Class 11/12 Computer Science chapters, and `whoami` to see the signed-in user.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listCourses, listLessons, getLesson, listCbseChapters, whoami],
});

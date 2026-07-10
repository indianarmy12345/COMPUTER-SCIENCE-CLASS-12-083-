
# Plan: Turn CS 083 Hub into a general programming learning platform

## Goal
Keep the existing CBSE Class 12 content, but reposition the site as a general "learn to code" hub. Ship a complete Python course (beginner → advanced) now, with an architecture that makes adding HTML, CSS, JS (and more) later a matter of dropping in new course data + route files.

## Information architecture

New top-level structure:

```
/                     Landing (hero + language cards + CBSE callout)
/learn                Course catalog (all languages/tracks)
/learn/python         Python course overview + lesson index
/learn/python/$slug   Individual Python lesson (30+ lessons)
/cbse                 CBSE Class 12 CS hub (existing chapters moved under here)
/cbse/xi/...          Existing XI chapters (redirect/alias from /xi/*)
/cbse/xii/...         Existing XII chapters (redirect/alias from /xii/*)
/playground           Unchanged
/about /contact /privacy   Unchanged
```

Existing `/xi/*` and `/xii/*` routes stay in place (no broken links, no SEO regression). The CBSE hub links to them. Only the sidebar + landing get reframed.

## Python course scope (beginner → advanced)

Grouped into 6 modules, ~30 lessons total. Each lesson: concept explanation, worked example, and a live `PyRunner` block (which already marks the lesson complete on Run — reuse `useProgress`).

1. **Getting Started** — What is Python, installing vs. browser, hello world, using the REPL, comments, running scripts.
2. **Core Language** — Variables & types, numbers, strings, f-strings, booleans, operators, input/print, type conversion.
3. **Control Flow & Collections** — if/elif/else, while, for, range, break/continue, lists, tuples, sets, dicts, comprehensions.
4. **Functions & Modules** — def, args/kwargs, *args/**kwargs, default & keyword args, scope/closures, lambdas, `map`/`filter`/`reduce`, modules & `import`, virtual envs (concept).
5. **OOP & Errors** — Classes, `__init__`, methods, inheritance, dunder methods, properties, exceptions (`try/except/finally`, `raise`, custom exceptions), context managers.
6. **Advanced Python** — Iterators & generators, decorators, typing (`typing` module), dataclasses, files & pathlib, JSON, regex basics, `datetime`, virtualenv/pip (concept), async/await intro, testing with `unittest`/`pytest` (concept).

Each lesson stores: `slug`, `title`, `module`, `order`, `blurb`, plus a React component for the body.

## Extensibility for future languages

Create a shared course model in `src/lib/courses.ts`:

```ts
type Lesson = { slug: string; title: string; module: string; order: number; blurb: string };
type Course = { slug: "python" | "html" | "css" | "js"; title: string; tagline: string; icon: string; color: string; lessons: Lesson[] };
export const courses: Course[] = [ pythonCourse /* , htmlCourse, ... */ ];
```

Route files:
- `src/routes/learn.index.tsx` — catalog (maps over `courses`)
- `src/routes/learn.$course.index.tsx` — course overview (module → lesson list)
- `src/routes/learn.$course.$lesson.tsx` — lesson renderer; looks up `lessonBodies[course][lesson]` from a registry map

Adding HTML/CSS/JS later = append a course entry + a body registry. No route changes needed.

For JS/HTML/CSS runners later, the `PyRunner` pattern (component + `useChapterSlug` + `markComplete`) is the template — we can add `JsRunner`, `HtmlPreview`, etc., but that's out of scope for this pass.

## UI changes

- **Landing (`/`)**: New hero — "Learn to code, in your browser." Grid of "language" cards (Python: available; HTML/CSS/JS: "Coming soon" placeholders). Keep the CBSE Class 12 callout as a secondary section for existing users.
- **Sidebar (`AppSidebar`)**: Reorganize into groups:
  - Learn → Python (expandable list of modules) → per-lesson links
  - CBSE Class 12 → collapsible group containing existing XI + XII chapters
  - Site → About/Contact/Privacy (unchanged)
  - Progress widget unchanged (works across all chapter/lesson slugs since `useProgress` is slug-based). Note: total count will include both Python lessons and CBSE chapters — that's the correct combined progress.
- **Lesson page layout**: Reuse `ChapterLayout` (rename optional; not required) so PDF download + progress marking + AdSlot keep working. Content pattern: intro prose → concept sections → live `PyRunner` example → "next lesson" link at the bottom.

## SEO

- Each lesson route defines its own `head()` with unique title/description/og tags and a canonical URL.
- Update `public/llms.txt` to list the new `/learn/python/*` pages.
- Update `src/routes/sitemap[.]xml.ts` to emit URLs for every course + lesson (iterate over `courses`).
- Keep existing CBSE URLs — no redirects (avoids losing indexed pages).

## What I'll build in this pass

1. `src/lib/courses.ts` — course + lesson metadata for Python (all ~30 lessons).
2. `src/content/python/*.tsx` — lesson body components (one file per lesson, kept short and focused).
3. `src/routes/learn.index.tsx`, `src/routes/learn.$course.index.tsx`, `src/routes/learn.$course.$lesson.tsx`.
4. Reworked `src/routes/index.tsx` landing page.
5. Reworked `src/components/AppSidebar.tsx` with new groups + collapsible CBSE section.
6. Updated `sitemap[.]xml.ts` and `public/llms.txt`.
7. Head metadata on every new route.

## What I'll NOT do in this pass (call out for later)
- HTML/CSS/JS lessons and their runners.
- A dedicated "certificate" or quiz system.
- Auth / cross-device progress sync (still localStorage).
- Redirecting `/xi/*` and `/xii/*` under `/cbse/*` (keeping originals to preserve SEO).

Proceeding will touch ~35–40 files (mostly small lesson body files). Reply "go" to build, or tell me to trim/expand the lesson list first.

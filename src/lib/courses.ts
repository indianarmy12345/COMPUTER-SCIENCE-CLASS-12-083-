export type Lesson = {
  slug: string; // e.g. "hello-world"
  title: string;
  module: string;
  order: number;
  blurb: string;
};

export type Course = {
  slug: "python" | "html" | "css" | "js";
  title: string;
  tagline: string;
  status: "available" | "coming-soon";
  color: string; // tailwind color hint
  modules: string[];
  lessons: Lesson[];
};

const pythonLessons: Lesson[] = [
  // Module 1: Getting Started
  { slug: "what-is-python", title: "What is Python?", module: "Getting Started", order: 1, blurb: "Why Python, where it's used, and how it runs." },
  { slug: "hello-world", title: "Hello, World!", module: "Getting Started", order: 2, blurb: "Your first program, using print() and comments." },
  { slug: "running-python", title: "Running Python Code", module: "Getting Started", order: 3, blurb: "REPL, scripts, and this in-browser runtime." },

  // Module 2: Core Language
  { slug: "variables-and-types", title: "Variables & Data Types", module: "Core Language", order: 4, blurb: "int, float, str, bool and dynamic typing." },
  { slug: "numbers-and-math", title: "Numbers & Math Operators", module: "Core Language", order: 5, blurb: "Arithmetic, integer vs float, modulo, precedence." },
  { slug: "strings", title: "Strings", module: "Core Language", order: 6, blurb: "Indexing, slicing, common string methods." },
  { slug: "f-strings", title: "f-strings & Formatting", module: "Core Language", order: 7, blurb: "Interpolate values, format numbers and dates." },
  { slug: "input-and-output", title: "Input & Output", module: "Core Language", order: 8, blurb: "print(), input(), and type conversion." },
  { slug: "booleans-and-comparisons", title: "Booleans & Comparisons", module: "Core Language", order: 9, blurb: "True/False, comparison and logical operators." },

  // Module 3: Control Flow & Collections
  { slug: "if-else", title: "if / elif / else", module: "Control Flow & Collections", order: 10, blurb: "Branching your program based on conditions." },
  { slug: "while-loops", title: "while Loops", module: "Control Flow & Collections", order: 11, blurb: "Loop while a condition holds; break and continue." },
  { slug: "for-loops", title: "for Loops & range()", module: "Control Flow & Collections", order: 12, blurb: "Iterate over sequences and numeric ranges." },
  { slug: "lists", title: "Lists", module: "Control Flow & Collections", order: 13, blurb: "Ordered, mutable sequences and their methods." },
  { slug: "tuples", title: "Tuples", module: "Control Flow & Collections", order: 14, blurb: "Immutable sequences and packing / unpacking." },
  { slug: "dictionaries", title: "Dictionaries", module: "Control Flow & Collections", order: 15, blurb: "Key–value pairs, lookups and iteration." },
  { slug: "sets", title: "Sets", module: "Control Flow & Collections", order: 16, blurb: "Unique collections and set algebra." },
  { slug: "comprehensions", title: "List & Dict Comprehensions", module: "Control Flow & Collections", order: 17, blurb: "Concise, readable transformations." },

  // Module 4: Functions & Modules
  { slug: "functions", title: "Defining Functions", module: "Functions & Modules", order: 18, blurb: "def, parameters, return values." },
  { slug: "args-kwargs", title: "*args & **kwargs", module: "Functions & Modules", order: 19, blurb: "Variable positional and keyword arguments." },
  { slug: "scope-and-closures", title: "Scope & Closures", module: "Functions & Modules", order: 20, blurb: "LEGB rule, enclosing scope, closures." },
  { slug: "lambdas", title: "Lambda, map, filter", module: "Functions & Modules", order: 21, blurb: "Small anonymous functions and functional helpers." },
  { slug: "modules-and-imports", title: "Modules & Imports", module: "Functions & Modules", order: 22, blurb: "import, from ... import, the standard library." },

  // Module 5: OOP & Errors
  { slug: "classes", title: "Classes & Objects", module: "OOP & Errors", order: 23, blurb: "class, __init__, methods, self." },
  { slug: "inheritance", title: "Inheritance", module: "OOP & Errors", order: 24, blurb: "Subclasses, super(), method overriding." },
  { slug: "dunder-methods", title: "Dunder Methods", module: "OOP & Errors", order: 25, blurb: "__str__, __repr__, __eq__, __len__, operator overloading." },
  { slug: "exceptions", title: "Exceptions", module: "OOP & Errors", order: 26, blurb: "try / except / finally, raising, custom exceptions." },
  { slug: "context-managers", title: "Context Managers (with)", module: "OOP & Errors", order: 27, blurb: "with statement, files, and __enter__ / __exit__." },

  // Module 6: Advanced
  { slug: "iterators-generators", title: "Iterators & Generators", module: "Advanced Python", order: 28, blurb: "yield, generator expressions, lazy iteration." },
  { slug: "decorators", title: "Decorators", module: "Advanced Python", order: 29, blurb: "Wrap functions to add behavior." },
  { slug: "type-hints", title: "Type Hints", module: "Advanced Python", order: 30, blurb: "Annotations, typing module, static type checking." },
  { slug: "dataclasses", title: "Dataclasses", module: "Advanced Python", order: 31, blurb: "Boilerplate-free classes for data." },
  { slug: "files-and-json", title: "Files & JSON", module: "Advanced Python", order: 32, blurb: "Read/write text files and JSON documents." },
  { slug: "regex", title: "Regular Expressions", module: "Advanced Python", order: 33, blurb: "Pattern matching with the re module." },
  { slug: "async-await", title: "async & await", module: "Advanced Python", order: 34, blurb: "Cooperative concurrency with asyncio." },
];

export const courses: Course[] = [
  {
    slug: "python",
    title: "Python",
    tagline: "Beginner → advanced. Real language, live in your browser.",
    status: "available",
    color: "text-yellow-300",
    modules: [
      "Getting Started",
      "Core Language",
      "Control Flow & Collections",
      "Functions & Modules",
      "OOP & Errors",
      "Advanced Python",
    ],
    lessons: pythonLessons,
  },
  {
    slug: "html",
    title: "HTML",
    tagline: "Structure of the web — coming soon.",
    status: "coming-soon",
    color: "text-orange-400",
    modules: [],
    lessons: [],
  },
  {
    slug: "css",
    title: "CSS",
    tagline: "Style, layout and animation — coming soon.",
    status: "coming-soon",
    color: "text-sky-400",
    modules: [],
    lessons: [],
  },
  {
    slug: "js",
    title: "JavaScript",
    tagline: "The language of the browser — coming soon.",
    status: "coming-soon",
    color: "text-amber-300",
    modules: [],
    lessons: [],
  },
];

export function getCourse(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getLesson(courseSlug: string, lessonSlug: string) {
  const course = getCourse(courseSlug);
  if (!course) return undefined;
  const idx = course.lessons.findIndex((l) => l.slug === lessonSlug);
  if (idx === -1) return undefined;
  return {
    course,
    lesson: course.lessons[idx],
    prev: course.lessons[idx - 1],
    next: course.lessons[idx + 1],
    index: idx,
  };
}

export function lessonPath(courseSlug: string, lessonSlug: string) {
  return `/learn/${courseSlug}/${lessonSlug}`;
}

/** Absolute slug used for progress tracking, so it never collides with CBSE chapters. */
export function lessonProgressKey(courseSlug: string, lessonSlug: string) {
  return `/learn/${courseSlug}/${lessonSlug}`;
}

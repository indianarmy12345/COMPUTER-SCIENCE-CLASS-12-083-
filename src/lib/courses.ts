export type Lesson = {
  slug: string;
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
  color: string;
  modules: string[];
  lessons: Lesson[];
};

const pythonLessons: Lesson[] = [
  // Module 1: Getting Started
  { slug: "what-is-python", title: "What is Python?", module: "Getting Started", order: 1, blurb: "Why Python, where it's used, and how it runs." },
  { slug: "install-and-setup", title: "Install Python & Your Editor", module: "Getting Started", order: 2, blurb: "Install Python 3, pick an editor (VS Code / PyCharm), verify it works." },
  { slug: "hello-world", title: "Hello, World!", module: "Getting Started", order: 3, blurb: "Your first program, using print() and comments." },
  { slug: "running-python", title: "Running Python Code", module: "Getting Started", order: 4, blurb: "REPL, scripts, and this in-browser runtime." },

  // Module 2: Core Language
  { slug: "variables-and-types", title: "Variables & Data Types", module: "Core Language", order: 5, blurb: "int, float, str, bool and dynamic typing." },
  { slug: "numbers-and-math", title: "Numbers & Math Operators", module: "Core Language", order: 6, blurb: "Arithmetic, integer vs float, modulo, precedence." },
  { slug: "type-conversion", title: "Type Conversion & Casting", module: "Core Language", order: 7, blurb: "int(), float(), str(), bool() — and the gotchas." },
  { slug: "strings", title: "Strings", module: "Core Language", order: 8, blurb: "Indexing, slicing, common string methods." },
  { slug: "f-strings", title: "f-strings & Formatting", module: "Core Language", order: 9, blurb: "Interpolate values, format numbers and dates." },
  { slug: "input-and-output", title: "Input & Output", module: "Core Language", order: 10, blurb: "print(), input(), and type conversion." },
  { slug: "booleans-and-comparisons", title: "Booleans & Comparisons", module: "Core Language", order: 11, blurb: "True/False, comparison and logical operators." },

  // Module 3: Control Flow & Collections
  { slug: "if-else", title: "if / elif / else", module: "Control Flow & Collections", order: 12, blurb: "Branching your program based on conditions." },
  { slug: "while-loops", title: "while Loops", module: "Control Flow & Collections", order: 13, blurb: "Loop while a condition holds; break and continue." },
  { slug: "for-loops", title: "for Loops & range()", module: "Control Flow & Collections", order: 14, blurb: "Iterate over sequences and numeric ranges." },
  { slug: "nested-loops", title: "Nested Loops & loop-else", module: "Control Flow & Collections", order: 15, blurb: "Loops inside loops, patterns, and the else clause on loops." },
  { slug: "lists", title: "Lists", module: "Control Flow & Collections", order: 16, blurb: "Ordered, mutable sequences and their methods." },
  { slug: "tuples", title: "Tuples", module: "Control Flow & Collections", order: 17, blurb: "Immutable sequences and packing / unpacking." },
  { slug: "dictionaries", title: "Dictionaries", module: "Control Flow & Collections", order: 18, blurb: "Key–value pairs, lookups and iteration." },
  { slug: "sets", title: "Sets", module: "Control Flow & Collections", order: 19, blurb: "Unique collections and set algebra." },
  { slug: "comprehensions", title: "List & Dict Comprehensions", module: "Control Flow & Collections", order: 20, blurb: "Concise, readable transformations." },

  // Module 4: Functions & Modules
  { slug: "functions", title: "Defining Functions", module: "Functions & Modules", order: 21, blurb: "def, parameters, return values." },
  { slug: "args-kwargs", title: "*args & **kwargs", module: "Functions & Modules", order: 22, blurb: "Variable positional and keyword arguments." },
  { slug: "scope-and-closures", title: "Scope & Closures", module: "Functions & Modules", order: 23, blurb: "LEGB rule, enclosing scope, closures." },
  { slug: "recursion", title: "Recursion", module: "Functions & Modules", order: 24, blurb: "Functions that call themselves — base case, recursive case, stack limits." },
  { slug: "lambdas", title: "Lambda, map, filter", module: "Functions & Modules", order: 25, blurb: "Small anonymous functions and functional helpers." },
  { slug: "docstrings", title: "Docstrings & help()", module: "Functions & Modules", order: 26, blurb: "Document your code so future-you (and others) can read it." },
  { slug: "modules-and-imports", title: "Modules & Imports", module: "Functions & Modules", order: 27, blurb: "import, from ... import, the standard library." },
  { slug: "pip-and-venv", title: "pip, venv & Third-Party Packages", module: "Functions & Modules", order: 28, blurb: "Install packages safely with virtual environments." },

  // Module 5: OOP & Errors
  { slug: "classes", title: "Classes & Objects", module: "OOP & Errors", order: 29, blurb: "class, __init__, methods, self." },
  { slug: "inheritance", title: "Inheritance", module: "OOP & Errors", order: 30, blurb: "Subclasses, super(), method overriding." },
  { slug: "dunder-methods", title: "Dunder Methods", module: "OOP & Errors", order: 31, blurb: "__str__, __repr__, __eq__, __len__, operator overloading." },
  { slug: "properties-encapsulation", title: "Properties & Encapsulation", module: "OOP & Errors", order: 32, blurb: "@property, setters, and Python's approach to private data." },
  { slug: "classmethod-staticmethod", title: "@classmethod & @staticmethod", module: "OOP & Errors", order: 33, blurb: "Methods that don't need an instance — factories and utilities." },
  { slug: "abstract-and-polymorphism", title: "Polymorphism & Abstract Classes", module: "OOP & Errors", order: 34, blurb: "Duck typing, ABCs, and designing for interchangeable objects." },
  { slug: "exceptions", title: "Exceptions", module: "OOP & Errors", order: 35, blurb: "try / except / finally, raising, custom exceptions." },
  { slug: "context-managers", title: "Context Managers (with)", module: "OOP & Errors", order: 36, blurb: "with statement, files, and __enter__ / __exit__." },

  // Module 6: Advanced Python
  { slug: "iterators-generators", title: "Iterators & Generators", module: "Advanced Python", order: 37, blurb: "yield, generator expressions, lazy iteration." },
  { slug: "decorators", title: "Decorators", module: "Advanced Python", order: 38, blurb: "Wrap functions to add behavior." },
  { slug: "type-hints", title: "Type Hints", module: "Advanced Python", order: 39, blurb: "Annotations, typing module, static type checking." },
  { slug: "dataclasses", title: "Dataclasses", module: "Advanced Python", order: 40, blurb: "Boilerplate-free classes for data." },
  { slug: "collections-module", title: "The collections Module", module: "Advanced Python", order: 41, blurb: "Counter, defaultdict, deque, namedtuple, OrderedDict." },
  { slug: "itertools-functools", title: "itertools & functools", module: "Advanced Python", order: 42, blurb: "Powerful iterator recipes and functional helpers." },
  { slug: "files-and-json", title: "Files & JSON", module: "Advanced Python", order: 43, blurb: "Read/write text files and JSON documents." },
  { slug: "pathlib-os", title: "Filesystem: pathlib & os", module: "Advanced Python", order: 44, blurb: "Modern, cross-platform paths and directory operations." },
  { slug: "datetime-time", title: "Dates, Times & Timezones", module: "Advanced Python", order: 45, blurb: "The datetime module, formatting, timedeltas, timezones." },
  { slug: "regex", title: "Regular Expressions", module: "Advanced Python", order: 46, blurb: "Pattern matching with the re module." },
  { slug: "logging", title: "Logging", module: "Advanced Python", order: 47, blurb: "Better than print() for real programs — levels, handlers, format." },
  { slug: "testing-basics", title: "Testing with unittest & pytest", module: "Advanced Python", order: 48, blurb: "Write tests so you can change code without breaking it." },
  { slug: "http-requests", title: "HTTP with requests", module: "Advanced Python", order: 49, blurb: "Talk to web APIs — GET, POST, JSON, headers, status codes." },
  { slug: "async-await", title: "async & await", module: "Advanced Python", order: 50, blurb: "Cooperative concurrency with asyncio." },
  { slug: "performance-tips", title: "Performance & Best Practices", module: "Advanced Python", order: 51, blurb: "Profile, cache, choose the right data structure, write Pythonic code." },
];

export const courses: Course[] = [
  {
    slug: "python",
    title: "Python",
    tagline: "Beginner → advanced. A complete Python course, live in your browser.",
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

import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, Code2, Database, Sparkles } from "lucide-react";
import { AdSlot } from "@/components/AdSlot";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — CS 083 Hub" },
      {
        name: "description",
        content:
          "About CS 083 Hub — a free, interactive CBSE Class 12 Computer Science learning platform with live in-browser Python and SQL IDEs.",
      },
      { property: "og:title", content: "About — CS 083 Hub" },
      {
        property: "og:description",
        content:
          "Learn who built CS 083 Hub and why — interactive CBSE Class 12 CS notes with real Python & SQL IDEs.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-8 sm:py-16">
      <div className="inline-flex items-center gap-2 rounded-full border border-neon/40 bg-neon/10 px-3 py-1 text-xs font-medium text-neon">
        <Sparkles className="h-3 w-3" /> About this project
      </div>
      <h1 className="mt-4 text-4xl font-bold tracking-tight">About CS 083 Hub</h1>
      <p className="mt-4 text-base text-muted-foreground">
        CS 083 Hub is a free, modern learning platform built for CBSE Class 12
        Computer Science students. Our mission is simple: replace boring PDFs
        and unreadable handwritten notes with{" "}
        <span className="text-foreground">interactive, well-explained chapters</span>{" "}
        that you can actually run in your browser.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-4">
          <GraduationCap className="h-5 w-5 text-neon" />
          <h3 className="mt-2 font-semibold">For students</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Built around the official CBSE 083 syllabus with PYQs and MCQs.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <Code2 className="h-5 w-5 text-neon-2" />
          <h3 className="mt-2 font-semibold">Real Python</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Pyodide runs CPython right inside your browser — no installs.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <Database className="h-5 w-5 text-neon" />
          <h3 className="mt-2 font-semibold">Real SQL</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            sql.js gives you a working SQLite engine to practice queries.
          </p>
        </div>
      </div>

      <h2 className="mt-12 text-2xl font-semibold tracking-tight">What's inside</h2>
      <ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-muted-foreground">
        <li>10 chapters covering the full Class 11 revision + Class 12 syllabus.</li>
        <li>Detailed theory, real-world examples and previous-year questions.</li>
        <li>Live Python and SQL playgrounds with downloadable PDF notes.</li>
        <li>Progress tracker that remembers what you've completed.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight">Who it's for</h2>
      <p className="mt-3 text-sm text-muted-foreground">
        Class 12 CS students preparing for board exams, Class 11 students
        starting their journey, and self-learners who want a clean,
        distraction-free way to learn Python, SQL, DBMS and Networks.
      </p>

      <AdSlot className="mt-10" />
      <div className="mt-10 rounded-lg border border-border bg-card p-5">
        <h3 className="font-semibold">Get in touch</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Have feedback, found a typo, or want to suggest a topic? Visit our{" "}
          <Link to="/contact" className="text-neon hover:underline">
            contact page
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

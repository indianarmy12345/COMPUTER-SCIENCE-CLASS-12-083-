import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, Code2, Database, Sparkles, Rocket, Globe } from "lucide-react";
import { AdSlot } from "@/components/AdSlot";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — CodeLearners" },
      {
        name: "description",
        content:
          "About CodeLearners — a free, interactive platform to learn programming in your browser. Python today; HTML, CSS and JavaScript coming soon.",
      },
      { property: "og:title", content: "About — CodeLearners" },
      {
        property: "og:description",
        content:
          "Who built CodeLearners and why — interactive programming courses with a live editor in every lesson.",
      },
      { property: "og:url", content: "https://cslearners.lovable.app/about" },
    ],
    links: [{ rel: "canonical", href: "https://cslearners.lovable.app/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-8 sm:py-16">
      <div className="inline-flex items-center gap-2 rounded-full border border-neon/40 bg-neon/10 px-3 py-1 text-xs font-medium text-neon">
        <Sparkles className="h-3 w-3" /> About this project
      </div>
      <h1 className="mt-4 text-4xl font-bold tracking-tight">About CodeLearners</h1>
      <p className="mt-4 text-base text-muted-foreground">
        CodeLearners is a free, modern platform for learning programming. Our mission
        is simple: replace boring PDFs and stale tutorials with{" "}
        <span className="text-foreground">interactive, well-explained lessons</span>{" "}
        you can actually run in your browser — no installs, no signups required.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-4">
          <Rocket className="h-5 w-5 text-neon" />
          <h3 className="mt-2 font-semibold">Beginner → advanced</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            A full Python course from your first <code>print()</code> to async, decorators
            and testing.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <Code2 className="h-5 w-5 text-neon-2" />
          <h3 className="mt-2 font-semibold">Real code, in the browser</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Pyodide runs CPython and sql.js runs SQLite — right in your tab.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <Globe className="h-5 w-5 text-neon" />
          <h3 className="mt-2 font-semibold">Free for everyone</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            No paywalls, no subscriptions. Ads keep the lights on.
          </p>
        </div>
      </div>

      <h2 className="mt-12 text-2xl font-semibold tracking-tight">What's inside</h2>
      <ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-muted-foreground">
        <li>A complete <strong>Python</strong> course — 51 lessons across 6 modules.</li>
        <li>HTML, CSS and JavaScript tracks — <em>coming soon</em>.</li>
        <li>A dedicated <strong>CBSE Class 11 & 12 Computer Science</strong> track with PYQs, MCQs and PDF notes.</li>
        <li>A <Link to="/playground" className="text-neon hover:underline">playground</Link> for running Python & SQL freely.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight">Who it's for</h2>
      <p className="mt-3 text-sm text-muted-foreground">
        Anyone who wants to learn to code — self-taught learners, university students,
        working developers picking up a new language, and CBSE Class 11/12 students
        preparing for their board exams.
      </p>

      <div className="mt-10 rounded-lg border border-border bg-card p-5">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-neon" />
          <h3 className="font-semibold">Where we're headed</h3>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          More languages, more interactive exercises, and more real-world projects.
          If there's a topic you want us to cover, tell us.
        </p>
      </div>

      <AdSlot className="mt-10" />
      <div className="mt-10 rounded-lg border border-border bg-card p-5">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-neon-2" />
          <h3 className="font-semibold">Get in touch</h3>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Feedback, typos, or a topic request? Visit our{" "}
          <Link to="/contact" className="text-neon hover:underline">
            contact page
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

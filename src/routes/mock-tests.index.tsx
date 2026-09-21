import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Clock, FileText, ListChecks, Timer, Trophy } from "lucide-react";
import { mockTests, totalMarks, readResults, type StoredResult } from "@/lib/mock-registry";
import { Button } from "@/components/ui/button";
import { AdSlot } from "@/components/AdSlot";

export const Route = createFileRoute("/mock-tests/")({
  head: () => ({
    meta: [
      { title: "CBSE Class 12 CS Mock Tests — Timed Board Exam Practice" },
      {
        name: "description",
        content:
          "Take timed full-length CBSE Class 12 Computer Science (083) mock tests with automatic scoring and section-wise results covering every unit of the syllabus.",
      },
      { property: "og:title", content: "CBSE Class 12 CS Mock Tests — Timed Practice" },
      {
        property: "og:description",
        content:
          "Full-syllabus timed mock papers with instant scoring, section-wise and topic-wise analysis.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://cslearners.lovable.app/mock-tests" },
    ],
    links: [{ rel: "canonical", href: "https://cslearners.lovable.app/mock-tests" }],
  }),
  component: MockTestsIndex,
});

function MockTestsIndex() {
  const [results, setResults] = useState<Record<string, StoredResult>>({});
  useEffect(() => setResults(readResults()), []);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-8">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-neon/40 bg-neon/10 px-3 py-1 text-xs font-medium text-neon">
          <Timer className="h-3 w-3" /> Board exam mock tests
        </div>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">
          Timed full-length Class 12 mock tests
        </h1>
        <p className="mt-3 text-muted-foreground">
          Every paper follows the CBSE Computer Science (083) pattern — 70 marks, 3 hours,
          Sections A to E — and covers the complete syllabus. You get instant scoring plus
          section-wise and chapter-wise results with answer explanations.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {mockTests.map((t) => {
          const last = results[t.slug];
          return (
            <div
              key={t.slug}
              className="rounded-xl border border-border bg-card/50 p-5 transition-colors hover:border-neon/50"
            >
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neon">
                <FileText className="h-3.5 w-3.5" /> {totalMarks(t)} marks
              </div>
              <h2 className="mt-2 text-lg font-semibold">{t.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{t.description}</p>
              <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {t.durationMinutes} minutes
                </span>
                <span className="inline-flex items-center gap-1">
                  <ListChecks className="h-3.5 w-3.5" /> {t.questions.length} questions
                </span>
                {last && (
                  <span className="inline-flex items-center gap-1 text-neon">
                    <Trophy className="h-3.5 w-3.5" /> Last score {last.scored}/{last.total}
                  </span>
                )}
              </div>
              <Button asChild size="sm" className="mt-4">
                <Link to="/mock-tests/$testId" params={{ testId: t.slug }}>
                  {last ? "Retake test" : "Start test"}
                </Link>
              </Button>
            </div>
          );
        })}
      </div>

      <div className="mt-10 rounded-xl border border-border bg-card/40 p-5 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">How it works:</span> the timer starts as
        soon as you begin. Answer in any order, flag nothing, and submit when you are done — the
        paper is submitted automatically when time runs out. Your score is calculated instantly,
        marks are split by section and by chapter, and every question shows the correct answer.
      </div>

      <AdSlot className="mt-10" />
    </div>
  );
}

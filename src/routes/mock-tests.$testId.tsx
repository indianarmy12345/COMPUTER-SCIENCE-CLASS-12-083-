import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  RotateCcw,
  Timer,
  Trophy,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  getMockTest,
  scoreTest,
  saveResult,
  totalMarks,
  type Breakdown,
} from "@/lib/mock-registry";
import { sectionInfo, type MockQuestion, type MockTest } from "@/lib/mock-tests";
import { AdSlot } from "@/components/AdSlot";

export const Route = createFileRoute("/mock-tests/$testId")({
  loader: ({ params }) => {
    const test = getMockTest(params.testId);
    if (!test) throw notFound();
    return { test };
  },
  head: ({ loaderData }) => {
    const title = loaderData?.test
      ? `${loaderData.test.title} — Timed CBSE Class 12 CS Mock Test`
      : "CBSE Class 12 CS Mock Test";
    const description =
      loaderData?.test?.description ??
      "Timed full-length CBSE Class 12 Computer Science mock test with automatic scoring.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: MockTestRunner,
});

type Phase = "intro" | "running" | "result";

function MockTestRunner() {
  const { test } = Route.useLoaderData();
  const [phase, setPhase] = useState<Phase>("intro");
  const [answers, setAnswers] = useState<Record<string, number | undefined>>({});
  const [secondsLeft, setSecondsLeft] = useState(test.durationMinutes * 60);
  const [autoSubmitted, setAutoSubmitted] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const result = useMemo(() => scoreTest(test, answers), [test, answers]);

  const finish = useCallback(
    (auto: boolean) => {
      setAutoSubmitted(auto);
      setPhase("result");
      const s = scoreTest(test, answers);
      saveResult({ slug: test.slug, scored: s.scored, total: s.total, at: new Date().toISOString() });
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [answers, test],
  );

  useEffect(() => {
    if (phase !== "running") return;
    const id = window.setInterval(() => {
      setSecondsLeft((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (phase === "running" && secondsLeft === 0) finish(true);
  }, [phase, secondsLeft, finish]);

  const restart = () => {
    setAnswers({});
    setSecondsLeft(test.durationMinutes * 60);
    setAutoSubmitted(false);
    setPhase("running");
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const sections = useMemo(() => groupBySection(test), [test]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8" ref={topRef}>
      <Link
        to="/mock-tests"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-neon"
      >
        <ArrowLeft className="h-4 w-4" /> All mock tests
      </Link>

      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{test.title}</h1>
      <p className="mt-2 text-muted-foreground">{test.description}</p>

      {phase === "intro" && (
        <IntroCard test={test} onStart={() => setPhase("running")} />
      )}

      {phase === "running" && (
        <>
          <TimerBar
            secondsLeft={secondsLeft}
            totalSeconds={test.durationMinutes * 60}
            answered={result.attempted}
            count={test.questions.length}
            onSubmit={() => finish(false)}
          />
          <div className="mt-8 space-y-10">
            {sections.map(([section, qs]) => (
              <div key={section}>
                <div className="mb-4 border-b border-border pb-2">
                  <h2 className="text-xl font-semibold text-neon-2">
                    {sectionInfo[section].label}
                  </h2>
                  <p className="text-xs text-muted-foreground">{sectionInfo[section].note}</p>
                </div>
                <div className="space-y-5">
                  {qs.map((q, i) => (
                    <QuestionCard
                      key={q.id}
                      q={q}
                      index={i + 1}
                      selected={answers[q.id]}
                      onSelect={(idx) => setAnswers((a) => ({ ...a, [q.id]: idx }))}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card/40 p-4">
            <p className="text-sm text-muted-foreground">
              Answered {result.attempted} of {test.questions.length} questions.
            </p>
            <Button onClick={() => finish(false)}>Submit test</Button>
          </div>
        </>
      )}

      {phase === "result" && (
        <ResultView
          test={test}
          answers={answers}
          result={result}
          autoSubmitted={autoSubmitted}
          timeUsed={test.durationMinutes * 60 - secondsLeft}
          onRetake={restart}
        />
      )}

      <AdSlot className="mt-10" />
    </div>
  );
}

function groupBySection(test: MockTest) {
  const order: MockQuestion["section"][] = ["A", "B", "C", "D", "E"];
  return order
    .map((s) => [s, test.questions.filter((q) => q.section === s)] as const)
    .filter(([, qs]) => qs.length > 0);
}

function fmt(s: number) {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${h > 0 ? `${h}:` : ""}${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function IntroCard({ test, onStart }: { test: MockTest; onStart: () => void }) {
  const sections = groupBySection(test);
  return (
    <div className="mt-8 rounded-xl border border-border bg-card/50 p-6">
      <h2 className="text-lg font-semibold">Before you begin</h2>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        <li>• Duration: {test.durationMinutes} minutes · Maximum marks: {totalMarks(test)}</li>
        <li>• {test.questions.length} questions across Sections A to E, full syllabus.</li>
        <li>• The timer starts immediately and the paper submits itself when time is over.</li>
        <li>• There is no negative marking — attempt every question.</li>
      </ul>
      <div className="mt-4 grid gap-2 text-xs text-muted-foreground sm:grid-cols-5">
        {sections.map(([s, qs]) => (
          <div key={s} className="rounded-md border border-border bg-background/50 p-2">
            <div className="font-semibold text-foreground">{sectionInfo[s].label}</div>
            {qs.length} Q · {qs.reduce((t, q) => t + q.marks, 0)} marks
          </div>
        ))}
      </div>
      <Button className="mt-6" onClick={onStart}>
        <Timer className="mr-1 h-4 w-4" /> Start timed test
      </Button>
    </div>
  );
}

function TimerBar({
  secondsLeft,
  totalSeconds,
  answered,
  count,
  onSubmit,
}: {
  secondsLeft: number;
  totalSeconds: number;
  answered: number;
  count: number;
  onSubmit: () => void;
}) {
  const low = secondsLeft <= 300;
  return (
    <div className="sticky top-0 z-20 mt-6 rounded-lg border border-border bg-background/95 p-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          className={`inline-flex items-center gap-2 font-mono text-lg font-semibold ${
            low ? "text-destructive" : "text-foreground"
          }`}
        >
          <Clock className="h-4 w-4" aria-hidden="true" />
          <span aria-label="Time remaining">{fmt(secondsLeft)}</span>
        </div>
        <span className="text-xs text-muted-foreground">
          {answered}/{count} answered
        </span>
        <Button size="sm" variant="outline" onClick={onSubmit}>
          Submit
        </Button>
      </div>
      <Progress
        className="mt-2 h-1"
        value={totalSeconds ? ((totalSeconds - secondsLeft) / totalSeconds) * 100 : 0}
      />
    </div>
  );
}

function QuestionCard({
  q,
  index,
  selected,
  onSelect,
  review,
}: {
  q: MockQuestion;
  index: number;
  selected: number | undefined;
  onSelect?: (idx: number) => void;
  review?: boolean;
}) {
  return (
    <div className="rounded-lg border border-border bg-card/40 p-4">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        <span>
          Q{index} · {q.marks} mark{q.marks > 1 ? "s" : ""}
        </span>
        <span className="text-neon-2">{q.topic}</span>
      </div>
      <p className="text-sm font-medium text-foreground/90">{q.question}</p>
      {q.code && (
        <pre className="mt-3 overflow-x-auto rounded-md border border-border bg-code p-3 text-xs leading-6">
          <code>{q.code}</code>
        </pre>
      )}
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {q.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = q.answer === i;
          let tone = "border-border bg-background/60 hover:border-neon/60";
          if (review) {
            if (isCorrect) tone = "border-neon/60 bg-neon/10";
            else if (isSelected) tone = "border-destructive/60 bg-destructive/10";
          } else if (isSelected) {
            tone = "border-neon bg-neon/10";
          }
          return (
            <button
              key={i}
              type="button"
              disabled={review}
              onClick={() => onSelect?.(i)}
              className={`flex items-start gap-2 rounded-md border px-3 py-2 text-left text-sm transition-colors ${tone}`}
            >
              <span className="font-semibold">({String.fromCharCode(97 + i)})</span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
      {review && (
        <div className="mt-3 rounded-md border border-border bg-background/60 p-3 text-xs text-foreground/85">
          <span className="font-semibold">
            {selected === q.answer
              ? "Correct"
              : selected === undefined
                ? "Not attempted"
                : "Incorrect"}
            {" · "}Answer: ({String.fromCharCode(97 + q.answer)}) {q.options[q.answer]}
          </span>
          <p className="mt-1">{q.explanation}</p>
        </div>
      )}
    </div>
  );
}

function ResultView({
  test,
  answers,
  result,
  autoSubmitted,
  timeUsed,
  onRetake,
}: {
  test: MockTest;
  answers: Record<string, number | undefined>;
  result: ReturnType<typeof scoreTest>;
  autoSubmitted: boolean;
  timeUsed: number;
  onRetake: () => void;
}) {
  const percent = result.total ? Math.round((result.scored / result.total) * 100) : 0;
  const sections = groupBySection(test);
  return (
    <div className="mt-8">
      {autoSubmitted && (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          Time was over, so the paper was submitted automatically.
        </div>
      )}

      <div className="rounded-xl border border-neon/40 bg-neon/5 p-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neon">
          <Trophy className="h-4 w-4" /> Result
        </div>
        <div className="mt-2 text-4xl font-bold">
          {result.scored}
          <span className="text-xl text-muted-foreground">/{result.total}</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {percent}% · {result.correct} of {test.questions.length} questions correct ·{" "}
          {result.attempted} attempted · time used {fmt(timeUsed)}
        </p>
        <Progress className="mt-3 h-2" value={percent} />
        <div className="mt-4 flex gap-2">
          <Button size="sm" onClick={onRetake}>
            <RotateCcw className="mr-1 h-4 w-4" /> Retake test
          </Button>
          <Button size="sm" variant="outline" asChild>
            <Link to="/mock-tests">Other papers</Link>
          </Button>
        </div>
      </div>

      <BreakdownTable
        title="Section-wise result"
        rows={result.bySection.map((r) => ({ ...r, key: sectionInfo[r.key as "A"].label }))}
      />
      <BreakdownTable title="Chapter-wise result" rows={result.byTopic} />

      <h2 className="mt-10 text-xl font-semibold">Answer review</h2>
      <div className="mt-4 space-y-10">
        {sections.map(([section, qs]) => (
          <div key={section}>
            <div className="mb-4 border-b border-border pb-2 text-sm font-semibold text-neon-2">
              {sectionInfo[section].label}
            </div>
            <div className="space-y-5">
              {qs.map((q, i) => (
                <QuestionCard key={q.id} q={q} index={i + 1} selected={answers[q.id]} review />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BreakdownTable({ title, rows }: { title: string; rows: Breakdown[] }) {
  return (
    <div className="mt-8 rounded-xl border border-border bg-card/40 p-5">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-4 space-y-3">
        {rows.map((r) => {
          const pct = r.total ? Math.round((r.scored / r.total) * 100) : 0;
          return (
            <div key={r.key}>
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="flex items-center gap-1.5 font-medium">
                  {pct >= 50 ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-neon" />
                  ) : (
                    <XCircle className="h-3.5 w-3.5 text-destructive" />
                  )}
                  {r.key}
                </span>
                <span className="text-muted-foreground">
                  {r.scored}/{r.total} marks · {r.correct}/{r.count} correct
                </span>
              </div>
              <Progress className="mt-1.5 h-1.5" value={pct} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

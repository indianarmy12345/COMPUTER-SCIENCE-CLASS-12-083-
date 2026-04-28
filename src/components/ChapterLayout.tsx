import { createContext, useContext, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, CheckCircle2 } from "lucide-react";
import { chapters } from "@/lib/syllabus";
import { markComplete, useProgress } from "@/lib/progress";
import { Button } from "@/components/ui/button";

const ChapterCtx = createContext<string | null>(null);
export const useChapterSlug = () => useContext(ChapterCtx);

export function ChapterLayout({
  slug,
  children,
}: {
  slug: string;
  children: ReactNode;
}) {
  const idx = chapters.findIndex((c) => c.slug === slug);
  const current = chapters[idx];
  const prev = chapters[idx - 1];
  const next = chapters[idx + 1];
  const { isDone } = useProgress();
  const done = isDone(slug);

  return (
    <ChapterCtx.Provider value={slug}>
      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-8">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neon">
          <span>{current?.unit}</span>
          {done && (
            <span className="inline-flex items-center gap-1 rounded-full border border-neon/40 bg-neon/10 px-2 py-0.5 text-[10px] text-neon">
              <CheckCircle2 className="h-3 w-3" /> Completed
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{current?.title}</h1>
        <p className="mt-2 text-muted-foreground">{current?.blurb}</p>
        <div className="mt-8 space-y-8 text-[15px] leading-7">{children}</div>

        <div className="mt-12 flex items-center justify-between rounded-lg border border-border bg-card/40 p-4">
          <div className="text-sm text-muted-foreground">
            {done
              ? "Nice work — this chapter is marked complete."
              : "Run an example or mark this chapter complete when you're ready."}
          </div>
          <Button
            size="sm"
            variant={done ? "secondary" : "default"}
            onClick={() => markComplete(slug)}
            disabled={done}
            className="shrink-0"
          >
            <Check className="mr-1 h-4 w-4" />
            {done ? "Completed" : "Mark complete"}
          </Button>
        </div>

        <nav className="mt-8 flex items-center justify-between border-t border-border pt-6 text-sm">
          {prev ? (
            <Link
              to={prev.slug}
              className="group flex items-center gap-2 text-muted-foreground hover:text-neon"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>
                <span className="block text-[10px] uppercase tracking-wider">Previous</span>
                {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to={next.slug}
              className="group ml-auto flex items-center gap-2 text-right text-muted-foreground hover:text-neon"
            >
              <span>
                <span className="block text-[10px] uppercase tracking-wider">Next</span>
                {next.title}
              </span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          ) : null}
        </nav>
      </article>
    </ChapterCtx.Provider>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 text-xl font-semibold tracking-tight text-neon-2">{title}</h2>
      <div className="space-y-3 text-foreground/90">{children}</div>
    </section>
  );
}

export function Callout({
  label = "Real-world",
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-neon/40 bg-neon/5 p-4">
      <div className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-neon">
        {label}
      </div>
      <div className="text-sm text-foreground/90">{children}</div>
    </div>
  );
}

/** Quick check: short answer or MCQ. Marks the chapter complete on correct submit. */
export function QuickCheck({
  question,
  answer,
  options,
  hint,
}: {
  question: string;
  /** Accepted answer (case-insensitive, trimmed). For MCQ, must match an option. */
  answer: string;
  /** If provided, renders as multiple choice. */
  options?: string[];
  hint?: string;
}) {
  const slug = useChapterSlug();
  const [value, setValue] = useState("");
  const [state, setState] = useState<"idle" | "correct" | "wrong">("idle");

  const submit = (val: string) => {
    const ok = val.trim().toLowerCase() === answer.trim().toLowerCase();
    setState(ok ? "correct" : "wrong");
    if (ok && slug) markComplete(slug);
  };

  return (
    <div className="rounded-lg border border-border bg-card/40 p-4">
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-neon-2">
        Quick check
      </div>
      <p className="text-sm font-medium">{question}</p>
      {options ? (
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {options.map((opt) => (
            <Button
              key={opt}
              size="sm"
              variant="outline"
              className="justify-start"
              onClick={() => {
                setValue(opt);
                submit(opt);
              }}
            >
              {opt}
            </Button>
          ))}
        </div>
      ) : (
        <div className="mt-3 flex gap-2">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit(value)}
            placeholder="Type your answer…"
            className="flex-1 rounded-md border border-border bg-background px-3 py-1.5 text-sm outline-none focus:border-neon"
          />
          <Button size="sm" onClick={() => submit(value)}>
            Submit
          </Button>
        </div>
      )}
      {state === "correct" && (
        <p className="mt-2 text-xs text-neon">✓ Correct — chapter marked complete.</p>
      )}
      {state === "wrong" && (
        <p className="mt-2 text-xs text-destructive">
          Not quite. {hint ? `Hint: ${hint}` : "Try again."}
        </p>
      )}
    </div>
  );
}

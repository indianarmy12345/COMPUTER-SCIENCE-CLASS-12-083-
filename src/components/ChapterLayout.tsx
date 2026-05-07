import { createContext, useContext, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Download, Loader2 } from "lucide-react";
import { chapters } from "@/lib/syllabus";
import { markComplete, useProgress } from "@/lib/progress";
import { Button } from "@/components/ui/button";
import { AdSlot } from "@/components/AdSlot";

async function downloadChapterPdf(
  el: HTMLElement,
  title: string,
  unit: string,
  blurb: string,
) {
  const [{ default: jsPDF }] = await Promise.all([import("jspdf")]);

  const pdf = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 48;
  const maxWidth = pageWidth - margin * 2;
  let y = margin;

  const ensureSpace = (h: number) => {
    if (y + h > pageHeight - margin) {
      pdf.addPage();
      y = margin;
    }
  };

  const writeText = (
    text: string,
    opts: { size?: number; bold?: boolean; mono?: boolean; color?: [number, number, number]; gap?: number } = {},
  ) => {
    const { size = 11, bold = false, mono = false, color = [20, 20, 20], gap = 4 } = opts;
    pdf.setFont(mono ? "courier" : "helvetica", bold ? "bold" : "normal");
    pdf.setFontSize(size);
    pdf.setTextColor(color[0], color[1], color[2]);
    const lines = pdf.splitTextToSize(text, maxWidth) as string[];
    const lineHeight = size * 1.35;
    for (const line of lines) {
      ensureSpace(lineHeight);
      pdf.text(line, margin, y);
      y += lineHeight;
    }
    y += gap;
  };

  const writeCodeBlock = (code: string) => {
    const size = 9;
    const lineHeight = size * 1.4;
    const lines = code.split("\n").flatMap(
      (l) => pdf.splitTextToSize(l || " ", maxWidth - 16) as string[],
    );
    const blockHeight = lines.length * lineHeight + 16;
    ensureSpace(Math.min(blockHeight, pageHeight - margin * 2));
    const startY = y;
    let consumed = 0;
    pdf.setFont("courier", "normal");
    pdf.setFontSize(size);
    pdf.setTextColor(20, 20, 20);
    for (const line of lines) {
      if (y + lineHeight > pageHeight - margin) {
        // close current background
        pdf.setFillColor(244, 244, 248);
        pdf.rect(margin, startY - 2 + consumed, maxWidth, y - (startY + consumed) + 4, "F");
        pdf.setFont("courier", "normal");
        pdf.setFontSize(size);
        pdf.setTextColor(20, 20, 20);
        pdf.addPage();
        y = margin;
        consumed = y - startY;
      }
      pdf.text(line, margin + 8, y + lineHeight - 3);
      y += lineHeight;
    }
    pdf.setFillColor(244, 244, 248);
    pdf.rect(margin, startY - 2, maxWidth, y - startY + 4, "F");
    // re-draw text on top of the fill
    pdf.setFont("courier", "normal");
    pdf.setFontSize(size);
    pdf.setTextColor(20, 20, 20);
    let ty = startY;
    for (const line of lines) {
      if (ty + lineHeight > pageHeight - margin) break;
      pdf.text(line, margin + 8, ty + lineHeight - 3);
      ty += lineHeight;
    }
    y += 8;
  };

  // Header
  writeText(unit.toUpperCase(), { size: 9, bold: true, color: [40, 120, 200], gap: 2 });
  writeText(title, { size: 20, bold: true, gap: 4 });
  writeText(blurb, { size: 11, color: [90, 90, 90], gap: 12 });

  // Walk top-level sections in the article
  const sections = el.querySelectorAll<HTMLElement>(":scope > section, :scope section");
  const seen = new Set<HTMLElement>();
  sections.forEach((sec) => {
    if (seen.has(sec)) return;
    // skip nested sections (handled via parent walk)
    let p: HTMLElement | null = sec.parentElement;
    while (p && p !== el) {
      if (p.tagName === "SECTION") return;
      p = p.parentElement;
    }
    seen.add(sec);

    const heading = sec.querySelector("h2")?.textContent?.trim();
    if (heading) writeText(heading, { size: 14, bold: true, color: [30, 30, 30], gap: 6 });

    // Iterate children of section, in order
    const walk = (node: Element) => {
      const tag = node.tagName;
      if (tag === "H2") return;
      if (tag === "PRE") {
        const code = node.textContent ?? "";
        writeCodeBlock(code.replace(/\u00a0/g, " "));
        return;
      }
      // Code editor (textarea inside runner)
      const ta = node.querySelector?.("textarea");
      if (ta && ta instanceof HTMLTextAreaElement) {
        writeCodeBlock(ta.value);
        return;
      }
      if (tag === "UL" || tag === "OL") {
        node.querySelectorAll(":scope > li").forEach((li) => {
          writeText("• " + (li.textContent ?? "").trim(), { size: 11, gap: 2 });
        });
        return;
      }
      if (tag === "P" || tag === "DIV") {
        // If this div contains a textarea further down (runner card), recurse
        const innerTa = node.querySelector("textarea");
        if (innerTa instanceof HTMLTextAreaElement) {
          // also grab any leading paragraph text inside callouts etc.
          const txt = (node.textContent ?? "").trim();
          if (txt && txt !== innerTa.value) {
            // skip — usually controls labels
          }
          writeCodeBlock(innerTa.value);
          return;
        }
        const txt = (node.textContent ?? "").trim();
        if (txt) writeText(txt, { size: 11, gap: 4 });
        return;
      }
    };

    Array.from(sec.children).forEach(walk);
    y += 6;
  });

  const safe = title.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  pdf.save(`${safe}-notes.pdf`);
}

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
  const articleRef = useRef<HTMLDivElement>(null);
  const [pdfLoading, setPdfLoading] = useState(false);

  const handleDownload = async () => {
    if (!articleRef.current || !current) return;
    try {
      setPdfLoading(true);
      await downloadChapterPdf(articleRef.current, current.title, current.unit, current.blurb);
    } finally {
      setPdfLoading(false);
    }
  };

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
        <div className="mt-1 flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{current?.title}</h1>
            <p className="mt-2 text-muted-foreground">{current?.blurb}</p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={handleDownload}
            disabled={pdfLoading}
            className="shrink-0"
          >
            {pdfLoading ? (
              <Loader2 className="mr-1 h-4 w-4 animate-spin" />
            ) : (
              <Download className="mr-1 h-4 w-4" />
            )}
            {pdfLoading ? "Building PDF…" : "Download notes as PDF"}
          </Button>
        </div>
        <div ref={articleRef} className="mt-8 space-y-8 text-[15px] leading-7">{children}</div>

        <AdSlot className="mt-10" />

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

/** Previous Year Question card (CBSE board exams). */
export function PYQ({
  year,
  marks,
  question,
  answer,
}: {
  year: string;
  marks?: number;
  question: ReactNode;
  answer: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-lg border border-amber-500/40 bg-amber-500/5 p-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="text-[11px] font-semibold uppercase tracking-widest text-amber-400">
          PYQ · {year}{marks ? ` · ${marks} mark${marks > 1 ? "s" : ""}` : ""}
        </div>
        <Button size="sm" variant="ghost" onClick={() => setOpen((o) => !o)}>
          {open ? "Hide answer" : "Show answer"}
        </Button>
      </div>
      <div className="text-sm font-medium text-foreground/90">{question}</div>
      {open && (
        <div className="mt-3 rounded-md border border-amber-500/30 bg-background/50 p-3 text-sm text-foreground/85">
          <div className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-amber-400">Answer</div>
          {answer}
        </div>
      )}
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

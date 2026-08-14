import { useEffect, useRef, useState } from "react";
import { Play, Loader2, RotateCcw, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChapterSlug } from "./ChapterLayout";
import { markComplete } from "@/lib/progress";
import { CopyButton } from "@/components/CopyButton";

declare global {
  interface Window {
    loadPyodide?: (opts?: { indexURL?: string }) => Promise<PyodideInstance>;
    __pyodidePromise?: Promise<PyodideInstance>;
  }
}

type PyodideInstance = {
  runPythonAsync: (code: string) => Promise<unknown>;
  setStdout: (opts: { batched: (s: string) => void }) => void;
  setStderr: (opts: { batched: (s: string) => void }) => void;
  globals: { set: (k: string, v: unknown) => void };
};

const PYODIDE_VERSION = "0.26.4";
const PYODIDE_BASE = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

function loadPyodideOnce(): Promise<PyodideInstance> {
  if (typeof window === "undefined") return Promise.reject(new Error("SSR"));
  if (window.__pyodidePromise) return window.__pyodidePromise;
  window.__pyodidePromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[data-pyodide="1"]`,
    );
    const start = () => {
      if (!window.loadPyodide) return reject(new Error("loadPyodide missing"));
      window
        .loadPyodide({ indexURL: PYODIDE_BASE })
        .then(resolve)
        .catch(reject);
    };
    if (existing) {
      existing.addEventListener("load", start);
      if ((existing as HTMLScriptElement).dataset.loaded === "1") start();
    } else {
      const s = document.createElement("script");
      s.src = `${PYODIDE_BASE}pyodide.js`;
      s.async = true;
      s.dataset.pyodide = "1";
      s.onload = () => {
        s.dataset.loaded = "1";
        start();
      };
      s.onerror = () => reject(new Error("Failed to load Pyodide"));
      document.head.appendChild(s);
    }
  });
  return window.__pyodidePromise;
}

export function PyRunner({
  initialCode,
  height = 220,
  title = "Python",
}: {
  initialCode: string;
  height?: number;
  title?: string;
}) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "loading" | "running">("idle");
  const pyRef = useRef<PyodideInstance | null>(null);
  const chapterSlug = useChapterSlug();

  const run = async () => {
    setOutput("");
    if (!pyRef.current) {
      setStatus("loading");
      try {
        pyRef.current = await loadPyodideOnce();
      } catch (e) {
        setStatus("idle");
        setOutput(`⚠ Failed to load Python runtime: ${(e as Error).message}`);
        return;
      }
    }
    const py = pyRef.current!;
    let buf = "";
    py.setStdout({ batched: (s) => (buf += s + "\n") });
    py.setStderr({ batched: (s) => (buf += s + "\n") });
    setStatus("running");
    try {
      await py.runPythonAsync(code);
      setOutput(buf || "(no output)");
      if (chapterSlug) markComplete(chapterSlug);
    } catch (e) {
      setOutput(buf + "\n" + (e as Error).message);
    } finally {
      setStatus("idle");
    }
  };

  useEffect(() => setCode(initialCode), [initialCode]);

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border bg-secondary/40 px-3 py-2">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <Terminal className="h-3.5 w-3.5 text-neon" />
          <span>{title}</span>
        </div>
        <div className="flex items-center gap-1">
          <CopyButton value={() => code} />
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setCode(initialCode);
              setOutput("");
            }}
            className="h-7 px-2 text-xs"
          >
            <RotateCcw className="mr-1 h-3 w-3" /> Reset
          </Button>
          <Button
            size="sm"
            onClick={run}
            disabled={status !== "idle"}
            className="h-7 px-3 text-xs"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="mr-1 h-3 w-3 animate-spin" /> Loading Python…
              </>
            ) : status === "running" ? (
              <>
                <Loader2 className="mr-1 h-3 w-3 animate-spin" /> Running
              </>
            ) : (
              <>
                <Play className="mr-1 h-3 w-3" /> Run
              </>
            )}
          </Button>
        </div>
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        style={{ height }}
        className="w-full cursor-text resize-y bg-[var(--code-bg)] p-3 font-mono text-sm leading-relaxed text-foreground caret-foreground outline-none"
      />
      {output && (
        <pre className="max-h-64 overflow-auto border-t border-border bg-[var(--code-bg)]/70 p-3 font-mono text-xs text-foreground">
          {output}
        </pre>
      )}
    </div>
  );
}

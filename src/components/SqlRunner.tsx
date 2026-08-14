import { useEffect, useRef, useState } from "react";
import { Play, Loader2, RotateCcw, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChapterSlug } from "./ChapterLayout";
import { markComplete } from "@/lib/progress";

type SqlValue = string | number | Uint8Array | null;
type SqlJsDb = {
  exec: (sql: string) => Array<{ columns: string[]; values: SqlValue[][] }>;
  run: (sql: string) => void;
  close: () => void;
};
type SqlJsStatic = { Database: new () => SqlJsDb };

declare global {
  interface Window {
    initSqlJs?: (opts: { locateFile: (f: string) => string }) => Promise<SqlJsStatic>;
    __sqljsPromise?: Promise<SqlJsStatic>;
  }
}

const SQL_VER = "1.10.3";
const SQL_BASE = `https://cdnjs.cloudflare.com/ajax/libs/sql.js/${SQL_VER}/`;

function loadSqlJs(): Promise<SqlJsStatic> {
  if (window.__sqljsPromise) return window.__sqljsPromise;
  window.__sqljsPromise = new Promise((resolve, reject) => {
    const start = () => {
      if (!window.initSqlJs) return reject(new Error("initSqlJs missing"));
      window
        .initSqlJs({ locateFile: (f) => `${SQL_BASE}${f}` })
        .then(resolve)
        .catch(reject);
    };
    const s = document.createElement("script");
    s.src = `${SQL_BASE}sql-wasm.js`;
    s.async = true;
    s.onload = start;
    s.onerror = () => reject(new Error("Failed to load sql.js"));
    document.head.appendChild(s);
  });
  return window.__sqljsPromise;
}

export function SqlRunner({
  setupSql,
  initialQuery,
  height = 160,
  title = "SQLite",
}: {
  setupSql?: string;
  initialQuery: string;
  height?: number;
  title?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Array<{ columns: string[]; values: SqlValue[][] }>>(
    [],
  );
  const [error, setError] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "loading" | "running">("idle");
  const dbRef = useRef<SqlJsDb | null>(null);
  const chapterSlug = useChapterSlug();

  const ensureDb = async () => {
    if (dbRef.current) return dbRef.current;
    setStatus("loading");
    const SQL = await loadSqlJs();
    const db = new SQL.Database();
    if (setupSql) db.exec(setupSql);
    dbRef.current = db;
    return db;
  };

  const run = async () => {
    setError("");
    setResults([]);
    try {
      const db = await ensureDb();
      setStatus("running");
      const res = db.exec(query);
      setResults(res);
      if (res.length === 0) setError("Query OK (no rows returned).");
      if (chapterSlug) markComplete(chapterSlug);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setStatus("idle");
    }
  };

  const reset = () => {
    if (dbRef.current) {
      dbRef.current.close();
      dbRef.current = null;
    }
    setQuery(initialQuery);
    setResults([]);
    setError("");
  };

  useEffect(() => setQuery(initialQuery), [initialQuery]);

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border bg-secondary/40 px-3 py-2">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <Database className="h-3.5 w-3.5 text-neon-2" />
          <span>{title}</span>
        </div>
        <div className="flex items-center gap-1">
          <CopyButton value={() => query} label="Copy SQL" />
          <Button size="sm" variant="ghost" onClick={reset} className="h-7 px-2 text-xs">
            <RotateCcw className="mr-1 h-3 w-3" /> Reset DB
          </Button>
          <Button
            size="sm"
            onClick={run}
            disabled={status !== "idle"}
            className="h-7 px-3 text-xs"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="mr-1 h-3 w-3 animate-spin" /> Loading SQL…
              </>
            ) : status === "running" ? (
              <>
                <Loader2 className="mr-1 h-3 w-3 animate-spin" /> Running
              </>
            ) : (
              <>
                <Play className="mr-1 h-3 w-3" /> Run query
              </>
            )}
          </Button>
        </div>
      </div>
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        spellCheck={false}
        style={{ height }}
        className="w-full cursor-text resize-y bg-[var(--code-bg)] p-3 font-mono text-sm leading-relaxed text-foreground caret-foreground outline-none"
      />
      <div className="max-h-72 overflow-auto border-t border-border bg-[var(--code-bg)]/60 p-3">
        {error && <p className="font-mono text-xs text-destructive">{error}</p>}
        {results.map((r, i) => (
          <div key={i} className="mb-3 overflow-x-auto">
            <table className="w-full border-collapse font-mono text-xs">
              <thead>
                <tr className="text-neon-2">
                  {r.columns.map((c) => (
                    <th
                      key={c}
                      className="border-b border-border px-2 py-1 text-left font-semibold"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {r.values.map((row, ri) => (
                  <tr key={ri} className="hover:bg-secondary/40">
                    {row.map((v, ci) => (
                      <td key={ci} className="border-b border-border/40 px-2 py-1">
                        {v === null ? <span className="text-muted-foreground">NULL</span> : String(v)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}

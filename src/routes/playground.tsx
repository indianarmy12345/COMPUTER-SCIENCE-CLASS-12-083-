import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PyRunner } from "@/components/PyRunner";
import { SqlRunner } from "@/components/SqlRunner";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/playground")({
  head: () => ({
    meta: [
      { title: "Playground — Live Python & SQL IDE" },
      {
        name: "description",
        content:
          "Free online Python and SQLite playground for CBSE Class 12 Computer Science. Run code in your browser.",
      },
      { property: "og:title", content: "Playground — Live Python & SQL IDE" },
      {
        property: "og:description",
        content:
          "Run real Python and SQLite queries entirely in your browser — no installs, no setup.",
      },
      { property: "og:url", content: "https://cslearners.lovable.app/playground" },
    ],
    links: [{ rel: "canonical", href: "https://cslearners.lovable.app/playground" }],
  }),
  component: Playground,
});

function Playground() {
  const [tab, setTab] = useState<"py" | "sql">("py");
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8">
      <h1 className="text-3xl font-bold tracking-tight">Playground</h1>
      <p className="mt-1 text-muted-foreground">
        Real Python (via Pyodide) and SQLite (via sql.js), running 100% in your browser.
      </p>
      <div className="mt-6 flex gap-2">
        <Button
          variant={tab === "py" ? "default" : "outline"}
          onClick={() => setTab("py")}
        >
          Python
        </Button>
        <Button
          variant={tab === "sql" ? "default" : "outline"}
          onClick={() => setTab("sql")}
        >
          SQL
        </Button>
      </div>
      <div className="mt-6">
        {tab === "py" ? (
          <PyRunner
            height={320}
            initialCode={`# Try anything — full Python 3 in your browser
def factorial(n):
    return 1 if n <= 1 else n * factorial(n - 1)

for i in range(1, 8):
    print(f"{i}! = {factorial(i)}")
`}
          />
        ) : (
          <SqlRunner
            height={240}
            setupSql={`CREATE TABLE student(roll INT PRIMARY KEY, name TEXT, marks INT);
INSERT INTO student VALUES (1,'Aarav',88),(2,'Diya',76),(3,'Kabir',92),(4,'Mira',58);`}
            initialQuery={`SELECT name, marks FROM student WHERE marks > 75 ORDER BY marks DESC;`}
          />
        )}
      </div>
    </div>
  );
}

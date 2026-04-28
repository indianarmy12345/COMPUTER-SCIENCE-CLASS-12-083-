import { createFileRoute } from "@tanstack/react-router";
import { ChapterLayout, Section, Callout } from "@/components/ChapterLayout";
import { PyRunner } from "@/components/PyRunner";

export const Route = createFileRoute("/xii/file-handling")({
  head: () => ({
    meta: [
      { title: "File Handling in Python — Text, Binary & CSV (CS 083)" },
      {
        name: "description",
        content:
          "Read and write text, binary (pickle) and CSV files in Python. Includes file modes, with-statement, seek and tell.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <ChapterLayout slug="/xii/file-handling">
      <Section title="Files & file modes">
        <p>
          A <b>file</b> is data stored permanently on disk. Three flavours in CBSE:{" "}
          <b>text</b> (.txt), <b>binary</b> (.dat using <code>pickle</code>),{" "}
          <b>CSV</b> (.csv).
        </p>
        <pre className="rounded-md border border-border bg-[var(--code-bg)] p-3 font-mono text-xs">{`r   read     (file must exist)
w   write    (truncates file or creates new)
a   append   (writes at end)
r+  read+write
b   binary mode (rb, wb, ab, rb+, ...)`}</pre>
        <Callout>
          Real-world: WhatsApp stores your chat backup as a binary file; an Excel
          export is just CSV; a notepad doc is text.
        </Callout>
      </Section>

      <Section title="Text file — write, then read">
        <p>
          The Pyodide playground gives you a virtual filesystem — these files really
          exist for the lifetime of the page.
        </p>
        <PyRunner
          height={260}
          initialCode={`# write
with open("notes.txt", "w") as f:
    f.write("Hello CBSE\\n")
    f.writelines(["Line 2\\n", "Line 3\\n"])

# read whole file
with open("notes.txt", "r") as f:
    print("--- read() ---")
    print(f.read())

# read line by line
with open("notes.txt") as f:
    print("--- readlines() ---")
    for line in f.readlines():
        print(repr(line))`}
        />
      </Section>

      <Section title="seek() and tell()">
        <PyRunner
          initialCode={`with open("notes.txt", "r") as f:
    print("position:", f.tell())
    print("first 5 chars:", f.read(5))
    print("position:", f.tell())
    f.seek(0)
    print("back to start, char:", f.read(1))`}
        />
      </Section>

      <Section title="Binary file with pickle">
        <PyRunner
          height={260}
          initialCode={`import pickle

students = [
    {"roll": 1, "name": "Aarav", "marks": 88},
    {"roll": 2, "name": "Diya",  "marks": 76},
]

# write objects
with open("students.dat", "wb") as f:
    pickle.dump(students, f)

# read back
with open("students.dat", "rb") as f:
    data = pickle.load(f)

print(data)
print("First name:", data[0]["name"])`}
        />
      </Section>

      <Section title="CSV file">
        <PyRunner
          height={280}
          initialCode={`import csv

# write
with open("marks.csv", "w", newline="") as f:
    w = csv.writer(f)
    w.writerow(["roll", "name", "marks"])
    w.writerows([[1,"Aarav",88],[2,"Diya",76],[3,"Kabir",92]])

# read
with open("marks.csv", "r") as f:
    r = csv.reader(f)
    for row in r:
        print(row)`}
        />
      </Section>
    </ChapterLayout>
  );
}

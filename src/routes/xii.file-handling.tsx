import { createFileRoute } from "@tanstack/react-router";
import { ChapterLayout, Section, Callout, QuickCheck } from "@/components/ChapterLayout";
import { PyRunner } from "@/components/PyRunner";

export const Route = createFileRoute("/xii/file-handling")({
  head: () => ({
    meta: [
      { title: "File Handling in Python — Text, Binary & CSV (CS 083)" },
      {
        name: "description",
        content:
          "Detailed Python file-handling notes — text/binary/CSV files, all open modes, read/write/append, seek/tell, pickle, csv module and absolute vs relative paths.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <ChapterLayout slug="/xii/file-handling">
      <Section title="Why files?">
        <p>
          Variables live only while the program runs. To <b>persist</b> data — the
          high score in a game, a student's marks, your chat history — we save it to a
          file on disk. CBSE focuses on three flavours:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Text files (.txt)</b> — human-readable strings.</li>
          <li><b>Binary files (.dat)</b> — raw bytes of any Python object via <code>pickle</code>.</li>
          <li><b>CSV files (.csv)</b> — tabular data, "Comma-Separated Values".</li>
        </ul>
        <Callout>
          Real-world: WhatsApp stores chat backup as a binary file; an Excel export
          is just CSV; a Notepad doc is text.
        </Callout>
      </Section>

      <Section title="Absolute vs relative paths">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Absolute path</b> — full address from root: <code>C:/Users/me/data.txt</code> or <code>/home/me/data.txt</code>.</li>
          <li><b>Relative path</b> — relative to the current working directory: <code>data.txt</code>, <code>../notes/x.txt</code>.</li>
          <li>Use forward slashes (<code>/</code>) or raw strings (<code>r"C:\Users"</code>) in Windows paths to avoid escape sequences.</li>
        </ul>
      </Section>

      <Section title="File modes">
        <pre className="rounded-md border border-border bg-[var(--code-bg)] p-3 font-mono text-xs">{`r   read         (file must exist; pointer at start)
w   write        (truncates existing OR creates new)
a   append       (writes at end; creates if missing)
x   exclusive    (fails if file exists)
r+  read + write (no truncation; pointer at start)
w+  write + read (truncates first)
a+  append + read

b   binary mode flag → rb, wb, ab, rb+, wb+
t   text mode flag (default)`}</pre>
      </Section>

      <Section title="open() and the with-statement">
        <p>
          The <b>with</b> statement is a context manager that automatically calls
          <code> file.close()</code> even if an error happens. Always prefer it.
        </p>
        <PyRunner
          initialCode={`# without with — must close manually
f = open("a.txt", "w")
f.write("manual close\\n")
f.close()

# with — auto close
with open("b.txt", "w") as f:
    f.write("auto close — preferred\\n")

print("done")`}
        />
      </Section>

      <Section title="Text file — write, then read">
        <p>
          The Pyodide playground gives you a virtual filesystem — these files really
          exist for the lifetime of the page.
        </p>
        <PyRunner
          height={320}
          initialCode={`# write — w mode TRUNCATES first
with open("notes.txt", "w") as f:
    f.write("Hello CBSE\\n")
    f.writelines(["Line 2\\n", "Line 3\\n"])

# append — does NOT truncate
with open("notes.txt", "a") as f:
    f.write("Appended line\\n")

# read whole file
with open("notes.txt", "r") as f:
    print("--- read() ---")
    print(f.read())

# read first 6 chars
with open("notes.txt") as f:
    print("--- read(6) ---", repr(f.read(6)))

# readline / readlines
with open("notes.txt") as f:
    print("--- readline() ---", repr(f.readline()))
    print("--- readlines() ---", f.readlines())

# preferred: iterate over file object directly
with open("notes.txt") as f:
    for i, line in enumerate(f, start=1):
        print(i, line.rstrip())`}
        />
      </Section>

      <Section title="seek() and tell() — random access">
        <p>
          The <b>file pointer</b> is the position where the next read/write happens.
          <code> tell()</code> returns the current byte offset; <code>seek(off, whence)</code>
          moves it (<code>whence</code>: 0=start, 1=current, 2=end).
        </p>
        <PyRunner
          initialCode={`with open("notes.txt", "r") as f:
    print("position:", f.tell())
    print("first 5 chars:", f.read(5))
    print("position:", f.tell())
    f.seek(0)
    print("back to start, first char:", f.read(1))
    f.seek(0, 2)            # jump to end
    print("end position (size):", f.tell())`}
        />
      </Section>

      <Section title="Counting words / lines / characters">
        <PyRunner
          initialCode={`with open("notes.txt") as f:
    text = f.read()

print("characters:", len(text))
print("words:", len(text.split()))
print("lines:", text.count("\\n"))
print("vowels:", sum(ch.lower() in "aeiou" for ch in text))`}
        />
      </Section>

      <Section title="Binary file with pickle">
        <p>
          The <b>pickle</b> module serialises any Python object (list, dict, custom
          class) to bytes and back. Always open binary files with <code>'b'</code>.
        </p>
        <PyRunner
          height={340}
          initialCode={`import pickle

students = [
    {"roll": 1, "name": "Aarav", "marks": 88},
    {"roll": 2, "name": "Diya",  "marks": 76},
    {"roll": 3, "name": "Kabir", "marks": 92},
]

# write
with open("students.dat", "wb") as f:
    pickle.dump(students, f)

# read back
with open("students.dat", "rb") as f:
    data = pickle.load(f)

print(data)
print("First name:", data[0]["name"])

# search
roll_to_find = 2
with open("students.dat", "rb") as f:
    rows = pickle.load(f)
    for r in rows:
        if r["roll"] == roll_to_find:
            print("Found:", r); break

# update marks for roll 1, rewrite file
with open("students.dat", "rb") as f:
    rows = pickle.load(f)
for r in rows:
    if r["roll"] == 1:
        r["marks"] += 5
with open("students.dat", "wb") as f:
    pickle.dump(rows, f)
print("After update:", rows)`}
        />
      </Section>

      <Section title="CSV file — reader & writer">
        <PyRunner
          height={320}
          initialCode={`import csv

# write rows
with open("marks.csv", "w", newline="") as f:
    w = csv.writer(f)
    w.writerow(["roll", "name", "marks"])
    w.writerows([[1,"Aarav",88],[2,"Diya",76],[3,"Kabir",92]])

# read all rows
with open("marks.csv", "r") as f:
    r = csv.reader(f)
    for row in r:
        print(row)

# DictReader / DictWriter — using header row
with open("marks.csv") as f:
    for row in csv.DictReader(f):
        print(row["name"], "→", row["marks"])

# append a new row
with open("marks.csv", "a", newline="") as f:
    w = csv.writer(f)
    w.writerow([4,"Mira",81])

# custom delimiter (TSV-like)
with open("marks.tsv", "w", newline="") as f:
    w = csv.writer(f, delimiter="\\t")
    w.writerow(["a","b","c"])
print("--- marks.csv now ---")
print(open("marks.csv").read())`}
        />
      </Section>

      <Section title="Combined example — student record system">
        <PyRunner
          height={360}
          initialCode={`import csv

def add_student(file, row):
    with open(file, "a", newline="") as f:
        csv.writer(f).writerow(row)

def show_all(file):
    with open(file) as f:
        for row in csv.reader(f):
            print(row)

def topper(file):
    best = None
    with open(file) as f:
        next(f)   # skip header
        for row in csv.reader(f):
            score = int(row[2])
            if best is None or score > int(best[2]):
                best = row
    return best

# fresh file
with open("school.csv", "w", newline="") as f:
    csv.writer(f).writerow(["roll","name","marks"])

for r in [[1,"Aarav",88],[2,"Diya",76],[3,"Kabir",92],[4,"Mira",81]]:
    add_student("school.csv", r)

print("All students:"); show_all("school.csv")
print("Topper:", topper("school.csv"))`}
        />
      </Section>

      <Section title="Practice">
        <QuickCheck
          question="Which mode truncates the file before writing?"
          options={["r", "a", "w", "r+"]}
          answer="w"
        />
        <QuickCheck
          question="Which module serialises Python objects into binary form?"
          options={["csv", "pickle", "marshal", "json"]}
          answer="pickle"
        />
        <QuickCheck
          question="What does f.tell() return?"
          options={["the file size", "the line number", "current position of file pointer in bytes", "the file mode"]}
          answer="current position of file pointer in bytes"
        />
      </Section>
    </ChapterLayout>
  );
}

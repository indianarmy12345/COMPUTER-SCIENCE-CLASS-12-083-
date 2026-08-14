import { createFileRoute } from "@tanstack/react-router";
import { ChapterLayout, Section, Callout, QuickCheck, PYQ, MostAsked } from "@/components/ChapterLayout";
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
    
        <Section title="Deeper theory: file pointer, buffering & modes">
          <p>
            Every open file maintains a <strong>file pointer</strong> — the byte
            position where the next read or write happens. <code>tell()</code>
            returns it; <code>seek(offset, whence)</code> moves it (whence: 0=start,
            1=current, 2=end — only allowed in binary mode).
          </p>
          <ul className="ml-5 list-disc space-y-1 text-sm">
            <li><strong>Text mode</strong> (default) decodes bytes using a platform encoding and translates line endings; <strong>binary mode</strong> (<code>'b'</code>) reads raw bytes.</li>
            <li><strong>Modes:</strong> <code>'r'</code> read, <code>'w'</code> write (truncates!), <code>'a'</code> append, <code>'x'</code> exclusive create, <code>'+'</code> read+write, <code>'b'</code> binary, <code>'t'</code> text.</li>
            <li><strong>readline()</strong> returns one line including <code>\n</code>; <strong>readlines()</strong> returns a list of all lines; <strong>read(n)</strong> reads n characters/bytes.</li>
            <li><strong>Pickle</strong> serialises Python objects (lists, dicts, custom classes) to bytes; only unpickle data you trust.</li>
            <li><strong>CSV</strong>: use <code>newline=""</code> when opening to prevent extra blank rows on Windows.</li>
          </ul>
          <p className="text-sm">
            Always close files — prefer the <code>with open(...) as f:</code>
            context manager so files close automatically even if an exception is raised.
          </p>
        </Section>

        <Section title="Previous Year Questions (PYQs)">
          <PYQ year="CBSE 2023" marks={3}
            question={<>Write a function <code>countVowels()</code> that reads <code>story.txt</code> and returns the number of vowels.</>}
            answer={<pre className="overflow-x-auto rounded bg-[var(--code-bg)] p-2 text-xs">{`def countVowels():
    n = 0
    with open("story.txt", "r") as f:
        for ch in f.read().lower():
            if ch in "aeiou":
                n += 1
    return n`}</pre>}
          />
          <PYQ year="CBSE 2022" marks={2}
            question={<>Differentiate between <code>'w'</code> and <code>'a'</code> modes.</>}
            answer={<>
              <p><code>'w'</code> opens the file for writing and <strong>truncates</strong> it to zero length (existing data is lost). If the file doesn't exist, it is created.</p>
              <p><code>'a'</code> opens the file for <strong>appending</strong>: writes are added at the end, existing data is preserved. If the file doesn't exist, it is created.</p>
            </>}
          />
          <PYQ year="CBSE 2024" marks={3}
            question={<>Write a function to read a binary file <code>emp.dat</code> containing a list of dictionaries (employee records) and display only those with salary &gt; 50000.</>}
            answer={<pre className="overflow-x-auto rounded bg-[var(--code-bg)] p-2 text-xs">{`import pickle
def show_high_paid():
    with open("emp.dat", "rb") as f:
        records = pickle.load(f)
    for r in records:
        if r["salary"] > 50000:
            print(r)`}</pre>}
          />
        </Section>

        <Section title="More MCQs">
          <QuickCheck question="Which method returns current file pointer position?"
            options={["seek()", "tell()", "pos()", "where()"]} answer="tell()" />
          <QuickCheck question="Which module is used to handle CSV files?"
            options={["csv", "json", "pickle", "io"]} answer="csv" />
          <QuickCheck question="Default mode of open() if no mode is specified?"
            options={["'w'", "'r'", "'rb'", "'a'"]} answer="'r'" />
          <QuickCheck question="Which method writes a list of strings to a file?"
            options={["write()", "writelines()", "writeall()", "putlines()"]} answer="writelines()" />
        </Section>
        <Section title="Most repeated board questions">
          <MostAsked
            items={[
              {
                q: "Differentiate between text files and binary files. Give one example of each.",
                marks: 2,
                asked: "2019, 2021, 2024",
                a: "A text file stores data as human-readable characters with an EOL character after each line (e.g. notes.txt); a binary file stores data in machine format exactly as in memory with no EOL translation (e.g. student.dat created with pickle). Text files need encoding/decoding, binary files do not.",
              },
              {
                q: "Write a function COUNTLINES() to count and display the number of lines in a text file 'story.txt' that begin with the letter 'A'.",
                marks: 3,
                asked: "2020, 2022, 2023",
                a: "def COUNTLINES():\n    f = open('story.txt', 'r')\n    c = 0\n    for line in f:\n        if line.startswith('A'):\n            c += 1\n    f.close()\n    print('Lines starting with A =', c)",
              },
              {
                q: "Write a function to count the number of words in a text file 'notes.txt' that have exactly four characters.",
                marks: 3,
                asked: "2019, 2023, 2024 SQP",
                a: "def count4():\n    f = open('notes.txt', 'r')\n    data = f.read().split()\n    c = 0\n    for w in data:\n        if len(w) == 4:\n            c += 1\n    f.close()\n    print('4-letter words =', c)",
              },
              {
                q: "A binary file 'emp.dat' has records as [empno, name, salary]. Write a function to display employees earning more than 50000.",
                marks: 4,
                asked: "2020, 2022, 2024",
                a: "import pickle\n\ndef high_paid():\n    f = open('emp.dat', 'rb')\n    try:\n        while True:\n            rec = pickle.load(f)\n            if rec[2] > 50000:\n                print(rec)\n    except EOFError:\n        pass\n    f.close()",
              },
              {
                q: "Write a program to read a CSV file 'student.csv' and display only those rows where marks > 75.",
                marks: 4,
                asked: "2021, 2023, 2024 SQP",
                a: "import csv\n\nwith open('student.csv', 'r', newline='') as f:\n    r = csv.reader(f)\n    next(r)              # skip header\n    for row in r:\n        if int(row[2]) > 75:\n            print(row)",
              },
              {
                q: "What is the use of seek() and tell()? Explain with syntax.",
                marks: 2,
                asked: "2019, 2022",
                a: "tell() returns the current position (in bytes) of the file pointer. seek(offset, from_what) moves the file pointer; from_what is 0 (beginning, default), 1 (current) or 2 (end).\n\nf.seek(0)      # go to start\nprint(f.tell())",
              },
            ]}
          />
        </Section>

      </ChapterLayout>
  );
}

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


      <Section title="File types — comparison table">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="p-2 text-left">Feature</th>
              <th className="p-2 text-left">Text file</th>
              <th className="p-2 text-left">Binary file</th>
              <th className="p-2 text-left">CSV file</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border"><td className="p-2">Storage form</td><td className="p-2">Human-readable characters</td><td className="p-2">Raw bytes / machine format</td><td className="p-2">Text with comma-separated fields</td></tr>
            <tr className="border-b border-border"><td className="p-2">EOL handling</td><td className="p-2">Translates <code>\n</code> per platform</td><td className="p-2">No translation</td><td className="p-2">One record per line</td></tr>
            <tr className="border-b border-border"><td className="p-2">Module needed</td><td className="p-2">None (built-in open)</td><td className="p-2"><code>pickle</code> / <code>struct</code></td><td className="p-2"><code>csv</code></td></tr>
            <tr className="border-b border-border"><td className="p-2">Typical extension</td><td className="p-2">.txt</td><td className="p-2">.dat</td><td className="p-2">.csv</td></tr>
            <tr><td className="p-2">Example content</td><td className="p-2">Hello World</td><td className="p-2">pickled dict/list bytes</td><td className="p-2">1,Aarav,88</td></tr>
          </tbody>
        </table>
        <Callout>
          CBSE loves this exact table as a 2-mark "differentiate" question — memorise
          at least 3 differences with one example each.
        </Callout>
      </Section>

      <Section title="Complete table of open() modes">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="p-2 text-left">Mode</th>
              <th className="p-2 text-left">Meaning</th>
              <th className="p-2 text-left">File must exist?</th>
              <th className="p-2 text-left">Truncates?</th>
              <th className="p-2 text-left">Pointer at</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["r", "read only (text)", "Yes (else FileNotFoundError)", "No", "start"],
              ["r+", "read + write (text)", "Yes", "No", "start"],
              ["w", "write only (text)", "No (creates)", "Yes", "start"],
              ["w+", "write + read (text)", "No (creates)", "Yes", "start"],
              ["a", "append only (text)", "No (creates)", "No", "end"],
              ["a+", "append + read (text)", "No (creates)", "No", "end (read needs seek)"],
              ["x", "exclusive create", "No (errors if exists)", "N/A", "start"],
              ["rb", "read only (binary)", "Yes", "No", "start"],
              ["wb", "write only (binary)", "No (creates)", "Yes", "start"],
              ["ab", "append only (binary)", "No (creates)", "No", "end"],
              ["rb+", "read + write (binary)", "Yes", "No", "start"],
              ["wb+", "write + read (binary)", "No (creates)", "Yes", "start"],
              ["ab+", "append + read (binary)", "No (creates)", "No", "end"],
            ].map((row) => (
              <tr key={row[0]} className="border-b border-border">
                {row.map((cell, i) => (
                  <td key={i} className={i === 0 ? "p-2 font-mono font-semibold" : "p-2"}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section title="read() / readline() / readlines() / write() / writelines() — exact behaviour">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li><code>f.read()</code> — reads and returns the <b>entire remaining content</b> as one string.</li>
          <li><code>f.read(n)</code> — reads at most <b>n characters</b> (text mode) or <b>n bytes</b> (binary mode); returns <code>""</code> at EOF.</li>
          <li><code>f.readline()</code> — reads <b>one line</b> including the trailing <code>\n</code>; returns <code>""</code> (empty string) at EOF.</li>
          <li><code>f.readline(n)</code> — reads at most n characters of the current line.</li>
          <li><code>f.readlines()</code> — returns a <b>list of all lines</b>, each ending with <code>\n</code> (except possibly the last).</li>
          <li><code>f.write(s)</code> — writes string <code>s</code>; returns the <b>number of characters written</b>; does NOT add <code>\n</code> automatically.</li>
          <li><code>f.writelines(seq)</code> — writes a sequence (list/tuple) of strings <b>one after another with no separators added</b> — you must include <code>\n</code> yourself.</li>
          <li>Iterating <code>for line in f:</code> is the most memory-efficient and Pythonic way to read a file line by line (used internally by readline lazily).</li>
        </ul>
        <PyRunner
          height={300}
          initialCode={`with open("demo.txt", "w") as f:
    n = f.write("Line1\\n")
    print("chars written:", n)
    f.writelines(["Line2\\n", "Line3\\n"])

with open("demo.txt") as f:
    print(repr(f.readline()))   # 'Line1\\n'
    print(repr(f.readline()))   # 'Line2\\n'

with open("demo.txt") as f:
    print(f.readlines())        # ['Line1\\n', 'Line2\\n', 'Line3\\n']

with open("demo.txt") as f:
    at_end = f.read()
    print(repr(f.readline()))   # '' -> EOF reached`}
        />
      </Section>

      <Section title="flush(), close() and why with is preferred">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li><code>f.flush()</code> — forces buffered data to be written to disk immediately without closing the file.</li>
          <li><code>f.close()</code> — flushes and releases the OS file handle. Forgetting this can lose data or lock the file.</li>
          <li><code>with open(...) as f:</code> guarantees <code>close()</code> is called automatically, even if an exception occurs inside the block — this is why CBSE marking schemes now accept/prefer it.</li>
        </ul>
      </Section>

      <Section title="seek() and tell() — all whence values, worked example">
        <p>
          <code>f.seek(offset, whence)</code>: <code>whence=0</code> (default) — offset from
          start; <code>whence=1</code> — offset from current position (binary mode only in
          Python 3 text files); <code>whence=2</code> — offset from end (binary mode only,
          offset should be ≤ 0).
        </p>
        <PyRunner
          height={300}
          initialCode={`with open("seek.dat", "wb") as f:
    f.write(b"ABCDEFGHIJ")

with open("seek.dat", "rb") as f:
    print(f.tell())          # 0
    f.seek(3)                 # whence=0 default -> absolute pos 3
    print(f.read(1))          # b'D'
    f.seek(2, 1)               # from current: 4+2=6
    print(f.read(1))          # b'G'
    f.seek(-2, 2)              # 2 bytes before end
    print(f.read())            # b'IJ'
    f.seek(0, 2)
    print("size =", f.tell())`}
        />
      </Section>

      <Section title="Pickle: search, update and delete a binary record">
        <PyRunner
          height={380}
          initialCode={`import pickle, os

def create():
    emps = [
        {"eno": 1, "name": "Ravi", "sal": 45000},
        {"eno": 2, "name": "Sonia", "sal": 60000},
        {"eno": 3, "name": "Aman", "sal": 52000},
    ]
    with open("emp.dat", "wb") as f:
        pickle.dump(emps, f)

def search(eno):
    with open("emp.dat", "rb") as f:
        emps = pickle.load(f)
    for e in emps:
        if e["eno"] == eno:
            return e
    return None

def update(eno, new_sal):
    with open("emp.dat", "rb") as f:
        emps = pickle.load(f)
    for e in emps:
        if e["eno"] == eno:
            e["sal"] = new_sal
    with open("emp.dat", "wb") as f:
        pickle.dump(emps, f)

def delete(eno):
    with open("emp.dat", "rb") as f:
        emps = pickle.load(f)
    emps = [e for e in emps if e["eno"] != eno]
    with open("emp.dat", "wb") as f:
        pickle.dump(emps, f)

create()
print("search(2):", search(2))
update(2, 65000)
print("after update:", search(2))
delete(1)
with open("emp.dat", "rb") as f:
    print("after delete:", pickle.load(f))`}
        />
      </Section>

      <Section title="Records appended one-by-one (dump in a loop, load with EOFError)">
        <p>
          A common CBSE pattern: instead of dumping one big list, records are dumped
          <b> one at a time</b> so reading must loop until <code>EOFError</code>.
        </p>
        <PyRunner
          height={320}
          initialCode={`import pickle

def add(eno, name, sal):
    with open("emp2.dat", "ab") as f:
        pickle.dump({"eno": eno, "name": name, "sal": sal}, f)

def show_all():
    with open("emp2.dat", "rb") as f:
        while True:
            try:
                rec = pickle.load(f)
                print(rec)
            except EOFError:
                break

def high_paid(limit):
    with open("emp2.dat", "rb") as f:
        try:
            while True:
                rec = pickle.load(f)
                if rec["sal"] > limit:
                    print(rec)
        except EOFError:
            pass

add(1, "Ravi", 45000)
add(2, "Sonia", 60000)
add(3, "Aman", 52000)
print("--- all ---"); show_all()
print("--- > 50000 ---"); high_paid(50000)`}
        />
      </Section>

      <Section title="CSV: DictReader / DictWriter and delimiter">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li><code>csv.reader(f)</code> — returns rows as <b>lists</b> of strings.</li>
          <li><code>csv.writer(f)</code> — <code>writerow(list)</code> writes one row; <code>writerows(list_of_lists)</code> writes many.</li>
          <li><code>csv.DictReader(f)</code> — treats the first row as field names and returns each row as an <b>OrderedDict/dict</b>.</li>
          <li><code>csv.DictWriter(f, fieldnames=[...])</code> — needs <code>writeheader()</code> then <code>writerow(dict)</code>.</li>
          <li><code>newline=""</code> in <code>open()</code> prevents the csv module from adding an extra blank line after every row on Windows (the OS's own <code>\r\n</code> translation otherwise clashes with csv's own line terminator).</li>
          <li><code>delimiter=</code> parameter changes the separator, e.g. <code>delimiter='\t'</code> for tab-separated values.</li>
        </ul>
        <PyRunner
          height={320}
          initialCode={`import csv

fieldnames = ["roll", "name", "marks"]
with open("dict.csv", "w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=fieldnames)
    w.writeheader()
    w.writerow({"roll": 1, "name": "Aarav", "marks": 88})
    w.writerow({"roll": 2, "name": "Diya", "marks": 76})

with open("dict.csv") as f:
    for row in csv.DictReader(f):
        print(row["roll"], row["name"], row["marks"])`}
        />
      </Section>

      <Section title="Model program: count lines starting with a given letter/word">
        <PyRunner
          height={300}
          initialCode={`def count_starting_with(filename, prefix):
    count = 0
    with open(filename) as f:
        for line in f:
            if line.strip().startswith(prefix):
                count += 1
    return count

with open("story.txt", "w") as f:
    f.writelines(["Apples are red\\n", "The sky is blue\\n", "Ants work hard\\n", "Birds fly\\n"])

print("Lines starting with 'A':", count_starting_with("story.txt", "A"))
print("Lines starting with 'The':", count_starting_with("story.txt", "The"))`}
        />
      </Section>

      <Section title="Model program: copy lines containing a word into another file">
        <PyRunner
          height={280}
          initialCode={`def copy_lines_with(word, src, dst):
    with open(src) as fin, open(dst, "w") as fout:
        for line in fin:
            if word in line:
                fout.write(line)

copy_lines_with("blue", "story.txt", "filtered.txt")
print(open("filtered.txt").read())`}
        />
      </Section>

      <Section title="Model program: vowels, consonants, uppercase, digits count">
        <PyRunner
          height={300}
          initialCode={`def analyse(filename):
    vowels = consonants = upper = digits = 0
    with open(filename) as f:
        text = f.read()
    for ch in text:
        if ch.isalpha():
            if ch.lower() in "aeiou":
                vowels += 1
            else:
                consonants += 1
            if ch.isupper():
                upper += 1
        elif ch.isdigit():
            digits += 1
    return vowels, consonants, upper, digits

with open("mix.txt", "w") as f:
    f.write("Class XII Section A has 40 Students in 2024\\n")

v, c, u, d = analyse("mix.txt")
print("vowels:", v, "consonants:", c, "UPPERCASE:", u, "digits:", d)`}
        />
      </Section>

      <Section title="Output-prediction practice">
        <div className="space-y-4 text-sm">
          {[
            {
              code: `f = open("t1.txt", "w")\nf.write("Hello")\nf.write("World")\nf.close()\nprint(open("t1.txt").read())`,
              out: "HelloWorld  (write() does not add spaces/newlines automatically)",
            },
            {
              code: `f = open("t2.txt", "w")\nf.writelines(["a", "b", "c"])\nf.close()\nprint(open("t2.txt").read())`,
              out: "abc",
            },
            {
              code: `with open("t3.txt", "w") as f:\n    f.write("one\\ntwo\\nthree\\n")\nwith open("t3.txt") as f:\n    print(len(f.readlines()))`,
              out: "3",
            },
            {
              code: `with open("t4.txt", "w") as f:\n    f.write("abc")\nwith open("t4.txt") as f:\n    print(f.read(2))\n    print(f.tell())`,
              out: "ab\n2",
            },
            {
              code: `with open("t5.dat", "wb") as f:\n    f.write(b"12345")\nwith open("t5.dat", "rb") as f:\n    f.seek(-2, 2)\n    print(f.read())`,
              out: "b'45'",
            },
            {
              code: `with open("t6.txt") as f:\n    print(f.readline())   # file does not exist`,
              out: "FileNotFoundError raised",
            },
            {
              code: `with open("t7.txt", "w") as f:\n    pass\nwith open("t7.txt", "r+") as f:\n    print(repr(f.read()))`,
              out: "'' (r+ does not truncate, file was already empty)",
            },
            {
              code: `import pickle\nwith open("t8.dat", "wb") as f:\n    pickle.dump(10, f)\n    pickle.dump(20, f)\nwith open("t8.dat", "rb") as f:\n    print(pickle.load(f) + pickle.load(f))`,
              out: "30",
            },
          ].map((item, i) => (
            <div key={i} className="rounded border border-border p-2">
              <pre className="overflow-x-auto rounded bg-[var(--code-bg)] p-2 text-xs">{item.code}</pre>
              <p className="mt-1"><b>Output:</b> {item.out}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Find the error">
        <div className="space-y-4 text-sm">
          {[
            {
              code: `f = open("a.txt" "r")   # missing comma\nprint(f.read())`,
              fix: "SyntaxError-like bug — missing comma between arguments: open(\"a.txt\", \"r\")",
            },
            {
              code: `f = open("a.txt", "r")\nf.write("hi")   # writing in read mode`,
              fix: "io.UnsupportedOperation: not writable — file opened in 'r' mode; use 'w'/'a'/'r+'.",
            },
            {
              code: `import pickle\nwith open("d.dat", "w") as f:   # should be 'wb'\n    pickle.dump([1,2,3], f)`,
              fix: "TypeError — pickle needs a binary file; open with 'wb' not 'w'.",
            },
            {
              code: `with open("x.csv", "w") as f:   # missing newline=\"\"\n    import csv\n    csv.writer(f).writerow([1,2,3])`,
              fix: "Extra blank lines appear between rows on Windows — open with newline=\"\".",
            },
            {
              code: `f = open("m.txt", "r")\ndata = f.readlines()\nprint(data[10])   # index may not exist`,
              fix: "IndexError if the file has fewer than 11 lines — check len(data) first.",
            },
          ].map((item, i) => (
            <div key={i} className="rounded border border-border p-2">
              <pre className="overflow-x-auto rounded bg-[var(--code-bg)] p-2 text-xs">{item.code}</pre>
              <p className="mt-1"><b>Issue/Fix:</b> {item.fix}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="More practice MCQs">
        <QuickCheck question="Which mode opens a text file for both reading and writing without truncating it?"
          options={["w+", "r+", "a", "x"]} answer="r+" />
        <QuickCheck question="What does whence=2 mean in seek(offset, whence)?"
          options={["from start of file", "from current position", "from end of file", "invalid value"]} answer="from end of file" />
        <QuickCheck question="Which function raises EOFError when the file has no more pickled objects?"
          options={["pickle.load()", "pickle.dump()", "pickle.read()", "pickle.loads()"]} answer="pickle.load()" />
        <QuickCheck question="csv.DictReader returns each row as a:"
          options={["list", "tuple", "dict-like object", "string"]} answer="dict-like object" />
        <QuickCheck question='Why is newline="" used while opening a CSV file for writing?'
          options={["to skip the header", "to prevent extra blank rows on Windows", "to make it binary", "it is required by Python syntax"]} answer="to prevent extra blank rows on Windows" />
        <QuickCheck question="What is returned by f.readline() at end of file?"
          options={["None", "raises EOFError", "empty string ''", "-1"]} answer="empty string ''" />
        <QuickCheck question="Which of these creates a file only if it does not already exist, else raises an error?"
          options={["'w'", "'a'", "'x'", "'r+'"]} answer="'x'" />
        <QuickCheck question="What does f.write() return?"
          options={["nothing (None)", "True/False", "number of characters written", "the file object"]} answer="number of characters written" />
        <QuickCheck question="Which is the correct way to write multiple lines at once?"
          options={["f.write([lines])", "f.writelines([lines])", "f.writeall([lines])", "f.putlines([lines])"]} answer="f.writelines([lines])" />
        <QuickCheck question="In binary mode, seek(-5, 2) moves the pointer to:"
          options={["5 bytes after start", "5 bytes before end of file", "5 bytes from current position", "invalid, error"]} answer="5 bytes before end of file" />
        <QuickCheck question="Which csv class needs writeheader() before writing rows?"
          options={["csv.writer", "csv.reader", "csv.DictWriter", "csv.DictReader"]} answer="csv.DictWriter" />
        <QuickCheck question="Opening a binary file in 'w' mode instead of 'wb' with pickle.dump() will cause:"
          options={["no error", "TypeError", "the file becomes text automatically", "data loss silently"]} answer="TypeError" />
        <QuickCheck question="Which statement about with...open is TRUE?"
          options={["it never closes the file", "it closes the file automatically even on exception", "it opens the file in binary mode only", "it works only for CSV files"]} answer="it closes the file automatically even on exception" />
        <QuickCheck question="f.tell() in binary mode after reading 10 bytes from start returns:"
          options={["0", "10", "-10", "None"]} answer="10" />
      </Section>

      <Section title="More Previous Year Questions (PYQs)">
        <PYQ year="CBSE 2018" marks={2}
          question={<>What is the significance of <code>seek()</code> function? Explain with an example.</>}
          answer={<p><code>seek(offset, whence)</code> repositions the file pointer to a specific byte position so that the next read/write happens from there, e.g. <code>f.seek(0)</code> takes the pointer back to the beginning of the file to re-read it.</p>}
        />
        <PYQ year="CBSE 2019" marks={3}
          question={<>Write a function to count the number of lines in a text file that do not start with an alphabet.</>}
          answer={<pre className="overflow-x-auto rounded bg-[var(--code-bg)] p-2 text-xs">{`def countLines():
    c = 0
    with open("file.txt") as f:
        for line in f:
            if line and not line[0].isalpha():
                c += 1
    print("Lines not starting with alphabet:", c)`}</pre>}
        />
        <PYQ year="CBSE 2020" marks={4}
          question={<>A binary file "STOCK.dat" has structure [ItemNo, ItemName, Price]. Write a Python function to update the price of an item given its ItemNo.</>}
          answer={<pre className="overflow-x-auto rounded bg-[var(--code-bg)] p-2 text-xs">{`import pickle
def update_price(itemno, new_price):
    with open("STOCK.dat", "rb") as f:
        items = pickle.load(f)
    for it in items:
        if it[0] == itemno:
            it[2] = new_price
    with open("STOCK.dat", "wb") as f:
        pickle.dump(items, f)`}</pre>}
        />
        <PYQ year="CBSE 2021" marks={2}
          question={<>Differentiate between <code>readline()</code> and <code>readlines()</code>.</>}
          answer={<p><code>readline()</code> reads and returns a single line (including <code>\n</code>) as a string; <code>readlines()</code> reads all remaining lines and returns them as a list of strings.</p>}
        />
        <PYQ year="CBSE 2022 (Compt.)" marks={3}
          question={<>Write a function to count the number of words present in a text file "para.txt".</>}
          answer={<pre className="overflow-x-auto rounded bg-[var(--code-bg)] p-2 text-xs">{`def countWords():
    with open("para.txt") as f:
        words = f.read().split()
    print("Total words:", len(words))`}</pre>}
        />
        <PYQ year="CBSE 2023 SQP" marks={4}
          question={<>Write a program using csv module to read "STUDENT.csv" and display records of students having marks greater than 90.</>}
          answer={<pre className="overflow-x-auto rounded bg-[var(--code-bg)] p-2 text-xs">{`import csv
with open("STUDENT.csv", newline="") as f:
    reader = csv.reader(f)
    next(reader)
    for row in reader:
        if int(row[2]) > 90:
            print(row)`}</pre>}
        />
        <PYQ year="CBSE 2024" marks={2}
          question={<>What will be the output of the following code? <code>{'{'}f = open("t.txt","w"); f.write("abc"); print(f.tell()){'}'}</code></>}
          answer={<p>Output: <code>3</code> — write() moved the pointer forward by the 3 characters written, and tell() reports the current byte position.</p>}
        />
        <PYQ year="CBSE 2025 SQP" marks={3}
          question={<>Write a function to count how many times the word "the" (case-insensitive) occurs in a text file "essay.txt".</>}
          answer={<pre className="overflow-x-auto rounded bg-[var(--code-bg)] p-2 text-xs">{`def countThe():
    count = 0
    with open("essay.txt") as f:
        for word in f.read().split():
            if word.strip('.,!?').lower() == "the":
                count += 1
    print("'the' occurs", count, "times")`}</pre>}
        />
      </Section>

      <Section title="More model answers (MostAsked)">
        <MostAsked
          items={[
            {
              q: "Write a program to count the total number of lines in a text file 'data.txt'.",
              marks: 2,
              asked: "2018, 2020, 2022",
              a: "with open('data.txt') as f:\n    lines = f.readlines()\nprint('Total lines:', len(lines))",
            },
            {
              q: "Write a function to display only those lines of a text file that start with an uppercase alphabet.",
              marks: 3,
              asked: "2019, 2021",
              a: "def showUpperLines():\n    with open('data.txt') as f:\n        for line in f:\n            if line and line[0].isupper():\n                print(line, end='')",
            },
            {
              q: "Write a function to copy all lines containing the word 'Python' from 'source.txt' to 'target.txt'.",
              marks: 3,
              asked: "2020, 2023",
              a: "def copyPython():\n    with open('source.txt') as fin, open('target.txt', 'w') as fout:\n        for line in fin:\n            if 'Python' in line:\n                fout.write(line)",
            },
            {
              q: "Write a program to create a binary file 'book.dat' storing records as dictionaries {bno, title, price}, then search for a book by bno.",
              marks: 4,
              asked: "2019, 2022, 2024",
              a: "import pickle\n\ndef create():\n    books = [{'bno':1,'title':'Python','price':350},{'bno':2,'title':'DBMS','price':420}]\n    with open('book.dat','wb') as f:\n        pickle.dump(books, f)\n\ndef search(bno):\n    with open('book.dat','rb') as f:\n        books = pickle.load(f)\n    for b in books:\n        if b['bno']==bno:\n            return b\n    return None\n\ncreate()\nprint(search(2))",
            },
            {
              q: "Write a function to delete a record with a given roll number from a binary file 'student.dat'.",
              marks: 3,
              asked: "2021, 2023",
              a: "import pickle\n\ndef delete(roll):\n    with open('student.dat','rb') as f:\n        recs = pickle.load(f)\n    recs = [r for r in recs if r['roll'] != roll]\n    with open('student.dat','wb') as f:\n        pickle.dump(recs, f)",
            },
            {
              q: "Write a program using the csv module to add a new student record to 'student.csv' and then display all records.",
              marks: 4,
              asked: "2020, 2022, 2024 SQP",
              a: "import csv\n\ndef add(row):\n    with open('student.csv', 'a', newline='') as f:\n        csv.writer(f).writerow(row)\n\ndef display():\n    with open('student.csv') as f:\n        for row in csv.reader(f):\n            print(row)\n\nadd([5, 'Neha', 89])\ndisplay()",
            },
            {
              q: "Differentiate between csv.writer and csv.DictWriter with an example each.",
              marks: 2,
              asked: "2023, 2025 SQP",
              a: "csv.writer writes rows as plain lists using writerow()/writerows(), e.g. csv.writer(f).writerow([1,'A',90]). csv.DictWriter writes rows from dictionaries and requires fieldnames plus writeheader(), e.g. csv.DictWriter(f, fieldnames=['roll','name']).writerow({'roll':1,'name':'A'}).",
            },
            {
              q: "Write a function to count the number of uppercase and lowercase letters in a text file 'text.txt'.",
              marks: 3,
              asked: "2018, 2021, 2024",
              a: "def countCase():\n    upper = lower = 0\n    with open('text.txt') as f:\n        for ch in f.read():\n            if ch.isupper():\n                upper += 1\n            elif ch.islower():\n                lower += 1\n    print('Uppercase:', upper, 'Lowercase:', lower)",
            },
          ]}
        />
      </Section>

      <Section title="More runnable examples">
        <PyRunner
          height={260}
          initialCode={`# example: count total number of lines
with open("lines.txt", "w") as f:
    f.writelines(["one\\n", "two\\n", "three\\n"])
with open("lines.txt") as f:
    print("Total lines:", len(f.readlines()))`}
        />
        <PyRunner
          height={260}
          initialCode={`# example: display lines starting with uppercase
with open("caps.txt", "w") as f:
    f.writelines(["Apple\\n", "banana\\n", "Cherry\\n"])
with open("caps.txt") as f:
    for line in f:
        if line and line[0].isupper():
            print(line, end="")`}
        />
        <PyRunner
          height={260}
          initialCode={`# example: word count with split()
with open("wc.txt", "w") as f:
    f.write("the quick brown fox jumps over the lazy dog")
with open("wc.txt") as f:
    words = f.read().split()
print("Word count:", len(words))`}
        />
        <PyRunner
          height={300}
          initialCode={`# example: delete a pickled record by key
import pickle
recs = [{"id":1,"n":"A"}, {"id":2,"n":"B"}, {"id":3,"n":"C"}]
with open("del.dat", "wb") as f:
    pickle.dump(recs, f)
with open("del.dat", "rb") as f:
    recs = pickle.load(f)
recs = [r for r in recs if r["id"] != 2]
with open("del.dat", "wb") as f:
    pickle.dump(recs, f)
with open("del.dat", "rb") as f:
    print(pickle.load(f))`}
        />
        <PyRunner
          height={280}
          initialCode={`# example: csv with custom delimiter
import csv
with open("pipe.csv", "w", newline="") as f:
    w = csv.writer(f, delimiter="|")
    w.writerow(["id", "name"])
    w.writerow([1, "Zara"])
print(open("pipe.csv").read())`}
        />
        <PyRunner
          height={280}
          initialCode={`# example: seek + tell combined demo
with open("st.txt", "w") as f:
    f.write("0123456789")
with open("st.txt", "r+") as f:
    f.seek(5)
    print("pos:", f.tell())
    f.write("X")
with open("st.txt") as f:
    print(f.read())`}
        />
      </Section>

      </ChapterLayout>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { ChapterLayout, Section, Callout, QuickCheck, PYQ } from "@/components/ChapterLayout";

export const Route = createFileRoute("/xii/python-sql")({
  head: () => ({
    meta: [
      { title: "Python ↔ SQL Connectivity — CS 083 Class XII" },
      {
        name: "description",
        content:
          "Connect Python with MySQL using mysql.connector — full guide: install, connect, cursor, parameterised queries, fetchone/fetchmany/fetchall, transactions and a mini project.",
      },
    ],
  }),
  component: Page,
});

const Code = ({ children }: { children: string }) => (
  <pre className="overflow-x-auto rounded-md border border-border bg-[var(--code-bg)] p-3 font-mono text-xs leading-relaxed">
    {children}
  </pre>
);

function Page() {
  return (
    <ChapterLayout slug="/xii/python-sql">
      <Section title="Why connect Python with SQL?">
        <p>
          Python is great for logic, file processing and user interfaces; SQL is great
          at storing, querying and protecting large amounts of structured data.
          Combining them lets you build real applications — billing software, school
          ERP, library management, attendance systems, e-commerce backends.
        </p>
        <Callout>
          The Python code below uses <code>mysql.connector</code>, the standard CBSE
          library. It runs on your local machine, not in this browser playground (the
          browser cannot reach a MySQL server). Install it with{" "}
          <code>pip install mysql-connector-python</code> and run from IDLE/VS Code.
        </Callout>
      </Section>

      <Section title="Steps to connect Python with MySQL">
        <ol className="list-decimal space-y-1 pl-5">
          <li>Import the connector: <code>import mysql.connector</code>.</li>
          <li>Create a <b>connection</b> object using <code>connect()</code>.</li>
          <li>Create a <b>cursor</b> object using <code>con.cursor()</code>.</li>
          <li>Execute SQL with <code>cur.execute()</code>.</li>
          <li>For SELECT — use <code>fetchone() / fetchmany(n) / fetchall()</code>.</li>
          <li>For INSERT/UPDATE/DELETE — call <code>con.commit()</code> to save changes.</li>
          <li>Close cursor and connection: <code>cur.close(); con.close()</code>.</li>
        </ol>
      </Section>

      <Section title="Step 1 — Install & connect">
        <Code>{`# install once in terminal
# pip install mysql-connector-python

import mysql.connector as ms

con = ms.connect(
    host="localhost",
    user="root",
    password="your_password",
    database="school"
)

if con.is_connected():
    print("✓ Connected to MySQL")
cur = con.cursor()`}</Code>
        <p><b>Common parameters:</b></p>
        <ul className="list-disc space-y-1 pl-5">
          <li><code>host</code> — server name (usually <code>localhost</code>).</li>
          <li><code>user</code>, <code>password</code> — credentials.</li>
          <li><code>database</code> — which DB to use.</li>
          <li><code>port</code> — defaults to 3306.</li>
        </ul>
      </Section>

      <Section title="Step 2 — Create a database & table (one-time setup)">
        <Code>{`# Run inside the MySQL client first, OR through Python:
cur.execute("CREATE DATABASE IF NOT EXISTS school")
cur.execute("USE school")

cur.execute("""
CREATE TABLE IF NOT EXISTS student (
    roll  INT PRIMARY KEY,
    name  VARCHAR(40) NOT NULL,
    class VARCHAR(10),
    marks INT CHECK (marks BETWEEN 0 AND 100)
)
""")
print("Table ready")`}</Code>
      </Section>

      <Section title="Step 3 — INSERT (with placeholders to avoid SQL injection)">
        <Code>{`roll  = int(input("Roll: "))
name  = input("Name: ")
clas  = input("Class: ")
marks = int(input("Marks: "))

sql  = "INSERT INTO student (roll, name, class, marks) VALUES (%s, %s, %s, %s)"
data = (roll, name, clas, marks)

cur.execute(sql, data)
con.commit()                        # IMPORTANT — saves changes
print(cur.rowcount, "row(s) inserted")`}</Code>
        <p>Insert <b>multiple rows at once</b> with <code>executemany</code>:</p>
        <Code>{`rows = [
    (10,"Aarav","XII-A",88),
    (11,"Diya","XII-A",76),
    (12,"Kabir","XII-B",92),
]
cur.executemany(
    "INSERT INTO student VALUES (%s,%s,%s,%s)", rows
)
con.commit()
print(cur.rowcount, "rows inserted")`}</Code>
      </Section>

      <Section title="Step 4 — SELECT: fetchone / fetchmany / fetchall">
        <Code>{`cur.execute("SELECT roll, name, marks FROM student ORDER BY marks DESC")

# fetchone — single row (tuple) or None
first = cur.fetchone()
print("Top scorer:", first)

# fetchmany(n) — up to n rows
next2 = cur.fetchmany(2)
print("Next two:", next2)

# fetchall — all remaining rows
rest = cur.fetchall()
for r in rest:
    print(r)

print("Total rows returned:", cur.rowcount)
print("Column names:", [d[0] for d in cur.description])`}</Code>
      </Section>

      <Section title="Step 5 — UPDATE & DELETE">
        <Code>{`# Update marks for one student
cur.execute("UPDATE student SET marks = marks + 5 WHERE roll = %s", (1,))
con.commit()
print("Updated rows:", cur.rowcount)

# Delete failures
cur.execute("DELETE FROM student WHERE marks < %s", (35,))
con.commit()
print("Deleted rows:", cur.rowcount)`}</Code>
      </Section>

      <Section title="Step 6 — Always close the connection">
        <Code>{`cur.close()
con.close()
print("Connection closed")`}</Code>
      </Section>

      <Section title="Transactions — commit & rollback">
        <p>
          By default, <code>mysql.connector</code> uses transactions. Changes become
          permanent only after <code>commit()</code>. <code>rollback()</code> undoes
          uncommitted changes — useful in money-transfer or marks-update scenarios.
        </p>
        <Code>{`try:
    cur.execute("UPDATE account SET bal = bal - 1000 WHERE id = 1")
    cur.execute("UPDATE account SET bal = bal + 1000 WHERE id = 2")
    con.commit()
    print("Transfer successful")
except Exception as e:
    con.rollback()
    print("Failed, rolled back:", e)`}</Code>
      </Section>

      <Section title="Mini project — menu-driven school app">
        <Code>{`import mysql.connector as ms

con = ms.connect(host="localhost", user="root",
                 password="pass", database="school")
cur = con.cursor()

def add():
    r = int(input("roll: "))
    n = input("name: ")
    c = input("class: ")
    m = int(input("marks: "))
    cur.execute(
        "INSERT INTO student VALUES(%s,%s,%s,%s)", (r,n,c,m)
    )
    con.commit()
    print("✓ added")

def show():
    cur.execute("SELECT * FROM student ORDER BY marks DESC")
    print(f"{'Roll':<6}{'Name':<15}{'Class':<8}{'Marks':<5}")
    for r in cur.fetchall():
        print(f"{r[0]:<6}{r[1]:<15}{r[2]:<8}{r[3]:<5}")

def update():
    r = int(input("roll: "))
    m = int(input("new marks: "))
    cur.execute("UPDATE student SET marks=%s WHERE roll=%s", (m,r))
    con.commit()
    print(cur.rowcount, "row(s) updated")

def remove():
    r = int(input("roll to delete: "))
    cur.execute("DELETE FROM student WHERE roll=%s", (r,))
    con.commit()
    print(cur.rowcount, "row(s) deleted")

def search():
    n = input("name contains: ")
    cur.execute("SELECT * FROM student WHERE name LIKE %s", (f"%{n}%",))
    for row in cur.fetchall():
        print(row)

while True:
    print("\\n1.Add  2.Show  3.Update  4.Delete  5.Search  6.Quit")
    ch = input("> ")
    if   ch == "1": add()
    elif ch == "2": show()
    elif ch == "3": update()
    elif ch == "4": remove()
    elif ch == "5": search()
    elif ch == "6": break
    else: print("invalid choice")

con.close()
print("Bye!")`}</Code>
      </Section>

      <Section title="Best practices & exam pointers">
        <ul className="list-disc space-y-1 pl-5">
          <li>Always use <b>parameterised queries</b> with <code>%s</code> placeholders — never f-strings — to avoid SQL injection.</li>
          <li>Call <code>commit()</code> after every INSERT/UPDATE/DELETE.</li>
          <li>Use <code>try / except / finally</code> and close the connection in <code>finally</code>.</li>
          <li><code>cur.rowcount</code> tells how many rows were affected.</li>
          <li><code>cur.description</code> gives column metadata.</li>
          <li>Difference between <code>fetchone()</code>, <code>fetchmany(n)</code>, <code>fetchall()</code>:
            <ul className="mt-1 list-[circle] space-y-0.5 pl-5">
              <li><code>fetchone()</code> → one tuple or <code>None</code>.</li>
              <li><code>fetchmany(n)</code> → list of up to n tuples.</li>
              <li><code>fetchall()</code> → list of all remaining tuples.</li>
            </ul>
          </li>
        </ul>
      </Section>

      <Section title="Practice">
        <QuickCheck
          question="Which method permanently saves changes after INSERT?"
          options={["save()", "commit()", "store()", "execute()"]}
          answer="commit()"
        />
        <QuickCheck
          question="Which placeholder is used for parameter substitution in mysql.connector?"
          options={["?", ":1", "%s", "$1"]}
          answer="%s"
        />
        <QuickCheck
          question="What does cur.fetchone() return when there are no more rows?"
          options={["empty tuple ()", "0", "None", "raises StopIteration"]}
          answer="None"
        />
      </Section>
    </ChapterLayout>
  );
}

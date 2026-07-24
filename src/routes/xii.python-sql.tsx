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
    
        <Section title="Deeper theory: cursor types, transactions & security">
          <p>
            A <strong>cursor</strong> is a control structure that lets Python
            iterate over the result set returned by the database. The MySQL
            connector returns tuples by default; pass <code>dictionary=True</code>
            to <code>conn.cursor()</code> to get rows as dicts.
          </p>
          <ul className="ml-5 list-disc space-y-1 text-sm">
            <li><strong>fetchone()</strong> → next row or <code>None</code>.</li>
            <li><strong>fetchmany(n)</strong> → list of up to <em>n</em> rows.</li>
            <li><strong>fetchall()</strong> → list of all remaining rows.</li>
            <li><strong>cursor.rowcount</strong> → rows affected by the last DML.</li>
            <li><strong>cursor.lastrowid</strong> → AUTO_INCREMENT id of the last INSERT.</li>
          </ul>
          <p className="text-sm">
            By default the connection is <strong>transactional</strong> — DML
            changes are not visible to other connections until you call
            <code>conn.commit()</code>. Use <code>conn.rollback()</code> to undo
            if something fails. Always <code>cursor.close()</code> and
            <code>conn.close()</code> at the end.
          </p>
          <p className="text-sm">
            <strong>Never</strong> build SQL with f-strings or <code>+</code> —
            use <strong>parameterised queries</strong> (<code>%s</code> placeholders)
            so the driver escapes inputs and protects against
            <strong> SQL injection</strong>.
          </p>
        </Section>

        <Section title="Complete program — from import to running">
          <p>
            A full menu-driven program that connects to MySQL, uses a{" "}
            <code>while</code> loop to keep the app running, and demonstrates
            every important connector function —{" "}
            <code>connect()</code>, <code>cursor()</code>, <code>execute()</code>,{" "}
            <code>fetchone()</code>, <code>fetchmany()</code>, <code>fetchall()</code>,{" "}
            <code>commit()</code>, <code>rollback()</code>, <code>rowcount</code>,{" "}
            <code>cursor.close()</code> and <code>con.close()</code>. All user
            inputs are passed safely using <code>%s</code> parameterised queries.
          </p>
          <Code>{`# ------------------------------------------------------------
# Student Management System — Python + MySQL (mysql.connector)
# Install once:  pip install mysql-connector-python
# Pre-create in MySQL:
#   CREATE DATABASE school;
#   USE school;
#   CREATE TABLE student(
#       roll   INT PRIMARY KEY,
#       name   VARCHAR(40),
#       cls    VARCHAR(10),
#       marks  FLOAT
#   );
# ------------------------------------------------------------

import mysql.connector as ms

# 1) CONNECT
con = ms.connect(
    host     = "localhost",
    user     = "root",
    password = "root123",
    database = "school"
)

if con.is_connected():
    print("Connected to MySQL successfully!")

# 2) CURSOR
cur = con.cursor()

# 3) MAIN LOOP — keeps running until user chooses Exit
while True:
    print("""
    ------ STUDENT MENU ------
    1. Add student
    2. Show one student (fetchone)
    3. Show few students (fetchmany)
    4. Show all students (fetchall)
    5. Update marks
    6. Delete student
    7. Exit
    """)
    ch = input("Enter choice (1-7): ")

    if ch == "1":
        r = int(input("Roll   : "))
        n = input("Name   : ")
        c = input("Class  : ")
        m = float(input("Marks  : "))
        sql  = "INSERT INTO student VALUES (%s, %s, %s, %s)"
        data = (r, n, c, m)
        try:
            cur.execute(sql, data)
            con.commit()                          # save changes
            print(cur.rowcount, "row inserted.")
        except Exception as e:
            con.rollback()                        # undo on error
            print("Failed:", e)

    elif ch == "2":
        r = int(input("Enter roll to search: "))
        cur.execute("SELECT * FROM student WHERE roll = %s", (r,))
        row = cur.fetchone()                      # single row / None
        print(row if row else "No such student.")

    elif ch == "3":
        k = int(input("How many rows to show? "))
        cur.execute("SELECT * FROM student")
        rows = cur.fetchmany(k)                   # first k rows
        for row in rows:
            print(row)

    elif ch == "4":
        cur.execute("SELECT * FROM student")
        rows = cur.fetchall()                     # every row
        print("Total records:", cur.rowcount)
        for row in rows:
            print(row)

    elif ch == "5":
        r = int(input("Roll   : "))
        m = float(input("New marks: "))
        cur.execute(
            "UPDATE student SET marks = %s WHERE roll = %s",
            (m, r)
        )
        con.commit()
        print(cur.rowcount, "row updated.")

    elif ch == "6":
        r = int(input("Roll to delete: "))
        cur.execute("DELETE FROM student WHERE roll = %s", (r,))
        con.commit()
        print(cur.rowcount, "row deleted.")

    elif ch == "7":
        print("Closing connection. Bye!")
        break

    else:
        print("Invalid choice, try again.")

# 4) CLEAN UP
cur.close()
con.close()
print("Connection closed.")`}</Code>
          <Callout>
            Notice every user input is passed as a <b>tuple</b> to{" "}
            <code>execute()</code> using <code>%s</code> placeholders — this is
            the CBSE-recommended, injection-safe way. Never build SQL with
            f-strings.
          </Callout>
        </Section>

        <Section title="Previous Year Questions (PYQs)">
          <PYQ year="CBSE 2023" marks={3}
            question={<>Write Python code to connect to MySQL database <code>school</code>, fetch all rows from table <code>student</code> and display them.</>}
            answer={<pre className="overflow-x-auto rounded bg-[var(--code-bg)] p-2 text-xs">{`import mysql.connector as ms
conn = ms.connect(host="localhost", user="root",
                  password="****", database="school")
cur = conn.cursor()
cur.execute("SELECT * FROM student")
for row in cur.fetchall():
    print(row)
cur.close(); conn.close()`}</pre>}
          />
          <PYQ year="CBSE 2022" marks={2}
            question={<>Differentiate between <code>fetchone()</code> and <code>fetchall()</code>.</>}
            answer={<>
              <p><code>fetchone()</code> returns the <strong>next single row</strong> as a tuple, or <code>None</code> if no more rows. Useful when you expect at most one record (e.g. login lookup).</p>
              <p><code>fetchall()</code> returns <strong>all remaining rows</strong> as a list of tuples. Useful for displaying full result sets.</p>
            </>}
          />
          <PYQ year="CBSE 2024" marks={2}
            question={<>What is the role of <code>commit()</code> in database connectivity?</>}
            answer={<>It permanently saves all DML changes (INSERT/UPDATE/DELETE) made in the current transaction to the database. Without <code>commit()</code>, changes are kept only in the connection buffer and are discarded when the connection closes.</>}
          />
        </Section>

        <Section title="More MCQs">
          <QuickCheck question="Which package connects Python to MySQL?"
            options={["sqlite3", "mysql.connector", "pymongo", "psycopg2"]} answer="mysql.connector" />
          <QuickCheck question="Which method permanently saves changes?"
            options={["save()", "commit()", "flush()", "store()"]} answer="commit()" />
          <QuickCheck question="What does cursor.rowcount give after an UPDATE?"
            options={["Total rows in table", "Rows affected", "Last id", "Always 1"]} answer="Rows affected" />
          <QuickCheck question="Safest placeholder for user input in mysql.connector?"
            options={["?", "%s", "{}", "$1"]} answer="%s" />
        </Section>
      </ChapterLayout>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { ChapterLayout, Section, Callout } from "@/components/ChapterLayout";

export const Route = createFileRoute("/xii/python-sql")({
  head: () => ({
    meta: [
      { title: "Python ↔ SQL Connectivity — CS 083 Class XII" },
      {
        name: "description",
        content:
          "Connect Python with MySQL using mysql.connector — connect, cursor, execute, commit, fetchone, fetchall with full examples.",
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
          Python handles logic and UI; SQL handles persistent data. Connecting them
          lets you build full apps — billing software, school ERP, library systems.
        </p>
        <Callout>
          The Python code below uses <code>mysql.connector</code>, the standard CBSE
          library. It runs on your local machine, not in this browser playground (the
          browser cannot reach a MySQL server). Try it in IDLE/Thonny after running{" "}
          <code>pip install mysql-connector-python</code>.
        </Callout>
      </Section>

      <Section title="Step 1 — Connect">
        <Code>{`import mysql.connector as ms

con = ms.connect(
    host="localhost",
    user="root",
    password="your_password",
    database="school"
)
print("Connected:", con.is_connected())
cur = con.cursor()`}</Code>
      </Section>

      <Section title="Step 2 — INSERT (with parameters to avoid SQL injection)">
        <Code>{`roll  = int(input("Roll: "))
name  = input("Name: ")
marks = int(input("Marks: "))

sql = "INSERT INTO student (roll, name, marks) VALUES (%s, %s, %s)"
cur.execute(sql, (roll, name, marks))
con.commit()                # IMPORTANT — saves changes
print(cur.rowcount, "row inserted")`}</Code>
      </Section>

      <Section title="Step 3 — SELECT (fetchone / fetchall)">
        <Code>{`cur.execute("SELECT roll, name, marks FROM student ORDER BY marks DESC")

# fetchone — one row at a time
first = cur.fetchone()
print("Top scorer:", first)

# remaining rows
for row in cur.fetchall():
    print(row)`}</Code>
      </Section>

      <Section title="Step 4 — UPDATE & DELETE">
        <Code>{`cur.execute("UPDATE student SET marks = marks + 5 WHERE roll = %s", (1,))
con.commit()
print("Updated rows:", cur.rowcount)

cur.execute("DELETE FROM student WHERE marks < %s", (35,))
con.commit()
print("Deleted rows:", cur.rowcount)

con.close()`}</Code>
      </Section>

      <Section title="Mini project pattern — menu-driven app">
        <Code>{`import mysql.connector as ms

con = ms.connect(host="localhost", user="root",
                 password="pass", database="school")
cur = con.cursor()

while True:
    print("\\n1.Add  2.Show  3.Update marks  4.Quit")
    ch = input("> ")
    if ch == "1":
        r,n,m = int(input("roll: ")), input("name: "), int(input("marks: "))
        cur.execute("INSERT INTO student VALUES(%s,%s,%s)", (r,n,m))
        con.commit()
    elif ch == "2":
        cur.execute("SELECT * FROM student")
        for row in cur.fetchall(): print(row)
    elif ch == "3":
        r,m = int(input("roll: ")), int(input("new marks: "))
        cur.execute("UPDATE student SET marks=%s WHERE roll=%s", (m,r))
        con.commit()
    elif ch == "4":
        break

con.close()`}</Code>
      </Section>
    </ChapterLayout>
  );
}

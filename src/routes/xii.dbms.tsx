import { createFileRoute } from "@tanstack/react-router";
import { ChapterLayout, Section, Callout, QuickCheck, PYQ } from "@/components/ChapterLayout";
import { SqlRunner } from "@/components/SqlRunner";

const SETUP = `CREATE TABLE student (
  roll  INTEGER PRIMARY KEY,
  name  TEXT NOT NULL,
  class TEXT,
  marks INTEGER,
  city  TEXT
);
INSERT INTO student VALUES
 (1,'Aarav','XII-A',88,'Delhi'),
 (2,'Diya','XII-A',76,'Mumbai'),
 (3,'Kabir','XII-B',92,'Delhi'),
 (4,'Mira','XII-B',58,'Pune'),
 (5,'Rohan','XII-A',64,'Mumbai'),
 (6,'Sara','XII-B',81,'Delhi'),
 (7,'Vivaan','XII-A',45,'Pune'),
 (8,'Isha','XII-B',73,'Mumbai');

CREATE TABLE city (
  city TEXT PRIMARY KEY,
  state TEXT
);
INSERT INTO city VALUES
 ('Delhi','Delhi'),('Mumbai','Maharashtra'),('Pune','Maharashtra');

CREATE TABLE teacher (
  tid   INTEGER PRIMARY KEY,
  tname TEXT,
  subject TEXT,
  salary INTEGER
);
INSERT INTO teacher VALUES
 (101,'Mr Sharma','CS',55000),
 (102,'Ms Iyer','Math',60000),
 (103,'Mr Khan','English',48000),
 (104,'Mrs Das','Physics',62000);`;

export const Route = createFileRoute("/xii/dbms")({
  head: () => ({
    meta: [
      { title: "Database Management & SQL — CS 083 Class XII" },
      {
        name: "description",
        content:
          "Comprehensive DBMS notes — relational model, keys, DDL/DML/DCL/TCL, all SQL clauses, joins, aggregates, constraints, normalization basics — practise on a live SQLite database.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <ChapterLayout slug="/xii/dbms">
      <Section title="Database fundamentals">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Data</b> — raw facts (e.g. "88", "Aarav").</li>
          <li><b>Information</b> — processed, meaningful data ("Aarav scored 88").</li>
          <li><b>Database</b> — an organised collection of related data.</li>
          <li><b>DBMS</b> — software to create, manage and query databases (MySQL, Oracle, PostgreSQL, SQLite, MS Access, MongoDB).</li>
          <li><b>RDBMS</b> — DBMS based on the relational model (tables with rows & columns).</li>
        </ul>
        <p><b>Advantages of DBMS:</b></p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Reduces data redundancy and inconsistency.</li>
          <li>Concurrent access by many users.</li>
          <li>Built-in security, backup and recovery.</li>
          <li>Data integrity through constraints.</li>
          <li>Powerful querying with SQL.</li>
        </ul>
      </Section>

      <Section title="The relational model">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Relation</b> = table.</li>
          <li><b>Tuple</b> = row / record.</li>
          <li><b>Attribute</b> = column / field.</li>
          <li><b>Domain</b> = the set of allowed values for an attribute.</li>
          <li><b>Degree</b> = number of attributes (columns).</li>
          <li><b>Cardinality</b> = number of tuples (rows).</li>
        </ul>
      </Section>

      <Section title="Keys">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Primary key</b> — a column (or set) that uniquely identifies each row. Cannot be NULL or duplicated.</li>
          <li><b>Candidate key</b> — any column(s) eligible to be a primary key.</li>
          <li><b>Alternate key</b> — candidate keys not chosen as primary.</li>
          <li><b>Foreign key</b> — a column that references the primary key of another table; enforces referential integrity.</li>
          <li><b>Composite key</b> — primary key made of two or more columns.</li>
          <li><b>Super key</b> — any column set that uniquely identifies a row (may include extra cols).</li>
        </ul>
        <Callout>
          A school DB has tables <code>student</code>, <code>teacher</code>,{" "}
          <code>marks</code>. <code>marks.roll</code> is a foreign key referencing
          <code> student.roll</code>.
        </Callout>
      </Section>

      <Section title="SQL command categories">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>DDL — Data Definition Language</b>: <code>CREATE, ALTER, DROP, RENAME, TRUNCATE</code>.</li>
          <li><b>DML — Data Manipulation Language</b>: <code>INSERT, UPDATE, DELETE, SELECT</code>.</li>
          <li><b>DCL — Data Control Language</b>: <code>GRANT, REVOKE</code>.</li>
          <li><b>TCL — Transaction Control Language</b>: <code>COMMIT, ROLLBACK, SAVEPOINT</code>.</li>
        </ul>
      </Section>

      <Section title="Data types in SQL">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>INT / INTEGER</b> — whole numbers.</li>
          <li><b>DECIMAL(p,s) / NUMERIC</b> — fixed-precision; great for money.</li>
          <li><b>FLOAT / REAL</b> — approximate numbers.</li>
          <li><b>CHAR(n)</b> — fixed-length string, padded with spaces.</li>
          <li><b>VARCHAR(n)</b> — variable-length string up to n.</li>
          <li><b>TEXT</b> — long string.</li>
          <li><b>DATE, TIME, DATETIME, TIMESTAMP</b> — temporal types.</li>
          <li><b>BOOLEAN</b> — true / false.</li>
        </ul>
      </Section>

      <Section title="Constraints">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>NOT NULL</b> — column cannot be empty.</li>
          <li><b>UNIQUE</b> — values must not repeat.</li>
          <li><b>PRIMARY KEY</b> — NOT NULL + UNIQUE, only one per table.</li>
          <li><b>FOREIGN KEY</b> — must match a value in the referenced table.</li>
          <li><b>CHECK</b> — custom condition (e.g. <code>marks BETWEEN 0 AND 100</code>).</li>
          <li><b>DEFAULT</b> — value used when none is provided.</li>
        </ul>
      </Section>

      <Section title="Try SQL on a live database">
        <p>
          Tables pre-loaded: <code>student(roll, name, class, marks, city)</code>,{" "}
          <code>city(city, state)</code>, <code>teacher(tid, tname, subject, salary)</code>.
          Edit any query and hit Run.
        </p>
        <SqlRunner
          setupSql={SETUP}
          initialQuery={`-- DDL example: create a copy table
CREATE TABLE IF NOT EXISTS topper AS
SELECT name, marks FROM student WHERE marks >= 80;

SELECT * FROM topper ORDER BY marks DESC;`}
        />
      </Section>

      <Section title="SELECT — projection, filtering, sorting">
        <SqlRunner
          setupSql={SETUP}
          initialQuery={`-- DISTINCT, WHERE, ORDER BY, LIMIT
SELECT DISTINCT class FROM student;

SELECT name, marks
FROM student
WHERE marks BETWEEN 60 AND 90
  AND city IN ('Delhi','Mumbai')
ORDER BY marks DESC
LIMIT 5;

-- Pattern matching
SELECT name FROM student WHERE name LIKE 'A%';   -- starts with A
SELECT name FROM student WHERE name LIKE '_i%';  -- 2nd letter i

-- IS NULL / IS NOT NULL
SELECT * FROM student WHERE city IS NOT NULL;`}
        />
      </Section>

      <Section title="Aggregate functions & GROUP BY">
        <p>
          <b>Aggregate functions:</b> <code>COUNT, SUM, AVG, MIN, MAX</code>.
          <br /><b>GROUP BY</b> creates groups; <b>HAVING</b> filters those groups.
          <br />Order: <code>SELECT … FROM … WHERE … GROUP BY … HAVING … ORDER BY … LIMIT …</code>.
        </p>
        <SqlRunner
          setupSql={SETUP}
          initialQuery={`SELECT class,
       COUNT(*)               AS total,
       MAX(marks)             AS top,
       MIN(marks)             AS low,
       ROUND(AVG(marks),2)    AS avg_marks,
       SUM(marks)             AS total_marks
FROM student
GROUP BY class
HAVING AVG(marks) > 65
ORDER BY avg_marks DESC;`}
        />
      </Section>

      <Section title="JOIN — combining tables">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>INNER JOIN</b> — rows that match in both tables.</li>
          <li><b>LEFT JOIN</b> — all rows from left + matches from right; NULL where no match.</li>
          <li><b>RIGHT JOIN</b> — opposite of LEFT (not in SQLite directly).</li>
          <li><b>CROSS JOIN</b> — Cartesian product (every row × every row).</li>
          <li><b>SELF JOIN</b> — table joined with itself using aliases.</li>
        </ul>
        <SqlRunner
          setupSql={SETUP}
          initialQuery={`-- INNER JOIN
SELECT s.name, s.marks, c.state
FROM student s
JOIN city c ON s.city = c.city
WHERE c.state = 'Maharashtra';

-- Cartesian (CROSS) JOIN — every student paired with every teacher
SELECT s.name, t.tname
FROM student s, teacher t
LIMIT 6;`}
        />
      </Section>

      <Section title="DML — INSERT, UPDATE, DELETE">
        <SqlRunner
          setupSql={SETUP}
          initialQuery={`-- INSERT
INSERT INTO student (roll, name, class, marks, city)
VALUES (9,'Aanya','XII-A',95,'Delhi');

-- UPDATE
UPDATE student SET marks = marks + 5 WHERE class = 'XII-A';

-- DELETE
DELETE FROM student WHERE marks < 50;

-- Verify
SELECT roll, name, class, marks FROM student ORDER BY roll;`}
          height={220}
        />
      </Section>

      <Section title="DDL — ALTER & DROP">
        <SqlRunner
          setupSql={SETUP}
          initialQuery={`-- Add a column
ALTER TABLE student ADD COLUMN email TEXT;

-- Update the new column
UPDATE student SET email = lower(name) || '@school.in';

SELECT roll, name, email FROM student;

-- Drop a table
-- DROP TABLE topper;`}
        />
      </Section>

      <Section title="Subqueries (nested SELECT)">
        <SqlRunner
          setupSql={SETUP}
          initialQuery={`-- Students scoring above the class average
SELECT name, marks FROM student
WHERE marks > (SELECT AVG(marks) FROM student);

-- Students from Maharashtra cities (subquery in IN)
SELECT name, city FROM student
WHERE city IN (SELECT city FROM city WHERE state = 'Maharashtra');`}
        />
      </Section>

      <Section title="Useful SQL functions">
        <SqlRunner
          setupSql={SETUP}
          initialQuery={`SELECT
  upper(name)         AS upper_name,
  lower(name)         AS lower_name,
  length(name)        AS name_len,
  substr(name,1,3)    AS short,
  marks * 1.1         AS bonus,
  round(marks/10.0,1) AS scaled,
  date('now')         AS today
FROM student
LIMIT 5;`}
        />
      </Section>

      <Section title="Normalisation (overview)">
        <p>
          <b>Normalisation</b> is the process of organising columns/tables to reduce
          redundancy and improve integrity. Common forms (intuition only — full study in college):
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li><b>1NF</b> — atomic values, no repeating groups.</li>
          <li><b>2NF</b> — 1NF + no partial dependency on composite key.</li>
          <li><b>3NF</b> — 2NF + no transitive dependency.</li>
        </ul>
      </Section>

      <Section title="Transactions (TCL)">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>COMMIT</b> — save all changes since the last commit.</li>
          <li><b>ROLLBACK</b> — undo all changes since the last commit / savepoint.</li>
          <li><b>SAVEPOINT</b> — set a marker you can roll back to.</li>
          <li><b>ACID</b> — Atomicity, Consistency, Isolation, Durability — the four properties of a reliable transaction.</li>
        </ul>
      </Section>

      <Section title="Practice">
        <QuickCheck
          question="Which clause filters groups created by GROUP BY?"
          options={["WHERE", "FILTER", "HAVING", "GROUP HAVING"]}
          answer="HAVING"
        />
        <QuickCheck
          question="Number of rows in a relation is its ?"
          options={["Degree", "Cardinality", "Domain", "Tuple"]}
          answer="Cardinality"
        />
        <QuickCheck
          question="Which command permanently saves changes?"
          options={["SAVE", "STORE", "COMMIT", "WRITE"]}
          answer="COMMIT"
        />
      </Section>
    </ChapterLayout>
  );
}

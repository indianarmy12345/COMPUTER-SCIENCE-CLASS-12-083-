import { createFileRoute } from "@tanstack/react-router";
import { ChapterLayout, Section, Callout } from "@/components/ChapterLayout";
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
 (6,'Sara','XII-B',81,'Delhi');

CREATE TABLE city (
  city TEXT PRIMARY KEY,
  state TEXT
);
INSERT INTO city VALUES
 ('Delhi','Delhi'),('Mumbai','Maharashtra'),('Pune','Maharashtra');`;

export const Route = createFileRoute("/xii/dbms")({
  head: () => ({
    meta: [
      { title: "Database Management & SQL — CS 083 Class XII" },
      {
        name: "description",
        content:
          "Relational model, SQL DDL/DML, joins, aggregates and constraints — practice on a live in-browser SQLite database.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <ChapterLayout slug="/xii/dbms">
      <Section title="Relational model">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <b>Relation</b> = table; <b>Tuple</b> = row; <b>Attribute</b> = column.
          </li>
          <li>
            <b>Degree</b> = number of columns; <b>Cardinality</b> = number of rows.
          </li>
          <li>
            <b>Primary key</b> uniquely identifies a row; <b>Foreign key</b> references
            a primary key in another table; <b>Candidate / Alternate keys</b> are other
            unique columns.
          </li>
        </ul>
        <Callout>
          Real-world: a school database has <code>student</code>, <code>teacher</code>,{" "}
          <code>marks</code> tables linked by foreign keys.
        </Callout>
      </Section>

      <Section title="Try SQL on a live database">
        <p>
          Two tables are pre-loaded: <code>student(roll, name, class, marks, city)</code>{" "}
          and <code>city(city, state)</code>. Edit the query and hit Run.
        </p>

        <SqlRunner
          setupSql={SETUP}
          initialQuery={`-- Basic SELECT
SELECT name, marks FROM student WHERE marks >= 75 ORDER BY marks DESC;`}
        />
      </Section>

      <Section title="Aggregates & GROUP BY">
        <SqlRunner
          setupSql={SETUP}
          initialQuery={`SELECT class,
       COUNT(*) AS total,
       MAX(marks) AS top,
       MIN(marks) AS low,
       ROUND(AVG(marks),2) AS avg_marks
FROM student
GROUP BY class
HAVING AVG(marks) > 70;`}
        />
      </Section>

      <Section title="JOIN — combining tables">
        <SqlRunner
          setupSql={SETUP}
          initialQuery={`SELECT s.name, s.marks, c.state
FROM student s
JOIN city c ON s.city = c.city
WHERE c.state = 'Maharashtra';`}
        />
      </Section>

      <Section title="UPDATE, DELETE, ALTER">
        <SqlRunner
          setupSql={SETUP}
          initialQuery={`-- Run each statement one at a time, then a SELECT to verify.
UPDATE student SET marks = marks + 5 WHERE class = 'XII-A';
SELECT roll, name, marks FROM student WHERE class='XII-A';`}
          height={180}
        />
      </Section>
    </ChapterLayout>
  );
}

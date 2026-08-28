import { createFileRoute } from "@tanstack/react-router";
import { ChapterLayout, Section, Callout, QuickCheck, PYQ, MostAsked } from "@/components/ChapterLayout";
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
          "DBMS & SQL notes for CBSE Class 12 — relational model, keys, DDL/DML, joins, aggregates and constraints — practise on a live SQLite database.",
      },
      { property: "og:title", content: "Database Management & SQL — CS 083 Class XII" },
      {
        property: "og:description",
        content:
          "Learn DBMS and SQL for CBSE Class 12 with live SQLite queries — joins, aggregates, constraints and more.",
      },
      { property: "og:url", content: "https://cslearners.lovable.app/xii/dbms" },
    ],
    links: [
      { rel: "canonical", href: "https://cslearners.lovable.app/xii/dbms" },
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
    
        <Section title="Deeper theory: keys, constraints & normalisation basics">
          <p>
            A <strong>key</strong> uniquely identifies a row. The most common types:
          </p>
          <ul className="ml-5 list-disc space-y-1 text-sm">
            <li><strong>Candidate key:</strong> a minimal set of attributes that can uniquely identify a row.</li>
            <li><strong>Primary key:</strong> the candidate key chosen by the designer; cannot be NULL or duplicate.</li>
            <li><strong>Alternate key:</strong> any candidate key that is not the primary key.</li>
            <li><strong>Foreign key:</strong> an attribute that refers to the primary key of another table — enforces <em>referential integrity</em>.</li>
            <li><strong>Composite key:</strong> a primary key made of two or more columns.</li>
          </ul>
          <p className="text-sm">
            <strong>Constraints</strong> in SQL: <code>NOT NULL</code>,
            <code>UNIQUE</code>, <code>PRIMARY KEY</code>, <code>FOREIGN KEY</code>,
            <code>CHECK</code>, <code>DEFAULT</code>. <strong>DDL</strong>
            (CREATE/ALTER/DROP) defines schema; <strong>DML</strong>
            (INSERT/UPDATE/DELETE) changes data; <strong>DQL</strong> (SELECT)
            queries data; <strong>TCL</strong> (COMMIT/ROLLBACK) controls
            transactions.
          </p>
          <p className="text-sm">
            <strong>Aggregate functions</strong> ignore NULLs (except
            <code>COUNT(*)</code>). <strong>WHERE</strong> filters rows
            <em> before</em> grouping; <strong>HAVING</strong> filters
            <em> after</em> grouping.
          </p>
        </Section>

        <Section title="Previous Year Questions (PYQs)">
          <PYQ year="CBSE 2023" marks={2}
            question={<>Differentiate between DELETE and DROP commands with example.</>}
            answer={<>
              <p><strong>DELETE</strong> (DML) removes rows but keeps the table structure. <code>DELETE FROM student WHERE marks &lt; 33;</code></p>
              <p><strong>DROP</strong> (DDL) removes the entire table — structure and data. <code>DROP TABLE student;</code></p>
            </>}
          />
          <PYQ year="CBSE 2022" marks={3}
            question={<>Write SQL to (i) display class-wise average marks, (ii) display names of students from Delhi sorted by marks descending, (iii) count students whose marks &gt;= 75.</>}
            answer={<pre className="overflow-x-auto rounded bg-[var(--code-bg)] p-2 text-xs">{`-- (i)
SELECT class, AVG(marks) FROM student GROUP BY class;
-- (ii)
SELECT name FROM student WHERE city='Delhi' ORDER BY marks DESC;
-- (iii)
SELECT COUNT(*) FROM student WHERE marks >= 75;`}</pre>}
          />
          <PYQ year="CBSE 2024" marks={1}
            question={<>Which clause is used with SELECT to remove duplicate rows from output?</>}
            answer={<><code>DISTINCT</code> — e.g. <code>SELECT DISTINCT city FROM student;</code></>}
          />
        </Section>

        <Section title="More MCQs">
          <QuickCheck question="Which is a DDL command?"
            options={["UPDATE", "INSERT", "ALTER", "SELECT"]} answer="ALTER" />
          <QuickCheck question="Which aggregate function counts NULLs as well?"
            options={["COUNT(column)", "COUNT(*)", "SUM()", "AVG()"]} answer="COUNT(*)" />
          <QuickCheck question="Which clause filters groups in a GROUP BY query?"
            options={["WHERE", "HAVING", "ORDER BY", "LIMIT"]} answer="HAVING" />
          <QuickCheck question="A foreign key enforces:"
            options={["Domain integrity", "Referential integrity", "Entity integrity", "Uniqueness"]}
            answer="Referential integrity" />
          <QuickCheck question="Cartesian product of m × n rows produces how many rows?"
            options={["m+n", "max(m,n)", "m*n", "m-n"]} answer="m*n" />
        </Section>
        <Section title="Most repeated board questions">
          <MostAsked
            items={[
              {
                q: "Define: degree, cardinality, primary key, candidate key, alternate key and foreign key.",
                marks: 3,
                asked: "2019-2024 (almost every year)",
                a: "Degree = number of attributes (columns) in a relation.\nCardinality = number of tuples (rows).\nPrimary key = attribute (or set) that uniquely identifies each tuple.\nCandidate key = any attribute set eligible to be the primary key.\nAlternate key = candidate key not chosen as primary key.\nForeign key = attribute in one table referring to the primary key of another table, enforcing referential integrity.",
              },
              {
                q: "Differentiate between DDL and DML commands with two examples each.",
                marks: 2,
                asked: "2020, 2022, 2024",
                a: "DDL (Data Definition Language) defines/changes structure: CREATE TABLE, ALTER TABLE, DROP TABLE.\nDML (Data Manipulation Language) works on data: INSERT, UPDATE, DELETE, SELECT.",
              },
              {
                q: "Write SQL to (i) create table STUDENT(Roll int primary key, Name varchar(25), Marks int) and (ii) add a column Grade char(1).",
                marks: 2,
                asked: "2019, 2021, 2023",
                a: "(i) CREATE TABLE STUDENT (\n      Roll INT PRIMARY KEY,\n      Name VARCHAR(25),\n      Marks INT);\n\n(ii) ALTER TABLE STUDENT ADD Grade CHAR(1);",
              },
              {
                q: "Consider table EMP(Eno, Name, Dept, Salary). Write queries: (i) total salary department-wise (ii) names starting with 'A' (iii) employees whose salary is between 20000 and 50000 (iv) departments having more than 3 employees.",
                marks: 4,
                asked: "2020, 2022, 2023, 2024 SQP",
                a: "(i) SELECT Dept, SUM(Salary) FROM EMP GROUP BY Dept;\n(ii) SELECT Name FROM EMP WHERE Name LIKE 'A%';\n(iii) SELECT * FROM EMP WHERE Salary BETWEEN 20000 AND 50000;\n(iv) SELECT Dept, COUNT(*) FROM EMP GROUP BY Dept HAVING COUNT(*) > 3;",
              },
              {
                q: "What is the difference between WHERE and HAVING? And between COUNT(*) and COUNT(column)?",
                marks: 2,
                asked: "2019, 2021, 2024",
                a: "WHERE filters individual rows before grouping; HAVING filters groups after GROUP BY and can use aggregate functions.\nCOUNT(*) counts all rows including those with NULLs; COUNT(column) counts only non-NULL values in that column.",
              },
              {
                q: "Write the output/effect of DELETE, DROP and TRUNCATE (any two differences).",
                marks: 2,
                asked: "2020, 2023",
                a: "DELETE (DML) removes selected rows and can be rolled back; the table structure stays.\nTRUNCATE removes all rows quickly and cannot be rolled back; structure stays.\nDROP (DDL) removes rows plus the entire table structure from the database.",
              },
            ]}
          />
        </Section>

      
      <Section title="EMPLOYEE/DEPT and STUDENT/SPORTS — comprehensive worked practice set">
        <p>
          Two classic exam table-sets. Run them live below, then work through 20+ query
          questions with full answers and expected output.
        </p>
        <SqlRunner
          setupSql={`CREATE TABLE DEPT (
  Deptno INTEGER PRIMARY KEY,
  Dname  TEXT,
  Loc    TEXT
);
INSERT INTO DEPT VALUES
 (10,'ACCOUNTS','DELHI'),
 (20,'SALES','MUMBAI'),
 (30,'IT','BANGALORE'),
 (40,'HR','DELHI');

CREATE TABLE EMPLOYEE (
  Eno     INTEGER PRIMARY KEY,
  Ename   TEXT NOT NULL,
  Deptno  INTEGER,
  Job     TEXT,
  Salary  INTEGER,
  DOJ     DATE,
  Sex     TEXT,
  FOREIGN KEY (Deptno) REFERENCES DEPT(Deptno)
);
INSERT INTO EMPLOYEE VALUES
 (1,'Amit',10,'Manager',55000,'2015-03-12','M'),
 (2,'Anita',20,'Clerk',22000,'2018-07-01','F'),
 (3,'Rakesh',30,'Programmer',48000,'2019-01-15','M'),
 (4,'Sunita',10,'Clerk',21000,'2020-05-20','F'),
 (5,'Vikas',30,'Analyst',52000,'2017-11-11','M'),
 (6,'Anjali',20,'Manager',60000,'2014-09-09','F'),
 (7,'Farhan',NULL,'Trainee',15000,'2021-06-01','M'),
 (8,'Arti',40,'Clerk',23000,'2016-02-02','F');

CREATE TABLE STUDENT (
  Sid    INTEGER PRIMARY KEY,
  Sname  TEXT,
  Class  TEXT,
  Sport  TEXT
);
INSERT INTO STUDENT VALUES
 (1,'Aarav','XII-A','Cricket'),
 (2,'Bina','XII-B','Chess'),
 (3,'Chirag','XII-A','Cricket'),
 (4,'Divya','XII-C','Badminton'),
 (5,'Esha','XII-B',NULL),
 (6,'Faiz','XII-A','Football');

CREATE TABLE SPORTS (
  Sid    INTEGER,
  Grade  TEXT,
  Coach  TEXT,
  FOREIGN KEY (Sid) REFERENCES STUDENT(Sid)
);
INSERT INTO SPORTS VALUES
 (1,'A','Mr Rao'),
 (2,'B','Mr Rao'),
 (3,'A','Ms Verma'),
 (4,'C','Ms Verma'),
 (6,'B','Mr Rao');`}
          initialQuery={`-- Q1: All employees earning more than 40000
SELECT Ename, Salary FROM EMPLOYEE WHERE Salary > 40000;`}
          height={260}
        />

        <p className="text-sm">
          <b>Q1.</b> Display Ename, Salary of employees earning &gt; 40000.<br/>
          <code>SELECT Ename, Salary FROM EMPLOYEE WHERE Salary &gt; 40000;</code><br/>
          <i>Output:</i> Amit 55000, Rakesh 48000, Vikas 52000, Anjali 60000.
        </p>
        <p className="text-sm">
          <b>Q2.</b> Display all distinct jobs.<br/>
          <code>SELECT DISTINCT Job FROM EMPLOYEE;</code><br/>
          <i>Output:</i> Manager, Clerk, Programmer, Analyst, Trainee.
        </p>
        <p className="text-sm">
          <b>Q3.</b> Names of employees whose name starts with 'A'.<br/>
          <code>SELECT Ename FROM EMPLOYEE WHERE Ename LIKE 'A%';</code><br/>
          <i>Output:</i> Amit, Anita, Anjali, Arti.
        </p>
        <p className="text-sm">
          <b>Q4.</b> Employees with no department assigned.<br/>
          <code>SELECT Ename FROM EMPLOYEE WHERE Deptno IS NULL;</code><br/>
          <i>Output:</i> Farhan.
        </p>
        <p className="text-sm">
          <b>Q5.</b> Total salary and count of employees, department-wise.<br/>
          <code>SELECT Deptno, COUNT(*), SUM(Salary) FROM EMPLOYEE GROUP BY Deptno;</code><br/>
          <i>Output:</i> 10→2,76000; 20→2,82000; 30→2,100000; 40→1,23000; NULL→1,15000.
        </p>
        <p className="text-sm">
          <b>Q6.</b> Departments having more than one employee.<br/>
          <code>SELECT Deptno, COUNT(*) FROM EMPLOYEE GROUP BY Deptno HAVING COUNT(*)&gt;1;</code><br/>
          <i>Output:</i> 10→2, 20→2, 30→2.
        </p>
        <p className="text-sm">
          <b>Q7.</b> Highest and lowest salary in the company.<br/>
          <code>SELECT MAX(Salary), MIN(Salary) FROM EMPLOYEE;</code><br/>
          <i>Output:</i> 60000, 15000.
        </p>
        <p className="text-sm">
          <b>Q8.</b> Average salary of female employees.<br/>
          <code>SELECT AVG(Salary) FROM EMPLOYEE WHERE Sex='F';</code><br/>
          <i>Output:</i> (22000+21000+60000+23000)/4 = 31500.
        </p>
        <p className="text-sm">
          <b>Q9.</b> Employee names with their department name (equi/natural join).<br/>
          <code>SELECT Ename, Dname FROM EMPLOYEE E, DEPT D WHERE E.Deptno=D.Deptno;</code><br/>
          <i>Output:</i> 7 rows (Farhan excluded — NULL Deptno has no match).
        </p>
        <p className="text-sm">
          <b>Q10.</b> Same using JOIN keyword.<br/>
          <code>SELECT Ename, Dname FROM EMPLOYEE JOIN DEPT ON EMPLOYEE.Deptno=DEPT.Deptno;</code>
        </p>
        <p className="text-sm">
          <b>Q11.</b> Cartesian product size of EMPLOYEE × DEPT.<br/>
          <code>SELECT COUNT(*) FROM EMPLOYEE, DEPT;</code><br/>
          <i>Output:</i> 8 × 4 = 32.
        </p>
        <p className="text-sm">
          <b>Q12.</b> Employees who joined before 2018-01-01.<br/>
          <code>SELECT Ename, DOJ FROM EMPLOYEE WHERE DOJ &lt; '2018-01-01';</code><br/>
          <i>Output:</i> Amit, Anjali, Arti, Vikas.
        </p>
        <p className="text-sm">
          <b>Q13.</b> Increase salary of all Clerks by 10%.<br/>
          <code>UPDATE EMPLOYEE SET Salary = Salary*1.1 WHERE Job='Clerk';</code>
        </p>
        <p className="text-sm">
          <b>Q14.</b> Delete employees with no department.<br/>
          <code>DELETE FROM EMPLOYEE WHERE Deptno IS NULL;</code>
        </p>
        <p className="text-sm">
          <b>Q15.</b> Add a CHECK constraint so salary can't be negative (new table since SQLite ALTER is limited).<br/>
          <code>CREATE TABLE EMP2(Eno INT, Salary INT CHECK(Salary&gt;=0));</code>
        </p>
        <p className="text-sm">
          <b>Q16.</b> List students and their sport grade (LEFT JOIN — includes students with no sport record).<br/>
          <code>SELECT Sname, Grade FROM STUDENT LEFT JOIN SPORTS ON STUDENT.Sid=SPORTS.Sid;</code><br/>
          <i>Output:</i> Esha's Grade is NULL (no SPORTS row).
        </p>
        <p className="text-sm">
          <b>Q17.</b> Students playing Cricket or Football.<br/>
          <code>SELECT Sname FROM STUDENT WHERE Sport IN ('Cricket','Football');</code><br/>
          <i>Output:</i> Aarav, Chirag, Faiz.
        </p>
        <p className="text-sm">
          <b>Q18.</b> Count of students per class, only classes with 2+ students.<br/>
          <code>SELECT Class, COUNT(*) FROM STUDENT GROUP BY Class HAVING COUNT(*)&gt;=2;</code><br/>
          <i>Output:</i> XII-A→3, XII-B→2.
        </p>
        <p className="text-sm">
          <b>Q19.</b> Students with no sport assigned.<br/>
          <code>SELECT Sname FROM STUDENT WHERE Sport IS NULL;</code><br/>
          <i>Output:</i> Esha.
        </p>
        <p className="text-sm">
          <b>Q20.</b> Names of students and their coach (join STUDENT & SPORTS).<br/>
          <code>SELECT Sname, Coach FROM STUDENT S, SPORTS SP WHERE S.Sid=SP.Sid;</code><br/>
          <i>Output:</i> Aarav-Mr Rao, Bina-Mr Rao, Chirag-Ms Verma, Divya-Ms Verma, Faiz-Mr Rao.
        </p>
        <p className="text-sm">
          <b>Q21.</b> Second highest salary.<br/>
          <code>SELECT MAX(Salary) FROM EMPLOYEE WHERE Salary &lt; (SELECT MAX(Salary) FROM EMPLOYEE);</code><br/>
          <i>Output:</i> 55000.
        </p>
        <p className="text-sm">
          <b>Q22.</b> Employee names in descending order of salary, ties by name ascending.<br/>
          <code>SELECT Ename FROM EMPLOYEE ORDER BY Salary DESC, Ename ASC;</code>
        </p>
      </Section>

      <Section title="Predict the output — 10 rapid-fire queries">
        <SqlRunner
          setupSql={SETUP}
          initialQuery={`-- Q1
SELECT COUNT(*) FROM student WHERE city IS NULL;
-- Q2
SELECT COUNT(city) FROM student;
-- Q3
SELECT class, COUNT(*) FROM student GROUP BY class;
-- Q4
SELECT name FROM student WHERE name LIKE '%a';
-- Q5
SELECT MAX(marks)-MIN(marks) AS range_ FROM student;
-- Q6
SELECT name FROM student WHERE marks NOT BETWEEN 60 AND 90;
-- Q7
SELECT DISTINCT city FROM student ORDER BY city;
-- Q8
SELECT class, AVG(marks) FROM student GROUP BY class HAVING COUNT(*) > 3;
-- Q9
SELECT name, marks FROM student ORDER BY marks DESC LIMIT 1;
-- Q10
SELECT COUNT(*) FROM student, city;`}
          height={280}
        />
        <ol className="list-decimal space-y-1 pl-5 text-sm">
          <li><b>Q1</b> → 0 (all rows have a city here).</li>
          <li><b>Q2</b> → 8 (COUNT(column) ignores NULLs, but none here).</li>
          <li><b>Q3</b> → XII-A→4, XII-B→4.</li>
          <li><b>Q4</b> → names ending in 'a': Diya, Isha... (check data).</li>
          <li><b>Q5</b> → 92 − 45 = 47.</li>
          <li><b>Q6</b> → rows with marks &lt; 60 or &gt; 90: Mira(58), Vivaan(45), Kabir(92).</li>
          <li><b>Q7</b> → Delhi, Mumbai, Pune (alphabetical).</li>
          <li><b>Q8</b> → only groups with more than 3 rows qualify.</li>
          <li><b>Q9</b> → the single topper row (Kabir, 92).</li>
          <li><b>Q10</b> → 8 × 3 = 24 (Cartesian product).</li>
        </ol>
        <Callout>
          Remember: <code>COUNT(*)</code> counts rows including NULLs;
          <code> COUNT(column)</code> skips NULL values in that column only.
        </Callout>
      </Section>

      <Section title="More MCQs — set 2">
        <QuickCheck question="Which key can accept NULL values (unlike primary key)?"
          options={["Primary key", "Composite key", "Candidate/alternate key", "Super key"]}
          answer="Candidate/alternate key" />
        <QuickCheck question="VARCHAR(20) vs CHAR(20): the key difference is"
          options={["VARCHAR is fixed length", "CHAR uses variable storage", "VARCHAR stores only the actual characters used; CHAR pads with spaces", "No difference"]}
          answer="VARCHAR stores only the actual characters used; CHAR pads with spaces" />
        <QuickCheck question="Which SQL clause is used to sort results?"
          options={["SORT BY", "ORDER BY", "GROUP BY", "ARRANGE BY"]} answer="ORDER BY" />
        <QuickCheck question="LIKE 'S%' matches:"
          options={["names ending with S", "names containing S", "names starting with S", "names of length S"]}
          answer="names starting with S" />
        <QuickCheck question="LIKE '__a' matches names:"
          options={["starting with a, length any", "of exactly 3 characters ending in a", "containing a anywhere", "of exactly 2 characters"]}
          answer="of exactly 3 characters ending in a" />
        <QuickCheck question="Which command changes the structure of an existing table?"
          options={["UPDATE", "ALTER", "MODIFY", "CHANGE"]} answer="ALTER" />
        <QuickCheck question="A composite key is:"
          options={["A key made of exactly one column", "A primary key made of two or more columns together", "Same as foreign key", "A key with default value"]}
          answer="A primary key made of two or more columns together" />
        <QuickCheck question="DEFAULT constraint is used to:"
          options={["Reject duplicate values", "Supply a value automatically when none is given", "Enforce referential integrity", "Sort a column"]}
          answer="Supply a value automatically when none is given" />
        <QuickCheck question="Which of these is NOT a DML command?"
          options={["INSERT", "UPDATE", "DELETE", "CREATE"]} answer="CREATE" />
        <QuickCheck question="GRANT and REVOKE belong to:"
          options={["DDL", "DML", "DCL", "TCL"]} answer="DCL" />
        <QuickCheck question="ROLLBACK is used to:"
          options={["Permanently save changes", "Undo changes since last COMMIT", "Delete a table", "Rename a column"]}
          answer="Undo changes since last COMMIT" />
        <QuickCheck question="In SELECT Deptno, COUNT(*) FROM EMPLOYEE GROUP BY Deptno HAVING COUNT(*)>1, the HAVING filters:"
          options={["Individual rows", "Groups formed by GROUP BY", "Columns", "Tables"]}
          answer="Groups formed by GROUP BY" />
        <QuickCheck question="Which join returns the Cartesian product when no join condition is given?"
          options={["INNER JOIN", "NATURAL JOIN", "Simple SELECT with comma-separated tables", "SELF JOIN"]}
          answer="Simple SELECT with comma-separated tables" />
        <QuickCheck question="A foreign key value must:"
          options={["Always be unique", "Always be NOT NULL", "Match an existing primary key value in the parent table (or be NULL)", "Be a composite key"]}
          answer="Match an existing primary key value in the parent table (or be NULL)" />
      </Section>

      <Section title="Previous Year Questions (PYQs) — extended 2018–2025">
        <PYQ year="CBSE 2018" marks={2}
          question={<>What is the purpose of a primary key? Give an example.</>}
          answer={<>A primary key uniquely identifies each row in a table and cannot contain NULL or duplicate values. Example: <code>Roll INT PRIMARY KEY</code> in a STUDENT table.</>} />
        <PYQ year="CBSE 2019" marks={3}
          question={<>Consider EMPLOYEE(Eno, Ename, Deptno, Salary). Write SQL to (i) display employees earning more than 30000 (ii) display employee count per department (iii) add a new column Bonus.</>}
          answer={<pre className="overflow-x-auto rounded bg-[var(--code-bg)] p-2 text-xs">{`-- (i)
SELECT * FROM EMPLOYEE WHERE Salary > 30000;
-- (ii)
SELECT Deptno, COUNT(*) FROM EMPLOYEE GROUP BY Deptno;
-- (iii)
ALTER TABLE EMPLOYEE ADD Bonus INT;`}</pre>} />
        <PYQ year="CBSE 2020" marks={4}
          question={<>Explain with an example: (i) Candidate key (ii) Alternate key (iii) Degree (iv) Cardinality.</>}
          answer={<>(i) Candidate key — e.g. both Roll and Email could uniquely identify a student, so both are candidate keys. (ii) Alternate key — whichever candidate key is not chosen as primary key, e.g. Email if Roll is primary. (iii) Degree — number of columns, e.g. 5 in STUDENT(Roll,Name,Class,Marks,City). (iv) Cardinality — number of rows currently in the table.</>} />
        <PYQ year="CBSE 2021" marks={2}
          question={<>Differentiate between CHAR and VARCHAR data types.</>}
          answer={<>CHAR(n) is fixed-length and pads unused space with blanks; VARCHAR(n) is variable-length and stores only the characters entered, saving space.</>} />
        <PYQ year="CBSE 2022 Term 2" marks={3}
          question={<>Write outputs for the given EMPLOYEE table for: (i) SELECT COUNT(*) FROM EMPLOYEE; (ii) SELECT COUNT(Deptno) FROM EMPLOYEE; (iii) SELECT MAX(Salary) FROM EMPLOYEE WHERE Sex='F';</>}
          answer={<>Using the EMPLOYEE sample above: (i) 8 rows → 8. (ii) Deptno has one NULL (Farhan) → COUNT(Deptno) = 7. (iii) Max salary among females (Anita 22000, Sunita 21000, Anjali 60000, Arti 23000) → 60000.</>} />
        <PYQ year="CBSE 2023" marks={2}
          question={<>Differentiate between DELETE and DROP commands with example.</>}
          answer={<><p><strong>DELETE</strong> (DML) removes rows but keeps the table structure. <code>DELETE FROM student WHERE marks &lt; 33;</code></p><p><strong>DROP</strong> (DDL) removes the entire table — structure and data. <code>DROP TABLE student;</code></p></>} />
        <PYQ year="CBSE 2024 SQP" marks={4}
          question={<>Consider tables STUDENT(Sid, Sname, Class, Sport) and SPORTS(Sid, Grade, Coach) as given. Write SQL to (i) display student names with their coach (ii) display students who have no sport allotted (iii) count students class-wise (iv) display students with Grade 'A'.</>}
          answer={<pre className="overflow-x-auto rounded bg-[var(--code-bg)] p-2 text-xs">{`-- (i)
SELECT Sname, Coach FROM STUDENT S, SPORTS SP WHERE S.Sid = SP.Sid;
-- (ii)
SELECT Sname FROM STUDENT WHERE Sport IS NULL;
-- (iii)
SELECT Class, COUNT(*) FROM STUDENT GROUP BY Class;
-- (iv)
SELECT Sname FROM STUDENT S, SPORTS SP WHERE S.Sid=SP.Sid AND Grade='A';`}</pre>} />
        <PYQ year="CBSE 2025" marks={3}
          question={<>Write the degree and cardinality of the EMPLOYEE table having columns Eno, Ename, Deptno, Job, Salary, DOJ, Sex and 8 rows of data. Also define referential integrity.</>}
          answer={<>Degree = 7 (number of columns). Cardinality = 8 (number of rows). Referential integrity ensures that a foreign key value in a table must either be NULL or match a primary key value that actually exists in the referenced (parent) table — e.g. EMPLOYEE.Deptno must exist in DEPT.Deptno or be NULL.</>} />
      </Section>

      <Section title="Most repeated board questions — model answers, set 2">
        <MostAsked
          items={[
            {
              q: "Write SQL commands for the following on table EMPLOYEE(Eno,Ename,Deptno,Job,Salary,DOJ,Sex): (i) Add a CHECK constraint that salary must be positive. (ii) Increase salary of all Managers by 10%. (iii) Display employees who joined in the year 2018. (iv) Delete employees with Deptno NULL.",
              marks: 4,
              asked: "2019, 2022, 2024",
              a: "(i) Cannot add CHECK via ALTER in all RDBMS; specify at creation: Salary INT CHECK(Salary>0).\n(ii) UPDATE EMPLOYEE SET Salary = Salary*1.1 WHERE Job='Manager';\n(iii) SELECT * FROM EMPLOYEE WHERE DOJ BETWEEN '2018-01-01' AND '2018-12-31';\n(iv) DELETE FROM EMPLOYEE WHERE Deptno IS NULL;",
            },
            {
              q: "Explain the difference between equi join, natural join and cartesian product with example.",
              marks: 3,
              asked: "2018, 2021, 2023",
              a: "Cartesian product: every row of table A combined with every row of table B (no condition) — SELECT * FROM A, B; produces m*n rows.\nEqui join: cartesian product filtered by an equality condition, e.g. SELECT * FROM EMPLOYEE E, DEPT D WHERE E.Deptno=D.Deptno; — duplicate join column appears twice.\nNatural join: equi join that automatically removes the duplicate common column, keeping it only once: SELECT * FROM EMPLOYEE NATURAL JOIN DEPT;",
            },
            {
              q: "Differentiate between WHERE clause and HAVING clause with suitable example.",
              marks: 2,
              asked: "2018-2024, almost every year",
              a: "WHERE filters individual rows before any grouping and cannot use aggregate functions, e.g. WHERE Salary>30000.\nHAVING filters groups after GROUP BY and can use aggregate functions, e.g. HAVING COUNT(*)>2.",
            },
            {
              q: "What is the purpose of GROUP BY? Write a query to display department-wise total salary only for departments having more than 2 employees.",
              marks: 3,
              asked: "2019, 2022, 2024",
              a: "GROUP BY groups rows sharing the same value into summary rows so aggregate functions can be applied per group.\nSELECT Deptno, SUM(Salary) FROM EMPLOYEE GROUP BY Deptno HAVING COUNT(*)>2;",
            },
            {
              q: "Define referential integrity and entity integrity with example.",
              marks: 2,
              asked: "2020, 2023",
              a: "Entity integrity: the primary key column cannot have NULL or duplicate values, ensuring every row is uniquely identifiable.\nReferential integrity: a foreign key value must either be NULL or match a primary key value already present in the referenced table, e.g. EMPLOYEE.Deptno must exist in DEPT.Deptno.",
            },
            {
              q: "Write SQL to create table DEPT with Deptno as primary key and EMPLOYEE with Deptno as foreign key referencing DEPT.",
              marks: 3,
              asked: "2018, 2020, 2022, SQP 2024",
              a: "CREATE TABLE DEPT (\n  Deptno INT PRIMARY KEY,\n  Dname VARCHAR(20)\n);\n\nCREATE TABLE EMPLOYEE (\n  Eno INT PRIMARY KEY,\n  Ename VARCHAR(25),\n  Deptno INT,\n  Salary INT,\n  FOREIGN KEY (Deptno) REFERENCES DEPT(Deptno)\n);",
            },
            {
              q: "Predict output: SELECT COUNT(*), COUNT(Deptno) FROM EMPLOYEE; when Deptno has 1 NULL value out of 8 rows.",
              marks: 2,
              asked: "2021, 2023, 2025",
              a: "COUNT(*) = 8 (counts all rows regardless of NULLs).\nCOUNT(Deptno) = 7 (ignores the one NULL value in that column).",
            },
            {
              q: "Write SQL to display names of students who play 'Cricket' or 'Football', and names of students who do not play any sport.",
              marks: 3,
              asked: "2019, 2022, SQP 2025",
              a: "SELECT Sname FROM STUDENT WHERE Sport IN ('Cricket','Football');\nSELECT Sname FROM STUDENT WHERE Sport IS NULL;",
            },
          ]}
        />
      </Section>

      </ChapterLayout>
  );
}

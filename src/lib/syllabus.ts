export type Chapter = {
  slug: string;
  title: string;
  unit: string;
  className: "XI" | "XII";
  blurb: string;
};

export const chapters: Chapter[] = [
  // Class XI revision
  {
    slug: "/xi/computer-systems",
    title: "Computer Systems & Boolean Logic",
    unit: "Class XI · Unit 1",
    className: "XI",
    blurb: "Hardware, software, memory units, number systems, Boolean logic.",
  },
  {
    slug: "/xi/python-basics",
    title: "Python Basics & Data Types",
    unit: "Class XI · Unit 2",
    className: "XI",
    blurb: "Variables, operators, conditionals, loops, strings, lists, tuples, dicts.",
  },
  {
    slug: "/xi/society-ethics",
    title: "Society, Law & Ethics",
    unit: "Class XI · Unit 3",
    className: "XI",
    blurb: "Digital footprints, IPR, cybercrime, cyber safety, IT Act.",
  },
  // Class XII
  {
    slug: "/xii/functions",
    title: "Functions in Python",
    unit: "Class XII · Unit 1",
    className: "XII",
    blurb: "User-defined functions, parameters, scope, return values.",
  },
  {
    slug: "/xii/exceptions",
    title: "Exception Handling",
    unit: "Class XII · Unit 1",
    className: "XII",
    blurb: "try-except-finally, raising and catching errors.",
  },
  {
    slug: "/xii/file-handling",
    title: "File Handling (Text, Binary, CSV)",
    unit: "Class XII · Unit 1",
    className: "XII",
    blurb: "Modes, read/write, pickle, csv module, seek/tell.",
  },
  {
    slug: "/xii/stacks",
    title: "Data Structure: Stack",
    unit: "Class XII · Unit 1",
    className: "XII",
    blurb: "Push/pop operations, implementing stack using list.",
  },
  {
    slug: "/xii/networks",
    title: "Computer Networks",
    unit: "Class XII · Unit 2",
    className: "XII",
    blurb: "Topologies, devices, protocols, transmission media, web services.",
  },
  {
    slug: "/xii/dbms",
    title: "Database Management & SQL",
    unit: "Class XII · Unit 3",
    className: "XII",
    blurb: "Relational model, DDL/DML, joins, aggregates, constraints.",
  },
  {
    slug: "/xii/python-sql",
    title: "Python ↔ SQL Connectivity",
    unit: "Class XII · Unit 3",
    className: "XII",
    blurb: "connect(), cursor(), execute(), commit(), fetchone/fetchall.",
  },
];

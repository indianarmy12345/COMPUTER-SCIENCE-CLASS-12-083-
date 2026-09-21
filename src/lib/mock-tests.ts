export type MockSection = "A" | "B" | "C" | "D" | "E";

export type MockQuestion = {
  id: string;
  /** CBSE-style paper section. */
  section: MockSection;
  /** Syllabus area, used for section-wise / topic-wise results. */
  topic: MockTopic;
  marks: number;
  question: string;
  /** Optional code snippet shown with the question. */
  code?: string;
  options: string[];
  /** Index of the correct option. */
  answer: number;
  explanation: string;
};

export type MockTopic =
  | "Python Revision (XI)"
  | "Functions"
  | "Exception Handling"
  | "File Handling"
  | "Stack"
  | "Computer Networks"
  | "Database & SQL"
  | "Python-SQL Connectivity"
  | "Society, Law & Ethics";

export const mockTopics: MockTopic[] = [
  "Python Revision (XI)",
  "Functions",
  "Exception Handling",
  "File Handling",
  "Stack",
  "Computer Networks",
  "Database & SQL",
  "Python-SQL Connectivity",
  "Society, Law & Ethics",
];

export const sectionInfo: Record<MockSection, { label: string; note: string }> = {
  A: { label: "Section A", note: "1-mark objective questions" },
  B: { label: "Section B", note: "2-mark questions" },
  C: { label: "Section C", note: "3-mark questions" },
  D: { label: "Section D", note: "4-mark questions" },
  E: { label: "Section E", note: "5-mark case-study questions" },
};

export type MockTest = {
  slug: string;
  title: string;
  description: string;
  durationMinutes: number;
  questions: MockQuestion[];
};

export const paperOne: MockTest = {
  slug: "paper-1",
  title: "Mock Paper 1 — Full Syllabus",
  description:
    "Full-length Class XII Computer Science (083) practice paper covering every unit: Python revision, functions, exceptions, files, stack, networks, SQL and database connectivity.",
  durationMinutes: 180,
  questions: [
    {
      id: "p1q1",
      section: "A",
      topic: "Python Revision (XI)",
      marks: 1,
      question: "Which of the following is an immutable data type in Python?",
      options: ["list", "dictionary", "tuple", "set"],
      answer: 2,
      explanation: "Tuples cannot be changed after creation; lists, dicts and sets are mutable.",
    },
    {
      id: "p1q2",
      section: "A",
      topic: "Python Revision (XI)",
      marks: 1,
      question: "What is the output of the given code?",
      code: "print(2 ** 3 ** 2)",
      options: ["64", "512", "36", "Error"],
      answer: 1,
      explanation: "** is right associative, so it is 2 ** (3 ** 2) = 2 ** 9 = 512.",
    },
    {
      id: "p1q3",
      section: "A",
      topic: "Python Revision (XI)",
      marks: 1,
      question: "What does the expression evaluate to?",
      code: 's = "Computer"\nprint(s[2:5])',
      options: ["omp", "mpu", "ompu", "put"],
      answer: 1,
      explanation: "Slicing takes indexes 2, 3 and 4 → 'mpu'.",
    },
    {
      id: "p1q4",
      section: "A",
      topic: "Functions",
      marks: 1,
      question: "A function that does not use a return statement returns:",
      options: ["0", "None", "An empty string", "Nothing at all"],
      answer: 1,
      explanation: "Python functions implicitly return None.",
    },
    {
      id: "p1q5",
      section: "A",
      topic: "Functions",
      marks: 1,
      question: "Which statement about default parameters is TRUE?",
      options: [
        "Default parameters must appear before non-default parameters",
        "Default parameters must appear after non-default parameters",
        "A function can have only one default parameter",
        "Default parameters cannot be overridden",
      ],
      answer: 1,
      explanation: "Non-default (positional) parameters must come first in the header.",
    },
    {
      id: "p1q6",
      section: "A",
      topic: "Exception Handling",
      marks: 1,
      question: "Which block always executes whether or not an exception occurs?",
      options: ["try", "except", "else", "finally"],
      answer: 3,
      explanation: "finally runs in every case, and is used for clean-up such as closing files.",
    },
    {
      id: "p1q7",
      section: "A",
      topic: "Exception Handling",
      marks: 1,
      question: "Dividing by zero in Python raises:",
      options: ["ValueError", "ZeroDivisionError", "ArithmeticFault", "TypeError"],
      answer: 1,
      explanation: "ZeroDivisionError is raised for 10/0.",
    },
    {
      id: "p1q8",
      section: "A",
      topic: "File Handling",
      marks: 1,
      question: "Which file mode opens a binary file for reading and writing without truncating it?",
      options: ["wb", "rb+", "ab", "r"],
      answer: 1,
      explanation: "'rb+' opens an existing binary file for read and write; 'wb' truncates.",
    },
    {
      id: "p1q9",
      section: "A",
      topic: "File Handling",
      marks: 1,
      question: "Which function returns the current position of the file pointer?",
      options: ["seek()", "tell()", "pos()", "flush()"],
      answer: 1,
      explanation: "tell() returns the byte offset of the file pointer.",
    },
    {
      id: "p1q10",
      section: "A",
      topic: "Stack",
      marks: 1,
      question: "A stack follows which principle?",
      options: ["FIFO", "LIFO", "Round robin", "Priority order"],
      answer: 1,
      explanation: "The last element pushed is the first popped (Last In First Out).",
    },
    {
      id: "p1q11",
      section: "A",
      topic: "Stack",
      marks: 1,
      question: "Popping from an empty stack is called:",
      options: ["Overflow", "Underflow", "Segmentation", "Traversal"],
      answer: 1,
      explanation: "Underflow occurs when a pop/peek is attempted on an empty stack.",
    },
    {
      id: "p1q12",
      section: "A",
      topic: "Computer Networks",
      marks: 1,
      question: "Which device forwards data only to the intended destination port using MAC addresses?",
      options: ["Hub", "Repeater", "Switch", "Modem"],
      answer: 2,
      explanation: "A switch is an intelligent device that uses MAC addresses.",
    },
    {
      id: "p1q13",
      section: "A",
      topic: "Computer Networks",
      marks: 1,
      question: "Which protocol is used to transfer files between a client and a server?",
      options: ["FTP", "SMTP", "PPP", "VoIP"],
      answer: 0,
      explanation: "FTP (File Transfer Protocol) transfers files.",
    },
    {
      id: "p1q14",
      section: "A",
      topic: "Database & SQL",
      marks: 1,
      question: "Which clause is used with aggregate functions to filter grouped rows?",
      options: ["WHERE", "HAVING", "ORDER BY", "DISTINCT"],
      answer: 1,
      explanation: "HAVING filters groups after GROUP BY; WHERE filters individual rows.",
    },
    {
      id: "p1q15",
      section: "A",
      topic: "Database & SQL",
      marks: 1,
      question: "What will COUNT(*) return for a table of 8 rows where the column Marks has 3 NULLs?",
      options: ["5", "8", "3", "Error"],
      answer: 1,
      explanation: "COUNT(*) counts all rows including NULLs; COUNT(Marks) would give 5.",
    },
    {
      id: "p1q16",
      section: "A",
      topic: "Python-SQL Connectivity",
      marks: 1,
      question: "Which method must be called after an INSERT so the change is saved permanently?",
      options: ["cursor()", "commit()", "fetchall()", "close()"],
      answer: 1,
      explanation: "connection.commit() makes DML changes permanent.",
    },
    {
      id: "p1q17",
      section: "A",
      topic: "Python-SQL Connectivity",
      marks: 1,
      question: "fetchone() returns:",
      options: ["A list of tuples", "A single tuple or None", "A dictionary", "An integer count"],
      answer: 1,
      explanation: "fetchone() returns the next row as a tuple, or None when exhausted.",
    },
    {
      id: "p1q18",
      section: "A",
      topic: "Society, Law & Ethics",
      marks: 1,
      question: "Stealing and using someone else's work without credit is:",
      options: ["Phishing", "Plagiarism", "Hacking", "Spamming"],
      answer: 1,
      explanation: "Plagiarism is presenting another person's work as your own.",
    },
    {
      id: "p1q19",
      section: "A",
      topic: "Society, Law & Ethics",
      marks: 1,
      question: "Discarded computers, mobiles and batteries are collectively called:",
      options: ["e-waste", "Cyber trash", "Digital footprint", "Malware"],
      answer: 0,
      explanation: "Electronic waste (e-waste) must be recycled responsibly.",
    },
    {
      id: "p1q20",
      section: "A",
      topic: "Python Revision (XI)",
      marks: 1,
      question: "What is the output?",
      code: "d = {1: 'a', 2: 'b'}\nd[1] = 'c'\nprint(len(d))",
      options: ["1", "2", "3", "Error"],
      answer: 1,
      explanation: "Assigning to an existing key updates it, so the length stays 2.",
    },
    {
      id: "p1q21",
      section: "B",
      topic: "Functions",
      marks: 2,
      question: "What is the output?",
      code: "def f(x, y=[]):\n    y.append(x)\n    return y\nprint(f(1))\nprint(f(2))",
      options: ["[1] then [2]", "[1] then [1, 2]", "[1] then [1]", "Error"],
      answer: 1,
      explanation: "The mutable default list is created once and reused across calls.",
    },
    {
      id: "p1q22",
      section: "B",
      topic: "Functions",
      marks: 2,
      question: "Find the output.",
      code: "x = 10\ndef change():\n    global x\n    x = x + 5\nchange()\nprint(x)",
      options: ["10", "15", "5", "Error"],
      answer: 1,
      explanation: "global lets the function rebind the module-level x to 15.",
    },
    {
      id: "p1q23",
      section: "B",
      topic: "File Handling",
      marks: 2,
      question: "Which statement correctly reads all lines of a text file into a list?",
      options: [
        "f.read()",
        "f.readline()",
        "f.readlines()",
        "f.load()",
      ],
      answer: 2,
      explanation: "readlines() returns a list of lines including '\\n' characters.",
    },
    {
      id: "p1q24",
      section: "B",
      topic: "Exception Handling",
      marks: 2,
      question: "What is the output?",
      code: "try:\n    print(int('12a'))\nexcept ValueError:\n    print('bad')\nfinally:\n    print('done')",
      options: ["12a done", "bad done", "bad", "done bad"],
      answer: 1,
      explanation: "int('12a') raises ValueError → 'bad', then finally prints 'done'.",
    },
    {
      id: "p1q25",
      section: "B",
      topic: "Stack",
      marks: 2,
      question: "After the operations push(5), push(9), pop(), push(3), what is the top of the stack?",
      options: ["5", "9", "3", "Stack is empty"],
      answer: 2,
      explanation: "9 is removed by pop(), then 3 is pushed and becomes the top.",
    },
    {
      id: "p1q26",
      section: "B",
      topic: "Computer Networks",
      marks: 2,
      question: "Which topology needs the most cable but keeps working if one link fails?",
      options: ["Bus", "Star", "Mesh", "Tree"],
      answer: 2,
      explanation: "Mesh connects every node to every other node, giving redundancy at high cost.",
    },
    {
      id: "p1q27",
      section: "B",
      topic: "Database & SQL",
      marks: 2,
      question: "Which command removes a column from an existing table?",
      options: [
        "DELETE FROM table COLUMN col;",
        "ALTER TABLE table DROP COLUMN col;",
        "UPDATE table REMOVE col;",
        "DROP TABLE table.col;",
      ],
      answer: 1,
      explanation: "ALTER TABLE ... DROP COLUMN is the DDL command to remove a column.",
    },
    {
      id: "p1q28",
      section: "C",
      topic: "Database & SQL",
      marks: 3,
      question:
        "Table STUDENT(Name, Stream, Marks). Which query shows each stream with its highest marks, only for streams whose average is above 60?",
      options: [
        "SELECT Stream, MAX(Marks) FROM STUDENT WHERE AVG(Marks) > 60 GROUP BY Stream;",
        "SELECT Stream, MAX(Marks) FROM STUDENT GROUP BY Stream HAVING AVG(Marks) > 60;",
        "SELECT Stream, MAX(Marks) FROM STUDENT HAVING AVG(Marks) > 60;",
        "SELECT Stream, MAX(Marks) FROM STUDENT ORDER BY Stream HAVING AVG(Marks) > 60;",
      ],
      answer: 1,
      explanation: "Group-level conditions on aggregates require HAVING after GROUP BY.",
    },
    {
      id: "p1q29",
      section: "C",
      topic: "File Handling",
      marks: 3,
      question:
        "A CSV file 'stu.csv' must be appended to without extra blank lines on Windows. Which open() call is correct?",
      options: [
        "open('stu.csv', 'a')",
        "open('stu.csv', 'a', newline='')",
        "open('stu.csv', 'w', newline='')",
        "open('stu.csv', 'rb+')",
      ],
      answer: 1,
      explanation: "Append mode with newline='' prevents the csv writer adding blank rows.",
    },
    {
      id: "p1q30",
      section: "C",
      topic: "Python-SQL Connectivity",
      marks: 3,
      question: "Which snippet safely inserts user input into a table?",
      code: "# choose the safe parameterised form",
      options: [
        "cur.execute(\"INSERT INTO stu VALUES('\" + nm + \"')\")",
        "cur.execute(\"INSERT INTO stu VALUES(%s)\", (nm,))",
        "cur.execute(f\"INSERT INTO stu VALUES({nm})\")",
        "cur.execute(\"INSERT INTO stu VALUES(%s)\" % nm)",
      ],
      answer: 1,
      explanation: "Passing values as a tuple with %s placeholders avoids SQL injection.",
    },
    {
      id: "p1q31",
      section: "D",
      topic: "Computer Networks",
      marks: 4,
      question:
        "A school has 4 blocks in one campus and a branch 40 km away. Which pair of terms best describes the two networks?",
      options: ["LAN and MAN", "LAN and WAN", "MAN and WAN", "PAN and LAN"],
      answer: 1,
      explanation: "A single campus is a LAN; a link 40 km away falls under a WAN.",
    },
    {
      id: "p1q32",
      section: "D",
      topic: "Database & SQL",
      marks: 4,
      question:
        "Tables EMP(Eno, Name, Dno) and DEPT(Dno, Dname). Which query lists employee names with their department names?",
      options: [
        "SELECT Name, Dname FROM EMP, DEPT;",
        "SELECT Name, Dname FROM EMP, DEPT WHERE EMP.Dno = DEPT.Dno;",
        "SELECT Name, Dname FROM EMP JOIN DEPT;",
        "SELECT Name, Dname FROM EMP WHERE Dno IN DEPT;",
      ],
      answer: 1,
      explanation: "Without the join condition you get a Cartesian product.",
    },
    {
      id: "p1q33",
      section: "D",
      topic: "File Handling",
      marks: 4,
      question:
        "A binary file 'emp.dat' stores dictionaries with pickle. To count records with salary above 50000 you must:",
      options: [
        "Read the file once with pickle.load() inside a loop until EOFError",
        "Use f.readlines() and split each line",
        "Open in 'r' mode and use csv.reader",
        "Use pickle.dump() in a loop",
      ],
      answer: 0,
      explanation: "Each pickle.load() reads one object; the loop ends when EOFError is raised.",
    },
    {
      id: "p1q34",
      section: "E",
      topic: "Python-SQL Connectivity",
      marks: 5,
      question:
        "Case study: a menu-driven program updates marks. Which order of operations is correct?",
      options: [
        "connect → cursor → execute → commit → close",
        "cursor → connect → execute → close → commit",
        "connect → execute → cursor → commit → close",
        "connect → cursor → commit → execute → close",
      ],
      answer: 0,
      explanation: "You need a connection, then a cursor, then execute, commit and finally close.",
    },
    {
      id: "p1q35",
      section: "E",
      topic: "Stack",
      marks: 5,
      question:
        "Case study: a list 'st' is used as a stack of customer IDs. Which pair of statements correctly implements push and pop?",
      options: [
        "st.append(x) and st.pop()",
        "st.insert(0, x) and st.pop()",
        "st.append(x) and st.pop(0)",
        "st.add(x) and st.remove()",
      ],
      answer: 0,
      explanation: "append() adds at the top (end) and pop() removes from the same end → LIFO.",
    },
  ],
};

import { createFileRoute } from "@tanstack/react-router";
import { ChapterLayout, Section, Callout, QuickCheck, PYQ, MostAsked } from "@/components/ChapterLayout";
import { PyRunner } from "@/components/PyRunner";

export const Route = createFileRoute("/xi/python-basics")({
  head: () => ({
    meta: [
      { title: "Python Basics & Data Types — CS 083 Class XI" },
      {
        name: "description",
        content:
          "Comprehensive Python revision: tokens, variables, data types, operators, conditionals, loops, strings, lists, tuples, sets and dictionaries with runnable examples.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <ChapterLayout slug="/xi/python-basics">
      <Section title="Why Python?">
        <p>
          Python is a <b>high-level, interpreted, object-oriented</b> language created
          by Guido van Rossum (1991). It is free, open-source, portable, has a huge
          standard library and a very readable syntax — which is why CBSE chose it.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Interpreted</b> — runs line by line, no separate compile step.</li>
          <li><b>Dynamically typed</b> — you don't declare a variable's type.</li>
          <li><b>Cross-platform</b> — same code runs on Windows, Linux, Mac, Android.</li>
          <li><b>Used by</b> Instagram, YouTube, Dropbox, NASA, Netflix and ISRO.</li>
        </ul>
      </Section>

      <Section title="Tokens — the building blocks">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Keywords</b> — reserved words: <code>if, else, while, for, def, class, return, True, False, None, import, in, not, and, or, lambda, try, except, finally, with, as, pass, break, continue, global, nonlocal</code>.</li>
          <li><b>Identifiers</b> — names you create. Must start with a letter or _, then letters/digits/_ . Case-sensitive (<code>Age</code> ≠ <code>age</code>).</li>
          <li><b>Literals</b> — fixed values: numbers, strings, booleans, <code>None</code>.</li>
          <li><b>Operators</b> — arithmetic, relational, logical, assignment, bitwise, membership, identity.</li>
          <li><b>Punctuators</b> — <code>: , ( ) [ ] {`{ }`}</code></li>
        </ul>
        <Callout label="Indentation matters">
          Python uses indentation (4 spaces by convention) instead of <code>{`{ }`}</code>.
          Mixing tabs and spaces causes <code>IndentationError</code>.
        </Callout>
      </Section>

      <Section title="Hello, Python — and the input/print pair">
        <PyRunner
          initialCode={`name = "CBSE Student"
age = 17
height = 5.6
is_topper = True

print("Hello,", name)
print("Age:", age, "Height:", height, "ft, Topper?", is_topper)
print(type(name), type(age), type(height), type(is_topper))

# f-string formatting
print(f"{name} is {age} years old.")
print(f"{name:>20} | {age:03d}")  # width and zero-padding`}
        />
      </Section>

      <Section title="Numbers, strings, type conversion">
        <p>
          Built-in numeric types: <b>int</b>, <b>float</b>, <b>complex</b>. Convert with
          <code> int(), float(), str(), bool()</code>.
        </p>
        <PyRunner
          initialCode={`x = "42"          # string
y = int(x) + 8    # convert to int
print(y, type(y))

pi = float("3.14")
print(pi * 2)

# bool() truthiness
print(bool(0), bool(""), bool([]), bool("hi"), bool(-5))

# complex numbers
z = 2 + 3j
print(z.real, z.imag, abs(z))`}
        />
      </Section>

      <Section title="Operators & expressions">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Arithmetic</b>: <code>+ - * / // % **</code></li>
          <li><b>Relational</b>: <code>== != &lt; &lt;= &gt; &gt;=</code></li>
          <li><b>Logical</b>: <code>and or not</code></li>
          <li><b>Assignment</b>: <code>= += -= *= /= //= %= **=</code></li>
          <li><b>Bitwise</b>: <code>&amp; | ^ ~ &lt;&lt; &gt;&gt;</code></li>
          <li><b>Membership</b>: <code>in, not in</code></li>
          <li><b>Identity</b>: <code>is, is not</code></li>
        </ul>
        <PyRunner
          initialCode={`a, b = 17, 5
print("sum =", a + b, "diff =", a - b)
print("int div =", a // b, "mod =", a % b, "power =", a ** b)
print("compare:", a > b, a == b, a != b)
print("logical:", (a > 0) and (b > 0), not (a == b))
print("bitwise: 5 & 3 =", 5 & 3, ", 5 | 3 =", 5 | 3, ", 5 ^ 3 =", 5 ^ 3)
print("membership:", "a" in "cat", 7 in [1,2,3])
print("identity:", a is b, a is not b)`}
        />
      </Section>

      <Section title="if / elif / else">
        <Callout>
          Real-world: deciding pass/fail, computing income tax slabs, choosing the
          cheapest delivery option, lighting a green/yellow/red traffic signal.
        </Callout>
        <PyRunner
          initialCode={`marks = 72
if marks >= 90:
    grade = "A1"
elif marks >= 75:
    grade = "A"
elif marks >= 60:
    grade = "B"
elif marks >= 33:
    grade = "C"
else:
    grade = "FAIL"
print("Grade:", grade)

# nested if
age, has_id = 19, True
if age >= 18:
    if has_id:
        print("Allowed to vote ✓")
    else:
        print("Bring your ID")
else:
    print("Too young")`}
        />
      </Section>

      <Section title="while & for loops">
        <PyRunner
          initialCode={`# while — sum 1..n
n = 10
total, i = 0, 1
while i <= n:
    total += i
    i += 1
print("sum 1..10 =", total)

# for with range
for i in range(1, 6):
    print(i, "squared =", i*i)

# range(start, stop, step)
print(list(range(10, 0, -2)))   # [10,8,6,4,2]

# loop with else  (runs if loop completes without break)
for x in [3,5,7,9]:
    if x % 2 == 0:
        print("found even"); break
else:
    print("no even number")

# break and continue
for x in range(1, 8):
    if x == 4: continue   # skip 4
    if x == 6: break      # stop at 6
    print(x, end=" ")`}
          height={300}
        />
      </Section>

      <Section title="Strings — sequences of characters">
        <p>
          Strings are <b>immutable</b>. Use single, double or triple quotes. Indexing
          starts at 0; negative indices count from the end.
        </p>
        <PyRunner
          initialCode={`s = "Computer Science"
print(len(s), s[0], s[-1])
print(s[0:8], s[9:], s[::-1])      # slicing

print(s.upper(), s.lower(), s.title())
print(s.replace("Science", "Sci"))
print(s.split(), "Joined →", "-".join(s.split()))
print(s.startswith("Comp"), s.endswith("ce"))
print("e count:", s.count("e"), "find 'Sci':", s.find("Sci"))

# string is immutable
# s[0] = "X"   # TypeError

# membership
print("Sci" in s, "Math" not in s)`}
          height={280}
        />
      </Section>

      <Section title="Lists — mutable sequences">
        <PyRunner
          initialCode={`nums = [10, 7, 3, 8, 5]
nums.append(12)
nums.insert(0, 99)
nums.extend([4, 6])
print("after add:", nums)

nums.remove(3)        # removes first 3
last = nums.pop()     # removes last
print("after remove/pop:", nums, "popped:", last)

nums.sort()
print("sorted asc:", nums)
nums.sort(reverse=True)
print("sorted desc:", nums)

print("max:", max(nums), "min:", min(nums), "sum:", sum(nums), "avg:", sum(nums)/len(nums))

# list comprehension
squares = [x*x for x in range(1, 6)]
even    = [x for x in nums if x % 2 == 0]
print(squares, even)`}
          height={300}
        />
      </Section>

      <Section title="Tuples — immutable sequences">
        <PyRunner
          initialCode={`point = (3, 4)            # parentheses optional
single = (5,)             # comma needed for 1-element tuple
print(point, len(point), single)

# unpacking
x, y = point
print("x =", x, "y =", y)

# tuple methods (only count and index)
t = (1, 2, 3, 2, 4, 2)
print("count of 2:", t.count(2), "index of 4:", t.index(4))

# tuples as dict keys (immutable → hashable)
d = {(0,0): "origin", (1,2): "A"}
print(d[(1,2)])`}
        />
      </Section>

      <Section title="Sets — unique, unordered">
        <PyRunner
          initialCode={`a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
print("union:", a | b)
print("intersection:", a & b)
print("difference a-b:", a - b)
print("symmetric diff:", a ^ b)

a.add(10); a.discard(2)
print(a)

# remove duplicates from list
nums = [1,1,2,3,3,4,5,5]
print(list(set(nums)))`}
        />
      </Section>

      <Section title="Dictionaries — key/value pairs">
        <PyRunner
          initialCode={`student = {"roll": 1, "name": "Aarav", "marks": 88}
student["grade"] = "A"          # add
student["marks"] = 92           # update
print(student)

print("keys:", list(student.keys()))
print("values:", list(student.values()))
print("items:", list(student.items()))

# safe access
print(student.get("city", "N/A"))

# iterate
for k, v in student.items():
    print(f"{k:>6} : {v}")

# dict comprehension — squares
sq = {x: x*x for x in range(1,6)}
print(sq)`}
          height={300}
        />
      </Section>

      <Section title="Common built-in functions">
        <PyRunner
          initialCode={`print(abs(-7), pow(2,10), divmod(17,5), round(3.14159, 2))
print(min(4,7,1,9), max("banana"), sum([1,2,3,4]))
print(sorted([3,1,4,1,5,9,2,6]), sorted("zebra"))
print(list(map(lambda x: x*2, [1,2,3])))
print(list(filter(lambda x: x%2==0, range(10))))
print(list(zip(["a","b","c"], [1,2,3])))
print(list(enumerate(["sun","mon","tue"], start=1)))`}
          height={220}
        />
      </Section>

      <Section title="Practice">
        <QuickCheck
          question="Which data type is immutable?"
          options={["list", "tuple", "dict", "set"]}
          answer="tuple"
        />
        <QuickCheck
          question="What does 17 // 5 evaluate to in Python?"
          answer="3"
          hint="// is floor division (integer quotient)."
        />
        <QuickCheck
          question="Which keyword skips the rest of the loop body and continues with the next iteration?"
          options={["break", "pass", "continue", "exit"]}
          answer="continue"
        />
      </Section>
    
        <Section title="Deeper theory: identity, equality & immutability">
          <p>
            Python has two comparison operators that look similar but mean very
            different things. <code>==</code> checks <strong>value equality</strong>;
            <code>is</code> checks <strong>identity</strong> (whether two names
            point to the same object in memory). <code>id(x)</code> returns the
            memory address.
          </p>
          <ul className="ml-5 list-disc space-y-1 text-sm">
            <li><strong>Immutable</strong>: int, float, bool, str, tuple, frozenset — every "modification" creates a new object.</li>
            <li><strong>Mutable</strong>: list, dict, set — can be changed in place.</li>
            <li>Strings support indexing (<code>s[0]</code>), slicing (<code>s[1:4]</code>) and methods like <code>upper()</code>, <code>strip()</code>, <code>split()</code>, <code>replace()</code>, <code>find()</code>.</li>
            <li>Lists support <code>append</code>, <code>extend</code>, <code>insert</code>, <code>pop</code>, <code>remove</code>, <code>sort</code>, <code>reverse</code>, list comprehensions.</li>
            <li>Dicts: keys must be immutable; common methods <code>get</code>, <code>keys</code>, <code>values</code>, <code>items</code>, <code>update</code>, <code>pop</code>.</li>
          </ul>
          <p className="text-sm">
            <strong>Operator precedence (high → low):</strong> <code>**</code>,
            unary <code>+/-</code>, <code>* / // %</code>, <code>+ -</code>,
            comparison, <code>not</code>, <code>and</code>, <code>or</code>.
            Use parentheses when in doubt.
          </p>
        </Section>

        <Section title="Previous Year Questions (PYQs)">
          <PYQ year="CBSE 2023" marks={1}
            question={<>What is the output of <code>print(2 ** 3 ** 2)</code>?</>}
            answer={<><code>**</code> is right-associative, so it evaluates as <code>2 ** (3 ** 2)</code> = <code>2 ** 9</code> = <strong>512</strong>.</>}
          />
          <PYQ year="CBSE 2022" marks={2}
            question={<>Differentiate between a list and a tuple with an example.</>}
            answer={<>
              <p><strong>List</strong> is mutable, written with <code>[]</code> — items can be changed, added, removed. <code>L = [1,2,3]; L[0] = 9</code>.</p>
              <p><strong>Tuple</strong> is immutable, written with <code>()</code> — once created cannot be modified. <code>T = (1,2,3); T[0] = 9</code> raises <code>TypeError</code>.</p>
            </>}
          />
          <PYQ year="CBSE 2024" marks={2}
            question={<>Predict output: <code>s = "Computer"; print(s[2:6], s[::-1])</code></>}
            answer={<>
              <p><code>s[2:6]</code> → <strong>"mput"</strong> (chars at index 2,3,4,5)</p>
              <p><code>s[::-1]</code> → <strong>"retupmoC"</strong> (full string reversed)</p>
            </>}
          />
        </Section>

        <Section title="More MCQs">
          <QuickCheck question="Which of these is immutable?"
            options={["list", "set", "dict", "tuple"]} answer="tuple" />
          <QuickCheck question="Result of 17 // 5 in Python?"
            options={["3.4", "3", "2", "4"]} answer="3" />
          <QuickCheck question="Which method removes leading and trailing whitespace?"
            options={["strip()", "trim()", "clean()", "cut()"]} answer="strip()" />
          <QuickCheck question="Type of value returned by input()?"
            options={["int", "float", "str", "depends on input"]} answer="str" />
          <QuickCheck question="Which keyword exits a loop early?"
            options={["exit", "stop", "break", "return"]} answer="break" />
        </Section>
        <Section title="Most repeated board questions">
          <MostAsked
            items={[
              {
                q: "Differentiate between mutable and immutable types with examples.",
                marks: 2,
                asked: "2019, 2022, 2024",
                a: "Mutable objects can be changed in place — list, dict, set. Immutable objects cannot be changed after creation — int, float, str, tuple, bool. Modifying an immutable object creates a new object with a new id().",
              },
              {
                q: "Find the output:\n\nL = [1, 2, 3, 4, 5]\nprint(L[1:4])\nprint(L[::-1])\nprint(L[-2:])",
                marks: 2,
                asked: "2020, 2023",
                a: "[2, 3, 4]\n[5, 4, 3, 2, 1]\n[4, 5]",
              },
              {
                q: "Write a program to input 10 numbers and print the largest and the sum of even numbers.",
                marks: 3,
                asked: "2019, 2021, 2024 SQP",
                a: "nums = []\nfor i in range(10):\n    nums.append(int(input('Enter number: ')))\nbig = nums[0]\ns = 0\nfor n in nums:\n    if n > big:\n        big = n\n    if n % 2 == 0:\n        s += n\nprint('Largest =', big)\nprint('Sum of even =', s)",
              },
              {
                q: "Differentiate between a list and a tuple. When would you prefer a tuple?",
                marks: 2,
                asked: "2020, 2022, 2024",
                a: "A list is mutable and written with [ ]; a tuple is immutable and written with ( ). Tuples are faster, can be dictionary keys and protect data from accidental change, so they are preferred for fixed collections such as coordinates or constant records.",
              },
              {
                q: "What is the difference between == and is? And between / , // and % ?",
                marks: 2,
                asked: "2021, 2023",
                a: "== compares values; is compares identity (whether both names refer to the same object).\n/ gives true division (float), // gives floor division (integer part toward -infinity), % gives the remainder.",
              },
            ]}
          />
        </Section>

      </ChapterLayout>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { ChapterLayout, Section, Callout } from "@/components/ChapterLayout";
import { PyRunner } from "@/components/PyRunner";

export const Route = createFileRoute("/xi/python-basics")({
  head: () => ({
    meta: [
      { title: "Python Basics & Data Types — CS 083 Class XI" },
      {
        name: "description",
        content:
          "Quick revision of Python: variables, operators, conditionals, loops, strings, lists, tuples and dictionaries with runnable examples.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <ChapterLayout slug="/xi/python-basics">
      <Section title="Hello, Python">
        <p>
          Python runs line by line (interpreted). Use <code>print()</code> to display,{" "}
          <code>input()</code> to read.
        </p>
        <PyRunner
          initialCode={`name = "CBSE Student"
age = 17
print("Hello,", name, "— age:", age)
print(type(name), type(age), type(3.14), type(True))`}
        />
      </Section>

      <Section title="Operators & expressions">
        <PyRunner
          initialCode={`a, b = 17, 5
print("sum =", a + b)
print("int div =", a // b, "mod =", a % b, "power =", a ** b)
print("compare:", a > b, a == b)
print("logical:", (a > 0) and (b > 0), not (a == b))`}
        />
      </Section>

      <Section title="Conditionals & loops">
        <Callout>
          Real-world: deciding pass/fail, counting steps in a fitness tracker, looping
          over a playlist.
        </Callout>
        <PyRunner
          initialCode={`marks = 72
if marks >= 75:
    grade = "A"
elif marks >= 60:
    grade = "B"
else:
    grade = "C"
print("Grade:", grade)

# print first 5 squares
for i in range(1, 6):
    print(i, "->", i*i)`}
        />
      </Section>

      <Section title="Strings, lists, tuples, dicts">
        <PyRunner
          height={260}
          initialCode={`s = "Computer Science"
print(s.upper(), s.lower(), s.replace("Science","Sci"))
print("words:", s.split())

nums = [10, 7, 3, 8, 5]
nums.sort()
print("sorted:", nums, "max:", max(nums), "sum:", sum(nums))

point = (3, 4)   # tuple — immutable
print("point:", point, "len:", len(point))

student = {"roll": 1, "name": "Aarav", "marks": 88}
student["grade"] = "A"
print(student)
print("keys:", list(student.keys()))`}
        />
      </Section>
    </ChapterLayout>
  );
}

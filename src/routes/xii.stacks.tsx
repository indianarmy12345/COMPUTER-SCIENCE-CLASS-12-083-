import { createFileRoute } from "@tanstack/react-router";
import { ChapterLayout, Section, Callout } from "@/components/ChapterLayout";
import { PyRunner } from "@/components/PyRunner";

export const Route = createFileRoute("/xii/stacks")({
  head: () => ({
    meta: [
      { title: "Stacks in Python — CS 083 Class XII" },
      {
        name: "description",
        content:
          "Learn the Stack data structure (LIFO), push and pop operations, and implement a stack using a Python list with worked examples.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <ChapterLayout slug="/xii/stacks">
      <Section title="What is a stack?">
        <p>
          A <b>stack</b> is a <b>LIFO</b> (Last-In-First-Out) data structure. The last
          item pushed is the first one popped.
        </p>
        <Callout>
          Real-world: <b>Browser back button</b> — every page you visit is pushed onto a
          stack; pressing back pops the most recent one. <b>Undo</b> in MS Word works
          the same way.
        </Callout>
      </Section>

      <Section title="Implementing a stack with a list">
        <PyRunner
          height={320}
          initialCode={`class Stack:
    def __init__(self):
        self.items = []

    def push(self, x):
        self.items.append(x)

    def pop(self):
        if self.is_empty():
            return "Underflow"
        return self.items.pop()

    def peek(self):
        return self.items[-1] if self.items else None

    def is_empty(self):
        return len(self.items) == 0

    def display(self):
        print("Stack (top -> bottom):", list(reversed(self.items)))


s = Stack()
for x in [10, 20, 30, 40]:
    s.push(x)
    print("pushed", x)
s.display()
print("peek:", s.peek())
print("pop:", s.pop())
print("pop:", s.pop())
s.display()`}
        />
      </Section>

      <Section title="Practical: balanced brackets">
        <PyRunner
          initialCode={`def balanced(expr):
    pairs = {')':'(', ']':'[', '}':'{'}
    stack = []
    for ch in expr:
        if ch in "([{":
            stack.append(ch)
        elif ch in ")]}":
            if not stack or stack.pop() != pairs[ch]:
                return False
    return not stack

for e in ["(a+b)", "[(a+b)*c]", "(a+b]", "((a)"]:
    print(e, "->", balanced(e))`}
        />
      </Section>
    </ChapterLayout>
  );
}

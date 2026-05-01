import { createFileRoute } from "@tanstack/react-router";
import { ChapterLayout, Section, Callout, QuickCheck, PYQ } from "@/components/ChapterLayout";
import { PyRunner } from "@/components/PyRunner";

export const Route = createFileRoute("/xii/stacks")({
  head: () => ({
    meta: [
      { title: "Stacks in Python — CS 083 Class XII" },
      {
        name: "description",
        content:
          "Stack data structure (LIFO) — concept, operations, list-based implementation, applications: balanced brackets, infix→postfix, undo/redo, function call stack.",
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
          A <b>stack</b> is a linear data structure following the <b>LIFO</b>
          (Last-In-First-Out) principle. The last item pushed is the first to be popped.
          Think of a stack of plates — you can only add or remove from the top.
        </p>
        <Callout>
          Real-world stacks:
          <ul className="mt-1 list-disc space-y-0.5 pl-5">
            <li><b>Browser back button</b> — every page visited is pushed; back pops.</li>
            <li><b>Undo (Ctrl+Z)</b> in MS Word, Photoshop, VS Code.</li>
            <li><b>Function calls</b> — Python's call stack remembers where to return after each function ends.</li>
            <li><b>Expression evaluation</b> — calculators convert infix to postfix using a stack.</li>
            <li>A <b>browser tab history</b>, an <b>UNO discard pile</b>, a <b>printer queue's "reverse order"</b>.</li>
          </ul>
        </Callout>
      </Section>

      <Section title="Standard operations">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>push(x)</b> — add x on top.</li>
          <li><b>pop()</b> — remove and return top item; <b>underflow</b> if empty.</li>
          <li><b>peek() / top()</b> — return top without removing.</li>
          <li><b>is_empty()</b> — true if no elements.</li>
          <li><b>size()</b> — number of elements.</li>
          <li><b>display()</b> — show contents (top to bottom or bottom to top).</li>
        </ul>
        <p>
          Time complexity of push/pop/peek = <b>O(1)</b> — constant time, because
          we only ever touch the top.
        </p>
      </Section>

      <Section title="Implementing a stack with a Python list">
        <p>
          Python's built-in <code>list</code> already supports <code>append()</code>
          (push) and <code>pop()</code> in O(1) at the end — perfect for a stack.
        </p>
        <PyRunner
          height={380}
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

    def size(self):
        return len(self.items)

    def display(self):
        print("Stack (top -> bottom):", list(reversed(self.items)))


s = Stack()
for x in [10, 20, 30, 40]:
    s.push(x)
    print("pushed", x)
s.display()
print("peek:", s.peek())
print("size:", s.size())
print("pop:", s.pop())
print("pop:", s.pop())
s.display()
print("pop x3:", s.pop(), s.pop(), s.pop())   # underflow on the 3rd`}
        />
      </Section>

      <Section title="Stack using only functions (no class)">
        <PyRunner
          initialCode={`def push(stk, x): stk.append(x)
def pop(stk):    return stk.pop() if stk else "Underflow"
def peek(stk):   return stk[-1] if stk else None

s = []
for c in "HELLO":
    push(s, c)
print(s)

reversed_str = ""
while s:
    reversed_str += pop(s)
print("reversed:", reversed_str)`}
        />
      </Section>

      <Section title="Application 1 — Reverse a string">
        <PyRunner
          initialCode={`def reverse(text):
    stack = list(text)         # push every char
    out = ""
    while stack:
        out += stack.pop()      # pop in LIFO order
    return out

print(reverse("computer"))
print(reverse("CBSE 2026"))`}
        />
      </Section>

      <Section title="Application 2 — Balanced brackets checker">
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
    return not stack          # true only if stack is empty

for e in ["(a+b)", "[(a+b)*c]", "(a+b]", "((a)", "{[a+b]*(c-d)}", "[]{}()"]:
    print(f"{e:<20} -> {balanced(e)}")`}
        />
      </Section>

      <Section title="Application 3 — Decimal → Binary">
        <PyRunner
          initialCode={`def dec_to_bin(n):
    if n == 0: return "0"
    stk = []
    while n > 0:
        stk.append(n % 2)
        n //= 2
    return "".join(str(stk.pop()) for _ in range(len(stk)))

for n in [5, 13, 29, 100, 255]:
    print(n, "->", dec_to_bin(n))`}
        />
      </Section>

      <Section title="Application 4 — Infix to Postfix conversion">
        <p>
          Postfix (Reverse Polish) needs no brackets — calculators evaluate it with a
          stack. The classic <b>Shunting-yard</b> algorithm uses one stack for operators.
        </p>
        <PyRunner
          height={340}
          initialCode={`def precedence(op):
    return {"+":1,"-":1,"*":2,"/":2,"^":3}.get(op, 0)

def infix_to_postfix(expr):
    out, stack = [], []
    for tok in expr.replace(" ", ""):
        if tok.isalnum():
            out.append(tok)
        elif tok == "(":
            stack.append(tok)
        elif tok == ")":
            while stack and stack[-1] != "(":
                out.append(stack.pop())
            stack.pop()                # discard "("
        else:                          # operator
            while stack and precedence(stack[-1]) >= precedence(tok):
                out.append(stack.pop())
            stack.append(tok)
    while stack:
        out.append(stack.pop())
    return " ".join(out)

for e in ["A+B*C", "(A+B)*C", "A+B*(C-D)/E", "A^B^C"]:
    print(f"{e:<15} -> {infix_to_postfix(e)}")`}
        />
      </Section>

      <Section title="Application 5 — Undo simulator">
        <PyRunner
          initialCode={`history = []           # stack of states

def type_text(state, text):
    history.append(state)
    return state + text

def undo(state):
    return history.pop() if history else state

doc = ""
doc = type_text(doc, "Hello ")
doc = type_text(doc, "World")
doc = type_text(doc, "!!!")
print("now:", repr(doc))

doc = undo(doc); print("undo:", repr(doc))
doc = undo(doc); print("undo:", repr(doc))
doc = undo(doc); print("undo:", repr(doc))`}
        />
      </Section>

      <Section title="Stack overflow & underflow">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Overflow</b> — pushing onto a full stack (in fixed-size implementations).</li>
          <li><b>Underflow</b> — popping from an empty stack.</li>
          <li>Python lists grow dynamically, so overflow only happens when system memory runs out.</li>
        </ul>
      </Section>

      <Section title="Practice">
        <QuickCheck
          question="What does LIFO stand for?"
          options={["Last-In-First-Out", "List-In-Function-Out", "Linear-In-File-Out", "Last-In-Final-Output"]}
          answer="Last-In-First-Out"
        />
        <QuickCheck
          question="Time complexity of push & pop on a list-based stack?"
          options={["O(1)", "O(n)", "O(log n)", "O(n²)"]}
          answer="O(1)"
        />
        <QuickCheck
          question="Postfix of A+B*C is ?"
          answer="ABC*+"
          hint="Multiplication has higher precedence than addition."
        />
      </Section>
    </ChapterLayout>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { ChapterLayout, Section, Callout, QuickCheck, PYQ, MostAsked } from "@/components/ChapterLayout";
import { PyRunner } from "@/components/PyRunner";

export const Route = createFileRoute("/xii/functions")({
  head: () => ({
    meta: [
      { title: "Functions in Python — CS 083 Class XII" },
      {
        name: "description",
        content:
          "Deep dive into Python functions: definition, parameters (positional, default, keyword, *args, **kwargs), return values, scope (LEGB), recursion, lambda, modules and the standard library.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <ChapterLayout slug="/xii/functions">
      <Section title="What is a function?">
        <p>
          A <b>function</b> is a named, reusable block of code that performs a single
          well-defined task. Functions help you avoid copy-paste, make programs easier
          to read, easier to test, and easier to change.
        </p>
        <p><b>Three categories</b> in Python:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Built-in</b> — already available: <code>print(), len(), range(), input(), sum(), abs()</code>.</li>
          <li><b>Module functions</b> — imported from libraries: <code>math.sqrt, random.randint, statistics.mean</code>.</li>
          <li><b>User-defined</b> — written by you using <code>def</code>.</li>
        </ul>
        <Callout>
          Real-world: WhatsApp's "send message" button calls the same{" "}
          <code>send(msg, to)</code> function whether you message one friend or a
          group — written once, reused everywhere.
        </Callout>
      </Section>

      <Section title="Defining a function">
        <PyRunner
          initialCode={`def area_of_circle(r):
    """Returns area of a circle given radius r."""
    pi = 3.14159
    return pi * r * r

print(area_of_circle(5))
print(area_of_circle(10))
print(area_of_circle.__doc__)   # access the docstring`}
        />
        <p>
          Anatomy: <code>def</code> keyword → name → parameters in <code>()</code> →
          colon → indented body → optional <code>return</code>.
        </p>
      </Section>

      <Section title="Parameters vs Arguments">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Parameter</b> — variable in the function definition.</li>
          <li><b>Argument</b> — actual value passed during a call.</li>
        </ul>
        <p>Python supports four argument styles:</p>
        <PyRunner
          initialCode={`def greet(name, message="Welcome", *, punctuation="!"):
    print(message + ",", name + punctuation)

# 1. Positional
greet("Aarav", "Hi")

# 2. Default
greet("Diya")

# 3. Keyword
greet(name="Kabir", message="Hello", punctuation=".")

# 4. Mixed (positional first, keywords after)
greet("Mira", punctuation="?")`}
        />
      </Section>

      <Section title="*args and **kwargs (variable-length arguments)">
        <PyRunner
          initialCode={`def total(*nums):              # *args → tuple
    return sum(nums)

print(total(1,2,3))
print(total(10,20,30,40,50))

def show(**details):           # **kwargs → dict
    for k, v in details.items():
        print(f"{k} = {v}")

show(name="Aarav", roll=1, marks=88)`}
        />
      </Section>

      <Section title="Returning multiple values">
        <PyRunner
          initialCode={`def stats(nums):
    return min(nums), max(nums), sum(nums)/len(nums)

lo, hi, avg = stats([10, 7, 3, 8, 5])
print("min:", lo, "max:", hi, "avg:", avg)

# the return is actually a tuple
result = stats([4,9,2,7])
print(type(result), result)`}
        />
      </Section>

      <Section title="Scope: LEGB rule">
        <p>
          Python looks up a name in this order: <b>L</b>ocal → <b>E</b>nclosing →{" "}
          <b>G</b>lobal → <b>B</b>uilt-in.
        </p>
        <PyRunner
          initialCode={`x = 100   # global

def demo():
    x = 5     # local — does NOT change global
    print("inside demo:", x)

demo()
print("outside:", x)

def change_global():
    global x
    x = 999
change_global()
print("after change_global:", x)

# enclosing (closure)
def outer():
    msg = "hi from outer"
    def inner():
        nonlocal msg
        msg = "modified by inner"
    inner()
    print(msg)
outer()`}
          height={300}
        />
      </Section>

      <Section title="Pass by reference — mutable vs immutable">
        <PyRunner
          initialCode={`def modify(lst, num):
    lst.append(99)        # list is mutable → caller sees change
    num = num + 1         # int is immutable → local rebind only

a, b = [1,2,3], 10
modify(a, b)
print("a =", a, "b =", b)`}
        />
      </Section>

      <Section title="Recursion">
        <p>
          A function that calls itself, with a <b>base case</b> to stop.
        </p>
        <PyRunner
          initialCode={`def fact(n):
    if n <= 1:
        return 1
    return n * fact(n - 1)

print([fact(i) for i in range(8)])

def fib(n):
    if n < 2: return n
    return fib(n-1) + fib(n-2)

print([fib(i) for i in range(10)])`}
        />
      </Section>

      <Section title="lambda — anonymous functions">
        <PyRunner
          initialCode={`square = lambda x: x*x
print(square(7))

nums = [4, 1, 7, 3, 9, 2]
print(sorted(nums, key=lambda x: -x))           # desc
students = [("Aarav",88),("Diya",76),("Kabir",92)]
print(sorted(students, key=lambda s: s[1], reverse=True))

print(list(map(lambda x: x*10, [1,2,3])))
print(list(filter(lambda x: x % 2, range(10))))`}
        />
      </Section>

      <Section title="Modules — using the standard library">
        <p>
          A <b>module</b> is just a Python file. Use <code>import</code> to bring its
          functions in.
        </p>
        <PyRunner
          initialCode={`import math, random, statistics

print(math.sqrt(2), math.pi, math.factorial(6), math.gcd(24,36))
print(math.floor(3.7), math.ceil(3.2), math.pow(2,10))

random.seed(7)
print(random.random(), random.randint(1,100), random.choice("ABCDE"))
deck = [1,2,3,4,5,6]
random.shuffle(deck)
print(deck, random.sample(range(100), 5))

data = [4,9,2,7,5,8]
print("mean:", statistics.mean(data),
      "median:", statistics.median(data),
      "mode:", statistics.mode([1,2,2,3,4]),
      "stdev:", round(statistics.stdev(data),2))`}
          height={280}
        />
      </Section>

      <Section title="Writing your own module (concept)">
        <p>
          If you save the following as <code>utility.py</code>, you can use
          <code> import utility</code> in another file.
        </p>
        <pre className="rounded-md border border-border bg-[var(--code-bg)] p-3 font-mono text-xs">{`# utility.py
def square(x): return x*x
def cube(x):   return x*x*x

# main.py
import utility
print(utility.square(5), utility.cube(3))

# selective import
from utility import square as sq
print(sq(8))`}</pre>
      </Section>

      <Section title="Types of functions (by parameters & return)">
        <p>
          Based on whether a function <b>takes parameters</b> and whether it{" "}
          <b>returns a value</b>, user-defined functions fall into four types.
          One example for each is shown below.
        </p>

        <p className="mt-2"><b>1. No parameters, No return</b> — just performs an action.</p>
        <PyRunner
          initialCode={`def greet():
    print("Hello, welcome to CodeLearners!")

greet()`}
        />

        <p className="mt-2"><b>2. With parameters, No return</b> — acts on inputs but returns nothing (returns <code>None</code>).</p>
        <PyRunner
          initialCode={`def wish(name, msg="Good morning"):
    print(msg + ",", name)

wish("Aarav")
wish("Diya", "Hello")`}
        />

        <p className="mt-2"><b>3. No parameters, With return</b> — produces a value without needing input.</p>
        <PyRunner
          initialCode={`import random

def lucky_number():
    return random.randint(1, 100)

n = lucky_number()
print("Your lucky number is", n)`}
        />

        <p className="mt-2"><b>4. With parameters, With return</b> — the most common form: takes inputs, returns a result.</p>
        <PyRunner
          initialCode={`def add(a, b):
    return a + b

def area_rectangle(l, w):
    return l * w

print("Sum      :", add(5, 7))
print("Area     :", area_rectangle(4, 6))`}
        />

        <Callout>
          A function without an explicit <code>return</code> statement
          automatically returns <code>None</code>. Type&nbsp;2 above prints a
          message but if you write <code>x = wish("A")</code>, then{" "}
          <code>x</code> will be <code>None</code>.
        </Callout>
      </Section>

      <Section title="Practice">
        <QuickCheck
          question="What will fact(0) return for the recursion above?"
          answer="1"
          hint="The base case fires when n <= 1."
        />
        <QuickCheck
          question="In a function, which keyword is needed to modify a global variable?"
          options={["nonlocal", "extern", "global", "static"]}
          answer="global"
        />
        <QuickCheck
          question="Which collection type does **kwargs receive inside the function?"
          options={["list", "tuple", "set", "dict"]}
          answer="dict"
        />
      </Section>
    
        <Section title="Deeper theory: scope, lifetime & pass-by-reference">
          <p>
            Python uses <strong>pass-by-object-reference</strong> (often called
            "call-by-sharing"). The function receives a reference to the same
            object the caller has. Mutating a mutable argument (list, dict)
            inside the function changes the caller's object; rebinding the
            parameter name does not.
          </p>
          <ul className="ml-5 list-disc space-y-1 text-sm">
            <li><strong>Local</strong> variables are created when the function is called and destroyed when it returns.</li>
            <li><strong>Global</strong> variables live for the program's lifetime; use the <code>global</code> keyword to rebind them inside a function.</li>
            <li><strong>Nonlocal</strong> rebinds a name in the nearest enclosing function (used in closures).</li>
            <li>Default argument values are evaluated <em>once</em> at function definition — never use a mutable default like <code>def f(x=[])</code>.</li>
          </ul>
          <p className="text-sm">
            <strong>Function vs Method:</strong> a method is a function bound to an
            object (called as <code>obj.method()</code>); a plain function is
            called as <code>func()</code>. <strong>Built-in</strong> functions
            (<code>len</code>, <code>print</code>) come with Python; <strong>user-defined</strong>
            functions are written by the programmer; <strong>module functions</strong>
            (<code>math.sqrt</code>) live inside imported modules.
          </p>
        </Section>

        <Section title="Previous Year Questions (PYQs)">
          <PYQ year="CBSE 2023" marks={2}
            question={<>Differentiate between default parameter and keyword argument with an example.</>}
            answer={<>
              <p><strong>Default parameter:</strong> a value supplied in the function header used when the caller omits the argument.</p>
              <p><strong>Keyword argument:</strong> the caller passes <code>name=value</code> at the call site to bind by name, in any order.</p>
              <pre className="mt-2 overflow-x-auto rounded bg-[var(--code-bg)] p-2 text-xs">{`def greet(name, msg="Hello"):  # msg is default
    print(msg, name)

greet("Aarav")                    # uses default
greet(name="Diya", msg="Hi")      # keyword arguments`}</pre>
            </>}
          />
          <PYQ year="CBSE 2020" marks={3}
            question={<>Write a function <code>countNow(PLACES)</code> that takes a list of city names and prints those names which contain more than 5 characters.</>}
            answer={<pre className="overflow-x-auto rounded bg-[var(--code-bg)] p-2 text-xs">{`def countNow(PLACES):
    for city in PLACES:
        if len(city) > 5:
            print(city)

countNow(["Delhi","Mumbai","Pune","Chennai","Goa"])
# Mumbai
# Chennai`}</pre>}
          />
          <PYQ year="CBSE 2024" marks={2}
            question={<>What is the output? <code>def f(a, b=2, c=3): return a+b+c; print(f(1, c=10))</code></>}
            answer={<>13 — <code>a=1</code>, <code>b=2</code> (default), <code>c=10</code> (keyword), so <code>1+2+10 = 13</code>.</>}
          />
        </Section>

        <Section title="More MCQs">
          <QuickCheck question="What is the default return value of a function with no return statement?"
            options={["0", "None", "Empty string", "Error"]} answer="None" />
          <QuickCheck question="Which keyword is used to rebind a global variable inside a function?"
            options={["nonlocal", "global", "extern", "static"]} answer="global" />
          <QuickCheck question="What does *args collect?"
            options={["Keyword arguments as dict", "Positional arguments as tuple", "Default values", "Return values"]}
            answer="Positional arguments as tuple" />
          <QuickCheck question="In LEGB rule, what does B stand for?"
            options={["Block", "Built-in", "Boolean", "Bound"]} answer="Built-in" />
        </Section>
        <Section title="Most repeated board questions">
          <MostAsked
            items={[
              {
                q: "Differentiate between actual parameters and formal parameters with an example.",
                marks: 2,
                asked: "2019, 2022, 2024 SQP",
                a: "Formal parameters are the variables listed in the function definition; actual parameters (arguments) are the values passed in the function call.\n\ndef area(r):   # r -> formal parameter\n    return 3.14*r*r\nprint(area(5))  # 5 -> actual parameter",
              },
              {
                q: "What is the difference between a function returning a value and a function not returning a value? Give one example each.",
                marks: 3,
                asked: "2020, 2023",
                a: "A function with a return statement sends a value back to the caller and can be used in an expression; without return it returns None and is used only for its effect (e.g. printing).\n\ndef add(a, b):     # returns\n    return a + b\n\ndef show(a, b):    # no return\n    print(a + b)",
              },
              {
                q: "Explain the difference between global and local variables. What is the use of the global keyword?",
                marks: 3,
                asked: "2018, 2021, 2024",
                a: "A local variable is created inside a function and exists only during the call; a global variable is defined outside all functions and is visible throughout the module. The global keyword lets a function rebind (assign to) a global variable instead of creating a new local one.\n\nc = 0\ndef hit():\n    global c\n    c += 1",
              },
              {
                q: "Write a function that accepts a list of numbers and returns the count of even and odd numbers.",
                marks: 3,
                asked: "2019, 2022, 2023",
                a: "def count_eo(lst):\n    e = o = 0\n    for n in lst:\n        if n % 2 == 0:\n            e += 1\n        else:\n            o += 1\n    return e, o\n\nprint(count_eo([1,2,3,4,5,6]))   # (3, 3)",
              },
              {
                q: "What will be the output? Explain why default arguments must come after non-default arguments.\n\ndef f(a, b=2, c=3):\n    return a + b + c\nprint(f(1), f(1, 5), f(1, c=10))",
                marks: 2,
                asked: "2021 SQP, 2023",
                a: "Output: 6 9 13\nPython fills positional arguments left to right, so a parameter with a default cannot be followed by one without a default — otherwise the call would be ambiguous and Python raises SyntaxError: non-default argument follows default argument.",
              },
              {
                q: "Write a function that receives a string and returns the number of vowels and consonants in it.",
                marks: 3,
                asked: "2020, 2024",
                a: "def vc(s):\n    v = c = 0\n    for ch in s.lower():\n        if ch.isalpha():\n            if ch in 'aeiou':\n                v += 1\n            else:\n                c += 1\n    return v, c\n\nprint(vc('Computer Science'))   # (6, 8)",
              },
            ]}
          />
        </Section>

      </ChapterLayout>
  );
}

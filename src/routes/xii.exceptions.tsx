import { createFileRoute } from "@tanstack/react-router";
import { ChapterLayout, Section, Callout, QuickCheck, PYQ, MostAsked } from "@/components/ChapterLayout";
import { PyRunner } from "@/components/PyRunner";

export const Route = createFileRoute("/xii/exceptions")({
  head: () => ({
    meta: [
      { title: "Exception Handling in Python — CS 083 Class XII" },
      {
        name: "description",
        content:
          "Comprehensive guide to Python exception handling — try/except/else/finally, multiple exceptions, raising exceptions, custom exceptions and best practices.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <ChapterLayout slug="/xii/exceptions">
      <Section title="Errors vs Exceptions">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <b>Syntax errors</b> — caught when Python <i>parses</i> your code, before
            it runs (a missing colon, unmatched bracket).
          </li>
          <li>
            <b>Exceptions (runtime errors)</b> — happen <i>while</i> the program is
            running because of unexpected conditions (dividing by zero, missing file,
            bad input, network failure).
          </li>
        </ul>
        <p>
          When an exception occurs and is not handled, Python prints a traceback and
          crashes the program. Exception handling lets us recover gracefully.
        </p>
        <Callout>
          Real-world: when YouTube can't load a video due to network failure, it shows
          "Tap to retry" instead of crashing the entire app.
        </Callout>
      </Section>

      <Section title="Common built-in exceptions">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>ZeroDivisionError</b> — dividing by zero.</li>
          <li><b>ValueError</b> — right type but bad value (<code>int("abc")</code>).</li>
          <li><b>TypeError</b> — wrong type (<code>"5" + 5</code>).</li>
          <li><b>NameError</b> — using a variable that wasn't defined.</li>
          <li><b>IndexError</b> — list index out of range.</li>
          <li><b>KeyError</b> — dictionary key not found.</li>
          <li><b>AttributeError</b> — calling a method that doesn't exist.</li>
          <li><b>FileNotFoundError</b> — opening a missing file.</li>
          <li><b>ImportError / ModuleNotFoundError</b> — failed import.</li>
          <li><b>EOFError</b> — input() reached end-of-file.</li>
          <li><b>OverflowError, MemoryError, KeyboardInterrupt</b> — system-level.</li>
        </ul>
      </Section>

      <Section title="try / except — the basic pattern">
        <PyRunner
          initialCode={`try:
    a = int(input("Enter a number: ") or "10")  # default 10 in playground
    b = int(input("Enter divisor: ") or "0")
    print("Result:", a / b)
except ZeroDivisionError:
    print("⚠ Cannot divide by zero")
except ValueError:
    print("⚠ Please enter only numbers")`}
        />
      </Section>

      <Section title="try / except / else / finally — full structure">
        <PyRunner
          initialCode={`def safe_div(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        print("⚠ Cannot divide by zero")
        result = None
    except TypeError:
        print("⚠ Both must be numbers")
        result = None
    else:
        print("✓ Division ok")          # runs only if no exception
    finally:
        print("[done attempt]")          # ALWAYS runs
    return result

print("10/2 =", safe_div(10, 2))
print("10/0 =", safe_div(10, 0))
print("10/'a' =", safe_div(10, "a"))`}
          height={320}
        />
      </Section>

      <Section title="Catching multiple exceptions">
        <PyRunner
          initialCode={`values = ["12", "ab", "0", "8", None]
for v in values:
    try:
        n = int(v)
        print(v, "-> 100/n =", 100/n)
    except (ValueError, TypeError) as e:
        print(v, "-> input error:", type(e).__name__)
    except ZeroDivisionError:
        print(v, "-> divide-by-zero")`}
        />
      </Section>

      <Section title="Catching everything (use sparingly)">
        <PyRunner
          initialCode={`try:
    risky = 1 / 0
except Exception as e:           # base class — catches almost anything
    print("Type:", type(e).__name__)
    print("Message:", e)
print("Program continues...")`}
        />
        <Callout label="Best practice">
          Catch the <b>narrowest</b> exception you actually expect. Bare{" "}
          <code>except:</code> hides bugs and even swallows <code>KeyboardInterrupt</code>.
        </Callout>
      </Section>

      <Section title="Raising your own exceptions">
        <PyRunner
          initialCode={`def withdraw(balance, amount):
    if amount <= 0:
        raise ValueError("Amount must be positive")
    if amount > balance:
        raise ValueError(f"Insufficient funds (balance {balance})")
    return balance - amount

for amt in [500, -50, 5000]:
    try:
        new_bal = withdraw(2000, amt)
        print("withdrew", amt, "→ balance", new_bal)
    except ValueError as e:
        print("error:", e)`}
        />
      </Section>

      <Section title="User-defined exception classes">
        <PyRunner
          initialCode={`class AgeError(Exception):
    """Raised when age is invalid."""
    pass

def register(age):
    if age < 0 or age > 120:
        raise AgeError(f"Invalid age: {age}")
    print("Registered age", age)

for a in [25, -3, 130]:
    try:
        register(a)
    except AgeError as e:
        print("Custom catch →", e)`}
        />
      </Section>

      <Section title="Exception with file handling">
        <PyRunner
          initialCode={`# create a file first
with open("data.txt", "w") as f:
    f.write("Hello\\n")

# safe read with handling
try:
    with open("missing.txt") as f:
        print(f.read())
except FileNotFoundError as e:
    print("Could not open:", e)
finally:
    print("Cleanup done")`}
        />
      </Section>

      <Section title="Best practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Catch specific exceptions, not bare <code>except:</code>.</li>
          <li>Keep the <code>try</code> block as small as possible.</li>
          <li>Use <code>finally</code> for cleanup (closing files, releasing locks).</li>
          <li>Re-raise with <code>raise</code> if you can't really handle it.</li>
          <li>Log the error so you can debug later.</li>
        </ul>
      </Section>

      <Section title="Practice">
        <QuickCheck
          question="Which block runs even if an exception occurs and is not handled?"
          options={["else", "except", "finally", "raise"]}
          answer="finally"
        />
        <QuickCheck
          question="int('abc') raises which exception?"
          options={["TypeError", "NameError", "ValueError", "SyntaxError"]}
          answer="ValueError"
        />
        <QuickCheck
          question="Which keyword throws an exception manually?"
          answer="raise"
        />
      </Section>
    
        <Section title="Deeper theory: how exceptions actually work">
          <p>
            When Python encounters an error, it creates an <strong>exception object</strong>
            and walks up the call stack looking for a matching <code>except</code>.
            If none is found, the program terminates and prints a <em>traceback</em> —
            the chain of function calls that led to the error.
          </p>
          <ul className="ml-5 list-disc space-y-1 text-sm">
            <li><strong>Syntax errors</strong> are caught at parse time — <em>before</em> the program runs — and cannot be handled by try/except.</li>
            <li><strong>Runtime exceptions</strong> (ZeroDivisionError, ValueError, IndexError, KeyError, FileNotFoundError, TypeError) happen during execution and <em>can</em> be handled.</li>
            <li>All built-in exceptions inherit from the <code>Exception</code> class, which itself inherits from <code>BaseException</code>.</li>
            <li>Catch the most specific exception first; <code>except Exception</code> at the end is a safety net.</li>
            <li><code>finally</code> always runs — used for cleanup like closing files or DB connections, even when an exception propagates.</li>
          </ul>
        </Section>

        <Section title="Previous Year Questions (PYQs)">
          <PYQ year="CBSE 2023" marks={1}
            question={<>Name the exception raised when a number is divided by zero.</>}
            answer={<><code>ZeroDivisionError</code></>}
          />
          <PYQ year="CBSE 2022" marks={2}
            question={<>Write a Python program that asks the user for two numbers and prints their division. Handle <code>ZeroDivisionError</code> and <code>ValueError</code>.</>}
            answer={<pre className="overflow-x-auto rounded bg-[var(--code-bg)] p-2 text-xs">{`try:
    a = int(input("a: "))
    b = int(input("b: "))
    print(a / b)
except ZeroDivisionError:
    print("Cannot divide by zero")
except ValueError:
    print("Please enter integers only")`}</pre>}
          />
          <PYQ year="CBSE 2024" marks={1}
            question={<>Which clause of try-except is always executed whether an exception is raised or not?</>}
            answer={<><code>finally</code></>}
          />
        </Section>

        <Section title="More MCQs">
          <QuickCheck question="Which exception is raised when accessing a non-existent dict key?"
            options={["IndexError", "KeyError", "ValueError", "TypeError"]} answer="KeyError" />
          <QuickCheck question="Which block runs only when no exception occurs?"
            options={["finally", "except", "else", "raise"]} answer="else" />
          <QuickCheck question="Which keyword is used to manually trigger an exception?"
            options={["throw", "raise", "trigger", "panic"]} answer="raise" />
          <QuickCheck question="Parent class of all built-in exceptions?"
            options={["Error", "Exception", "BaseException", "RuntimeError"]} answer="BaseException" />
        </Section>
        <Section title="Most repeated board questions">
          <MostAsked
            items={[
              {
                q: "What is an exception? How is it different from a syntax error?",
                marks: 2,
                asked: "2019, 2022, 2024 SQP",
                a: "An exception is a run-time error that occurs while a syntactically correct program is executing (e.g. ZeroDivisionError, ValueError) and can be handled with try-except. A syntax error is detected by the interpreter before execution and cannot be handled at run time.",
              },
              {
                q: "Explain the use of try, except, else and finally blocks with an example.",
                marks: 3,
                asked: "2020, 2023",
                a: "try holds risky code; except handles a matching exception; else runs only if no exception occurred; finally always runs (used for cleanup such as closing files).\n\ntry:\n    f = open('data.txt')\n    n = int(f.readline())\nexcept FileNotFoundError:\n    print('File missing')\nexcept ValueError:\n    print('Not a number')\nelse:\n    print('Read', n)\nfinally:\n    print('Done')",
              },
              {
                q: "Rewrite the code after handling the exception:\n\nnum = int(input('Enter number: '))\nprint(100/num)",
                marks: 2,
                asked: "2021, 2023 SQP",
                a: "try:\n    num = int(input('Enter number: '))\n    print(100/num)\nexcept ValueError:\n    print('Please enter a valid integer')\nexcept ZeroDivisionError:\n    print('Division by zero is not allowed')",
              },
              {
                q: "Name the exception raised in each case: (i) 5/0 (ii) int('abc') (iii) lst[10] on a 3-item list (iv) opening a missing file.",
                marks: 2,
                asked: "2019, 2022, 2024",
                a: "(i) ZeroDivisionError (ii) ValueError (iii) IndexError (iv) FileNotFoundError",
              },
              {
                q: "How do you raise your own exception? Write a program that raises an exception if marks entered are negative.",
                marks: 3,
                asked: "2020, 2024 SQP",
                a: "The raise statement creates an exception object explicitly.\n\ntry:\n    m = int(input('Marks: '))\n    if m < 0:\n        raise ValueError('Marks cannot be negative')\n    print('Marks =', m)\nexcept ValueError as e:\n    print('Error:', e)",
              },
            ]}
          />
        </Section>

      </ChapterLayout>
  );
}

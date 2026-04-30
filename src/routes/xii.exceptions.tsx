import { createFileRoute } from "@tanstack/react-router";
import { ChapterLayout, Section, Callout, QuickCheck } from "@/components/ChapterLayout";
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
    </ChapterLayout>
  );
}

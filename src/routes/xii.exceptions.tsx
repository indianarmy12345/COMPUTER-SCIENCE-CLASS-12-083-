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


        <Section title="Exception hierarchy (ASCII diagram)">
          <p>All exceptions in Python derive from a common tree rooted at <code>BaseException</code>:</p>
          <pre className="overflow-x-auto rounded bg-[var(--code-bg)] p-2 text-xs">{`BaseException
 ├── SystemExit
 ├── KeyboardInterrupt
 ├── GeneratorExit
 └── Exception
      ├── ArithmeticError
      │     ├── ZeroDivisionError
      │     ├── OverflowError
      │     └── FloatingPointError
      ├── LookupError
      │     ├── IndexError
      │     └── KeyError
      ├── ValueError
      ├── TypeError
      ├── NameError
      │     └── UnboundLocalError
      ├── AttributeError
      ├── OSError (a.k.a. IOError)
      │     └── FileNotFoundError
      ├── ImportError
      │     └── ModuleNotFoundError
      ├── StopIteration
      ├── RuntimeError
      │     └── RecursionError
      └── AssertionError`}</pre>
          <Callout label="Why it matters">
            Catching a parent class (e.g. <code>ArithmeticError</code>) also catches all
            of its children (<code>ZeroDivisionError</code>, <code>OverflowError</code>).
            Order your <code>except</code> clauses from <b>most specific to most general</b> —
            Python checks them top to bottom and uses the first match.
          </Callout>
        </Section>

        <Section title="Full try/except/else/finally semantics">
          <ul className="ml-5 list-disc space-y-1 text-sm">
            <li><code>try</code>: code that might raise an exception is placed here.</li>
            <li><code>except</code>: runs only if a matching exception is raised in the try block; can have multiple clauses, and an optional <code>as e</code> to capture the exception object.</li>
            <li><code>else</code>: runs only if the try block completed with <b>no exception</b>. Useful to separate "risky" code from "success" code so the else code's own errors aren't accidentally caught by the except above it.</li>
            <li><code>finally</code>: always executes — whether an exception occurred, was handled, was NOT handled, or even if there is a <code>return</code>/<code>break</code>/<code>continue</code> inside try/except. Used for guaranteed cleanup (closing files, releasing locks, closing DB connections).</li>
            <li>If an exception is raised in <code>try</code> and there is <b>no matching except</b>, Python still runs <code>finally</code> before propagating the exception upward and eventually crashing the program (if never caught).</li>
          </ul>
          <PyRunner
            height={300}
            initialCode={`def demo(x):
    try:
        print("try: computing 10/x")
        r = 10 / x
    except ZeroDivisionError:
        print("except: division by zero")
        return "handled"
    else:
        print("else: no error, r =", r)
        return r
    finally:
        print("finally: always runs")

print(demo(2))
print("---")
print(demo(0))`}
          />
        </Section>

        <Section title="Nested try blocks and exception propagation">
          <p>
            A <code>try</code> block can be nested inside another <code>try</code> or
            inside a function called from a try block. If the inner block cannot handle
            an exception, it <b>propagates outward</b> to the next enclosing try, and
            further up the call stack, until a matching except is found or the program
            terminates.
          </p>
          <PyRunner
            height={320}
            initialCode={`def inner(n):
    try:
        return 100 / n
    except TypeError:
        print("inner: caught TypeError")
        raise            # re-raise so outer can also react

def outer(n):
    try:
        try:
            print("outer-inner result:", inner(n))
        except ZeroDivisionError:
            print("outer: caught ZeroDivisionError from inner")
    except Exception as e:
        print("outer: caught propagated error:", type(e).__name__)

outer(5)
outer(0)
outer("x")`}
          />
        </Section>

        <Section title="The assert statement">
          <p>
            <code>assert condition, message</code> raises <code>AssertionError</code> if
            the condition is <code>False</code>. Commonly used for debugging / sanity
            checks (assumptions that should always hold), not for validating normal
            user input (use exceptions for that).
          </p>
          <PyRunner
            initialCode={`def set_marks(m):
    assert 0 <= m <= 100, "Marks must be between 0 and 100"
    return m

print(set_marks(85))
try:
    print(set_marks(150))
except AssertionError as e:
    print("AssertionError:", e)`}
          />
        </Section>

        <Section title="raise ... from ... (exception chaining)">
          <p>
            <code>raise NewException("...") from original_exception</code> lets you
            convert one exception into a more meaningful one while preserving the
            original cause in the traceback (shown as "The above exception was the
            direct cause of the following exception").
          </p>
          <PyRunner
            initialCode={`def get_config_value(cfg, key):
    try:
        return cfg[key]
    except KeyError as e:
        raise ValueError(f"Missing required config: {key}") from e

cfg = {"host": "localhost"}
try:
    get_config_value(cfg, "port")
except ValueError as e:
    print("Caught:", e)
    print("Original cause:", type(e.__cause__).__name__)`}
          />
        </Section>

        <Section title="Custom exception classes — a fuller example">
          <PyRunner
            height={340}
            initialCode={`class InsufficientBalanceError(Exception):
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount = amount
        super().__init__(f"Cannot withdraw {amount}; balance is only {balance}")

class Account:
    def __init__(self, balance):
        self.balance = balance
    def withdraw(self, amount):
        if amount > self.balance:
            raise InsufficientBalanceError(self.balance, amount)
        self.balance -= amount
        return self.balance

acc = Account(1000)
for amt in [200, 500, 900]:
    try:
        print("New balance:", acc.withdraw(amt))
    except InsufficientBalanceError as e:
        print("Error:", e)
        print("shortfall:", e.amount - e.balance)`}
          />
        </Section>

        <Section title="with statement and context managers">
          <p>
            The <code>with</code> statement guarantees that cleanup code runs even if an
            exception occurs inside the block — it is Python's structured alternative to
            manual <code>try/finally</code> for resources like files.
          </p>
          <PyRunner
            initialCode={`with open("marks.txt", "w") as f:
    f.write("Amit 88\\nSara 92\\n")

# 'with' auto-closes the file even if an error happens while reading
try:
    with open("marks.txt") as f:
        for line in f:
            name, score = line.split()
            print(name, int(score) * 2)
        raise RuntimeError("simulated failure mid-loop")
except RuntimeError as e:
    print("caught:", e)
print("file closed?", f.closed)`}
          />
          <Callout label="How it works">
            Any object with <code>__enter__</code> and <code>__exit__</code> methods can
            be used with <code>with</code>. <code>__exit__</code> is called automatically
            on block exit — normal or via exception — which is exactly where file objects
            close themselves.
          </Callout>
        </Section>

        <Section title="Output prediction practice">
          <p>Predict the output of each snippet before running it.</p>
          <PyRunner initialCode={`try:
    print("A")
    x = 1 / 0
    print("B")
except ZeroDivisionError:
    print("C")
else:
    print("D")
finally:
    print("E")`} />
          <PyRunner initialCode={`try:
    print(1)
    raise ValueError("bad")
except TypeError:
    print(2)
except ValueError:
    print(3)
else:
    print(4)
finally:
    print(5)`} />
          <PyRunner initialCode={`def f():
    try:
        return 1
    finally:
        print("cleanup")

print(f())`} />
          <PyRunner initialCode={`try:
    lst = [1, 2, 3]
    print(lst[5])
except IndexError:
    print("index error")
except Exception:
    print("general error")`} />
          <PyRunner initialCode={`x = 10
try:
    y = x + "5"
except (TypeError, ValueError) as e:
    print("Error:", type(e).__name__)`} />
          <PyRunner initialCode={`try:
    try:
        raise KeyError("k1")
    except ValueError:
        print("inner caught")
except KeyError:
    print("outer caught")`} />
          <PyRunner initialCode={`class MyErr(Exception):
    pass

try:
    raise MyErr("custom!")
except Exception as e:
    print(isinstance(e, MyErr), e)`} />
          <PyRunner initialCode={`for i in range(3):
    try:
        if i == 1:
            raise ValueError
        print("ok", i)
    except ValueError:
        print("skip", i)
        continue
    finally:
        print("loop-finally", i)`} />
        </Section>

        <Section title="Find the error / debug the code">
          <ul className="ml-5 list-disc space-y-3 text-sm">
            <li>
              <pre className="overflow-x-auto rounded bg-[var(--code-bg)] p-2 text-xs">{`try:
    print(10/0)
except:
    print(e)`}</pre>
              <p><b>Bug:</b> bare <code>except:</code> doesn't capture the exception into <code>e</code>. Fix: <code>except Exception as e:</code>.</p>
            </li>
            <li>
              <pre className="overflow-x-auto rounded bg-[var(--code-bg)] p-2 text-xs">{`try:
    x = int("10a")
except ValueError
    print("bad value")`}</pre>
              <p><b>Bug:</b> missing colon after <code>except ValueError</code>.</p>
            </li>
            <li>
              <pre className="overflow-x-auto rounded bg-[var(--code-bg)] p-2 text-xs">{`try:
    print(1/0)
except ZeroDivisionError:
    print("err")
else
    print("no error")`}</pre>
              <p><b>Bug:</b> missing colon after <code>else</code>.</p>
            </li>
            <li>
              <pre className="overflow-x-auto rounded bg-[var(--code-bg)] p-2 text-xs">{`def f(x):
    if x < 0:
        raise "negative not allowed"
    return x`}</pre>
              <p><b>Bug:</b> you can only <code>raise</code> an exception instance/class, not a plain string. Fix: <code>raise ValueError("negative not allowed")</code>.</p>
            </li>
            <li>
              <pre className="overflow-x-auto rounded bg-[var(--code-bg)] p-2 text-xs">{`try:
    d = {"a": 1}
    print(d["b"])
except IndexError:
    print("key missing")`}</pre>
              <p><b>Bug:</b> a missing dictionary key raises <code>KeyError</code>, not <code>IndexError</code>.</p>
            </li>
          </ul>
        </Section>

        <Section title="More PyRunner practice">
          <PyRunner
            height={300}
            initialCode={`# Custom exception hierarchy
class ValidationError(Exception):
    pass

class AgeTooLowError(ValidationError):
    pass

class AgeTooHighError(ValidationError):
    pass

def check_age(age):
    if age < 18:
        raise AgeTooLowError(f"{age} is below 18")
    if age > 60:
        raise AgeTooHighError(f"{age} is above 60")
    return "eligible"

for a in [15, 30, 70]:
    try:
        print(a, "->", check_age(a))
    except ValidationError as e:
        print(a, "-> rejected:", type(e).__name__, "-", e)`}
          />
          <PyRunner
            initialCode={`# Retry pattern using loops + exceptions
import random
random.seed(1)

def flaky_call():
    if random.random() < 0.6:
        raise ConnectionError("network glitch")
    return "success"

for attempt in range(1, 4):
    try:
        print("Attempt", attempt, "->", flaky_call())
        break
    except ConnectionError as e:
        print("Attempt", attempt, "failed:", e)
else:
    print("All attempts failed")`}
          />
        </Section>

        <Section title="Extra Previous Year Questions (PYQs)">
          <PYQ year="CBSE 2020" marks={1}
            question={<>Which statement is used to manually raise an exception?</>}
            answer={<><code>raise</code></>}
          />
          <PYQ year="CBSE 2021" marks={2}
            question={<>What is the difference between <code>except Exception as e</code> and a bare <code>except:</code>?</>}
            answer={<>Both can catch almost any exception, but <code>except Exception as e</code> binds the exception object to name <code>e</code> so you can inspect its type/message, and it does not catch system-exiting exceptions like <code>KeyboardInterrupt</code>/<code>SystemExit</code> (which derive from BaseException, not Exception) — whereas bare <code>except:</code> catches literally everything including those, which is considered bad practice.</>}
          />
          <PYQ year="CBSE 2023 SQP" marks={3}
            question={<>Write a Python program using a user-defined exception <code>NegativeValueError</code> that is raised when a negative number is entered, and prints its square root otherwise.</>}
            answer={<pre className="overflow-x-auto rounded bg-[var(--code-bg)] p-2 text-xs">{`import math

class NegativeValueError(Exception):
    pass

try:
    n = float(input("Enter a number: "))
    if n < 0:
        raise NegativeValueError("Cannot take square root of a negative number")
    print("Square root:", math.sqrt(n))
except NegativeValueError as e:
    print("Error:", e)
except ValueError:
    print("Please enter a valid number")`}</pre>}
          />
          <PYQ year="CBSE 2022" marks={1}
            question={<>Name the exception raised when a list index is out of range.</>}
            answer={<><code>IndexError</code></>}
          />
          <PYQ year="CBSE 2024" marks={2}
            question={<>What will be the output of the following code?
              <pre className="overflow-x-auto rounded bg-[var(--code-bg)] p-2 text-xs">{`try:
    print(1)
    print(10/0)
except ZeroDivisionError:
    print(2)
finally:
    print(3)`}</pre>
            </>}
            answer={<>Output: <code>1</code>, then <code>2</code>, then <code>3</code> — each on its own line.</>}
          />
          <PYQ year="CBSE 2019" marks={2}
            question={<>Differentiate between <code>else</code> and <code>finally</code> clauses used with try/except.</>}
            answer={<><code>else</code> executes only when the try block raises no exception; <code>finally</code> executes unconditionally — whether an exception occurred, was handled, or not — and is meant for cleanup actions.</>}
          />
        </Section>

        <Section title="Extra MCQs">
          <QuickCheck question="What is printed?  try: raise TypeError() except (ValueError, TypeError): print('X') else: print('Y')"
            options={["X", "Y", "XY", "Nothing"]} answer="X" />
          <QuickCheck question="Which of these is NOT a valid exception-handling keyword in Python?"
            options={["try", "except", "catch", "finally"]} answer="catch" />
          <QuickCheck question="What does 'assert 2 > 3' do?"
            options={["Prints False", "Raises AssertionError", "Does nothing", "SyntaxError"]} answer="Raises AssertionError" />
          <QuickCheck question="raise NewErr(...) from old_err is used for:"
            options={["Looping", "Chaining exceptions", "Deleting exceptions", "Suppressing all errors"]} answer="Chaining exceptions" />
          <QuickCheck question="Which base class should a custom user-defined exception normally inherit from?"
            options={["object", "Exception", "BaseException", "Error"]} answer="Exception" />
          <QuickCheck question="In a try with multiple except blocks, Python checks them:"
            options={["Randomly", "Bottom to top", "Top to bottom, first match wins", "All at once"]} answer="Top to bottom, first match wins" />
          <QuickCheck question="What special methods make an object usable with 'with'?"
            options={["__init__ and __del__", "__enter__ and __exit__", "__open__ and __close__", "__start__ and __stop__"]} answer="__enter__ and __exit__" />
          <QuickCheck question="If an exception occurs inside a function and is not caught there, what happens?"
            options={["Program silently continues", "It propagates to the caller", "Python auto-fixes it", "Only a warning is shown"]} answer="It propagates to the caller" />
          <QuickCheck question="Which exception's parent is ArithmeticError?"
            options={["IndexError", "ZeroDivisionError", "KeyError", "TypeError"]} answer="ZeroDivisionError" />
          <QuickCheck question="What happens to `finally` if `try` has a `return` statement?"
            options={["finally is skipped", "finally still executes before returning", "SyntaxError", "return is ignored"]} answer="finally still executes before returning" />
          <QuickCheck question="int('12.5') raises:"
            options={["TypeError", "ValueError", "OverflowError", "No error"]} answer="ValueError" />
          <QuickCheck question="Which of the following can appear only once per try statement (not repeated)?"
            options={["except", "else and finally", "try", "raise"]} answer="else and finally" />
        </Section>

        <Section title="More model answers (MostAsked)">
          <MostAsked
            items={[
              {
                q: "Differentiate between an error and an exception with examples.",
                marks: 2,
                asked: "2020, 2023",
                a: "An error (syntax error) is a mistake in code structure detected before execution, e.g. a missing colon — the program will not even start running. An exception is a run-time problem in an otherwise syntactically correct program, e.g. ZeroDivisionError, and can be caught/handled using try-except so the program continues.",
              },
              {
                q: "What is the purpose of the else clause in exception handling? Give an example.",
                marks: 2,
                asked: "2021, 2024 SQP",
                a: "The else clause runs only when the try block executes without raising any exception; it keeps 'success path' code separate from risky code so its own errors are not accidentally swallowed by the except above.\n\ntry:\n    n = int(input('Enter n: '))\nexcept ValueError:\n    print('Invalid input')\nelse:\n    print('You entered', n)",
              },
              {
                q: "Explain exception propagation with a suitable example.",
                marks: 3,
                asked: "2022, 2023",
                a: "If a function raises an exception and does not handle it, the exception propagates up to the function that called it, and further up the call stack, until a matching except block is found or the program terminates with a traceback.\n\ndef inner():\n    return 1/0\n\ndef outer():\n    return inner()   # no handling here\n\ntry:\n    outer()\nexcept ZeroDivisionError:\n    print('caught in main')",
              },
              {
                q: "Write a program that defines a custom exception InvalidPincodeError raised when a 6-digit pincode is not entered.",
                marks: 3,
                asked: "2023, 2024",
                a: "class InvalidPincodeError(Exception):\n    pass\n\ndef check_pin(pin):\n    if len(str(pin)) != 6:\n        raise InvalidPincodeError('Pincode must be 6 digits')\n    return 'valid'\n\ntry:\n    print(check_pin(11002))\nexcept InvalidPincodeError as e:\n    print('Error:', e)",
              },
              {
                q: "What is the difference between raise and raise ... from ...?",
                marks: 2,
                asked: "2024 SQP",
                a: "`raise` simply raises a new exception (or re-raises the current one with no arguments). `raise NewException(...) from original` explicitly chains a new exception to an original cause, preserving both tracebacks so debugging shows why the new exception occurred.",
              },
              {
                q: "Explain how the with statement helps in exception handling while working with files.",
                marks: 2,
                asked: "2019, 2022",
                a: "The with statement uses a context manager (__enter__/__exit__) so that the file is automatically closed when the block ends — whether it ends normally or due to an exception — removing the need for an explicit try/finally to close the file.",
              },
            ]}
          />
        </Section>

      </ChapterLayout>
  );
}

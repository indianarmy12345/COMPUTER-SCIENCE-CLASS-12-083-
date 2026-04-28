import { createFileRoute } from "@tanstack/react-router";
import { ChapterLayout, Section, Callout } from "@/components/ChapterLayout";
import { PyRunner } from "@/components/PyRunner";

export const Route = createFileRoute("/xii/exceptions")({
  head: () => ({
    meta: [
      { title: "Exception Handling in Python — CS 083 Class XII" },
      {
        name: "description",
        content:
          "Handle runtime errors using try-except-finally with examples for ZeroDivisionError, ValueError and FileNotFoundError.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <ChapterLayout slug="/xii/exceptions">
      <Section title="Why handle exceptions?">
        <p>
          A program crashes when something unexpected happens — dividing by zero, a
          missing file, bad input. <b>Exception handling</b> lets your program react
          gracefully instead of crashing.
        </p>
        <Callout>
          Real-world: when YouTube can't load a video due to network failure, it shows
          "Tap to retry" instead of crashing the entire app.
        </Callout>
      </Section>

      <Section title="try–except–finally">
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
        print("✓ Division ok")
    finally:
        print("[done attempt]")
    return result

print("10/2 =", safe_div(10, 2))
print("10/0 =", safe_div(10, 0))
print("10/'a' =", safe_div(10, "a"))`}
          height={300}
        />
      </Section>

      <Section title="Catching multiple errors">
        <PyRunner
          initialCode={`values = ["12", "ab", "0", "8"]
for v in values:
    try:
        n = int(v)
        print(v, "-> 100/n =", 100/n)
    except (ValueError, ZeroDivisionError) as e:
        print(v, "-> error:", type(e).__name__)`}
        />
      </Section>
    </ChapterLayout>
  );
}

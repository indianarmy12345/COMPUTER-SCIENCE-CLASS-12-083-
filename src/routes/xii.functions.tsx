import { createFileRoute } from "@tanstack/react-router";
import { ChapterLayout, Section, Callout } from "@/components/ChapterLayout";
import { PyRunner } from "@/components/PyRunner";

export const Route = createFileRoute("/xii/functions")({
  head: () => ({
    meta: [
      { title: "Functions in Python — CS 083 Class XII" },
      {
        name: "description",
        content:
          "User-defined functions, parameters (default, positional, keyword), return values, and global vs local scope — CBSE Class 12.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <ChapterLayout slug="/xii/functions">
      <Section title="Why functions?">
        <p>
          A <b>function</b> is a reusable block of code that performs one job. It keeps
          programs short, readable and easy to debug.
        </p>
        <Callout>
          Real-world: WhatsApp's "send message" button calls the same{" "}
          <code>send(msg, to)</code> function whether you message one friend or a group
          — written once, reused everywhere.
        </Callout>
      </Section>

      <Section title="Defining your own function">
        <PyRunner
          initialCode={`def area_of_circle(r):
    """Returns area given radius r."""
    pi = 3.14159
    return pi * r * r

print(area_of_circle(5))
print(area_of_circle(10))`}
        />
      </Section>

      <Section title="Default & keyword parameters">
        <PyRunner
          initialCode={`def greet(name, message="Welcome"):
    print(message + ",", name + "!")

greet("Aarav")                       # uses default
greet("Diya", "Good morning")        # positional override
greet(name="Kabir", message="Hi")    # keyword args`}
        />
      </Section>

      <Section title="Returning multiple values">
        <PyRunner
          initialCode={`def stats(nums):
    return min(nums), max(nums), sum(nums)/len(nums)

lo, hi, avg = stats([10, 7, 3, 8, 5])
print("min:", lo, "max:", hi, "avg:", avg)`}
        />
      </Section>

      <Section title="Scope: global vs local">
        <PyRunner
          initialCode={`x = 100   # global

def demo():
    x = 5     # local — does NOT change global
    print("inside:", x)

demo()
print("outside:", x)

def change_global():
    global x
    x = 999
change_global()
print("after change_global:", x)`}
        />
      </Section>
    </ChapterLayout>
  );
}

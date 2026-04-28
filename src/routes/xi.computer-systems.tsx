import { createFileRoute } from "@tanstack/react-router";
import { ChapterLayout, Section, Callout } from "@/components/ChapterLayout";

export const Route = createFileRoute("/xi/computer-systems")({
  head: () => ({
    meta: [
      { title: "Computer Systems & Boolean Logic — CS 083 Class XI" },
      {
        name: "description",
        content:
          "Hardware vs software, memory hierarchy, number systems, Boolean logic and De Morgan's laws explained for CBSE Class XI.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <ChapterLayout slug="/xi/computer-systems">
      <Section title="Computer system basics">
        <p>
          A <b>computer system</b> = <b>hardware</b> (physical parts: CPU, RAM, disk,
          keyboard, screen) + <b>software</b> (programs that tell the hardware what to
          do). The CPU fetches instructions from memory, decodes and executes them.
        </p>
        <Callout>
          When you open Instagram on your phone, the CPU runs the app code, RAM holds
          the currently visible posts, and storage keeps your downloaded reels even
          after you close the app.
        </Callout>
      </Section>

      <Section title="Memory hierarchy & units">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <b>Registers → Cache → RAM → Secondary storage</b> — fastest to slowest,
            smallest to largest.
          </li>
          <li>
            1 Byte = 8 bits, 1 KB = 1024 B, 1 MB = 1024 KB, 1 GB = 1024 MB, 1 TB = 1024
            GB, 1 PB = 1024 TB.
          </li>
        </ul>
      </Section>

      <Section title="Software types">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <b>System software:</b> OS (Windows, Linux, Android), utilities, device
            drivers.
          </li>
          <li>
            <b>Programming tools:</b> Assembler, Compiler (translates whole program
            once, e.g. C), Interpreter (line by line, e.g. Python).
          </li>
          <li>
            <b>Application software:</b> Chrome, MS Word, VS Code.
          </li>
        </ul>
      </Section>

      <Section title="Boolean logic & De Morgan's laws">
        <p>Truth table for AND, OR, NOT:</p>
        <pre className="rounded-md border border-border bg-[var(--code-bg)] p-3 font-mono text-xs">{`A B | A AND B | A OR B | NOT A
0 0 |    0    |   0    |   1
0 1 |    0    |   1    |   1
1 0 |    0    |   1    |   0
1 1 |    1    |   1    |   0`}</pre>
        <p>
          <b>De Morgan's laws:</b> <code>NOT(A AND B) = (NOT A) OR (NOT B)</code> and{" "}
          <code>NOT(A OR B) = (NOT A) AND (NOT B)</code>.
        </p>
      </Section>

      <Section title="Number systems">
        <p>
          Decimal (10), Binary (2), Octal (8), Hexadecimal (16). Example:{" "}
          <code>(13)₁₀ = (1101)₂ = (15)₈ = (D)₁₆</code>.
        </p>
        <Callout label="Why it matters">
          Every image, song and message your phone handles is ultimately binary. Hex is
          how colours are written in CSS — <code>#FF00AA</code> is RGB in base 16.
        </Callout>
      </Section>
    </ChapterLayout>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { ChapterLayout, Section, Callout, QuickCheck, PYQ } from "@/components/ChapterLayout";

export const Route = createFileRoute("/xi/computer-systems")({
  head: () => ({
    meta: [
      { title: "Computer Systems & Boolean Logic — CS 083 Class XI" },
      {
        name: "description",
        content:
          "In-depth notes on hardware vs software, CPU & memory hierarchy, number systems, Boolean algebra, logic gates and De Morgan's laws for CBSE Class XI Computer Science.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <ChapterLayout slug="/xi/computer-systems">
      <Section title="What is a computer system?">
        <p>
          A <b>computer</b> is an electronic device that accepts <b>input</b>, processes
          it according to a stored <b>program</b>, produces <b>output</b> and stores
          results. The complete system has four functional units:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Input Unit</b> — keyboard, mouse, scanner, microphone, touch screen.</li>
          <li><b>CPU (Central Processing Unit)</b> — the "brain" containing ALU, CU and registers.</li>
          <li><b>Memory Unit</b> — primary (RAM/ROM) and secondary (HDD/SSD/USB).</li>
          <li><b>Output Unit</b> — monitor, printer, speakers, projector.</li>
        </ul>
        <Callout>
          When you tap "Send" on Instagram, the touch is <b>input</b>, the phone's CPU
          encrypts and packages your message, RAM keeps it temporarily, the network
          card transmits it, and the recipient's screen shows the <b>output</b>.
        </Callout>
      </Section>

      <Section title="Hardware vs Software">
        <p>
          <b>Hardware</b> = the physical, touchable parts (CPU chip, hard disk, monitor).
          <b> Software</b> = the set of programs/instructions that tell hardware what to
          do. Hardware is useless without software, and software cannot run without
          hardware — they form a complete system together.
        </p>
        <p>
          Software is broadly classified into:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <b>System Software</b> — runs and manages the computer itself.
            <ul className="mt-1 list-[circle] space-y-0.5 pl-5">
              <li><b>Operating System</b> (Windows, Linux, macOS, Android, iOS) — manages CPU, memory, files, devices.</li>
              <li><b>Device Drivers</b> — software that lets the OS talk to a specific hardware device (printer driver, GPU driver).</li>
              <li><b>Language Processors</b> — Assembler, Compiler, Interpreter (see below).</li>
              <li><b>Utilities</b> — antivirus, disk cleaner, backup tools, file compressors.</li>
            </ul>
          </li>
          <li>
            <b>Application Software</b> — solves user-level problems.
            <ul className="mt-1 list-[circle] space-y-0.5 pl-5">
              <li><b>General Purpose</b> — MS Word, Chrome, VLC, Photoshop.</li>
              <li><b>Customised / Specific</b> — Tally (accounting), Railway reservation, Hospital ERP.</li>
            </ul>
          </li>
          <li>
            <b>Free & Open Source Software (FOSS)</b> — Linux, LibreOffice, Python, Firefox.
            Source code is freely available; you can read, modify and redistribute it.
          </li>
        </ul>
      </Section>

      <Section title="Compiler vs Interpreter vs Assembler">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <b>Assembler</b> — converts <b>assembly language</b> (mnemonics like MOV, ADD)
            into <b>machine code</b> (0s and 1s).
          </li>
          <li>
            <b>Compiler</b> — translates the <i>entire</i> high-level program once into a
            standalone executable (e.g. <code>gcc</code> for C, C++). Faster execution,
            but errors only show after full compilation.
          </li>
          <li>
            <b>Interpreter</b> — translates and executes <i>line by line</i> (e.g. Python,
            JavaScript). Easier debugging, but slower at runtime.
          </li>
        </ul>
        <Callout label="Exam tip">
          Python is interpreted, so <code>print("hi")</code> runs immediately even if line
          50 of your file has a syntax error in code that hasn't executed yet.
        </Callout>
      </Section>

      <Section title="The CPU in detail">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>ALU (Arithmetic & Logic Unit)</b> — performs +, −, ×, ÷, AND, OR, NOT, comparisons.</li>
          <li><b>CU (Control Unit)</b> — fetches instructions, decodes them, and signals other units.</li>
          <li><b>Registers</b> — tiny ultra-fast storage inside the CPU (PC, IR, AC, MAR, MDR).</li>
          <li><b>Clock speed</b> — measured in GHz (1 GHz = 10⁹ cycles per second).</li>
          <li><b>Cores</b> — independent processing units; a quad-core CPU can run 4 things truly in parallel.</li>
        </ul>
      </Section>

      <Section title="Memory hierarchy">
        <p>From fastest & smallest to slowest & largest:</p>
        <pre className="rounded-md border border-border bg-[var(--code-bg)] p-3 font-mono text-xs">{`Registers   →  ~few bytes,    inside CPU,    ~1 ns
Cache (L1/L2/L3) →  KB to MB,  inside CPU,    ~5 ns
RAM (Primary)   →  GB,         volatile,      ~100 ns
SSD             →  100s GB,    non-volatile,  ~50 µs
HDD             →  TB,         non-volatile,  ~10 ms
Tape / Cloud    →  PB,         archival,      seconds`}</pre>
        <p>
          <b>Primary memory</b>: RAM (volatile — lost on power off) and ROM (non-volatile,
          stores BIOS/firmware).<br />
          <b>Secondary memory</b>: HDD, SSD, USB, DVD — permanent storage.<br />
          <b>Cache memory</b> sits between CPU and RAM to speed up frequent access.
        </p>
      </Section>

      <Section title="Memory units">
        <pre className="rounded-md border border-border bg-[var(--code-bg)] p-3 font-mono text-xs">{`1 nibble = 4 bits
1 byte   = 8 bits
1 KB     = 1024 B
1 MB     = 1024 KB
1 GB     = 1024 MB
1 TB     = 1024 GB
1 PB     = 1024 TB
1 EB     = 1024 PB`}</pre>
        <p>
          1 character (ASCII) = 1 byte. A 5 MP photo ≈ 2 MB. A 1080p movie ≈ 1.5 GB.
        </p>
      </Section>

      <Section title="Number systems">
        <p>
          A <b>positional number system</b> with base <i>b</i> uses digits 0…(b−1). The
          value of each digit is digit × b<sup>position</sup>.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Decimal (base 10)</b> — digits 0–9. Used by humans.</li>
          <li><b>Binary (base 2)</b> — digits 0,1. Used by computers internally.</li>
          <li><b>Octal (base 8)</b> — digits 0–7. Compact representation of binary.</li>
          <li><b>Hexadecimal (base 16)</b> — digits 0–9, A–F. Used in colour codes, memory addresses, MAC addresses.</li>
        </ul>
        <p><b>Worked example:</b> Convert <code>(45)₁₀</code> to binary:</p>
        <pre className="rounded-md border border-border bg-[var(--code-bg)] p-3 font-mono text-xs">{`45 / 2 = 22  rem 1  ↑
22 / 2 = 11  rem 0
11 / 2 =  5  rem 1
 5 / 2 =  2  rem 1
 2 / 2 =  1  rem 0
 1 / 2 =  0  rem 1
Reading bottom → top:  (101101)₂`}</pre>
        <p><b>Binary → Decimal:</b> <code>(1101)₂ = 1·8 + 1·4 + 0·2 + 1·1 = 13</code>.</p>
        <p><b>Octal & Hex shortcuts:</b> group binary into 3 bits (octal) or 4 bits (hex).</p>
        <pre className="rounded-md border border-border bg-[var(--code-bg)] p-3 font-mono text-xs">{`(11010110)₂  →  (1101 0110)  →  D 6   = (D6)₁₆
(11010110)₂  →  (11 010 110) →  3 2 6 = (326)₈`}</pre>
        <Callout label="Why hex?">
          A 32-bit IP address is unreadable in binary but tidy in hex. CSS colours
          like <code>#FF0080</code> mean R=255, G=0, B=128 — instantly readable for designers.
        </Callout>
      </Section>

      <Section title="Character encoding">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>ASCII</b> — 7-bit, 128 characters (English letters, digits, symbols). 'A' = 65, 'a' = 97.</li>
          <li><b>ISCII</b> — Indian Script Code, supports Devanagari, Tamil, etc.</li>
          <li><b>Unicode (UTF-8/16/32)</b> — universal standard with 1.1+ million code points; supports every script and emoji.</li>
        </ul>
      </Section>

      <Section title="Boolean logic & gates">
        <p>
          Boolean algebra works with two values: <b>0 (false)</b> and <b>1 (true)</b>.
          Every digital circuit is built from three basic gates:
        </p>
        <pre className="rounded-md border border-border bg-[var(--code-bg)] p-3 font-mono text-xs">{`A B | A AND B | A OR B | NOT A | A XOR B | A NAND B | A NOR B
0 0 |    0    |   0    |   1   |    0    |     1    |    1
0 1 |    0    |   1    |   1   |    1    |     1    |    0
1 0 |    0    |   1    |   0   |    1    |     1    |    0
1 1 |    1    |   1    |   0   |    0    |     0    |    0`}</pre>
        <p><b>Boolean identities:</b></p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Identity: A·1 = A,  A+0 = A</li>
          <li>Null: A·0 = 0,  A+1 = 1</li>
          <li>Idempotent: A·A = A,  A+A = A</li>
          <li>Complement: A·A' = 0,  A+A' = 1</li>
          <li>Commutative: A+B = B+A,  A·B = B·A</li>
          <li>Associative: A+(B+C) = (A+B)+C</li>
          <li>Distributive: A·(B+C) = A·B + A·C</li>
          <li>Absorption: A+A·B = A,  A·(A+B) = A</li>
        </ul>
        <p>
          <b>De Morgan's Laws:</b><br />
          <code>(A · B)' = A' + B'</code><br />
          <code>(A + B)' = A' · B'</code>
        </p>
        <Callout>
          Real-world: a smoke alarm fires when "smoke detected AND power is on AND NOT
          test mode" — all three Boolean conditions must be true.
        </Callout>
      </Section>

      <Section title="Practice">
        <QuickCheck
          question="Which of these is system software?"
          options={["MS Word", "Chrome", "Windows OS", "VLC Player"]}
          answer="Windows OS"
          hint="System software runs the computer; application software solves user tasks."
        />
        <QuickCheck
          question="Convert (29)₁₀ to binary."
          answer="11101"
          hint="29 = 16 + 8 + 4 + 1."
        />
        <QuickCheck
          question="By De Morgan: (A + B)' equals ?"
          options={["A' · B'", "A · B", "A' + B'", "A + B'"]}
          answer="A' · B'"
        />
      </Section>
    
        <Section title="Deeper theory: memory hierarchy & data representation">
          <p>
            Modern computers organise memory in a <strong>hierarchy</strong>:
            registers (fastest, smallest) → L1/L2/L3 cache → RAM → SSD/HDD →
            tape/cloud (slowest, largest, cheapest per byte). Higher levels are
            faster but more expensive per byte.
          </p>
          <ul className="ml-5 list-disc space-y-1 text-sm">
            <li><strong>RAM</strong> is volatile (loses data on power off); <strong>ROM</strong> is non-volatile and stores firmware/BIOS.</li>
            <li><strong>Cache</strong> sits between CPU and RAM to keep frequently used data close to the processor.</li>
            <li><strong>Bit</strong> = 0 or 1; <strong>Byte</strong> = 8 bits; 1 KB = 1024 B; 1 MB = 1024 KB.</li>
            <li><strong>ASCII</strong> uses 7 bits (128 chars); <strong>Unicode/UTF-8</strong> supports every script (Hindi, emoji…).</li>
            <li><strong>System software</strong> (OS, compilers, drivers) manages hardware; <strong>application software</strong> solves user problems.</li>
          </ul>
          <p className="text-sm">
            <strong>De Morgan's Laws:</strong> (A·B)' = A' + B' and (A+B)' = A'·B'
            — used to simplify Boolean expressions and to convert between AND/OR
            forms when designing logic circuits.
          </p>
        </Section>

        <Section title="Previous Year Questions (PYQs)">
          <PYQ year="CBSE 2023" marks={1}
            question={<>Convert (101101)₂ to decimal.</>}
            answer={<>1·32 + 0·16 + 1·8 + 1·4 + 0·2 + 1·1 = <strong>45</strong></>}
          />
          <PYQ year="CBSE 2022" marks={2}
            question={<>Convert (75)₁₀ to (i) binary and (ii) hexadecimal.</>}
            answer={<>
              <p>(i) 75 ÷ 2 repeatedly → remainders 1,1,0,1,0,0,1 → <strong>(1001011)₂</strong></p>
              <p>(ii) 75 = 4·16 + 11 → <strong>(4B)₁₆</strong></p>
            </>}
          />
          <PYQ year="CBSE 2024" marks={2}
            question={<>State and verify De Morgan's first law for two variables.</>}
            answer={<>
              <p>Statement: <code>(A·B)' = A' + B'</code></p>
              <pre className="mt-1 overflow-x-auto rounded bg-[var(--code-bg)] p-2 text-xs">{`A B | A·B (A·B)'  A' B' A'+B'
0 0 |  0    1     1  1   1
0 1 |  0    1     1  0   1
1 0 |  0    1     0  1   1
1 1 |  1    0     0  0   0`}</pre>
              <p>Columns (A·B)' and A'+B' are identical, so the law is verified.</p>
            </>}
          />
        </Section>

        <Section title="More MCQs">
          <QuickCheck question="Which gate gives output 1 only when both inputs are 1?"
            options={["OR", "AND", "NAND", "XOR"]} answer="AND" />
          <QuickCheck question="Hexadecimal of (255)₁₀ is:"
            options={["FE", "FF", "F0", "EF"]} answer="FF" />
          <QuickCheck question="Which memory loses contents on power off?"
            options={["ROM", "Flash", "RAM", "HDD"]} answer="RAM" />
          <QuickCheck question="A·A' equals:"
            options={["A", "1", "0", "A'"]} answer="0" />
          <QuickCheck question="Universal gate?"
            options={["AND", "OR", "NAND", "XOR"]} answer="NAND" />
        </Section>
      </ChapterLayout>
  );
}

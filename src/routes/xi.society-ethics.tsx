import { createFileRoute } from "@tanstack/react-router";
import { ChapterLayout, Section, Callout } from "@/components/ChapterLayout";

export const Route = createFileRoute("/xi/society-ethics")({
  head: () => ({
    meta: [
      { title: "Society, Law & Ethics — CS 083 Class XI" },
      {
        name: "description",
        content:
          "Digital footprints, IPR, cybercrime, cyber safety, malware, e-waste and the IT Act for CBSE Class XI Computer Science.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <ChapterLayout slug="/xi/society-ethics">
      <Section title="Digital footprint">
        <p>
          Every search, like, post and login leaves a trace — your{" "}
          <b>digital footprint</b>. Active footprint = what you post; passive = data
          collected without your direct input (cookies, location).
        </p>
        <Callout>
          A future employer can search your name and find old tweets. Always pause
          before posting.
        </Callout>
      </Section>

      <Section title="Intellectual Property Rights (IPR)">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <b>Copyright</b> — protects creative works (songs, code, books).
          </li>
          <li>
            <b>Patent</b> — protects inventions (a new chip design).
          </li>
          <li>
            <b>Trademark</b> — protects brand identity (the Apple logo).
          </li>
          <li>
            Violations: <b>plagiarism</b>, <b>copyright infringement</b>,{" "}
            <b>trademark infringement</b>.
          </li>
          <li>
            Open licences: <b>Creative Commons</b>, <b>GPL</b>, <b>Apache</b>.
          </li>
        </ul>
      </Section>

      <Section title="Cybercrime & cyber safety">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <b>Hacking, phishing, ransomware, cyber bullying, trolls, eavesdropping.</b>
          </li>
          <li>
            Stay safe: HTTPS sites, strong unique passwords, 2FA, don't share OTPs,
            verify links before clicking.
          </li>
          <li>
            Malware types: <b>virus</b> (attaches to files), <b>trojan</b> (disguised
            as legit software), <b>adware</b> (forces ads).
          </li>
        </ul>
      </Section>

      <Section title="E-waste & IT Act">
        <p>
          E-waste = discarded electronics. Dispose through authorised recyclers — never
          burn or dump. India's <b>IT Act, 2000</b> (amended 2008) defines digital
          signatures and penalties for cyber offences.
        </p>
      </Section>
    </ChapterLayout>
  );
}

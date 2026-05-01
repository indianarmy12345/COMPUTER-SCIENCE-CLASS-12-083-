import { createFileRoute } from "@tanstack/react-router";
import { ChapterLayout, Section, Callout, QuickCheck, PYQ } from "@/components/ChapterLayout";

export const Route = createFileRoute("/xi/society-ethics")({
  head: () => ({
    meta: [
      { title: "Society, Law & Ethics — CS 083 Class XI" },
      {
        name: "description",
        content:
          "Detailed notes on digital footprint, netiquette, IPR, plagiarism, licensing, cybercrime, malware, cyber safety, e-waste and the Indian IT Act for CBSE Class XI.",
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
          Every action you take online — searches, likes, comments, posts, location
          check-ins, app installs, OTP requests — leaves a trace called your{" "}
          <b>digital footprint</b>. It is essentially permanent and can be traced back
          to you years later.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <b>Active footprint</b> — data you intentionally share: tweets, profile
            photos, blog posts, comments.
          </li>
          <li>
            <b>Passive footprint</b> — data collected without your direct action:
            cookies, IP address, location pings, browsing history, ad-tracking pixels.
          </li>
        </ul>
        <p><b>Managing your footprint:</b></p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Think before you post — screenshots are forever.</li>
          <li>Use privacy settings; review app permissions monthly.</li>
          <li>Use private/incognito mode for sensitive searches.</li>
          <li>Delete old accounts and unused apps.</li>
        </ul>
        <Callout>
          Recruiters and college admissions officers routinely Google candidates. A
          rude tweet from age 14 can cost a job offer at age 24.
        </Callout>
      </Section>

      <Section title="Net & communication etiquette (Netiquette)">
        <ul className="list-disc space-y-1 pl-5">
          <li>Be respectful — no hate speech, trolling or personal attacks.</li>
          <li>Don't TYPE IN ALL CAPS — it's read as shouting.</li>
          <li>Respect privacy — don't forward private chats or photos without consent.</li>
          <li>Cite sources when you quote others; don't plagiarise.</li>
          <li>Don't spam, don't share fake news, verify before forwarding.</li>
          <li>Use professional language in emails: greeting, body, sign-off.</li>
        </ul>
      </Section>

      <Section title="Data protection & privacy">
        <p>
          <b>Personal data</b> includes name, address, Aadhaar, phone, biometrics,
          location, photos, browsing history. Sensitive personal data also covers
          health records, financial data and sexual orientation.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>India's <b>Digital Personal Data Protection Act, 2023</b> regulates how organisations collect and use personal data.</li>
          <li>Use HTTPS sites for any login or payment.</li>
          <li>Use unique passwords per site; enable <b>2-Factor Authentication (2FA)</b>.</li>
          <li>Beware of "free" apps — if it's free, you are usually the product (your data is sold to advertisers).</li>
        </ul>
      </Section>

      <Section title="Intellectual Property Rights (IPR)">
        <p>
          IPR are legal rights protecting creations of the mind. They reward inventors
          and stop others from copying their work without permission.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Copyright</b> — protects original creative works (books, music, software code, paintings, films). Lasts the author's life + 60 years (India).</li>
          <li><b>Patent</b> — protects new inventions (a chip design, a vaccine, a mechanism). Valid 20 years from filing.</li>
          <li><b>Trademark</b> — protects brand identity: name, logo, slogan (e.g. the Apple logo, "Just do it"). Renewable indefinitely every 10 years.</li>
          <li><b>Trade secret</b> — confidential business info (Coca-Cola formula).</li>
        </ul>
        <p><b>Violations:</b></p>
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Plagiarism</b> — passing off someone else's work as your own.</li>
          <li><b>Copyright infringement</b> — pirating movies, songs, software.</li>
          <li><b>Trademark infringement</b> — using a brand's logo on counterfeit goods.</li>
        </ul>
      </Section>

      <Section title="Public access & open licences">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Public domain</b> — work whose copyright has expired or been waived; anyone can use freely.</li>
          <li><b>Creative Commons (CC)</b> — flexible copyright licences. Variants: CC-BY (must credit), CC-BY-SA (share alike), CC-BY-NC (non-commercial), CC0 (no rights reserved).</li>
          <li><b>GPL (GNU Public License)</b> — free to use, modify and distribute, but derivatives must remain GPL ("copyleft"). Used by Linux.</li>
          <li><b>Apache / MIT / BSD</b> — permissive open-source licences; you can even use them in closed-source products with attribution.</li>
        </ul>
      </Section>

      <Section title="Cybercrime">
        <p>
          A <b>cybercrime</b> is any criminal activity that uses or targets a computer
          or network. Common types:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Hacking</b> — unauthorised access to a system. Ethical (white-hat) hacking is legal and paid; black-hat is illegal.</li>
          <li><b>Phishing</b> — fake emails/SMS trick you into giving passwords or OTPs (e.g. "Your KYC is pending, click here").</li>
          <li><b>Identity theft</b> — using someone's Aadhaar, PAN or photos to impersonate them.</li>
          <li><b>Cyber bullying / trolling</b> — repeated online harassment.</li>
          <li><b>Cyber stalking</b> — secretly tracking a person's online activity or location.</li>
          <li><b>Ransomware</b> — encrypts your files and demands money for the decryption key (e.g. WannaCry).</li>
          <li><b>Eavesdropping / sniffing</b> — intercepting data on unsecured Wi-Fi.</li>
          <li><b>Denial of Service (DoS / DDoS)</b> — flooding a server with requests so it crashes.</li>
        </ul>
      </Section>

      <Section title="Malware">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Virus</b> — attaches to a host file; spreads when the file runs.</li>
          <li><b>Worm</b> — self-replicates over a network without needing a host.</li>
          <li><b>Trojan horse</b> — disguised as a useful program but carries hidden malicious code.</li>
          <li><b>Spyware</b> — secretly records keystrokes, screen, microphone.</li>
          <li><b>Adware</b> — bombards you with unwanted ads, redirects browser.</li>
          <li><b>Ransomware</b> — demands payment to restore your files.</li>
          <li><b>Rootkit</b> — hides deep in the OS to give an attacker continued access.</li>
        </ul>
        <p><b>Defence:</b> install reputable antivirus, keep OS updated, don't click unknown links, scan USB drives, back up data regularly.</p>
      </Section>

      <Section title="Cyber safety best practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Use strong passwords (12+ chars, mix of cases, digits, symbols). Use a password manager.</li>
          <li>Turn on 2FA everywhere; never share OTPs.</li>
          <li>Look for HTTPS and the padlock icon before logging in or paying.</li>
          <li>Avoid public Wi-Fi for banking; use a VPN if necessary.</li>
          <li>Verify URLs — <code>amaz0n.com</code> with a zero is fake.</li>
          <li>Lock your phone; encrypt your laptop disk.</li>
          <li>Report cybercrime at <code>cybercrime.gov.in</code>.</li>
        </ul>
      </Section>

      <Section title="E-waste & responsible disposal">
        <p>
          <b>E-waste</b> is discarded electronic equipment — phones, laptops, batteries,
          chargers, TVs. It contains toxic metals (lead, mercury, cadmium) which leak
          into soil and water if dumped.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Reduce</b> — buy quality, repair instead of replacing.</li>
          <li><b>Reuse / Donate</b> — give old devices to schools or NGOs.</li>
          <li><b>Recycle</b> through authorised e-waste collectors (CPCB-certified).</li>
          <li>India's <b>E-Waste (Management) Rules, 2022</b> make manufacturers responsible for take-back (Extended Producer Responsibility).</li>
        </ul>
      </Section>

      <Section title="Health concerns of technology">
        <ul className="list-disc space-y-1 pl-5">
          <li>Eye strain, dry eyes, headaches — follow the <b>20-20-20 rule</b> (every 20 min, look 20 ft away for 20 sec).</li>
          <li>Repetitive Strain Injury (RSI), carpal tunnel — use ergonomic keyboards.</li>
          <li>Back & neck pain — adjust chair/monitor height.</li>
          <li>Sleep disruption from blue light — enable night mode after sunset.</li>
          <li>Internet addiction, social media anxiety — set screen-time limits.</li>
        </ul>
      </Section>

      <Section title="The Information Technology Act, 2000">
        <p>
          The <b>IT Act 2000</b> (amended 2008) is India's primary cyber law. It gives
          legal recognition to electronic documents and digital signatures, and defines
          penalties for cyber offences.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Section 43</b> — damaging a computer system → compensation.</li>
          <li><b>Section 65</b> — tampering with source code → up to 3 years jail.</li>
          <li><b>Section 66</b> — hacking → up to 3 years jail and ₹5 lakh fine.</li>
          <li><b>Section 66C</b> — identity theft.</li>
          <li><b>Section 66D</b> — cheating by impersonation online (phishing).</li>
          <li><b>Section 66E</b> — violation of privacy (capturing/transmitting private images).</li>
          <li><b>Section 67</b> — publishing obscene material in electronic form.</li>
          <li><b>Section 69</b> — government's power to intercept/monitor for security.</li>
        </ul>
      </Section>

      <Section title="Practice">
        <QuickCheck
          question="Which is an example of a passive digital footprint?"
          options={["Posting a tweet", "Liking a photo", "A website storing a tracking cookie", "Uploading a profile picture"]}
          answer="A website storing a tracking cookie"
        />
        <QuickCheck
          question="Which IPR protects an inventor's new device?"
          options={["Copyright", "Patent", "Trademark", "Trade Secret"]}
          answer="Patent"
        />
        <QuickCheck
          question="Which Section of the IT Act deals with identity theft?"
          options={["Section 65", "Section 66C", "Section 67", "Section 69"]}
          answer="Section 66C"
        />
      </Section>
    </ChapterLayout>
  );
}

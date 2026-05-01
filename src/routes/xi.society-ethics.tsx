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
    
        <Section title="Deeper theory: digital citizenship & cyber laws">
          <p>
            Every online action you take — a tweet, a like, a search — leaves a
            trace called your <strong>digital footprint</strong>. Footprints are
            <strong> active</strong> (data you intentionally share: posts,
            uploads) or <strong>passive</strong> (data collected without your
            direct input: cookies, IP logs, location). Once posted online,
            information is hard to erase, so think before you share.
          </p>
          <ul className="ml-5 list-disc space-y-1 text-sm">
            <li><strong>Netiquette:</strong> respect others' privacy, avoid ALL CAPS (= shouting), don't spam, give credit, fact-check before forwarding.</li>
            <li><strong>Plagiarism</strong> = presenting someone else's work as your own. Always cite sources; use quotation marks for direct text.</li>
            <li><strong>IPR (Intellectual Property Rights):</strong> Copyright (creative works), Patent (inventions), Trademark (brand symbols).</li>
            <li><strong>Licences:</strong> Proprietary (Microsoft Office), Open Source (Apache, MIT), Copyleft (GPL — derivatives must stay open), Creative Commons (CC-BY, CC-BY-SA…).</li>
            <li><strong>Cybercrime:</strong> hacking, phishing, identity theft, cyberstalking, ransomware, fraud.</li>
            <li><strong>Malware types:</strong> virus (attaches to files), worm (spreads on its own), trojan (disguised as useful), ransomware (encrypts and demands money), spyware (steals data).</li>
            <li><strong>E-waste:</strong> handle through certified recyclers; never dump batteries or CRT screens in regular trash — they leak lead, mercury and cadmium.</li>
          </ul>
          <p className="text-sm">
            <strong>IT Act 2000 (India):</strong> Section 43 (damage to
            computer/data, civil penalty), Section 66 (hacking — up to 3 years +
            fine), Section 66C (identity theft), Section 66D (cheating by
            impersonation), Section 67 (publishing obscene material), Section
            72 (breach of confidentiality).
          </p>
        </Section>

        <Section title="Previous Year Questions (PYQs)">
          <PYQ year="CBSE 2023" marks={1}
            question={<>Define digital footprint.</>}
            answer={<>A digital footprint is the trail of data you create whenever you use the internet — websites you visit, emails you send, posts you publish — which can be traced back to you.</>}
          />
          <PYQ year="CBSE 2022" marks={2}
            question={<>What is phishing? Mention one way to protect yourself.</>}
            answer={<>
              <p><strong>Phishing</strong> is a cybercrime where attackers send fake emails/SMS/websites that look genuine to trick you into revealing passwords, OTPs or card details.</p>
              <p><strong>Protection:</strong> never click suspicious links; verify the URL (HTTPS + correct domain); enable two-factor authentication; never share OTPs.</p>
            </>}
          />
          <PYQ year="CBSE 2024" marks={2}
            question={<>Differentiate between Free Software and Open-Source Software.</>}
            answer={<>
              <p><strong>Free software</strong> (FSF/GNU) emphasises the user's <em>freedom</em> to run, study, modify and redistribute — often with copyleft (GPL) so derivatives stay free.</p>
              <p><strong>Open-source software</strong> (OSI) emphasises the practical/development advantages of open code (collaboration, peer review). All free software is open source, but some open-source licences (e.g. MIT, Apache) allow proprietary derivatives.</p>
            </>}
          />
          <PYQ year="CBSE 2023" marks={3}
            question={<>List any three precautions a student should take to ensure cyber safety.</>}
            answer={<>
              <ul className="ml-5 list-disc">
                <li>Use strong, unique passwords and enable two-factor authentication.</li>
                <li>Keep OS, browser and antivirus up to date; never download software from untrusted sources.</li>
                <li>Never share personal information (address, phone, OTP, school ID) on public platforms.</li>
                <li>Review privacy settings on social media and accept friend requests only from known people.</li>
                <li>Avoid public Wi-Fi for banking; use HTTPS and a VPN if needed.</li>
              </ul>
            </>}
          />
        </Section>

        <Section title="More MCQs">
          <QuickCheck question="Which type of malware self-replicates across networks without user action?"
            options={["Virus", "Worm", "Trojan", "Spyware"]} answer="Worm" />
          <QuickCheck question="CC-BY-SA stands for:"
            options={["Creative Commons – Buy & Share", "Creative Commons – Attribution & ShareAlike", "Copy Code – By Author", "Common Code – Standard Authorisation"]}
            answer="Creative Commons – Attribution & ShareAlike" />
          <QuickCheck question="Which IT Act section deals with identity theft?"
            options={["43", "66", "66C", "67"]} answer="66C" />
          <QuickCheck question="E-waste contains harmful element:"
            options={["Carbon", "Mercury", "Iron", "Calcium"]} answer="Mercury" />
          <QuickCheck question="Right granted for an invention is called:"
            options={["Copyright", "Patent", "Trademark", "Licence"]} answer="Patent" />
        </Section>
      </ChapterLayout>
  );
}

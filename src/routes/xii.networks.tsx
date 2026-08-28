import { createFileRoute } from "@tanstack/react-router";
import { ChapterLayout, Section, Callout, QuickCheck, PYQ, MostAsked } from "@/components/ChapterLayout";

export const Route = createFileRoute("/xii/networks")({
  head: () => ({
    meta: [
      { title: "Computer Networks — CS 083 Class XII" },
      {
        name: "description",
        content:
          "Detailed networking notes for CBSE Class XII — evolution, switching, transmission media, devices, topologies, network types, IP/MAC, protocols, web services and cloud.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <ChapterLayout slug="/xii/networks">
      <Section title="What is a computer network?">
        <p>
          A <b>computer network</b> is a group of two or more computing devices
          connected together so they can <b>share data and resources</b> (files,
          printers, internet). Benefits:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Resource sharing — one printer for the whole office.</li>
          <li>File sharing — Google Drive, school server.</li>
          <li>Communication — email, video calls, chat.</li>
          <li>Centralised storage and backup.</li>
          <li>Cost savings — shared internet, shared software licences.</li>
        </ul>
      </Section>

      <Section title="Evolution of networking">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>ARPANET</b> (1969) — first packet-switched network, US Department of Defense; linked 4 universities.</li>
          <li><b>NSFNET</b> (1986) — National Science Foundation network in the US, opened to academia.</li>
          <li><b>INTERNET</b> — the global "network of networks" today; uses TCP/IP and is owned by no one.</li>
          <li><b>Interspace</b> — a vision of a 3D, multi-user collaborative environment over the internet.</li>
        </ul>
      </Section>

      <Section title="Data communication terms">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Sender</b>, <b>Receiver</b>, <b>Message</b>, <b>Medium</b>, <b>Protocol</b> — the 5 components.</li>
          <li><b>Bandwidth</b> — max data the channel can carry, measured in Hz or bits/s.</li>
          <li><b>Data transfer rate</b> — actual bits transferred per second (bps, Kbps, Mbps, Gbps).</li>
          <li><b>Bit rate vs Baud rate</b> — bits/s vs signal changes/s.</li>
          <li><b>Latency</b> — delay between sending and receiving (ping in ms).</li>
          <li><b>Throughput</b> — measured useful data rate.</li>
          <li><b>Noise & Attenuation</b> — unwanted signal and signal weakening over distance.</li>
        </ul>
      </Section>

      <Section title="Switching techniques">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <b>Circuit switching</b> — a dedicated path is reserved for the entire
            conversation (old telephone calls). Wastes bandwidth when idle but
            guarantees quality.
          </li>
          <li>
            <b>Message switching</b> — entire message stored at intermediate nodes,
            then forwarded ("store-and-forward"). Slow.
          </li>
          <li>
            <b>Packet switching</b> — message split into small <b>packets</b>; each
            packet may take a different route, reassembled at destination. Used by the
            Internet. Efficient and fault-tolerant.
          </li>
        </ul>
      </Section>

      <Section title="Transmission media">
        <p><b>Wired (Guided):</b></p>
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Twisted Pair</b> (UTP/STP) — Cat5e, Cat6 LAN cables. Cheap, used in offices and homes.</li>
          <li><b>Coaxial</b> — single thick conductor, used for cable TV and older broadband.</li>
          <li><b>Fibre Optic</b> — light through glass core. Very high bandwidth (Gbps–Tbps), no EMI, used in undersea/internet backbones.</li>
        </ul>
        <p><b>Wireless (Unguided):</b></p>
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Radio waves</b> — Wi-Fi, FM/AM radio, cordless phones.</li>
          <li><b>Microwaves</b> — line-of-sight, mobile towers, satellite links.</li>
          <li><b>Infrared</b> — short-range, line-of-sight (TV remote, old IrDA).</li>
          <li><b>Bluetooth</b> — 2.4 GHz, ~10 m, headphones, file share.</li>
          <li><b>Satellite</b> — geostationary; used for remote areas, broadcast, GPS.</li>
        </ul>
      </Section>

      <Section title="Network devices">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>NIC (Network Interface Card)</b> — hardware that gives each device a unique MAC address; the actual port your cable plugs into.</li>
          <li><b>Modem</b> — Modulator-Demodulator; converts digital ↔ analog so data can travel over phone/cable lines (your ISP box).</li>
          <li><b>Repeater</b> — regenerates a weak signal so it can travel further.</li>
          <li><b>Hub</b> — broadcasts incoming data to all ports (dumb device, rarely used today).</li>
          <li><b>Switch</b> — sends data only to the intended port using MAC addresses (smart hub).</li>
          <li><b>Bridge</b> — connects two LAN segments and filters traffic between them.</li>
          <li><b>Router</b> — connects different networks (your home Wi-Fi router connects LAN ↔ Internet); uses IP addresses.</li>
          <li><b>Gateway</b> — connects networks that use different protocols (entry/exit point).</li>
          <li><b>Access Point (AP)</b> — provides wireless connectivity for a wired network.</li>
        </ul>
      </Section>

      <Section title="Network topologies">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <b>Bus</b> — single backbone cable; cheap; entire network fails if backbone breaks; collisions common.
          </li>
          <li>
            <b>Star</b> — every device connects to a central hub/switch; easy to add/remove nodes; central failure = whole network down. <b>Most common</b> in modern offices and homes.
          </li>
          <li>
            <b>Ring</b> — each node connects to two neighbours forming a circle; data travels in one direction; one break disrupts all.
          </li>
          <li>
            <b>Mesh</b> — every node connects to every other node; very reliable, very expensive cabling; used in military and Internet backbones.
          </li>
          <li>
            <b>Tree</b> — hierarchy of star networks (a backbone with star branches); used in cable TV networks and large enterprises.
          </li>
        </ul>
      </Section>

      <Section title="Network types by area">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>PAN (Personal Area Network)</b> — within a few metres; Bluetooth headphones, your phone hotspot.</li>
          <li><b>LAN (Local Area Network)</b> — within a building/campus; school computer lab, home Wi-Fi. High speed, owned by one organisation.</li>
          <li><b>MAN (Metropolitan Area Network)</b> — across a city; cable TV networks, citywide Wi-Fi.</li>
          <li><b>WAN (Wide Area Network)</b> — across countries/continents; the Internet itself, banking networks.</li>
        </ul>
      </Section>

      <Section title="Identifying devices on a network">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <b>MAC address</b> — 48-bit hardware address burned into NIC, written as
            6 hex pairs e.g. <code>1A:2B:3C:4D:5E:6F</code>. Permanent and unique.
          </li>
          <li>
            <b>IP address</b> — logical address assigned by the network.
            <ul className="mt-1 list-[circle] space-y-0.5 pl-5">
              <li><b>IPv4</b> — 32-bit, four octets, e.g. <code>192.168.1.5</code> (~4.3 billion possible).</li>
              <li><b>IPv6</b> — 128-bit, eight hex groups, e.g. <code>2001:0db8::1</code> (effectively unlimited).</li>
            </ul>
          </li>
          <li><b>Domain name</b> — human-friendly name like <code>cbse.gov.in</code>.</li>
          <li><b>DNS (Domain Name System)</b> — translates domain names to IP addresses.</li>
          <li><b>URL</b> — Uniform Resource Locator: <code>https://example.com:443/path?q=1</code>.</li>
        </ul>
      </Section>

      <Section title="Common protocols">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>TCP/IP</b> — the internet's core suite. TCP guarantees delivery and order; IP routes packets.</li>
          <li><b>UDP</b> — fast, connectionless; used by video calls and online games where speed matters more than perfect delivery.</li>
          <li><b>HTTP / HTTPS</b> — web browsing (HTTPS = HTTP over SSL/TLS, encrypted).</li>
          <li><b>FTP</b> — File Transfer Protocol; upload/download files between client and server.</li>
          <li><b>SMTP</b> — sends email out from a client to a mail server.</li>
          <li><b>POP3 / IMAP</b> — retrieves email from server (POP3 downloads, IMAP keeps a synced copy).</li>
          <li><b>TELNET / SSH</b> — remote login to another computer (SSH is secure).</li>
          <li><b>VoIP</b> — Voice over IP; WhatsApp/Teams calls, Skype.</li>
          <li><b>PPP</b> — Point-to-Point Protocol used by dial-up/DSL.</li>
          <li><b>DHCP</b> — automatically assigns IP addresses to devices joining a network.</li>
        </ul>
      </Section>

      <Section title="Web & web services">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>WWW</b> — collection of interlinked documents (web pages) accessible via the Internet.</li>
          <li><b>Web server</b> — software (Apache, Nginx) that stores and serves web pages.</li>
          <li><b>Web browser</b> — Chrome, Firefox, Safari — requests and renders pages.</li>
          <li><b>HTML</b> — structures content. <b>CSS</b> — styling. <b>JavaScript</b> — interactivity.</li>
          <li><b>XML / JSON</b> — data exchange formats between systems.</li>
          <li><b>Web hosting</b> — putting your site on a public server.</li>
          <li><b>Web 2.0</b> — interactive, user-generated content (Wikipedia, YouTube, Instagram).</li>
        </ul>
        <Callout>
          When you type <code>www.cbse.gov.in</code>, your browser asks DNS for the
          IP, opens a TCP connection to port 443, sends an HTTPS GET request, the
          server returns the HTML, and the browser renders it.
        </Callout>
      </Section>

      <Section title="Network security basics">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Firewall</b> — filters incoming/outgoing traffic based on rules.</li>
          <li><b>Encryption</b> — converts data into unreadable form (HTTPS, WPA2 Wi-Fi).</li>
          <li><b>VPN</b> — creates an encrypted tunnel over a public network.</li>
          <li><b>Cookies</b> — small files a website stores on your device for session/state.</li>
          <li><b>Threats</b> — viruses, worms, spyware, phishing, DoS attacks (covered in Class XI ethics).</li>
        </ul>
      </Section>

      <Section title="Cloud computing & IoT (modern context)">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Cloud</b> — on-demand computing over the Internet (AWS, Azure, GCP). Models: <b>IaaS</b>, <b>PaaS</b>, <b>SaaS</b>.</li>
          <li><b>IoT</b> — "Internet of Things" — physical devices (smart watches, sensors, fridges, cars) that exchange data over the Internet.</li>
        </ul>
      </Section>

      <Section title="Practice">
        <QuickCheck
          question="Which device connects two different networks using IP addresses?"
          options={["Hub", "Switch", "Router", "Repeater"]}
          answer="Router"
        />
        <QuickCheck
          question="A network spread across an entire city is called?"
          options={["LAN", "PAN", "MAN", "WAN"]}
          answer="MAN"
        />
        <QuickCheck
          question="Which protocol is used to send email?"
          options={["POP3", "IMAP", "SMTP", "FTP"]}
          answer="SMTP"
        />
        <QuickCheck
          question="A 48-bit hardware address on a NIC is called?"
          answer="MAC"
          hint="Stands for Media Access Control."
        />
      </Section>
    
        <Section title="Deeper theory: how the internet really works">
          <p>
            When you type <code>www.cbse.gov.in</code> in a browser, your
            computer asks a <strong>DNS server</strong> to translate the
            domain into an IP address. Your request is then split into
            <strong> packets</strong>, each tagged with source/destination IPs,
            routed hop-by-hop through routers, reassembled by TCP at the
            destination, and answered with HTTPS-encrypted HTML, which the
            browser parses and renders.
          </p>
          <ul className="ml-5 list-disc space-y-1 text-sm">
            <li><strong>Bandwidth</strong> = max data rate of a link (bps, Kbps, Mbps, Gbps). <strong>Throughput</strong> = actual rate achieved.</li>
            <li><strong>MAC address</strong> (48-bit, hex) is permanent, assigned by NIC manufacturer; <strong>IP address</strong> (IPv4 32-bit, IPv6 128-bit) is logical and changes by network.</li>
            <li><strong>HTTP vs HTTPS:</strong> HTTPS uses TLS to encrypt the channel — protects against eavesdropping and tampering; uses port 443 instead of 80.</li>
            <li><strong>TCP vs UDP:</strong> TCP is reliable, connection-oriented, ordered (used by HTTP, SMTP, FTP); UDP is connectionless, faster but unreliable (used by DNS queries, video streaming, gaming).</li>
            <li><strong>Cookies</strong> are small text files a server stores on your browser to remember session/preferences; can raise privacy concerns.</li>
          </ul>
          <p className="text-sm">
            <strong>Cloud computing</strong> models — IaaS (raw VMs, e.g. AWS
            EC2), PaaS (managed runtime, e.g. Heroku), SaaS (ready apps, e.g.
            Gmail). <strong>IoT</strong> connects everyday objects (sensors,
            appliances) to the internet so they can exchange data.
          </p>
        </Section>

        <Section title="Previous Year Questions (PYQs)">
          <PYQ year="CBSE 2023" marks={1}
            question={<>Expand the term: VoIP.</>}
            answer={<>Voice over Internet Protocol — technology to make voice calls over an IP network instead of traditional phone lines (e.g. WhatsApp call, Google Meet).</>}
          />
          <PYQ year="CBSE 2022" marks={2}
            question={<>Differentiate between star and bus topology.</>}
            answer={<>
              <p><strong>Star:</strong> all nodes connect to a central hub/switch. Failure of one cable affects only that node; failure of the hub breaks the whole network.</p>
              <p><strong>Bus:</strong> all nodes share a single backbone cable. Cheap and easy to set up but a break in the backbone disables the whole network and performance drops with traffic.</p>
            </>}
          />
          <PYQ year="CBSE 2024" marks={3}
            question={<>A school in Delhi has 4 buildings. Suggest (a) the best topology, (b) placement of the server, (c) suitable cable, and (d) required device to connect to a branch in Mumbai.</>}
            answer={<>
              <p>(a) <strong>Star topology</strong> within each building, all linked through a central switch.</p>
              <p>(b) Place the server in the building with the <strong>maximum number of computers</strong> (minimises traffic).</p>
              <p>(c) <strong>Optical fibre</strong> for inter-building links (high speed, long distance, EMI-immune).</p>
              <p>(d) A <strong>router with a modem</strong> (or a leased-line/MPLS router) to connect to the Mumbai branch over the WAN.</p>
            </>}
          />
        </Section>

        <Section title="More MCQs">
          <QuickCheck question="Which device works at the Data Link layer and forwards frames using MAC?"
            options={["Hub", "Repeater", "Switch", "Modem"]} answer="Switch" />
          <QuickCheck question="Default port number of HTTPS?"
            options={["80", "21", "25", "443"]} answer="443" />
          <QuickCheck question="Which protocol is used to send email?"
            options={["POP3", "IMAP", "SMTP", "FTP"]} answer="SMTP" />
          <QuickCheck question="Which is NOT a guided medium?"
            options={["Twisted pair", "Coaxial", "Optical fibre", "Microwave"]} answer="Microwave" />
          <QuickCheck question="IPv4 address length is:"
            options={["16 bits", "32 bits", "64 bits", "128 bits"]} answer="32 bits" />
        </Section>
        <Section title="Most repeated board questions">
          <MostAsked
            items={[
              {
                q: "Define bandwidth and data transfer rate. In what units are they measured?",
                marks: 2,
                asked: "2019, 2022, 2024",
                a: "Bandwidth is the range of frequencies a channel can carry, measured in Hertz (Hz, KHz, MHz). Data transfer rate is the amount of data moved per second, measured in bits per second (bps, Kbps, Mbps, Gbps).",
              },
              {
                q: "Differentiate between a hub and a switch. Which one should be preferred and why?",
                marks: 2,
                asked: "2019, 2021, 2023, 2024 SQP",
                a: "A hub is a broadcast device: it forwards a frame to every connected node, causing collisions and wasted bandwidth. A switch reads the MAC address and forwards the frame only to the intended port. A switch is preferred as it is faster, more secure and reduces network traffic.",
              },
              {
                q: "Ravi's company has four blocks. Suggest (i) the best cable layout, (ii) the block for the server, (iii) placement of a repeater/hub, and (iv) the device to connect to the Internet.",
                marks: 5,
                asked: "2018-2024 (case study, every year)",
                a: "(i) Use a star topology and connect blocks with the shortest total distance (bus/star hybrid between nearest blocks).\n(ii) Place the server in the block with the maximum number of computers, to reduce traffic.\n(iii) Place a repeater between two blocks separated by more than 100 m (UTP limit), and a switch/hub in each block.\n(iv) A modem/router (with a gateway) is used to connect the LAN to the Internet.",
              },
              {
                q: "Differentiate between a Web page and a Website; and between HTTP and HTTPS.",
                marks: 2,
                asked: "2020, 2022, 2024",
                a: "A web page is a single hypertext document; a website is a collection of related web pages under one domain with a home page.\nHTTP transfers data in plain text on port 80; HTTPS adds SSL/TLS encryption on port 443, so data cannot be read if intercepted.",
              },
              {
                q: "Expand and give one use of: (i) FTP (ii) SMTP (iii) POP3 (iv) VoIP (v) URL",
                marks: 3,
                asked: "2019, 2021, 2023",
                a: "(i) File Transfer Protocol — upload/download files between hosts.\n(ii) Simple Mail Transfer Protocol — sending email.\n(iii) Post Office Protocol v3 — retrieving email from a mail server.\n(iv) Voice over Internet Protocol — voice calls over the Internet.\n(v) Uniform Resource Locator — unique address of a resource on the web.",
              },
              {
                q: "Differentiate between guided and unguided media with two examples each.",
                marks: 2,
                asked: "2020, 2024 SQP",
                a: "Guided (wired) media carry signals along a solid medium — twisted pair, coaxial cable, optical fibre. Unguided (wireless) media transmit through air — radio waves, microwaves, infrared, satellite. Guided media are more secure and stable; unguided media support mobility.",
              },
            ]}
          />
        </Section>


        <Section title="Types of networks — comparison table">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-2 text-left">Type</th>
                  <th className="p-2 text-left">Full form / range</th>
                  <th className="p-2 text-left">Example</th>
                  <th className="p-2 text-left">Ownership</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b"><td className="p-2">PAN</td><td className="p-2">Personal Area Network, a few metres</td><td className="p-2">Bluetooth earphones, smartwatch to phone</td><td className="p-2">Individual</td></tr>
                <tr className="border-b"><td className="p-2">LAN</td><td className="p-2">Local Area Network, up to ~1 km / one building</td><td className="p-2">School computer lab, home Wi-Fi</td><td className="p-2">Single organisation</td></tr>
                <tr className="border-b"><td className="p-2">MAN</td><td className="p-2">Metropolitan Area Network, one city (~5–50 km)</td><td className="p-2">Cable TV network, city traffic-signal network</td><td className="p-2">One or more organisations</td></tr>
                <tr className="border-b"><td className="p-2">WAN</td><td className="p-2">Wide Area Network, countries/continents</td><td className="p-2">The Internet, bank ATM network, airline reservation system</td><td className="p-2">Multiple organisations</td></tr>
              </tbody>
            </table>
          </div>
          <Callout>Exam tip: "spread across a city" ⇒ MAN; "spread across the world / connects multiple LANs across countries" ⇒ WAN.</Callout>
        </Section>

        <Section title="Network devices — detailed roles (exam table)">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-2 text-left">Device</th>
                  <th className="p-2 text-left">Layer / addressing</th>
                  <th className="p-2 text-left">Function</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b"><td className="p-2">Modem</td><td className="p-2">Physical</td><td className="p-2">Modulates digital signal → analog for transmission over telephone/cable line and demodulates on receiving end; connects LAN to ISP.</td></tr>
                <tr className="border-b"><td className="p-2">RJ45 connector</td><td className="p-2">Physical</td><td className="p-2">8-pin plug used to terminate twisted-pair (Ethernet) cable at NIC/switch ports.</td></tr>
                <tr className="border-b"><td className="p-2">Repeater</td><td className="p-2">Physical</td><td className="p-2">Amplifies/regenerates a weak signal so it can travel further without attenuation loss (used beyond ~100 m of UTP).</td></tr>
                <tr className="border-b"><td className="p-2">Hub</td><td className="p-2">Physical</td><td className="p-2">Broadcasts every incoming frame to all connected ports; no intelligence; causes collisions.</td></tr>
                <tr className="border-b"><td className="p-2">Switch</td><td className="p-2">Data Link (MAC)</td><td className="p-2">Learns MAC addresses of connected devices and forwards frames only to the destination port — faster and more secure than a hub.</td></tr>
                <tr className="border-b"><td className="p-2">Router</td><td className="p-2">Network (IP)</td><td className="p-2">Connects two or more different networks and chooses the best path for packets using IP addresses/routing tables.</td></tr>
                <tr className="border-b"><td className="p-2">Gateway</td><td className="p-2">All layers</td><td className="p-2">Connects networks running different protocols/architectures (e.g. LAN to a mainframe network); acts as an entry-exit point.</td></tr>
                <tr className="border-b"><td className="p-2">NIC (Network Interface Card)</td><td className="p-2">Data Link</td><td className="p-2">Hardware card/chip giving each device a unique MAC address; provides physical connection to the medium.</td></tr>
                <tr className="border-b"><td className="p-2">Wi-Fi card</td><td className="p-2">Physical/Data Link</td><td className="p-2">Wireless NIC — lets a device connect to a wireless LAN/access point.</td></tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="Transmission media — pros and cons">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-2 text-left">Medium</th>
                  <th className="p-2 text-left">Advantages</th>
                  <th className="p-2 text-left">Disadvantages</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b"><td className="p-2">Twisted Pair (UTP/STP)</td><td className="p-2">Cheap, easy to install, flexible</td><td className="p-2">Low bandwidth, high attenuation, EMI-prone (UTP), short range (~100 m)</td></tr>
                <tr className="border-b"><td className="p-2">Coaxial cable</td><td className="p-2">Better shielding, higher bandwidth than twisted pair, longer range</td><td className="p-2">Costlier, bulkier, harder to install</td></tr>
                <tr className="border-b"><td className="p-2">Optical Fibre</td><td className="p-2">Very high bandwidth, immune to EMI, secure, long distance with no repeaters</td><td className="p-2">Expensive, fragile, needs skilled installation</td></tr>
                <tr className="border-b"><td className="p-2">Radio waves</td><td className="p-2">Penetrates walls, no line-of-sight needed, supports mobility</td><td className="p-2">Interference, insecure (needs encryption), limited range</td></tr>
                <tr className="border-b"><td className="p-2">Microwave (terrestrial)</td><td className="p-2">High bandwidth, no cabling cost over long distance</td><td className="p-2">Line-of-sight required, affected by weather</td></tr>
                <tr className="border-b"><td className="p-2">Satellite</td><td className="p-2">Covers very large/remote areas, good for broadcast</td><td className="p-2">High latency, very costly, affected by weather</td></tr>
                <tr className="border-b"><td className="p-2">Infrared</td><td className="p-2">Cheap, no licence needed</td><td className="p-2">Line-of-sight only, very short range, blocked by obstacles</td></tr>
                <tr className="border-b"><td className="p-2">Bluetooth</td><td className="p-2">Low power, easy pairing, cheap</td><td className="p-2">Very short range (~10 m), lower speed than Wi-Fi</td></tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="Topologies — ASCII diagrams with advantages/disadvantages">
          <p><b>Bus topology</b> — single shared backbone, terminators at both ends:</p>
          <pre className="rounded bg-muted p-3 text-xs overflow-x-auto">{"A---+---B---+---C---+---D\n        |       |\n     (drop)   (drop)"}</pre>
          <ul className="list-disc space-y-1 pl-5 text-sm">
            <li>+ Cheap, easy to lay for small networks.</li>
            <li>− Backbone failure = whole network down; performance degrades as nodes/traffic grow; difficult to troubleshoot.</li>
          </ul>

          <p className="mt-3"><b>Star topology</b> — all nodes to a central switch/hub:</p>
          <pre className="rounded bg-muted p-3 text-xs overflow-x-auto">{"      A\n      |\nB----[SW]----C\n      |\n      D"}</pre>
          <ul className="list-disc space-y-1 pl-5 text-sm">
            <li>+ Easy to add/remove nodes; failure of one cable doesn't affect others; easy fault detection.</li>
            <li>− Central device failure brings down the entire network; more cabling than bus.</li>
          </ul>

          <p className="mt-3"><b>Tree topology</b> — hierarchical, star groups linked to a backbone:</p>
          <pre className="rounded bg-muted p-3 text-xs overflow-x-auto">{"        [Root Hub]\n       /          \\\n   [Hub1]        [Hub2]\n   /    \\        /    \\\n  A      B      C      D"}</pre>
          <ul className="list-disc space-y-1 pl-5 text-sm">
            <li>+ Scalable, easy to manage/segment large networks, supports future expansion.</li>
            <li>− If the root/backbone fails, entire section goes down; more cabling; complex to maintain.</li>
          </ul>

          <p className="mt-3"><b>Mesh topology</b> — every node connects to every other node:</p>
          <pre className="rounded bg-muted p-3 text-xs overflow-x-auto">{"A-----B\n|\\   /|\n| \\ / |\n|  X  |\n| / \\ |\n|/   \\|\nC-----D"}</pre>
          <ul className="list-disc space-y-1 pl-5 text-sm">
            <li>+ Highly reliable/fault-tolerant (multiple paths), no single point of failure, good for critical links.</li>
            <li>− Very expensive cabling (n(n−1)/2 links), complex to install/manage.</li>
          </ul>
        </Section>

        <Section title="Web scripting: client-side vs server-side">
          <ul className="list-disc space-y-1 pl-5">
            <li><b>Client-side scripting</b> — runs in the browser (e.g. JavaScript). Used for form validation, animations, DOM manipulation; reduces server load; source visible to user.</li>
            <li><b>Server-side scripting</b> — runs on the web server (e.g. PHP, ASP.NET, Node.js, Python). Used to access databases, generate dynamic pages; code hidden from client.</li>
          </ul>
        </Section>

        <Section title="URL vs Domain name vs DNS resolution">
          <ul className="list-disc space-y-1 pl-5">
            <li><b>Domain name</b> — a human-readable name for a website/server, e.g. <code>cbseacademic.nic.in</code>.</li>
            <li><b>URL</b> — the complete address of a specific resource, including protocol, domain, path: <code>https://cbseacademic.nic.in/curriculum.html</code>.</li>
            <li><b>DNS resolution steps:</b> browser checks cache → OS/router cache → asks a DNS resolver (ISP) → resolver queries root, TLD, and authoritative name servers → IP returned → browser connects to that IP.</li>
          </ul>
        </Section>

        <Section title="Network security threats and firewalls (Class XII revision)">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-2 text-left">Threat</th>
                  <th className="p-2 text-left">What it does</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b"><td className="p-2">Virus</td><td className="p-2">Self-replicating malicious code attached to a file; needs a host program to spread.</td></tr>
                <tr className="border-b"><td className="p-2">Worm</td><td className="p-2">Self-replicating, spreads across a network without needing a host file; consumes bandwidth.</td></tr>
                <tr className="border-b"><td className="p-2">Trojan horse</td><td className="p-2">Disguised as legitimate software but performs hidden malicious actions (backdoor access).</td></tr>
                <tr className="border-b"><td className="p-2">Spam</td><td className="p-2">Unsolicited bulk email, often advertising or carrying malware links.</td></tr>
                <tr className="border-b"><td className="p-2">Adware</td><td className="p-2">Automatically displays/downloads unwanted advertisements.</td></tr>
                <tr className="border-b"><td className="p-2">Phishing</td><td className="p-2">Fake emails/websites trick users into revealing passwords/bank details.</td></tr>
                <tr className="border-b"><td className="p-2">DoS attack</td><td className="p-2">Denial of Service — floods a server with requests so genuine users can't access it.</td></tr>
                <tr className="border-b"><td className="p-2">Snooping / Eavesdropping</td><td className="p-2">Unauthorized interception of data/communication travelling over a network.</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2"><b>Firewall:</b> hardware/software placed between an internal network and the internet; inspects packets against a rule-set and blocks/allows traffic accordingly, protecting against unauthorised access and many of the threats above.</p>
        </Section>

        <Section title="Case study 1: Multi-block school campus">
          <p><b>Scenario:</b> "Global Public School" has 4 blocks — Admin (20 computers), Science (60), Arts (40), Sports (10). Distances: Admin–Science 60 m, Admin–Arts 90 m, Admin–Sports 115 m, Science–Arts 50 m, Science–Sports 65 m, Arts–Sports 40 m.</p>
          <ul className="list-disc space-y-1 pl-5">
            <li><b>Suggest cable layout:</b> Connect blocks following the shortest cable path — Science–Arts (50 m), Arts–Sports (40 m), Admin–Science (60 m) — forming a minimum-distance backbone (essentially a minimum spanning tree).</li>
            <li><b>Most suitable place/block to house the server:</b> Science block, as it has the maximum number of computers (60) — this minimises overall data traffic/travel.</li>
            <li><b>Suggest the topology:</b> Star topology within each block, blocks interconnected to form a tree/hybrid topology.</li>
            <li><b>Repeater needed?</b> Not required for any single link since all distances are under 100 m (UTP limit for 10/100 Mbps Ethernet).</li>
            <li><b>Device to provide internet access to all blocks:</b> A single router/modem connected at the Science block (server block), shared via switches in each block.</li>
          </ul>
        </Section>

        <Section title="Case study 2: Company with a branch in another city + Wi-Fi requirement">
          <p><b>Scenario:</b> "TechnoSoft Ltd" has its Head Office in Mumbai with 4 buildings (HR-50 m from Admin, Admin, Finance-70 m from Admin, IT Park-150 m from Admin) and a branch office in Pune, 150 km away. Management wants some departments to also support laptops without cables.</p>
          <ul className="list-disc space-y-1 pl-5">
            <li><b>Suggest a cable layout for connecting the buildings:</b> Use a star topology from Admin (server block) to HR and Finance (within 100 m); use a repeater or switch cascade for IT Park (150 m, beyond UTP limit) or replace that link with optical fibre.</li>
            <li><b>Best block for the server:</b> Admin, being the most central and (typically) the block with the most computers/hub of activity.</li>
            <li><b>Connecting Mumbai HO with Pune branch:</b> Use a WAN link via the Internet with VPN, or a leased line, connected through routers/modems at both ends — not a LAN cable (too far).</li>
            <li><b>Enable wireless access:</b> Install Wi-Fi Access Points in departments that need laptop mobility; wired Ethernet remains for desktops that need stable, high-speed, secure connections.</li>
          </ul>
        </Section>

        <Section title="Case study 3: Hospital network with security concerns">
          <p><b>Scenario:</b> "CityCare Hospital" has 3 blocks — Reception (15 systems), Diagnostics (45 systems, 40 m from Reception), Admin (25 systems, 30 m from Reception). Patient data confidentiality is critical, and the hospital wants to prevent unauthorised access from outside.</p>
          <ul className="list-disc space-y-1 pl-5">
            <li><b>Topology suggested:</b> Star topology in each block with a central switch, blocks connected via a backbone (tree topology).</li>
            <li><b>Server placement:</b> Diagnostics block (maximum number of computers: 45).</li>
            <li><b>Protect patient data from external hackers:</b> Install a <b>firewall</b> at the network's entry point to the Internet, and use <b>encryption (HTTPS/VPN)</b> for any data sent outside.</li>
            <li><b>Cable suggested:</b> Twisted pair (UTP/Cat6) is sufficient as all distances are under 100 m; no repeater required.</li>
          </ul>
        </Section>

        <Section title="Output/short-answer style practice questions">
          <ol className="list-decimal space-y-2 pl-5 text-sm">
            <li>Expand: (a) NIC (b) DNS (c) HTTP (d) FTP (e) VoIP.</li>
            <li>What is the difference between a MAC address and an IP address?</li>
            <li>Name the topology in which a break in the backbone cable disrupts the entire network.</li>
            <li>Which device would you use to join two LANs that use different network protocols?</li>
            <li>State two differences between a hub and a switch.</li>
            <li>A device transmits 500 megabits of data in 5 seconds. What is its data transfer rate in Mbps?</li>
            <li>Convert the IPv4 address <code>172.16.0.1</code> into its binary octets.</li>
            <li>Name the protocol used to (a) securely transfer web pages (b) transfer files (c) send email.</li>
            <li>Why is optical fibre preferred over UTP for connecting two buildings 500 m apart?</li>
            <li>What is a firewall, and where in a network is it typically placed?</li>
          </ol>
          <p className="mt-2 text-xs text-muted-foreground">Answers: (6) 100 Mbps; (7) 10101100.00010000.00000000.00000001; others — see relevant sections above.</p>
        </Section>

        <Section title="More MCQs (Set 2)">
          <QuickCheck question="Which device regenerates a weak signal without changing its content?" options={["Switch", "Repeater", "Router", "Gateway"]} answer="Repeater" />
          <QuickCheck question="ARPANET was developed by:" options={["NASA", "US Department of Defense", "Google", "IBM"]} answer="US Department of Defense" />
          <QuickCheck question="NSFNET stands for:" options={["National Science Foundation Network", "National Software Firm Network", "New Server Framework Network", "None of these"]} answer="National Science Foundation Network" />
          <QuickCheck question="Which topology requires the maximum number of cables for n nodes?" options={["Bus", "Star", "Mesh", "Tree"]} answer="Mesh" />
          <QuickCheck question="RJ45 connector is used with which cable?" options={["Coaxial", "Optical fibre", "Twisted pair", "Bluetooth"]} answer="Twisted pair" />
          <QuickCheck question="Which is a connectionless, unreliable protocol used for fast delivery?" options={["TCP", "UDP", "FTP", "HTTP"]} answer="UDP" />
          <QuickCheck question="Which malware disguises itself as legitimate software?" options={["Worm", "Trojan Horse", "Virus", "Spam"]} answer="Trojan Horse" />
          <QuickCheck question="A DoS attack aims to:" options={["Steal passwords", "Flood a server so it cannot serve genuine users", "Encrypt files for ransom", "Duplicate MAC addresses"]} answer="Flood a server so it cannot serve genuine users" />
          <QuickCheck question="Which is NOT a valid IPv6 feature?" options={["128-bit address", "Hexadecimal notation", "4.3 billion unique addresses", "Written in 8 groups"]} answer="4.3 billion unique addresses" />
          <QuickCheck question="Which layer/addressing does a switch use to forward frames?" options={["IP address", "MAC address", "Domain name", "Port number"]} answer="MAC address" />
          <QuickCheck question="A network confined to one's own body/nearby devices (few metres) is a:" options={["LAN", "PAN", "MAN", "WAN"]} answer="PAN" />
          <QuickCheck question="Which protocol lets you remotely log in to another computer securely?" options={["Telnet", "SSH", "FTP", "SMTP"]} answer="SSH" />
          <QuickCheck question="Cookies are stored on the:" options={["Web server", "DNS server", "Client/browser", "Router"]} answer="Client/browser" />
          <QuickCheck question="Which of these is a client-side scripting language?" options={["PHP", "JavaScript", "Python (Django)", "ASP.NET"]} answer="JavaScript" />
        </Section>

        <Section title="More PYQs (2018–2025, incl. SQP)">
          <PYQ year="CBSE 2018" marks={1}
            question={<>What is the full form of ARPANET?</>}
            answer={<>Advanced Research Projects Agency Network.</>}
          />
          <PYQ year="CBSE 2019" marks={2}
            question={<>Differentiate between a Hub and a Repeater.</>}
            answer={<>A hub is a multi-port device that broadcasts data to all connected nodes without regard for the destination. A repeater is a two-port device that simply amplifies/regenerates a weak signal so it can travel further, without any addressing intelligence.</>}
          />
          <PYQ year="CBSE 2020" marks={1}
            question={<>Which protocol is used to transfer files between a client and a server?</>}
            answer={<>FTP (File Transfer Protocol).</>}
          />
          <PYQ year="CBSE 2021 (Term)" marks={2}
            question={<>What do MAC and IP addresses stand for? How are they different?</>}
            answer={<>MAC = Media Access Control address (48-bit, physical, permanent, assigned by NIC manufacturer). IP = Internet Protocol address (logical, assigned by the network, can change; IPv4 is 32-bit, IPv6 is 128-bit).</>}
          />
          <PYQ year="CBSE 2022 SQP" marks={3}
            question={<>A company has 3 wings — Sales (20 computers), HR (10), Finance (15) — situated 50 m, 80 m, and 120 m from each other respectively. Suggest the topology and server placement.</>}
            answer={<>Star topology in each wing connected via a central switch/backbone (tree). Server should be placed in the Sales wing since it has the maximum number of computers (20), minimizing overall traffic.</>}
          />
          <PYQ year="CBSE 2023" marks={2}
            question={<>Name any two threats to network security and briefly explain them.</>}
            answer={<>(i) Virus — malicious self-replicating code that attaches to files and damages/corrupts data. (ii) Phishing — fraudulent emails/websites designed to trick users into revealing sensitive information like passwords or bank details.</>}
          />
          <PYQ year="CBSE 2024" marks={1}
            question={<>Expand: NFC.</>}
            answer={<>Near Field Communication — short-range (a few cm) wireless technology used for contactless payments and data exchange between nearby devices.</>}
          />
          <PYQ year="CBSE 2025 SQP" marks={3}
            question={<>Differentiate between circuit switching and packet switching with one example each.</>}
            answer={<>Circuit switching establishes a dedicated end-to-end path for the entire duration of communication (e.g. traditional telephone call) — reliable but wastes bandwidth when idle. Packet switching breaks data into packets that may take different routes and are reassembled at the destination (e.g. the Internet) — efficient, fault-tolerant, and better utilises bandwidth.</>}
          />
        </Section>

        <Section title="Most repeated board questions — Set 2 (model answers)">
          <MostAsked
            items={[
              {
                q: "Explain any three network devices with their function.",
                marks: 3,
                asked: "2018, 2020, 2022, 2024",
                a: "Modem: converts digital signals to analog and back so data can travel over telephone/cable lines to the ISP.\nSwitch: forwards data frames only to the intended destination port using MAC addresses, reducing collisions.\nRouter: connects two or more different networks and determines the best path for data packets using IP addresses.",
              },
              {
                q: "What is DNS? Explain how a domain name is resolved to an IP address.",
                marks: 3,
                asked: "2019, 2021, 2023 SQP",
                a: "DNS (Domain Name System) is a distributed service that translates human-readable domain names into machine-usable IP addresses. When a browser needs to reach a domain, it first checks local/browser cache, then queries a DNS resolver (usually at the ISP), which in turn queries root, TLD and authoritative name servers until it obtains the correct IP address, which is returned to the browser to establish a connection.",
              },
              {
                q: "What is a firewall? How does it protect a network?",
                marks: 2,
                asked: "2020, 2022, 2024",
                a: "A firewall is a hardware device or software that sits between a trusted internal network and an untrusted external network (like the Internet). It examines incoming and outgoing traffic against a defined set of security rules and blocks unauthorized or suspicious traffic, protecting the network from hackers, malware and intrusion attempts.",
              },
              {
                q: "Differentiate between VoIP and traditional telephony. Give one advantage of VoIP.",
                marks: 2,
                asked: "2021, 2023",
                a: "Traditional telephony uses dedicated circuit-switched analog lines. VoIP (Voice over Internet Protocol) digitises voice and sends it as data packets over the Internet using packet switching. Advantage: VoIP is much cheaper, especially for long-distance/international calls, and supports additional features like video and file sharing.",
              },
              {
                q: "Explain client-side and server-side scripting with one example of each.",
                marks: 2,
                asked: "2022, 2024",
                a: "Client-side scripting executes in the user's browser to handle tasks like form validation and animations without contacting the server repeatedly — example: JavaScript. Server-side scripting executes on the web server to generate dynamic content, often involving database access — example: PHP.",
              },
              {
                q: "State any two advantages and two disadvantages of a Mesh topology.",
                marks: 2,
                asked: "2019, 2023, 2025 SQP",
                a: "Advantages: (i) Highly reliable — failure of one link doesn't affect others since multiple paths exist; (ii) Fault isolation is easy. Disadvantages: (i) Very high cabling cost since every node connects to every other node; (ii) Difficult and complex to install and reconfigure.",
              },
              {
                q: "Explain the working of packet switching. Why is it preferred for the Internet?",
                marks: 3,
                asked: "2018, 2021, 2024",
                a: "In packet switching, a message is broken into small fixed-size units called packets, each carrying source/destination addressing information. Packets may travel via different routes through intermediate routers and are reassembled in the correct order at the destination. It is preferred for the Internet because it makes efficient use of bandwidth (no dedicated path needed), is fault-tolerant (can reroute around failed links), and supports multiple simultaneous conversations over shared links.",
              },
              {
                q: "What is the difference between a web page, a website, and a web browser?",
                marks: 2,
                asked: "2020, 2022, 2023",
                a: "A web page is a single hypertext document viewable on the internet. A website is a collection of related, interlinked web pages under a common domain, usually with a home page. A web browser (e.g. Chrome, Firefox) is client software used to request, retrieve and render web pages from a web server.",
              },
            ]}
          />
        </Section>

      </ChapterLayout>
  );
}
